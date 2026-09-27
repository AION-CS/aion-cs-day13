import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 2.4. Nine measures EngageIT could fund inside €150,000 and five months (the plan's framework). Costs and weeks are
 * Case assumptions. What each measure does is written without naming the problem it answers, so the learner has to match them
 * (Materi A7). The score is the plan's own evaluation: Motivation × Integration × Sustainability. Integration follows from what each
 * measure connects to (printed on each measure), so it is checkable; motivation and sustainability are the learner's judgement.
 * (Field names keep the earlier ones: `exp` = Integration, `fea` = Sustainability, `eff` = Motivation; `joins` is what the measure
 * connects to (all = the membership, the referral programme and the CRM, one = one existing system, none = nothing: it stands alone);
 * `evidence` is its band; `targets` are the problems a measure answers. The problem ids bounce/interaction/coordination now mean low
 * use of services / mediocre customer retention / measures not integrated. The measure ids keep the earlier names too; each measure's
 * `name` says what it is.)
 */
export type MeasureId = "stories" | "types" | "training" | "references" | "aipitch" | "brochure" | "discount" | "video" | "fair";
export const BUDGET = 150000;
export const MONTHS = 5;
export type Bucket = 1 | 2 | 3;

export type ProblemId = "bounce" | "interaction" | "coordination";
export const PROBLEM_IDS: ProblemId[] = ["bounce", "interaction", "coordination"];
export const PROBLEM_LABEL = bi({
  bounce: t("Low use of services", "Geringe Nutzung der Services"),
  interaction: t("Mediocre customer retention", "Mittelmäßige Kundenbindung"),
  coordination: t("Measures not integrated", "Maßnahmen nicht integriert"),
});

export type Joins = "all" | "one" | "none";
export type Evidence = "fast" | "mid" | "slow";
export const bandOf = (j: Joins): Evidence => (j === "all" ? "fast" : j === "one" ? "mid" : "slow");
export const JOINS_LABEL = bi({
  all: t("the membership, the referral programme and the CRM", "die Mitgliedschaft, das Empfehlungsprogramm und das CRM"),
  one: t("one existing system", "ein bestehendes System"),
  none: t("nothing: it stands alone", "nichts: sie steht allein"),
});
export const EVIDENCE_LABEL = bi({
  fast: t("it connects to the membership, the referral programme and the CRM", "sie ist mit Mitgliedschaft, Empfehlungsprogramm und CRM verbunden"),
  mid: t("it connects to one existing system", "sie ist mit einem bestehenden System verbunden"),
  slow: t("it stands alone", "sie steht allein"),
});
export const explainBucket = (e: Evidence): Bucket => (e === "fast" ? 3 : e === "mid" ? 2 : 1);
export const EXPLAIN_RULE = bi({
  v: t(
    "Integration follows from what a measure connects to, printed on each measure: the membership, the referral programme and the CRM together score 3, one existing system scores 2, a measure that stands alone scores 1. A game element that knows nothing of the rest becomes one more island.",
    "Die Integration folgt daraus, womit eine Maßnahme verbunden ist, gedruckt bei jeder Maßnahme: Mitgliedschaft, Empfehlungsprogramm und CRM zusammen ergeben 3, ein bestehendes System ergibt 2, eine Maßnahme, die allein steht, ergibt 1. Ein Spielelement, das vom Rest nichts weiß, wird zu einer weiteren Insel.",
  ),
});

export type Measure = {
  id: MeasureId;
  name: string;
  what: string;
  basis: string;
  joins: Joins;
  evidence: Evidence;
  cost: number;
  weeks: number;
  targets: ProblemId[];
  model: { feasibility: Bucket; effect: Bucket; note: string };
  verdict: string;
};

export const MEASURES: Measure[] = [];
const RAW = bi([
  {
    id: "stories" as MeasureId,
    name: t("A progress path with levels, linked to the membership tiers", "Ein Fortschrittspfad mit Stufen, verknüpft mit den Mitgliedsstufen"),
    what: t("Every account sees its next useful step in the platform; reaching a level of real use unlocks the next membership tier with its services.", "Jedes Konto sieht seinen nächsten nützlichen Schritt in der Plattform; eine Stufe echter Nutzung schaltet die nächste Mitgliedsstufe mit ihren Services frei."),
    basis: t("It connects to the membership, the referral programme and the CRM; in use after 6 weeks.", "Sie ist mit Mitgliedschaft, Empfehlungsprogramm und CRM verbunden; im Einsatz nach 6 Wochen."),
    joins: "all" as Joins,
    cost: 40000,
    weeks: 6,
    targets: ["bounce", "coordination"] as ProblemId[],
    model: { feasibility: 3, effect: 3, note: t("It rewards real use, not clicks, and it ties the game to the membership, so motivation and retention pull the same way.", "Es belohnt echte Nutzung, nicht Klicks, und es verbindet das Spiel mit der Mitgliedschaft, sodass Motivation und Bindung in dieselbe Richtung ziehen.") },
    verdict: t("A model measure: progress that means real use, built into the existing system.", "Eine Modellmaßnahme: Fortschritt, der echte Nutzung bedeutet, eingebaut ins bestehende System."),
  },
  {
    id: "types" as MeasureId,
    name: t("A referral challenge with a shared team goal", "Eine Empfehlungs-Challenge mit gemeinsamem Teamziel"),
    what: t("Customer teams work towards a shared goal of referrals; when a referred firm signs, the referring team gets a training day.", "Kundenteams arbeiten auf ein gemeinsames Empfehlungsziel hin; wenn eine empfohlene Firma unterschreibt, erhält das empfehlende Team einen Schulungstag."),
    basis: t("It connects to one existing system; in use after 4 weeks.", "Sie ist mit einem bestehenden System verbunden; im Einsatz nach 4 Wochen."),
    joins: "one" as Joins,
    cost: 30000,
    weeks: 4,
    targets: ["interaction", "coordination"] as ProblemId[],
    model: { feasibility: 3, effect: 3, note: t("It connects the game with the referral programme and thanks with value, so satisfied teams refer; it links to one system only, so integration 2.", "Es verbindet das Spiel mit dem Empfehlungsprogramm und dankt mit Wert, sodass zufriedene Teams empfehlen; es ist nur mit einem System verbunden, daher Integration 2.") },
    verdict: t("A model measure: a game element that brings new customers through existing ones.", "Eine Modellmaßnahme: ein Spielelement, das über Bestandskunden neue Kunden bringt."),
  },
  {
    id: "training" as MeasureId,
    name: t("Personalised usage tips in the platform", "Personalisierte Nutzungstipps in der Plattform"),
    what: t("When an account has not used a feature that fits its work, the platform shows a short tip and a two-minute guide.", "Wenn ein Konto eine Funktion, die zu seiner Arbeit passt, nicht genutzt hat, zeigt die Plattform einen kurzen Tipp und eine Zwei-Minuten-Anleitung."),
    basis: t("It connects to one existing system; in use after 6 weeks.", "Sie ist mit einem bestehenden System verbunden; im Einsatz nach 6 Wochen."),
    joins: "one" as Joins,
    cost: 35000,
    weeks: 6,
    targets: ["bounce", "interaction"] as ProblemId[],
    model: { feasibility: 3, effect: 3, note: t("It makes the next useful feature easy to find, which raises real use and gives customers a reason to renew; it reads one system, so integration 2.", "Es macht die nächste nützliche Funktion leicht auffindbar, was echte Nutzung erhöht und Kunden einen Grund zum Verlängern gibt; es liest ein System, daher Integration 2.") },
    verdict: t("A model measure: personalisation that turns into use.", "Eine Modellmaßnahme: Personalisierung, die zu Nutzung wird."),
  },
  {
    id: "references" as MeasureId,
    name: t("A customer health dashboard for account managers", "Ein Customer-Health-Dashboard für Account Manager"),
    what: t("Usage, membership, referrals and tickets per account on one screen, so account managers see who needs a call.", "Nutzung, Mitgliedschaft, Empfehlungen und Tickets pro Konto auf einem Bildschirm, sodass Account Manager sehen, wer einen Anruf braucht."),
    basis: t("It connects to the membership, the referral programme and the CRM; in use after 4 weeks.", "Sie ist mit Mitgliedschaft, Empfehlungsprogramm und CRM verbunden; im Einsatz nach 4 Wochen."),
    joins: "all" as Joins,
    cost: 25000,
    weeks: 4,
    targets: ["interaction", "coordination"] as ProblemId[],
    model: { feasibility: 2, effect: 2, note: t("It joins everything, but motivates no customer by itself; it helps only as far as account managers act on it.", "Es verbindet alles, motiviert aber selbst keinen Kunden; es hilft nur so weit, wie Account Manager danach handeln.") },
    verdict: t("Not in the model three: 12 points. A strong base for the optimisation loop.", "Nicht unter den drei Modellmaßnahmen: 12 Punkte. Eine starke Basis für den Optimierungskreislauf."),
  },
  {
    id: "aipitch" as MeasureId,
    name: t("A public leaderboard of all customers by logins", "Eine öffentliche Rangliste aller Kunden nach Anmeldungen"),
    what: t("Every month the platform shows all customers ranked by how often their users log in.", "Jeden Monat zeigt die Plattform alle Kunden, gereiht danach, wie oft sich ihre Nutzer anmelden."),
    basis: t("It connects to one existing system; in use after 3 weeks.", "Sie ist mit einem bestehenden System verbunden; im Einsatz nach 3 Wochen."),
    joins: "one" as Joins,
    cost: 20000,
    weeks: 3,
    targets: ["bounce"] as ProblemId[],
    model: { feasibility: 1, effect: 2, note: t("It raises logins at the top and discourages everyone at the bottom, and it counts clicks, not use: artificial motivation.", "Es erhöht Anmeldungen an der Spitze und entmutigt alle unten, und es zählt Klicks, nicht Nutzung: künstliche Motivation.") },
    verdict: t("Rejected: 4 points. Competition on the wrong number.", "Verworfen: 4 Punkte. Wettbewerb um die falsche Zahl."),
  },
  {
    id: "brochure" as MeasureId,
    name: t("Badges for logging in", "Badges fürs Anmelden"),
    what: t("Users earn a badge after 10, 50 and 100 logins, shown on their profile.", "Nutzer erhalten nach 10, 50 und 100 Anmeldungen ein Badge, das auf ihrem Profil angezeigt wird."),
    basis: t("It stands alone; in use after 3 weeks.", "Sie steht allein; im Einsatz nach 3 Wochen."),
    joins: "none" as Joins,
    cost: 15000,
    weeks: 3,
    targets: [] as ProblemId[],
    model: { feasibility: 1, effect: 2, note: t("Nice for a week, but a login is not use, and the badges connect to nothing else.", "Nett für eine Woche, aber eine Anmeldung ist keine Nutzung, und die Badges sind mit nichts verbunden.") },
    verdict: t("Rejected: 2 points.", "Verworfen: 2 Punkte."),
  },
  {
    id: "discount" as MeasureId,
    name: t("Points for every login, exchangeable for discounts", "Punkte für jede Anmeldung, einlösbar gegen Rabatte"),
    what: t("Every login earns points; 1,000 points give 5% off the next invoice.", "Jede Anmeldung bringt Punkte; 1.000 Punkte geben 5 % Rabatt auf die nächste Rechnung."),
    basis: t("It connects to one existing system; in use after 4 weeks.", "Sie ist mit einem bestehenden System verbunden; im Einsatz nach 4 Wochen."),
    joins: "one" as Joins,
    cost: 50000,
    weeks: 4,
    targets: ["bounce"] as ProblemId[],
    model: { feasibility: 1, effect: 2, note: t("It buys logins with margin: activity rises while the points last, and users learn to click for points.", "Es kauft Anmeldungen mit Marge: Die Aktivität steigt, solange die Punkte laufen, und Nutzer lernen, für Punkte zu klicken.") },
    verdict: t("Rejected: 4 points. A reward for the wrong behaviour.", "Verworfen: 4 Punkte. Eine Belohnung für das falsche Verhalten."),
  },
  {
    id: "video" as MeasureId,
    name: t("A separate gamification app with its own points", "Eine separate Gamification-App mit eigenen Punkten"),
    what: t("A new app with challenges and points, run beside the platform, with its own logins and its own customer data.", "Eine neue App mit Challenges und Punkten, neben der Plattform betrieben, mit eigenen Anmeldungen und eigenen Kundendaten."),
    basis: t("It stands alone; in use after 12 weeks.", "Sie steht allein; im Einsatz nach 12 Wochen."),
    joins: "none" as Joins,
    cost: 60000,
    weeks: 12,
    targets: [] as ProblemId[],
    model: { feasibility: 1, effect: 2, note: t("It adds one more island to a landscape whose problem is that measures are not integrated, and it takes most of the time.", "Es fügt einer Landschaft, deren Problem nicht integrierte Maßnahmen sind, eine weitere Insel hinzu, und es braucht den Großteil der Zeit.") },
    verdict: t("Rejected: 2 points.", "Verworfen: 2 Punkte."),
  },
  {
    id: "fair" as MeasureId,
    name: t("A monthly prize draw among active users", "Eine monatliche Verlosung unter aktiven Nutzern"),
    what: t("Every month a tablet is raffled among users who logged in at least ten times.", "Jeden Monat wird ein Tablet unter Nutzern verlost, die sich mindestens zehnmal angemeldet haben."),
    basis: t("It stands alone; in use after 2 weeks.", "Sie steht allein; im Einsatz nach 2 Wochen."),
    joins: "none" as Joins,
    cost: 20000,
    weeks: 2,
    targets: ["bounce"] as ProblemId[],
    model: { feasibility: 1, effect: 3, note: t("It creates a burst of activity every month, but nothing lasts once the draw is over, and it stands alone.", "Es erzeugt jeden Monat einen Schub an Aktivität, aber nichts hält, wenn die Verlosung vorbei ist, und es steht allein.") },
    verdict: t("Rejected: 3 points. Short-term activation, not sustainable motivation.", "Verworfen: 3 Punkte. Kurzfristige Aktivierung, keine nachhaltige Motivation."),
  },
]);
for (const m of RAW) MEASURES.push(Object.assign(m, { evidence: bandOf(m.joins) }) as Measure);

export const MEASURE_BY_ID = Object.fromEntries(MEASURES.map((m) => [m.id, m])) as Record<MeasureId, Measure>;
export const MEASURE_IDS = MEASURES.map((m) => m.id);
export const CHOOSE = 3;
export const modelScore = (id: MeasureId) => {
  const m = MEASURE_BY_ID[id];
  return explainBucket(m.evidence) * m.model.feasibility * m.model.effect;
};
export const MODEL_MEASURES: MeasureId[] = ["stories", "types", "training"];
export const MODEL_COST = MODEL_MEASURES.reduce((s, id) => s + MEASURE_BY_ID[id].cost, 0);
