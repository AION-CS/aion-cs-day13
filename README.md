# Retention Lab · Day 13

**Customer Retention & Buying Behaviour in B2B IT Sales · Module 7, Day 2 of 2.**
*Motivation through gamification: rewards, competition, progress and status, and how they plug into the customer system.*
A self-study companion: study material with live instruments, two tasks and two working documents, in **English and German**
(EN | DE in the top bar, `../CLAUDE.md` #32). It carries the shared standards `../CLAUDE.md` #1 to #47 and the two-route form of #30.
From Day 13 it follows **#48: one Core block and one Core card per level** (see the deviations).

The case company is **EngageIT Systems GmbH**: customers get a platform but stop using it after set-up; points for every login were tried and
changed nothing. Budget €150,000 and five months (Route 1), €220,000 and five months (Route 2, Case assumption). Route 2 puts the learner in the
Chief Customer Officer's chair: design an integrated retention system with game elements and decide despite unclear success prospects.

This repo was bootstrapped from `day10` (chrome, primitives, store pattern, tokens, language machinery, the generic diagram components in
`components/materi/diagrams.tsx`) and its content replaced. Several data identifiers keep earlier names (e.g. `CUSTOMERS` holds the eight
motivation moments, `PILOT` the set-up bar test, the Route 2 item ids `chat/personal/routing/tracking/relaunch`); each file's header says what they hold now.

## Routes

| Route | Content | Export |
|---|---|---|
| `/route-1/` **Levels 1 + 2** | **Materi A**: seven cards, 60 min (A1 reward, competition, progress and the real-motivation test **Core**, A2 what stays when the prize stops, A3 where game elements help, A4 what a set-up bar is worth, A5 KPIs for game elements, A6 a fair test, A7 weighing measures: integration × motivation × sustainability **Core**). **Task 1, Gamification Analysis**: 1.1 **Core** (sort nine game ideas by mechanism and propose one of your own), 1.2 to 1.4 Optional, 2.1 to 2.3 Optional, 2.4 **Core** (choose three of six measures, score, reason, order). | `1-{name}-day13-l1l2-gamification-file.html` |
| `/route-2/` **Level 3** | **Materi B**: five cards, 60 min (B5 how a retention architecture is built **Core**). **Task 2, Retention System Memo**: the live panel, **Step A** (build the architecture, eight items Now / After data is ready / Not now) and **Step B** (decide despite unclear prospects) are one Core frame; Optional “Go deeper” 3.1 to 3.4. | `2-{name}-day13-l3-retention-memo.html` |

Minutes: Materi A 60 + Task 1 64 (Core 20), Materi B 60 + Task 2 53 (Core 19). All in `lib/routes.ts`.

## Stack

Next.js 14 · TypeScript · Tailwind (CS tokens) · Zustand + `persist` (key `cs-d13-v1`, version 1, `skipHydration`, deep merge, pure `migratePersisted`) · static export.

```bash
npm install
npm run dev
npm run typecheck
npm run verify:calc  # re-derives every figure, rule, panel bar/test/category, Core-only fill, in both languages
npm run build        # stop `npm run dev` first
```

## Mentor bar

First element on every page. `muchson123` fills every model answer of both routes (and the name if empty); answer keys and worked answers appear
after the same unlock. Convenience gate, not security; a reload locks it.

## Notes on deviations

1. **#48 (this day onward): one Core block and one Core card per level.** Route 1: Core blocks 1.1 and 2.4, Core cards A1 and A7. Route 2: Core card B5 and
   one Core frame (Step A + Step B counted as one unit in the ring). Everything else is folded, never removed, and Core never reads Optional (#40).
2. **Plan mapping (#44).** The plan's Level 1 items (what motivates, where a game element helps) → 1.1 (and Optional 1.2–1.4); the case study (KPIs, measures
   prioritised with Integration × Motivation × Sustainability within a budget and time limit, #45) → 2.4 Core with 2.1–2.3 Optional; Level 3 transfer project and
   the decision despite unclear prospects → Step A / Step B. The plan asks for no calculation beyond the printed rates, the budget and the score formula.
3. **Not rebuilt in this pass:** the Word documents (#31) and videos (#33).
4. **Every figure beyond the brief is a Case assumption** (set-up bar results, moments, metrics, costs, weeks, data shares, KPI baselines).
5. **The worked-example companies** are Elbe Cloudwerk (Materi A) and Neckar Systeme (Materi B); the task never prints its own answer.

## Dependency checklist (#40)

| Item | Status | Reads from | Core-safe |
|---|---|---|---|
| 1.1 Reward, competition or progress? | **Core** | brief, own items, card A1 | ✓ |
| 1.2, 1.3, 1.4, 2.1, 2.2, 2.3 | Optional | brief, own items, cards A2–A6 | self-contained |
| 2.4 Three measures, scored and ordered | **Core** | brief, own items, card A7 | ✓ |
| Panel, Step A, Step B (one Core frame) | **Core** | printed item facts, “the numbers today”, card B5; Step B quotes Step A | ✓ |
| 3.1 to 3.4 | Optional | own items, cards B1–B4 | self-contained |
| Cards A1, A7, B5 | Core | each other and the case | ✓ |
| Cards A2–A6, B1–B4 | Optional | — | no Core block cites them |

`verify:calc` scans the Core blocks and cards for names of Optional blocks and cards and fills only the Core blocks to check the missing lists empty.

## Verified

`tsc`, `verify:calc`, production build, static export served locally from a clean `localStorage`: mentor fill, Route 1 and Route 2 render, no console errors.
