import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 1.2 (Optional, read-only: the rates are PRINTED, no figure is asked for, CLAUDE.md #44) and the worked example of Materi A4: what a
 * set-up bar is worth. EngageIT's new customers last year, split by whether the home screen showed a set-up bar (Case assumption). The method is
 *
 *   finish rate                  = finished set-ups ÷ new customers × 100
 *   lift (how many times)        = finish rate with the bar ÷ finish rate without it
 *   extra revenue a year         = new customers a year × (rate with − rate without, as a share of one) × yearly value of a customer who finishes set-up
 *
 * (Identifiers keep the names of the file this was built from: `control` = new customers without the bar, `variant` = with the bar,
 * `sent` = new customers, `orders` = finished set-ups, `order` = yearly value of a customer who finished set-up.) Results are rounded to two decimals.
 */
export const PILOT = {
  control: { sent: 720, orders: 108 },
  variant: { sent: 240, orders: 72 },
  yearly: 2000,
  order: 1200,
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

/** The worked example of Materi A4: a different provider (Weser Systemhaus), the same method on other numbers. Case assumption. */
export const MOSEL = { control: { sent: 400, orders: 40 }, variant: { sent: 200, orders: 50 }, yearly: 800, order: 1000 };
export const MOSEL_RESULT = (() => {
  const rate = rateOf(MOSEL.variant.orders, MOSEL.variant.sent);
  const other = rateOf(MOSEL.control.orders, MOSEL.control.sent);
  return { rate, other, lift: liftOf(rate, other), extra: extraOf(MOSEL.yearly, rate, other, MOSEL.order) };
})();

/* ------------------------------------------------------------------ Block 1.3a · eight moments on the platform */

/**
 * Eight moments on EngageIT's platform. (The type keeps the name "customer" of the file it was built from: `volume` = customers a month at that
 * moment, `leave` = share of them who stop there, `decision` = the customer wants the result of this step on its own (so a game element only has to
 * carry them to something they want), `known` = how much of what EngageIT already runs (membership, referral, customer profile) is connected
 * to the moment.) The rule of Materi A1 and A3: a game element helps most where the customer wants the result and 25% or more stop; it
 * can plug into what exists only where part or all of the membership, referral and profile data is already connected.
 */
export type CustId = "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8";
export type Known = "none" | "part" | "all";
export const KNOWN_LABEL = bi({ none: t("Nothing: membership, referral and profile do not reach this moment", "Nichts: Mitgliedschaft, Empfehlung und Profil erreichen diesen Moment nicht"), part: t("Part of it: the profile data is connected, not the membership or the referral scheme", "Ein Teil: die Profildaten sind verbunden, nicht die Mitgliedschaft oder das Empfehlungsprogramm"), all: t("All of it: membership, referral and profile are connected", "Alles: Mitgliedschaft, Empfehlung und Profil sind verbunden") });
export const DECISION_LABEL = bi({ yes: t("Yes", "Ja"), no: t("No", "Nein") });
export type Customer = { id: CustId; name: string; volume: number; leave: number; decision: boolean; known: Known };
export const LEAVE_MIN = 25;
export const CUSTOMERS: Customer[] = bi([
  { id: "c1" as CustId, name: t("First login → first project created", "Erster Login → erstes Projekt angelegt"), volume: 400, leave: 36, decision: true, known: "none" as Known },
  { id: "c2" as CustId, name: t("First project → inviting colleagues", "Erstes Projekt → Kollegen einladen"), volume: 260, leave: 31, decision: true, known: "none" as Known },
  { id: "c3" as CustId, name: t("Newsletter → opening the platform", "Newsletter → Plattform öffnen"), volume: 5000, leave: 62, decision: false, known: "none" as Known },
  { id: "c4" as CustId, name: t("Set-up finished → first membership benefit used", "Einrichtung fertig → erster Mitgliedschaftsvorteil genutzt"), volume: 150, leave: 8, decision: false, known: "all" as Known },
  { id: "c5" as CustId, name: t("Support ticket closed → tip for the next feature", "Support-Ticket geschlossen → Tipp für die nächste Funktion"), volume: 220, leave: 12, decision: true, known: "part" as Known },
  { id: "c6" as CustId, name: t("Feature page → opening the helpdesk", "Funktionsseite → Helpdesk öffnen"), volume: 700, leave: 22, decision: false, known: "none" as Known },
  { id: "c7" as CustId, name: t("Invoice paid → confirmation page", "Rechnung bezahlt → Bestätigungsseite"), volume: 800, leave: 3, decision: false, known: "none" as Known },
  { id: "c8" as CustId, name: t("Rating request after a ticket → writing a rating", "Bewertungsanfrage nach einem Ticket → Bewertung schreiben"), volume: 80, leave: 40, decision: false, known: "none" as Known },
]);
export const CUST_BY_ID = Object.fromEntries(CUSTOMERS.map((c) => [c.id, c])) as Record<CustId, Customer>;
export const PICK = 2;
export const AUTO_MIN_VOLUME = LEAVE_MIN;
/** A game element helps most: the customer wants the result and 25% or more stop (Materi A1). */
export const VALUABLE_TRUTH: CustId[] = ["c1", "c2"];
/** A game element can plug into what exists: part or all of membership, referral and profile is already connected (Materi A1). */
export const CHURN_TRUTH: CustId[] = ["c4", "c5"];
export const PICK_WHY = bi({
  c1: t("The customer wants a first project, and 36% stop before they have one: a progress path can carry them to something they want. The most critical moment.", "Der Kunde will ein erstes Projekt, und 36 % hören auf, bevor sie eines haben: Ein Fortschrittspfad kann sie zu etwas tragen, das sie wollen. Der kritischste Moment."),
  c2: t("Inviting colleagues is what makes the platform useful, and 31% stop there: a game element helps them take the step they already want.", "Kollegen einzuladen macht die Plattform nützlich, und 31 % hören dort auf: Ein Spielelement hilft ihnen, den Schritt zu gehen, den sie ohnehin wollen."),
  c3: t("Many leave, but nobody wants to open the platform because of a newsletter: a game element would buy clicks, not a habit.", "Viele gehen, aber niemand will die Plattform wegen eines Newsletters öffnen: Ein Spielelement würde Klicks kaufen, keine Gewohnheit."),
  c4: t("The membership benefits, the referral scheme and the profile are all connected here, so a game element can plug into them. Only 8% stop, so it is not the moment that needs the most help.", "Mitgliedschaftsvorteile, Empfehlungsprogramm und Profil sind hier alle verbunden, also kann sich ein Spielelement daran anschließen. Nur 8 % hören auf, also braucht dieser Moment nicht die meiste Hilfe."),
  c5: t("The profile data reaches this moment, so a personal tip or a next-step reward can build on it. Only 12% stop, so it is not the most critical break.", "Die Profildaten erreichen diesen Moment, also kann ein persönlicher Tipp oder eine Belohnung für den nächsten Schritt darauf aufbauen. Nur 12 % hören auf, also ist es nicht der kritischste Bruch."),
  c6: t("22% stop and nothing is connected, but the customer does not want to open the helpdesk: no game element belongs here.", "22 % hören auf, und nichts ist verbunden, aber der Kunde will den Helpdesk nicht öffnen: Hier gehört kein Spielelement hin."),
  c7: t("Almost nobody stops after paying an invoice; the moment works.", "Nach dem Bezahlen einer Rechnung hört fast niemand auf; der Moment funktioniert."),
  c8: t("40% skip the rating, but customers do not want to write one: a reward would buy ratings, not opinions.", "40 % überspringen die Bewertung, aber Kunden wollen keine schreiben: Eine Belohnung würde Bewertungen kaufen, keine Meinungen."),
});

/* ------------------------------------------------------------------ Block 1.3b · three concrete approaches */

/** The three mechanisms from Block 1.1; each approach serves a different one. (The type keeps its earlier name, "basis".) */
export type Basis = "reward" | "compete" | "progress";
export const BASES = bi([
  { id: "reward" as Basis, label: t("Reward", "Belohnung"), short: t("Reward", "Belohnung") },
  { id: "compete" as Basis, label: t("Competition", "Wettbewerb"), short: t("Competition", "Wettbewerb") },
  { id: "progress" as Basis, label: t("Progress and status", "Fortschritt und Status"), short: t("Progress", "Fortschritt") },
]);
export const BASIS_LABEL = bi({ reward: t("Reward", "Belohnung"), compete: t("Competition", "Wettbewerb"), progress: t("Progress and status", "Fortschritt und Status") });
export const INSIGHT_COUNT = 3;
export const INSIGHT_MIN = 45;
export const INSIGHT_FRAME = bi({ v: t("[What we add] at [which moment], so [what the customer gains].", "[Was wir hinzufügen] an [welchem Moment], sodass [was der Kunde gewinnt].") });
/** True when the sentence says what the change gives. A floor, not a judge of quality; English and German forms. */
export const hasSoWhat = (s: string) => /\b(so|therefore|which means|because|means|so that|thus|hence|daher|deshalb|weil|das heißt|bedeutet|sodass|damit|also)\b/i.test(s);
