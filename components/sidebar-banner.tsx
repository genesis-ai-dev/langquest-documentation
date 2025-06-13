export function SidebarBanner() {
  return (
    <a
      href="https://github.com/genesis-ai-dev/langquest-documentation/issues/new/choose"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-4 mx-3 mb-4 rounded-lg bg-fd-primary/10 hover:bg-fd-primary/20 transition-colors duration-200 text-fd-primary hover:text-fd-primary border border-fd-primary/20 hover:border-fd-primary/30"
    >
      <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-base">📢</span>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm">Report an Issue</div>
      </div>
    </a>
  );
} 