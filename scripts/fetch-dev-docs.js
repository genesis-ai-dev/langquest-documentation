#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');
const { execSync } = require('child_process');

const REPO_OWNER = 'genesis-ai-dev';
const REPO_NAME = 'langquest';
const DOCS_OUTPUT_DIR = path.join(__dirname, '../content/docs/developers');
const ASSETS_OUTPUT_DIR = path.join(__dirname, '../public');
const TEMP_REPO_DIR = path.join(__dirname, '../temp-repo');

// GitHub API client - will be initialized in main()
let octokit;

async function initializeOctokit() {
    const { Octokit } = await import('@octokit/rest');
    octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN, // Optional: for higher rate limits
    });
}

async function cloneRepository() {
    console.log('Cloning repository for docstring extraction...');

    try {
        // Remove existing temp directory if it exists
        await fs.rm(TEMP_REPO_DIR, { recursive: true, force: true });

        // Clone the repository
        execSync(`git clone --depth 1 https://github.com/${REPO_OWNER}/${REPO_NAME}.git ${TEMP_REPO_DIR}`, {
            stdio: 'inherit',
        });

        console.log('✓ Repository cloned successfully');
        return true;
    } catch (error) {
        console.warn('Could not clone repository:', error.message);
        return false;
    }
}

async function extractDocstrings() {
    console.log('Extracting docstrings from source code...');

    try {
        // Create a minimal TypeScript configuration for TypeDoc
        const tsconfig = {
            compilerOptions: {
                target: "es2020",
                module: "commonjs",
                lib: ["es2020", "dom"],
                declaration: true,
                outDir: "./dist",
                strict: true,
                esModuleInterop: true,
                skipLibCheck: true,
                forceConsistentCasingInFileNames: true,
                moduleResolution: "node",
                resolveJsonModule: true,
                allowSyntheticDefaultImports: true,
                jsx: "react-jsx"
            },
            include: [
                "app/**/*",
                "components/**/*",
                "contexts/**/*",
                "hooks/**/*",
                "services/**/*",
                "database_services/**/*",
                "providers/**/*",
                "store/**/*"
            ],
            exclude: [
                "node_modules",
                "dist",
                "**/*.test.ts",
                "**/*.test.tsx",
                "**/*.spec.ts",
                "**/*.spec.tsx"
            ]
        };

        // Write minimal TypeScript config
        await fs.writeFile(
            path.join(TEMP_REPO_DIR, 'tsconfig.temp.json'),
            JSON.stringify(tsconfig, null, 2)
        );

        // Create TypeDoc configuration
        const typedocConfig = {
            tsconfig: './tsconfig.temp.json',
            entryPoints: [
                'app/**/*.ts',
                'app/**/*.tsx',
                'components/**/*.ts',
                'components/**/*.tsx',
                'contexts/**/*.ts',
                'contexts/**/*.tsx',
                'hooks/**/*.ts',
                'hooks/**/*.tsx',
                'services/**/*.ts',
                'services/**/*.tsx',
                'database_services/**/*.ts',
                'database_services/**/*.tsx',
                'providers/**/*.ts',
                'providers/**/*.tsx',
                'store/**/*.ts',
                'store/**/*.tsx',
            ],
            entryPointStrategy: 'expand',
            out: path.join(__dirname, '../temp-typedoc'),
            plugin: ['typedoc-plugin-markdown'],
            excludePrivate: true,
            excludeProtected: true,
            excludeExternals: true,
            includeVersion: true,
            sort: ['source-order'],
            skipErrorChecking: true,
            validation: {
                notExported: false,
                invalidLink: false,
                notDocumented: false,
            },
            kindSortOrder: [
                'Document',
                'Project',
                'Module',
                'Namespace',
                'Enum',
                'Class',
                'Interface',
                'TypeAlias',
                'Constructor',
                'Property',
                'Method',
                'Function',
                'Accessor',
                'Variable',
            ],
        };

        // Write TypeDoc config
        await fs.writeFile(
            path.join(TEMP_REPO_DIR, 'typedoc.json'),
            JSON.stringify(typedocConfig, null, 2)
        );

        // Run TypeDoc
        const typedocOutput = path.join(__dirname, '../temp-typedoc');
        await fs.rm(typedocOutput, { recursive: true, force: true });

        try {
            execSync(`npx typedoc --options typedoc.json`, {
                cwd: TEMP_REPO_DIR,
                stdio: 'pipe', // Capture output instead of inherit to avoid cluttering logs
            });
        } catch (error) {
            console.warn('TypeDoc completed with warnings, but may have generated some documentation');
        }

        // Process TypeDoc output
        const apiDocs = await processTypedocOutput(typedocOutput);

        // Clean up TypeDoc output
        await fs.rm(typedocOutput, { recursive: true, force: true });

        return apiDocs;
    } catch (error) {
        console.warn('Could not extract docstrings:', error.message);
        return [];
    }
}

async function processTypedocOutput(typedocDir) {
    const docs = [];

    try {
        // Check if the directory exists
        const stats = await fs.stat(typedocDir);
        if (!stats.isDirectory()) return docs;

        // Process all markdown files recursively
        await processTypedocDirectory(typedocDir, typedocDir, docs);

    } catch (error) {
        console.warn('Could not process TypeDoc output:', error.message);
    }

    return docs;
}

async function processTypedocDirectory(currentDir, baseDir, docs) {
    const items = await fs.readdir(currentDir, { withFileTypes: true });

    for (const item of items) {
        const itemPath = path.join(currentDir, item.name);

        if (item.isDirectory()) {
            // Recursively process subdirectories
            await processTypedocDirectory(itemPath, baseDir, docs);
        } else if (item.isFile() && item.name.endsWith('.md')) {
            // Process markdown files
            const relativePath = path.relative(baseDir, itemPath);
            const content = await fs.readFile(itemPath, 'utf-8');

            // Skip empty files or files with minimal content
            if (content.trim().length < 50) continue;

            const processedContent = await processTypedocFile(content, relativePath, baseDir);

            // Generate a clean filename for fumadocs
            const cleanPath = relativePath
                .replace(/README\.md$/, 'index')
                .replace(/\.md$/, '')
                .replace(/\//g, '-');

            docs.push({
                filename: `${cleanPath}.mdx`,
                content: processedContent,
                originalPath: `generated-from-docstrings/${relativePath}`,
            });
        }
    }
}

async function processTypedocFile(content, relativePath, baseDir) {
    // Generate title from path
    let title;
    if (relativePath === 'modules.md') {
        title = 'API Overview';
    } else if (relativePath.endsWith('README.md')) {
        // Extract module name from path like "components/AppDrawer/README.md"
        const parts = relativePath.split('/');
        if (parts.length >= 2) {
            title = `${parts[parts.length - 2]} API`;
        } else {
            title = path.basename(relativePath, '.md');
        }
    } else {
        title = path.basename(relativePath, '.md').replace(/[_-]/g, ' ');
    }

    // Add frontmatter for fumadocs
    const frontmatter = {
        title: title,
        description: `API documentation generated from code docstrings`,
        sidebar_position: 100, // Place API docs at the end
    };

    // Clean up the content
    let processedContent = content;

    // Remove TypeDoc header if present
    processedContent = processedContent.replace(/^# .*\n\n/, '');

    // Fix relative links to work with fumadocs routing
    processedContent = processedContent.replace(
        /\[([^\]]+)\]\(([^)]+)\.md\)/g,
        (match, text, link) => {
            // Convert relative paths to fumadocs-compatible links
            const cleanLink = link
                .replace(/README$/, 'index')
                .replace(/\//g, '-');
            return `[${text}](/docs/developers/${cleanLink})`;
        }
    );

    // Fix other relative links
    processedContent = processedContent.replace(
        /\[([^\]]+)\]\(([^)]+)\/README\)/g,
        (match, text, link) => {
            const cleanLink = link.replace(/\//g, '-');
            return `[${text}](/docs/developers/${cleanLink}-index)`;
        }
    );

    // Add a header note
    processedContent = `# ${title}

> **Note**: This documentation is automatically generated from code docstrings in the main LangQuest repository.

${processedContent}`;

    return matter.stringify(processedContent, frontmatter);
}

async function fetchFileContent(filePath) {
    try {
        const response = await octokit.rest.repos.getContent({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: filePath,
        });

        if (response.data.type === 'file') {
            return {
                content: Buffer.from(response.data.content, 'base64').toString('utf-8'),
                sha: response.data.sha,
                path: filePath,
            };
        }
        return null;
    } catch (error) {
        console.warn(`Could not fetch ${filePath}:`, error.message);
        return null;
    }
}

async function fetchBinaryFile(filePath) {
    try {
        const response = await octokit.rest.repos.getContent({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: filePath,
        });

        if (response.data.type === 'file') {
            return {
                content: Buffer.from(response.data.content, 'base64'),
                sha: response.data.sha,
                path: filePath,
            };
        }
        return null;
    } catch (error) {
        console.warn(`Could not fetch ${filePath}:`, error.message);
        return null;
    }
}

async function fetchDirectory(dirPath) {
    try {
        const response = await octokit.rest.repos.getContent({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: dirPath,
        });

        if (Array.isArray(response.data)) {
            return response.data;
        }
        return [];
    } catch (error) {
        console.warn(`Could not fetch directory ${dirPath}:`, error.message);
        return [];
    }
}

async function processMarkdownFile(content, originalPath) {
    const parsed = matter(content);

    // Add frontmatter for fumadocs
    const frontmatter = {
        title: parsed.data.title || path.basename(originalPath, '.md'),
        description: parsed.data.description || `Developer documentation from ${originalPath}`,
        ...parsed.data,
    };

    // Process the content to fix image paths
    let processedContent = parsed.content;

    // Debug: log content before processing
    if (originalPath.includes('README.md')) {
        console.log('Processing README content for images...');
        const mediaMatches = processedContent.match(/!\[([^\]]*)\]\(_media\/([^)]+)\)/g);
        if (mediaMatches) {
            console.log('Found _media/ paths:', mediaMatches);
        }
    }

    // Replace relative image paths with absolute paths for Next.js
    processedContent = processedContent.replace(
        /!\[([^\]]*)\]\(readme_images\/([^)]+)\)/g,
        '![$1](/readme_images/$2)'
    );

    // Handle _media/ paths and map them to readme_images/
    processedContent = processedContent.replace(
        /!\[([^\]]*)\]\(_media\/([^)]+)\)/g,
        '![$1](/readme_images/$2)'
    );

    // Debug: log content after processing
    if (originalPath.includes('README.md')) {
        const stillHasMedia = processedContent.match(/!\[([^\]]*)\]\(_media\/([^)]+)\)/g);
        if (stillHasMedia) {
            console.log('ERROR: Still has _media/ paths after processing:', stillHasMedia);
        } else {
            console.log('✓ All _media/ paths converted to /readme_images/');
        }
    }

    return matter.stringify(processedContent, frontmatter);
}

async function extractAPIDocumentation() {
    console.log('Fetching API documentation...');

    const apiFiles = [
        'README.md',
        'docs/README.md',
        'docs/API.md',
        'docs/api.md',
        'API.md',
        'api.md',
    ];

    const docs = [];

    for (const filePath of apiFiles) {
        let file = null;

        // For README.md, prefer local version if available
        if (filePath === 'README.md') {
            try {
                const localReadmePath = path.join(TEMP_REPO_DIR, 'README.md');
                const localContent = await fs.readFile(localReadmePath, 'utf-8');
                file = { content: localContent };
                console.log('✓ Using local README.md (preferred over API)');
            } catch (error) {
                console.warn('Could not read local README.md, falling back to API:', error.message);
                file = await fetchFileContent(filePath);
            }
        } else {
            file = await fetchFileContent(filePath);
        }

        if (file) {
            const processedContent = await processMarkdownFile(file.content, filePath);
            docs.push({
                filename: `${path.basename(filePath, '.md')}.mdx`,
                content: processedContent,
                originalPath: filePath,
            });
        }
    }

    return docs;
}

async function extractCodeDocumentation() {
    console.log('Fetching code documentation...');

    const docsDirectories = [
        'docs',
        'documentation',
        'dev-docs',
    ];

    const docs = [];

    for (const dirPath of docsDirectories) {
        const files = await fetchDirectory(dirPath);

        for (const file of files) {
            if (file.type === 'file' && (file.name.endsWith('.md') || file.name.endsWith('.mdx'))) {
                const fileContent = await fetchFileContent(file.path);
                if (fileContent) {
                    const processedContent = await processMarkdownFile(fileContent.content, file.path);
                    docs.push({
                        filename: file.name.endsWith('.mdx') ? file.name : `${path.basename(file.name, '.md')}.mdx`,
                        content: processedContent,
                        originalPath: file.path,
                    });
                }
            }
        }
    }

    return docs;
}

async function extractAssets() {
    console.log('Fetching assets...');

    const assetDirectories = [
        'readme_images',
        '_media',
        'assets',
        'docs/images',
        'images',
    ];

    const assets = [];

    for (const dirPath of assetDirectories) {
        const files = await fetchDirectory(dirPath);

        for (const file of files) {
            if (file.type === 'file') {
                const isImageFile = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.name);
                if (isImageFile) {
                    const fileContent = await fetchBinaryFile(file.path);
                    if (fileContent) {
                        // Map _media directory to readme_images for consistency
                        const outputDirectory = dirPath === '_media' ? 'readme_images' : dirPath;

                        assets.push({
                            filename: file.name,
                            content: fileContent.content,
                            originalPath: file.path,
                            directory: outputDirectory,
                        });
                    }
                }
            }
        }
    }

    // Fallback to local assets if GitHub API fails
    if (assets.length === 0) {
        try {
            const localAssetDir = path.join(TEMP_REPO_DIR, 'readme_images');
            const localFiles = await fs.readdir(localAssetDir);

            for (const filename of localFiles) {
                const isImageFile = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(filename);
                if (isImageFile) {
                    const localFilePath = path.join(localAssetDir, filename);
                    const fileContent = await fs.readFile(localFilePath);

                    assets.push({
                        filename: filename,
                        content: fileContent,
                        originalPath: `readme_images/${filename}`,
                        directory: 'readme_images',
                    });
                }
            }

            if (assets.length > 0) {
                console.log(`✓ Using ${assets.length} local assets as fallback`);
            }
        } catch (error) {
            console.warn('Could not read local assets:', error.message);
        }
    }

    return assets;
}

async function generateArchitectureDoc() {
    console.log('Generating architecture documentation...');

    // Fetch package.json for dependencies overview
    const packageJson = await fetchFileContent('package.json');

    let content = `---
title: Architecture Overview
description: Technical overview of LangQuest architecture
---

# Architecture Overview

This documentation is automatically generated from the main LangQuest repository.

## Project Structure

LangQuest is built with modern web technologies designed for offline-first translation work.

`;

    if (packageJson) {
        const pkg = JSON.parse(packageJson.content);
        content += `## Dependencies

### Main Dependencies
${Object.entries(pkg.dependencies || {})
                .map(([name, version]) => `- **${name}**: ${version}`)
                .join('\n')}

### Development Dependencies
${Object.entries(pkg.devDependencies || {})
                .map(([name, version]) => `- **${name}**: ${version}`)
                .join('\n')}

`;
    }

    content += `## Getting Started

For detailed setup instructions, see the main repository at [${REPO_OWNER}/${REPO_NAME}](https://github.com/${REPO_OWNER}/${REPO_NAME}).

*This documentation is automatically updated from the main repository.*
`;

    return {
        filename: 'architecture.mdx',
        content,
        originalPath: 'generated',
    };
}

async function ensureOutputDirectories() {
    try {
        await fs.mkdir(DOCS_OUTPUT_DIR, { recursive: true });
        await fs.mkdir(ASSETS_OUTPUT_DIR, { recursive: true });
    } catch (error) {
        console.error('Could not create output directories:', error);
        process.exit(1);
    }
}

async function writeDocumentationFiles(docs) {
    console.log(`Writing ${docs.length} documentation files...`);

    const writtenFiles = [];

    for (const doc of docs) {
        const outputPath = path.join(DOCS_OUTPUT_DIR, doc.filename);
        await fs.writeFile(outputPath, doc.content, 'utf-8');
        writtenFiles.push(doc.filename);
        console.log(`✓ Generated: ${doc.filename}`);
    }

    // Generate meta.json for the developers section
    const meta = {
        title: 'Developer Documentation',
        description: 'Technical documentation automatically generated from the main LangQuest repository',
        pages: writtenFiles.map(filename => path.basename(filename, '.mdx')),
    };

    await fs.writeFile(
        path.join(DOCS_OUTPUT_DIR, 'meta.json'),
        JSON.stringify(meta, null, 2)
    );

    console.log(`✓ Generated meta.json with ${writtenFiles.length} pages`);
}

async function writeAssetFiles(assets) {
    console.log(`Writing ${assets.length} asset files...`);

    for (const asset of assets) {
        // Create directory structure in public folder
        const assetDir = path.join(ASSETS_OUTPUT_DIR, asset.directory);
        await fs.mkdir(assetDir, { recursive: true });

        const outputPath = path.join(assetDir, asset.filename);
        await fs.writeFile(outputPath, asset.content);
        console.log(`✓ Generated: ${asset.directory}/${asset.filename}`);
    }
}

async function updateMainMeta() {
    console.log('Updating main documentation meta...');

    const mainMetaPath = path.join(__dirname, '../content/docs/meta.json');

    try {
        const mainMeta = JSON.parse(await fs.readFile(mainMetaPath, 'utf-8'));

        // Add developers section if it doesn't exist
        if (!mainMeta.pages.includes('developers')) {
            mainMeta.pages.push('developers');
            await fs.writeFile(mainMetaPath, JSON.stringify(mainMeta, null, 2));
            console.log('✓ Added developers section to main meta.json');
        }
    } catch (error) {
        console.error('Could not update main meta.json:', error);
    }
}

async function cleanup() {
    console.log('Cleaning up temporary files...');
    try {
        await fs.rm(TEMP_REPO_DIR, { recursive: true, force: true });
        console.log('✓ Cleanup completed');
    } catch (error) {
        console.warn('Could not clean up temporary files:', error.message);
    }
}

async function main() {
    console.log(`Fetching developer documentation from ${REPO_OWNER}/${REPO_NAME}...`);

    try {
        // Initialize Octokit with dynamic import
        await initializeOctokit();

        await ensureOutputDirectories();

        // Clone repository for docstring extraction
        const repoCloned = await cloneRepository();

        const [apiDocs, codeDocs, archDoc, assets, docstringDocs] = await Promise.all([
            extractAPIDocumentation(),
            extractCodeDocumentation(),
            generateArchitectureDoc(),
            extractAssets(),
            repoCloned ? extractDocstrings() : Promise.resolve([]),
        ]);

        const allDocs = [...apiDocs, ...codeDocs, archDoc, ...docstringDocs];

        if (allDocs.length === 0) {
            console.warn('No documentation found to generate');
            return;
        }

        await writeDocumentationFiles(allDocs);
        await writeAssetFiles(assets);
        await updateMainMeta();

        console.log('✅ Developer documentation generated successfully!');
        console.log(`Generated ${allDocs.length} documentation files in ${DOCS_OUTPUT_DIR}`);
        console.log(`Generated ${assets.length} asset files in ${ASSETS_OUTPUT_DIR}`);
        if (docstringDocs.length > 0) {
            console.log(`Generated ${docstringDocs.length} API documentation files from docstrings`);
        }

    } catch (error) {
        console.error('Error generating documentation:', error);
        process.exit(1);
    } finally {
        await cleanup();
    }
}

// Run if this file is executed directly
if (require.main === module) {
    main();
}

module.exports = { main }; 