import { BUDGET, JOINS_LABEL, MEASURE_BY_ID, MODEL_COST, MODEL_MEASURES, PROBLEM_LABEL, explainBucket, modelScore } from "@/data/measures";
import type { MeasureId } from "@/data/measures";
import { KEY_L1, KEY_R2 } from "@/data/mentorKey";
import { ARCH_BY_ID, ARCH_IDS, COMP_BY_ID, KPI_BY_ID, MODEL_GREATEST, PRINCIPLES, R2_BUDGET, R2_MONTHS } from "@/data/route2";
import type { PrincipleId } from "@/data/route2";
import { KPI_AIM } from "@/data/route2Extra";
import { MODEL_TIER, PANEL, READY_BAR } from "@/data/route2Panel";
import type { Tier } from "@/data/route2Panel";
import { euro, tt } from "@/lib/lang";
import { inUseOf, monthsOf, planOf, rangeOf } from "@/lib/r2Panel";

/**
 * Mentor-only worked answers for every task question the answer keys (lib/answerKey.ts) do not already cover: the numeric fields,
 * with every step of the calculation written out with its numbers, and the free-text answers, with the model text and what a good
 * answer must contain. Shown only after the mentor bar is unlocked, never exported. Numbers are computed from the same constants as
 * the tables, the calculators and the answer checks, so they cannot drift from the model answers. Mentor tools stay English
 * (CLAUDE.md #32); the model answers quoted follow the site's language, because the fill enters them in that language.
 */
export type WorkedStep = { label: string; calc: string; result: string };
export type MentorGuide = { title: string; answer: string; example?: string; steps?: WorkedStep[]; why?: string; lookFor?: string[]; pitfalls?: string[] };

const n = (v: number) => (Math.round(v * 100) / 100).toLocaleString("en-US");
const L1 = () => KEY_L1();
const R2 = () => KEY_R2();

/* ------------------------------------------------------------------ Route 1 */

export function extraInsightGuide(): MentorGuide {
  return {
    title: "1.1 · A game idea of your own (Core)",
    answer: L1().extraInsight ?? "",
    example: tt(
      "Company A sells project software. A new customer sees an empty screen after signing up, so many leave before their first project. An idea of mine: a checklist “first project in ten minutes” with a bar that fills with each step (progress and status), so customers see how close they are to something they want. Write yours for EngageIT's platform: a moment, the mechanism, and what the customer gains.",
      "Unternehmen A verkauft Projektsoftware. Ein neuer Kunde sieht nach der Anmeldung einen leeren Bildschirm, also gehen viele vor ihrem ersten Projekt. Meine Idee: eine Checkliste „erstes Projekt in zehn Minuten“ mit einer Leiste, die sich mit jedem Schritt füllt (Fortschritt und Status), sodass Kunden sehen, wie nah sie an etwas sind, das sie wollen. Schreiben Sie Ihre für die Plattform von EngageIT: einen Moment, den Mechanismus und was der Kunde gewinnt.",
    ),
    why: "An idea names a moment on the platform, the mechanism it uses (reward, competition, progress and status) and what the customer gains. Ask the plan's risk question: would the customer do it without the prize?",
    lookFor: ["A concrete moment on the platform (a first login, a set-up step, an invitation).", "One of the three mechanisms, named or clearly used.", "What the customer gains (“so …”): a real result, not a prize for a click."],
    pitfalls: ["“Give points for everything”: ask what the customer would do without the points.", "A technology wish (“we need a gamification tool”): ask which moment it would change."],
  };
}

export function meaningGuide(): MentorGuide {
  return {
    title: "1.2 · What the set-up bar's finish rates mean (Optional)",
    answer: L1().meaning ?? "",
    lookFor: ["At least one printed figure (15%, 30%, twice as often, or the 108 and 72 finished set-ups).", "What to change first: show the bar to every new customer, then test it fairly.", "Said as an estimate: the customers who saw the bar may have been more engaged from the start."],
    pitfalls: ["A sentence with no figure: the app asks for one.", "“The bar doubles our finished set-ups”: the two groups may differ in other ways, so it is a hint, not proof."],
  };
}

export function insightGuide(i: number): MentorGuide {
  const a = (L1().insights ?? [])[i];
  return {
    title: `1.3 · Approach ${i + 1} (Optional)`,
    answer: a ? `${a.basis ?? ""} · ${a.text}` : "",
    why: "Three simple gamification approaches for three different mechanisms, each saying what the customer gains. The app checks only that each names a mechanism, is long enough and says what follows.",
    lookFor: ["A concrete game element at a named moment.", "The mechanism it serves (reward, competition, progress and status).", "What the customer gains (“so …”): a real result, so the element does not buy clicks."],
    pitfalls: ["A goal instead of an element (“more motivation”): ask what exactly the customer sees.", "Two approaches for the same mechanism."],
  };
}

export function reflectGuide(k: "interpret" | "causation" | "decider"): MentorGuide {
  const r = L1().reflect;
  return {
    title: k === "interpret" ? "1.4 · When gamification works and when it does not (Optional)" : k === "causation" ? "1.4 · Real motivation versus a short-term incentive (Optional)" : "1.4 · Integration first, priorities and over-complexity (Optional)",
    answer: r ? r[k] : "",
    lookFor:
      k === "interpret"
        ? ["It works where the customer already wants the result and the element only helps them get there.", "It does not work where the customer does not want the action: a prize then buys a click."]
        : k === "causation"
          ? ["Real motivation: the customer does it for the result. Short-term incentive: for the prize, and it stops when the prize stops.", "The guardrail that shows the difference (accounts that only collect points)."]
          : ["Integration first (profile, membership levels, referral scheme).", "A few game elements, measured, not five at once.", "Judged by a few KPIs, with a guardrail."],
  };
}

export function misreadGuide(): MentorGuide {
  return {
    title: "2.1 · Your three KPIs (Optional)",
    answer: L1().misread ?? "",
    example: tt("Company A steers its loyalty programme by three KPIs. Share of customers who renew, from billing, aim: up. It is the result the programme is paid for, so it is the outcome. Share of new customers who finish set-up in 30 days, from the usage data, aim: up. Customers do it before they renew, and onboarding can move it this month, so it is the driver. Accounts with many points but almost no use, from the profile, aim: stay under a limit. If it rises we stop the element that pays for it, so it is the guardrail. Choose yours from EngageIT's twelve metrics.", "Unternehmen A steuert sein Treueprogramm mit drei KPIs. Anteil der Kunden, die verlängern, aus der Abrechnung, Ziel: hoch. Es ist das Ergebnis, für das das Programm bezahlt wird, also der Outcome. Anteil der Neukunden, die die Einrichtung in 30 Tagen abschließen, aus den Nutzungsdaten, Ziel: hoch. Kunden tun es, bevor sie verlängern, und das Onboarding kann es diesen Monat bewegen, also der Treiber. Konten mit vielen Punkten, aber kaum Nutzung, aus dem Profil, Ziel: unter einer Grenze bleiben. Steigt es, stoppen wir das Element, das dafür bezahlt, also die Guardrail. Wählen Sie Ihre aus den zwölf Kennzahlen von EngageIT."),
    lookFor: ["At least one outcome KPI (renewals, revenue per customer, customers still active).", "At least one driver KPI (finished set-up, features used).", "For each: where the number comes from and a target; a guardrail (accounts that only collect points) as the third is a strong answer."],
    pitfalls: ["Points awarded, badges issued or leaderboard visits as a KPI: vanity metrics, they count what EngageIT hands out.", "A separate KPI per game element: the breaks between the measures stay invisible."],
  };
}

export function abGuide(): MentorGuide {
  const k = L1().ab;
  return {
    title: "2.3 · Hypothesis and decision rule (Optional)",
    answer: k ? `${k.hyp} · ${k.rule}` : "",
    example: tt("Company A tests a progress bar in its onboarding. Hypothesis: if every new customer sees a bar with the next step highlighted instead of an empty screen, then the share who finish set-up rises, because they always know what to do next. Rule, written before the start: roll out if the finish rate is at least 8% above the control group with 80 finished set-ups per group and complaints stay under 2%; keep testing between 3% and 8%; stop below 3%. Write yours for EngageIT's test card.", "Unternehmen A testet eine Fortschrittsleiste in seinem Onboarding. Hypothese: Wenn jeder Neukunde eine Leiste mit hervorgehobenem nächstem Schritt statt eines leeren Bildschirms sieht, dann steigt der Anteil, der die Einrichtung abschließt, weil er immer weiß, was als Nächstes zu tun ist. Regel, vor dem Start geschrieben: ausrollen, wenn die Abschlussquote bei 80 abgeschlossenen Einrichtungen pro Gruppe mindestens 8 % über der Kontrollgruppe liegt und die Beschwerden unter 2 % bleiben; weiter testen zwischen 3 % und 8 %; stoppen unter 3 %. Schreiben Sie Ihre für die Testkarte von EngageIT."),
    lookFor: ["Hypothesis: one change, the KPI expected to move, and a reason (“because …”).", "Decision rule written before the test: a threshold to roll out, a band to keep testing, a point to stop.", "A guardrail in the rule (accounts that only collect points, customers who switch off prompts)."],
    pitfalls: ["“The bar will help”: no KPI, no reason.", "A rule without numbers, or one decided after looking at the result."],
  };
}

export function scoreGuide(id: MeasureId): MentorGuide {
  const m = MEASURE_BY_ID[id];
  const e = explainBucket(m.evidence);
  return {
    title: `2.4 · ${m.name}`,
    answer: `${e} × ${m.model.effect} × ${m.model.feasibility} = ${modelScore(id)}`,
    steps: [
      { label: "Price from its parts (printed on the card)", calc: m.costParts.map((c) => n(c.amount)).join(" + "), result: euro(m.cost) },
      { label: "Integration from what it connects to (A7)", calc: `connects to ${JOINS_LABEL[m.joins]} → membership, referral and profile: 3 · one of them: 2 · nothing: 1`, result: String(e) },
      { label: "Score = Integration × Motivation × Sustainability", calc: `${e} × ${m.model.effect} × ${m.model.feasibility}`, result: String(modelScore(id)) },
    ],
    why: `${m.model.note} Answers: ${m.targets.length ? m.targets.map((t) => PROBLEM_LABEL[t]).join(", ") : "none of the three problems"}. A different, well-reasoned motivation or sustainability score is acceptable: only the score that follows a printed rule is checked.`,
    pitfalls:
      id === "chatbot"
        ? ["Integration 3 “because it uses all our data”: it is printed to connect to one of the three only (the usage data): 2.", "Motivation 3 “because the winners love it”: the many customers who cannot reach the top do not."]
        : id === "suite"
          ? ["Motivation 3 or sustainability 3 “because it has everything”: five game elements at once is the over-complexity the coaching focus warns about, and it is in use only after 32 weeks, beyond the five months; the picture shows no bar of working time.", `Adding it to the progress path and the referral pairs: ${euro(m.cost + MEASURE_BY_ID.unified.cost + MEASURE_BY_ID.predictive.cost)}, over the ${euro(BUDGET)} budget.`]
          : id === "app"
            ? ["Counting the login points as an answer to “low use”: customers log in for the points and open nothing else; the picture leaves every problem open.", "Integration 2 “because it has a points shop”: the shop connects to none of membership, referral or profile: 1."]
            : undefined,
  };
}

/** The reason a learner gives for a measure's two judged scores (CLAUDE.md #45). The mentor's answer is the measure's own model note. */
export function reasonGuide(id: MeasureId): MentorGuide {
  const m = MEASURE_BY_ID[id];
  return {
    title: `2.4 · Why ${m.name} gets its motivation and sustainability scores`,
    answer: `Motivation ${m.model.effect}, sustainability ${m.model.feasibility}: ${m.model.note}`,
    example: tt("Company A's “points for every login”: motivation 1, because customers log in for the discount and open nothing else, so they do it for the prize; sustainability 1, because it works only while the discount is paid. Give your own reason for each score, with a fact printed on the card.", "Die „Punkte für jeden Login“ von Unternehmen A: Motivation 1, weil Kunden sich für den Rabatt einloggen und sonst nichts öffnen, sie tun es also für den Preis; Nachhaltigkeit 1, weil es nur wirkt, solange der Rabatt gezahlt wird. Geben Sie für jeden Wert Ihren eigenen Grund an, mit einer auf der Karte gedruckten Tatsache."),
    why: "Motivation and sustainability are judgements; a different score with a clear reason is as good as the model. The reason should say whether customers do it for the result or for the prize (motivation) and whether it still works after the novelty, and what it costs to keep going (sustainability).",
    lookFor: ["Motivation: what the customer does or sees, and whether they would do it without the prize.", "Sustainability: whether it still works when the novelty is gone and what keeps it going (prizes, people, nothing).", "A fact from the card, not only “it is good”."],
  };
}

export function whyGuide(): MentorGuide {
  return {
    title: "2.4 · Why the first priority goes first (Core)",
    answer: L1().why ?? "",
    example: tt("Company A puts its onboarding path first: it scores 18 and it carries customers to something they want, with no prize. The service credit for finished milestones comes second and starts alongside it. Together they cost €60,000 of €100,000. The points for every login stay out: they pay for clicks and connect to nothing, so they score 1. Make the same three statements about your own measures.", "Unternehmen A setzt seinen Onboarding-Pfad an die erste Stelle: Er erzielt 18 und trägt Kunden zu etwas, das sie wollen, ohne Preis. Das Service-Guthaben für abgeschlossene Meilensteine kommt zweite und startet gleichzeitig. Zusammen kosten sie 60.000 € von 100.000 €. Die Punkte für jeden Login bleiben draußen: Sie bezahlen Klicks und sind mit nichts verbunden, also erzielen sie 1. Machen Sie dieselben drei Aussagen über Ihre eigenen Maßnahmen."),
    steps: [
      { label: "Model plan cost", calc: MODEL_MEASURES.map((id) => n(MEASURE_BY_ID[id].cost)).join(" + "), result: euro(MODEL_COST) },
      { label: "Left of the budget", calc: `${n(BUDGET)} − ${n(MODEL_COST)}`, result: euro(BUDGET - MODEL_COST) },
    ],
    lookFor: ["The order and what decides it (the score, or the problem of the brief it answers).", "The cost against €150,000.", "What was left out, said as a decision (rewards a click, stand-alone, too slow or too complex, or no problem answered)."],
  };
}

/* ------------------------------------------------------------------ Route 2 */

export function principleTextGuide(c: PrincipleId): MentorGuide {
  return {
    title: `3.1 · ${PRINCIPLES[c].name} (Optional)`,
    answer: (R2().principleText ?? {})[c] ?? PRINCIPLES[c].means,
    lookFor: ["What changes for EngageIT's teams or customers.", "Which problem of the brief it answers (low use, mediocre retention, measures not integrated) or which risk (wrong incentives)."],
    pitfalls: c === "hoard" || c === "blackbox" ? ["This principle is one the key rejects; if the learner kept it, ask what the next game element knows about the others, or what changes for customers before the platform runs everywhere."] : undefined,
  };
}

export function greatestGuide(): MentorGuide {
  return {
    title: "3.3 · The KPI with the greatest leverage (Optional)",
    answer: `${COMP_BY_ID[MODEL_GREATEST].name} · ${R2().greatestWhy ?? ""}`,
    example: tt("Company A picks “customers who use a second module in their first 60 days” as its greatest-leverage KPI: it is linked to renewals and counted daily for every customer by the systems, so every change can be judged within weeks, and it answers the problem that customers rarely use more than the basics. Name your own KPI, the tests it passes best and the problem of the brief it answers.", "Unternehmen A wählt „Kunden, die in den ersten 60 Tagen ein zweites Modul nutzen“ als KPI mit der größten Hebelwirkung: Er ist mit Verlängerungen verbunden und wird täglich für jeden Kunden von den Systemen gezählt, sodass sich jede Änderung innerhalb von Wochen beurteilen lässt, und er beantwortet das Problem, dass Kunden selten mehr als die Grundlagen nutzen. Nennen Sie Ihren eigenen KPI, die Tests, die er am besten besteht, und das Problem des Auftrags, das er beantwortet."),
    lookFor: ["One of the learner's three KPIs.", "The tests that decide it (early and linked to value together).", "The problem of the brief it answers (low use)."],
    pitfalls: ["Points awarded as greatest “because it is counted daily and complete”: it is not linked to value."],
  };
}

const ids = (m: Record<string, Tier>, f: (t: Tier) => boolean) => ARCH_IDS.filter((id) => f(m[id] ?? "not"));

export function architectureGuide(): MentorGuide {
  const model = MODEL_TIER;
  const funded = ids(model, (t) => t !== "not");
  const mr2 = { tier: model };
  const plan = planOf(mr2, 0);
  const weak = planOf(mr2, 1);
  const r = rangeOf(mr2);
  const cost = funded.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const meas = (p: typeof plan) => funded.filter((id) => PANEL[id].measured && p.items[id].measOk && p.items[id].dataOk && !p.items[id].late && !PANEL[id].blackBox);
  const sum = (list: (keyof typeof ARCH_BY_ID)[]) => list.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const measuredIds = meas(plan);
  const measuredWeakIds = meas(weak);
  const riskWeak = funded.filter((id) => PANEL[id].blackBox || !weak.items[id].dataOk || weak.items[id].late);
  const plus = (list: string[]) => list.join(" + ");
  const sp = planOf({ tier: { ...model, suite: "now" as const } }, 0);
  const rl = planOf({ tier: { ...model, relaunch: "now" as const } }, 0);
  const pn = planOf({ tier: { ...model, routing: "now" as const } }, 0);
  return {
    title: "Step A · The architecture and what the panel shows for it (Core)",
    answer: `Now: ${ids(model, (t) => t === "now").map((id) => PANEL[id].short).join(", ")}. After data is ready: ${ids(model, (t) => t === "later").map((id) => PANEL[id].short).join(", ")}. Not now: ${ids(model, (t) => t === "not").map((id) => PANEL[id].short).join(", ")}.`,
    steps: [
      { label: "Funded items (every Now and After data item)", calc: plus(funded.map((id) => n(ARCH_BY_ID[id].cost))), result: euro(cost) },
      { label: "Budget left", calc: `${n(R2_BUDGET)} − ${n(cost)}`, result: euro(R2_BUDGET - cost) },
      { label: `Month in use = start + weeks ÷ 4, rounded up (Now starts in month 1; After data starts when the usage data clean-up is in use, month ${1 + monthsOf("chat")})`, calc: funded.map((id) => `${PANEL[id].short}: ${plan.items[id].start} + ${ARCH_BY_ID[id].weeks} ÷ 4 → ${inUseOf(mr2, id)}`).join(" · "), result: `all by month ${Math.max(...funded.map((id) => inUseOf(mr2, id)!))} of ${R2_MONTHS}` },
      { label: "Measurable, brief's data: money on measured items with data connected and in use in time ÷ funded money", calc: `(${plus(measuredIds.map((id) => n(ARCH_BY_ID[id].cost)))}) ÷ ${n(cost)} = ${n(sum(measuredIds))} ÷ ${n(cost)}`, result: `${r.meas[0]}%` },
      { label: `Measurable, data 15 points weaker (the progress paths drop to ${(PANEL.personal.data ?? 0) - 15}%)`, calc: `${n(sum(measuredWeakIds))} ÷ ${n(cost)}`, result: `${r.meas[1]}%` },
      { label: "Risk: money on a black box, on data below 80% connected or in use after the months ÷ funded money", calc: `0 ÷ ${n(cost)} (brief) · ${n(sum(riskWeak))} ÷ ${n(cost)} (weaker)`, result: `${r.risk[0]}% · ${r.risk[1]}%` },
    ],
    why: `The model set holds all four tests with the brief's data (${plan.holding} of ${plan.applicable}) and opens the data test when the data is 15 points weaker (${weak.holding} of ${weak.applicable}). That open test is the reason Step B asks what the learner watches. The numbers on screen are computed from one data file, so this table equals the panel.`,
    lookFor: ["At least one item Now (the task asks for an architecture).", "The shared profile and dashboard are in place no later than any game element.", "Nothing the learner cannot explain or measure is funded without a reason, and nothing arrives after the five months without one."],
    pitfalls: [
      `Adding the all-in-one game platform: ${euro(sp.bars.spent)} funded, ${euro(sp.bars.over)} over the budget, Risk ${sp.bars.risk}% (a black box, in use only in month ${sp.items.suite.inUse}), and ${sp.holding} of ${sp.applicable} tests hold.`,
      `Adding the points per login and the public leaderboard: ${euro(rl.bars.spent)} funded, ${euro(rl.bars.over)} over the budget; it names no customer KPI and is not connected to the membership tool, so ${rl.holding} of ${rl.applicable} tests hold.`,
      `Setting the referral invitations to Now beside the model set: they start in month 1 on data ${PANEL.routing.data}% connected, below ${READY_BAR}%, so the data test opens (${pn.holding} of ${pn.applicable} hold); After data with the usage data clean-up Now starts them in month ${1 + monthsOf("chat")}.`,
      "Leaving the shared profile out: every game element loses its link to the profile and the KPIs, so the Measurable bar falls to nothing.",
    ],
  };
}

export function visionGuide(): MentorGuide {
  return {
    title: "Step A · The target vision (Core)",
    answer: R2().vision ?? "",
    example: tt(
      "Company A will give every customer a reason to keep using its platform that comes from the platform itself: one profile joins its loyalty tools, every game element rewards a real action, and it steers by two KPIs. Every new game element has to move one of them before it grows. Write your own target vision for EngageIT.",
      "Unternehmen A wird jedem Kunden einen Grund geben, seine Plattform weiter zu nutzen, der aus der Plattform selbst kommt: Ein Profil verbindet seine Treuewerkzeuge, jedes Spielelement belohnt eine echte Handlung, und es steuert über zwei KPIs. Jedes neue Spielelement muss einen davon bewegen, bevor es wächst. Schreiben Sie Ihr eigenes Zielbild für EngageIT.",
    ),
    why: "The plan asks for a target vision of an integrated retention architecture. It is the one place the learner says, in two sentences, what the whole architecture is for, before the items.",
    lookFor: ["What the system does for the company and its customers (one profile, a real action rewarded).", "Steering by a few KPIs, not by single game elements.", "Two sentences, in the learner's own words."],
  };
}

export function giveUpGuide(): MentorGuide {
  return {
    title: "Step A · What the plan gives, and what the learner gives up (Core)",
    answer: R2().giveUp ?? "",
    example: tt(
      "Company A's plan gives it one shared profile, a rulebook that says which actions earn a reward and progress paths that run on data that is connected well enough. It gives up a public leaderboard, which names no KPI, and €30,000 stay unspent. If customers react more weakly, the paths rest on data below 80%, so they are watched first. Write yours about your own plan: what it gives, what it costs or leaves open.",
      "Der Plan von Unternehmen A gibt ihm ein gemeinsames Profil, ein Regelwerk, das sagt, welche Handlungen eine Belohnung bringen, und Fortschrittspfade, die auf gut genug verbundenen Daten laufen. Es verzichtet auf eine öffentliche Rangliste, die keinen KPI nennt, und 30.000 € bleiben ungenutzt. Reagieren Kunden schwächer, beruhen die Pfade auf Daten unter 80 %, also werden sie zuerst beobachtet. Schreiben Sie Ihre über Ihren eigenen Plan: was er gibt, was er kostet oder offen lässt.",
    ),
    why: "Every plan gives something and costs something. Writing it first, before the system's reading is opened, is what makes the learner think about the trade-off instead of reading it off.",
    lookFor: ["One thing the plan gives (measured, connected, in budget, in time).", "One thing it costs or leaves open (an item not now, data below 80%, an item after the five months, budget unspent).", "A link to the two data scenarios if the learner saw them."],
  };
}

export function decisionWhyGuide(): MentorGuide {
  return {
    title: "Step B · Why this decision (Core)",
    answer: R2().decisionWhy ?? "",
    example: tt(
      "Company A integrates now but builds in stages: the shared profile and the rulebook start first, so every game element reads one customer and rewards a real action from its first week, and the big platform waits because nobody could say why a customer got a reward. Write your reason for your own decision.",
      "Unternehmen A integriert jetzt, baut aber in Stufen: Gemeinsames Profil und Regelwerk starten zuerst, damit jedes Spielelement einen Kunden liest und ab seiner ersten Woche eine echte Handlung belohnt, und die große Plattform wartet, weil niemand sagen könnte, warum ein Kunde eine Belohnung bekam. Schreiben Sie Ihre Begründung für Ihre eigene Entscheidung.",
    ),
    why: "A decision part has no single right answer (CLAUDE.md #38): what counts is a clear reason, and that it fits the learner's own Step A. If the decision and Step A disagree, the panel hints and the reason should explain it.",
    lookFor: ["Names the decision and one rule from Materi B5 it rests on.", "Fits the learner's own Step A, or says why it does not.", "Says how the unclear success impact is handled (integrate first, start where the customer wants the result, measure from week one)."],
  };
}

export function watchGuide(): MentorGuide {
  const cleanMonth = inUseOf({ tier: MODEL_TIER }, "personal") ?? 0;
  const conv = KPI_BY_ID.conv;
  const eng = KPI_BY_ID.engage;
  return {
    title: "Step B · What the learner watches, and when they would stop (Core)",
    answer: R2().watch ?? "",
    example: tt(
      "Company A watches the share of customers who finish set-up in 30 days: today it is 25%, and if it is not clearly above that by month 4 on enough new customers, it stops adding game elements and rewrites its onboarding path. It also watches the accounts that only collect points: if they rise above 10%, it pauses the element that pays for them. Write yours with the figure from your own plan.",
      "Unternehmen A beobachtet den Anteil der Kunden, die die Einrichtung in 30 Tagen abschließen: Heute liegt er bei 25 %, und liegt er bis Monat 4 bei genug Neukunden nicht deutlich darüber, hört es auf, Spielelemente hinzuzufügen, und schreibt seinen Onboarding-Pfad neu. Es beobachtet auch die Konten, die nur Punkte sammeln: Steigen sie über 10 %, pausiert es das Element, das dafür bezahlt. Schreiben Sie Ihre mit der Zahl aus Ihrem eigenen Plan.",
    ),
    why: `A figure about customers (the share who finish set-up or the accounts that only collect points), not the company's own output (points awarded, badges, leaderboard visits), a month in which it can first be read (the progress paths are in use from month ${cleanMonth} in the model, so month ${cleanMonth + 1}), and an action. The numbers are the ones printed in “the numbers today”: ${conv.baseline}% finish set-up today with an aim of ${KPI_AIM.conv}%; ${eng.baseline}% of accounts only collect points today with an aim of ${KPI_AIM.engage}%; the data bar is ${READY_BAR}%.`,
    lookFor: ["A customer figure, with today's value.", "A month by which it can be read.", "What the learner does if it falls short (stop, pause, change one thing)."],
    pitfalls: ["Points awarded, badges or leaderboard visits as the figure: that counts what EngageIT hands out.", "No month: a sign nobody can act on."],
  };
}
