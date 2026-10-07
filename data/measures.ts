import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 2.4 (Core, Level 2). Six measures EngageIT could fund inside €150,000 and five months (the plan's framework). Costs, weeks and
 * what each connects to are Case assumptions; every price is built from parts (set-up, a licence for the months, days or hours of work) so a
 * learner sees why it is that number. The score is the plan's own evaluation: Motivation × Integration × Sustainability. Integration follows from
 * the printed "connects to", so it is checkable; motivation and sustainability are the learner's judgement. (Field names keep the earlier
 * ones: `exp` = Integration, `eff` = Motivation, `fea` = Sustainability; `evidence` is the integration band, derived from `joins`; `targets` are
 * the problems a measure answers. The problem ids use/retain/integrate are the three problems of the brief.)
 *
 * Three are strong, three are traps of different kinds: the leaderboard is a game element that only a few customers care about and that reads one
 * system, the points for every login pay for clicks and connect to nothing, and the all-in-one game platform is joined up on paper but over
 * budget, in use only after the five months, and too complex to keep going.
 */
export type MeasureId = "unified" | "handover" | "predictive" | "chatbot" | "app" | "suite";
export const BUDGET = 150000;
export const MONTHS = 5;
/** The five months in weeks: the frame in which a measure has to start working. */
export const FRAME_WEEKS = MONTHS * 4;
export type Bucket = 1 | 2 | 3;

/**
 * The category printed after the weeks (CLAUDE.md #45): which of the mechanisms taught in Materi A1 a measure uses (a reward, competition,
 * progress and status), or whether it mixes all three. A fact about the measure taken from that card's own tests, never a score and never the
 * problem it answers (that stays the learner's job).
 */
export type MeasureArea = "reward" | "competition" | "progress" | "mixed";
export const MEASURE_AREA_LABEL = bi({
  reward: t("Reward", "Belohnung"),
  competition: t("Competition", "Wettbewerb"),
  progress: t("Progress and status", "Fortschritt und Status"),
  mixed: t("All three at once", "Alle drei auf einmal"),
});
export const AREA_NOTE = bi({
  v: t(
    "The brief names three problems. Each card carries a small label with the mechanism it uses (taught in Materi A1): a reward, competition, or progress and status. “All three at once” mixes them.",
    "Der Auftrag nennt drei Probleme. Jede Karte trägt ein kleines Etikett mit dem Mechanismus, den sie nutzt (gelehrt in Materi A1): eine Belohnung, Wettbewerb, oder Fortschritt und Status. „Alle drei auf einmal“ mischt sie.",
  ),
});

export type ProblemId = "use" | "retain" | "integrate";
export const PROBLEM_IDS: ProblemId[] = ["use", "retain", "integrate"];
export const PROBLEM_LABEL = bi({
  use: t("Low use of the platform", "Geringe Nutzung der Plattform"),
  retain: t("Mediocre customer retention", "Mittelmäßige Kundenbindung"),
  integrate: t("Measures not integrated", "Maßnahmen nicht integriert"),
});
/** The three problems in everyday words, for the picture under the cards. */
export const PROBLEM_PLAIN = bi({
  use: t("Customers rarely use the features", "Kunden nutzen die Funktionen kaum"),
  retain: t("Too few customers renew", "Zu wenige Kunden verlängern"),
  integrate: t("Discounts, newsletter, support, membership and referral do not work together", "Rabatte, Newsletter, Support, Mitgliedschaft und Empfehlung arbeiten nicht zusammen"),
});

export type Joins = "all" | "one" | "none";
export type Evidence = "fast" | "mid" | "slow";
export const bandOf = (j: Joins): Evidence => (j === "all" ? "fast" : j === "one" ? "mid" : "slow");
export const JOINS_LABEL = bi({
  all: t("the membership programme, the referral scheme and the customer profile", "das Mitgliedschaftsprogramm, das Empfehlungsprogramm und das Kundenprofil"),
  one: t("one of them", "eines davon"),
  none: t("nothing: it stands alone", "nichts: steht allein"),
});
export const EVIDENCE_LABEL = bi({
  fast: t("connected to membership, referral and profile", "mit Mitgliedschaft, Empfehlung und Profil verbunden"),
  mid: t("connected to one of them", "mit einem davon verbunden"),
  slow: t("stand-alone", "allein stehend"),
});
export const explainBucket = (e: Evidence): Bucket => (e === "fast" ? 3 : e === "mid" ? 2 : 1);
export const EXPLAIN_RULE = bi({
  v: t(
    "Integration follows from what the measure is printed to connect to: the membership programme, the referral scheme and the customer profile together score 3, one of them scores 2, nothing (it stands alone) scores 1. A game element that stands alone adds one more island, however good it sounds.",
    "Die Integration folgt aus dem, womit die Maßnahme laut Beschreibung verbunden ist: Mitgliedschaftsprogramm, Empfehlungsprogramm und Kundenprofil zusammen ergeben 3, eines davon ergibt 2, nichts (steht allein) ergibt 1. Ein Spielelement, das allein steht, fügt eine weitere Insel hinzu, so gut es auch klingt.",
  ),
});

/** The plain-word anchors for the two judged scores, printed under the score buttons and taught in Materi A7. */
export const EFFECT_ANCHOR = bi({
  v: t(
    "3 = customers do it because they want the result, and the game element only helps them get there. 2 = some do it for the result, others for the prize. 1 = customers do it only for the prize and stop when it stops.",
    "3 = Kunden tun es, weil sie das Ergebnis wollen, und das Spielelement hilft ihnen nur dabei. 2 = Einige tun es für das Ergebnis, andere für den Preis. 1 = Kunden tun es nur für den Preis und hören auf, wenn er aufhört.",
  ),
});
export const SCALE_ANCHOR = bi({
  v: t(
    "3 = it still works after the novelty has worn off and costs little to keep going. 2 = it needs fresh content, prizes or people to keep working. 1 = it fades within weeks, or works only while a prize is paid.",
    "3 = Es wirkt noch, wenn die Neuheit verflogen ist, und kostet wenig im Betrieb. 2 = Es braucht frische Inhalte, Preise oder Personal, um weiter zu wirken. 1 = Es verblasst binnen Wochen oder wirkt nur, solange ein Preis gezahlt wird.",
  ),
});

export type CostPart = { label: string; amount: number };

export type Measure = {
  id: MeasureId;
  name: string;
  /** A short name for bars and rows. */
  short: string;
  /** In everyday words: what it is. */
  what: string;
  /** One concrete scene from EngageIT's day (CLAUDE.md #46). */
  scene: string;
  /** Who does what, and what the customer notices. */
  who: string;
  area: MeasureArea;
  basis: string;
  joins: Joins;
  evidence: Evidence;
  /** What the price is made of; `cost` is their sum. */
  costParts: CostPart[];
  cost: number;
  weeks: number;
  targets: ProblemId[];
  model: { feasibility: Bucket; effect: Bucket; note: string };
  verdict: string;
};

/**
 * Identifiers keep the names of the file this was built from: `unified` is the progress path tied to the membership levels, `handover` the
 * service rewards for real milestones, `predictive` the referral pairs, `chatbot` the public leaderboard, `app` the points for every login and
 * `suite` the all-in-one game platform.
 */
export const MEASURES: Measure[] = [];
const RAW = bi([
  {
    id: "unified" as MeasureId,
    short: t("Progress path", "Fortschrittspfad"),
    name: t("A progress path tied to the membership levels", "Ein Fortschrittspfad, gekoppelt an die Mitgliedschaftsstufen"),
    what: t(
      "A visible path of steps from the first login to full use. Each step done fills the path, and the three membership levels (Bronze, Silver, Gold) sit on it with what each level unlocks.",
      "Ein sichtbarer Pfad von Schritten vom ersten Login bis zur vollen Nutzung. Jeder erledigte Schritt füllt den Pfad, und die drei Mitgliedschaftsstufen (Bronze, Silber, Gold) liegen darauf, mit dem, was jede Stufe freischaltet.",
    ),
    scene: t(
      "A new customer logs in and sees “3 of 8 steps done: invite a colleague next”. At step 5 Silver opens and shows the referral invitation; the next step is already chosen from what the customer has used so far.",
      "Ein neuer Kunde loggt sich ein und sieht „3 von 8 Schritten erledigt: als Nächstes einen Kollegen einladen“. Bei Schritt 5 öffnet sich Silber und zeigt die Empfehlungseinladung; der nächste Schritt ist schon aus dem gewählt, was der Kunde bisher genutzt hat.",
    ),
    who: t(
      "IT builds the path and reads the customer profile for the next step. Customer success keeps the membership levels. The customer sees where they stand and what is next, and nothing is paid out.",
      "Die IT baut den Pfad und liest das Kundenprofil für den nächsten Schritt. Customer Success pflegt die Mitgliedschaftsstufen. Der Kunde sieht, wo er steht und was als Nächstes kommt, und nichts wird ausgezahlt.",
    ),
    area: "progress" as MeasureArea,
    basis: t("Connects to the membership programme, the referral scheme and the customer profile.", "Verbunden mit dem Mitgliedschaftsprogramm, dem Empfehlungsprogramm und dem Kundenprofil."),
    joins: "all" as Joins,
    costParts: [
      { label: t("IT builds the path, 35 days × €800", "IT baut den Pfad, 35 Tage × 800 €"), amount: 28000 },
      { label: t("links to membership, referral and the profile, 5 × €5,000", "Anbindung an Mitgliedschaft, Empfehlung und Profil, 5 × 5.000 €"), amount: 25000 },
      { label: t("step texts and visuals, 100 h × €80", "Texte und Visuals für die Schritte, 100 Std. × 80 €"), amount: 8000 },
    ],
    cost: 0,
    weeks: 10,
    targets: ["use", "integrate"] as ProblemId[],
    model: { feasibility: 3, effect: 3, note: t("Customers want the result each step leads to, so the path only carries them there; it needs no prizes, and it ties the three existing systems together.", "Kunden wollen das Ergebnis, zu dem jeder Schritt führt, der Pfad trägt sie nur dorthin; er braucht keine Preise und verbindet die drei bestehenden Systeme.") },
    verdict: t("A model measure: real motivation, the strongest integration and nothing to keep paying for.", "Eine Modellmaßnahme: echte Motivation, die stärkste Integration und nichts, was man weiter bezahlen muss."),
  },
  {
    id: "handover" as MeasureId,
    short: t("Milestone rewards", "Meilenstein-Belohnungen"),
    name: t("Service rewards for real milestones", "Service-Belohnungen für echte Meilensteine"),
    what: t(
      "A customer who reaches a real milestone (set-up finished, first automated workflow live) receives a service benefit: reserved consultant hours or a training seat, booked through the membership programme.",
      "Ein Kunde, der einen echten Meilenstein erreicht (Einrichtung fertig, erster automatisierter Workflow live), erhält einen Service-Vorteil: reservierte Beraterstunden oder einen Schulungsplatz, gebucht über das Mitgliedschaftsprogramm.",
    ),
    scene: t(
      "When a customer's first automated workflow goes live, an e-mail offers two consultant hours to tune it. The customer books them in the membership area.",
      "Wenn der erste automatisierte Workflow eines Kunden live geht, bietet eine E-Mail zwei Beraterstunden zum Feinschliff an. Der Kunde bucht sie im Mitgliederbereich.",
    ),
    who: t(
      "Customer success defines the milestones and delivers the hours. The membership tool books them. The customer receives help that makes the platform work better for them, not a prize.",
      "Customer Success legt die Meilensteine fest und liefert die Stunden. Das Mitgliedschaftstool bucht sie. Der Kunde erhält Hilfe, die die Plattform für ihn besser macht, keinen Preis.",
    ),
    area: "reward" as MeasureArea,
    basis: t("Connects to one of them (the membership programme).", "Verbunden mit einem davon (dem Mitgliedschaftsprogramm)."),
    joins: "one" as Joins,
    costParts: [
      { label: t("milestone rules built into the membership tool", "Meilenstein-Regeln im Mitgliedschaftstool gebaut"), amount: 12000 },
      { label: t("reserved consultant hours, 200 h × €80", "reservierte Beraterstunden, 200 Std. × 80 €"), amount: 16000 },
      { label: t("e-mails and a booking page", "E-Mails und eine Buchungsseite"), amount: 6000 },
    ],
    cost: 0,
    weeks: 6,
    targets: ["use", "retain"] as ProblemId[],
    model: { feasibility: 2, effect: 3, note: t("The reward is help that deepens real use, so customers earn it by doing what they want anyway; it costs consultant hours as more customers qualify, so sustainability 2, and it lives in the membership tool only, so integration 2.", "Die Belohnung ist Hilfe, die echte Nutzung vertieft, also verdienen Kunden sie, indem sie tun, was sie ohnehin wollen; sie kostet Beraterstunden, wenn mehr Kunden sie erreichen, daher Nachhaltigkeit 2, und sie lebt nur im Mitgliedschaftstool, daher Integration 2.") },
    verdict: t("A model measure: a reward that serves the customer, and the quickest to start.", "Eine Modellmaßnahme: eine Belohnung, die dem Kunden dient, und die schnellste im Start."),
  },
  {
    id: "predictive" as MeasureId,
    short: t("Referral pairs", "Empfehlungspaare"),
    name: t("Referral pairs: a service credit for both sides", "Empfehlungspaare: ein Service-Guthaben für beide Seiten"),
    what: t(
      "A satisfied customer invites a peer from another company. When the new customer is still active after 90 days, both receive a service credit in the membership programme.",
      "Ein zufriedener Kunde lädt einen Branchenkollegen aus einem anderen Unternehmen ein. Ist der neue Kunde nach 90 Tagen noch aktiv, erhalten beide ein Service-Guthaben im Mitgliedschaftsprogramm.",
    ),
    scene: t(
      "A customer on Silver sees a card: “Know a company that would use this? You both get a service credit when they are still active after 90 days.” The profile decides who sees it: only customers who finished set-up.",
      "Ein Kunde auf Silber sieht eine Karte: „Kennen Sie ein Unternehmen, das das nutzen würde? Sie beide erhalten ein Service-Guthaben, wenn es nach 90 Tagen noch aktiv ist.“ Das Profil entscheidet, wer sie sieht: nur Kunden, die die Einrichtung abgeschlossen haben.",
    ),
    who: t(
      "IT builds the referral flow and links it to the membership credit and the profile. Sales follows up the invited company. The credit is paid only for a customer who stays, so nobody is paid for a click.",
      "Die IT baut den Empfehlungsablauf und verbindet ihn mit dem Mitgliedschafts-Guthaben und dem Profil. Der Vertrieb folgt dem eingeladenen Unternehmen. Das Guthaben wird nur für einen Kunden gezahlt, der bleibt, also wird niemand für einen Klick bezahlt.",
    ),
    area: "reward" as MeasureArea,
    basis: t("Connects to the membership programme, the referral scheme and the customer profile.", "Verbunden mit dem Mitgliedschaftsprogramm, dem Empfehlungsprogramm und dem Kundenprofil."),
    joins: "all" as Joins,
    costParts: [
      { label: t("IT builds the referral flow, 20 days × €800", "IT baut den Empfehlungsablauf, 20 Tage × 800 €"), amount: 16000 },
      { label: t("links to the membership credit and the profile, 2 × €7,000", "Anbindung an Mitgliedschafts-Guthaben und Profil, 2 × 7.000 €"), amount: 14000 },
      { label: t("invitation texts and a legal check of the incentive, 50 h × €100", "Einladungstexte und rechtliche Prüfung des Anreizes, 50 Std. × 100 €"), amount: 5000 },
    ],
    cost: 0,
    weeks: 8,
    targets: ["retain", "integrate"] as ProblemId[],
    model: { feasibility: 3, effect: 2, note: t("It is fully joined up and pays only for customers who stay, so it keeps working without new prizes; only satisfied customers refer, so some customers are moved by the result and others are not: motivation 2.", "Es ist voll verbunden und zahlt nur für Kunden, die bleiben, also wirkt es ohne neue Preise weiter; nur zufriedene Kunden empfehlen, also bewegt das Ergebnis einige Kunden und andere nicht: Motivation 2.") },
    verdict: t("A model measure: it joins the three systems and rewards value, not clicks.", "Eine Modellmaßnahme: Sie verbindet die drei Systeme und belohnt Wert, nicht Klicks."),
  },
  {
    id: "chatbot" as MeasureId,
    short: t("Leaderboard", "Rangliste"),
    name: t("A public leaderboard of the ten most active customers", "Eine öffentliche Rangliste der zehn aktivsten Kunden"),
    what: t(
      "A monthly page that ranks the ten customers who automated the most workflows, with company names, visible to all customers.",
      "Eine monatliche Seite, die die zehn Kunden mit den meisten automatisierten Workflows rankt, mit Firmennamen, für alle Kunden sichtbar.",
    ),
    scene: t(
      "On the first of the month a customer opens the page and sees the same big companies at the top as last month. The customer is on place 143 and is not shown.",
      "Am Ersten des Monats öffnet ein Kunde die Seite und sieht dieselben großen Unternehmen an der Spitze wie im Vormonat. Der Kunde liegt auf Platz 143 und wird nicht gezeigt.",
    ),
    who: t(
      "IT builds the page from the usage data. Marketing publishes it and sends a small prize to the winner. Customers see their own place only if they are in the top ten.",
      "Die IT baut die Seite aus den Nutzungsdaten. Das Marketing veröffentlicht sie und schickt dem Gewinner einen kleinen Preis. Kunden sehen ihren eigenen Platz nur, wenn sie in den Top Ten sind.",
    ),
    area: "competition" as MeasureArea,
    basis: t("Connects to one of them (the usage data of the platform, not membership or referral).", "Verbunden mit einem davon (den Nutzungsdaten der Plattform, nicht Mitgliedschaft oder Empfehlung)."),
    joins: "one" as Joins,
    costParts: [
      { label: t("IT builds the page from the usage data, 25 days × €800", "IT baut die Seite aus den Nutzungsdaten, 25 Tage × 800 €"), amount: 20000 },
      { label: t("monthly data checks and moderation, 100 h × €80", "monatliche Datenprüfung und Moderation, 100 Std. × 80 €"), amount: 8000 },
      { label: t("prizes for the monthly winner", "Preise für den Gewinner des Monats"), amount: 5000 },
    ],
    cost: 0,
    weeks: 6,
    targets: ["use"] as ProblemId[],
    model: { feasibility: 1, effect: 2, note: t("The few big customers at the top react; the rest see they cannot catch up. It needs a prize and fresh moderation every month, so it fades: sustainability 1.", "Die wenigen großen Kunden an der Spitze reagieren; der Rest sieht, dass er nicht aufholen kann. Es braucht jeden Monat einen Preis und frische Moderation, also verblasst es: Nachhaltigkeit 1.") },
    verdict: t("Not in the model three: 4 points. A few customers care, and the effect fades when the prize stops.", "Nicht unter den drei Modellmaßnahmen: 4 Punkte. Wenige Kunden interessiert es, und die Wirkung verblasst, wenn der Preis endet."),
  },
  {
    id: "app" as MeasureId,
    short: t("Points per login", "Punkte pro Login"),
    name: t("Points for every login, redeemable for a discount", "Punkte für jeden Login, einlösbar gegen einen Rabatt"),
    what: t(
      "Every login earns 5 points. 200 points give a 5% discount on the next invoice.",
      "Jeder Login bringt 5 Punkte. 200 Punkte geben 5 % Rabatt auf die nächste Rechnung.",
    ),
    scene: t(
      "A customer logs in, sees “+5 points”, and logs out again. The next month they log in twice a week to reach the discount and open nothing else.",
      "Ein Kunde loggt sich ein, sieht „+5 Punkte“ und loggt sich wieder aus. Im nächsten Monat loggt er sich zweimal pro Woche ein, um den Rabatt zu erreichen, und öffnet sonst nichts.",
    ),
    who: t(
      "A points shop is built on its own. Finance books the discounts. Nobody connects it to the membership programme, the referral scheme or the profile. Customers learn that logging in pays, whatever they do afterwards.",
      "Ein Punkteshop wird für sich gebaut. Die Finanzabteilung bucht die Rabatte. Niemand verbindet ihn mit dem Mitgliedschaftsprogramm, dem Empfehlungsprogramm oder dem Profil. Kunden lernen, dass Einloggen sich lohnt, egal was sie danach tun.",
    ),
    area: "reward" as MeasureArea,
    basis: t("Connects to nothing: it stands alone.", "Mit nichts verbunden: steht allein."),
    joins: "none" as Joins,
    costParts: [
      { label: t("points shop built and tested", "Punkteshop gebaut und getestet"), amount: 14000 },
      { label: t("discount budget for the first five months", "Rabattbudget für die ersten fünf Monate"), amount: 8000 },
      { label: t("administration, 40 h × €75", "Verwaltung, 40 Std. × 75 €"), amount: 3000 },
    ],
    cost: 0,
    weeks: 5,
    targets: [] as ProblemId[],
    model: { feasibility: 1, effect: 1, note: t("Customers log in for the points and do nothing of value: short-term incentive, wrong behaviour rewarded, and it stops working the day the discount is cut.", "Kunden loggen sich für die Punkte ein und tun nichts von Wert: kurzfristiger Anreiz, falsches Verhalten belohnt, und es wirkt nicht mehr, sobald der Rabatt gestrichen wird.") },
    verdict: t("Rejected: 1 point. It pays for clicks, connects to nothing and teaches customers to log in for a discount.", "Verworfen: 1 Punkt. Es bezahlt Klicks, verbindet sich mit nichts und bringt Kunden bei, sich für einen Rabatt einzuloggen."),
  },
  {
    id: "suite" as MeasureId,
    short: t("Game platform", "Spieleplattform"),
    name: t("One all-in-one game platform (points, levels, leaderboards, quests, streaks)", "Eine All-in-one-Spieleplattform (Punkte, Stufen, Ranglisten, Quests, Serien)"),
    what: t(
      "A vendor platform that replaces the membership tool and the referral tool and adds points, levels, leaderboards, daily quests and streaks for every customer at once.",
      "Eine Anbieterplattform, die das Mitgliedschaftstool und das Empfehlungstool ersetzt und für alle Kunden auf einmal Punkte, Stufen, Ranglisten, tägliche Quests und Serien ergänzt.",
    ),
    scene: t(
      "For thirty-two weeks the membership and referral tools are replaced while customers see half old and half new rules. Then every customer gets a daily quest and a streak counter.",
      "Zweiunddreißig Wochen lang werden Mitgliedschafts- und Empfehlungstool ersetzt, während Kunden halb alte und halb neue Regeln sehen. Danach bekommt jeder Kunde eine tägliche Quest und einen Serienzähler.",
    ),
    who: t(
      "A vendor configures and migrates. EngageIT's teams retrain and run both worlds meanwhile. Customers notice nothing until the move is done, and then meet five game elements at once.",
      "Ein Anbieter konfiguriert und migriert. Die Teams von EngageIT lernen um und betreiben währenddessen beide Welten. Kunden merken nichts, bis der Umzug beendet ist, und treffen dann auf fünf Spielelemente auf einmal.",
    ),
    area: "mixed" as MeasureArea,
    basis: t("Connects to the membership programme, the referral scheme and the customer profile.", "Verbunden mit dem Mitgliedschaftsprogramm, dem Empfehlungsprogramm und dem Kundenprofil."),
    joins: "all" as Joins,
    costParts: [
      { label: t("platform licences, 5 months × €12,000", "Plattform-Lizenzen, 5 Monate × 12.000 €"), amount: 60000 },
      { label: t("vendor configures and migrates", "Anbieter konfiguriert und migriert"), amount: 80000 },
      { label: t("retraining and extra staff time, 250 h × €80", "Umschulung und zusätzliche Arbeitszeit, 250 Std. × 80 €"), amount: 20000 },
    ],
    cost: 0,
    weeks: 32,
    targets: ["use", "retain", "integrate"] as ProblemId[],
    model: { feasibility: 1, effect: 2, note: t("Fully joined up on paper, but it costs more than the whole budget, is in use only after 32 weeks, beyond the five months, and five game elements at once is the over-complexity the coaching focus warns about.", "Auf dem Papier voll verbunden, aber sie kostet mehr als das ganze Budget, ist erst nach 32 Wochen im Einsatz, nach den fünf Monaten, und fünf Spielelemente auf einmal sind genau die Übermaß-Komplexität, vor der der Coaching-Schwerpunkt warnt.") },
    verdict: t("Rejected: 6 points. Nothing changes for customers within the five months, it takes more than the whole budget and it is too complex to keep going.", "Verworfen: 6 Punkte. In den fünf Monaten ändert sich für Kunden nichts, sie nimmt mehr als das ganze Budget und ist zu komplex, um sie am Laufen zu halten."),
  },
]);
for (const m of RAW) {
  MEASURES.push(Object.assign(m, { evidence: bandOf(m.joins), cost: m.costParts.reduce((s, p) => s + p.amount, 0) }) as Measure);
}

export const MEASURE_BY_ID = Object.fromEntries(MEASURES.map((m) => [m.id, m])) as Record<MeasureId, Measure>;
export const MEASURE_IDS = MEASURES.map((m) => m.id);
export const CHOOSE = 3;
export const modelScore = (id: MeasureId) => {
  const m = MEASURE_BY_ID[id];
  return explainBucket(m.evidence) * m.model.feasibility * m.model.effect;
};
export const MODEL_MEASURES: MeasureId[] = ["unified", "handover", "predictive"];
export const MODEL_COST = MODEL_MEASURES.reduce((s, id) => s + MEASURE_BY_ID[id].cost, 0);

/** Weeks a measure is actually working inside the five months (0 when it only starts after them). */
export const workingWeeks = (id: MeasureId) => Math.max(0, FRAME_WEEKS - MEASURE_BY_ID[id].weeks);
