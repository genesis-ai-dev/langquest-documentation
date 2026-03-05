import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Screenshot } from '@/components/screenshot';
import { VerticalVideo } from '@/components/vertical-video';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Screenshot,
    VerticalVideo,
    ...components,
  };
}
