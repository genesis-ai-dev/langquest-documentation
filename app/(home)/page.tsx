import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero Section */}
      <section className="flex flex-1 flex-col justify-center text-center px-6 py-12 bg-gradient-to-b from-fd-background to-fd-muted/20">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6 text-3xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-fd-primary to-fd-primary/80 bg-clip-text text-transparent">
            LangQuest: Empowering Communities to Translate and Preserve Languages
          </h1>
          <p className="mb-8 text-lg md:text-xl text-fd-muted-foreground max-w-2xl mx-auto">
            Join the effort to make the Bible accessible in every language and preserve linguistic diversity through community-driven translation.
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
          <h2 className="text-3xl font-bold text-center mb-8">About LangQuest</h2>
          <p className="text-lg text-fd-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
            LangQuest is a mobile-first platform designed to support Bible translation and language preservation, 
            particularly for low-resource languages. It enables communities to collaboratively translate the Bible 
            and document linguistic data, fostering cultural and spiritual impact. The platform&apos;s mobile-first approach 
            ensures accessibility, especially in areas with limited internet, and emphasizes community ownership 
            with open-access outputs. Learn more in our <Link href="/docs">documentation</Link>.
          </p>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-6 bg-fd-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">The Need for LangQuest</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="p-6 bg-fd-background rounded-lg border border-fd-border">
              <div className="text-3xl font-bold text-fd-primary mb-2">7,000+</div>
              <div className="text-sm text-fd-muted-foreground">Living Languages Worldwide</div>
            </div>
            <div className="p-6 bg-fd-background rounded-lg border border-fd-border">
              <div className="text-3xl font-bold text-fd-primary mb-2">756</div>
              <div className="text-sm text-fd-muted-foreground">Languages with Complete Bible</div>
            </div>
            <div className="p-6 bg-fd-background rounded-lg border border-fd-border">
              <div className="text-3xl font-bold text-fd-primary mb-2">3,000+</div>
              <div className="text-sm text-fd-muted-foreground">Endangered Languages</div>
            </div>
          </div>
          <p className="text-lg text-fd-muted-foreground max-w-2xl mx-auto">
            Out of over 7,000 languages, the Bible is fully translated into only 756. With over 3,000 endangered 
            languages representing about 43% of the world&apos;s languages, LangQuest bridges this critical gap by 
            empowering communities to preserve their linguistic heritage.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-fd-primary text-fd-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="font-semibold mb-2">Register & Join</h3>
              <p className="text-sm text-fd-muted-foreground">Create an anonymous account and join a translation project</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-fd-primary text-fd-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="font-semibold mb-2">Select Quest</h3>
              <p className="text-sm text-fd-muted-foreground">Choose specific translation tasks with multimedia support</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-fd-primary text-fd-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="font-semibold mb-2">Translate & Vote</h3>
              <p className="text-sm text-fd-muted-foreground">Submit translations and participate in peer review</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-fd-primary text-fd-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="font-semibold mb-2">Track Progress</h3>
              <p className="text-sm text-fd-muted-foreground">Monitor contributions through gamification elements</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/docs/user-guide"
              className="text-fd-primary font-semibold underline hover:text-fd-primary/80"
            >
              View detailed step-by-step guide →
            </Link>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-fd-primary/10 to-fd-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-lg text-fd-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of contributors worldwide in making the Bible accessible in every language 
            and preserving linguistic diversity for future generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/docs/user-guide"
              className="px-8 py-3 bg-fd-primary text-fd-primary-foreground rounded-lg font-semibold hover:bg-fd-primary/90 transition-colors"
            >
              Explore User Guide
            </Link>
            <Link
              href="/docs/features"
              className="px-8 py-3 border border-fd-border rounded-lg font-semibold hover:bg-fd-muted/50 transition-colors"
            >
              View Features
            </Link>
            <Link
              href="/docs/roadmap"
              className="px-8 py-3 border border-fd-border rounded-lg font-semibold hover:bg-fd-muted/50 transition-colors"
            >
              See Roadmap
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
