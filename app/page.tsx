import { KnockoutPreview } from "@/components/knockout-preview";
import { WaitlistForm } from "@/components/waitlist-form";

const problems = [
  {
    title: "USPTO, tab by tab",
    detail:
      "You paste a name into TESS, squint at similar marks, then repeat for the next five candidates you actually like.",
  },
  {
    title: "Domains in another window",
    detail:
      "Whois, Namecheap, a spreadsheet of .com / .io / .dev. The pretty name is taken. The available one sounds like a vitamin.",
  },
  {
    title: "Then the real-world check",
    detail:
      "Product Hunt, App Store, GitHub, LinkedIn, a nervous Google. Someone already shipped it. You start over — after the logo round.",
  },
];

const steps = [
  {
    n: "01",
    title: "Paste candidates",
    detail:
      "Drop in 1–N names you are actually considering. No naming generator. No mood board. Just the shortlist.",
  },
  {
    n: "02",
    title: "Public knockout",
    detail:
      "NameKnock screens public trademarks, live product use, and major TLD availability against that list in one pass.",
  },
  {
    n: "03",
    title: "Pass / caution / fail",
    detail:
      "Each name lands on one screen with a verdict. Keep the ones that survive. Kill the ones that were never going to ship.",
  },
];

const signals = [
  {
    title: "USPTO / public trademarks",
    detail:
      "Word-mark style hits from public trademark databases — enough to see if a name is already spoken for on paper.",
  },
  {
    title: "Real-world product use",
    detail:
      "Shipped products, apps, and public listings that already occupy the name — the collision customers will actually find.",
  },
  {
    title: "Major TLD availability",
    detail:
      ".com and other high-traffic endings, so you do not fall in love with a mark you cannot own on the open web.",
  },
  {
    title: "One-screen verdict",
    detail:
      "Pass, caution, or fail per candidate. Compare the shortlist without rebuilding the research in a doc.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <a
        href="#waitlist"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-panel"
      >
        Skip to waitlist
      </a>

      <header className="border-b border-ink">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="flex items-center gap-2.5 text-foreground">
            <BrandMark />
            <span className="text-sm font-medium tracking-tight">NameKnock</span>
          </a>
          <a
            href="#waitlist"
            className="inline-flex min-h-11 items-center px-2 text-sm text-muted transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Join waitlist
          </a>
        </div>
      </header>

      <main id="top" className="flex-1">
        <section className="border-b border-ink">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16 lg:py-20">
            <div>
              <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.2em] text-accent">
                Public-DB knockout for indie names
              </p>
              <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.08] tracking-tight text-foreground sm:text-5xl">
                Stop naming products blind.
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8 text-foreground">
                Knock out names before you brand hard.
              </p>
              <p className="mt-4 max-w-lg text-base leading-7 text-muted">
                Paste 1–N brand-name candidates. NameKnock screens USPTO/public
                trademarks, real-world product use, and major TLD availability —
                then scores each name pass / caution / fail on one screen.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#waitlist"
                  className="inline-flex bg-accent px-5 py-3 text-sm font-medium text-panel transition hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  Join the waitlist
                </a>
                <p className="text-sm text-muted">No auth. No filing. Waitlist only.</p>
              </div>
            </div>
            <KnockoutPreview />
          </div>
        </section>

        <section aria-labelledby="problem-heading" className="border-b border-ink">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
              The grind
            </p>
            <h2
              id="problem-heading"
              className="mt-3 max-w-2xl text-3xl tracking-tight text-foreground"
            >
              Founders already do this by hand — badly, late, and in twelve tabs.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              The name feels done. Then you check USPTO, hunt domains, and
              discover a live product with the same word. That is how Clearburn
              and Rivetbrief almost got branded — and how most indie launches
              still name themselves.
            </p>
            <ul className="mt-10 grid gap-px bg-ink md:grid-cols-3">
              {problems.map((problem) => (
                <li key={problem.title} className="bg-background px-6 py-7">
                  <h3 className="text-base font-medium text-foreground">{problem.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{problem.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="how-heading" className="border-b border-ink bg-stamp">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
              How it works
            </p>
            <h2
              id="how-heading"
              className="mt-3 text-3xl tracking-tight text-foreground"
            >
              Paste. Knock out. Keep the survivors.
            </h2>
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              {steps.map((step) => (
                <li key={step.n} className="border border-ink bg-panel px-6 py-7">
                  <p className="font-mono text-[0.7rem] text-accent">{step.n}</p>
                  <h3 className="mt-3 text-lg tracking-tight text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="get-heading" className="border-b border-ink">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
              What you get
            </p>
            <h2
              id="get-heading"
              className="mt-3 max-w-xl text-3xl tracking-tight text-foreground"
            >
              A knockout screen, not a naming agency.
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {signals.map((signal) => (
                <li key={signal.title} className="border border-line bg-panel px-6 py-7">
                  <h3 className="text-base font-medium text-foreground">{signal.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{signal.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="disclaimer-heading" className="border-b border-ink">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-accent">
              Not legal advice
            </p>
            <h2
              id="disclaimer-heading"
              className="mt-3 max-w-2xl text-3xl tracking-tight text-foreground"
            >
              Public signals only. No attorney opinion. No auto-filing.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
              NameKnock does not replace a trademark search by counsel. It does
              not tell you that a name is “clear to use,” does not offer an
              attorney opinion, and does not file anything with the USPTO or a
              registrar. It knocks out obvious public collisions so you spend
              legal budget on names that still stand.
            </p>
          </div>
        </section>

        <section aria-labelledby="waitlist-heading" className="bg-ink text-panel">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16 lg:py-20">
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-on-ink-accent">
                Waitlist
              </p>
              <h2 id="waitlist-heading" className="mt-3 text-3xl tracking-tight">
                Get in before the first knockout screens open.
              </h2>
              <p className="mt-4 max-w-md text-base leading-7 text-on-ink-muted">
                Indie founders who are tired of naming in the dark. We will
                email you when NameKnock can take a shortlist.
              </p>
            </div>
            <div className="text-foreground">
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="flex items-center gap-2 text-sm text-foreground">
            <BrandMark />
            NameKnock
          </p>
          <p className="text-sm text-muted">
            Public knockout screen · not legal advice · not a filing tool
          </p>
        </div>
      </footer>
    </div>
  );
}

function BrandMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6 shrink-0"
    >
      <rect width="24" height="24" fill="currentColor" />
      <rect x="5" y="5" width="14" height="14" stroke="#f3efe6" strokeWidth="1.2" fill="none" />
      <path d="M7.5 15.5h9" stroke="#c81e1e" strokeWidth="1.6" />
      <path d="M8.5 9h7M8.5 12h4.5" stroke="#f3efe6" strokeWidth="1.3" />
    </svg>
  );
}
