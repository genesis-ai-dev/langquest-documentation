#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

const REPO_OWNER = 'genesis-ai-dev';
const REPO_NAME = 'langquest';
const DOCS_OUTPUT_DIR = path.join(__dirname, '../content/docs/developers');
const ASSETS_OUTPUT_DIR = path.join(__dirname, '../public');

// GitHub API client - will be initialized in main()
let octokit;

async function initializeOctokit() {
    const { Octokit } = await import('@octokit/rest');
    octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN, // Optional: for higher rate limits
    });
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

    // Replace relative image paths with absolute paths for Next.js
    processedContent = processedContent.replace(
        /!\[([^\]]*)\]\(readme_images\/([^)]+)\)/g,
        '![$1](/readme_images/$2)'
    );

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
        const file = await fetchFileContent(filePath);
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
                        assets.push({
                            filename: file.name,
                            content: fileContent.content,
                            originalPath: file.path,
                            directory: dirPath,
                        });
                    }
                }
            }
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

async function main() {
    console.log(`Fetching developer documentation from ${REPO_OWNER}/${REPO_NAME}...`);

    try {
        // Initialize Octokit with dynamic import
        await initializeOctokit();

        await ensureOutputDirectories();

        const [apiDocs, codeDocs, archDoc, assets] = await Promise.all([
            extractAPIDocumentation(),
            extractCodeDocumentation(),
            generateArchitectureDoc(),
            extractAssets(),
        ]);

        const allDocs = [...apiDocs, ...codeDocs, archDoc];

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

    } catch (error) {
        console.error('Error generating documentation:', error);
        process.exit(1);
    }
}

// Run if this file is executed directly
if (require.main === module) {
    main();
}

module.exports = { main }; 