import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Blocks 2.1–2.3. Four kinds of metric (Materi A5) and twelve metrics EngageIT reports today about platform use, game
 * elements and retention, each with whether it moved together with customer value last year; the A/B test card of Block 2.3 (Materi
 * A6). (Identifiers keep the names of the file this was built from: a "pattern" is a kind of metric, a "record" is one metric, and the
 * outcome "left" means "moved with customer value".) Every figure is a Case assumption. `truth` is never printed outside the mentor
 * answer key. Counts are 3/3/3/3.
 */
export type PatternId = "outcome" | "driver" | "guardrail" | "vanity";
export const PATTERN_IDS: PatternId[] = ["outcome", "driver", "guardrail", "vanity"];

export const PATTERNS = bi({
  outcome: {
    id: "outcome" as PatternId,
    label: t("Outcome KPI", "Outcome-KPI"),
    means: t("The result the business is paid for: customers kept, revenue from existing customers, customers who buy more. It moves last.", "Das Ergebnis, für das das Unternehmen bezahlt wird: gehaltene Kunden, Umsatz mit Bestandskunden, Kunden, die mehr kaufen. Es bewegt sich zuletzt."),
    shape: t("the top of the tree", "die Spitze des Baums"),
    test: t("Is it money, or customers kept or growing?", "Ist es Geld, oder gehaltene oder wachsende Kunden?"),
  },
  driver: {
    id: "driver" as PatternId,
    label: t("Driver KPI", "Treiber-KPI"),
    means: t("Something customers do in the product before the result that a team can move this month: accounts active every week, core features used, setup paths completed.", "Etwas, das Kunden im Produkt vor dem Ergebnis tun und das ein Team diesen Monat bewegen kann: jede Woche aktive Konten, genutzte Kernfunktionen, abgeschlossene Einrichtungspfade."),
    shape: t("a branch under the top", "ein Ast unter der Spitze"),
    test: t("Is it real use of the product before the renewal, and can a team change it this month?", "Ist es echte Nutzung des Produkts vor der Verlängerung, und kann ein Team es diesen Monat ändern?"),
  },
  guardrail: {
    id: "guardrail" as PatternId,
    label: t("Guardrail", "Guardrail (Leitplanke)"),
    means: t("Something that must not get worse while you add game elements: the cost of rewards, accounts that game the system, users who find it childish or annoying.", "Etwas, das nicht schlechter werden darf, während Sie Spielelemente hinzufügen: die Kosten der Belohnungen, Konten, die das System austricksen, Nutzer, die es kindisch oder störend finden."),
    shape: t("a fence beside the tree", "ein Zaun neben dem Baum"),
    test: t("Would you stop an approach if this got worse, even while activity rises?", "Würden Sie einen Ansatz stoppen, wenn das schlechter wird, auch wenn die Aktivität steigt?"),
  },
  vanity: {
    id: "vanity" as PatternId,
    label: t("Vanity metric", "Vanity Metric"),
    means: t("Counts what the game hands out or how often people click: points issued, badges awarded, logins. Looks like progress, decides nothing.", "Zählt, was das Spiel verteilt oder wie oft Menschen klicken: vergebene Punkte, verliehene Badges, Anmeldungen. Sieht nach Fortschritt aus, entscheidet nichts."),
    shape: t("outside the tree", "außerhalb des Baums"),
    test: t("Does it count what the game gave out or how often people clicked, rather than what customers achieved?", "Zählt es, was das Spiel verteilt hat oder wie oft Menschen geklickt haben, statt was Kunden erreicht haben?"),
  },
});

export const PATTERN_PAIR_TESTS = bi([
  { pair: t("Outcome or driver?", "Outcome oder Treiber?"), test: t("Ask whether it is the result itself (money, customers kept) or something customers do in the product that leads to it. The result moves last; the driver moves first.", "Fragen Sie, ob es das Ergebnis selbst ist (Geld, gehaltene Kunden) oder etwas, das Kunden im Produkt tun und das dazu führt. Das Ergebnis bewegt sich zuletzt; der Treiber zuerst.") },
  { pair: t("Driver or vanity?", "Treiber oder Vanity?"), test: t("A login or a badge costs a user one click; using a core feature for real work takes a decision. A driver counts real use, not activity the game rewards.", "Eine Anmeldung oder ein Badge kostet einen Nutzer einen Klick; eine Kernfunktion für echte Arbeit zu nutzen, erfordert eine Entscheidung. Ein Treiber zählt echte Nutzung, nicht Aktivität, die das Spiel belohnt.") },
  { pair: t("Guardrail or driver?", "Guardrail oder Treiber?"), test: t("A driver is pushed; a guardrail is only watched so that it does not get worse. You would never set a target to raise the cost of rewards.", "Ein Treiber wird vorangetrieben; eine Guardrail wird nur beobachtet, damit sie nicht schlechter wird. Niemand setzt ein Ziel, die Kosten der Belohnungen zu erhöhen.") },
]);

export type RecId = "p01" | "p02" | "p03" | "p04" | "p05" | "p06" | "p07" | "p08" | "p09" | "p10" | "p11" | "p12";
/** outcome "left" = moved with customer value last year; "stayed" = did not move with it. */
export type Record_ = { id: RecId; code: string; text: string; outcome: "stayed" | "left"; truth: PatternId; clue: string; why: string; rejected: Partial<Record<PatternId, string>> };
export const OUTCOME_LABEL = bi({ stayed: t("Did not move with customer value", "Bewegte sich nicht mit dem Kundenwert"), left: t("Moved with customer value", "Bewegte sich mit dem Kundenwert") });

export const RECORDS: Record_[] = bi([
  { id: "p01" as RecId, code: "M-01", outcome: "left" as const, text: t("Share of accounts that renew their contract.", "Anteil der Konten, die ihren Vertrag verlängern."), truth: "outcome" as PatternId, clue: t("Customers kept: the result, or a step on the way?", "Gehaltene Kunden: das Ergebnis oder ein Schritt auf dem Weg?"), why: t("Customers kept are the result the retention measures are for: an outcome KPI.", "Gehaltene Kunden sind das Ergebnis, für das die Bindungsmaßnahmen da sind: ein Outcome-KPI."), rejected: { driver: t("A renewal is the result itself, not something that leads to it.", "Eine Verlängerung ist das Ergebnis selbst, nicht etwas, das dazu führt.") } },
  { id: "p02" as RecId, code: "M-02", outcome: "left" as const, text: t("Revenue from existing customers per quarter.", "Umsatz mit Bestandskunden pro Quartal."), truth: "outcome" as PatternId, clue: t("Is this money, or a behaviour that may lead to money?", "Ist das Geld, oder ein Verhalten, das zu Geld führen kann?"), why: t("Revenue is money: an outcome KPI, and it moves last.", "Umsatz ist Geld: ein Outcome-KPI, und er bewegt sich zuletzt."), rejected: { driver: t("Nobody can raise revenue this month directly; it follows the drivers.", "Niemand kann den Umsatz diesen Monat direkt erhöhen; er folgt den Treibern.") } },
  { id: "p03" as RecId, code: "M-03", outcome: "left" as const, text: t("Share of accounts that bought an additional module this year.", "Anteil der Konten, die dieses Jahr ein zusätzliches Modul gekauft haben."), truth: "outcome" as PatternId, clue: t("A purchase, or a step before one?", "Ein Kauf oder ein Schritt davor?"), why: t("Customers who buy more are a result: an outcome KPI.", "Kunden, die mehr kaufen, sind ein Ergebnis: ein Outcome-KPI."), rejected: { driver: t("Trying a module is a driver; buying it is the result.", "Ein Modul auszuprobieren ist ein Treiber; es zu kaufen ist das Ergebnis.") } },
  { id: "p04" as RecId, code: "M-04", outcome: "left" as const, text: t("Share of accounts using three or more core features.", "Anteil der Konten, die drei oder mehr Kernfunktionen nutzen."), truth: "driver" as PatternId, clue: t("Does it come before the renewal, and can a team move it this month?", "Kommt es vor der Verlängerung, und kann ein Team es diesen Monat bewegen?"), why: t("Real use of the product comes before the renewal, and Customer Success can raise it at once: a driver KPI.", "Echte Nutzung des Produkts kommt vor der Verlängerung, und Customer Success kann sie sofort steigern: ein Treiber-KPI."), rejected: { vanity: t("It counts use for real work, not clicks the game rewards.", "Es zählt Nutzung für echte Arbeit, nicht Klicks, die das Spiel belohnt.") } },
  { id: "p05" as RecId, code: "M-05", outcome: "left" as const, text: t("Share of new accounts that complete the setup path in 90 days.", "Anteil der neuen Konten, die den Einrichtungspfad in 90 Tagen abschließen."), truth: "driver" as PatternId, clue: t("A customer's step on the way to renewing. Is it the renewal?", "Ein Schritt des Kunden auf dem Weg zur Verlängerung. Ist es die Verlängerung?"), why: t("Completing the setup path means the key features are in use before any renewal: a driver KPI.", "Den Einrichtungspfad abzuschließen heißt, die wichtigsten Funktionen sind vor jeder Verlängerung in Gebrauch: ein Treiber-KPI."), rejected: { outcome: t("A completed path is not yet a renewal; M-01 counts those.", "Ein abgeschlossener Pfad ist noch keine Verlängerung; M-01 zählt diese.") } },
  { id: "p06" as RecId, code: "M-06", outcome: "stayed" as const, text: t("Share of accounts whose users take part in a team challenge.", "Anteil der Konten, deren Nutzer an einer Team-Challenge teilnehmen."), truth: "driver" as PatternId, clue: t("Tag what it measures, not whether it moved. Whose action is it?", "Ordnen Sie zu, was es misst, nicht ob es sich bewegte. Wessen Handlung ist es?"), why: t("Taking part in a challenge is a customer action before a renewal that a team can change: a driver KPI. It did not move with value last year, which is a finding, not another kind.", "An einer Challenge teilzunehmen ist eine Kundenhandlung vor der Verlängerung, die ein Team ändern kann: ein Treiber-KPI. Sie bewegte sich letztes Jahr nicht mit dem Wert, das ist ein Befund, keine andere Art."), rejected: { vanity: t("Users had to take part; it is not what the game handed out.", "Nutzer mussten teilnehmen; es ist nicht, was das Spiel verteilt hat.") } },
  { id: "p07" as RecId, code: "M-07", outcome: "left" as const, text: t("Cost of rewards per active account.", "Kosten der Belohnungen pro aktivem Konto."), truth: "guardrail" as PatternId, clue: t("Would anyone set a target to raise it, or only watch that it does not rise?", "Würde jemand ein Ziel setzen, es zu erhöhen, oder nur darauf achten, dass es nicht steigt?"), why: t("Activity bought with ever bigger rewards is not sustainable: a guardrail on economic viability.", "Mit immer größeren Belohnungen gekaufte Aktivität ist nicht nachhaltig: eine Guardrail für die Wirtschaftlichkeit."), rejected: { outcome: t("It is a cost, not the result EngageIT is paid for.", "Es sind Kosten, nicht das Ergebnis, für das EngageIT bezahlt wird.") } },
  { id: "p08" as RecId, code: "M-08", outcome: "stayed" as const, text: t("Accounts with suspicious activity to collect points (e.g. 50 logins a day), per month.", "Konten mit verdächtiger Aktivität zum Punktesammeln (z. B. 50 Anmeldungen am Tag), pro Monat."), truth: "guardrail" as PatternId, clue: t("If this rose while activity rose, would you stop?", "Würden Sie stoppen, wenn das stiege, während die Aktivität steigt?"), why: t("A limit on artificial behaviour: points that invite gaming count clicks, not value. A guardrail.", "Eine Grenze für künstliches Verhalten: Punkte, die zum Austricksen einladen, zählen Klicks, nicht Wert. Eine Guardrail."), rejected: { driver: t("Nobody would push it up; it is watched so that it stays low.", "Niemand würde es steigern; es wird beobachtet, damit es niedrig bleibt.") } },
  { id: "p09" as RecId, code: "M-09", outcome: "stayed" as const, text: t("Users who switch off game elements or call them annoying, per 1,000 users.", "Nutzer, die Spielelemente abschalten oder störend nennen, pro 1.000 Nutzer."), truth: "guardrail" as PatternId, clue: t("Is this a result, something you push, or a limit you watch?", "Ist das ein Ergebnis, etwas, das Sie vorantreiben, oder eine Grenze, die Sie beobachten?"), why: t("Game elements that feel childish or pushy cost goodwill: a guardrail on the experience.", "Spielelemente, die kindisch oder aufdringlich wirken, kosten Wohlwollen: eine Guardrail für das Erlebnis."), rejected: { vanity: t("It is what users feel, not what the game handed out.", "Es ist, was Nutzer empfinden, nicht was das Spiel verteilt hat.") } },
  { id: "p10" as RecId, code: "M-10", outcome: "stayed" as const, text: t("Points issued per month.", "Vergebene Punkte pro Monat."), truth: "vanity" as PatternId, clue: t("More points. Did any customer use the product better?", "Mehr Punkte. Hat irgendein Kunde das Produkt besser genutzt?"), why: t("It counts what the game handed out: a vanity metric. What customers use (M-04) is what counts.", "Es zählt, was das Spiel verteilt hat: eine Vanity Metric. Was Kunden nutzen (M-04), zählt."), rejected: { driver: t("Points are issued by EngageIT; a driver is something customers do.", "Punkte vergibt EngageIT; ein Treiber ist etwas, das Kunden tun.") } },
  { id: "p11" as RecId, code: "M-11", outcome: "stayed" as const, text: t("Badges awarded per month.", "Verliehene Badges pro Monat."), truth: "vanity" as PatternId, clue: t("Who acted: customers, or the game?", "Wer hat gehandelt: Kunden oder das Spiel?"), why: t("It counts what the game gave out: a vanity metric.", "Es zählt, was das Spiel verteilt hat: eine Vanity Metric."), rejected: { driver: t("A badge is handed out; a driver is real use.", "Ein Badge wird verteilt; ein Treiber ist echte Nutzung.") } },
  { id: "p12" as RecId, code: "M-12", outcome: "stayed" as const, text: t("Logins per month.", "Anmeldungen pro Monat."), truth: "vanity" as PatternId, clue: t("Does logging in count what customers did with the platform?", "Zählt das Anmelden, was Kunden mit der Plattform taten?"), why: t("A login is not use: a vanity metric, and the first number a points scheme inflates.", "Eine Anmeldung ist keine Nutzung: eine Vanity Metric, und die erste Zahl, die ein Punkteprogramm aufbläht."), rejected: { guardrail: t("Nobody would stop a measure because logins rose; it is only activity.", "Niemand würde eine Maßnahme stoppen, weil die Anmeldungen stiegen; es ist nur Aktivität.") } },
]);
export const REC_IDS: RecId[] = ["p01", "p02", "p03", "p04", "p05", "p06", "p07", "p08", "p09", "p10", "p11", "p12"];
export const REC_BY_ID = Object.fromEntries(RECORDS.map((r) => [r.id, r])) as Record<RecId, Record_>;

const zero = () => ({ outcome: 0, driver: 0, guardrail: 0, vanity: 0 }) as Record<PatternId, number>;
export const TRUTH_COUNTS: Record<PatternId, number> = RECORDS.reduce((o, x) => ({ ...o, [x.truth]: o[x.truth] + 1 }), zero());
export const TRUTH_LEFT: Record<PatternId, number> = RECORDS.reduce((o, x) => ({ ...o, [x.truth]: o[x.truth] + (x.outcome === "left" ? 1 : 0) }), zero());

/* ------------------------------------------------------------------ Block 2.2 · link to value, what each kind tells management, how to use it */

export type Risk = "high" | "mid" | "low";
export const RISK_LABEL = bi({ high: t("Strong", "Stark"), mid: t("Partial", "Teilweise"), low: t("None", "Keine") });
export const RISK_GLYPH: Record<Risk, string> = { high: "●", mid: "◐", low: "○" };
export const riskOf = (moved: number, count: number): Risk | null => (count === 0 ? null : moved / count >= 0.5 ? "high" : moved > 0 ? "mid" : "low");
export const RISK_RULE = bi({ v: t("Link to customer value from last year: half or more of the kind's metrics moved with customer value = Strong; some did = Partial; none did = None.", "Verbindung zum Kundenwert aus dem letzten Jahr: Die Hälfte oder mehr der Kennzahlen dieser Art bewegte sich mit dem Kundenwert = Stark; einige = Teilweise; keine = Keine.") });

export type MeaningId = "result" | "early" | "limit" | "activity";
export const MEANINGS = bi([
  { id: "result" as MeaningId, label: t("The result we are paid for; it moves last", "Das Ergebnis, für das wir bezahlt werden; es bewegt sich zuletzt") },
  { id: "early" as MeaningId, label: t("An early signal a team can move this month", "Ein frühes Signal, das ein Team diesen Monat bewegen kann") },
  { id: "limit" as MeaningId, label: t("A limit: it must not get worse while we add game elements", "Eine Grenze: Sie darf nicht schlechter werden, während wir Spielelemente hinzufügen") },
  { id: "activity" as MeaningId, label: t("What the game hands out or how often people click; it says nothing about value", "Was das Spiel verteilt oder wie oft Menschen klicken; es sagt nichts über den Wert") },
]);
export const MEANING_TRUTH: Record<PatternId, MeaningId> = { outcome: "result", driver: "early", guardrail: "limit", vanity: "activity" };

export type PMeasureId = "target" | "weekly" | "stop" | "drop" | "bonus";
export const PMEASURES = bi([
  { id: "target" as PMeasureId, label: t("Set the target on the management dashboard and judge every measure by it", "Das Ziel im Management-Dashboard setzen und jede Maßnahme daran messen") },
  { id: "weekly" as PMeasureId, label: t("Give it to the Customer Success team and review it every week", "Es dem Customer-Success-Team geben und jede Woche prüfen") },
  { id: "stop" as PMeasureId, label: t("Set a limit that stops a test or a rollout when it is crossed", "Eine Grenze setzen, die einen Test oder Rollout stoppt, wenn sie überschritten wird") },
  { id: "drop" as PMeasureId, label: t("Stop reporting it as success", "Aufhören, es als Erfolg zu berichten") },
  { id: "bonus" as PMeasureId, label: t("Pay a bonus on it to the team that reports it", "Dem Team, das es berichtet, einen Bonus darauf zahlen") },
]);
export const MEASURE_TRUTH: Record<PatternId, PMeasureId> = { outcome: "target", driver: "weekly", guardrail: "stop", vanity: "drop" };
export type PatternRow = { risk: Risk | null; meaning: MeaningId | null; measure: PMeasureId | null };

export type UncId = "sample" | "cause" | "missing" | "shift" | "objective" | "highsafe" | "moredata";
export const UNCERTAINTIES = bi([
  { id: "sample" as UncId, label: t("180 renewals after the path is a base from one year only; another year would confirm the lift", "180 Verlängerungen nach dem Pfad sind eine Basis aus nur einem Jahr; ein weiteres Jahr würde den Lift bestätigen"), real: true, why: t("One year can hold a good or a bad year for the whole market; a second year shows whether the lift repeats (Materi A6).", "Ein Jahr kann ein gutes oder schlechtes Jahr für den ganzen Markt enthalten; ein zweites Jahr zeigt, ob sich der Lift wiederholt (Materi A6).") },
  { id: "cause" as UncId, label: t("Accounts that completed the path may have been more engaged to begin with, so the path may not be the whole cause", "Konten, die den Pfad abgeschlossen haben, waren vielleicht von Anfang an engagierter, also ist der Pfad vielleicht nicht die ganze Ursache"), real: true, why: t("Motivated customers finish paths and renew; only a fair test shows how much the path itself adds.", "Motivierte Kunden schließen Pfade ab und verlängern; nur ein fairer Test zeigt, wie viel der Pfad selbst beiträgt.") },
  { id: "missing" as UncId, label: t("Use outside the platform's tracking (exports, the mobile app offline) is not counted at all", "Nutzung außerhalb des Trackings der Plattform (Exporte, die mobile App offline) wird gar nicht gezählt"), real: true, why: t("What is not recorded cannot be counted; the real figures may differ in either direction.", "Was nicht erfasst wird, kann nicht gezählt werden; die echten Zahlen können in beide Richtungen abweichen.") },
  { id: "shift" as UncId, label: t("A new release or a price change can change how accounts use the platform next year", "Ein neues Release oder eine Preisänderung kann ändern, wie Konten die Plattform im nächsten Jahr nutzen"), real: true, why: t("A forecast assumes the past repeats; a changed product changes what customers use.", "Eine Prognose nimmt an, dass sich die Vergangenheit wiederholt; ein verändertes Produkt ändert, was Kunden nutzen.") },
  { id: "objective" as UncId, label: t("The more points, the more motivation", "Je mehr Punkte, desto mehr Motivation"), real: false, why: t("More points buy more clicks, not more real use; once they stop, the activity stops (Materi A1, A6).", "Mehr Punkte kaufen mehr Klicks, nicht mehr echte Nutzung; hören sie auf, hört die Aktivität auf (Materi A1, A6).") },
  { id: "highsafe" as UncId, label: t("Every user enjoys games", "Jeder Nutzer mag Spiele"), real: false, why: t("Some users find rankings or badges childish or stressful; the mechanism has to fit what motivates them (Materi A3).", "Manche Nutzer finden Ranglisten oder Badges kindisch oder stressig; der Mechanismus muss zu dem passen, was sie motiviert (Materi A3).") },
  { id: "moredata" as UncId, label: t("Once customers play, they will stay whatever the product does", "Wenn Kunden spielen, bleiben sie, egal was das Produkt leistet"), real: false, why: t("A game on top of a product that does not help is decoration; motivation lasts only where the product creates value (Materi A1).", "Ein Spiel auf einem Produkt, das nicht hilft, ist Dekoration; Motivation hält nur, wo das Produkt Wert schafft (Materi A1).") },
]);
export const UNC_BY_ID = Object.fromEntries(UNCERTAINTIES.map((w) => [w.id, w])) as Record<UncId, (typeof UNCERTAINTIES)[number]>;

/* ------------------------------------------------------------------ Block 2.3 · an A/B test design */

export type AbPart = "change" | "control" | "kpi" | "size";
export const AB_PARTS: AbPart[] = ["change", "control", "kpi", "size"];
export type AbOption = { id: string; label: string; right: boolean; clue: string };
export const AB = bi({
  change: {
    label: t("What changes in the variant", "Was sich in der Variante ändert"),
    help: t("The one thing the test compares.", "Das eine, was der Test vergleicht."),
    options: [
      { id: "one", label: t("Only the setup path: a progress checklist for the six key steps in the first 90 days", "Nur der Einrichtungspfad: eine Fortschritts-Checkliste für die sechs wichtigsten Schritte in den ersten 90 Tagen"), right: true, clue: t("", "") },
      { id: "three", label: t("The path, points for every login and a public ranking, all at once", "Der Pfad, Punkte für jede Anmeldung und eine öffentliche Rangliste, alles auf einmal"), right: false, clue: t("If the variant wins, which of the changes made it win?", "Wenn die Variante gewinnt: Welche der Änderungen hat sie gewinnen lassen?") },
      { id: "channel", label: t("The path for large accounts, nothing for small ones", "Der Pfad für große Konten, nichts für kleine"), right: false, clue: t("Are large and small accounts the same kind of customer in the same situation?", "Sind große und kleine Konten dieselbe Art Kunde in derselben Lage?") },
    ],
  },
  control: {
    label: t("The control group", "Die Kontrollgruppe"),
    help: t("Whose new accounts start without the path, to compare against.", "Wessen neue Konten ohne den Pfad starten, als Vergleich."),
    options: [
      { id: "random", label: t("A random half of the new accounts, in the same weeks", "Eine zufällige Hälfte der neuen Konten, in denselben Wochen"), right: true, clue: t("", "") },
      { id: "lastyear", label: t("Last year's new accounts, before the path existed", "Die neuen Konten des letzten Jahres, bevor es den Pfad gab"), right: false, clue: t("Are these the same customers, at the same time, with the same product version?", "Sind das dieselben Kunden, zur selben Zeit, mit derselben Produktversion?") },
      { id: "nonopen", label: t("Accounts that chose not to open the path", "Konten, die den Pfad nicht öffnen wollten"), right: false, clue: t("Who chose to be in this group: chance, or the customers themselves?", "Wer hat entschieden, in dieser Gruppe zu sein: der Zufall oder die Kunden selbst?") },
    ],
  },
  kpi: {
    label: t("The success KPI", "Der Erfolgs-KPI"),
    help: t("The number that decides whether the variant won.", "Die Zahl, die entscheidet, ob die Variante gewonnen hat."),
    options: [
      { id: "conv", label: t("Share of accounts using three or more core features after 90 days", "Anteil der Konten, die nach 90 Tagen drei oder mehr Kernfunktionen nutzen"), right: true, clue: t("", "") },
      { id: "opens", label: t("Logins in the first 90 days", "Anmeldungen in den ersten 90 Tagen"), right: false, clue: t("The problem in the brief is low use of services. Does a login tell you whether a feature is used for real work?", "Das Problem im Auftrag ist geringe Nutzung der Services. Sagt eine Anmeldung, ob eine Funktion für echte Arbeit genutzt wird?") },
      { id: "sent", label: t("Badges earned on the path", "Auf dem Pfad verdiente Badges"), right: false, clue: t("Which kind of metric counts what the game handed out rather than what customers use?", "Welche Art von Kennzahl zählt, was das Spiel verteilt hat, statt was Kunden nutzen?") },
    ],
  },
  size: {
    label: t("Size and duration", "Größe und Dauer"),
    help: t("When the test has enough cases to read.", "Wann der Test genug Fälle hat, um ihn zu lesen."),
    options: [
      { id: "fixed", label: t("Fixed in advance: until each group has about 100 new accounts past their first 90 days, and at least one full quarter", "Vorab festgelegt: bis jede Gruppe etwa 100 neue Konten nach ihren ersten 90 Tagen hat, und mindestens ein volles Quartal"), right: true, clue: t("", "") },
      { id: "peek", label: t("Stop as soon as the path group is ahead", "Stoppen, sobald die Pfad-Gruppe vorn liegt"), right: false, clue: t("A share of active accounts swings week by week. What happens if you stop at a lucky moment?", "Ein Anteil aktiver Konten schwankt von Woche zu Woche. Was passiert, wenn Sie in einem glücklichen Moment stoppen?") },
      { id: "day", label: t("Two weeks, for a fast answer", "Zwei Wochen, für eine schnelle Antwort"), right: false, clue: t("How many new accounts have used three core features within two weeks?", "Wie viele neue Konten haben innerhalb von zwei Wochen drei Kernfunktionen genutzt?") },
    ],
  },
});
export type AbState = { change: string | null; control: string | null; kpi: string | null; size: string | null; hyp: string; rule: string };
export const emptyAb = (): AbState => ({ change: null, control: null, kpi: null, size: null, hyp: "", rule: "" });
export const AB_MODEL = { change: "one", control: "random", kpi: "conv", size: "fixed" };
/** A hypothesis states a change, an expected effect and a reason. A floor, not a judge: it needs "if … because". */
export const hasHypothesis = (s: string) => /\b(if|wenn|falls)\b/i.test(s) && /\b(because|since|as|weil|da|denn)\b/i.test(s);
/** A decision rule names a number to decide by. */
export const hasRuleNumber = (s: string) => /\d/.test(s);
