import { LINES } from "@/data/ladder";
import type { LevelTag, LineId } from "@/data/ladder";
import { CHURN_TRUTH, FORECAST, VALUABLE_TRUTH } from "@/data/forecast";
import type { Basis } from "@/data/forecast";
import { AB_MODEL, MEANING_TRUTH, MEASURE_TRUTH, PATTERN_IDS, RECORDS, TRUTH_COUNTS, TRUTH_LEFT, riskOf } from "@/data/patterns";
import type { PatternId, PatternRow, RecId, UncId } from "@/data/patterns";
import { MEASURE_BY_ID, MODEL_MEASURES, explainBucket } from "@/data/measures";
import type { MeasureId } from "@/data/measures";
import { ARCH_BY_ID, COMP_BY_ID, MODEL_COMPS, MODEL_GREATEST, OWNER_ACCEPT_LOGIC, R2_BUDGET, SITUATIONS, SOURCES, actionOf, useOf } from "@/data/route2";
import { MODEL_ARCH, MODEL_TIER } from "@/data/route2Panel";
import type { Criterion, LogicRow, Use } from "@/data/route2";
import { euro, num, tt } from "@/lib/lang";
import type { L1State, R2State, Score } from "@/store/useStore";

/**
 * Every model answer of the day, in one file. "Fill all model answers" in the mentor bar enters these, so that after one fill every
 * route's missing list is empty and every export downloads at once. Free text follows the site's language. A convenience for
 * facilitators, not security.
 */
export const MENTOR_PASSCODE = "muchson123";
/** The model order: by score, highest first (27, 18, 12). */
export const MODEL_ORDER: MeasureId[] = ["unified", "predictive", "handover"];

/** The model reason for the two judged scores of each model measure (CLAUDE.md #45): motivation, sustainability, and a printed fact. */
const MEASURE_REASON: Record<string, () => string> = {
  unified: () =>
    tt(
      "Motivation 3: customers want what each step leads to, so the path only carries them there and no prize is needed. Sustainability 3: every customer uses it for as long as they are a customer, at no extra cost, although the card says 10 weeks.",
      "Motivation 3: Kunden wollen das, wozu jeder Schritt führt, also trägt der Pfad sie nur dorthin, und es braucht keinen Preis. Nachhaltigkeit 3: Jeder Kunde nutzt ihn, solange er Kunde ist, ohne Zusatzkosten, auch wenn die Karte 10 Wochen nennt.",
    ),
  handover: () =>
    tt(
      "Motivation 3: the reward is help that deepens real use, so customers earn it by doing what they wanted anyway. Sustainability 2: each customer who qualifies costs consultant hours (200 are reserved), so it needs more hours as more customers qualify; the card says 6 weeks.",
      "Motivation 3: Die Belohnung ist Hilfe, die echte Nutzung vertieft, also verdienen Kunden sie, indem sie tun, was sie ohnehin wollten. Nachhaltigkeit 2: Jeder Kunde, der sie erreicht, kostet Beraterstunden (200 sind reserviert), also braucht sie mehr Stunden, wenn mehr Kunden sie erreichen; die Karte nennt 6 Wochen.",
    ),
  predictive: () =>
    tt(
      "Motivation 2: only satisfied customers refer, so some are moved by the result and others are not. Sustainability 3: the credit is paid only for a customer who stays, so it needs no new prizes and keeps working; the card says 8 weeks.",
      "Motivation 2: Nur zufriedene Kunden empfehlen, also bewegt das Ergebnis einige Kunden und andere nicht. Nachhaltigkeit 3: Das Guthaben wird nur für einen Kunden gezahlt, der bleibt, also braucht es keine neuen Preise und wirkt weiter; die Karte nennt 8 Wochen.",
    ),
};

export function KEY_L1(): Partial<L1State> {
  return {
    sort: Object.fromEntries(LINES.map((r) => [r.id, r.truth])) as Record<LineId, LevelTag>,
    extraInsight: tt(
      "At the first login a new customer sees an empty home screen and does not know where to start. A short checklist “first project in ten minutes” with a progress bar (progress) would carry them to the first project, so more customers start using the platform instead of leaving.",
      "Beim ersten Login sieht ein neuer Kunde einen leeren Startbildschirm und weiß nicht, wo er anfangen soll. Eine kurze Checkliste „erstes Projekt in zehn Minuten“ mit einer Fortschrittsleiste (Fortschritt) würde ihn zum ersten Projekt tragen, sodass mehr Kunden die Plattform zu nutzen beginnen, statt zu gehen.",
    ),
    meaning: tt(
      `New customers who saw the set-up bar finished at ${FORECAST.f1}% against ${FORECAST.controlRate}% without it, ${FORECAST.f2} times as often, so EngageIT should first show the bar to everyone, and test it fairly, because the customers who saw it may have been more engaged from the start.`,
      `Neukunden, die die Einrichtungsleiste sahen, schlossen zu ${num(FORECAST.f1)} % ab gegenüber ${num(FORECAST.controlRate)} % ohne sie, ${num(FORECAST.f2)}-mal so oft, also sollte EngageIT die Leiste zuerst allen zeigen und fair testen, weil die Kunden, die sie sahen, vielleicht von Anfang an engagierter waren.`,
    ),
    valuable: [...VALUABLE_TRUTH],
    churners: [...CHURN_TRUTH],
    insights: [
      { basis: "reward" as Basis, text: tt("Reserve two consultant hours for every customer whose first automated workflow goes live, booked in the membership area, so the customer gets real help with something they wanted anyway.", "Reservieren Sie zwei Beraterstunden für jeden Kunden, dessen erster automatisierter Workflow live geht, gebucht im Mitgliederbereich, sodass der Kunde echte Hilfe bei etwas bekommt, das er ohnehin wollte.") },
      { basis: "compete" as Basis, text: tt("Show each customer a private comparison of their feature use with the average of companies of their size on the dashboard, with no public ranking, so they see where they could do more without being embarrassed.", "Zeigen Sie jedem Kunden auf dem Dashboard einen privaten Vergleich seiner Funktionsnutzung mit dem Durchschnitt gleich großer Unternehmen, ohne öffentliche Rangliste, sodass er sieht, wo er mehr tun könnte, ohne bloßgestellt zu werden.") },
      { basis: "progress" as Basis, text: tt("Add a set-up bar with the next step highlighted on the home screen of every new customer, so they always know what to do next and finish set-up sooner.", "Fügen Sie auf dem Startbildschirm jedes Neukunden eine Einrichtungsleiste mit hervorgehobenem nächstem Schritt hinzu, sodass er immer weiß, was als Nächstes zu tun ist, und die Einrichtung früher abschließt.") },
    ],
    reflect: {
      interpret: tt("Gamification works at EngageIT where the customer already wants the result and a game element only helps them get there: the first project, inviting colleagues. It does not work where the customer does not want the action, such as opening a newsletter or writing a rating: there a prize only buys a click and stops working when the prize stops.", "Gamification wirkt bei EngageIT dort, wo der Kunde das Ergebnis ohnehin will und ein Spielelement ihm nur dorthin hilft: das erste Projekt, Kollegen einladen. Sie wirkt nicht dort, wo der Kunde die Handlung nicht will, etwa einen Newsletter zu öffnen oder eine Bewertung zu schreiben: Dort kauft ein Preis nur einen Klick und wirkt nicht mehr, wenn der Preis endet."),
      causation: tt("Real motivation means the customer does the action because they want its result, a working project. A short-term incentive makes them do it for the prize, such as 5 points per login, and when the prize ends so does the behaviour. EngageIT can see the difference in the guardrail: accounts with many points and almost no real use.", "Echte Motivation heißt, der Kunde tut die Handlung, weil er ihr Ergebnis will, ein funktionierendes Projekt. Ein kurzfristiger Anreiz lässt ihn es für den Preis tun, etwa 5 Punkte pro Login, und wenn der Preis endet, endet auch das Verhalten. EngageIT sieht den Unterschied an der Guardrail: Konten mit vielen Punkten und kaum echter Nutzung."),
      decider: tt("Integration keeps a game element from being one more island: it has to read the customer profile, the membership levels and the referral scheme. A strategic decision-maker starts with the progress path tied to the membership levels, adds service rewards for real milestones, then referral pairs, measures finish rate and accounts that only collect points, and avoids a platform with five game elements at once, which is too complex to keep going.", "Integration verhindert, dass ein Spielelement eine weitere Insel wird: Es muss das Kundenprofil, die Mitgliedschaftsstufen und das Empfehlungsprogramm lesen. Eine strategische Entscheiderin beginnt mit dem Fortschrittspfad, gekoppelt an die Mitgliedschaftsstufen, ergänzt Service-Belohnungen für echte Meilensteine, dann Empfehlungspaare, misst Abschlussquote und Konten, die nur Punkte sammeln, und vermeidet eine Plattform mit fünf Spielelementen auf einmal, die zu komplex ist, um sie am Laufen zu halten."),
    },
    tags: Object.fromEntries(RECORDS.map((r) => [r.id, r.truth])) as Record<RecId, PatternId>,
    unc: ["sample", "cause", "missing", "shift"] as UncId[],
    rows: Object.fromEntries(PATTERN_IDS.map((x) => [x, { risk: riskOf(TRUTH_LEFT[x], TRUTH_COUNTS[x]), meaning: MEANING_TRUTH[x], measure: MEASURE_TRUTH[x] }])) as Record<PatternId, PatternRow>,
    misread: tt(
      "1) Share of customers who renew their subscription (outcome), from the billing system, aim: up, above today's rate. 2) Share of new customers who finish set-up within 30 days (driver), from the platform's usage data, aim: up, from today's 19% towards 35%. 3) Share of accounts with many points but almost no real use (guardrail), from the customer profile, aim: down, under a limit of 5%.",
      "1) Anteil der Kunden, die ihr Abonnement verlängern (Outcome), aus dem Abrechnungssystem, Ziel: hoch, über der heutigen Quote. 2) Anteil der Neukunden, die die Einrichtung innerhalb von 30 Tagen abschließen (Treiber), aus den Nutzungsdaten der Plattform, Ziel: hoch, von heute 19 % Richtung 35 %. 3) Anteil der Konten mit vielen Punkten, aber kaum echter Nutzung (Guardrail), aus dem Kundenprofil, Ziel: runter, unter eine Grenze von 5 %.",
    ),
    ab: {
      ...AB_MODEL,
      hyp: tt("If new customers see a set-up bar with the next step highlighted, then the share who finish set-up within 30 days rises, because they always know what to do next and fewer of them stop halfway.", "Wenn Neukunden eine Einrichtungsleiste mit hervorgehobenem nächstem Schritt sehen, dann steigt der Anteil, der die Einrichtung innerhalb von 30 Tagen abschließt, weil sie immer wissen, was als Nächstes zu tun ist, und weniger auf halbem Weg aufhören."),
      rule: tt("Roll out if the finish rate is at least 10% higher than the control group with 100 finished set-ups per group and the share of accounts that only collect points does not rise; keep testing if 3 to 10% higher; stop if less than 3% higher.", "Ausrollen, wenn die Abschlussquote bei 100 abgeschlossenen Einrichtungen pro Gruppe mindestens 10 % über der Kontrollgruppe liegt und der Anteil der Konten, die nur Punkte sammeln, nicht steigt; weiter testen bei 3 bis 10 % darüber; stoppen bei weniger als 3 % darüber."),
    },
    chosen: [...MODEL_MEASURES],
    exp: Object.fromEntries(MODEL_MEASURES.map((id) => [id, explainBucket(MEASURE_BY_ID[id].evidence)])) as Record<string, Score>,
    fea: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_BY_ID[id].model.feasibility])) as Record<string, Score>,
    eff: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_BY_ID[id].model.effect])) as Record<string, Score>,
    reasons: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_REASON[id]()])) as Record<string, string>,
    order: [...MODEL_ORDER],
    why: tt(
      "The progress path goes first: it scores 27, connects the membership levels, the referral scheme and the customer profile, and answers low use and the missing integration together. The referral pairs come second with 18: they pay only for customers who stay and join all three systems. The service rewards come third with 12: they start within six weeks, but they cost consultant hours as more customers qualify. The three cost €130,000 of the €150,000; the leaderboard and the points for every login are left out because they reward being on top and logging in, not real use, and the game platform costs more than the whole budget and would not be in use within five months.",
      "Der Fortschrittspfad kommt zuerst: Er erzielt 27, verbindet die Mitgliedschaftsstufen, das Empfehlungsprogramm und das Kundenprofil und beantwortet geringe Nutzung und fehlende Integration zusammen. Die Empfehlungspaare kommen als Zweites mit 18: Sie zahlen nur für Kunden, die bleiben, und verbinden alle drei Systeme. Die Service-Belohnungen kommen als Drittes mit 12: Sie starten innerhalb von sechs Wochen, kosten aber Beraterstunden, wenn mehr Kunden sie erreichen. Die drei kosten 130.000 € von 150.000 €; die Rangliste und die Punkte für jeden Login bleiben draußen, weil sie belohnen, oben zu stehen und sich einzuloggen, nicht echte Nutzung, und die Spieleplattform kostet mehr als das ganze Budget und wäre in fünf Monaten nicht im Einsatz.",
    ),
  };
}

export function KEY_R2(): Partial<R2State> {
  const rate: Record<string, Score> = {};
  for (const id of MODEL_COMPS) for (const c of ["explain", "timely", "reach", "scale"] as Criterion[]) rate[`${id}.${c}`] = COMP_BY_ID[id].model[c];
  const logic: Record<string, LogicRow> = {};
  for (const s of SITUATIONS) logic[s.id] = { action: actionOf(s), owner: OWNER_ACCEPT_LOGIC[s.id][0] };
  return {
    principles: ["defs", "rules", "review"],
    principleText: {
      defs: tt("Membership, referral and personalisation read and write one customer profile, so every game element knows what the customer did before; this answers “measures not integrated”.", "Mitgliedschaft, Empfehlung und Personalisierung lesen und schreiben ein Kundenprofil, sodass jedes Spielelement weiß, was der Kunde vorher getan hat; das beantwortet „Maßnahmen nicht integriert“."),
      rules: tt("One rulebook says which actions earn a reward (a finished set-up, a live workflow, a referred customer who stays) and which do not (a login), so nobody earns a prize for a click, which answers the risk of wrong incentives.", "Ein Regelwerk sagt, welche Handlungen eine Belohnung bringen (eine abgeschlossene Einrichtung, ein live geschalteter Workflow, ein empfohlener Kunde, der bleibt) und welche nicht (ein Login), sodass niemand für einen Klick einen Preis erhält, was das Risiko falscher Anreize beantwortet."),
      review: tt("Every month the same three KPIs for every game element decide what is kept, changed or stopped, so EngageIT improves by measured steps instead of one big bet.", "Jeden Monat entscheiden dieselben drei KPIs für jedes Spielelement, was bleibt, sich ändert oder gestoppt wird, sodass EngageIT in gemessenen Schritten besser wird statt mit einer großen Wette."),
    },
    sources: Object.fromEntries(SOURCES.map((s) => [s.id, useOf(s)])) as Record<string, Use>,
    comps: [...MODEL_COMPS],
    rate,
    greatest: MODEL_GREATEST,
    greatestWhy: tt(
      "The share of new customers who finish set-up in 30 days is the driver the brief points to (low use). It leads to renewals, moves as soon as the first step is fixed, covers every new customer and is counted by the platform, so every game element can be steered by it within weeks.",
      "Der Anteil der Neukunden, die die Einrichtung in 30 Tagen abschließen, ist der Treiber, auf den der Auftrag hinweist (geringe Nutzung). Er führt zu Verlängerungen, bewegt sich, sobald der erste Schritt behoben ist, deckt jeden Neukunden ab und wird von der Plattform gezählt, sodass sich jedes Spielelement innerhalb von Wochen daran steuern lässt.",
    ),
    logic,
    tier: { ...MODEL_TIER },
    vision: tt(
      "EngageIT gives every customer a reason to keep using the platform that comes from the platform itself: one customer profile joins membership, referral and personalisation, every game element rewards a real action, and the company steers by three KPIs. A new game element has to move one of them before it grows, so motivation and integration grow together.",
      "EngageIT gibt jedem Kunden einen Grund, die Plattform weiter zu nutzen, der aus der Plattform selbst kommt: Ein Kundenprofil verbindet Mitgliedschaft, Empfehlung und Personalisierung, jedes Spielelement belohnt eine echte Handlung, und das Unternehmen steuert über drei KPIs. Ein neues Spielelement muss einen davon bewegen, bevor es wächst, sodass Motivation und Integration gemeinsam wachsen.",
    ),
    giveUp: tt(
      `The plan gives me one shared profile with the dashboard, a clean usage record, progress paths tied to the membership levels, a rulebook with a monthly fairness check and trained teams. The referral invitations start once the usage data is clean. It costs me the all-in-one game platform and the points per login with a public leaderboard, which name no customer KPI (the platform is in use only in month 9). ${euro(R2_BUDGET - MODEL_ARCH.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0))} stay unspent. If customers react more weakly, the progress paths rest on data below 80% connected, so I watch them first.`,
      `Der Plan gibt mir ein gemeinsames Profil mit dem Dashboard, eine saubere Nutzungserfassung, Fortschrittspfade, gekoppelt an die Mitgliedschaftsstufen, ein Regelwerk mit monatlicher Fairness-Prüfung und geschulte Teams. Die Empfehlungseinladungen starten, sobald die Nutzungsdaten sauber sind. Er kostet mich die All-in-one-Spieleplattform und die Punkte pro Login mit öffentlicher Rangliste, die keinen Kunden-KPI nennen (die Plattform ist erst in Monat 9 im Einsatz). ${euro(R2_BUDGET - MODEL_ARCH.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0))} bleiben ungenutzt. Reagieren Kunden schwächer, beruhen die Fortschrittspfade auf Daten unter 80 % verbunden, also beobachte ich sie zuerst.`,
    ),
    decision: "stage",
    decisionWhy: tt(
      "It is the integration decision the brief asks for despite unclear success impact: join what exists first (the profile, the usage record, the rulebook), start the game element where the customer already wants the result, measure from the first week, and spend the rest as the evidence arrives. The referral invitations wait for clean usage data, and the platform and the points stay out because neither names a customer KPI and the platform arrives only in month 9.",
      "Es ist die Integrationsentscheidung, die der Auftrag trotz unklarer Erfolgswirkung verlangt: zuerst verbinden, was existiert (das Profil, die Nutzungserfassung, das Regelwerk), das Spielelement dort starten, wo der Kunde das Ergebnis ohnehin will, ab der ersten Woche messen und den Rest ausgeben, wie die Evidenz kommt. Die Empfehlungseinladungen warten auf saubere Nutzungsdaten, und Plattform und Punkte bleiben draußen, weil keine einen Kunden-KPI nennt und die Plattform erst in Monat 9 ankommt.",
    ),
    watch: tt(
      "I watch the share of new customers who finish set-up within 30 days: today it is 19%, and if it is not clearly above that, towards 35%, by month 5 on at least 100 new customers, I stop adding game elements and rewrite the path with customer success. I also watch the share of accounts that only collect points: if it rises above today's 12%, I pause the element that pays for it.",
      "Ich beobachte den Anteil der Neukunden, die die Einrichtung innerhalb von 30 Tagen abschließen: Heute liegt er bei 19 %, und liegt er bis Monat 5 bei mindestens 100 Neukunden nicht deutlich darüber, Richtung 35 %, höre ich auf, Spielelemente hinzuzufügen, und schreibe den Pfad mit Customer Success neu. Ich beobachte auch den Anteil der Konten, die nur Punkte sammeln: Steigt er über die heutigen 12 %, pausiere ich das Element, das dafür bezahlt.",
    ),
  };
}
