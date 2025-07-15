import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero Section */}
      <section className="flex flex-1 flex-col justify-center text-center px-6 py-12 bg-gradient-to-b from-fd-background to-fd-muted/20">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6 text-3xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-fd-primary to-fd-primary/80 bg-clip-text text-transparent">
            LangQuest
          </h1>
          <h2 className="mb-6 text-2xl md:text-4xl font-bold leading-tight bg-gradient-to-r from-fd-primary to-fd-primary/80 bg-clip-text text-transparent">
            Built for the Realities of Field Translation
          </h2>
          <p className="mb-8 text-lg md:text-xl text-fd-muted-foreground max-w-2xl mx-auto">
            When laptops fail in heat or humidity, when internet is unreliable
            for months, when the work is too important to lose—LangQuest is
            there.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/docs/user-guide"
              className="px-8 py-3 bg-fd-primary text-fd-primary-foreground rounded-lg font-semibold hover:bg-fd-primary/90 transition-colors"
            >
              Start Translating
            </Link>
            <Link
              href="/docs"
              className="px-8 py-3 border border-fd-border rounded-lg font-semibold hover:bg-fd-muted/50 transition-colors"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* About LangQuest Section */}
      <section className="py-16 px-6 bg-fd-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Born from a Simple Need
          </h2>
          <p className="text-lg text-fd-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
            LangQuest was born from a simple need: a reliable way to capture
            oral Bible translations and more, even in the most remote
            conditions. It's designed to handle real-world conditions:
            offline-first 📡, resilient 💪, and simple to use on everyday mobile
            devices 📱. Whether you're translating God's Word, preserving
            culture, or equipping your community for the future—LangQuest gives
            you the tools to do it on your terms, even off the grid. Learn more
            in our{' '}
            <Link
              href="/docs"
              className="text-fd-primary hover:text-fd-primary/80 underline"
            >
              documentation
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-6 bg-fd-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            The Reality of Translation Work
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="p-6 bg-fd-background rounded-lg border border-fd-border">
              <div className="text-3xl font-bold text-fd-primary mb-2">
                7,000+
              </div>
              <div className="text-sm text-fd-muted-foreground">
                Living Languages Worldwide
              </div>
            </div>
            <div className="p-6 bg-fd-background rounded-lg border border-fd-border">
              <div className="text-3xl font-bold text-fd-primary mb-2">756</div>
              <div className="text-sm text-fd-muted-foreground">
                Languages with Complete Bible
              </div>
            </div>
            <div className="p-6 bg-fd-background rounded-lg border border-fd-border">
              <div className="text-3xl font-bold text-fd-primary mb-2">
                3,000+
              </div>
              <div className="text-sm text-fd-muted-foreground">
                Endangered Languages
              </div>
            </div>
          </div>
          <p className="text-lg text-fd-muted-foreground max-w-2xl mx-auto">
            Out of over 7,000 languages, the Bible is fully translated into only
            756. With over 3,000 endangered languages at risk, the window for
            preservation is closing fast. LangQuest bridges this critical gap by
            empowering communities to preserve their linguistic heritage—even
            when working in challenging conditions.
          </p>
        </div>
      </section>

      {/* What You Can Do Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What You Can Do
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🗣️</div>
              <h3 className="font-semibold mb-2">Translate Easily</h3>
              <p className="text-sm text-fd-muted-foreground">
                Capture short, meaningful chunks of Scripture, stories, songs,
                or cultural content (even with images!)—using your own language,
                by voice or text.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📖</div>
              <h3 className="font-semibold mb-2">
                Scripture First, Not Scripture Only
              </h3>
              <p className="text-sm text-fd-muted-foreground">
                LangQuest is already being used to translate the Bible, but it's
                built for more: traditional stories, oral histories, and
                educational materials.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-semibold mb-2">Collaborate and Validate</h3>
              <p className="text-sm text-fd-muted-foreground">
                Vote on translations, provide feedback, and reach consensus
                through your community. Every contribution matters.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📡</div>
              <h3 className="font-semibold mb-2">
                Offline-First, Seamless Sync
              </h3>
              <p className="text-sm text-fd-muted-foreground">
                Store quests and projects locally. Work offline for weeks or
                months, then sync automatically when back online.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Access Section */}
      <section className="py-16 px-6 bg-fd-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            🌍 Open, Public, and Purposeful
          </h2>
          <p className="text-lg text-fd-muted-foreground mb-8 max-w-2xl mx-auto">
            Your contributions become part of a global open-access
            dataset—freely usable for language preservation, research, and AI
            training. No strings attached. Every translation you make helps
            preserve linguistic diversity for future generations.
          </p>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-fd-primary/10 to-fd-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-lg text-fd-muted-foreground mb-8 max-w-2xl mx-auto">
            Join translators worldwide who are making the Bible accessible in
            every language and preserving linguistic diversity—even in the most
            challenging field conditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/docs/user-guide"
              className="px-8 py-3 bg-fd-primary text-fd-primary-foreground rounded-lg font-semibold hover:bg-fd-primary/90 transition-colors"
            >
              Get Started Now
            </Link>
            <Link
              href="/docs/features"
              className="px-8 py-3 border border-fd-border rounded-lg font-semibold hover:bg-fd-muted/50 transition-colors"
            >
              See What's Possible
            </Link>
            <Link
              href="/docs/roadmap"
              className="px-8 py-3 border border-fd-border rounded-lg font-semibold hover:bg-fd-muted/50 transition-colors"
            >
              See What's Coming
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
