import { ARCH_IDS } from "@/data/route2";
import type { ArchId } from "@/data/route2";
import { bi, t } from "@/lib/lang";

/**
 * What the Route 2 control panel reads (CLAUDE.md #47). Every figure is a Case assumption and is printed on the item cards and in "the
 * numbers today", so the Core frame never reads an Optional block (#40): `data` is the share of the steps a game element reads whose data already
 * reaches the shared customer profile, the same figure the moment list of the “Go deeper” part prints for the moment it also names (a check in
 * `npm run verify:calc` keeps them equal). Nothing here asks the learner to calculate (#44): the panel computes it and says what it means.
 * (Identifiers keep the names of the file this was built from: `chat` is the usage data clean-up, `personal` the progress paths, `routing` the
 * referral invitations and personal tips, `tracking` the rulebook and fairness checks, `relaunch` the points per login and public leaderboard.)
 */
export type Tier = "now" | "later" | "not";
export const TIER_IDS: Tier[] = ["now", "later", "not"];
export const TIER_LABEL = bi({ now: t("Now", "Jetzt"), later: t("After data is ready", "Wenn die Daten bereit sind"), not: t("Not now", "Jetzt nicht") });

/** The "weaker data" scenario: every readiness figure is this many points lower (the plan's “complex system landscape”). */
export const WEAK_POINTS = 15;
/** A game element starts on data that is at least this connected (the rule of Materi B5; the same bar as the “Go deeper” part's). */
export const READY_BAR = 80;

/** Where an item sits in the architecture diagram. */
export type Layer = "suite" | "site" | "engine" | "people" | "base";

export type PanelFacts = {
  layer: Layer;
  /** Short name for the diagram. */
  short: string;
  /** What the item does for the system, in one phrase after "Moves". */
  moves: string;
  /** It moves a named KPI of customers (a rate customers' behaviour changes). */
  named: boolean;
  /** It makes the other items measurable or usable (the shared profile and dashboard, the data clean-up, the training, the rulebook). */
  enabler: boolean;
  /** Its effect can be measured once it is in place (a named KPI, or the measurement system itself). */
  measured: boolean;
  /** Share of the steps it reads whose data already reaches the shared profile today (percent), or null when it needs no data to start. */
  data: number | null;
  /** The usage data clean-up prepares the data this item reads: it is ready when the clean-up is in use before the item starts. */
  cleaned: boolean;
  blackBox: boolean;
};

export const PANEL: Record<ArchId, PanelFacts> = bi({
  foundation: { layer: "base" as Layer, short: t("Profile and retention dashboard", "Profil und Retention-Dashboard"), moves: t("no KPI by itself: every game element reads one customer, and every KPI is counted once for all of them", "keinen KPI selbst: Jedes Spielelement liest einen Kunden, und jeder KPI wird einmal für alle gezählt"), named: false, enabler: true, measured: true, data: null, cleaned: false, blackBox: false },
  chat: { layer: "people" as Layer, short: t("Usage data clean-up", "Bereinigung der Nutzungsdaten"), moves: t("no KPI by itself: use is recorded the same way in the platform, the membership tool and the referral scheme", "keinen KPI selbst: Nutzung wird in Plattform, Mitgliedschaftstool und Empfehlungsprogramm gleich erfasst"), named: false, enabler: true, measured: false, data: null, cleaned: false, blackBox: false },
  personal: { layer: "engine" as Layer, short: t("Progress paths and membership levels", "Fortschrittspfade und Mitgliedschaftsstufen"), moves: t("the share of new customers who finish set-up in 30 days", "den Anteil der Neukunden, die die Einrichtung in 30 Tagen abschließen"), named: true, enabler: false, measured: true, data: 82, cleaned: false, blackBox: false },
  routing: { layer: "engine" as Layer, short: t("Referral invitations and personal tips", "Empfehlungseinladungen und persönliche Tipps"), moves: t("the share of invited customers who are still active after 90 days", "den Anteil der eingeladenen Kunden, die nach 90 Tagen noch aktiv sind"), named: true, enabler: false, measured: true, data: 60, cleaned: true, blackBox: false },
  training: { layer: "people" as Layer, short: t("Training for customer success and product", "Training für Customer Success und Produkt"), moves: t("no KPI by itself: the teams read the dashboard and run the monthly review", "keinen KPI selbst: Die Teams lesen das Dashboard und führen das monatliche Review"), named: false, enabler: true, measured: false, data: null, cleaned: false, blackBox: false },
  tracking: { layer: "people" as Layer, short: t("Rulebook and fairness checks", "Regelwerk und Fairness-Prüfungen"), moves: t("the share of accounts that only collect points, a guardrail that must not rise", "den Anteil der Konten, die nur Punkte sammeln, eine Guardrail, die nicht steigen darf"), named: true, enabler: true, measured: true, data: null, cleaned: false, blackBox: false },
  suite: { layer: "suite" as Layer, short: t("All-in-one game platform", "All-in-one-Spieleplattform"), moves: t("no KPI it reports: it decides rewards by itself and its rules and results are not shown", "keinen KPI, den sie berichtet: Sie entscheidet Belohnungen selbst, und ihre Regeln und Ergebnisse werden nicht gezeigt"), named: false, enabler: false, measured: false, data: null, cleaned: false, blackBox: true },
  relaunch: { layer: "site" as Layer, short: t("Points per login and public leaderboard", "Punkte pro Login und öffentliche Rangliste"), moves: t("no KPI it names: it counts logins and points, which is activity, and it is not connected to the membership tool", "keinen KPI, den sie nennt: Sie zählt Logins und Punkte, also Aktivität, und ist nicht mit dem Mitgliedschaftstool verbunden"), named: false, enabler: false, measured: false, data: null, cleaned: false, blackBox: false },
});

/** The game elements that read the shared profile: the progress paths and the referral invitations and tips. */
export const ENGINE_IDS: ArchId[] = ["personal", "routing"];
/** The item the "After data is ready" tier waits for (a clean usage record puts the data into the profile), and the one that makes everything else measurable. */
export const CLEAN_ID: ArchId = "chat";
export const KPI_SYSTEM_ID: ArchId = "foundation";

/**
 * The model plan (CLAUDE.md #47): the six items that fit the budget; the referral invitations wait for the usage data clean-up to put the use into the
 * profile; the all-in-one game platform and the points per login stay out (the platform is in use only in month 9, after the 5 months; the points name no KPI and are
 * not connected).
 */
export const MODEL_TIER: Record<ArchId, Tier> = { foundation: "now", chat: "now", personal: "now", routing: "later", training: "now", tracking: "now", suite: "not", relaunch: "not" };
export const MODEL_ARCH: ArchId[] = ARCH_IDS.filter((id) => MODEL_TIER[id] !== "not");
