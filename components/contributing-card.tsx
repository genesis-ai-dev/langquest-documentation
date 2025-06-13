import { Card } from 'fumadocs-ui/components/card';

export function ContributingCard() {
  return (
    <Card
      title="Help improve this documentation! 👋"
      description="Found a bug, have a suggestion, or want to request new content? Click this card to let us know on GitHub."
      href="https://github.com/genesis-ai-dev/langquest-documentation/issues/new/choose"
      external
      className="mt-8 border-2 border-dashed border-fd-primary/30 hover:border-fd-primary/50 bg-fd-primary/5 hover:bg-fd-primary/10 transition-all duration-200 shadow-sm hover:shadow-md"
    />
  );
} 