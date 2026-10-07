import { ARCH_BY_ID, ARCH_IDS, R2_BUDGET, R2_MONTHS } from "@/data/route2";
import type { ArchId } from "@/data/route2";
import { CLEAN_ID, ENGINE_IDS, KPI_SYSTEM_ID, PANEL, READY_BAR, WEAK_POINTS, TIER_LABEL } from "@/data/route2Panel";
import type { Tier } from "@/data/route2Panel";
import { euro, tt } from "@/lib/lang";

/**
 * The logic of the Route 2 control panel (CLAUDE.md #47): one place that turns the learner's choices (when each item happens) into what the
 * diagram, the three bars, the tests, the reading of the plan, the export and the mentor's worked answer all say. Nothing here is a verdict:
 * every line is a fact about the plan and, where something is open, the rule and two ways to act. The learner calculates nothing (#44).
 *
 * Time is derived, not asked for: *Now* items start in month 1; *After data is ready* items start in the month the usage data clean-up is in use (so
 * the clean-up must itself be Now: a clean record of use is what puts the data into the shared profile); an item is in use in month =
 * start + weeks ÷ 4, rounded up (the rule Materi B5 teaches). With five months the time test catches the all-in-one game platform: at 32 weeks it is in use only in month 9.
 */
export type Scn = 0 | 1;
type HasTier = { tier: Record<string, Tier> };

const NEVER = R2_MONTHS + 1;

export const tierOf = (r2: HasTier, id: ArchId): Tier => r2.tier[id] ?? "not";
export const isFunded = (r2: HasTier, id: ArchId) => tierOf(r2, id) !== "not";
export const fundedIds = (r2: HasTier): ArchId[] => ARCH_IDS.filter((id) => isFunded(r2, id));
export const nowIds = (r2: HasTier): ArchId[] => ARCH_IDS.filter((id) => tierOf(r2, id) === "now");
export const monthsOf = (id: ArchId) => Math.ceil(ARCH_BY_ID[id].weeks / 4);
const readyOf = (id: ArchId, scn: Scn) => (PANEL[id].data === null ? null : PANEL[id].data! - scn * WEAK_POINTS);

/** The month an item starts: 1 for Now, the month the usage data clean-up is in use for After data (the clean-up must be Now), null when not funded. */
export function startOf(r2: HasTier, id: ArchId): number | null {
  const tier = tierOf(r2, id);
  if (tier === "not") return null;
  if (tier === "now") return 1;
  return tierOf(r2, CLEAN_ID) === "now" ? 1 + monthsOf(CLEAN_ID) : NEVER;
}
export function inUseOf(r2: HasTier, id: ArchId): number | null {
  const s = startOf(r2, id);
  return s === null ? null : s + monthsOf(id);
}

/** Integration comes first: the shared profile and dashboard start no later than the item. */
export function measOk(r2: HasTier, id: ArchId): boolean {
  if (id === KPI_SYSTEM_ID) return true;
  const s = startOf(r2, id);
  if (s === null) return false;
  const f = startOf(r2, KPI_SYSTEM_ID);
  return f !== null && f <= s;
}

/** The data an item reads is at least READY_BAR percent connected when it starts (the usage data clean-up lifts the data of the items it prepares). */
export function dataOk(r2: HasTier, id: ArchId, scn: Scn): boolean {
  const v = readyOf(id, scn);
  if (v === null || v >= READY_BAR) return true;
  if (PANEL[id].cleaned && tierOf(r2, CLEAN_ID) === "now") {
    const s = startOf(r2, id);
    const q = inUseOf(r2, CLEAN_ID);
    if (s !== null && q !== null && q <= s) return true;
  }
  return false;
}

export type ItemView = { id: ArchId; tier: Tier; start: number | null; inUse: number | null; measOk: boolean; dataOk: boolean; late: boolean; never: boolean; notes: string[] };
export type Bars = { spent: number; over: number; left: number; meas: number | null; risk: number | null };
export type TestId = "measure" | "purpose" | "data" | "budget";
/** One way to act on an open test; `go` names the Step A cards it is done on (each becomes a jump chip in the panel). */
export type Way = { text: string; go: ArchId[] };
/** One open finding: the fact, what it means in plain words, the rule, the items involved and the ways to act. */
export type OpenDetail = { fact: string; plain: string; rule: string; where: ArchId[]; ways: Way[] };
export type TestView = { id: TestId; name: string; rule: string; applies: boolean; holds: boolean; open: OpenDetail[] };
export type PlanView = { items: Record<ArchId, ItemView>; funded: ArchId[]; nowCount: number; bars: Bars; tests: TestView[]; holding: number; applicable: number };

const nm = (id: ArchId) => PANEL[id].short;
/** The title printed on the item card in Step A, so a step names the card the learner will see. */
const card = (id: ArchId) => tt(`“${ARCH_BY_ID[id].name}”`, `„${ARCH_BY_ID[id].name}“`);

function itemView(r2: HasTier, id: ArchId, scn: Scn): ItemView {
  const tier = tierOf(r2, id);
  const start = startOf(r2, id);
  const inUse = inUseOf(r2, id);
  const funded = tier !== "not";
  const never = funded && start === NEVER;
  const m = measOk(r2, id);
  const d = dataOk(r2, id, scn);
  const late = funded && !never && inUse !== null && inUse > R2_MONTHS;
  const notes: string[] = [];
  if (funded) {
    if (never) notes.push(tt("never starts: the usage data clean-up it waits for is not planned", "startet nie: Die Bereinigung der Nutzungsdaten, auf die es wartet, ist nicht eingeplant"));
    if (!m && !never) notes.push(tt("starts before the shared profile and dashboard are in place", "startet, bevor gemeinsames Profil und Dashboard stehen"));
    if (!d && !never) notes.push(tt(`the data it reads is ${readyOf(id, scn)}% connected, below ${READY_BAR}%, when it starts`, `die Daten, die es liest, sind zu ${readyOf(id, scn)} % verbunden, unter ${READY_BAR} %, wenn es startet`));
    if (PANEL[id].blackBox) notes.push(tt("black box: nobody can see why a customer gets a reward", "Black Box: Niemand kann sehen, warum ein Kunde eine Belohnung bekommt"));
    if (late) notes.push(tt(`in use only in month ${inUse}, after the ${R2_MONTHS} months`, `erst in Monat ${inUse} im Einsatz, nach den ${R2_MONTHS} Monaten`));
  }
  return { id, tier, start, inUse, measOk: m, dataOk: d, late, never, notes };
}

/**
 * Measurable: the share of the funded money on items that are measured, whose data is connected, that are in use inside the plan and are not a black box.
 * Risk: the share on a black box, on data below the bar or on an item that is in use only after the plan's months.
 */
function barsOf(r2: HasTier, scn: Scn): Bars {
  const f = fundedIds(r2);
  const spent = f.reduce((s, id) => s + ARCH_BY_ID[id].cost, 0);
  let meas = 0;
  let risk = 0;
  for (const id of f) {
    const c = ARCH_BY_ID[id].cost;
    const v = itemView(r2, id, scn);
    if (PANEL[id].measured && v.measOk && v.dataOk && !v.late && !v.never && !PANEL[id].blackBox) meas += c;
    if (PANEL[id].blackBox || !v.dataOk || v.late) risk += c;
  }
  return { spent, over: Math.max(0, spent - R2_BUDGET), left: R2_BUDGET - spent, meas: spent ? Math.round((meas / spent) * 100) : null, risk: spent ? Math.round((risk / spent) * 100) : null };
}

/** The Measurable and Risk bars are ranges across the two data scenarios: [as the brief says, weaker data]. */
export function rangeOf(r2: HasTier): { meas: [number | null, number | null]; risk: [number | null, number | null] } {
  const a = barsOf(r2, 0);
  const w = barsOf(r2, 1);
  return { meas: [a.meas, w.meas], risk: [a.risk, w.risk] };
}

/* ------------------------------------------------------------------ the four tests */

const TEST_NAME: Record<TestId, () => string> = {
  measure: () => tt("Integration comes first", "Integration kommt zuerst"),
  purpose: () => tt("Every funded item has a purpose", "Jeder finanzierte Punkt hat einen Zweck"),
  data: () => tt("Data is connected when a game element starts", "Die Daten sind verbunden, wenn ein Spielelement startet"),
  budget: () => tt(`It fits the budget and the ${R2_MONTHS} months`, `Es passt ins Budget und in die ${R2_MONTHS} Monate`),
};
const TEST_RULE: Record<TestId, () => string> = {
  measure: () => tt("The shared profile and dashboard start no later than the first game element, so every element reads one customer and is measured by the same KPIs from its first week.", "Gemeinsames Profil und Dashboard starten nicht später als das erste Spielelement, damit jedes Element einen Kunden liest und ab seiner ersten Woche nach denselben KPIs gemessen wird."),
  purpose: () => tt("A funded item moves a named customer KPI or makes one measurable. A black box and a points scheme that names no customer KPI do neither: nobody can say what they change for customers.", "Ein finanzierter Punkt bewegt einen benannten Kunden-KPI oder macht einen messbar. Eine Black Box und ein Punkteschema, das keinen Kunden-KPI nennt, tun keines von beidem: Niemand kann sagen, was sie für Kunden ändern."),
  data: () => tt(`A game element starts on data of which at least ${READY_BAR}% already reaches the shared profile. Data that is not connected teaches the element its gaps.`, `Ein Spielelement startet auf Daten, von denen mindestens ${READY_BAR} % schon das gemeinsame Profil erreichen. Daten, die nicht verbunden sind, lehren das Element seine Lücken.`),
  budget: () => tt(`The funded items stay inside ${euro(R2_BUDGET)} and are all in use by month ${R2_MONTHS}.`, `Die finanzierten Punkte bleiben innerhalb von ${euro(R2_BUDGET)} und sind alle bis Monat ${R2_MONTHS} im Einsatz.`),
};
export const TEST_IDS: TestId[] = ["measure", "purpose", "data", "budget"];

function testsOf(r2: HasTier, scn: Scn, items: Record<ArchId, ItemView>, bars: Bars): TestView[] {
  const f = fundedIds(r2);
  const engines = ENGINE_IDS.filter((id) => isFunded(r2, id));
  const view = (id: TestId, applies: boolean, open: OpenDetail[]): TestView => ({ id, name: TEST_NAME[id](), rule: TEST_RULE[id](), applies, holds: applies && open.length === 0, open });

  // 1 · integration first
  const mOpen: OpenDetail[] = [];
  for (const id of engines) {
    const v = items[id];
    if (v.never || v.measOk) continue;
    const f0 = startOf(r2, KPI_SYSTEM_ID);
    const part = f0 === null ? tt("the shared profile and dashboard are not funded", "gemeinsames Profil und Dashboard sind nicht finanziert") : tt(`the shared profile and dashboard start in month ${f0}`, `gemeinsames Profil und Dashboard starten in Monat ${f0}`);
    mOpen.push({
      fact: tt(`${nm(id)}: starts in month ${v.start}, but ${part}.`, `${nm(id)}: startet in Monat ${v.start}, aber ${part}.`),
      plain: tt(`${nm(id)} would start before the shared profile is in place. It would reward customers it knows only in part, and nobody could compare its results on the same KPIs.`, `${nm(id)} würde starten, bevor das gemeinsame Profil steht. Es würde Kunden belohnen, die es nur zum Teil kennt, und niemand könnte seine Ergebnisse an denselben KPIs vergleichen.`),
      where: [id, KPI_SYSTEM_ID],
      rule: TEST_RULE.measure(),
      ways: [
        { text: tt("Set the profile and retention dashboard to Now: they start in month 1, before any game element.", "Setzen Sie Profil und Retention-Dashboard auf „Jetzt“: Sie starten in Monat 1, vor jedem Spielelement."), go: [KPI_SYSTEM_ID] },
        { text: tt(`Or, on the card ${card(id)}, press “Not now” until they are in place.`, `Oder drücken Sie auf der Karte ${card(id)} „Jetzt nicht“, bis sie stehen.`), go: [id] },
      ],
    });
  }

  // 2 · every funded item has a purpose
  const pOpen: OpenDetail[] = f
    .filter((id) => !PANEL[id].named && !PANEL[id].enabler)
    .map((id) => ({
      fact: PANEL[id].blackBox
        ? tt(`${nm(id)} names no customer KPI it moves, and its rewards and results are not shown.`, `${nm(id)} nennt keinen Kunden-KPI, den es bewegt, und seine Belohnungen und Ergebnisse werden nicht gezeigt.`)
        : tt(`${nm(id)} names no customer KPI it moves: it counts logins and points, and nothing says whether that keeps a customer.`, `${nm(id)} nennt keinen Kunden-KPI, den es bewegt: Es zählt Logins und Punkte, und nichts sagt, ob das einen Kunden hält.`),
      plain: PANEL[id].blackBox ? tt(`You would pay ${euro(ARCH_BY_ID[id].cost)} for a platform that decides rewards without showing why. After ${R2_MONTHS} months nobody at EngageIT could say whether that money worked.`, `Sie würden ${euro(ARCH_BY_ID[id].cost)} für eine Plattform zahlen, die Belohnungen entscheidet, ohne zu zeigen, warum. Nach ${R2_MONTHS} Monaten könnte bei EngageIT niemand sagen, ob dieses Geld gewirkt hat.`) : tt(`You would pay ${euro(ARCH_BY_ID[id].cost)} for points and a leaderboard that are not connected to the membership tool and name no customer KPI. After ${R2_MONTHS} months nobody could say whether they kept a customer, and customers may simply have learned to log in for points.`, `Sie würden ${euro(ARCH_BY_ID[id].cost)} für Punkte und eine Rangliste zahlen, die nicht mit dem Mitgliedschaftstool verbunden sind und keinen Kunden-KPI nennen. Nach ${R2_MONTHS} Monaten könnte niemand sagen, ob sie einen Kunden gehalten haben, und Kunden haben vielleicht nur gelernt, sich für Punkte einzuloggen.`),
      where: [id],
      rule: TEST_RULE.purpose(),
      ways: [
        { text: tt(`Set it to Not now and use the ${euro(ARCH_BY_ID[id].cost)} on an item that moves a named customer KPI.`, `Setzen Sie es auf „Jetzt nicht“ und nutzen Sie die ${euro(ARCH_BY_ID[id].cost)} für einen Punkt, der einen benannten Kunden-KPI bewegt.`), go: [id] },
        { text: tt("Or keep it, and say in your reasons how EngageIT will explain what it does and measure its effect.", "Oder behalten Sie es, und sagen Sie in Ihren Begründungen, wie EngageIT erklären wird, was es tut, und seine Wirkung misst."), go: [] },
      ],
    }));

  // 3 · data connected when a game element starts
  const dOpen: OpenDetail[] = [];
  for (const id of engines) {
    const v = items[id];
    if (v.never) {
      dOpen.push({
        fact: tt(`${nm(id)}: waits for data, but the usage data clean-up it waits for is not set to Now, so it never starts.`, `${nm(id)}: wartet auf die Daten, aber die Bereinigung der Nutzungsdaten, auf die es wartet, steht nicht auf „Jetzt“, also startet es nie.`),
        plain: tt(`“${TIER_LABEL.later}” means: wait until ${card(CLEAN_ID)} is in use. But that item is not set to Now, so ${nm(id)} waits for ever and its money is booked for nothing.`, `„${TIER_LABEL.later}“ heißt: warten, bis ${card(CLEAN_ID)} im Einsatz ist. Dieser Punkt steht aber nicht auf „Jetzt“, also wartet ${nm(id)} für immer, und sein Geld ist für nichts verbucht.`),
        where: [id, CLEAN_ID],
        rule: TEST_RULE.data(),
        ways: [
          { text: tt("Set the usage data clean-up to Now.", "Setzen Sie die Bereinigung der Nutzungsdaten auf „Jetzt“."), go: [CLEAN_ID] },
          { text: tt(`Or, on the card ${card(id)}, press “Not now”.`, `Oder drücken Sie auf der Karte ${card(id)} „Jetzt nicht“.`), go: [id] },
        ],
      });
      continue;
    }
    if (v.dataOk) continue;
    const val = readyOf(id, scn);
    if (PANEL[id].cleaned) {
      dOpen.push({
        fact: tt(`${nm(id)}: starts in month ${v.start} on data ${val}% connected, below ${READY_BAR}%. The usage data clean-up is ${isFunded(r2, CLEAN_ID) && tierOf(r2, CLEAN_ID) === "now" ? `in use only in month ${inUseOf(r2, CLEAN_ID)}` : "not set to Now"}.`, `${nm(id)}: startet in Monat ${v.start} auf Daten, die zu ${val} % verbunden sind, unter ${READY_BAR} %. Die Bereinigung der Nutzungsdaten ist ${isFunded(r2, CLEAN_ID) && tierOf(r2, CLEAN_ID) === "now" ? `erst in Monat ${inUseOf(r2, CLEAN_ID)} im Einsatz` : "nicht auf „Jetzt“ gesetzt"}.`),
        plain: tt(`${nm(id)} would work on data of which only ${val}% reaches the shared profile, so it would see only part of what each customer does. The usage data clean-up connects exactly this data, but ${nm(id)} starts before the clean-up is in use.`, `${nm(id)} würde auf Daten arbeiten, von denen nur ${val} % das gemeinsame Profil erreichen, und also nur einen Teil dessen sehen, was jeder Kunde tut. Die Bereinigung der Nutzungsdaten verbindet genau diese Daten, aber ${nm(id)} startet, bevor die Bereinigung im Einsatz ist.`),
        where: [id, CLEAN_ID],
        rule: TEST_RULE.data(),
        ways: [
          { text: tt(`Set the usage data clean-up to Now and ${nm(id)} to After data is ready: it then starts in month ${1 + monthsOf(CLEAN_ID)}, when the clean-up is in use.`, `Setzen Sie die Bereinigung der Nutzungsdaten auf „Jetzt“ und ${nm(id)} auf „Wenn die Daten bereit sind“: Es startet dann in Monat ${1 + monthsOf(CLEAN_ID)}, wenn die Bereinigung im Einsatz ist.`), go: [CLEAN_ID, id] },
          { text: tt(`Or, on the card ${card(id)}, press “Not now”.`, `Oder drücken Sie auf der Karte ${card(id)} „Jetzt nicht“.`), go: [id] },
        ],
      });
    } else {
      dOpen.push({
        fact: tt(`${nm(id)}: starts on data ${val}% connected, below ${READY_BAR}%. The usage data clean-up does not prepare this data.`, `${nm(id)}: startet auf Daten, die zu ${val} % verbunden sind, unter ${READY_BAR} %. Die Bereinigung der Nutzungsdaten bereitet diese Daten nicht vor.`),
        plain: tt(`${nm(id)} would work on data of which only ${val}% reaches the shared profile, so it would see only part of what each customer does. Nothing in this plan connects this data.`, `${nm(id)} würde auf Daten arbeiten, von denen nur ${val} % das gemeinsame Profil erreichen, und also nur einen Teil dessen sehen, was jeder Kunde tut. Nichts in diesem Plan verbindet diese Daten.`),
        where: [id],
        rule: TEST_RULE.data(),
        ways: [
          { text: tt(`On the card ${card(id)}, press “Not now” until the data is better.`, `Drücken Sie auf der Karte ${card(id)} „Jetzt nicht“, bis die Daten besser sind.`), go: [id] },
          { text: tt(`Or keep it, and say in your reasons what you will do if the data stays below ${READY_BAR}%.`, `Oder behalten Sie es, und sagen Sie in Ihren Begründungen, was Sie tun, wenn die Daten unter ${READY_BAR} % bleiben.`), go: [] },
        ],
      });
    }
  }

  // 4 · budget and the five months
  const bOpen: OpenDetail[] = [];
  if (bars.over > 0)
    bOpen.push({
      fact: tt(`The funded items cost ${euro(bars.spent)}, which is ${euro(bars.over)} over the ${euro(R2_BUDGET)} budget.`, `Die finanzierten Punkte kosten ${euro(bars.spent)}, das sind ${euro(bars.over)} über dem Budget von ${euro(R2_BUDGET)}.`),
      plain: tt(`Your plan spends more than the ${euro(R2_BUDGET)} you have. To fit, take items worth at least ${euro(bars.over)} out of the plan. Your funded items are listed below with their costs, most expensive first; choose the one whose case you find weakest.`, `Ihr Plan gibt mehr aus als die ${euro(R2_BUDGET)}, die Sie haben. Damit er passt, nehmen Sie Punkte im Wert von mindestens ${euro(bars.over)} aus dem Plan. Ihre finanzierten Punkte stehen unten mit ihren Kosten, die teuersten zuerst; wählen Sie den, dessen Begründung Sie am schwächsten finden.`),
      where: [],
      rule: TEST_RULE.budget(),
      ways: [
        { text: tt(`On one or more of these cards, press “Not now” (together at least ${euro(bars.over)}):`, `Drücken Sie auf einer oder mehreren dieser Karten „Jetzt nicht“ (zusammen mindestens ${euro(bars.over)}):`), go: [...f].sort((a, c) => ARCH_BY_ID[c].cost - ARCH_BY_ID[a].cost) },
        { text: tt("Or keep the total, and say in your reasons why it is worth going over.", "Oder behalten Sie die Summe, und sagen Sie in Ihren Begründungen, warum es sich lohnt, darüber zu liegen."), go: [] },
      ],
    });
  for (const id of f) {
    const v = items[id];
    if (!v.late) continue;
    bOpen.push({
      fact: tt(`${nm(id)}: in use only in month ${v.inUse}, after the ${R2_MONTHS} months (${monthsOf(id)} months to build, starting in month ${v.start}).`, `${nm(id)}: erst in Monat ${v.inUse} im Einsatz, nach den ${R2_MONTHS} Monaten (${monthsOf(id)} Monate Aufbau, Start in Monat ${v.start}).`),
      plain: tt(`${nm(id)} would be ready only after the plan ends, so it cannot show any result inside the ${R2_MONTHS} months.`, `${nm(id)} wäre erst nach dem Ende des Plans fertig und kann also innerhalb der ${R2_MONTHS} Monate kein Ergebnis zeigen.`),
      where: [id],
      rule: TEST_RULE.budget(),
      ways: [
        { text: v.tier === "later" ? tt(`On the card ${card(id)}, press “Now”: it then starts in month 1.`, `Drücken Sie auf der Karte ${card(id)} „Jetzt“: Es startet dann in Monat 1.`) : tt(`On the card ${card(id)}, press “Not now”.`, `Drücken Sie auf der Karte ${card(id)} „Jetzt nicht“.`), go: [id] },
        { text: tt(`Or keep it, and say in your reasons what the plan does without it before month ${R2_MONTHS + 1}.`, `Oder behalten Sie es, und sagen Sie in Ihren Begründungen, was der Plan ohne es vor Monat ${R2_MONTHS + 1} tut.`), go: [] },
      ],
    });
  }

  const any = f.length > 0;
  return [view("measure", engines.length > 0, mOpen), view("purpose", any, pOpen), view("data", engines.length > 0, dOpen), view("budget", any, bOpen)];
}

/** Everything the panel shows for one data scenario. */
export function planOf(r2: HasTier, scn: Scn): PlanView {
  const items = Object.fromEntries(ARCH_IDS.map((id) => [id, itemView(r2, id, scn)])) as Record<ArchId, ItemView>;
  const bars = barsOf(r2, scn);
  const tests = testsOf(r2, scn, items, bars);
  const applicable = tests.filter((x) => x.applies).length;
  return { items, funded: fundedIds(r2), nowCount: nowIds(r2).length, bars, tests, holding: tests.filter((x) => x.holds).length, applicable };
}

/* ------------------------------------------------------------------ the reading of the plan */

export type Reading = { gives: string[]; costs: string[] };

/** What the plan gives, and what it costs or leaves open: two lists of facts, never a grade (CLAUDE.md #47). */
export function readingOf(r2: HasTier, scn: Scn): Reading {
  const plan = planOf(r2, scn);
  const gives: string[] = [];
  const costs: string[] = [];
  for (const id of ARCH_IDS) {
    const v = plan.items[id];
    const p = PANEL[id];
    const cost = ARCH_BY_ID[id].cost;
    if (v.tier === "not") {
      if (p.blackBox) gives.push(tt(`${nm(id)} not bought: ${euro(cost)} is not spent on a black box.`, `${nm(id)} nicht gekauft: ${euro(cost)} werden nicht für eine Black Box ausgegeben.`));
      else if (id === "relaunch") gives.push(tt(`${nm(id)} not now: ${euro(cost)} and ${ARCH_BY_ID[id].weeks} weeks are not spent on points that name no customer KPI and are not connected to the membership tool.`, `${nm(id)} jetzt nicht: ${euro(cost)} und ${ARCH_BY_ID[id].weeks} Wochen werden nicht für Punkte ausgegeben, die keinen Kunden-KPI nennen und nicht mit dem Mitgliedschaftstool verbunden sind.`));
      else if (id === KPI_SYSTEM_ID) costs.push(tt("Profile and retention dashboard not funded: every game element keeps its own customer list, and each team counts the KPIs its own way.", "Profil und Retention-Dashboard nicht finanziert: Jedes Spielelement führt weiter seine eigene Kundenliste, und jedes Team zählt die KPIs auf seine Weise."));
      else if (id === "training") costs.push(tt("Training not now: customer success and product may not read the dashboard or run the monthly review.", "Training jetzt nicht: Customer Success und Produkt lesen vielleicht das Dashboard nicht oder führen das monatliche Review nicht durch."));
      else if (id === "tracking") costs.push(tt("Rulebook and fairness checks not now: nothing says which actions earn a reward, and nobody watches the accounts that only collect points.", "Regelwerk und Fairness-Prüfungen jetzt nicht: Nichts sagt, welche Handlungen eine Belohnung bringen, und niemand beobachtet die Konten, die nur Punkte sammeln."));
      else if (p.named) costs.push(tt(`${nm(id)} not now: does not move ${p.moves}.`, `${nm(id)} jetzt nicht: bewegt ${p.moves} nicht.`));
      continue;
    }
    if (v.never) {
      costs.push(tt(`${nm(id)}: waits for a usage data clean-up that is not planned, so it never starts.`, `${nm(id)}: wartet auf eine Bereinigung der Nutzungsdaten, die nicht eingeplant ist, und startet daher nie.`));
      continue;
    }
    if (p.blackBox) {
      costs.push(tt(`${nm(id)}: ${euro(cost)} on rewards nobody can see or stop.`, `${nm(id)}: ${euro(cost)} für Belohnungen, die niemand sehen oder stoppen kann.`));
    } else if (id === "relaunch") {
      costs.push(tt(`${nm(id)}: ${euro(cost)} on points that are not connected to the membership tool, so a customer who collects points gets nothing the profile knows about and nobody can show whether it kept a customer.`, `${nm(id)}: ${euro(cost)} für Punkte, die nicht mit dem Mitgliedschaftstool verbunden sind, sodass ein Kunde, der Punkte sammelt, nichts bekommt, was das Profil kennt, und niemand zeigen kann, ob es einen Kunden hielt.`));
    } else if (id === KPI_SYSTEM_ID) {
      gives.push(tt("Profile and retention dashboard: every game element reads one customer, and every KPI is defined once across them.", "Profil und Retention-Dashboard: Jedes Spielelement liest einen Kunden, und jeder KPI ist einmal über alle definiert."));
    } else if (id === "training") {
      gives.push(tt("Training: customer success and product read the dashboard and run the monthly review.", "Training: Customer Success und Produkt lesen das Dashboard und führen das monatliche Review durch."));
    } else if (id === "tracking") {
      gives.push(tt("Rulebook and fairness checks: only real actions earn a reward, and a monthly check watches the accounts that only collect points.", "Regelwerk und Fairness-Prüfungen: Nur echte Handlungen bringen eine Belohnung, und eine monatliche Prüfung beobachtet die Konten, die nur Punkte sammeln."));
    } else if (id === CLEAN_ID) {
      gives.push(cleanGives(r2));
    } else {
      const ready = readyOf(id, scn);
      if (v.measOk && v.dataOk)
        gives.push(tt(`${nm(id)}: moves ${p.moves}, is measured, and the data it reads is connected${ready !== null ? ` (${ready}%)` : ""}${v.tier === "later" ? `; it starts in month ${v.start}, when the usage data clean-up is in use` : ""}.`, `${nm(id)}: bewegt ${p.moves}, wird gemessen, und die Daten, die es liest, sind verbunden${ready !== null ? ` (${ready} %)` : ""}${v.tier === "later" ? `; startet in Monat ${v.start}, wenn die Bereinigung der Nutzungsdaten im Einsatz ist` : ""}.`));
      if (!v.measOk) costs.push(tt(`${nm(id)}: nothing measures it when it starts, so its effect on ${p.moves} cannot be shown.`, `${nm(id)}: Nichts misst es, wenn es startet, seine Wirkung auf ${p.moves} lässt sich also nicht zeigen.`));
      if (!v.dataOk) costs.push(tt(`${nm(id)}: the data it reads is ${ready}% connected, below ${READY_BAR}%, when it starts.`, `${nm(id)}: Die Daten, die es liest, sind zu ${ready} % verbunden, unter ${READY_BAR} %, wenn es startet.`));
    }
    if (v.late) costs.push(tt(`${nm(id)}: in use only in month ${v.inUse}, after the ${R2_MONTHS} months.`, `${nm(id)}: erst in Monat ${v.inUse} im Einsatz, nach den ${R2_MONTHS} Monaten.`));
  }
  const b = plan.bars;
  if (plan.funded.length === 0) costs.unshift(tt("Nothing is built: the three problems in the brief stay as they are.", "Nichts wird gebaut: Die drei Probleme des Auftrags bleiben, wie sie sind."));
  else if (b.over > 0) costs.push(tt(`${euro(b.over)} over the budget. Keep it only with a reason.`, `${euro(b.over)} über dem Budget. Behalten Sie es nur mit einer Begründung.`));
  else if (b.left > 0) costs.push(tt(`${euro(b.left)} of the budget stays unspent. Say what it is for, or why you hold it back.`, `${euro(b.left)} des Budgets bleiben ungenutzt. Sagen Sie, wofür es gedacht ist oder warum Sie es zurückhalten.`));
  if (plan.funded.length > 0) {
    const top = plan.funded.filter((id) => !PANEL[id].blackBox).reduce((a, id) => (ARCH_BY_ID[id].cost > ARCH_BY_ID[a].cost ? id : a), plan.funded[0]);
    if (b.spent > 0 && ARCH_BY_ID[top].cost / b.spent >= 0.35 && !PANEL[top].blackBox) costs.push(tt(`${Math.round((ARCH_BY_ID[top].cost / b.spent) * 100)}% of the money rides on one item: ${nm(top)}.`, `${Math.round((ARCH_BY_ID[top].cost / b.spent) * 100)} % des Geldes hängen an einem Punkt: ${nm(top)}.`));
  }
  if (gives.length === 0) gives.push(tt("Nothing yet. Set at least one item to Now.", "Noch nichts. Setzen Sie mindestens einen Punkt auf „Jetzt“."));
  return { gives, costs };
}

/** What the usage data clean-up gives, depending on whether the referral invitations are part of the plan. */
function cleanGives(r2: HasTier): string {
  return isFunded(r2, "routing")
    ? tt("Usage data clean-up: use is recorded the same way everywhere, so the data the referral invitations read reaches the profile before they start.", "Bereinigung der Nutzungsdaten: Nutzung wird überall gleich erfasst, sodass die Daten, die die Empfehlungseinladungen lesen, das Profil erreichen, bevor sie starten.")
    : tt("Usage data clean-up: use is recorded the same way everywhere, so the profile is comparable across the platform, the membership tool and the referral scheme; later referral invitations would not learn the gaps.", "Bereinigung der Nutzungsdaten: Nutzung wird überall gleich erfasst, sodass das Profil über Plattform, Mitgliedschaftstool und Empfehlungsprogramm vergleichbar ist; spätere Empfehlungseinladungen würden die Lücken nicht lernen.");
}

/* ------------------------------------------------------------------ Step B: the decision against Step A */

/** One plain hint when the Step B decision and the Step A plan point in different directions; null when they agree. */
export function decisionHint(r2: HasTier & { decision: string | null }): string | null {
  const n = nowIds(r2).length;
  if (r2.decision === "wait" && n > 0) return tt("Step B says wait until the success of gamification is proven, while Step A builds " + n + (n === 1 ? " item" : " items") + " now. Say in your reason how the two fit together.", "Schritt B sagt, warten, bis der Erfolg von Gamification bewiesen ist, während Schritt A jetzt " + n + (n === 1 ? " Punkt" : " Punkte") + " baut. Sagen Sie in Ihrer Begründung, wie beides zusammenpasst.");
  if (r2.decision === "commit" && !isFunded(r2, "suite")) return tt("Step B says buy the all-in-one game platform now, while Step A leaves it out. Say in your reason which of the two you stand behind.", "Schritt B sagt, jetzt die All-in-one-Spieleplattform zu kaufen, während Schritt A sie weglässt. Sagen Sie in Ihrer Begründung, zu welchem von beiden Sie stehen.");
  if (r2.decision === "stage" && tierOf(r2, "suite") === "now") return tt("Step B says integrate in stages, while Step A starts the all-in-one game platform now, all at once. Say in your reason how that is staged.", "Schritt B sagt, in Stufen zu integrieren, während Schritt A die All-in-one-Spieleplattform jetzt auf einmal startet. Sagen Sie in Ihrer Begründung, wie das gestuft ist.");
  return null;
}

/* ------------------------------------------------------------------ three internal categories (CLAUDE.md #47) */

/**
 * 1 · safe: the base is mapped and integrated before the game elements and every applicable test holds (there can be several such plans).
 * 2 · fair: a base exists but a fundamental is missing or a better approach is available.
 * 3 · clearly wrong: game elements are funded without the base (an element or the platform with no shared profile and dashboard), or nothing is built.
 * Used only to choose what the reading says and for the mentor's understanding; the learner never sees it and it is never exported.
 */
export type Category = 1 | 2 | 3;
const GAME_IDS: ArchId[] = ["personal", "routing", "suite"];

export function categoryOf(r2: HasTier, scn: Scn = 0): { cat: Category; why: string } {
  const f = fundedIds(r2);
  if (f.length === 0) return { cat: 3, why: "Nothing is built: the task asks for an architecture." };
  const game = f.filter((id) => GAME_IDS.includes(id));
  const base = isFunded(r2, KPI_SYSTEM_ID);
  if (game.length > 0 && !base) return { cat: 3, why: `${game.map((id) => PANEL[id].short).join(", ")} funded with no shared profile and dashboard: game elements are bought before the base exists.` };
  const plan = planOf(r2, scn);
  const open = plan.tests.filter((x) => x.applies && !x.holds).map((x) => x.name);
  if (!base) return { cat: 2, why: "No shared profile and dashboard yet, so nothing can be integrated or measured; no game element is bought without it." };
  if (open.length === 0) return { cat: 1, why: "The shared profile and dashboard are funded and every applicable test holds." };
  return { cat: 2, why: `The shared profile and dashboard are funded, but these tests are open: ${open.join("; ")}.` };
}

export type Change = { id: ArchId; to: Tier; text: string };

const CUT_ORDER: ArchId[] = ["suite", "relaunch", "training", "tracking", "routing", "personal", "chat"];

/** The changes that put the plan on the safe side, as information: which item to which tier and why, and what the plan looks like after them. */
export function changesFor(r2: HasTier, scn: Scn): { changes: Change[]; after: PlanView } {
  const t: Record<string, Tier> = { ...r2.tier };
  const cur = (id: ArchId): Tier => t[id] ?? "not";
  const changes: Change[] = [];
  const set = (id: ArchId, to: Tier, text: string) => {
    if (cur(id) === to) return;
    t[id] = to;
    changes.push({ id, to, text });
  };
  const any = () => ARCH_IDS.some((id) => cur(id) !== "not");
  const baseText = tt("Set the profile and retention dashboard to Now: the base comes first, and it starts in month 1, no later than any game element.", "Setzen Sie Profil und Retention-Dashboard auf „Jetzt“: Die Basis kommt zuerst, und sie startet in Monat 1, nicht später als jedes Spielelement.");

  if (!any()) {
    set(KPI_SYSTEM_ID, "now", baseText);
    set("tracking", "now", tt("Add the rulebook and fairness checks, set to Now: they need no data to start, and they move the share of accounts that only collect points, a named guardrail.", "Fügen Sie Regelwerk und Fairness-Prüfungen hinzu, auf „Jetzt“: Sie brauchen keine Daten zum Start und bewegen den Anteil der Konten, die nur Punkte sammeln, eine benannte Guardrail."));
  }
  if (any() && cur(KPI_SYSTEM_ID) !== "now") set(KPI_SYSTEM_ID, "now", baseText);
  if (cur("suite") !== "not") set("suite", "not", tt("Set the all-in-one game platform to Not now: it names no customer KPI it moves, nobody can see inside it, and at 32 weeks it is in use only in month 9.", "Setzen Sie die All-in-one-Spieleplattform auf „Jetzt nicht“: Sie nennt keinen Kunden-KPI, den sie bewegt, niemand kann hineinsehen, und mit 32 Wochen ist sie erst in Monat 9 im Einsatz."));
  if (cur("relaunch") !== "not") set("relaunch", "not", tt("Set the points per login and public leaderboard to Not now: they name no customer KPI they move, and they are not connected to the membership tool.", "Setzen Sie Punkte pro Login und öffentliche Rangliste auf „Jetzt nicht“: Sie nennen keinen Kunden-KPI, den sie bewegen, und sind nicht mit dem Mitgliedschaftstool verbunden."));
  const spent = () => ARCH_IDS.filter((id) => cur(id) !== "not").reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const cut = () => {
    for (const id of CUT_ORDER) {
      if (spent() <= R2_BUDGET) return;
      if (cur(id) === "not") continue;
      set(id, "not", tt(`Set ${PANEL[id].short} to Not now: the plan is ${euro(spent() - R2_BUDGET)} over the budget and this is the item with the weakest case.`, `Setzen Sie ${PANEL[id].short} auf „Jetzt nicht“: Der Plan liegt ${euro(spent() - R2_BUDGET)} über dem Budget, und dies ist der Punkt mit der schwächsten Begründung.`));
    }
  };
  cut();
  for (const id of ENGINE_IDS.filter((x) => PANEL[x].cleaned)) {
    if (cur(id) === "not") continue;
    if (cur(CLEAN_ID) !== "now") set(CLEAN_ID, "now", tt("Set the usage data clean-up to Now: use is then recorded the same way everywhere and the data the referral invitations read reaches the profile.", "Setzen Sie die Bereinigung der Nutzungsdaten auf „Jetzt“: Nutzung wird dann überall gleich erfasst, und die Daten, die die Empfehlungseinladungen lesen, erreichen das Profil."));
    if (!dataOk({ tier: t }, id, scn)) set(id, "later", tt(`Set ${PANEL[id].short} to After data is ready: its data is ${PANEL[id].data}% connected, so it starts in month ${1 + monthsOf(CLEAN_ID)}, when the usage data clean-up is in use.`, `Setzen Sie ${PANEL[id].short} auf „Wenn die Daten bereit sind“: Seine Daten sind zu ${PANEL[id].data} % verbunden, also startet es in Monat ${1 + monthsOf(CLEAN_ID)}, wenn die Bereinigung der Nutzungsdaten im Einsatz ist.`));
    cut();
  }
  return { changes, after: planOf({ tier: t }, scn) };
}

/* ------------------------------------------------------------------ how the system reads the plan (wording by category) */

/** One paragraph on how the plan stands, worded by category; it never names the category. */
export function standingOf(r2: HasTier, scn: Scn): string {
  const { cat } = categoryOf(r2, scn);
  const f = fundedIds(r2);
  const game = f.filter((id) => GAME_IDS.includes(id));
  const brief = planOf(r2, 0);
  const weak = planOf(r2, 1);
  if (cat === 3) {
    return f.length === 0
      ? tt("Nothing is built, so the three problems in the brief stay as they are. The task asks for an architecture. Below are the changes that put the base first.", "Nichts wird gebaut, also bleiben die drei Probleme des Auftrags, wie sie sind. Die Aufgabe verlangt eine Architektur. Unten stehen die Änderungen, die die Basis an die erste Stelle setzen.")
      : tt(`${game.map((id) => PANEL[id].short).join(", ")} ${game.length === 1 ? "is" : "are"} funded, but there is no shared profile and dashboard. Without it the element reads only one system, nothing can say whether it works, and it rewards customers it knows only in part. Below are the changes that put the base first.`, `${game.map((id) => PANEL[id].short).join(", ")} ${game.length === 1 ? "ist" : "sind"} finanziert, aber es gibt kein gemeinsames Profil und kein Dashboard. Ohne sie liest das Element nur ein System, nichts kann sagen, ob es wirkt, und es belohnt Kunden, die es nur zum Teil kennt. Unten stehen die Änderungen, die die Basis an die erste Stelle setzen.`);
  }
  if (cat === 2) {
    const open = brief.tests.filter((x) => x.applies && !x.holds).map((x) => x.name);
    return open.length
      ? tt(`The base is there, but ${open.length} of ${brief.applicable} tests are open with the brief's data: ${open.join("; ")}. Each is explained in the panel; below are the changes that make the plan hold.`, `Die Basis ist da, aber ${open.length} von ${brief.applicable} Tests sind bei den Daten des Auftrags offen: ${open.join("; ")}. Jeder ist im Panel erklärt; unten stehen die Änderungen, mit denen der Plan hält.`)
      : tt("There is no shared profile and dashboard yet, so nothing can be integrated or measured. Below are the changes that put the base first.", "Es gibt noch kein gemeinsames Profil und kein Dashboard, also lässt sich nichts integrieren oder messen. Unten stehen die Änderungen, die die Basis an die erste Stelle setzen.");
  }
  const watch = weak.tests.filter((x) => x.applies && !x.holds).map((x) => x.name);
  return tt(
    `The base comes before the game elements and every test holds with the brief's data: the shared profile and dashboard start no later than the first game element, every funded item has a purpose, the elements start on connected data, and the plan fits the budget and the ${R2_MONTHS} months. Other plans can hold too.${watch.length ? ` With the data ${WEAK_POINTS} points weaker, ${watch.length === 1 ? "this test opens" : "these tests open"}: ${watch.join("; ")}. That is what the sentence “what you will watch” in Step B is for.` : ""}`,
    `Die Basis kommt vor den Spielelementen, und jeder Test stimmt bei den Daten des Auftrags: Gemeinsames Profil und Dashboard starten nicht später als das erste Spielelement, jeder finanzierte Punkt hat einen Zweck, die Elemente starten auf verbundenen Daten, und der Plan passt ins Budget und in die ${R2_MONTHS} Monate. Auch andere Pläne können halten.${watch.length ? ` Bei um ${WEAK_POINTS} Punkte schwächeren Daten ${watch.length === 1 ? "öffnet sich dieser Test" : "öffnen sich diese Tests"}: ${watch.join("; ")}. Dafür ist der Satz „Was Sie beobachten“ in Schritt B da.` : ""}`,
  );
}

export type DecisionReading = { cat: Category; why: string; text: string; change: string };

/** How the system reads the Step B decision against the Step A plan; null until a decision is chosen. The category is for the mentor only. */
export function decisionReading(r2: HasTier & { decision: string | null }, scn: Scn): DecisionReading | null {
  if (!r2.decision) return null;
  const plan = categoryOf(r2, scn);
  const base = isFunded(r2, KPI_SYSTEM_ID);
  const firstMoves = euro(ARCH_BY_ID[KPI_SYSTEM_ID].cost + ARCH_BY_ID.chat.cost + ARCH_BY_ID.personal.cost);
  if (r2.decision === "stage") {
    const clause =
      plan.cat === 1
        ? tt(" Your Step A is that staged plan.", " Ihr Schritt A ist dieser gestufte Plan.")
        : plan.cat === 2
          ? tt(" Step A still has open tests, so the staging is not complete yet: see what to change under Step A.", " Schritt A hat noch offene Tests, die Stufung ist also noch nicht vollständig: Siehe, was Sie unter Schritt A ändern können.")
          : tt(" Step A funds game elements before the base exists, so the staging is not real yet: put the base first (see Step A).", " Schritt A finanziert Spielelemente, bevor die Basis steht, die Stufung ist also noch nicht echt: Setzen Sie die Basis an die erste Stelle (siehe Schritt A).");
    return {
      cat: 1,
      why: "Staging is the decision the brief asks for: integrate now, start where the customer wants the result and the data is connected, measure before scaling.",
      text: tt("Integrating now and building in stages is what the brief asks for: it changes something for customers within weeks where they already want the result and a break costs most, and it measures before it scales.", "Jetzt zu integrieren und stufenweise zu bauen ist, was der Auftrag verlangt: Es ändert innerhalb von Wochen etwas für Kunden, dort wo sie das Ergebnis ohnehin wollen und ein Bruch am meisten kostet, und es misst, bevor es skaliert.") + clause,
      change: plan.cat === 1 ? tt("Nothing to change in the decision. What is left is the sentence on what you will watch.", "An der Entscheidung ist nichts zu ändern. Es bleibt der Satz dazu, was Sie beobachten.") : tt("Keep the decision and apply the changes from the reading under Step A.", "Behalten Sie die Entscheidung und setzen Sie die Änderungen aus dem Lesen unter Schritt A um."),
    };
  }
  if (r2.decision === "commit")
    return {
      cat: base ? 2 : 3,
      why: base ? "The platform is bought although a base is funded." : "The platform is bought with no base: game elements without integration.",
      text: tt(`Buying the platform now puts ${euro(ARCH_BY_ID.suite.cost)} into a system nobody can see inside, in use only in month ${1 + monthsOf("suite")}, after the ${R2_MONTHS} months, and the money is spent before any KPI shows what works.`, `Die Plattform jetzt zu kaufen steckt ${euro(ARCH_BY_ID.suite.cost)} in ein System, in das niemand hineinsehen kann, erst in Monat ${1 + monthsOf("suite")} im Einsatz, nach den ${R2_MONTHS} Monaten, und das Geld ist ausgegeben, bevor ein KPI zeigt, was wirkt.`),
      change: tt(`Choose “Integrate now, in stages, and watch one figure”: set the profile and retention dashboard, the usage data clean-up and the progress paths to Now (together ${firstMoves}), then add the referral invitations once the usage data is clean.`, `Wählen Sie „Jetzt integrieren, in Stufen, und eine Zahl beobachten“: Setzen Sie Profil und Retention-Dashboard, die Bereinigung der Nutzungsdaten und die Fortschrittspfade auf „Jetzt“ (zusammen ${firstMoves}), und fügen Sie dann die Empfehlungseinladungen hinzu, sobald die Nutzungsdaten sauber sind.`),
    };
  return {
    cat: 2,
    why: "Waiting keeps the measures side by side and tests nothing; the brief asks for an integration decision despite unclear success impact.",
    text: tt(`Waiting until the success of gamification is proven keeps the measures apart for the ${R2_MONTHS} months, while a shared profile and a rulebook could start within weeks.`, `Zu warten, bis der Erfolg von Gamification bewiesen ist, hält die Maßnahmen für die ${R2_MONTHS} Monate auseinander, obwohl ein gemeinsames Profil und ein Regelwerk in Wochen starten könnten.`),
    change: tt(`Choose “Integrate now, in stages, and watch one figure”: the first moves are the profile and retention dashboard, the usage data clean-up and the progress paths in month 1 (together ${firstMoves}). They join what exists instead of waiting for proof.`, `Wählen Sie „Jetzt integrieren, in Stufen, und eine Zahl beobachten“: Die ersten Schritte sind Profil und Retention-Dashboard, die Bereinigung der Nutzungsdaten und die Fortschrittspfade in Monat 1 (zusammen ${firstMoves}). Sie verbinden, was existiert, statt auf einen Beweis zu warten.`),
  };
}
