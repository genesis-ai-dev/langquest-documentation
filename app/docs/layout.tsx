import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout 
      tree={source.pageTree} 
      {...baseOptions}
      sidebar={{
        banner: (
          <a 
            href="https://github.com/genesis-ai-dev/langquest-documentation/issues/new/choose"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 7v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="5" r="0.75" fill="currentColor" />
            </svg>
            Report an Issue
          </a>
        ),
        footer: (
          <span className="text-xs text-fd-muted-foreground">
            v2.0.15
          </span>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
