import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Blocks 2.1–2.3. Four kinds of metric (Materi A5) and twelve metrics EngageIT reports today, each with whether it moved
 * together with customer value last year; the A/B test card of Block 2.3 (Materi A6). (Identifiers keep the names of the file this was
 * built from: a "pattern" is a kind of metric, a "record" is one metric, and the outcome "left" means "moved with customer value".)
 * Every figure is a Case assumption. `truth` is never printed outside the mentor answer key. Counts are 3/3/3/3.
 */
export type PatternId = "outcome" | "driver" | "guardrail" | "vanity";
export const PATTERN_IDS: PatternId[] = ["outcome", "driver", "guardrail", "vanity"];

export const PATTERNS = bi({
  outcome: {
    id: "outcome" as PatternId,
    label: t("Outcome KPI", "Outcome-KPI"),
    means: t("The result the business is paid for: renewals, revenue, customers kept. It moves last.", "Das Ergebnis, für das das Unternehmen bezahlt wird: Verlängerungen, Umsatz, gehaltene Kunden. Es bewegt sich zuletzt."),
    shape: t("the top of the tree", "die Spitze des Baums"),
    test: t("Is it money, renewals or customers kept?", "Ist es Geld, Verlängerungen oder gehaltene Kunden?"),
  },
  driver: {
    id: "driver" as PatternId,
    label: t("Driver KPI", "Treiber-KPI"),
    means: t("Something customers do before they renew and that a team can move this month: finishing set-up, using more features, inviting a colleague.", "Etwas, das Kunden tun, bevor sie verlängern, und das ein Team diesen Monat bewegen kann: die Einrichtung abschließen, mehr Funktionen nutzen, einen Kollegen einladen."),
    shape: t("a branch under the top", "ein Ast unter der Spitze"),
    test: t("Does it come before the renewal, and can a team change it this month?", "Kommt es vor der Verlängerung, und kann ein Team es diesen Monat ändern?"),
  },
  guardrail: {
    id: "guardrail" as PatternId,
    label: t("Guardrail", "Guardrail (Leitplanke)"),
    means: t("Something that must not get worse while you add game elements: accounts that only collect points, customers who switch off prompts, tickets about unfair rewards.", "Etwas, das nicht schlechter werden darf, während Sie Spielelemente einführen: Konten, die nur Punkte sammeln, Kunden, die Hinweise abschalten, Tickets über unfaire Belohnungen."),
    shape: t("a fence beside the tree", "ein Zaun neben dem Baum"),
    test: t("Would you stop a game element if this got worse, even while usage rises?", "Würden Sie ein Spielelement stoppen, wenn das schlechter wird, auch wenn die Nutzung steigt?"),
  },
  vanity: {
    id: "vanity" as PatternId,
    label: t("Vanity metric", "Vanity Metric"),
    means: t("Counts our own activity or how much game there is: points awarded, badges issued, page views. Looks like engagement, decides nothing.", "Zählt unsere eigene Aktivität oder wie viel Spiel es gibt: vergebene Punkte, ausgegebene Badges, Seitenaufrufe. Sieht nach Engagement aus, entscheidet nichts."),
    shape: t("outside the tree", "außerhalb des Baums"),
    test: t("Does it count what we handed out or how many looked, rather than what customers did with the platform?", "Zählt es, was wir ausgegeben haben oder wie viele hingesehen haben, statt was Kunden mit der Plattform taten?"),
  },
});

export const PATTERN_PAIR_TESTS = bi([
  { pair: t("Outcome or driver?", "Outcome oder Treiber?"), test: t("Ask whether it is the result itself (money, renewals, customers kept) or something that leads to it. The result moves last; the driver moves first.", "Fragen Sie, ob es das Ergebnis selbst ist (Geld, Verlängerungen, gehaltene Kunden) oder etwas, das dazu führt. Das Ergebnis bewegt sich zuletzt; der Treiber zuerst.") },
  { pair: t("Driver or vanity?", "Treiber oder Vanity?"), test: t("Points, badges and page views rise without anyone renewing. A driver is closer to the renewal: a customer who finished set-up, who uses more features.", "Punkte, Badges und Seitenaufrufe steigen, ohne dass jemand verlängert. Ein Treiber ist näher an der Verlängerung: ein Kunde, der die Einrichtung abgeschlossen hat, der mehr Funktionen nutzt.") },
  { pair: t("Guardrail or driver?", "Guardrail oder Treiber?"), test: t("A driver is pushed; a guardrail is only watched so that it does not get worse. You would never set a target to raise the number of accounts that only collect points.", "Ein Treiber wird vorangetrieben; eine Guardrail wird nur beobachtet, damit sie nicht schlechter wird. Niemand setzt ein Ziel, die Zahl der Konten zu erhöhen, die nur Punkte sammeln.") },
]);

export type RecId = "p01" | "p02" | "p03" | "p04" | "p05" | "p06" | "p07" | "p08" | "p09" | "p10" | "p11" | "p12";
/** outcome "left" = moved with customer value last year; "stayed" = did not move with it. */
export type Record_ = { id: RecId; code: string; text: string; outcome: "stayed" | "left"; truth: PatternId; clue: string; why: string; rejected: Partial<Record<PatternId, string>> };
export const OUTCOME_LABEL = bi({ stayed: t("Did not move with customer value", "Bewegte sich nicht mit dem Kundenwert"), left: t("Moved with customer value", "Bewegte sich mit dem Kundenwert") });

export const RECORDS: Record_[] = bi([
  { id: "p01" as RecId, code: "M-01", outcome: "left" as const, text: t("Share of customers who renew their subscription.", "Anteil der Kunden, die ihr Abonnement verlängern."), truth: "outcome" as PatternId, clue: t("Does it count renewals, or something that comes before a renewal?", "Zählt es Verlängerungen, oder etwas, das vor einer Verlängerung kommt?"), why: t("It counts renewals, the result EngageIT is paid for: an outcome KPI.", "Es zählt Verlängerungen, das Ergebnis, für das EngageIT bezahlt wird: ein Outcome-KPI."), rejected: { driver: t("Finishing set-up comes before a renewal; this one counts the renewal itself.", "Die Einrichtung abzuschließen kommt vor einer Verlängerung; dies zählt die Verlängerung selbst.") } },
  { id: "p02" as RecId, code: "M-02", outcome: "left" as const, text: t("Revenue per customer per year, all modules.", "Umsatz pro Kunde und Jahr, alle Module."), truth: "outcome" as PatternId, clue: t("Is this money, or a behaviour that may lead to money?", "Ist das Geld, oder ein Verhalten, das zu Geld führen kann?"), why: t("Revenue is money: an outcome KPI, and it moves last.", "Umsatz ist Geld: ein Outcome-KPI, und er bewegt sich zuletzt."), rejected: { driver: t("Nobody can raise revenue per customer this month directly; it follows the drivers.", "Niemand kann den Umsatz pro Kunde diesen Monat direkt erhöhen; er folgt den Treibern.") } },
  { id: "p03" as RecId, code: "M-03", outcome: "left" as const, text: t("Share of customers still active twelve months after sign-up.", "Anteil der Kunden, die zwölf Monate nach der Anmeldung noch aktiv sind."), truth: "outcome" as PatternId, clue: t("Customers kept: result or step on the way?", "Gehaltene Kunden: Ergebnis oder Schritt auf dem Weg?"), why: t("Customers kept are a result: an outcome KPI.", "Gehaltene Kunden sind ein Ergebnis: ein Outcome-KPI."), rejected: { guardrail: t("Customers kept are pushed up, not only watched.", "Gehaltene Kunden werden nach oben getrieben, nicht nur beobachtet.") } },
  { id: "p04" as RecId, code: "M-04", outcome: "left" as const, text: t("Share of new customers who finish set-up within 30 days.", "Anteil der Neukunden, die die Einrichtung innerhalb von 30 Tagen abschließen."), truth: "driver" as PatternId, clue: t("Does it come before the renewal, and can a team move it this month?", "Kommt es vor der Verlängerung, und kann ein Team es diesen Monat bewegen?"), why: t("A customer who finishes set-up is far more likely to renew, and onboarding can raise it this month: a driver KPI.", "Ein Kunde, der die Einrichtung abschließt, verlängert viel wahrscheinlicher, und das Onboarding kann es diesen Monat steigern: ein Treiber-KPI."), rejected: { vanity: t("It is not reach or activity; it is a step customers take that leads to staying.", "Es ist keine Reichweite oder Aktivität; es ist ein Schritt der Kunden, der zum Bleiben führt.") } },
  { id: "p05" as RecId, code: "M-05", outcome: "left" as const, text: t("Number of features a customer uses each month.", "Zahl der Funktionen, die ein Kunde jeden Monat nutzt."), truth: "driver" as PatternId, clue: t("A step on the way to a renewal that a team can influence. Is it the renewal?", "Ein Schritt auf dem Weg zur Verlängerung, den ein Team beeinflussen kann. Ist es die Verlängerung?"), why: t("Broad use comes before the renewal and product teams can change it: a driver KPI.", "Breite Nutzung kommt vor der Verlängerung, und Produktteams können sie ändern: ein Treiber-KPI."), rejected: { outcome: t("Using more features is not yet a renewal.", "Mehr Funktionen zu nutzen ist noch keine Verlängerung.") } },
  { id: "p06" as RecId, code: "M-06", outcome: "stayed" as const, text: t("Share of customers who invite a colleague in the first 60 days.", "Anteil der Kunden, die in den ersten 60 Tagen einen Kollegen einladen."), truth: "driver" as PatternId, clue: t("Tag what it measures, not whether it moved. Whose behaviour is it?", "Ordnen Sie zu, was es misst, nicht ob es sich bewegte. Wessen Verhalten ist es?"), why: t("Inviting a colleague is customer behaviour before the renewal that EngageIT can influence: a driver KPI. It did not move with value last year, which is a finding, not another kind.", "Einen Kollegen einzuladen ist Kundenverhalten vor der Verlängerung, das EngageIT beeinflussen kann: ein Treiber-KPI. Es bewegte sich letztes Jahr nicht mit dem Wert; das ist ein Befund, keine andere Art."), rejected: { vanity: t("Customers do it, not EngageIT; that makes it more than reach.", "Kunden tun es, nicht EngageIT; das macht es zu mehr als Reichweite.") } },
  { id: "p07" as RecId, code: "M-07", outcome: "left" as const, text: t("Share of accounts with many points but almost no real use of the platform.", "Anteil der Konten mit vielen Punkten, aber kaum echter Nutzung der Plattform."), truth: "guardrail" as PatternId, clue: t("Would anyone set a target to raise it, or only watch that it does not rise?", "Würde jemand ein Ziel setzen, es zu erhöhen, oder nur darauf achten, dass es nicht steigt?"), why: t("Accounts that only collect points are the clearest sign of artificial behaviour: a guardrail.", "Konten, die nur Punkte sammeln, sind das deutlichste Zeichen künstlichen Verhaltens: eine Guardrail."), rejected: { driver: t("Nobody pushes these accounts up; you watch them as a limit.", "Niemand treibt diese Konten nach oben; man beobachtet sie als Grenze.") } },
  { id: "p08" as RecId, code: "M-08", outcome: "stayed" as const, text: t("Customers who switch off prompts and notifications, per month.", "Kunden, die Hinweise und Benachrichtigungen abschalten, pro Monat."), truth: "guardrail" as PatternId, clue: t("If this rose while usage rose, would you stop?", "Würden Sie stoppen, wenn das stiege, während die Nutzung steigt?"), why: t("A limit on pestering customers: when many switch the prompts off, the game is pushing too hard. A guardrail.", "Eine Grenze für das Bedrängen von Kunden: Schalten viele die Hinweise ab, drängt das Spiel zu stark. Eine Guardrail."), rejected: { outcome: t("It is not the result EngageIT is paid for; it is what must not get worse.", "Es ist nicht das Ergebnis, für das EngageIT bezahlt wird; es ist, was nicht schlechter werden darf.") } },
  { id: "p09" as RecId, code: "M-09", outcome: "stayed" as const, text: t("Support tickets about wrong or missing rewards, per 1,000 customers.", "Support-Tickets zu falschen oder fehlenden Belohnungen, pro 1.000 Kunden."), truth: "guardrail" as PatternId, clue: t("Is this a result, something you push, or a limit you watch?", "Ist das ein Ergebnis, etwas, das Sie vorantreiben, oder eine Grenze, die Sie beobachten?"), why: t("A limit on fairness: if rewards go wrong, trust goes. A guardrail.", "Eine Grenze für Fairness: Gehen Belohnungen schief, geht das Vertrauen. Eine Guardrail."), rejected: { vanity: t("It says something about how customers feel, not about EngageIT's activity.", "Es sagt etwas darüber, wie Kunden sich fühlen, nicht über die Aktivität von EngageIT.") } },
  { id: "p10" as RecId, code: "M-10", outcome: "stayed" as const, text: t("Points awarded in total per month.", "Insgesamt vergebene Punkte pro Monat."), truth: "vanity" as PatternId, clue: t("More points. Did any customer get value?", "Mehr Punkte. Hat irgendein Kunde einen Nutzen?"), why: t("It counts what EngageIT handed out, not what customers did: a vanity metric. Points can rise because the rules are easy.", "Es zählt, was EngageIT ausgegeben hat, nicht was Kunden taten: eine Vanity Metric. Punkte können steigen, weil die Regeln leicht sind."), rejected: { driver: t("Handing out points is not a customer step towards a renewal.", "Punkte zu vergeben ist kein Schritt des Kunden zur Verlängerung.") } },
  { id: "p11" as RecId, code: "M-11", outcome: "stayed" as const, text: t("Badges issued.", "Ausgegebene Badges."), truth: "vanity" as PatternId, clue: t("A badge is issued once. Does it count use?", "Ein Badge wird einmal ausgegeben. Zählt es Nutzung?"), why: t("Reach: badges rose while renewals did not. A vanity metric.", "Reichweite: Die Badges stiegen, die Verlängerungen nicht. Eine Vanity Metric."), rejected: { driver: t("Receiving a badge is not a step in a renewal decision.", "Ein Badge zu erhalten ist kein Schritt in einer Verlängerungsentscheidung.") } },
  { id: "p12" as RecId, code: "M-12", outcome: "stayed" as const, text: t("Visits to the leaderboard page.", "Besuche der Ranglisten-Seite."), truth: "vanity" as PatternId, clue: t("Does a visit count whether anyone did something useful?", "Zählt ein Besuch, ob jemand etwas Nützliches getan hat?"), why: t("It counts how many looked: a vanity metric. Whether accounts keep collecting points without real use (M-07) is what counts.", "Es zählt, wie viele hingesehen haben: eine Vanity Metric. Ob Konten weiter Punkte ohne echte Nutzung sammeln (M-07), zählt."), rejected: { guardrail: t("The accounts that only collect points are the limit (M-07); the number of visits is only reach.", "Die Konten, die nur Punkte sammeln, sind die Grenze (M-07); die Zahl der Besuche ist nur Reichweite.") } },
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
  { id: "limit" as MeaningId, label: t("A limit: it must not get worse while we add game elements", "Eine Grenze: Sie darf nicht schlechter werden, während wir Spielelemente einführen") },
  { id: "activity" as MeaningId, label: t("Our own activity or reach; it says nothing about customers", "Unsere eigene Aktivität oder Reichweite; sie sagt nichts über Kunden") },
]);
export const MEANING_TRUTH: Record<PatternId, MeaningId> = { outcome: "result", driver: "early", guardrail: "limit", vanity: "activity" };

export type PMeasureId = "target" | "weekly" | "stop" | "drop" | "bonus";
export const PMEASURES = bi([
  { id: "target" as PMeasureId, label: t("Set the target on the management dashboard and judge every measure by it", "Das Ziel im Management-Dashboard setzen und jede Maßnahme daran messen") },
  { id: "weekly" as PMeasureId, label: t("Give it to the team that owns onboarding and review it every week", "Es dem Team geben, dem das Onboarding gehört, und jede Woche prüfen") },
  { id: "stop" as PMeasureId, label: t("Set a limit that stops a game element when it is crossed", "Eine Grenze setzen, die ein Spielelement stoppt, wenn sie überschritten wird") },
  { id: "drop" as PMeasureId, label: t("Stop reporting it as success", "Aufhören, es als Erfolg zu berichten") },
  { id: "bonus" as PMeasureId, label: t("Pay a bonus on it to the team that reports it", "Dem Team, das es berichtet, einen Bonus darauf zahlen") },
]);
export const MEASURE_TRUTH: Record<PatternId, PMeasureId> = { outcome: "target", driver: "weekly", guardrail: "stop", vanity: "drop" };
export type PatternRow = { risk: Risk | null; meaning: MeaningId | null; measure: PMeasureId | null };

export type UncId = "sample" | "cause" | "missing" | "shift" | "objective" | "highsafe" | "moredata";
export const UNCERTAINTIES = bi([
  { id: "sample" as UncId, label: t("72 finished set-ups with the bar is a small base; a second cohort would confirm the lift", "72 abgeschlossene Einrichtungen mit der Leiste sind eine kleine Basis; eine zweite Kohorte würde den Lift bestätigen"), real: true, why: t("With fewer than about 100 finished set-ups per group, a few more or less move the lift a lot (Materi A6).", "Bei weniger als etwa 100 abgeschlossenen Einrichtungen pro Gruppe verschieben ein paar mehr oder weniger den Lift stark (Materi A6).") },
  { id: "cause" as UncId, label: t("The customers who saw the bar may have come through partners and been more engaged to begin with, so the bar may not be the whole cause", "Die Kunden, die die Leiste sahen, kamen vielleicht über Partner und waren von Anfang an engagierter, also ist die Leiste vielleicht nicht die ganze Ursache"), real: true, why: t("If the more engaged customers got the bar, part of the lift is the customer, not the bar. Only a fair test (a random split) shows how much the bar adds.", "Bekamen die engagierteren Kunden die Leiste, ist ein Teil des Lifts der Kunde, nicht die Leiste. Nur ein fairer Test (eine zufällige Aufteilung) zeigt, wie viel die Leiste bringt.") },
  { id: "missing" as UncId, label: t("Use in the mobile app is not logged, so part of what customers do is not counted at all", "Nutzung in der Mobile-App wird nicht protokolliert, also wird ein Teil dessen, was Kunden tun, gar nicht gezählt"), real: true, why: t("What is not recorded cannot be counted; the real figures may differ in either direction.", "Was nicht erfasst wird, kann nicht gezählt werden; die echten Zahlen können in beide Richtungen abweichen.") },
  { id: "shift" as UncId, label: t("A new release can change what customers use, so next year's customers may behave differently", "Ein neues Release kann ändern, was Kunden nutzen, also verhalten sich die Kunden im nächsten Jahr vielleicht anders"), real: true, why: t("A forecast assumes the past repeats; a new feature brings different use.", "Eine Prognose nimmt an, dass sich die Vergangenheit wiederholt; eine neue Funktion bringt andere Nutzung.") },
  { id: "objective" as UncId, label: t("More points always mean more motivation", "Mehr Punkte bedeuten immer mehr Motivation"), real: false, why: t("Points can rise because the rules are easy, or because customers chase them without real use: more points can mean artificial behaviour (Materi A1).", "Punkte können steigen, weil die Regeln leicht sind oder weil Kunden sie ohne echte Nutzung jagen: Mehr Punkte können künstliches Verhalten bedeuten (Materi A1).") },
  { id: "highsafe" as UncId, label: t("Once the game is live, the motivation lasts", "Sobald das Spiel läuft, hält die Motivation an"), real: false, why: t("Novelty wears off. A game element that works only while it is new, or while a prize is paid, fades (Materi A5 and A6).", "Neuheit nutzt sich ab. Ein Spielelement, das nur wirkt, solange es neu ist oder ein Preis gezahlt wird, verblasst (Materi A5 und A6).") },
  { id: "moredata" as UncId, label: t("The more badges we hand out, the more engaged customers are", "Je mehr Badges wir vergeben, desto engagierter sind die Kunden"), real: false, why: t("Badges count what EngageIT hands out, not what customers do. Engagement is shown by finished set-ups and features used (Materi A5).", "Badges zählen, was EngageIT vergibt, nicht was Kunden tun. Engagement zeigen abgeschlossene Einrichtungen und genutzte Funktionen (Materi A5).") },
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
      { id: "one", label: t("Only the set-up bar on the home screen", "Nur die Einrichtungsleiste auf dem Startbildschirm"), right: true, clue: t("", "") },
      { id: "three", label: t("The set-up bar, points and a leaderboard, all at once", "Einrichtungsleiste, Punkte und eine Rangliste, alles auf einmal"), right: false, clue: t("If the variant wins, which of the changes made it win?", "Wenn die Variante gewinnt: Welche der Änderungen hat sie gewinnen lassen?") },
      { id: "channel", label: t("The bar for customers who came through partners, none for direct customers", "Die Leiste für Kunden, die über Partner kamen, keine für Direktkunden"), right: false, clue: t("Are partner customers and direct customers the same people in the same situation?", "Sind Partnerkunden und Direktkunden dieselben Menschen in derselben Lage?") },
    ],
  },
  control: {
    label: t("The control group", "Die Kontrollgruppe"),
    help: t("Whose home screen stays as it is, to compare against.", "Wessen Startbildschirm bleibt, wie er ist, als Vergleich."),
    options: [
      { id: "random", label: t("A random half of the new customers, in the same weeks", "Eine zufällige Hälfte der Neukunden, in denselben Wochen"), right: true, clue: t("", "") },
      { id: "lastyear", label: t("Last quarter's new customers, before the bar existed", "Die Neukunden des letzten Quartals, bevor es die Leiste gab"), right: false, clue: t("Are these the same customers, at the same time, under the same conditions?", "Sind das dieselben Kunden, zur selben Zeit, unter denselben Bedingungen?") },
      { id: "nonopen", label: t("New customers who chose to hide the bar", "Neukunden, die sich entschieden haben, die Leiste auszublenden"), right: false, clue: t("Who chose to be in this group: chance, or the customers themselves?", "Wer hat entschieden, in dieser Gruppe zu sein: der Zufall oder die Kunden selbst?") },
    ],
  },
  kpi: {
    label: t("The success KPI", "Der Erfolgs-KPI"),
    help: t("The number that decides whether the variant won.", "Die Zahl, die entscheidet, ob die Variante gewonnen hat."),
    options: [
      { id: "conv", label: t("Share who finish set-up within 30 days", "Anteil, der die Einrichtung innerhalb von 30 Tagen abschließt"), right: true, clue: t("", "") },
      { id: "opens", label: t("Views of the bar", "Aufrufe der Leiste"), right: false, clue: t("The problem is customers who never get going. Does a view of the bar tell you whether more of them finished?", "Das Problem sind Kunden, die nie loslegen. Sagt ein Aufruf der Leiste, ob mehr von ihnen fertig wurden?") },
      { id: "sent", label: t("Points awarded per customer", "Vergebene Punkte pro Kunde"), right: false, clue: t("Which kind of metric counts what we hand out rather than whether customers moved towards a renewal?", "Welche Art von Kennzahl zählt, was wir ausgeben, statt ob Kunden sich einer Verlängerung näherten?") },
    ],
  },
  size: {
    label: t("Size and duration", "Größe und Dauer"),
    help: t("When the test has enough cases to read.", "Wann der Test genug Fälle hat, um ihn zu lesen."),
    options: [
      { id: "fixed", label: t("Fixed in advance: until each group has about 100 finished set-ups, and at least one full onboarding cycle", "Vorab festgelegt: bis jede Gruppe etwa 100 abgeschlossene Einrichtungen hat, und mindestens ein voller Onboarding-Zyklus"), right: true, clue: t("", "") },
      { id: "peek", label: t("Stop as soon as the variant is ahead on the dashboard", "Stoppen, sobald die Variante im Dashboard vorn liegt"), right: false, clue: t("A finish rate swings with every customer. What happens if you stop at a lucky moment?", "Eine Abschlussquote schwankt mit jedem Kunden. Was passiert, wenn Sie in einem glücklichen Moment stoppen?") },
      { id: "day", label: t("One week, for a fast answer", "Eine Woche, für eine schnelle Antwort"), right: false, clue: t("How many set-ups finish in one week, and does one week include customers who need longer?", "Wie viele Einrichtungen werden in einer Woche fertig, und enthält eine Woche Kunden, die länger brauchen?") },
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

/** The decisive phrase inside each metric's own text, for "Highlight the key words" (never which kind it points to). */
export const REC_KEY: Record<string, string> = bi({
  p01: t("customers who renew their subscription", "Kunden, die ihr Abonnement verlängern"),
  p02: t("Revenue per customer per year", "Umsatz pro Kunde und Jahr"),
  p03: t("still active twelve months after sign-up", "zwölf Monate nach der Anmeldung noch aktiv"),
  p04: t("new customers who finish set-up within 30 days", "Neukunden, die die Einrichtung innerhalb von 30 Tagen abschließen"),
  p05: t("features a customer uses each month", "Funktionen, die ein Kunde jeden Monat nutzt"),
  p06: t("invite a colleague in the first 60 days", "in den ersten 60 Tagen einen Kollegen einladen"),
  p07: t("many points but almost no real use", "vielen Punkten, aber kaum echter Nutzung"),
  p08: t("switch off prompts and notifications", "Hinweise und Benachrichtigungen abschalten"),
  p09: t("tickets about wrong or missing rewards", "Tickets zu falschen oder fehlenden Belohnungen"),
  p10: t("Points awarded in total", "vergebene Punkte"),
  p11: t("Badges issued", "Ausgegebene Badges"),
  p12: t("Visits to the leaderboard page", "Besuche der Ranglisten-Seite"),
});
