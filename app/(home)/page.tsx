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
            and document linguistic data, fostering cultural and spiritual impact. The platform's mobile-first approach 
            ensures accessibility, especially in areas with limited internet, and emphasizes community ownership 
            with open-access outputs.
          </p>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-fd-border rounded-lg">
              <thead>
                <tr className="bg-fd-muted">
                  <th className="border border-fd-border p-4 text-left font-semibold">Feature</th>
                  <th className="border border-fd-border p-4 text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-fd-border p-4 font-medium">Projects and Quests</td>
                  <td className="border border-fd-border p-4">Organize translation efforts, manage membership and content.</td>
                </tr>
                <tr className="bg-fd-muted/20">
                  <td className="border border-fd-border p-4 font-medium">Multimedia Assets</td>
                  <td className="border border-fd-border p-4">Use text, audio, images for contextual translation support.</td>
                </tr>
                <tr>
                  <td className="border border-fd-border p-4 font-medium">Translation and Voting</td>
                  <td className="border border-fd-border p-4">Submit and vote on translations for peer-validated quality.</td>
                </tr>
                <tr className="bg-fd-muted/20">
                  <td className="border border-fd-border p-4 font-medium">Gamification</td>
                  <td className="border border-fd-border p-4">Leaderboards, scores, achievements for sustained engagement.</td>
                </tr>
                <tr>
                  <td className="border border-fd-border p-4 font-medium">Offline Functionality</td>
                  <td className="border border-fd-border p-4">P2P collaboration, sync for low-connectivity areas.</td>
                </tr>
                <tr className="bg-fd-muted/20">
                  <td className="border border-fd-border p-4 font-medium">Anonymity and Security</td>
                  <td className="border border-fd-border p-4">Non-personally identifiable registration, app disguises for safety.</td>
                </tr>
              </tbody>
            </table>
          </div>
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
            languages representing about 43% of the world's languages, LangQuest bridges this critical gap by 
            empowering communities to preserve their linguistic heritage.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-fd-primary text-fd-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="font-semibold mb-2">Register</h3>
              <p className="text-sm text-fd-muted-foreground">Create an account with anonymous registration for safety</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-fd-primary text-fd-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="font-semibold mb-2">Join Project</h3>
              <p className="text-sm text-fd-muted-foreground">Select translation projects based on your language expertise</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-fd-primary text-fd-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="font-semibold mb-2">Select Quest</h3>
              <p className="text-sm text-fd-muted-foreground">Choose specific translation tasks within projects</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-fd-primary text-fd-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="font-semibold mb-2">Submit Translations</h3>
              <p className="text-sm text-fd-muted-foreground">Provide text or audio translations with multimedia context</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-fd-primary text-fd-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">5</div>
              <h3 className="font-semibold mb-2">Vote & Review</h3>
              <p className="text-sm text-fd-muted-foreground">Participate in peer validation of translation quality</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-fd-primary text-fd-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">6</div>
              <h3 className="font-semibold mb-2">Track Progress</h3>
              <p className="text-sm text-fd-muted-foreground">Monitor contributions through gamification and leaderboards</p>
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
              href="/docs"
              className="px-8 py-3 border border-fd-border rounded-lg font-semibold hover:bg-fd-muted/50 transition-colors"
            >
              Browse Documentation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
