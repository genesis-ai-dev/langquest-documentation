import { MessageSquarePlus } from 'lucide-react';

export function SidebarBanner() {
  return (
    <a
      href="https://github.com/genesis-ai-dev/langquest-documentation/issues/new/choose"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-4 mx-3 mb-4 rounded-lg bg-fd-primary/10 hover:bg-fd-primary/20 transition-colors duration-200 text-fd-primary hover:text-fd-primary border border-fd-primary/20 hover:border-fd-primary/30"
    >
      <MessageSquarePlus className="w-5 h-5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm">Report an Issue</div>
        <div className="text-xs opacity-80 truncate">
          Suggest improvements
        </div>
      </div>
    </a>
  );
} 