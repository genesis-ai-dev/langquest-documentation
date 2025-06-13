import { Card } from 'fumadocs-ui/components/card';

export function ContributingCard() {
  return (
    <Card
      title="Help improve this documentation! 👋"
      description="Found a bug, have a suggestion, or want to request new content? Click this card to let us know on GitHub."
      href="https://github.com/genesis-ai-dev/langquest-documentation/issues/new/choose"
      external
      className="mt-8 border-2 border-dashed border-fd-border hover:border-fd-primary transition-colors duration-200"
    />
  );
} 