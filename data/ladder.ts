import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 1.1 (Core, Level 1). Nine game ideas that EngageIT's teams have proposed for its platform. The learner tags each with
 * the mechanism it uses (Materi A1): a reward, competition, or progress and status. (The identifiers `LINES`, `LineId` and `LevelTag` keep
 * the names of the sort board this file was built from: a "line" is one idea, a "level tag" is the mechanism.) `truth` is never shown
 * outside the mentor answer key.
 */
export type LevelTag = "reward" | "compete" | "progress";
export const LEVEL_TAGS = bi([
  { id: "reward" as LevelTag, label: t("Reward", "Belohnung"), hint: t("The customer receives something for doing it: points, a free module, a service hour, a gift.", "Der Kunde erhält etwas dafür, dass er es tut: Punkte, ein kostenloses Modul, eine Servicestunde, ein Geschenk.") },
  { id: "compete" as LevelTag, label: t("Competition", "Wettbewerb"), hint: t("The customer sees how they stand compared with other customers or teams: a rank, a league, an average.", "Der Kunde sieht, wo er im Vergleich zu anderen Kunden oder Teams steht: ein Rang, eine Liga, ein Durchschnitt.") },
  { id: "progress" as LevelTag, label: t("Progress and status", "Fortschritt und Status"), hint: t("The customer sees how far they have come on their own path, or holds a level or title that stays theirs.", "Der Kunde sieht, wie weit er auf seinem eigenen Weg ist, oder hält eine Stufe oder einen Titel, der ihm bleibt.") },
]);
export const LEVEL_LABEL = bi({ reward: t("Reward", "Belohnung"), compete: t("Competition", "Wettbewerb"), progress: t("Progress and status", "Fortschritt und Status") });

export type LineId = "l1" | "l2" | "l3" | "l4" | "l5" | "l6" | "l7" | "l8" | "l9";
export type Line = { id: LineId; text: string; source: string; truth: LevelTag; clue: string; why: string; rejected: Partial<Record<LevelTag, string>> };

export const LINES: Line[] = bi([
  {
    id: "l1" as LineId,
    source: t("Reporting module", "Reporting-Modul"),
    text: t("A customer who builds their first automated report gets 10 service points; 500 points pay for one hour with an EngageIT consultant.", "Ein Kunde, der seinen ersten automatisierten Bericht baut, erhält 10 Service-Punkte; 500 Punkte bezahlen eine Stunde mit einem EngageIT-Berater."),
    truth: "reward" as LevelTag,
    clue: t("What does the customer receive, and can they spend it?", "Was erhält der Kunde, und kann er es ausgeben?"),
    why: t("The customer is handed something to spend for doing the task: the points are a prize, so the mechanism is a reward.", "Der Kunde bekommt etwas zum Ausgeben dafür, dass er die Aufgabe erledigt: Die Punkte sind ein Preis, also ist der Mechanismus eine Belohnung."),
    rejected: { progress: t("The points are a prize to spend. Nothing shows how far the customer has come on their own path.", "Die Punkte sind ein Preis zum Ausgeben. Nichts zeigt, wie weit der Kunde auf seinem eigenen Weg ist.") },
  },
  {
    id: "l2" as LineId,
    source: t("Data connections", "Datenanbindungen"),
    text: t("Customers who connect all three of their data sources in the first month get the premium analytics module free for three months.", "Kunden, die in den ersten vier Wochen alle drei ihrer Datenquellen anbinden, erhalten das Premium-Analytics-Modul drei Monate kostenlos."),
    truth: "reward" as LevelTag,
    clue: t("Is something handed over for finishing, or is the customer shown where they stand?", "Wird etwas fürs Fertigwerden übergeben, oder wird dem Kunden gezeigt, wo er steht?"),
    why: t("A free module is handed over for reaching a goal: a reward, here one that deepens real use.", "Ein kostenloses Modul wird fürs Erreichen eines Ziels übergeben: eine Belohnung, hier eine, die die echte Nutzung vertieft."),
    rejected: { progress: t("Finishing the connections is the goal; the free module is what the customer receives for it.", "Das Fertigstellen der Anbindungen ist das Ziel; das kostenlose Modul ist, was der Kunde dafür erhält.") },
  },
  {
    id: "l3" as LineId,
    source: t("Renewal", "Verlängerung"),
    text: t("Every customer who is still active after twelve months receives a thank-you workshop with a solution architect on their own set-up.", "Jeder Kunde, der nach zwölf Monaten noch aktiv ist, erhält einen Dankeschön-Workshop mit einem Solution Architect zu seinem eigenen Set-up."),
    truth: "reward" as LevelTag,
    clue: t("Is it a prize for staying, or a picture of progress?", "Ist es ein Preis fürs Bleiben, oder ein Bild des Fortschritts?"),
    why: t("A workshop is given to every customer who stays: a thank-you reward, not a comparison or a level.", "Ein Workshop wird jedem Kunden gegeben, der bleibt: eine Dankeschön-Belohnung, kein Vergleich und keine Stufe."),
    rejected: { compete: t("Nobody is ranked: every customer who stays receives it, whatever others do.", "Niemand wird gerankt: Jeder Kunde, der bleibt, erhält ihn, egal was andere tun.") },
  },
  {
    id: "l4" as LineId,
    source: t("Automation", "Automatisierung"),
    text: t("A monthly leaderboard shows the ten customers who automated the most workflows, with their company names.", "Eine monatliche Rangliste zeigt die zehn Kunden, die die meisten Workflows automatisiert haben, mit ihren Firmennamen."),
    truth: "compete" as LevelTag,
    clue: t("Does the customer's place depend on what other customers do?", "Hängt der Platz des Kunden davon ab, was andere Kunden tun?"),
    why: t("A rank only exists next to other customers and moves when they move: competition.", "Ein Rang existiert nur neben anderen Kunden und bewegt sich, wenn sie sich bewegen: Wettbewerb."),
    rejected: { progress: t("A rank is not progress on your own path: it falls when others do more, even if you did not stop.", "Ein Rang ist kein Fortschritt auf dem eigenen Weg: Er fällt, wenn andere mehr tun, auch wenn Sie nicht aufgehört haben.") },
  },
  {
    id: "l5" as LineId,
    source: t("Dashboard", "Dashboard"),
    text: t("On the dashboard, each customer sees how their feature use compares with the average of companies of the same size.", "Auf dem Dashboard sieht jeder Kunde, wie seine Funktionsnutzung im Vergleich zum Durchschnitt gleich großer Unternehmen aussieht."),
    truth: "compete" as LevelTag,
    clue: t("Is the customer compared with anyone?", "Wird der Kunde mit jemandem verglichen?"),
    why: t("The customer is set against an average of other companies: a comparison, so competition (a soft one, with no prize).", "Der Kunde wird einem Durchschnitt anderer Unternehmen gegenübergestellt: ein Vergleich, also Wettbewerb (ein sanfter, ohne Preis)."),
    rejected: { reward: t("Nothing is handed over; the customer only sees a comparison.", "Es wird nichts übergeben; der Kunde sieht nur einen Vergleich.") },
  },
  {
    id: "l6" as LineId,
    source: t("Self-service", "Self-Service"),
    text: t("Teams inside a customer can join a quarterly challenge: which department closes the most tickets through the platform's self-service?", "Teams innerhalb eines Kunden können an einer Quartals-Challenge teilnehmen: Welche Abteilung schließt die meisten Tickets über den Self-Service der Plattform?"),
    truth: "compete" as LevelTag,
    clue: t("Who wins: the one who did a set amount, or the one who did more than the others?", "Wer gewinnt: wer eine feste Menge schaffte, oder wer mehr schaffte als die anderen?"),
    why: t("Departments are set against each other and the best one wins: competition.", "Abteilungen treten gegeneinander an, und die beste gewinnt: Wettbewerb."),
    rejected: { reward: t("A challenge may end with a prize, but what drives it is beating the other departments.", "Eine Challenge kann mit einem Preis enden, aber was sie antreibt, ist, die anderen Abteilungen zu schlagen.") },
  },
  {
    id: "l7" as LineId,
    source: t("Onboarding", "Onboarding"),
    text: t("A set-up bar on the home screen shows “5 of 8 steps done” and highlights the next step.", "Eine Einrichtungsleiste auf dem Startbildschirm zeigt „5 von 8 Schritten erledigt“ und hebt den nächsten Schritt hervor."),
    truth: "progress" as LevelTag,
    clue: t("Does the customer see where they stand on their own path?", "Sieht der Kunde, wo er auf seinem eigenen Weg steht?"),
    why: t("The customer sees how far they have come on their own path and what is next: progress.", "Der Kunde sieht, wie weit er auf seinem eigenen Weg ist und was als Nächstes kommt: Fortschritt."),
    rejected: { reward: t("Nothing is handed over; the bar only shows the way.", "Es wird nichts übergeben; die Leiste zeigt nur den Weg.") },
  },
  {
    id: "l8" as LineId,
    source: t("Training", "Schulung"),
    text: t("Customers who finish the three admin courses are shown as “Certified Power User” on their profile and in the support portal.", "Kunden, die die drei Admin-Kurse abschließen, werden als „Certified Power User“ auf ihrem Profil und im Support-Portal angezeigt."),
    truth: "progress" as LevelTag,
    clue: t("Is the title yours whatever other customers do?", "Gehört der Titel Ihnen, egal was andere Kunden tun?"),
    why: t("A title that stays the customer's, whatever others do, is status: the second half of progress and status.", "Ein Titel, der dem Kunden bleibt, egal was andere tun, ist Status: die zweite Hälfte von Fortschritt und Status."),
    rejected: { compete: t("The title does not depend on anyone else; a rank would.", "Der Titel hängt von niemand anderem ab; ein Rang täte es.") },
  },
  {
    id: "l9" as LineId,
    source: t("Usage", "Nutzung"),
    text: t("Levels Bronze, Silver and Gold follow how many modules a customer actively uses; the page shows the next level and what it unlocks.", "Die Stufen Bronze, Silber und Gold folgen, wie viele Module ein Kunde aktiv nutzt; die Seite zeigt die nächste Stufe und was sie freischaltet."),
    truth: "progress" as LevelTag,
    clue: t("Does the level depend on others, or only on the customer's own use?", "Hängt die Stufe von anderen ab, oder nur von der eigenen Nutzung des Kunden?"),
    why: t("The level follows the customer's own use and shows the next step: progress and status.", "Die Stufe folgt der eigenen Nutzung des Kunden und zeigt den nächsten Schritt: Fortschritt und Status."),
    rejected: { reward: t("“What it unlocks” only tells the customer what waits at the next level; the picture of levels is the idea.", "„Was sie freischaltet“ sagt dem Kunden nur, was auf der nächsten Stufe wartet; die Idee ist das Bild der Stufen.") },
  },
]);
export const LINE_IDS: LineId[] = ["l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8", "l9"];

/** The tests taught in Materi A1 for each mechanism, and the pair tests. */
export const LEVEL_TESTS = bi([
  { name: t("Reward", "Belohnung"), test: t("Does the customer receive something (points, a free module, a service hour) for doing it?", "Erhält der Kunde etwas (Punkte, ein kostenloses Modul, eine Servicestunde) dafür, dass er es tut?") },
  { name: t("Competition", "Wettbewerb"), test: t("Does the customer see how they stand compared with other customers or teams, so that their place depends on what others do?", "Sieht der Kunde, wo er im Vergleich zu anderen Kunden oder Teams steht, sodass sein Platz davon abhängt, was andere tun?") },
  { name: t("Progress and status", "Fortschritt und Status"), test: t("Does the customer see how far they have come on their own path, or hold a level or title that stays theirs whatever others do?", "Sieht der Kunde, wie weit er auf seinem eigenen Weg ist, oder hält er eine Stufe oder einen Titel, der ihm bleibt, egal was andere tun?") },
  { name: t("Reward or progress?", "Belohnung oder Fortschritt?"), test: t("Ask what the customer holds afterwards. Something handed over and spent (points, a module, an hour) is a reward. A bar, a step count or a level that only shows where they stand on their own path is progress, even if the last step also earns a prize.", "Fragen Sie, was der Kunde danach in der Hand hat. Etwas, das übergeben und ausgegeben wird (Punkte, ein Modul, eine Stunde), ist eine Belohnung. Eine Leiste, ein Schrittzähler oder eine Stufe, die nur zeigt, wo er auf seinem eigenen Weg steht, ist Fortschritt, auch wenn der letzte Schritt zusätzlich einen Preis bringt.") },
  { name: t("Competition or status?", "Wettbewerb oder Status?"), test: t("A rank only exists next to other customers and moves when they move: competition. A title or level that stays yours whatever others do: status.", "Ein Rang existiert nur neben anderen Kunden und bewegt sich, wenn sie sich bewegen: Wettbewerb. Ein Titel oder eine Stufe, die Ihnen bleibt, egal was andere tun: Status.") },
]);

/** The decisive phrase inside each idea's own text, for "Highlight the key words" (never which mechanism it points to). */
export const LINE_KEY: Record<string, string> = bi({
  l1: t("gets 10 service points; 500 points pay for one hour", "erhält 10 Service-Punkte; 500 Punkte bezahlen eine Stunde"),
  l2: t("get the premium analytics module free for three months", "erhalten das Premium-Analytics-Modul drei Monate kostenlos"),
  l3: t("receives a thank-you workshop", "erhält einen Dankeschön-Workshop"),
  l4: t("leaderboard shows the ten customers who automated the most", "Rangliste zeigt die zehn Kunden, die die meisten"),
  l5: t("compares with the average of companies of the same size", "im Vergleich zum Durchschnitt gleich großer Unternehmen"),
  l6: t("which department closes the most tickets", "Welche Abteilung schließt die meisten Tickets"),
  l7: t("shows “5 of 8 steps done” and highlights the next step", "zeigt „5 von 8 Schritten erledigt“ und hebt den nächsten Schritt hervor"),
  l8: t("shown as “Certified Power User” on their profile", "als „Certified Power User“ auf ihrem Profil"),
  l9: t("the page shows the next level and what it unlocks", "die Seite zeigt die nächste Stufe und was sie freischaltet"),
});
