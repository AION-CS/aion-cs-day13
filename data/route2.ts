import { bi, t } from "@/lib/lang";

/**
 * Route 2 (Level 3) data: the Transfer Project. EngageIT's Chief Customer Officer builds an integrated customer retention architecture:
 * individual measures exist, retention is not systematically managed and potential is unused; with a limited budget, uncertain customer
 * reactions and a complex system landscape, and an integration decision despite unclear success impact. Every figure is a Case
 * assumption (the plan gives the role, the situation and the constraints, not numbers). (Identifiers keep the names of the file this
 * was built from: a "source" is a motivation mechanism, a "component" is a KPI candidate, a "situation" is a tested approach, `complete`
 * is the share of pilot accounts that engaged with the mechanism; the owner ids cdo/datalead/cslead/saleslead/it now mean
 * CCO/Customer Operations/Customer Success/Sales/Platform.)
 */
export const R2_BUDGET = 200000;
export const R2_MONTHS = 6;
export type Bucket = 1 | 2 | 3;

/* ------------------------------------------------------------------ 3.1 · target vision of an integrated retention architecture */

export type PrincipleId = "defs" | "rules" | "owners" | "review" | "hoard" | "blackbox";
export const PRINCIPLE_IDS: PrincipleId[] = ["defs", "rules", "owners", "review", "hoard", "blackbox"];
export const PRINCIPLES = bi({
  defs: { id: "defs" as PrincipleId, name: t("Motivation builds on real value: every game element leads to using the product better", "Motivation baut auf echtem Wert auf: Jedes Spielelement führt dazu, das Produkt besser zu nutzen"), means: t("Progress, rewards and comparisons count real use of the platform, never clicks or logins.", "Fortschritt, Belohnungen und Vergleiche zählen echte Nutzung der Plattform, nie Klicks oder Anmeldungen.") },
  rules: { id: "rules" as PrincipleId, name: t("One system: membership, referrals, personalisation and game elements share one customer profile and one set of KPIs", "Ein System: Mitgliedschaft, Empfehlungen, Personalisierung und Spielelemente teilen ein Kundenprofil und einen Satz KPIs"), means: t("A step on the progress path can unlock a membership tier, a personal tip or a referral challenge, because every part knows what the others know.", "Ein Schritt auf dem Fortschrittspfad kann eine Mitgliedsstufe, einen persönlichen Tipp oder eine Empfehlungs-Challenge freischalten, weil jeder Teil weiß, was die anderen wissen.") },
  owners: { id: "owners" as PrincipleId, name: t("Every part of the architecture has an owner and a KPI", "Jeder Teil der Architektur hat einen Owner und einen KPI"), means: t("Someone answers for the progress path, the membership, the referrals and the tips, and sees whether each keeps customers.", "Jemand steht für den Fortschrittspfad, die Mitgliedschaft, die Empfehlungen und die Tipps ein und sieht, ob jedes Kunden hält.") },
  review: { id: "review" as PrincipleId, name: t("A monthly optimisation review decides on every part by the same KPIs", "Ein monatliches Optimierungs-Review entscheidet über jeden Teil nach denselben KPIs"), means: t("Every month: what to keep, what to test further, what to stop, and what the rewards cost.", "Jeden Monat: was bleibt, was weiter getestet wird, was gestoppt wird, und was die Belohnungen kosten.") },
  hoard: { id: "hoard" as PrincipleId, name: t("Reward every click: the more points, the more engagement", "Jeden Klick belohnen: je mehr Punkte, desto mehr Engagement"), means: t("Points for every login and every page viewed, for every customer.", "Punkte für jede Anmeldung und jede angesehene Seite, für jeden Kunden.") },
  blackbox: { id: "blackbox" as PrincipleId, name: t("Add a new tool for every new idea", "Für jede neue Idee ein neues Werkzeug einführen"), means: t("Each team buys its own app for its own game, loyalty or referral idea.", "Jedes Team kauft seine eigene App für seine eigene Spiel-, Treue- oder Empfehlungsidee.") },
});
/** An integrated architecture needs both: motivation built on real use (so it lasts) and one shared system (so the parts reinforce each other). */
export const PRINCIPLE_MUST: PrincipleId[] = ["defs", "rules"];
export const PRINCIPLE_TRAP: PrincipleId[] = ["hoard", "blackbox"];

/* ------------------------------------------------------------------ 3.2 · central motivation mechanisms (gamification) */

export type SourceId = "pricing" | "quote" | "chat" | "onboarding" | "social" | "renewal" | "blog" | "careers";
export const SOURCE_IDS: SourceId[] = ["pricing", "quote", "chat", "onboarding", "social", "renewal", "blog", "careers"];
export type Use = "core" | "later" | "leave";
export const USE_LABEL = bi({ core: t("Central: use now", "Zentral: jetzt einsetzen"), later: t("Central: pilot first", "Zentral: zuerst pilotieren"), leave: t("Not central", "Nicht zentral") });
/** `decision` is the customer action the mechanism leads to (null when none); `complete` is the share of pilot accounts that engaged with it. */
export type Source = { id: SourceId; name: string; decision: string | null; complete: number; cost: number };
export const SOURCES: Source[] = bi([
  { id: "pricing" as SourceId, name: t("Progress path to the next membership tier", "Fortschrittspfad zur nächsten Mitgliedsstufe"), decision: t("Use more of the platform", "Mehr von der Plattform nutzen"), complete: 90, cost: 14000 },
  { id: "quote" as SourceId, name: t("Setup checklist for the first 30 days", "Einrichtungs-Checkliste für die ersten 30 Tage"), decision: t("Start using the key features", "Die wichtigsten Funktionen zu nutzen beginnen"), complete: 85, cost: 8000 },
  { id: "chat" as SourceId, name: t("Personal usage tips when a feature is unused", "Persönliche Nutzungstipps, wenn eine Funktion ungenutzt ist"), decision: t("Try a feature they have not used", "Eine Funktion ausprobieren, die sie noch nicht genutzt haben"), complete: 88, cost: 10000 },
  { id: "onboarding" as SourceId, name: t("Team challenge for the security training", "Team-Challenge für die Sicherheitsschulung"), decision: t("Train their staff", "Ihre Mitarbeitenden schulen"), complete: 50, cost: 9000 },
  { id: "social" as SourceId, name: t("Referral challenge with a shared goal", "Empfehlungs-Challenge mit gemeinsamem Ziel"), decision: t("Refer a peer", "Einen Kollegen empfehlen"), complete: 60, cost: 12000 },
  { id: "renewal" as SourceId, name: t("Benchmark: your usage compared with similar firms", "Benchmark: Ihre Nutzung im Vergleich zu ähnlichen Firmen"), decision: t("Justify the renewal internally", "Die Verlängerung intern rechtfertigen"), complete: 40, cost: 11000 },
  { id: "blog" as SourceId, name: t("Badges for logging in", "Badges fürs Anmelden"), decision: null, complete: 100, cost: 3000 },
  { id: "careers" as SourceId, name: t("Avatars and profile themes", "Avatare und Profil-Designs"), decision: null, complete: 95, cost: 5000 },
]);
export const SOURCE_BY_ID = Object.fromEntries(SOURCES.map((s) => [s.id, s])) as Record<SourceId, Source>;
export const QUALITY_BAR = 80;
/** The rule of Materi B2: no customer action behind the mechanism → not central; an action and ≥ 80% of pilot accounts engaged → use now; an action but fewer engaged → pilot first. */
export const useOf = (s: Source): Use => (!s.decision ? "leave" : s.complete >= QUALITY_BAR ? "core" : "later");

/* ------------------------------------------------------------------ 3.3 · a KPI system for the integrated architecture */

export type CompId = "conv" | "cv" | "engage" | "nps" | "churn" | "emails" | "followers" | "stories";
export const COMP_IDS: CompId[] = ["conv", "cv", "engage", "nps", "churn", "emails", "followers", "stories"];
export type Criterion = "explain" | "timely" | "reach" | "scale";
export const CRIT_IDS: Criterion[] = ["explain", "timely", "reach", "scale"];
export const CRITERIA = bi([
  { id: "explain" as Criterion, name: t("Link to value", "Verbindung zum Wert"), test: t("Does it move with customers kept, revenue or customers won?", "Bewegt er sich mit gehaltenen Kunden, Umsatz oder gewonnenen Kunden?"), low: t("It counts our activity or reach.", "Er zählt unsere Aktivität oder Reichweite."), high: t("It is, or leads directly to, customers kept or won.", "Er ist gehaltene oder gewonnene Kunden, oder führt direkt dazu.") },
  { id: "timely" as Criterion, name: t("Early", "Früh"), test: t("How early does it show a change, before the customer is lost?", "Wie früh zeigt er eine Veränderung, bevor der Kunde verloren ist?"), low: t("After the customer has left, or twice a year.", "Nachdem der Kunde gegangen ist, oder zweimal im Jahr."), high: t("Every week or faster.", "Jede Woche oder schneller.") },
  { id: "reach" as Criterion, name: t("Reach", "Reichweite"), test: t("Does it cover every account, with or without the game elements?", "Deckt er jedes Konto ab, mit oder ohne Spielelemente?"), low: t("Some customers only.", "Nur einige Kunden."), high: t("Every customer.", "Jeden Kunden.") },
  { id: "scale" as Criterion, name: t("Measured automatically", "Automatisch gemessen"), test: t("Is it counted by the systems, without anyone collecting it?", "Wird er von den Systemen gezählt, ohne dass jemand ihn sammelt?"), low: t("Someone collects it by hand each time.", "Jemand sammelt ihn jedes Mal von Hand."), high: t("The systems count it by themselves.", "Die Systeme zählen ihn selbst.") },
]);
export type Cadence = "weekly" | "monthly" | "after" | "halfyear";
export type CostShape = "one-off" | "per customer" | "per analysis";
export type Comp = { id: CompId; name: string; what: string; explains: boolean; cadence: Cadence; coversAll: boolean; costShape: CostShape; model: Record<Criterion, Bucket>; note: string };
export const CADENCE_LABEL = bi({ weekly: t("every week", "jede Woche"), monthly: t("monthly", "monatlich"), after: t("after the customer has left", "nachdem der Kunde gegangen ist"), halfyear: t("twice a year", "zweimal im Jahr") });
export const COST_SHAPE_LABEL = bi({ "one-off": t("counted by the systems", "von den Systemen gezählt"), "per customer": t("by a survey", "über eine Befragung"), "per analysis": t("collected by hand", "von Hand gesammelt") });
export const LINK_LABEL = bi({ yes: t("linked to value", "mit dem Wert verbunden"), no: t("not linked to value", "nicht mit dem Wert verbunden") });
export const COMPS: Comp[] = bi([
  { id: "conv" as CompId, name: t("Renewal rate", "Verlängerungsquote"), what: t("Share of accounts whose contract comes up and who renew, from the CRM.", "Anteil der Konten mit auslaufendem Vertrag, die verlängern, aus dem CRM."), explains: true, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("The result the brief is about, counted every week by the CRM as contracts come up.", "Das Ergebnis, um das es im Auftrag geht, jede Woche vom CRM gezählt, wenn Verträge auslaufen.") },
  { id: "cv" as CompId, name: t("Accounts using three or more core features", "Konten, die drei oder mehr Kernfunktionen nutzen"), what: t("Share of accounts that use at least three core features for real work, from the platform.", "Anteil der Konten, die mindestens drei Kernfunktionen für echte Arbeit nutzen, aus der Plattform."), explains: true, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("The driver the brief names (low use of services): accounts that use the product for real work renew; it moves the week a mechanism changes.", "Der Treiber, den der Auftrag nennt (geringe Nutzung der Services): Konten, die das Produkt für echte Arbeit nutzen, verlängern; er bewegt sich in der Woche, in der sich ein Mechanismus ändert.") },
  { id: "engage" as CompId, name: t("Referred firms that became customers", "Empfohlene Firmen, die Kunden wurden"), what: t("New customers from referrals within 90 days of the referral, from the CRM.", "Neukunden aus Empfehlungen innerhalb von 90 Tagen nach der Empfehlung, aus dem CRM."), explains: true, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("Shows whether the referral part of the architecture brings customers.", "Zeigt, ob der Empfehlungsteil der Architektur Kunden bringt.") },
  { id: "nps" as CompId, name: t("Satisfaction score from a survey", "Zufriedenheitswert aus einer Befragung"), what: t("How satisfied customers say they are; about 20% answer.", "Wie zufrieden Kunden nach eigener Aussage sind; etwa 20 % antworten."), explains: true, cadence: "halfyear" as Cadence, coversAll: false, costShape: "per customer" as CostShape, model: { explain: 3, timely: 1, reach: 2, scale: 2 }, note: t("Linked to value, but twice a year is too slow to steer six months by.", "Mit dem Wert verbunden, aber zweimal im Jahr ist zu langsam, um sechs Monate danach zu steuern.") },
  { id: "churn" as CompId, name: t("Cancellations per quarter", "Kündigungen pro Quartal"), what: t("Accounts that cancelled in the quarter.", "Konten, die im Quartal gekündigt haben."), explains: true, cadence: "after" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 1, reach: 3, scale: 3 }, note: t("Counts the loss exactly, after the customer has decided.", "Zählt den Verlust genau, nachdem der Kunde entschieden hat.") },
  { id: "emails" as CompId, name: t("Points issued", "Vergebene Punkte"), what: t("Points the platform handed out in the month.", "Punkte, die die Plattform im Monat vergeben hat."), explains: false, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 1, timely: 3, reach: 3, scale: 3 }, note: t("It rose from 4,000 to 12,000 in the pilot while renewals stayed flat: points issued are not value created.", "Sie stiegen im Pilot von 4.000 auf 12.000, während die Verlängerungen gleich blieben: vergebene Punkte sind kein geschaffener Wert.") },
  { id: "followers" as CompId, name: t("Badges shared on social media", "In Social Media geteilte Badges"), what: t("Badges users posted on their social media profiles.", "Badges, die Nutzer auf ihren Social-Media-Profilen gepostet haben."), explains: false, cadence: "weekly" as Cadence, coversAll: false, costShape: "one-off" as CostShape, model: { explain: 1, timely: 3, reach: 2, scale: 3 }, note: t("Reach among whoever follows, not the decisions of customers.", "Reichweite bei denen, die folgen, nicht die Entscheidungen von Kunden.") },
  { id: "stories" as CompId, name: t("Account managers' monthly highlights", "Monatliche Highlights der Account Manager"), what: t("Each month, account managers report the accounts that became more active thanks to the game elements.", "Jeden Monat berichten Account Manager die Konten, die dank der Spielelemente aktiver wurden."), explains: false, cadence: "monthly" as Cadence, coversAll: false, costShape: "per analysis" as CostShape, model: { explain: 1, timely: 2, reach: 2, scale: 1 }, note: t("Vivid, but it counts the cases someone chose to tell, without the others and without a comparison.", "Anschaulich, aber sie zählt die Fälle, die jemand erzählen wollte, ohne die anderen und ohne Vergleich.") },
]);
export const COMP_BY_ID = Object.fromEntries(COMPS.map((c) => [c.id, c])) as Record<CompId, Comp>;
export const COMP_CHOOSE = 3;
export const MODEL_COMPS: CompId[] = ["conv", "cv", "engage"];
export const MODEL_GREATEST: CompId = "cv";
export function maxRating(id: CompId, c: Criterion): Bucket {
  const x = COMP_BY_ID[id];
  if (c === "explain") return x.explains ? 3 : 1;
  if (c === "timely") return x.cadence === "weekly" ? 3 : x.cadence === "monthly" ? 2 : 1;
  if (c === "reach") return x.coversAll ? 3 : 2;
  return x.costShape === "one-off" ? 3 : x.costShape === "per customer" ? 2 : 1;
}
export const isEarly = (id: CompId) => COMP_BY_ID[id].cadence === "weekly" || COMP_BY_ID[id].cadence === "monthly";

/* ------------------------------------------------------------------ 3.4 · integration of membership, referral and personalisation, tested */

export type SitId = "reco" | "renewal" | "botname" | "subject" | "price" | "winback";
export const SIT_IDS: SitId[] = ["reco", "renewal", "botname", "subject", "price", "winback"];
export type Action = "intervene" | "watch" | "none";
export const ACTION_LABEL = bi({ intervene: t("Roll out", "Ausrollen"), watch: t("Keep testing", "Weiter testen"), none: t("Stop", "Stoppen") });
export type LogicOwner = "csm" | "sales" | "data" | "nobody";
export const LOGIC_OWNERS: LogicOwner[] = ["csm", "sales", "data", "nobody"];
export const LOGIC_OWNER_LABEL = bi({ csm: t("Customer Success", "Customer Success"), sales: t("Sales", "Vertrieb"), data: t("Customer operations", "Customer Operations"), nobody: t("No one (stopped)", "Niemand (gestoppt)") });
export type Situation = { id: SitId; signal: string; lift: number; cases: number; revenue: number; note: string };
export const SITUATIONS: Situation[] = bi([
  { id: "reco" as SitId, signal: t("A progress path for new accounts in the first 90 days, linked to the membership tier", "Ein Fortschrittspfad für neue Konten in den ersten 90 Tagen, verknüpft mit der Mitgliedsstufe"), lift: 42, cases: 160, revenue: 190000, note: t("No complaints; accounts reached the second tier faster.", "Keine Beschwerden; Konten erreichten die zweite Stufe schneller.") },
  { id: "renewal" as SitId, signal: t("A benchmark report against similar firms", "Ein Benchmark-Bericht im Vergleich zu ähnlichen Firmen"), lift: 26, cases: 45, revenue: 80000, note: t("Only 45 renewals fell in the test months.", "In den Testmonaten standen nur 45 Verlängerungen an.") },
  { id: "botname" as SitId, signal: t("Points for every login", "Punkte für jede Anmeldung"), lift: 2, cases: 500, revenue: 8000, note: t("Many accounts, almost no difference in real use.", "Viele Konten, fast kein Unterschied in der echten Nutzung.") },
  { id: "subject" as SitId, signal: t("A monthly usage e-mail with tips", "Eine monatliche Nutzungs-E-Mail mit Tipps"), lift: 5, cases: 280, revenue: 25000, note: t("A small, steady difference.", "Ein kleiner, stabiler Unterschied.") },
  { id: "price" as SitId, signal: t("A public leaderboard of all customers", "Eine öffentliche Rangliste aller Kunden"), lift: -7, cases: 150, revenue: -30000, note: t("Accounts ranked low used the platform less; four complained.", "Niedrig gereihte Konten nutzten die Plattform weniger; vier beschwerten sich.") },
  { id: "winback" as SitId, signal: t("A referral challenge with a shared team goal", "Eine Empfehlungs-Challenge mit gemeinsamem Teamziel"), lift: 31, cases: 130, revenue: 140000, note: t("Guardrail: no fake referrals; reward cost within the limit.", "Guardrail: keine gefälschten Empfehlungen; Belohnungskosten im Rahmen.") },
]);
export const SIT_BY_ID = Object.fromEntries(SITUATIONS.map((s) => [s.id, s])) as Record<SitId, Situation>;
export const LIFT_ACT = 10;
export const LIFT_WATCH = 3;
export const CASES_MIN = 100;
export const actionOf = (s: Situation): Action => (s.lift >= LIFT_ACT && s.cases >= CASES_MIN ? "intervene" : s.lift >= LIFT_WATCH ? "watch" : "none");
export const OWNER_ACCEPT_LOGIC: Record<SitId, LogicOwner[]> = { reco: ["csm"], renewal: ["data"], botname: ["nobody"], subject: ["data"], price: ["nobody"], winback: ["sales"] };
export type LogicRow = { action: Action | null; owner: LogicOwner | null };

/* ------------------------------------------------------------------ 3.5 · prioritised implementation strategy */

export type ArchId = "foundation" | "chat" | "personal" | "routing" | "training" | "tracking" | "suite" | "relaunch";
export const ARCH_IDS: ArchId[] = ["foundation", "chat", "personal", "routing", "training", "tracking", "suite", "relaunch"];
export type ArchItem = { id: ArchId; name: string; what: string; cost: number; weeks: number; blackBox: boolean };
export const ARCH: ArchItem[] = bi([
  { id: "foundation" as ArchId, name: t("One customer profile linking membership, referrals, usage and the CRM", "Ein Kundenprofil, das Mitgliedschaft, Empfehlungen, Nutzung und CRM verbindet"), what: t("Every part of the architecture reads and writes the same profile per account, with the KPIs to measure it.", "Jeder Teil der Architektur liest und schreibt dasselbe Profil pro Konto, mit den KPIs, um es zu messen."), cost: 50000, weeks: 8, blackBox: false },
  { id: "chat" as ArchId, name: t("Progress path with levels linked to the membership tiers", "Fortschrittspfad mit Stufen, verknüpft mit den Mitgliedsstufen"), what: t("Each account sees its next useful step; a level of real use unlocks the next membership tier.", "Jedes Konto sieht seinen nächsten nützlichen Schritt; eine Stufe echter Nutzung schaltet die nächste Mitgliedsstufe frei."), cost: 40000, weeks: 6, blackBox: false },
  { id: "personal" as ArchId, name: t("Personalised usage tips in the platform", "Personalisierte Nutzungstipps in der Plattform"), what: t("A short tip and a two-minute guide when an account has not used a feature that fits its work.", "Ein kurzer Tipp und eine Zwei-Minuten-Anleitung, wenn ein Konto eine passende Funktion nicht genutzt hat."), cost: 35000, weeks: 6, blackBox: false },
  { id: "routing" as ArchId, name: t("Referral challenge with a shared team goal", "Empfehlungs-Challenge mit gemeinsamem Teamziel"), what: t("Customer teams work towards a referral goal; a training day when a referred firm signs.", "Kundenteams arbeiten auf ein Empfehlungsziel hin; ein Schulungstag, wenn eine empfohlene Firma unterschreibt."), cost: 25000, weeks: 4, blackBox: false },
  { id: "training" as ArchId, name: t("Integrated KPI dashboard and a monthly optimisation review", "Integriertes KPI-Dashboard und ein monatliches Optimierungs-Review"), what: t("The same few KPIs for every part on one page, and a monthly meeting that decides what to keep, test or stop.", "Dieselben wenigen KPIs für jeden Teil auf einer Seite und ein monatliches Treffen, das entscheidet, was bleibt, getestet oder gestoppt wird."), cost: 15000, weeks: 2, blackBox: false },
  { id: "tracking" as ArchId, name: t("Guardrails against gaming the system", "Guardrails gegen das Austricksen des Systems"), what: t("Activity checks, reward caps per account, and progress counted only for real use.", "Aktivitätsprüfungen, Belohnungsobergrenzen pro Konto und Fortschritt, der nur für echte Nutzung zählt."), cost: 15000, weeks: 3, blackBox: false },
  { id: "suite" as ArchId, name: t("AI engagement engine that sets rewards per user itself", "KI-Engagement-Engine, die Belohnungen pro Nutzer selbst festlegt"), what: t("A vendor tool decides every user's challenges and rewards by itself; its rules and results are not shown.", "Ein Anbieter-Werkzeug entscheidet die Challenges und Belohnungen jedes Nutzers selbst; seine Regeln und Ergebnisse werden nicht gezeigt."), cost: 70000, weeks: 10, blackBox: true },
  { id: "relaunch" as ArchId, name: t("A separate gamification app with its own points", "Eine separate Gamification-App mit eigenen Punkten"), what: t("A new app beside the platform, with its own logins and its own customer data.", "Eine neue App neben der Plattform, mit eigenen Anmeldungen und eigenen Kundendaten."), cost: 60000, weeks: 12, blackBox: false },
]);
export const ARCH_BY_ID = Object.fromEntries(ARCH.map((a) => [a.id, a])) as Record<ArchId, ArchItem>;
export const BASELINE_ITEM: ArchId = "foundation";

export type OwnerId = "cdo" | "datalead" | "cslead" | "saleslead" | "it";
export const OWNER_IDS: OwnerId[] = ["cdo", "datalead", "cslead", "saleslead", "it"];
export const OWNERS = bi({
  cdo: { name: t("Chief Customer Officer (you)", "Chief Customer Officer (Sie)"), profile: t("Decides across teams and answers to the board. Should hold few items.", "Entscheidet über Teams hinweg und berichtet an den Vorstand. Sollte wenige Punkte halten.") },
  datalead: { name: t("Head of Customer Operations", "Leitung Customer Operations"), profile: t("Owns the KPIs and their definitions, the guardrails against gaming and the monthly review.", "Verantwortet die KPIs und ihre Definitionen, die Guardrails gegen Austricksen und das monatliche Review.") },
  cslead: { name: t("Head of Customer Success", "Leitung Customer Success"), profile: t("Owns the accounts' journey: the membership tiers, the progress path and the usage tips.", "Verantwortet den Weg der Konten: die Mitgliedsstufen, den Fortschrittspfad und die Nutzungstipps.") },
  saleslead: { name: t("Head of Sales", "Vertriebsleitung"), profile: t("Leads the salespeople, follows up referred firms and owns the referral challenge.", "Führt die Vertriebsleute, verfolgt empfohlene Firmen nach und verantwortet die Empfehlungs-Challenge.") },
  it: { name: t("Head of Platform", "Leitung Plattform"), profile: t("Owns the platform, the customer profile and the interfaces between the systems.", "Verantwortet die Plattform, das Kundenprofil und die Schnittstellen zwischen den Systemen.") },
});
export const OWNER_ACCEPT: Record<ArchId, OwnerId[]> = {
  foundation: ["it", "datalead"],
  chat: ["cslead"],
  personal: ["cslead", "it"],
  routing: ["saleslead"],
  training: ["datalead"],
  tracking: ["datalead"],
  suite: ["it", "cdo"],
  relaunch: ["it"],
};
export const MODEL_ARCH: ArchId[] = ["foundation", "chat", "personal", "routing", "training", "tracking"];
export const MODEL_START: Partial<Record<ArchId, number>> = { foundation: 1, training: 1, tracking: 1, chat: 2, personal: 2, routing: 3 };
export const MODEL_TRIGGER = bi({
  foundation: t("If fewer than 80% of accounts have usage, membership and referral data in the profile by month 2, the progress path waits for the missing interfaces.", "Haben bis Monat 2 weniger als 80 % der Konten Nutzungs-, Mitgliedschafts- und Empfehlungsdaten im Profil, wartet der Fortschrittspfad auf die fehlenden Schnittstellen."),
  chat: t("If fewer than 50% of new accounts complete the first level by month 4, the steps are shortened with the accounts that dropped out.", "Schließen bis Monat 4 weniger als 50 % der neuen Konten die erste Stufe ab, werden die Schritte mit den ausgestiegenen Konten gekürzt."),
  personal: t("If fewer than 20% of tips lead to the feature being used within a week by month 4, the tips are rewritten or switched off.", "Führen bis Monat 4 weniger als 20 % der Tipps innerhalb einer Woche zur Nutzung der Funktion, werden die Tipps neu geschrieben oder abgeschaltet."),
  routing: t("If fewer than 8 referred firms have become customers by month 5, the Head of Sales reviews every open referral with the teams.", "Sind bis Monat 5 weniger als 8 empfohlene Firmen Kunden geworden, prüft die Vertriebsleitung jede offene Empfehlung mit den Teams."),
  training: t("If any part has no KPI value for a month, the review names the missing data and its owner.", "Hat ein Teil einen Monat lang keinen KPI-Wert, nennt das Review die fehlenden Daten und ihren Owner."),
  tracking: t("If more than 5 accounts a month show suspicious activity to collect rewards, rewards are capped until the check is tightened.", "Zeigen mehr als 5 Konten pro Monat verdächtige Aktivität zum Sammeln von Belohnungen, werden die Belohnungen begrenzt, bis die Prüfung verschärft ist."),
});

/* ------------------------------------------------------------------ 3.6 · an integration decision despite unclear success impact */

export type DecisionId = "commit" | "stage" | "wait";
export const DECISIONS = bi([
  { id: "commit" as DecisionId, label: t("Integrate everything at once: one new platform with every game element for all customers", "Alles auf einmal integrieren: eine neue Plattform mit jedem Spielelement für alle Kunden"), detail: t("From month 1 every measure moves onto a new platform with points, rankings, paths and challenges for every account.", "Ab Monat 1 wandert jede Maßnahme auf eine neue Plattform mit Punkten, Ranglisten, Pfaden und Challenges für jedes Konto."), why: t("Bold and complete, and it defends only if every element motivates every customer and the complex landscape can be moved at once.", "Mutig und vollständig, und nur vertretbar, wenn jedes Element jeden Kunden motiviert und die komplexe Landschaft auf einmal umziehen kann."), rejected: t("Nobody knows yet which mechanisms motivate which customers; moving every system at once in a complex landscape risks months without anything working, and over-complexity is a known cause of failure.", "Niemand weiß schon, welche Mechanismen welche Kunden motivieren; alle Systeme in einer komplexen Landschaft auf einmal umzuziehen riskiert Monate, in denen nichts funktioniert, und Überkomplexität ist eine bekannte Ursache für Scheitern.") },
  { id: "stage" as DecisionId, label: t("Decide now, integrate in stages, with a tripwire", "Jetzt entscheiden, in Stufen integrieren, mit Tripwire"), detail: t("Start in month 1 with the shared profile, the KPIs and the guardrails; add the progress path and the tips in month 2 and the referral challenge in month 3; scale only if the tripwire is met.", "In Monat 1 mit dem gemeinsamen Profil, den KPIs und den Guardrails starten; in Monat 2 Fortschrittspfad und Tipps und in Monat 3 die Empfehlungs-Challenge ergänzen; nur skalieren, wenn der Tripwire erreicht ist."), why: t("It connects the parts that exist, changes something for customers within weeks, learns which mechanisms motivate, and keeps complexity and cost under control.", "Es verbindet die bestehenden Teile, ändert innerhalb von Wochen etwas für Kunden, lernt, welche Mechanismen motivieren, und hält Komplexität und Kosten unter Kontrolle."), rejected: t("", "") },
  { id: "wait" as DecisionId, label: t("Wait until a study proves that gamification works", "Warten, bis eine Studie belegt, dass Gamification wirkt"), detail: t("Spend the six months on a study before any system is connected.", "Die sechs Monate mit einer Studie verbringen, bevor irgendein System verbunden wird."), why: t("", ""), rejected: t("The brief asks for a decision despite unclear success impact. Whether a mechanism motivates EngageIT's customers shows only in how they use the platform, which only a real integration reveals.", "Der Auftrag verlangt eine Entscheidung trotz unklarer Erfolgswirkung. Ob ein Mechanismus die Kunden von EngageIT motiviert, zeigt sich nur darin, wie sie die Plattform nutzen, und das zeigt nur eine echte Integration.") },
]);
export const MODEL_DECISION: DecisionId = "stage";

export type KpiId = "conv" | "engage" | "cv" | "dashboards" | "emails";
export const KPIS = bi([
  { id: "conv" as KpiId, label: t("Renewal rate", "Verlängerungsquote"), unit: "%", baseline: 80, better: "up" as const, behaviour: true },
  { id: "engage" as KpiId, label: t("Accounts using three or more core features", "Konten, die drei oder mehr Kernfunktionen nutzen"), unit: "%", baseline: 35, better: "up" as const, behaviour: true },
  { id: "cv" as KpiId, label: t("Points issued per month", "Vergebene Punkte pro Monat"), unit: t("points", "Punkte"), baseline: 4000, better: "up" as const, behaviour: false },
  { id: "dashboards" as KpiId, label: t("Badges awarded per month", "Verliehene Badges pro Monat"), unit: t("badges", "Badges"), baseline: 900, better: "up" as const, behaviour: false },
  { id: "emails" as KpiId, label: t("Usage e-mails sent per month", "Versandte Nutzungs-E-Mails pro Monat"), unit: t("e-mails", "E-Mails"), baseline: 2000, better: "up" as const, behaviour: false },
]);
export const KPI_BY_ID = Object.fromEntries(KPIS.map((k) => [k.id, k])) as Record<KpiId, (typeof KPIS)[number]>;
export const MODEL_TRIPWIRE = { kpi: "conv" as KpiId, threshold: 84, month: 6 };
export const R2_BASELINE_NOTE = bi({ v: t("Baselines are Case assumptions from EngageIT's CRM and platform data of the last twelve months.", "Die Ausgangswerte sind Fallannahmen aus CRM- und Plattformdaten von EngageIT der letzten zwölf Monate.") });
export const BOARD_CHALLENGE = bi({
  v: t(
    "It is month 3. The shared profile is live and the progress path runs for new accounts. Accounts using three or more core features rose from 35% to 45%, but the renewal rate only rose from 80% to 81%, and 12 accounts logged in 50 times a day to collect rewards. Marketing wants a public leaderboard to push activity; the Head of Platform wants to pause the shared profile because the ticket system interface is late. The board asks what you do.",
    "Es ist Monat 3. Das gemeinsame Profil ist live, und der Fortschrittspfad läuft für neue Konten. Konten, die drei oder mehr Kernfunktionen nutzen, stiegen von 35 % auf 45 %, aber die Verlängerungsquote stieg nur von 80 % auf 81 %, und 12 Konten meldeten sich 50-mal am Tag an, um Belohnungen zu sammeln. Das Marketing will eine öffentliche Rangliste, um die Aktivität zu steigern; die Leitung Plattform will das gemeinsame Profil pausieren, weil die Schnittstelle zum Ticketsystem verspätet ist. Der Vorstand fragt, was Sie tun.",
  ),
});
