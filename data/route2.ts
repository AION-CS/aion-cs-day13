import { bi, t } from "@/lib/lang";

/**
 * Route 2 (Level 3) data: the Transfer Project. EngageIT's Chief Customer Officer builds an integrated customer retention architecture with a
 * limited budget, uncertain customer reactions and a complex system landscape, and makes an integration decision despite unclear success impact.
 * Every figure is a Case assumption (the plan gives the role, the situation and the constraints, not numbers). (Identifiers keep the names of the
 * file this was built from: a "source" is a motivation moment in the customer journey, a "component" is a KPI candidate, a "situation" is a
 * game-element test, `complete` is the share of a moment's steps whose data reaches the shared customer profile.)
 */
export const R2_BUDGET = 220000;
export const R2_MONTHS = 5;
export type Bucket = 1 | 2 | 3;

/* ------------------------------------------------------------------ 3.1 · target vision of an integrated retention architecture */

export type PrincipleId = "defs" | "rules" | "owners" | "review" | "hoard" | "blackbox";
export const PRINCIPLE_IDS: PrincipleId[] = ["defs", "rules", "owners", "review", "hoard", "blackbox"];
export const PRINCIPLES = bi({
  defs: { id: "defs" as PrincipleId, name: t("One customer profile shared by membership, referral and personalisation", "Ein Kundenprofil, das Mitgliedschaft, Empfehlung und Personalisierung teilen"), means: t("The three systems read and write the same profile, so every game element knows what the customer did before.", "Die drei Systeme lesen und schreiben dasselbe Profil, sodass jedes Spielelement weiß, was der Kunde vorher getan hat.") },
  rules: { id: "rules" as PrincipleId, name: t("Every game element rewards a real action, written in one rulebook", "Jedes Spielelement belohnt eine echte Handlung, festgehalten in einem Regelwerk"), means: t("For each element it is written down which action counts, what the customer receives for it and what does not count, so nobody earns a prize for a click.", "Für jedes Element ist festgehalten, welche Handlung zählt, was der Kunde dafür erhält und was nicht zählt, damit niemand für einen Klick einen Preis erhält.") },
  owners: { id: "owners" as PrincipleId, name: t("Every KPI has an owner who can move it", "Jeder KPI hat einen Owner, der ihn bewegen kann"), means: t("Someone answers for each number and has the means to change it.", "Jemand steht für jede Zahl ein und hat die Mittel, sie zu ändern.") },
  review: { id: "review" as PrincipleId, name: t("A monthly review decides on every game element: keep, change or stop", "Ein monatliches Review entscheidet über jedes Spielelement: behalten, ändern oder stoppen"), means: t("Every month the same few KPIs for every element, and a decision on what to keep, what to change and what to stop.", "Jeden Monat dieselben wenigen KPIs für jedes Element und eine Entscheidung, was bleibt, was sich ändert und was gestoppt wird.") },
  hoard: { id: "hoard" as PrincipleId, name: t("Add as many game elements as possible; customers will pick what they like", "So viele Spielelemente wie möglich einführen; Kunden wählen, was ihnen gefällt"), means: t("Points, badges, a leaderboard, quests and streaks everywhere, each run by its own team.", "Punkte, Badges, eine Rangliste, Quests und Serien überall, jeweils von einem eigenen Team betrieben.") },
  blackbox: { id: "blackbox" as PrincipleId, name: t("Hand every reward to one automatic platform before anything changes for customers", "Jede Belohnung einer automatischen Plattform übergeben, bevor sich für Kunden etwas ändert"), means: t("Nothing is connected or improved until a vendor platform decides rewards by itself everywhere.", "Nichts wird verbunden oder verbessert, bis eine Anbieterplattform überall Belohnungen selbst entscheidet.") },
});
/** An integrated system needs both: one shared profile (so every game element knows the customer) and one rulebook (so no reward is left to chance). */
export const PRINCIPLE_MUST: PrincipleId[] = ["defs", "rules"];
export const PRINCIPLE_TRAP: PrincipleId[] = ["hoard", "blackbox"];

/* ------------------------------------------------------------------ 3.2 · central motivation moments */

export type SourceId = "pricing" | "quote" | "chat" | "onboarding" | "social" | "renewal" | "blog" | "careers";
export const SOURCE_IDS: SourceId[] = ["pricing", "quote", "chat", "onboarding", "social", "renewal", "blog", "careers"];
export type Use = "core" | "later" | "leave";
export const USE_LABEL = bi({ core: t("Central: integrate now", "Zentral: jetzt integrieren"), later: t("Central: connect the data first", "Zentral: zuerst die Daten verbinden"), leave: t("Not central", "Nicht zentral") });
/** `decision` is what the customer wants to get done in the moment (null when nothing); `complete` is the share of its steps whose data reaches the shared profile. */
export type Source = { id: SourceId; name: string; decision: string | null; complete: number; cost: number };
export const SOURCES: Source[] = bi([
  { id: "pricing" as SourceId, name: t("First login → first project", "Erster Login → erstes Projekt"), decision: t("Get going, or give up", "Loslegen, oder aufgeben"), complete: 88, cost: 15000 },
  { id: "quote" as SourceId, name: t("Admin course → certification", "Admin-Kurs → Zertifizierung"), decision: t("Keep learning, or stop", "Weiterlernen, oder aufhören"), complete: 92, cost: 8000 },
  { id: "chat" as SourceId, name: t("Set-up → full use of the platform", "Einrichtung → volle Nutzung der Plattform"), decision: t("Keep going, or stay at the basics", "Weitermachen, oder bei den Grundlagen bleiben"), complete: 82, cost: 12000 },
  { id: "onboarding" as SourceId, name: t("Support ticket → tip for the next feature", "Support-Ticket → Tipp für die nächste Funktion"), decision: t("Use more, or only fix problems", "Mehr nutzen, oder nur Probleme beheben"), complete: 55, cost: 20000 },
  { id: "social" as SourceId, name: t("Renewal talk → referral invitation", "Verlängerungsgespräch → Empfehlungseinladung"), decision: t("Renew and recommend, or cancel", "Verlängern und empfehlen, oder kündigen"), complete: 60, cost: 14000 },
  { id: "renewal" as SourceId, name: t("Upgrade to another module", "Upgrade auf ein anderes Modul"), decision: t("Buy more, or not", "Mehr kaufen, oder nicht"), complete: 45, cost: 10000 },
  { id: "blog" as SourceId, name: t("Newsletter sending", "Newsletter-Versand"), decision: null, complete: 95, cost: 5000 },
  { id: "careers" as SourceId, name: t("Job applications", "Bewerbungen"), decision: null, complete: 99, cost: 3000 },
]);
export const SOURCE_BY_ID = Object.fromEntries(SOURCES.map((s) => [s.id, s])) as Record<SourceId, Source>;
export const QUALITY_BAR = 80;
/** The rule of Materi B2: nothing the customer wants to get done in the moment → not central; something they want and ≥ 80% of its data connected → integrate now; something they want but less connected → connect the data first. */
export const useOf = (s: Source): Use => (!s.decision ? "leave" : s.complete >= QUALITY_BAR ? "core" : "later");

/* ------------------------------------------------------------------ 3.3 · a KPI system for management */

export type CompId = "conv" | "cv" | "engage" | "nps" | "churn" | "emails" | "followers" | "stories";
export const COMP_IDS: CompId[] = ["conv", "cv", "engage", "nps", "churn", "emails", "followers", "stories"];
export type Criterion = "explain" | "timely" | "reach" | "scale";
export const CRIT_IDS: Criterion[] = ["explain", "timely", "reach", "scale"];
export const CRITERIA = bi([
  { id: "explain" as Criterion, name: t("Link to value", "Verbindung zum Wert"), test: t("Does it move with renewals, revenue or customers kept?", "Bewegt er sich mit Verlängerungen, Umsatz oder gehaltenen Kunden?"), low: t("It counts what we hand out or how many look.", "Er zählt, was wir ausgeben oder wie viele hinsehen."), high: t("It is, or leads directly to, renewals or customers kept.", "Er ist Verlängerungen oder gehaltene Kunden, oder führt direkt dazu.") },
  { id: "timely" as Criterion, name: t("Early", "Früh"), test: t("How early does it show a change, before the customer has left?", "Wie früh zeigt er eine Veränderung, bevor der Kunde gegangen ist?"), low: t("After the customer has left, or twice a year.", "Nachdem der Kunde gegangen ist, oder zweimal im Jahr."), high: t("Daily or faster.", "Täglich oder schneller.") },
  { id: "reach" as Criterion, name: t("Reach", "Reichweite"), test: t("Does it cover every customer?", "Deckt er jeden Kunden ab?"), low: t("Some customers only.", "Nur einige Kunden."), high: t("Every customer.", "Jeden Kunden.") },
  { id: "scale" as Criterion, name: t("Measured automatically", "Automatisch gemessen"), test: t("Is it counted by the systems, without anyone collecting it?", "Wird er von den Systemen gezählt, ohne dass jemand ihn sammelt?"), low: t("Someone collects it by hand each time.", "Jemand sammelt ihn jedes Mal von Hand."), high: t("The systems count it by themselves.", "Die Systeme zählen ihn selbst.") },
]);
export type Cadence = "weekly" | "monthly" | "after" | "halfyear";
export type CostShape = "one-off" | "per customer" | "per analysis";
export type Comp = { id: CompId; name: string; what: string; explains: boolean; cadence: Cadence; coversAll: boolean; costShape: CostShape; model: Record<Criterion, Bucket>; note: string };
export const CADENCE_LABEL = bi({ weekly: t("daily", "täglich"), monthly: t("monthly", "monatlich"), after: t("after the customer has left", "nachdem der Kunde gegangen ist"), halfyear: t("twice a year", "zweimal im Jahr") });
export const COST_SHAPE_LABEL = bi({ "one-off": t("counted by the systems", "von den Systemen gezählt"), "per customer": t("by a survey", "über eine Befragung"), "per analysis": t("collected by hand", "von Hand gesammelt") });
export const LINK_LABEL = bi({ yes: t("linked to value", "mit dem Wert verbunden"), no: t("not linked to value", "nicht mit dem Wert verbunden") });
export const COMPS: Comp[] = bi([
  { id: "conv" as CompId, name: t("Share of new customers who finish set-up in 30 days", "Anteil der Neukunden, die die Einrichtung in 30 Tagen abschließen"), what: t("New customers with a finished set-up ÷ all new customers, per month.", "Neukunden mit abgeschlossener Einrichtung ÷ alle Neukunden, pro Monat."), explains: true, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("The first step that leads to renewal, counted daily from the platform; the progress path and the milestone rewards move it.", "Der erste Schritt, der zur Verlängerung führt, täglich aus der Plattform gezählt; der Fortschrittspfad und die Meilenstein-Belohnungen bewegen ihn.") },
  { id: "cv" as CompId, name: t("Features used per customer per month", "Genutzte Funktionen pro Kunde und Monat"), what: t("Features a customer opens at least twice in the month, averaged over all customers.", "Funktionen, die ein Kunde im Monat mindestens zweimal öffnet, gemittelt über alle Kunden."), explains: true, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("The driver the brief names (low use): it moves as soon as a customer finds a feature worth using, and last year's data link it to renewals.", "Der Treiber, den der Auftrag nennt (geringe Nutzung): Er bewegt sich, sobald ein Kunde eine Funktion findet, die sich zu nutzen lohnt, und die Daten des letzten Jahres verbinden ihn mit Verlängerungen.") },
  { id: "engage" as CompId, name: t("Share of accounts that only collect points", "Anteil der Konten, die nur Punkte sammeln"), what: t("Accounts with many points and almost no real use, ÷ all accounts.", "Konten mit vielen Punkten und kaum echter Nutzung, ÷ alle Konten."), explains: true, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("The sign of artificial behaviour, in one number; it rises the day a reward pays for a click.", "Das Zeichen künstlichen Verhaltens, in einer Zahl; sie steigt an dem Tag, an dem eine Belohnung einen Klick bezahlt.") },
  { id: "nps" as CompId, name: t("Customer satisfaction score from a survey", "Kundenzufriedenheits-Wert aus einer Befragung"), what: t("How customers rate EngageIT; about 20% answer.", "Wie Kunden EngageIT bewerten; etwa 20 % antworten."), explains: true, cadence: "halfyear" as Cadence, coversAll: false, costShape: "per customer" as CostShape, model: { explain: 3, timely: 1, reach: 2, scale: 2 }, note: t("Linked to value, but twice a year is too slow to steer five months by.", "Mit dem Wert verbunden, aber zweimal im Jahr ist zu langsam, um fünf Monate danach zu steuern.") },
  { id: "churn" as CompId, name: t("Cancellations per quarter", "Kündigungen pro Quartal"), what: t("Customers who cancelled in the quarter.", "Kunden, die im Quartal gekündigt haben."), explains: true, cadence: "after" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 1, reach: 3, scale: 3 }, note: t("Counts the loss exactly, after it is too late to act.", "Zählt den Verlust genau, wenn es zu spät zum Handeln ist.") },
  { id: "emails" as CompId, name: t("Points awarded per month", "Vergebene Punkte pro Monat"), what: t("Points EngageIT hands out in the month.", "Punkte, die EngageIT im Monat ausgibt."), explains: false, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 1, timely: 3, reach: 3, scale: 3 }, note: t("It rose while use did not: points are what we hand out, not what customers do.", "Sie stieg, während die Nutzung nicht stieg: Punkte sind, was wir ausgeben, nicht was Kunden tun.") },
  { id: "followers" as CompId, name: t("Badges issued per month", "Ausgegebene Badges pro Monat"), what: t("Badges awarded in the month.", "Im Monat vergebene Badges."), explains: false, cadence: "weekly" as Cadence, coversAll: false, costShape: "one-off" as CostShape, model: { explain: 1, timely: 3, reach: 2, scale: 3 }, note: t("Reach among whoever earned one, not how customers use the platform.", "Reichweite bei denen, die eines verdient haben, nicht wie Kunden die Plattform nutzen.") },
  { id: "stories" as CompId, name: t("Account managers' monthly success stories", "Monatliche Erfolgsgeschichten der Account Manager"), what: t("Each month, every account manager reports a customer who is happy with the game elements.", "Jeden Monat berichtet jeder Account Manager von einem Kunden, der mit den Spielelementen zufrieden ist."), explains: false, cadence: "monthly" as Cadence, coversAll: false, costShape: "per analysis" as CostShape, model: { explain: 1, timely: 2, reach: 2, scale: 1 }, note: t("Each manager reports a favourite case, so the customers who do not respond never appear.", "Jeder Manager berichtet einen Lieblingsfall, also tauchen die Kunden, die nicht reagieren, nie auf.") },
]);
export const COMP_BY_ID = Object.fromEntries(COMPS.map((c) => [c.id, c])) as Record<CompId, Comp>;
export const COMP_CHOOSE = 3;
export const MODEL_COMPS: CompId[] = ["conv", "cv", "engage"];
export const MODEL_GREATEST: CompId = "conv";
export function maxRating(id: CompId, c: Criterion): Bucket {
  const x = COMP_BY_ID[id];
  if (c === "explain") return x.explains ? 3 : 1;
  if (c === "timely") return x.cadence === "weekly" ? 3 : x.cadence === "monthly" ? 2 : 1;
  if (c === "reach") return x.coversAll ? 3 : 2;
  return x.costShape === "one-off" ? 3 : x.costShape === "per customer" ? 2 : 1;
}
export const isEarly = (id: CompId) => COMP_BY_ID[id].cadence === "weekly" || COMP_BY_ID[id].cadence === "monthly";

/* ------------------------------------------------------------------ 3.4 · the optimisation loop: roll out, keep testing, stop */

export type SitId = "reco" | "renewal" | "botname" | "subject" | "price" | "winback";
export const SIT_IDS: SitId[] = ["reco", "renewal", "botname", "subject", "price", "winback"];
export type Action = "intervene" | "watch" | "none";
export const ACTION_LABEL = bi({ intervene: t("Roll out", "Ausrollen"), watch: t("Keep testing", "Weiter testen"), none: t("Stop", "Stoppen") });
export type LogicOwner = "csm" | "sales" | "data" | "nobody";
export const LOGIC_OWNERS: LogicOwner[] = ["csm", "sales", "data", "nobody"];
export const LOGIC_OWNER_LABEL = bi({ csm: t("Customer success", "Customer Success"), sales: t("Product team", "Produktteam"), data: t("Data team", "Datenteam"), nobody: t("No one (stopped)", "Niemand (gestoppt)") });
export type Situation = { id: SitId; signal: string; lift: number; cases: number; revenue: number; note: string };
export const SITUATIONS: Situation[] = bi([
  { id: "reco" as SitId, signal: t("Set-up progress bar for new customers", "Einrichtungs-Fortschrittsleiste für Neukunden"), lift: 40, cases: 170, revenue: 150000, note: t("More new customers finished set-up, and no rise in accounts that only collect points.", "Mehr Neukunden schlossen die Einrichtung ab, und die Konten, die nur Punkte sammeln, nahmen nicht zu.") },
  { id: "renewal" as SitId, signal: t("Service credit for referral pairs", "Service-Guthaben für Empfehlungspaare"), lift: 25, cases: 40, revenue: 70000, note: t("Few referrals closed in the test months.", "In den Testmonaten kamen wenige Empfehlungen zustande.") },
  { id: "botname" as SitId, signal: t("A cartoon mascot in the platform", "Ein Comic-Maskottchen in der Plattform"), lift: 1, cases: 600, revenue: 3000, note: t("Many customers saw it, almost no difference in use.", "Viele Kunden sahen es, fast kein Unterschied in der Nutzung.") },
  { id: "subject" as SitId, signal: t("Daily streak counter", "Täglicher Serienzähler"), lift: 6, cases: 300, revenue: 30000, note: t("A small, steady rise in logins; accounts that only collect points rose a little.", "Ein kleiner, stabiler Anstieg der Logins; Konten, die nur Punkte sammeln, nahmen etwas zu.") },
  { id: "price" as SitId, signal: t("Monthly leaderboard of the top ten", "Monatliche Rangliste der Top Ten"), lift: -6, cases: 150, revenue: -20000, note: t("Four customers complained they could never reach the top, and ten switched off the prompts.", "Vier Kunden beklagten, sie könnten nie die Spitze erreichen, und zehn schalteten die Hinweise ab.") },
  { id: "winback" as SitId, signal: t("Service credit when a real milestone is reached", "Service-Guthaben, wenn ein echter Meilenstein erreicht ist"), lift: 30, cases: 120, revenue: 110000, note: t("Guardrail: no rise in accounts that only collect points.", "Guardrail: kein Anstieg bei Konten, die nur Punkte sammeln.") },
]);
export const SIT_BY_ID = Object.fromEntries(SITUATIONS.map((s) => [s.id, s])) as Record<SitId, Situation>;
export const LIFT_ACT = 10;
export const LIFT_WATCH = 3;
export const CASES_MIN = 100;
export const actionOf = (s: Situation): Action => (s.lift >= LIFT_ACT && s.cases >= CASES_MIN ? "intervene" : s.lift >= LIFT_WATCH ? "watch" : "none");
export const OWNER_ACCEPT_LOGIC: Record<SitId, LogicOwner[]> = { reco: ["sales"], renewal: ["data"], botname: ["nobody"], subject: ["data"], price: ["nobody"], winback: ["csm"] };
export type LogicRow = { action: Action | null; owner: LogicOwner | null };

/* ------------------------------------------------------------------ 3.5 · prioritised implementation architecture */

export type ArchId = "foundation" | "chat" | "personal" | "routing" | "training" | "tracking" | "suite" | "relaunch";
export const ARCH_IDS: ArchId[] = ["foundation", "chat", "personal", "routing", "training", "tracking", "suite", "relaunch"];
export type ArchItem = { id: ArchId; name: string; what: string; cost: number; weeks: number; blackBox: boolean };
export const ARCH: ArchItem[] = bi([
  { id: "foundation" as ArchId, name: t("One customer profile and one retention dashboard", "Ein Kundenprofil und ein Retention-Dashboard"), what: t("Membership, referral and personalisation joined in one customer profile, with the three KPIs for every game element on one page.", "Mitgliedschaft, Empfehlung und Personalisierung in einem Kundenprofil verbunden, mit den drei KPIs für jedes Spielelement auf einer Seite."), cost: 60000, weeks: 10, blackBox: false },
  { id: "chat" as ArchId, name: t("Usage data clean-up", "Bereinigung der Nutzungsdaten"), what: t("One set of event names across the platform, the membership tool and the referral scheme, so a customer's use is recorded the same way everywhere.", "Ein Satz Ereignisnamen für die Plattform, das Mitgliedschaftstool und das Empfehlungsprogramm, damit die Nutzung eines Kunden überall gleich erfasst wird."), cost: 15000, weeks: 4, blackBox: false },
  { id: "personal" as ArchId, name: t("Progress paths tied to the membership levels", "Fortschrittspfade, gekoppelt an die Mitgliedschaftsstufen"), what: t("A path of steps from the first login to full use, with Bronze, Silver and Gold on it, chosen from what the customer has used so far.", "Ein Pfad von Schritten vom ersten Login bis zur vollen Nutzung, mit Bronze, Silber und Gold darauf, gewählt aus dem, was der Kunde bisher genutzt hat."), cost: 45000, weeks: 10, blackBox: false },
  { id: "routing" as ArchId, name: t("Referral invitations and personal tips from the profile", "Empfehlungseinladungen und persönliche Tipps aus dem Profil"), what: t("The profile decides who is asked for a referral and which tip or service credit fits, and the credit is paid only for a customer who stays.", "Das Profil entscheidet, wen man um eine Empfehlung bittet und welcher Tipp oder welches Service-Guthaben passt, und das Guthaben wird nur für einen Kunden gezahlt, der bleibt."), cost: 40000, weeks: 10, blackBox: false },
  { id: "training" as ArchId, name: t("Training for customer success and product", "Training für Customer Success und Produkt"), what: t("How to read the dashboard, run the monthly review and keep the game rules.", "Wie man das Dashboard liest, das monatliche Review führt und die Spielregeln einhält."), cost: 12000, weeks: 3, blackBox: false },
  { id: "tracking" as ArchId, name: t("One rulebook for rewards and fairness checks", "Ein Regelwerk für Belohnungen und Fairness-Prüfungen"), what: t("Which actions earn a reward, what does not count, and a monthly check for accounts that only collect points.", "Welche Handlungen eine Belohnung bringen, was nicht zählt, und eine monatliche Prüfung auf Konten, die nur Punkte sammeln."), cost: 18000, weeks: 4, blackBox: false },
  { id: "suite" as ArchId, name: t("All-in-one game platform with automatic rewards", "All-in-one-Spieleplattform mit automatischen Belohnungen"), what: t("A vendor platform that replaces the membership and referral tools and decides rewards by itself; its rules and results are not shown.", "Eine Anbieterplattform, die Mitgliedschafts- und Empfehlungstool ersetzt und Belohnungen selbst entscheidet; ihre Regeln und Ergebnisse werden nicht gezeigt."), cost: 150000, weeks: 32, blackBox: true },
  { id: "relaunch" as ArchId, name: t("Points for every login and a public leaderboard", "Punkte für jeden Login und eine öffentliche Rangliste"), what: t("A points shop and a leaderboard on the home screen, not connected to the membership tool or the referral scheme.", "Ein Punkteshop und eine Rangliste auf dem Startbildschirm, nicht mit dem Mitgliedschaftstool oder dem Empfehlungsprogramm verbunden."), cost: 50000, weeks: 12, blackBox: false },
]);
export const ARCH_BY_ID = Object.fromEntries(ARCH.map((a) => [a.id, a])) as Record<ArchId, ArchItem>;
/* ------------------------------------------------------------------ 3.6 · a decision under unclear success impact */

export type DecisionId = "commit" | "stage" | "wait";
export const DECISIONS = bi([
  { id: "commit" as DecisionId, label: t("Buy the all-in-one game platform now and switch everything over", "Jetzt die All-in-one-Spieleplattform kaufen und alles umstellen"), detail: t("Replace the membership and referral tools with the vendor's platform from month 1 and switch on every game element at once.", "Ab Monat 1 Mitgliedschafts- und Empfehlungstool durch die Plattform des Anbieters ersetzen und jedes Spielelement auf einmal einschalten."), why: t("Bold, and it defends only if the platform works on EngageIT's complex landscape from day one.", "Mutig, und nur vertretbar, wenn die Plattform vom ersten Tag an in der komplexen Landschaft von EngageIT funktioniert."), rejected: t("The platform is in use only after 32 weeks, it costs most of the budget, nobody can explain which customer gets which reward, and nothing changes for customers within the five months.", "Die Plattform ist erst nach 32 Wochen im Einsatz, kostet den Großteil des Budgets, niemand kann erklären, welcher Kunde welche Belohnung bekommt, und in den fünf Monaten ändert sich für Kunden nichts.") },
  { id: "stage" as DecisionId, label: t("Integrate now, in stages, and watch one figure", "Jetzt integrieren, in Stufen, und eine Zahl beobachten"), detail: t("Start in month 1 with the shared profile, the rulebook and the progress paths; add referral invitations once the usage data is clean; scale only if the figure you watch moves.", "In Monat 1 mit gemeinsamem Profil, Regelwerk und Fortschrittspfaden starten; die Empfehlungseinladungen ergänzen, sobald die Nutzungsdaten sauber sind; nur skalieren, wenn sich die Zahl, die Sie beobachten, bewegt."), why: t("It joins what exists before it adds anything, rewards real use, and measures before it spends the rest.", "Es verbindet, was existiert, bevor es etwas hinzufügt, belohnt echte Nutzung und misst, bevor es den Rest ausgibt."), rejected: t("", "") },
  { id: "wait" as DecisionId, label: t("Wait until the success of gamification is proven", "Warten, bis der Erfolg von Gamification bewiesen ist"), detail: t("Spend the five months on studies and vendor comparisons before any money is invested.", "Die fünf Monate mit Studien und Anbietervergleichen verbringen, bevor Geld investiert wird."), why: t("", ""), rejected: t("The brief asks for an integration decision despite unclear success impact. Waiting keeps measures that do not work together for five more months, while a shared profile and a rulebook could start within weeks.", "Der Auftrag verlangt eine Integrationsentscheidung trotz unklarer Erfolgswirkung. Warten hält Maßnahmen, die nicht zusammenarbeiten, weitere fünf Monate, obwohl ein gemeinsames Profil und ein Regelwerk in Wochen starten könnten.") },
]);
export const MODEL_DECISION: DecisionId = "stage";

export type KpiId = "conv" | "engage" | "cv" | "dashboards" | "emails";
export const KPIS = bi([
  { id: "conv" as KpiId, label: t("Share of new customers who finish set-up in 30 days", "Anteil der Neukunden, die die Einrichtung in 30 Tagen abschließen"), unit: "%", baseline: 19, better: "up" as const, behaviour: true },
  { id: "engage" as KpiId, label: t("Share of accounts that only collect points", "Anteil der Konten, die nur Punkte sammeln"), unit: "%", baseline: 12, better: "down" as const, behaviour: true },
  { id: "cv" as KpiId, label: t("Points awarded per month", "Vergebene Punkte pro Monat"), unit: t("points", "Punkte"), baseline: 48000, better: "up" as const, behaviour: false },
  { id: "dashboards" as KpiId, label: t("Badges issued per month", "Ausgegebene Badges pro Monat"), unit: t("badges", "Badges"), baseline: 900, better: "up" as const, behaviour: false },
  { id: "emails" as KpiId, label: t("Leaderboard visits per month", "Ranglisten-Besuche pro Monat"), unit: t("visits", "Besuche"), baseline: 1400, better: "up" as const, behaviour: false },
]);
export const KPI_BY_ID = Object.fromEntries(KPIS.map((k) => [k.id, k])) as Record<KpiId, (typeof KPIS)[number]>;
