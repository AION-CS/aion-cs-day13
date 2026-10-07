import { bi, t } from "@/lib/lang";
import { TASK1_MINUTES, TASK2_MINUTES } from "@/lib/routes";

/** One registry for every material card: the rail, the cards and the task chips all read it. */
export type MaterialId = "A1" | "A2" | "A3" | "A4" | "A5" | "A6" | "A7" | "B1" | "B2" | "B3" | "B4" | "B5";
export type Block = "A" | "B";
export type MaterialMeta = { id: MaterialId; block: Block; title: string; minutes: number; optional?: boolean };

/**
 * `optional: true` marks a card that no Core task block draws on (lib/progress.ts OPTIONAL_BLOCKS): collapsed by default via OptionalSection,
 * never removed (CLAUDE.md #35). From Day 13 each level has ONE Core card (CLAUDE.md #48): Route 1 Core cards are A1 (Level 1, the Core block 1.1)
 * and A7 (Level 2, the Core block 2.4); Route 2 Core card is B5. A Core block cites only its own Core card, and that card carries every rule the block needs
 * (CLAUDE.md #40), so A2 to A6 and B1 to B4 are Optional.
 *
 * Day 13: Materi A (Route 1, Levels 1 and 2) seven cards, 60 minutes (the two Core cards take 17); Materi B (Route 2, Level 3) five cards, 60 minutes
 * (the Core card takes 12). */
export const MATERIALS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as Block, title: t("Gamification: reward, competition, and progress and status", "Gamification: Belohnung, Wettbewerb, und Fortschritt und Status"), minutes: 9 },
  { id: "A2" as MaterialId, block: "A" as Block, title: t("Real motivation or a short-term incentive: when a game element works", "Echte Motivation oder kurzfristiger Anreiz: wann ein Spielelement wirkt"), minutes: 9, optional: true },
  { id: "A3" as MaterialId, block: "A" as Block, title: t("Where game elements help, and where they plug into what exists", "Wo Spielelemente helfen, und wo sie sich an Bestehendes anschließen"), minutes: 8, optional: true },
  { id: "A4" as MaterialId, block: "A" as Block, title: t("What a set-up bar is worth: finish rate, lift and extra revenue", "Was eine Einrichtungsleiste wert ist: Abschlussquote, Lift und zusätzlicher Umsatz"), minutes: 9, optional: true },
  { id: "A5" as MaterialId, block: "A" as Block, title: t("KPIs for gamification: outcome, driver, guardrail and vanity metrics", "KPIs für Gamification: Outcome, Treiber, Guardrail und Vanity Metrics"), minutes: 8, optional: true },
  { id: "A6" as MaterialId, block: "A" as Block, title: t("Testing a game element fairly, and reading trends", "Ein Spielelement fair testen, und Trends lesen"), minutes: 9, optional: true },
  { id: "A7" as MaterialId, block: "A" as Block, title: t("Choosing measures: motivation, integration, sustainability", "Maßnahmen wählen: Motivation, Integration, Nachhaltigkeit"), minutes: 8 },
  { id: "B1" as MaterialId, block: "B" as Block, title: t("An integrated retention system: the target vision", "Ein integriertes Kundenbindungssystem: das Zielbild"), minutes: 12, optional: true },
  { id: "B2" as MaterialId, block: "B" as Block, title: t("Central motivation moments: the real action first, then the game", "Zentrale Motivationsmomente: zuerst die echte Handlung, dann das Spiel"), minutes: 12, optional: true },
  { id: "B3" as MaterialId, block: "B" as Block, title: t("A KPI system for game elements: four tests", "Ein KPI-System für Spielelemente: vier Tests"), minutes: 12, optional: true },
  { id: "B4" as MaterialId, block: "B" as Block, title: t("Optimising game elements: roll out, keep testing or stop", "Spielelemente optimieren: ausrollen, weiter testen oder stoppen"), minutes: 12, optional: true },
  { id: "B5" as MaterialId, block: "B" as Block, title: t("An integration decision under unclear success impact, and the architecture", "Eine Integrationsentscheidung bei unklarer Erfolgswirkung, und die Architektur"), minutes: 12 },
]);

export const MATERIAL_BY_ID = Object.fromEntries(MATERIALS.map((m) => [m.id, m])) as Record<MaterialId, MaterialMeta>;
export const materialAnchorId = (id: MaterialId) => `mat-${id}`;

export type RailSection = { id: string; label: string; sub: string; minutes: number };
export const SECTIONS: Record<1 | 2, RailSection[]> = bi({
  1: [
    { id: "materi-a", label: t("Materi A", "Materi A"), sub: t("Levels 1 + 2 · motivate, integrate, choose", "Level 1 + 2 · motivieren, integrieren, wählen"), minutes: 60 },
    { id: "task-1", label: t("Task 1", "Task 1"), sub: t("Gamification Analysis · one case", "Gamification Analysis · ein Fall"), minutes: TASK1_MINUTES },
  ],
  2: [
    { id: "materi-b", label: t("Materi B", "Materi B"), sub: t("Level 3 · integrated retention system", "Level 3 · integriertes Kundenbindungssystem"), minutes: 60 },
    { id: "task-2", label: t("Task 2", "Task 2"), sub: t("Retention System Memo · CCO", "Retention System Memo · CCO"), minutes: TASK2_MINUTES },
  ],
});
