import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 1.1. Nine playful elements from EngageIT's idea list for its platform. The learner tags each with the motivation
 * mechanism it uses (Materi A1–A2): reward, competition and comparison, or progress and status. (The identifiers keep the names of the
 * sort board this file was built from: a "line" is one element, a "level tag" is its mechanism; the ids respond/personal/learn now mean
 * reward/competition/progress.) `truth` is never shown outside the mentor answer key.
 */
export type LevelTag = "respond" | "personal" | "learn";
export const LEVEL_TAGS = bi([
  { id: "respond" as LevelTag, label: t("Reward", "Belohnung"), hint: t("Points, benefits or prizes given for doing something: the customer gets something extra.", "Punkte, Vorteile oder Preise für eine Handlung: Der Kunde bekommt etwas zusätzlich.") },
  { id: "personal" as LevelTag, label: t("Competition and comparison", "Wettbewerb und Vergleich"), hint: t("The customer sees how they stand against others: a ranking, a benchmark, a race.", "Der Kunde sieht, wie er im Vergleich zu anderen steht: eine Rangliste, ein Benchmark, ein Wettlauf.") },
  { id: "learn" as LevelTag, label: t("Progress and status", "Fortschritt und Status"), hint: t("The customer sees their own progress towards a goal and reaches a level: a path, a checklist, a status.", "Der Kunde sieht seinen eigenen Fortschritt zu einem Ziel und erreicht eine Stufe: ein Pfad, eine Checkliste, ein Status.") },
]);
export const LEVEL_LABEL = bi({ respond: t("Reward", "Belohnung"), personal: t("Competition and comparison", "Wettbewerb und Vergleich"), learn: t("Progress and status", "Fortschritt und Status") });

export type LineId = "l1" | "l2" | "l3" | "l4" | "l5" | "l6" | "l7" | "l8" | "l9";
export type Line = { id: LineId; text: string; source: string; truth: LevelTag; clue: string; why: string; rejected: Partial<Record<LevelTag, string>> };

export const LINES: Line[] = bi([
  {
    id: "l1" as LineId,
    source: t("Marketing", "Marketing"),
    text: t("“Users collect 10 points for every report they create, and exchange points for a free training day.”", "„Nutzer sammeln 10 Punkte für jeden erstellten Bericht und tauschen Punkte gegen einen kostenlosen Schulungstag.“"),
    truth: "respond" as LevelTag,
    clue: t("What does the user get for doing it: something extra, a place in a ranking, or a step towards a goal?", "Was bekommt der Nutzer dafür: etwas zusätzlich, einen Platz in einer Rangliste oder einen Schritt zu einem Ziel?"),
    why: t("Points exchanged for something of value: a reward.", "Punkte, die gegen etwas Wertvolles getauscht werden: eine Belohnung."),
    rejected: { learn: t("Points add up, but they lead to a prize, not to a level or a goal in the product.", "Punkte summieren sich, aber sie führen zu einem Preis, nicht zu einer Stufe oder einem Ziel im Produkt.") },
  },
  {
    id: "l2" as LineId,
    source: t("Customer Success", "Customer Success"),
    text: t("“A setup checklist shows each new account how many of the six key steps it has done: 4 of 6.”", "„Eine Einrichtungs-Checkliste zeigt jedem neuen Konto, wie viele der sechs wichtigsten Schritte es erledigt hat: 4 von 6.“"),
    truth: "learn" as LevelTag,
    clue: t("Is anyone else in the picture, or only the account and its own goal?", "Kommt jemand anderes vor, oder nur das Konto und sein eigenes Ziel?"),
    why: t("The account sees its own way towards a goal: progress.", "Das Konto sieht seinen eigenen Weg zu einem Ziel: Fortschritt."),
    rejected: { personal: t("Nobody is compared; the checklist shows the account against its own goal.", "Niemand wird verglichen; die Checkliste zeigt das Konto gegenüber seinem eigenen Ziel.") },
  },
  {
    id: "l3" as LineId,
    source: t("Sales", "Vertrieb"),
    text: t("“A monthly ranking shows the ten customers whose staff used the platform most.”", "„Eine monatliche Rangliste zeigt die zehn Kunden, deren Mitarbeitende die Plattform am meisten genutzt haben.“"),
    truth: "personal" as LevelTag,
    clue: t("Against whom does the customer measure themselves here?", "An wem misst sich der Kunde hier?"),
    why: t("Customers are ranked against each other: competition.", "Kunden werden gegeneinander gereiht: Wettbewerb."),
    rejected: { learn: t("A place in a ranking depends on others, not on the customer's own goal.", "Ein Platz in einer Rangliste hängt von anderen ab, nicht vom eigenen Ziel des Kunden.") },
  },
  {
    id: "l4" as LineId,
    source: t("Customer Success", "Customer Success"),
    text: t("“Accounts that use five core features reach Silver status, with a named contact.”", "„Konten, die fünf Kernfunktionen nutzen, erreichen den Silber-Status, mit einer benannten Ansprechperson.“"),
    truth: "learn" as LevelTag,
    clue: t("Is the named contact the point, or the level the account reaches?", "Ist die benannte Ansprechperson der Punkt, oder die Stufe, die das Konto erreicht?"),
    why: t("A level reached by real use, with a status: progress and status. The contact comes with the status.", "Eine durch echte Nutzung erreichte Stufe, mit einem Status: Fortschritt und Status. Die Ansprechperson kommt mit dem Status."),
    rejected: { respond: t("There is a benefit, but it is tied to a level of use, not given for a single action.", "Es gibt einen Vorteil, aber er ist an eine Nutzungsstufe gebunden, nicht für eine einzelne Handlung vergeben.") },
  },
  {
    id: "l5" as LineId,
    source: t("Marketing", "Marketing"),
    text: t("“Every user who logs in five days in a row enters a draw for a tablet.”", "„Jeder Nutzer, der sich fünf Tage in Folge anmeldet, nimmt an einer Verlosung eines Tablets teil.“"),
    truth: "respond" as LevelTag,
    clue: t("What does the user get: a prize, a rank, or a step towards a goal?", "Was bekommt der Nutzer: einen Preis, einen Rang oder einen Schritt zu einem Ziel?"),
    why: t("A chance of a prize for an action: a reward, and a weak one, because logging in is not using.", "Eine Gewinnchance für eine Handlung: eine Belohnung, und eine schwache, weil Anmelden nicht Nutzen ist."),
    rejected: { personal: t("It is a draw, not a comparison: the other users are not ranked.", "Es ist eine Verlosung, kein Vergleich: Die anderen Nutzer werden nicht gereiht.") },
  },
  {
    id: "l6" as LineId,
    source: t("Sales", "Vertrieb"),
    text: t("“A benchmark shows each customer how many features similar firms in their industry use.”", "„Ein Benchmark zeigt jedem Kunden, wie viele Funktionen ähnliche Firmen seiner Branche nutzen.“"),
    truth: "personal" as LevelTag,
    clue: t("Is the customer shown their own goal, or how they stand against others?", "Wird dem Kunden sein eigenes Ziel gezeigt, oder wie er im Vergleich zu anderen steht?"),
    why: t("The customer is compared with peers: comparison.", "Der Kunde wird mit anderen verglichen: Vergleich."),
    rejected: { learn: t("It shows where others stand, not the customer's own path.", "Es zeigt, wo andere stehen, nicht den eigenen Weg des Kunden.") },
  },
  {
    id: "l7" as LineId,
    source: t("Customer Success", "Customer Success"),
    text: t("“A progress bar in the security module shows how many staff have completed the training: 38 of 50.”", "„Ein Fortschrittsbalken im Sicherheitsmodul zeigt, wie viele Mitarbeitende die Schulung abgeschlossen haben: 38 von 50.“"),
    truth: "learn" as LevelTag,
    clue: t("Is the firm compared with anyone?", "Wird die Firma mit jemandem verglichen?"),
    why: t("The firm sees its own progress towards a goal: progress.", "Die Firma sieht ihren eigenen Fortschritt zu einem Ziel: Fortschritt."),
    rejected: { personal: t("Staff are counted towards the firm's own goal, not ranked against another firm.", "Mitarbeitende werden auf das eigene Ziel der Firma gezählt, nicht gegen eine andere Firma gereiht.") },
  },
  {
    id: "l8" as LineId,
    source: t("Marketing", "Marketing"),
    text: t("“Customers who refer a firm that signs receive a €200 voucher.”", "„Kunden, die eine Firma empfehlen, die unterschreibt, erhalten einen Gutschein über 200 €.“"),
    truth: "respond" as LevelTag,
    clue: t("What is given here, and for what?", "Was wird hier gegeben, und wofür?"),
    why: t("Something of value for an action: a reward.", "Etwas Wertvolles für eine Handlung: eine Belohnung."),
    rejected: { learn: t("It is a single payment for a single action, not a level or a path.", "Es ist eine einzelne Zahlung für eine einzelne Handlung, keine Stufe und kein Pfad.") },
  },
  {
    id: "l9" as LineId,
    source: t("Sales", "Vertrieb"),
    text: t("“Departments inside a customer firm race each other to finish the new reporting training first.”", "„Abteilungen innerhalb einer Kundenfirma treten gegeneinander an, wer die neue Berichtsschulung zuerst abschließt.“"),
    truth: "personal" as LevelTag,
    clue: t("What drives the teams: a prize, beating the others, or their own goal?", "Was treibt die Teams an: ein Preis, die anderen zu schlagen, oder ihr eigenes Ziel?"),
    why: t("Teams race each other: competition, even though the goal is training.", "Teams treten gegeneinander an: Wettbewerb, auch wenn das Ziel eine Schulung ist."),
    rejected: { learn: t("The training is the goal, but the mechanism that moves the teams is beating the others.", "Die Schulung ist das Ziel, aber der Mechanismus, der die Teams bewegt, ist, die anderen zu schlagen.") },
  },
]);
export const LINE_IDS: LineId[] = ["l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8", "l9"];

/** The tests taught in Materi A1–A2 for each mechanism, and the pair tests. */
export const LEVEL_TESTS = bi([
  { name: t("Reward", "Belohnung"), test: t("Does the customer get something extra for an action: points, a benefit, a prize, a voucher?", "Bekommt der Kunde für eine Handlung etwas zusätzlich: Punkte, einen Vorteil, einen Preis, einen Gutschein?") },
  { name: t("Competition and comparison", "Wettbewerb und Vergleich"), test: t("Does the customer see how they stand against others: a ranking, a benchmark, a race?", "Sieht der Kunde, wie er im Vergleich zu anderen steht: eine Rangliste, ein Benchmark, ein Wettlauf?") },
  { name: t("Progress and status", "Fortschritt und Status"), test: t("Does the customer see their own way towards a goal, or reach a level by what they did?", "Sieht der Kunde seinen eigenen Weg zu einem Ziel, oder erreicht er eine Stufe durch das, was er getan hat?") },
  { name: t("Reward or status?", "Belohnung oder Status?"), test: t("A reward is given for a single action. A status is reached by a level of use and stays as long as the use does, even if it brings a benefit.", "Eine Belohnung wird für eine einzelne Handlung gegeben. Ein Status wird durch eine Nutzungsstufe erreicht und bleibt, solange die Nutzung bleibt, auch wenn er einen Vorteil bringt.") },
  { name: t("Competition or progress?", "Wettbewerb oder Fortschritt?"), test: t("Ask against whom the customer measures themselves. Against others: competition or comparison. Against their own goal: progress.", "Fragen Sie, woran sich der Kunde misst. An anderen: Wettbewerb oder Vergleich. An seinem eigenen Ziel: Fortschritt.") },
]);
