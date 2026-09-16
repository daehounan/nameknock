const rows = [
  {
    name: "kitewell",
    verdict: "pass" as const,
    signals: "No live product · USPTO clear in class 9 · .com open",
  },
  {
    name: "nockline",
    verdict: "caution" as const,
    signals: "Similar mark in class 42 · .io taken · no exact product hit",
  },
  {
    name: "pithboard",
    verdict: "fail" as const,
    signals: "Live SaaS + registered word mark · .com parked",
  },
];

const verdictLabel = {
  pass: "Pass",
  caution: "Caution",
  fail: "Fail",
};

const verdictClass = {
  pass: "border-pass/40 bg-pass/10 text-pass",
  caution: "border-caution/40 bg-caution/10 text-caution",
  fail: "border-fail/40 bg-fail/10 text-fail",
};

export function KnockoutPreview() {
  return (
    <figure className="border border-ink bg-panel shadow-[6px_6px_0_0_#14151a]">
      <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
          Knockout screen
        </p>
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-foreground">
          3 candidates
        </p>
      </div>
      <figcaption className="sr-only">
        Illustrative NameKnock screen showing three sample brand names marked
        pass, caution, and fail. Not a live search.
      </figcaption>
      <ul className="divide-y divide-line">
        {rows.map((row) => (
          <li key={row.name} className="grid gap-2 px-4 py-4 sm:grid-cols-[7.5rem_5.5rem_1fr] sm:items-start sm:gap-4 sm:px-5">
            <p className="font-mono text-sm text-foreground">{row.name}</p>
            <p
              className={`w-fit border px-2 py-0.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] ${verdictClass[row.verdict]}`}
            >
              {verdictLabel[row.verdict]}
            </p>
            <p className="text-sm leading-6 text-muted">{row.signals}</p>
          </li>
        ))}
      </ul>
      <p className="border-t border-line px-4 py-3 font-mono text-[0.65rem] leading-5 text-muted sm:px-5">
        Illustrative results. Public signals only — not legal advice.
      </p>
    </figure>
  );
}
