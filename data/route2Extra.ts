import type { ArchId, KpiId } from "@/data/route2";
import { bi, t } from "@/lib/lang";

/**
 * What the Step A item cards of Route 2 print besides the panel's own facts (CLAUDE.md #47, #46): one line of a normal day at EngageIT with
 * the item in use, who does what and what changes for the customer. Case assumptions, like every other figure of Route 2.
 */
export type ArchExtra = { scene: string };

export const ARCH_EXTRA: Record<ArchId, ArchExtra> = bi({
  foundation: {
    scene: t(
      "A customer success manager opens a customer's profile before a call and sees the membership level, the referral status and the last features used in one place. The retention dashboard shows the three KPIs for every game element on one page. Before, each system showed one slice and nobody could compare them.",
      "Eine Customer-Success-Managerin öffnet vor einem Gespräch das Profil eines Kunden und sieht Mitgliedschaftsstufe, Empfehlungsstatus und zuletzt genutzte Funktionen an einem Ort. Das Retention-Dashboard zeigt die drei KPIs für jedes Spielelement auf einer Seite. Vorher zeigte jedes System eine Scheibe, und niemand konnte sie vergleichen.",
    ),
  },
  chat: {
    scene: t(
      "The platform, the membership tool and the referral scheme all call a finished set-up by the same event name and record it at the same moment. A customer who finishes set-up in the platform is a Silver member the same day, not three weeks later.",
      "Plattform, Mitgliedschaftstool und Empfehlungsprogramm nennen eine abgeschlossene Einrichtung mit demselben Ereignisnamen und erfassen sie im selben Moment. Ein Kunde, der die Einrichtung in der Plattform abschließt, ist am selben Tag Silber-Mitglied, nicht erst drei Wochen später.",
    ),
  },
  personal: {
    scene: t(
      "A new customer logs in and sees “3 of 8 steps done: invite a colleague next”. At step 5 the Silver level opens and unlocks a free training seat. The next step is chosen from what the customer has used so far.",
      "Ein neuer Kunde loggt sich ein und sieht „3 von 8 Schritten erledigt: als Nächstes einen Kollegen einladen“. Bei Schritt 5 öffnet sich die Stufe Silber und schaltet einen kostenlosen Schulungsplatz frei. Der nächste Schritt wird aus dem gewählt, was der Kunde bisher genutzt hat.",
    ),
  },
  routing: {
    scene: t(
      "A customer who finished set-up and uses six features sees a referral card: “You both get a service credit when the company you invite is still active after 90 days.” A customer who has not finished set-up sees a personal tip instead.",
      "Ein Kunde, der die Einrichtung abgeschlossen hat und sechs Funktionen nutzt, sieht eine Empfehlungskarte: „Sie beide erhalten ein Service-Guthaben, wenn das eingeladene Unternehmen nach 90 Tagen noch aktiv ist.“ Ein Kunde, der die Einrichtung nicht abgeschlossen hat, sieht stattdessen einen persönlichen Tipp.",
    ),
  },
  training: {
    scene: t(
      "In a half-day session a customer success manager and a product manager each read the dashboard, run a mock monthly review and decide to stop one game element whose guardrail rose. Both then speak about the same numbers.",
      "In einer halbtägigen Einheit lesen eine Customer-Success-Managerin und ein Produktmanager jeweils das Dashboard, führen ein Probe-Review durch und beschließen, ein Spielelement zu stoppen, dessen Guardrail gestiegen ist. Beide sprechen danach über dieselben Zahlen.",
    ),
  },
  tracking: {
    scene: t(
      "One page says which actions earn a reward (a finished set-up, a live workflow, a referred customer who stays) and which do not (a login). Each month a check lists accounts with many points and almost no real use, and the review decides what to change.",
      "Eine Seite sagt, welche Handlungen eine Belohnung bringen (eine abgeschlossene Einrichtung, ein live geschalteter Workflow, ein empfohlener Kunde, der bleibt) und welche nicht (ein Login). Jeden Monat listet eine Prüfung Konten mit vielen Punkten und kaum echter Nutzung auf, und das Review entscheidet, was sich ändert.",
    ),
  },
  suite: {
    scene: t(
      "A vendor platform replaces the membership and referral tools and decides rewards by itself, with no rules shown. Two customers with the same use get different rewards and nobody at EngageIT can say why.",
      "Eine Anbieterplattform ersetzt Mitgliedschafts- und Empfehlungstool und entscheidet Belohnungen selbst, ohne dass Regeln gezeigt werden. Zwei Kunden mit derselben Nutzung bekommen verschiedene Belohnungen, und niemand bei EngageIT kann sagen, warum.",
    ),
  },
  relaunch: {
    scene: t(
      "Every login earns 5 points, and a public page ranks the ten most active customers. The points shop is not connected to the membership tool, so a customer who collects points gets nothing the profile knows about.",
      "Jeder Login bringt 5 Punkte, und eine öffentliche Seite rankt die zehn aktivsten Kunden. Der Punkteshop ist nicht mit dem Mitgliedschaftstool verbunden, also bekommt ein Kunde, der Punkte sammelt, nichts, was das Profil kennt.",
    ),
  },
});

/** The aim printed beside each customer KPI in "the numbers today" (the figure Step B's "what I watch" sentence can quote). */
export const KPI_AIM: Partial<Record<KpiId, number>> = { conv: 35, engage: 5 };
