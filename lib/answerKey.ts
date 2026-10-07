import { LEVEL_LABEL, LINES } from "@/data/ladder";
import { CHURN_TRUTH, CUSTOMERS, CUST_BY_ID, KNOWN_LABEL, PICK_WHY, VALUABLE_TRUTH } from "@/data/forecast";
import { AB, AB_PARTS, MEANINGS, MEANING_TRUTH, MEASURE_TRUTH, PATTERNS, PATTERN_IDS, PMEASURES, RECORDS, RISK_LABEL, TRUTH_COUNTS, TRUTH_LEFT, UNCERTAINTIES, riskOf } from "@/data/patterns";
import { BUDGET, JOINS_LABEL, MEASURES, MEASURE_BY_ID, MODEL_COST, MODEL_MEASURES, PROBLEM_LABEL, explainBucket, modelScore } from "@/data/measures";
import {
  ACTION_LABEL,
  ARCH_BY_ID,
  ARCH_IDS,
  COMPS,
  COMP_BY_ID,
  CRIT_IDS,
  DECISIONS,
  LOGIC_OWNER_LABEL,
  MODEL_COMPS,
  MODEL_DECISION,
  MODEL_GREATEST,
  OWNER_ACCEPT_LOGIC,
  PRINCIPLES,
  PRINCIPLE_IDS,
  PRINCIPLE_MUST,
  R2_BUDGET,
  SITUATIONS,
  SOURCES,
  USE_LABEL,
  actionOf,
  maxRating,
  useOf,
} from "@/data/route2";
import type { ArchId } from "@/data/route2";
import { MODEL_ARCH, MODEL_TIER, PANEL, TIER_LABEL } from "@/data/route2Panel";
import { planOf, rangeOf } from "@/lib/r2Panel";
import { MODEL_ORDER } from "@/data/mentorKey";
import { euro } from "@/lib/lang";

/**
 * Mentor-only answer keys for the exercises where the learner picks from fixed options. Each key gives the expected answer and a
 * reason per option, including why each rejected option is rejected, plus a teaching note wherever more than one answer defends.
 * Never exported and never shown to a learner. Mentor tools stay in English (CLAUDE.md #32); the option labels they quote follow the
 * site's language.
 */
export type AnswerKeyOption = { label: string; expected: boolean; why: string };
export type AnswerKeyBlock = { title: string; expected: string; options: AnswerKeyOption[]; teachingNote?: string };

const B = ["—", "Low", "Mid", "High"];

/* ------------------------------------------------------------------ Route 1 */

export function sortKey(): AnswerKeyBlock {
  return {
    title: "Block 1.1 · Reward, competition, or progress and status (Core, Level 1)",
    expected: LINES.map((r, i) => `${i + 1} → ${LEVEL_LABEL[r.truth]}`).join(" · "),
    options: LINES.flatMap((r, i) => [
      { label: `Idea ${i + 1} → ${LEVEL_LABEL[r.truth]}`, expected: true, why: r.why },
      ...(Object.entries(r.rejected) as [keyof typeof LEVEL_LABEL, string][]).map(([tag, why]) => ({ label: `Idea ${i + 1} → ${LEVEL_LABEL[tag]}`, expected: false, why })),
    ]),
    teachingNote:
      "Three of each. The traps are idea 9 (levels that unlock benefits: the idea is the picture of levels, so progress and status, not a reward), idea 8 (a title that stays yours is status, not a rank) and idea 5 (a comparison with an average has no prize, so it is competition, a soft one). Ask “what does the customer hold afterwards?” (reward), then “does their place depend on others?” (competition), then “do they see their own path?” (progress and status). Ask every learner the second question of Materi A1: would the customer do it without the prize? That is the plan's risk of artificial motivation.",
  };
}

export function pickKey(): AnswerKeyBlock {
  return {
    title: "Block 1.3a/b · Where a game element helps most, where it can plug in (Optional)",
    expected: `Helps most: ${VALUABLE_TRUTH.map((c) => CUST_BY_ID[c].name).join(", ")} · Can plug into what exists: ${CHURN_TRUTH.map((c) => CUST_BY_ID[c].name).join(", ")}`,
    options: CUSTOMERS.map((c) => ({
      label: `${c.name} · ${c.volume}/month · ${c.leave}% stop · customer wants the result: ${c.decision ? "yes" : "no"} · connected: ${KNOWN_LABEL[c.known]}`,
      expected: VALUABLE_TRUTH.includes(c.id) || CHURN_TRUTH.includes(c.id),
      why: `${VALUABLE_TRUTH.includes(c.id) ? "Helps most. " : CHURN_TRUTH.includes(c.id) ? "Can plug in. " : "Neither list. "}${PICK_WHY[c.id]}`,
    })),
    teachingNote: "The traps are the newsletter and the rating request (many stop, but the customer does not want the result, so a prize buys clicks) and the support tip (the profile reaches it, but only 12% stop). The feature page to helpdesk tempts too: 22% stop and nothing is connected, but nobody wants to open the helpdesk. The check reports only how many of the four picks hold.",
  };
}

export function tagKey(): AnswerKeyBlock {
  return {
    title: "Block 2.1 · Kind of metric (Optional)",
    expected: RECORDS.map((o) => `${o.code} → ${PATTERNS[o.truth].label}`).join(" · "),
    options: RECORDS.flatMap((o) => [
      { label: `${o.code} → ${PATTERNS[o.truth].label}`, expected: true, why: o.why },
      ...(Object.entries(o.rejected) as [keyof typeof PATTERNS, string][]).map(([s, why]) => ({ label: `${o.code} → ${PATTERNS[s].label}`, expected: false, why })),
    ]),
    teachingNote: `${PATTERN_IDS.map((p) => `${TRUTH_COUNTS[p]} ${PATTERNS[p].label} (${TRUTH_LEFT[p]} moved with value)`).join(", ")}. M-06 (customers who invite a colleague) is the trap: it did not move with value last year, but it is still a driver; tag what a metric measures, not how it behaved. M-07 (accounts that only collect points) is a guardrail even though it moved with value: nobody sets a target to raise it. M-10 (points awarded) is vanity: points can rise because the rules are easy.`,
  };
}

export function rowKey(): AnswerKeyBlock {
  return {
    title: "Block 2.2 · Link, meaning and use per kind (Optional)",
    expected: PATTERN_IDS.map((p) => `${PATTERNS[p].label}: ${RISK_LABEL[riskOf(TRUTH_LEFT[p], TRUTH_COUNTS[p])!]} · ${MEANINGS.find((m) => m.id === MEANING_TRUTH[p])!.label} · ${PMEASURES.find((m) => m.id === MEASURE_TRUTH[p])!.label}`).join(" | "),
    options: PATTERN_IDS.flatMap((p) =>
      PMEASURES.map((m) => ({
        label: `${PATTERNS[p].label} → ${m.label}`,
        expected: m.id === MEASURE_TRUTH[p],
        why:
          m.id === MEASURE_TRUTH[p]
            ? `${PATTERNS[p].means} This use fits exactly that.`
            : m.id === "bonus"
              ? "A bonus on a number rewards reporting it, not moving it, and invites gaming; it fits no kind."
              : "This use fits a different kind; read what this kind tells management.",
      })),
    ),
    teachingNote: "The link is checked against the learner's own tally from 2.1, not against the reference, so a learner who mis-tagged one metric is not punished twice. With the reference tags, outcome and driver are Strong (3 and 2 of 3 moved), guardrail Partial (1 of 3), vanity None.",
  };
}

export function uncKey(): AnswerKeyBlock {
  return {
    title: "Block 2.2 · Uncertainties in the set-up figures (Optional)",
    expected: UNCERTAINTIES.filter((w) => w.real).map((w) => w.label).join(" · "),
    options: UNCERTAINTIES.map((w) => ({ label: w.label, expected: w.real, why: w.why })),
    teachingNote: "Any two of the four real uncertainties complete the block. The most important is “the customers who saw the bar may have been more engaged to begin with”: the set-up figures are not a fair test, which is why Block 2.3 asks for one. The three false ones are common beliefs about gamification; each is contradicted in the material.",
  };
}

export function abKey(): AnswerKeyBlock {
  return {
    title: "Block 2.3 · A fair A/B test (Optional)",
    expected: AB_PARTS.map((k) => `${AB[k].label}: ${AB[k].options.find((o) => o.right)!.label}`).join(" | "),
    options: AB_PARTS.flatMap((k) =>
      AB[k].options.map((o) => ({
        label: `${AB[k].label} → ${o.label}`,
        expected: o.right,
        why: o.right
          ? k === "change"
            ? "One change only, so a difference can be put down to it."
            : k === "control"
              ? "Chance decides who is in which group, and both groups live through the same weeks."
              : k === "kpi"
                ? "The problem is customers who never get going; the test is judged by the share who finish set-up, not by views of the bar or points awarded."
                : "The size is fixed before the start, so nobody stops at a lucky moment; a full onboarding cycle includes customers who need longer to finish."
          : o.clue,
      })),
    ),
    teachingNote: "The check flags a wrong option per part (three options each, so naming the part does not hand over the answer), a hypothesis without “if … because …” and a rule without a number. The hypothesis and the rule are judged: look for one change, one KPI, a reason, and a rule written before the test that includes a guardrail.",
  };
}

export function measureKey(): AnswerKeyBlock {
  const rows = [...MEASURES].sort((a, b) => modelScore(b.id) - modelScore(a.id));
  const m = MEASURE_BY_ID;
  return {
    title: "Block 2.4 · The three measures (Core, Level 2)",
    expected: `${MODEL_MEASURES.map((id) => MEASURES.find((x) => x.id === id)!.name).join(", ")} · ${euro(MODEL_COST)} of ${euro(BUDGET)}`,
    options: rows.map((x) => ({
      label: `${x.name} · ${explainBucket(x.evidence)} × ${x.model.effect} × ${x.model.feasibility} = ${modelScore(x.id)} · ${euro(x.cost)} · ${x.weeks} weeks · connects to ${JOINS_LABEL[x.joins]} · answers ${x.targets.length ? x.targets.map((t) => PROBLEM_LABEL[t]).join(", ") : "none"}`,
      expected: MODEL_MEASURES.includes(x.id),
      why: `${x.verdict} ${x.model.note}`,
    })),
    teachingNote: `Score = Integration × Motivation × Sustainability (the plan's evaluation). The check looks only at integration, which follows from the printed “connects to”. Which problems a choice answers, and when it starts working, is shown by the picture under the cards, not by a verdict. Motivation and sustainability are judged; the model values are here. The model three cost ${euro(MODEL_COST)} (${euro(BUDGET - MODEL_COST)} left). The leaderboard scores 4: ${euro(m.chatbot.cost)} for a game element that only the few at the top care about and that fades when the prize stops. The points for every login score 1: ${euro(m.app.cost)} pay for clicks and connect to nothing (wrong incentives). The game platform scores 6: connected on paper, but at ${euro(m.suite.cost)} it costs more than the whole budget, and at thirty-two weeks it is in use only after the five months (the picture shows no bar of working time); with the progress path and the referral pairs it would be ${euro(m.suite.cost + m.unified.cost + m.predictive.cost - BUDGET)} over the budget. A different, well-reasoned choice is acceptable (CLAUDE.md #38).`,
  };
}

export function orderKey(): AnswerKeyBlock {
  return {
    title: "Block 2.4 · The order (Core, Level 2)",
    expected: MODEL_ORDER.map((id) => MEASURES.find((x) => x.id === id)!.name).join(" → "),
    options: MODEL_ORDER.map((id, i) => ({
      label: `${i + 1}. ${MEASURES.find((x) => x.id === id)!.name} (${modelScore(id)})`,
      expected: true,
      why: i === 0 ? "Highest score (27): real motivation, connected to membership, referral and profile, and it needs no prize to keep going." : i === 1 ? "Score 18: it pays only for customers who stay and joins all three systems, so it keeps working without new prizes." : "Score 12: the quickest to start (six weeks), but it costs consultant hours as more customers qualify.",
    })),
    teachingNote: "A learner who puts the service rewards first defends it too: they start fastest and the customer gets real help; then the path starts in parallel. The model orders by score because the path answers two of the three problems of the brief and needs nothing paid out. Ask any learner who ranks the leaderboard or the login points: would customers do it without the prize?",
  };
}

/* ------------------------------------------------------------------ Route 2 */

export function principleKey(): AnswerKeyBlock {
  return {
    title: "Block 3.1 · Principles of the integrated retention system (Optional)",
    expected: `${PRINCIPLES[PRINCIPLE_MUST[0]].name} and ${PRINCIPLES[PRINCIPLE_MUST[1]].name}, plus a third that is not “add as many game elements as possible” or “hand every reward to one automatic platform first”`,
    options: PRINCIPLE_IDS.map((c) => ({
      label: PRINCIPLES[c].name,
      expected: PRINCIPLE_MUST.includes(c) || c === "owners" || c === "review",
      why:
        c === "defs"
          ? "Required: without one shared profile, every game element meets the customer as a stranger; this is “measures not integrated”."
          : c === "rules"
            ? "Required: one rulebook that says which actions earn a reward is the answer to the risk of wrong incentives."
            : c === "owners"
              ? "A good third: a KPI without someone who can move it stays a number on a screen."
              : c === "review"
                ? "A good third: one monthly review by the same KPIs for every game element is how EngageIT improves step by step."
                : c === "hoard"
                  ? "Rejected: more game elements without integration is over-complexity and pays for clicks; each new element adds a place where motivation can turn artificial (Materi A2)."
                  : "Rejected: nothing changes for customers until the platform runs everywhere, which takes longer than the five months, and nobody can explain its rewards.",
    })),
    teachingNote: "The check only asks for the shared profile and the rulebook. The third is judged; KPI owners and the monthly review both defend.",
  };
}

export function sourceKey(): AnswerKeyBlock {
  return {
    title: "Block 3.2 · Central motivation moments (Optional)",
    expected: SOURCES.map((s) => `${s.name}: ${USE_LABEL[useOf(s)]}`).join(" · "),
    options: SOURCES.map((s) => ({
      label: `${s.name} → ${USE_LABEL[useOf(s)]}`,
      expected: true,
      why: !s.decision ? `The customer wants nothing to get done in it, so a game element would only buy clicks: not central, however well connected (${s.complete}%).` : s.complete >= 80 ? `The customer wants something done in it (“${s.decision}”) and ${s.complete}% of its data reaches the profile: integrate now.` : `The customer wants something done in it (“${s.decision}”), but only ${s.complete}% of its data reaches the profile: connect the data first.`,
    })),
    teachingNote: "The newsletter is the trap: 95% connected, but nobody wants to get anything done in it. The renewal talk is the other: renew and recommend, or cancel, so it is central, once its data reaches the profile.",
  };
}

export function compKey(): AnswerKeyBlock {
  return {
    title: "Block 3.3 · KPIs and ratings (Optional)",
    expected: `${MODEL_COMPS.map((id) => COMP_BY_ID[id].name).join(", ")}; greatest leverage: ${COMP_BY_ID[MODEL_GREATEST].name}`,
    options: COMPS.map((l) => ({
      label: `${l.name}: ${CRIT_IDS.map((c) => `${c} ${B[l.model[c]]} (max ${B[maxRating(l.id, c)]})`).join(", ")}`,
      expected: MODEL_COMPS.includes(l.id),
      why: l.note,
    })),
    teachingNote: "The check flags only a rating above what the printed facts allow and counts how many chosen KPIs show a change early. The share of new customers who finish set-up is the model's greatest lever: High on all four and the problem the brief names. A learner who picks features used per customer defends it as the wider driver; ask which number a team can move this month.",
  };
}

export function logicKey(): AnswerKeyBlock {
  return {
    title: "Block 3.4 · Game elements tested: roll out, keep testing or stop (Optional)",
    expected: SITUATIONS.map((s) => `${s.signal}: ${ACTION_LABEL[actionOf(s)]} · ${OWNER_ACCEPT_LOGIC[s.id].map((o) => LOGIC_OWNER_LABEL[o]).join(" or ")}`).join(" | "),
    options: SITUATIONS.map((s) => ({
      label: `${s.signal} (uplift ${s.lift}%, ${s.cases} conversions)`,
      expected: true,
      why:
        actionOf(s) === "intervene"
          ? `Uplift ${s.lift}% on ${s.cases} conversions: clear and proven, guardrail intact. ${s.id === "winback" ? "Customer success delivers the credit, so customer success rolls it out." : "The bar lives in the product, so the product team rolls it out."}`
          : actionOf(s) === "watch"
            ? s.lift >= 10
              ? `Uplift ${s.lift}% looks strong, but ${s.cases} conversions are too few: keep testing; the data team runs it on.`
              : `Uplift ${s.lift}%: a small difference, and the guardrail moved. Keep testing a stronger variant; the data team runs it.`
            : `Uplift ${s.lift}%: no real gain${s.lift < 0 ? ", and complaints" : ""}. Stop, so no owner.`,
    })),
    teachingNote: "The referral credit is the trap: +25% tempts learners to roll out, but forty conversions can be chance. The cartoon mascot is the second: six hundred conversions prove there is almost no difference, so a large sample does not rescue a tiny uplift. The leaderboard is stopped: worse, and customers switched the prompts off.",
  };
}

export function architectureKey(): AnswerKeyBlock {
  const spent = MODEL_ARCH.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const alt = { ...MODEL_TIER, routing: "now" as const };
  const why: Record<ArchId, string> = {
    foundation: "Now. Every game element reads it and is measured by it; it starts in month 1, no later than the first game element (the test “integration comes first”). At 10 weeks it is in use in month 4.",
    chat: "Now. €15,000 for 4 weeks: one set of event names across the platform, the membership tool and the referral scheme. It names no KPI by itself, but it puts the use into the profile the referral invitations read, so it is the item “After data is ready” waits for.",
    personal: "Now. The progress paths read usage data that is 82% connected (67% if the data is weaker: it then rests on data below 80%, which is why Step B asks what the learner watches). Not now is defensible too, if the learner prefers to wait for the weaker-data case.",
    routing: "After data is ready. Its data is only 60% connected; with the usage data clean-up Now it starts in month 2 and is in use in month 5, inside the five months. Now is possible too, but it starts in month 1 on data below 80% and the data test opens.",
    training: "Now. €12,000 for 3 weeks so that customer success and product read the dashboard and run the monthly review. A defensible cut if the learner needs the room, and then the reading says so.",
    tracking: "Now. €18,000 for 4 weeks: one rulebook says which actions earn a reward, and a monthly check lists accounts that only collect points (the guardrail). A defensible cut, and then the reading names the cost: nothing watches for wrong incentives.",
    suite: `Not now. A black box: no KPI it moves, its rewards and results are not shown, ${euro(ARCH_BY_ID.suite.cost)} takes the plan ${euro(ARCH_BY_ID.suite.cost + spent - R2_BUDGET)} over the budget, and at 32 weeks it is in use only in month 9, after the five months. Two tests open (purpose, budget and months).`,
    relaunch: `Not now. Points for every login with a public leaderboard names no customer KPI (it counts logins) and is not connected to the membership tool; it would push the plan ${euro(ARCH_BY_ID.relaunch.cost + spent - R2_BUDGET)} over the budget. It is the wrong-incentive trap of Route 1.`,
  };
  return {
    title: "Step A · The architecture: when does each item happen? (Core, Level 3)",
    expected: `Model: Now ${MODEL_ARCH.filter((id) => MODEL_TIER[id] === "now").map((id) => PANEL[id].short).join(", ")} · After data ${MODEL_ARCH.filter((id) => MODEL_TIER[id] === "later").map((id) => PANEL[id].short).join(", ")} (${euro(spent)} of ${euro(R2_BUDGET)}) · Not now ${ARCH_IDS.filter((id) => MODEL_TIER[id] === "not").map((id) => PANEL[id].short).join(", ")}`,
    options: ARCH_IDS.map((id) => ({ label: `${PANEL[id].short} → ${TIER_LABEL[MODEL_TIER[id]]}`, expected: MODEL_TIER[id] !== "not", why: why[id] })),
    teachingNote: `The panel shows four tests as facts, none a verdict, and the learner decides. A different, well-reasoned set is acceptable (CLAUDE.md #38): for example the referral invitations Now (the data test opens, ${planOf({ tier: alt }, 0).holding} of ${planOf({ tier: alt }, 0).applicable} tests hold), the training or the rulebook cut to make room, or going over the budget with a reason. Doing nothing (no item Now) is incomplete, not wrong: the missing list asks for at least one. The model set holds all four tests in the brief's data and opens the data test when the data is 15 points weaker (the progress paths, ${rangeOf({ tier: MODEL_TIER }).risk[1]}% of the money at risk).`,
  };
}

export function decisionKey(): AnswerKeyBlock {
  return {
    title: "Step B · The integration decision (Core, Level 3)",
    expected: DECISIONS.find((d) => d.id === MODEL_DECISION)!.label,
    options: DECISIONS.map((d) => ({ label: d.label, expected: d.id !== "wait", why: d.id === MODEL_DECISION ? d.why : d.id === "commit" ? `${d.why} ${d.rejected}` : d.rejected })),
    teachingNote: "“Buy the platform” and “Integrate in stages” are both decisions, with different reasoning; the plan rejects only “Wait”, because the brief asks for an integration decision despite unclear success impact: a shared profile and a rulebook can start within weeks, and the measures keep working side by side meanwhile. All three stay selectable. The panel shows one plain hint when the decision and Step A disagree (wait while Step A builds; buy the platform while Step A leaves it out) and the learner explains the contradiction in their reason. Push a learner who buys the platform on how a 32-week platform fits into five months, and on who at EngageIT could explain why a customer got a reward.",
  };
}
