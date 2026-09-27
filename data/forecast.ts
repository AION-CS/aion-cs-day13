import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 1.2, and the worked example of Materi A4: what an engaged customer is worth. EngageIT's accounts that came up for
 * renewal last year, split by whether they completed the setup path in their first 90 days (Case assumption). The method is
 *
 *   renewal rate                 = renewals ÷ accounts up for renewal × 100
 *   lift (how many times)        = renewal rate of accounts that completed the path ÷ renewal rate of accounts that did not
 *   extra revenue a year         = accounts up for renewal a year × (rate with path − rate without, as a share of one) × annual contract
 *
 * (Identifiers keep the names of the file this was built from: `control` = accounts without the path, `variant` = accounts that
 * completed it, `sent` = accounts up for renewal, `orders` = renewals, `yearly` = accounts up for renewal next year, `order` = annual
 * contract value.) Results are rounded to two decimals.
 */
export const PILOT = {
  control: { sent: 400, orders: 240 },
  variant: { sent: 200, orders: 180 },
  yearly: 500,
  order: 6000,
};

const r2 = (x: number) => Math.round(x * 100) / 100;
export const rateOf = (orders: number, sent: number) => r2((orders / sent) * 100);
export const liftOf = (a: number, b: number) => r2(a / b);
export const extraOf = (yearly: number, variantRate: number, controlRate: number, order: number) => r2(yearly * ((variantRate - controlRate) / 100) * order);

export const FORECAST = {
  f1: rateOf(PILOT.variant.orders, PILOT.variant.sent),
  controlRate: rateOf(PILOT.control.orders, PILOT.control.sent),
  get f2() {
    return liftOf(this.f1, this.controlRate);
  },
  get f3() {
    return extraOf(PILOT.yearly, this.f1, this.controlRate, PILOT.order);
  },
};

export type FigureId = "F1" | "F2" | "F3";
export const FIGURE_IDS: FigureId[] = ["F1", "F2", "F3"];

export const FIGURES = bi({
  F1: {
    id: "F1" as FigureId,
    label: t("F1 · Renewal rate of accounts that completed the setup path, %", "F1 · Verlängerungsquote der Konten, die den Einrichtungspfad abgeschlossen haben, %"),
    question: t("Of the accounts that completed the setup path, what share renewed?", "Welcher Anteil der Konten, die den Einrichtungspfad abgeschlossen haben, hat verlängert?"),
    unit: "%",
    example: "12.5",
    answer: FORECAST.f1,
    formula: t("Renewal rate = renewals ÷ accounts up for renewal × 100. Use the two rows of the accounts that completed the setup path.", "Verlängerungsquote = Verlängerungen ÷ Konten mit anstehender Verlängerung × 100. Nutzen Sie die zwei Zeilen der Konten, die den Einrichtungspfad abgeschlossen haben."),
    taughtIn: "A4" as const,
    clue: t("Did you divide the renewals by the accounts of the same group, and multiply by 100?", "Haben Sie die Verlängerungen durch die Konten derselben Gruppe geteilt und mit 100 multipliziert?"),
    sources: [
      { label: t("Last year · completed the setup path · accounts up for renewal", "Letztes Jahr · Einrichtungspfad abgeschlossen · Konten mit anstehender Verlängerung"), value: "200", target: "fc-var-sent" },
      { label: t("Last year · completed the setup path · renewals", "Letztes Jahr · Einrichtungspfad abgeschlossen · Verlängerungen"), value: "180", target: "fc-var-orders" },
    ],
  },
  F2: {
    id: "F2" as FigureId,
    label: t("F2 · Lift: how many times the renewal rate without the path", "F2 · Lift: wie viel Mal die Verlängerungsquote ohne Pfad"),
    question: t("How many times higher is the renewal rate of accounts that completed the setup path than that of accounts that did not?", "Wie viel Mal höher ist die Verlängerungsquote der Konten, die den Einrichtungspfad abgeschlossen haben, als die der Konten, die es nicht taten?"),
    unit: "×",
    example: "1.5",
    answer: FORECAST.f2,
    formula: t("Lift = renewal rate with the path ÷ renewal rate without it. Work out the rate without the path from its rows first.", "Lift = Verlängerungsquote mit Pfad ÷ Verlängerungsquote ohne Pfad. Berechnen Sie die Quote ohne Pfad zuerst aus ihren Zeilen."),
    taughtIn: "A4" as const,
    clue: t("You need two rates from two pairs of rows. Is the second one worked out from the rows without the path, the same way as F1?", "Sie brauchen zwei Quoten aus zwei Zeilenpaaren. Ist die zweite aus den Zeilen ohne Pfad berechnet, genauso wie F1?"),
    sources: [
      { label: t("Your F1 (renewal rate with the path)", "Ihr F1 (Verlängerungsquote mit Pfad)"), value: "F1", target: "fig-F1" },
      { label: t("Last year · did not complete the path · accounts up for renewal", "Letztes Jahr · Pfad nicht abgeschlossen · Konten mit anstehender Verlängerung"), value: "400", target: "fc-ctl-sent" },
      { label: t("Last year · did not complete the path · renewals", "Letztes Jahr · Pfad nicht abgeschlossen · Verlängerungen"), value: "240", target: "fc-ctl-orders" },
    ],
  },
  F3: {
    id: "F3" as FigureId,
    label: t("F3 · Extra revenue a year, €", "F3 · Zusätzlicher Umsatz pro Jahr, €"),
    question: t("If all 500 accounts up for renewal next year completed the setup path and customers behaved as last year, how much extra revenue would it keep in a year?", "Wenn alle 500 Konten mit anstehender Verlängerung im nächsten Jahr den Einrichtungspfad abschlössen und Kunden sich wie im letzten Jahr verhielten: Wie viel zusätzlichen Umsatz hielte das in einem Jahr?"),
    unit: "€",
    example: "12500",
    answer: FORECAST.f3,
    formula: t("Extra revenue = accounts up for renewal a year × (renewal rate with the path − renewal rate without it, as a share of one) × annual contract value.", "Zusätzlicher Umsatz = Konten mit anstehender Verlängerung pro Jahr × (Verlängerungsquote mit Pfad − Verlängerungsquote ohne Pfad, als Anteil von eins) × Jahresvertragswert."),
    taughtIn: "A4" as const,
    clue: t("Only the difference between the two rates is extra, and it has to be a share of one (1 point = 0.01) before you multiply.", "Nur der Unterschied zwischen den beiden Quoten ist zusätzlich, und er muss ein Anteil von eins sein (1 Punkt = 0,01), bevor Sie multiplizieren."),
    sources: [
      { label: t("Next year · accounts up for renewal", "Nächstes Jahr · Konten mit anstehender Verlängerung"), value: "500", target: "fc-yearly" },
      { label: t("Your F1 (renewal rate with the path)", "Ihr F1 (Verlängerungsquote mit Pfad)"), value: "F1", target: "fig-F1" },
      { label: t("Last year · did not complete the path · accounts and renewals (its rate)", "Letztes Jahr · Pfad nicht abgeschlossen · Konten und Verlängerungen (ihre Quote)"), value: "240 ÷ 400", target: "fc-ctl-orders" },
      { label: t("All accounts · annual contract value", "Alle Konten · Jahresvertragswert"), value: t("€6,000", "6.000 €"), target: "fc-order" },
    ],
  },
});

/** The worked example of Materi A4: a different company (Fulda Software), the same method on other numbers. Case assumption. */
export const MOSEL = { control: { sent: 200, orders: 100 }, variant: { sent: 50, orders: 40 }, yearly: 150, order: 4000 };
export const MOSEL_RESULT = (() => {
  const rate = rateOf(MOSEL.variant.orders, MOSEL.variant.sent);
  const other = rateOf(MOSEL.control.orders, MOSEL.control.sent);
  return { rate, other, lift: liftOf(rate, other), extra: extraOf(MOSEL.yearly, rate, other, MOSEL.order) };
})();

/* ------------------------------------------------------------------ Block 1.3a · eight accounts */

/**
 * Eight of EngageIT's customer accounts, from the platform's usage data and the account managers' notes (Case assumption). (The type
 * keeps the name "customer" of the file it was built from: `volume` = annual contract in €, `leave` = share of the core features the
 * account uses, `decision` = its users log in at least weekly, `known` = what motivates them most according to the account manager:
 * none = points and rewards, campaign = comparing with others, customer = reaching the next level.) The rules of Materi A3: a progress
 * path helps most = logs in at least weekly AND uses fewer than 40% of the core features; risk of artificial motivation = motivated
 * mainly by points and rewards.
 */
export type CustId = "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8";
export type Known = "none" | "campaign" | "customer";
export type Customer = { id: CustId; name: string; volume: number; leave: number; decision: boolean; known: Known };
export const KNOWN_LABEL = bi({ none: t("Points and rewards", "Punkte und Belohnungen"), campaign: t("Comparing with others", "Vergleich mit anderen"), customer: t("Reaching the next level", "Die nächste Stufe erreichen") });
export const DECISION_LABEL = bi({ yes: t("Yes", "Ja"), no: t("No", "Nein") });
export const LEAVE_MIN = 40;
export const CUSTOMERS: Customer[] = bi([
  { id: "c1" as CustId, name: t("Tax firm, office manager", "Steuerkanzlei, Büroleitung"), volume: 12000, leave: 25, decision: true, known: "customer" as Known },
  { id: "c2" as CustId, name: t("Engineering firm, IT lead", "Ingenieurbüro, IT-Leitung"), volume: 18000, leave: 30, decision: true, known: "campaign" as Known },
  { id: "c3" as CustId, name: t("Care home group, administration", "Pflegeheimverbund, Verwaltung"), volume: 24000, leave: 20, decision: false, known: "customer" as Known },
  { id: "c4" as CustId, name: t("Wholesaler, purchasing", "Großhändler, Einkauf"), volume: 15000, leave: 55, decision: true, known: "none" as Known },
  { id: "c5" as CustId, name: t("Retail chain, back office", "Einzelhandelskette, Backoffice"), volume: 30000, leave: 35, decision: false, known: "none" as Known },
  { id: "c6" as CustId, name: t("Law firm, partner", "Kanzlei, Partnerin"), volume: 9000, leave: 70, decision: true, known: "customer" as Known },
  { id: "c7" as CustId, name: t("Logistics firm, dispatcher team", "Logistikunternehmen, Disposition"), volume: 21000, leave: 45, decision: true, known: "campaign" as Known },
  { id: "c8" as CustId, name: t("Software start-up, CTO", "Software-Start-up, CTO"), volume: 6000, leave: 80, decision: false, known: "campaign" as Known },
]);
export const CUST_BY_ID = Object.fromEntries(CUSTOMERS.map((c) => [c.id, c])) as Record<CustId, Customer>;
export const PICK = 2;
export const AUTO_MIN_VOLUME = LEAVE_MIN;
/** A progress path helps most: users log in at least weekly and the account uses fewer than 40% of the core features (Materi A3). */
export const VALUABLE_TRUTH: CustId[] = ["c1", "c2"];
/** Risk of artificial motivation: motivated mainly by points and rewards (Materi A3). */
export const CHURN_TRUTH: CustId[] = ["c4", "c5"];
export const PICK_WHY = bi({
  c1: t("Logs in every week but uses only 25% of the core features: active but shallow. A progress path shows the next useful step to people who are already there.", "Meldet sich jede Woche an, nutzt aber nur 25 % der Kernfunktionen: aktiv, aber oberflächlich. Ein Fortschrittspfad zeigt Menschen, die schon da sind, den nächsten nützlichen Schritt."),
  c2: t("Weekly logins and 30% of the core features: the users come, but stop at the basics. A path to the next level fits them.", "Wöchentliche Anmeldungen und 30 % der Kernfunktionen: Die Nutzer kommen, bleiben aber bei den Grundlagen stehen. Ein Pfad zur nächsten Stufe passt zu ihnen."),
  c3: t("Only 20% of the core features, but users rarely log in: a game element would reach nobody. First a personal onboarding contact, then a path.", "Nur 20 % der Kernfunktionen, aber die Nutzer melden sich selten an: Ein Spielelement erreichte niemanden. Zuerst ein persönlicher Onboarding-Kontakt, dann ein Pfad."),
  c4: t("Motivated mainly by points and rewards: points would make them click for the points, not use the product better. Artificial motivation.", "Vor allem durch Punkte und Belohnungen motiviert: Punkte ließen sie für die Punkte klicken, nicht das Produkt besser nutzen. Künstliche Motivation."),
  c5: t("Motivated by points and rewards, and rarely active: a reward scheme would buy activity that stops when the points stop.", "Durch Punkte und Belohnungen motiviert und selten aktiv: Ein Belohnungssystem kaufte Aktivität, die endet, wenn die Punkte enden."),
  c6: t("Uses 70% of the core features and logs in weekly: already deep. A path adds little; ask for a testimonial or a referral instead.", "Nutzt 70 % der Kernfunktionen und meldet sich wöchentlich an: schon tief drin. Ein Pfad bringt wenig; bitten Sie stattdessen um ein Testimonial oder eine Empfehlung."),
  c7: t("Weekly logins and 45% of the core features: just above the line. A benchmark against similar firms may suit their wish to compare, but they are not the first case for a path.", "Wöchentliche Anmeldungen und 45 % der Kernfunktionen: knapp über der Linie. Ein Benchmark gegenüber ähnlichen Firmen passt vielleicht zu ihrem Wunsch zu vergleichen, aber sie sind nicht der erste Fall für einen Pfad."),
  c8: t("Uses 80% and compares itself with others, but logs in rarely: a small team that uses the platform deeply in bursts. No game needed.", "Nutzt 80 % und vergleicht sich mit anderen, meldet sich aber selten an: ein kleines Team, das die Plattform schubweise intensiv nutzt. Kein Spiel nötig."),
});

/* ------------------------------------------------------------------ Block 1.3b · three gamification approaches */

/** Three mechanisms to build a gamification approach on; each approach uses a different one. (The type keeps its earlier name, "basis".) */
export type Basis = "respond" | "personal" | "learn";
export const BASES = bi([
  { id: "respond" as Basis, label: t("A reward (points, benefits)", "Eine Belohnung (Punkte, Vorteile)"), short: t("Reward", "Belohnung") },
  { id: "personal" as Basis, label: t("Competition or comparison", "Wettbewerb oder Vergleich"), short: t("Competition", "Wettbewerb") },
  { id: "learn" as Basis, label: t("Progress and status (a path, a level)", "Fortschritt und Status (ein Pfad, eine Stufe)"), short: t("Progress", "Fortschritt") },
]);
export const BASIS_LABEL = bi({ respond: t("A reward", "Eine Belohnung"), personal: t("Competition or comparison", "Wettbewerb oder Vergleich"), learn: t("Progress and status", "Fortschritt und Status") });
export const INSIGHT_COUNT = 3;
export const INSIGHT_MIN = 45;
export const INSIGHT_FRAME = bi({ v: t("[What the platform does] for [which users or feature], so [what they use more, and why it lasts].", "[Was die Plattform tut] für [welche Nutzer oder Funktion], sodass [was sie mehr nutzen, und warum es hält].") });
/** True when the sentence says what the change gives. A floor, not a judge of quality; English and German forms. */
export const hasSoWhat = (s: string) => /\b(so|therefore|which means|because|means|so that|thus|hence|daher|deshalb|weil|das heißt|bedeutet|sodass|damit|also)\b/i.test(s);
