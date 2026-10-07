import type { ArchMiniCfg, BarsCfg, CompCfg, FairCfg, LiftCfg, MapCfg, RatesCfg, SceneCfg, ScoreCfg, StagesCfg, TreeCfg } from "@/components/materi/diagrams";
import { CASES_MIN, LIFT_ACT, LIFT_WATCH } from "@/data/route2";
import { JOINS_LABEL } from "@/data/measures";
import type { Joins } from "@/data/measures";
import { bi, euro, num, pct, t, tt } from "@/lib/lang";

/**
 * Everything the interactive diagrams of Materi A and B say, in one file (components/materi/diagrams.tsx draws them). Materi A uses the example
 * company Elbe Cloudwerk (a Hamburg provider of project software, Case assumption), Materi B uses Neckar Systeme (a Stuttgart IT provider, Case
 * assumption); never EngageIT, so the answer to a task block is never printed. All figures here are Case assumptions.
 */

/* ------------------------------------------------------------------ A1 · the three mechanisms, and what each does to a customer */

export const MECH: SceneCfg = bi({
  point: t(
    "A game element works when the customer already wants the result and the element only helps them get there. When the customer does it only for the prize, the behaviour is artificial and stops with the prize. Reward, competition, and progress and status are three ways to do it.",
    "Ein Spielelement wirkt, wenn der Kunde das Ergebnis ohnehin will und das Element ihm nur dorthin hilft. Tut der Kunde es nur für den Preis, ist das Verhalten künstlich und hört mit dem Preis auf. Belohnung, Wettbewerb sowie Fortschritt und Status sind drei Wege dazu.",
  ),
  aria: t("What the customer experiences for each mechanism", "Was der Kunde bei jedem Mechanismus erlebt"),
  groupLabel: t("Mechanism", "Mechanismus"),
  stateLabel: t("State", "Zustand"),
  groups: [
    { id: "reward", label: t("Reward", "Belohnung") },
    { id: "compete", label: t("Competition", "Wettbewerb") },
    { id: "progress", label: t("Progress and status", "Fortschritt und Status") },
  ],
  states: [
    { id: "real", label: t("Real value", "Echter Wert") },
    { id: "prize", label: t("Only for the prize", "Nur für den Preis") },
    { id: "much", label: t("Too much at once", "Zu viel auf einmal") },
  ],
  okState: "real",
  initial: { group: "reward", state: "real" },
  shown: {
    reward: {
      real: t("Elbe gives two free consultant hours to a customer whose first automated workflow goes live. The customer gets help with something they wanted anyway.", "Elbe gibt einem Kunden, dessen erster automatisierter Workflow live geht, zwei kostenlose Beraterstunden. Der Kunde bekommt Hilfe bei etwas, das er ohnehin wollte."),
      prize: t("Elbe gives 10 points for every login. Customers log in, see the points and log out again; nothing they do on the platform changes.", "Elbe gibt für jeden Login 10 Punkte. Kunden loggen sich ein, sehen die Punkte und loggen sich wieder aus; nichts von dem, was sie auf der Plattform tun, ändert sich."),
      much: t("Elbe gives points for logins, reports, invitations, ratings and clicks, each at a different rate. Nobody can say what earns what, and the points shop is full of small discounts.", "Elbe gibt Punkte für Logins, Berichte, Einladungen, Bewertungen und Klicks, jeweils zu einem anderen Satz. Niemand kann sagen, was was bringt, und der Punkteshop ist voller kleiner Rabatte."),
    },
    compete: {
      real: t("Each customer sees, privately, how its feature use compares with the average of similar companies, and which features the others use that it does not.", "Jeder Kunde sieht privat, wie seine Funktionsnutzung im Vergleich zum Durchschnitt ähnlicher Unternehmen aussieht, und welche Funktionen die anderen nutzen, die er nicht nutzt."),
      prize: t("A public top ten with a prize for the winner. The same large customers win every month, and the other customers stop looking.", "Eine öffentliche Top Ten mit einem Preis für den Gewinner. Dieselben großen Kunden gewinnen jeden Monat, und die anderen Kunden hören auf hinzusehen."),
      much: t("Leaderboards for customers, teams, regions and modules, updated daily. Customers spend their time on the board instead of on their work.", "Ranglisten für Kunden, Teams, Regionen und Module, täglich aktualisiert. Kunden verbringen ihre Zeit mit der Rangliste statt mit ihrer Arbeit."),
    },
    progress: {
      real: t("A bar shows “3 of 8 set-up steps done” and highlights the next one. At step 8 the customer has a working project.", "Eine Leiste zeigt „3 von 8 Einrichtungsschritten erledigt“ und hebt den nächsten hervor. Bei Schritt 8 hat der Kunde ein funktionierendes Projekt."),
      prize: t("A bar that fills with any click. Customers click to fill it without finishing set-up, and the bar says “complete” when nothing works yet.", "Eine Leiste, die sich mit jedem Klick füllt. Kunden klicken, um sie zu füllen, ohne die Einrichtung abzuschließen, und die Leiste sagt „fertig“, obwohl noch nichts funktioniert."),
      much: t("Levels, badges, streaks and quests at once. Customers collect badges, but nobody knows what level 4 means or what it is for.", "Stufen, Badges, Serien und Quests auf einmal. Kunden sammeln Badges, aber niemand weiß, was Stufe 4 bedeutet oder wofür sie gut ist."),
    },
  },
  read: {
    real: t("The customer would do it even without the element. The element only makes the way shorter or clearer, so it is real motivation, and it keeps working when the novelty is gone.", "Der Kunde würde es auch ohne das Element tun. Das Element macht den Weg nur kürzer oder klarer, also ist es echte Motivation, und sie wirkt weiter, wenn die Neuheit verflogen ist."),
    prize: t("The customer does it only for the prize. The behaviour is artificial: it stops the day the prize stops, and the click it buys says nothing about retention.", "Der Kunde tut es nur für den Preis. Das Verhalten ist künstlich: Es hört an dem Tag auf, an dem der Preis endet, und der Klick, den es kauft, sagt nichts über die Kundenbindung."),
    much: t("Every mechanism alone can work; all of them at once cannot be explained, tested or kept going. Over-complexity makes customers play the game instead of using the platform.", "Jeder Mechanismus allein kann wirken; alle auf einmal lassen sich nicht erklären, testen oder am Laufen halten. Übermaß an Komplexität lässt Kunden das Spiel spielen, statt die Plattform zu nutzen."),
  },
  steps: [
    { title: t("A reward that helps", "Eine Belohnung, die hilft"), say: t("Elbe Cloudwerk is an example company, not your case. It gives two consultant hours when a customer's first workflow goes live: help with something the customer wanted anyway.", "Elbe Cloudwerk ist ein Beispielunternehmen, nicht Ihr Fall. Es gibt zwei Beraterstunden, wenn der erste Workflow eines Kunden live geht: Hilfe bei etwas, das der Kunde ohnehin wollte."), look: t("the first card, with a solid frame", "die erste Karte, mit durchgezogenem Rahmen"), group: "reward", state: "real" },
    { title: t("A reward for a click", "Eine Belohnung für einen Klick"), say: t("Now Elbe gives 10 points for every login. Customers log in for the points and do nothing else: they would not do it without the prize.", "Jetzt gibt Elbe für jeden Login 10 Punkte. Kunden loggen sich für die Punkte ein und tun sonst nichts: Ohne den Preis täten sie es nicht."), look: t("the dashed first card", "die gestrichelte erste Karte"), group: "reward", state: "prize" },
    { title: t("The point", "Das Wichtigste"), say: t("Reward, competition, and progress and status can all work, but only where the customer wants the result and the element just helps. Try the three mechanisms and the three states.", "Belohnung, Wettbewerb sowie Fortschritt und Status können alle wirken, aber nur dort, wo der Kunde das Ergebnis will und das Element nur hilft. Probieren Sie die drei Mechanismen und die drei Zustände."), look: t("the progress bar with real value", "die Fortschrittsleiste mit echtem Wert"), group: "progress", state: "real" },
  ],
  sort: {
    title: t("A worked sort: three ideas at Elbe Cloudwerk", "Eine Beispielsortierung: drei Ideen bei Elbe Cloudwerk"),
    showLabel: t("Show the mechanism and why", "Mechanismus und Grund zeigen"),
    items: [
      { id: "a", text: t("“Customers who finish the admin course get a ‘Certified’ title on their profile.”", "„Kunden, die den Admin-Kurs abschließen, erhalten einen Titel ‚Zertifiziert‘ auf ihrem Profil.“"), tag: t("Progress and status", "Fortschritt und Status"), why: t("A title that stays the customer's, whatever others do: status.", "Ein Titel, der dem Kunden bleibt, egal was andere tun: Status.") },
      { id: "b", text: t("“The ten customers with the most automated workflows are named on a page.”", "„Die zehn Kunden mit den meisten automatisierten Workflows werden auf einer Seite genannt.“"), tag: t("Competition", "Wettbewerb"), why: t("Their place depends on what other customers do.", "Ihr Platz hängt davon ab, was andere Kunden tun.") },
      { id: "c", text: t("“Customers get one free training seat when they invite three colleagues.”", "„Kunden erhalten einen kostenlosen Schulungsplatz, wenn sie drei Kollegen einladen.“"), tag: t("Reward", "Belohnung"), why: t("Something is handed over for doing it.", "Für das Tun wird etwas übergeben.") },
    ],
  },
  footnote: t("Illustration on Elbe Cloudwerk (Case assumption). A dashed frame marks a state where the element buys a click or is too much.", "Illustration mit Elbe Cloudwerk (Fallannahme). Ein gestrichelter Rahmen markiert einen Zustand, in dem das Element einen Klick kauft oder zu viel ist."),
});

/* ------------------------------------------------------------------ A2 · what is left when the prize stops */

export const PRIZE: BarsCfg = bi({
  point: t(
    "A prize can lift a number for a while. Only an action the customer wants keeps going after the prize stops. So ask of every game element: would the customer do it without the prize?",
    "Ein Preis kann eine Zahl eine Zeit lang heben. Nur eine Handlung, die der Kunde will, geht weiter, wenn der Preis endet. Fragen Sie also bei jedem Spielelement: Würde der Kunde es ohne den Preis tun?",
  ),
  aria: t("Share of customers who do an action, while a prize is paid and after it stops", "Anteil der Kunden, die eine Handlung ausführen, solange ein Preis gezahlt wird und nachdem er endet"),
  states: [
    { id: "paid", label: t("While the prize is paid", "Solange der Preis gezahlt wird") },
    { id: "stopped", label: t("After the prize stops", "Nachdem der Preis endet") },
  ],
  initial: { state: "paid", row: "setup" },
  max: 100,
  unit: "%",
  stateToggleLabel: t("When", "Wann"),
  rowToggleLabel: t("Action", "Handlung"),
  rows: [
    { id: "setup", label: t("Finish a set-up step (customers want a working project)", "Einen Einrichtungsschritt abschließen (Kunden wollen ein funktionierendes Projekt)"), values: { paid: 60, stopped: 55 }, good: { paid: true, stopped: true } },
    { id: "invite", label: t("Invite a colleague (the platform becomes more useful)", "Einen Kollegen einladen (die Plattform wird nützlicher)"), values: { paid: 45, stopped: 38 }, good: { paid: true, stopped: true } },
    { id: "login", label: t("Log in for points (nothing else happens)", "Für Punkte einloggen (sonst passiert nichts)"), values: { paid: 85, stopped: 12 }, good: { paid: true, stopped: false } },
  ],
  steps: [
    { title: t("An action customers want", "Eine Handlung, die Kunden wollen"), say: t("Elbe Cloudwerk is an example company, not your case. Elbe paid a prize for finishing set-up steps. When the prize stopped, almost as many customers still did it: they wanted a working project.", "Elbe Cloudwerk ist ein Beispielunternehmen, nicht Ihr Fall. Elbe zahlte einen Preis fürs Abschließen von Einrichtungsschritten. Als der Preis endete, taten es fast ebenso viele Kunden weiter: Sie wollten ein funktionierendes Projekt."), look: t("the first bar, before and after", "der erste Balken, vorher und nachher"), state: "stopped", row: "setup" },
    { title: t("An action nobody wanted", "Eine Handlung, die niemand wollte"), say: t("Elbe also paid points for logins. While points were paid, 85% logged in; after they stopped, only 12%. Nobody wanted to log in: they wanted the points.", "Elbe zahlte auch Punkte für Logins. Solange Punkte gezahlt wurden, loggten sich 85 % ein; danach nur noch 12 %. Niemand wollte sich einloggen: Sie wollten die Punkte."), look: t("the third bar, which collapses", "der dritte Balken, der einbricht"), state: "stopped", row: "login" },
    { title: t("The point", "Das Wichtigste"), say: t("A prize lifts a number, but only the action customers want survives it. Switch the state and look at each bar.", "Ein Preis hebt eine Zahl, aber nur die Handlung, die Kunden wollen, überlebt ihn. Schalten Sie den Zustand um und sehen Sie sich jeden Balken an."), look: t("all three bars after the prize stops", "alle drei Balken nach dem Ende des Preises"), state: "stopped", row: "invite" },
  ],
  read: (row: string, state: string, v: number) =>
    row === "login"
      ? state === "paid"
        ? tt(`${v}% log in while 10 points are paid for every login. It looks like engagement.`, `${v} % loggen sich ein, solange für jeden Login 10 Punkte gezahlt werden. Es sieht nach Engagement aus.`)
        : tt(`${v}% still log in once the points stop: the behaviour was bought, not built. This is a short-term incentive, and a pile of accounts with many points and no real use is what it leaves behind.`, `${v} % loggen sich noch ein, sobald die Punkte enden: Das Verhalten war gekauft, nicht aufgebaut. Das ist ein kurzfristiger Anreiz, und er hinterlässt viele Konten mit vielen Punkten und ohne echte Nutzung.`)
      : state === "paid"
        ? tt(`${v}% do it while a prize is paid.`, `${v} % tun es, solange ein Preis gezahlt wird.`)
        : tt(`${v}% still do it after the prize stops: customers want the result, so the behaviour was real motivation. The prize only helped.`, `${v} % tun es weiter, nachdem der Preis endet: Kunden wollen das Ergebnis, also war das Verhalten echte Motivation. Der Preis half nur.`),
  footnote: t("Illustration on Elbe Cloudwerk (Case assumption). Share of customers who do the action in a week.", "Illustration mit Elbe Cloudwerk (Fallannahme). Anteil der Kunden, die die Handlung in einer Woche ausführen."),
});

/* ------------------------------------------------------------------ A3 · where game elements help, and where they plug in */

export const MOMENTS: MapCfg = bi({
  point: t(
    "A game element helps most where the customer wants the result and many stop. It can plug into what exists only where membership, referral or profile data already reaches the moment. Where neither is true, other work comes first.",
    "Ein Spielelement hilft am meisten dort, wo der Kunde das Ergebnis will und viele aufhören. Es kann sich nur dort an Bestehendes anschließen, wo Daten aus Mitgliedschaft, Empfehlung oder Profil den Moment schon erreichen. Wo beides nicht zutrifft, kommt andere Arbeit zuerst.",
  ),
  aria: t("Elbe Cloudwerk's moments by the share who stop and what is already connected", "Momente von Elbe Cloudwerk nach dem Anteil, der aufhört, und dem, was schon verbunden ist"),
  xTicks: [0, 25, 50, 75, 100],
  xUnit: "%",
  xAxisLabel: t("share who stop here →", "Anteil, der hier aufhört →"),
  rows: [t("all connected", "alles verbunden"), t("part connected", "ein Teil verbunden"), t("nothing connected", "nichts verbunden")],
  zones: [
    { x1: 0, x2: 100, r1: 0, r2: 1, kind: "teal", label: t("connected: a game element can plug in", "verbunden: Ein Spielelement kann sich anschließen"), lx: 50, lr: 0, color: "teal" },
    { x1: 25, x2: 100, r1: 0, r2: 2, kind: "hatch", label: t("customer wants the result + 25% stop: helps most", "Kunde will das Ergebnis + 25 % hören auf: hilft am meisten"), lx: 62, lr: 2, color: "amber" },
  ],
  items: [
    { id: "m1", name: t("Sign-up → first project", "Anmeldung → erstes Projekt"), x: 40, row: 2, square: true, glyph: "●", verdict: t("helps most", "hilft am meisten"), fact: t("40% stop · the customer wants the result · nothing connected", "40 % hören auf · der Kunde will das Ergebnis · nichts verbunden"), why: t("A first project is what the customer came for, and 40% stop before it: a progress path can carry them there.", "Ein erstes Projekt ist, wofür der Kunde kam, und 40 % hören davor auf: Ein Fortschrittspfad kann sie dorthin tragen.") },
    { id: "m2", name: t("Project → inviting colleagues", "Projekt → Kollegen einladen"), x: 30, row: 2, square: true, glyph: "●", verdict: t("helps most", "hilft am meisten"), fact: t("30% stop · the customer wants the result · nothing connected", "30 % hören auf · der Kunde will das Ergebnis · nichts verbunden"), why: t("Inviting colleagues is what makes the platform useful, and 30% stop there: a game element helps them take a step they already want.", "Kollegen einzuladen macht die Plattform nützlich, und 30 % hören dort auf: Ein Spielelement hilft ihnen bei einem Schritt, den sie ohnehin wollen.") },
    { id: "m3", name: t("Contract → membership welcome", "Vertrag → Mitgliedschafts-Willkommen"), x: 10, row: 0, square: false, glyph: "◐", verdict: t("can plug in", "kann sich anschließen"), fact: t("10% stop · no result to want · everything connected", "10 % hören auf · kein Ergebnis zu wollen · alles verbunden"), why: t("Membership, referral and profile all reach this moment, so a game element can plug into them. Only 10% stop, so it is not the moment that needs the most help.", "Mitgliedschaft, Empfehlung und Profil erreichen diesen Moment, also kann sich ein Spielelement daran anschließen. Nur 10 % hören auf, also braucht dieser Moment nicht die meiste Hilfe.") },
    { id: "m4", name: t("Ticket closed → next-feature tip", "Ticket geschlossen → Tipp für die nächste Funktion"), x: 15, row: 1, square: true, glyph: "◐", verdict: t("can plug in", "kann sich anschließen"), fact: t("15% stop · the customer wants the result · part connected", "15 % hören auf · der Kunde will das Ergebnis · ein Teil verbunden"), why: t("The profile data reaches this moment, so a personal tip can build on it. Only 15% stop, so it is not the most critical break.", "Die Profildaten erreichen diesen Moment, also kann ein persönlicher Tipp darauf aufbauen. Nur 15 % hören auf, also ist es nicht der kritischste Bruch.") },
    { id: "m5", name: t("Newsletter → platform", "Newsletter → Plattform"), x: 70, row: 2, square: false, glyph: "○", verdict: t("neither comes first", "keines kommt zuerst"), fact: t("70% stop · nobody wants to open it · nothing connected", "70 % hören auf · niemand will es öffnen · nichts verbunden"), why: t("Many stop, but nobody opens the platform because of a newsletter: a prize would buy clicks, not a habit.", "Viele hören auf, aber niemand öffnet die Plattform wegen eines Newsletters: Ein Preis würde Klicks kaufen, keine Gewohnheit.") },
    { id: "m6", name: t("Rating request → writing a rating", "Bewertungsanfrage → Bewertung schreiben"), x: 45, row: 2, square: false, glyph: "○", verdict: t("neither comes first", "keines kommt zuerst"), fact: t("45% stop · nobody wants to write it · nothing connected", "45 % hören auf · niemand will sie schreiben · nichts verbunden"), why: t("Many stop, but customers do not want to write a rating: a reward would buy ratings, not opinions.", "Viele hören auf, aber Kunden wollen keine Bewertung schreiben: Eine Belohnung würde Bewertungen kaufen, keine Meinungen.") },
  ],
  steps: [
    { title: t("Help here first", "Hier zuerst helfen"), say: t("Elbe Cloudwerk is an example company, not your case. At sign-up the customer wants a first project and 40% stop before it. A progress path can carry them: help here first.", "Elbe Cloudwerk ist ein Beispielunternehmen, nicht Ihr Fall. Bei der Anmeldung will der Kunde ein erstes Projekt, und 40 % hören davor auf. Ein Fortschrittspfad kann sie tragen: hier zuerst helfen."), look: t("square 1, in the hatched area at the bottom", "Quadrat 1, im schraffierten Bereich unten"), item: "m1" },
    { title: t("A game element can plug in here", "Hier kann sich ein Spielelement anschließen"), say: t("After a contract, membership, referral and profile all reach the moment, but only 10% stop. A game element can plug in there; it is not the biggest break.", "Nach einem Vertrag erreichen Mitgliedschaft, Empfehlung und Profil den Moment, aber nur 10 % hören auf. Ein Spielelement kann sich dort anschließen; es ist nicht der größte Bruch."), look: t("circle 3, in the teal row at the top", "Kreis 3, in der teal Zeile oben"), item: "m3" },
    { title: t("The point", "Das Wichtigste"), say: t("The newsletter loses 70%, but nobody wants to open the platform because of it. Help where the customer wants the result; plug in where data reaches. Try the dots.", "Der Newsletter verliert 70 %, aber niemand will deswegen die Plattform öffnen. Helfen Sie dort, wo der Kunde das Ergebnis will; schließen Sie dort an, wo Daten hinreichen. Probieren Sie die Punkte."), look: t("circle 5, in the bottom row", "Kreis 5, in der unteren Zeile"), item: "m5" },
  ],
  initial: "m1",
  toggleLabel: t("Moments", "Momente"),
  legend: t("Illustration on Elbe Cloudwerk (Case assumption). Squares are moments where the customer wants the result, circles are not. Hatched = 25% or more stop; teal = part or all of what Elbe runs is connected; the rest comes after.", "Illustration mit Elbe Cloudwerk (Fallannahme). Quadrate sind Momente, in denen der Kunde das Ergebnis will, Kreise nicht. Schraffiert = 25 % oder mehr hören auf; teal = ein Teil oder alles von dem, was Elbe betreibt, ist verbunden; der Rest kommt danach."),
});

/* ------------------------------------------------------------------ A4 · what a set-up bar is worth */

export const BAR_RATES: RatesCfg = bi({
  point: t(
    "A comparison gives two finish rates, one per group. Their ratio says how many times better the group with the bar did, and the difference, over a year of new customers, says what it is worth. A comparison the teams shaped is promising, not proof.",
    "Ein Vergleich gibt zwei Abschlussquoten, eine pro Gruppe. Ihr Verhältnis sagt, wie viel Mal besser die Gruppe mit der Leiste abschnitt, und der Unterschied, über ein Jahr Neukunden, sagt, was er wert ist. Ein Vergleich, den die Teams mitgeprägt haben, ist vielversprechend, kein Beweis.",
  ),
  aria: t("Elbe Cloudwerk: new customers with a set-up bar against new customers without it", "Elbe Cloudwerk: Neukunden mit Einrichtungsleiste gegen Neukunden ohne"),
  data: { control: { sent: 400, orders: 40 }, variant: { sent: 200, orders: 50 }, yearly: 800, order: 1000, min: 200, max: 3000, step: 100 },
  rateScale: 25,
  labels: {
    variant: t("With the set-up bar", "Mit Einrichtungsleiste"),
    control: t("Without the bar", "Ohne Leiste"),
    ofWord: t("of", "von"),
    slider: (n: number) => tt(`Elbe's new customers a year: ${num(n)}`, `Neukunden von Elbe pro Jahr: ${num(n)}`),
    lift: (rate: number, other: number, lift: number) => tt(`Lift = ${rate} ÷ ${other} = ${num(lift)} times as often`, `Lift = ${num(rate)} ÷ ${num(other)} = ${num(lift)}-mal so oft`),
  },
  steps: [
    { title: t("Two groups, two rates", "Zwei Gruppen, zwei Quoten"), yearlyMult: 1, look: t("the two bars and the amber line under them", "die zwei Balken und die bernsteinfarbene Zeile darunter"), say: (r: { rate: number; other: number; lift: number }) => tt(`Elbe Cloudwerk is an example company, not your case. New customers who saw the set-up bar finished at ${pct(r.rate, 1)}, against ${pct(r.other, 1)} without it: ${num(r.lift)} times as often.`, `Elbe Cloudwerk ist ein Beispielunternehmen, nicht Ihr Fall. Neukunden, die die Einrichtungsleiste sahen, schlossen zu ${pct(r.rate, 1)} ab, gegenüber ${pct(r.other, 1)} ohne sie: ${num(r.lift)}-mal so oft.`) },
    { title: t("Only the difference is extra", "Nur der Unterschied ist zusätzlich"), yearlyMult: 2, look: t("the slider at double the new customers, and the sum in “What this shows”", "der Regler bei doppelt so vielen Neukunden und die Rechnung in „Was das zeigt“"), say: (r: { other: number; extraAt: (y: number) => number }) => tt(`Without the bar, ${pct(r.other, 1)} would have finished anyway. On ${num(1600)} new customers a year the difference is worth about ${euro(r.extraAt(1600))}. The app does the arithmetic.`, `Ohne die Leiste hätten ohnehin ${pct(r.other, 1)} abgeschlossen. Bei ${num(1600)} Neukunden pro Jahr ist der Unterschied etwa ${euro(r.extraAt(1600))} wert. Die Rechnung übernimmt die App.`) },
    { title: t("The point", "Das Wichtigste"), yearlyMult: 1, look: t("the finished set-ups printed behind each bar", "die abgeschlossenen Einrichtungen, die hinter jedem Balken stehen"), say: () => tt("Two finish rates side by side turn “the bar seems to help” into a figure. But if the bar was shown mostly to engaged customers, the gap overstates it: promising, not proven.", "Zwei Abschlussquoten nebeneinander machen aus „die Leiste scheint zu helfen“ eine Zahl. Wurde die Leiste aber vor allem engagierten Kunden gezeigt, überschätzt der Abstand sie: vielversprechend, nicht bewiesen.") },
  ],
  insight: (v: { yearly: number; rate: number; other: number; extra: number; order: number; base: number }) =>
    tt(
      `${num(v.yearly)} new customers × (${pct(v.rate)} − ${pct(v.other)}) × ${euro(v.order)} = ${euro(v.extra)} extra a year if every new customer saw the bar. Only the difference counts: customers without the bar would have finished ${pct(v.other)} anyway. ${v.yearly === v.base ? `At ${num(v.base)} new customers the example gives ${euro(v.extra)}.` : `More new customers use the same lift more often: ${v.yearly > v.base ? "more" : "less"} extra revenue.`}`,
      `${num(v.yearly)} Neukunden × (${pct(v.rate)} − ${pct(v.other)}) × ${euro(v.order)} = ${euro(v.extra)} zusätzlich pro Jahr, wenn jeder Neukunde die Leiste sähe. Nur der Unterschied zählt: Kunden ohne die Leiste hätten ohnehin ${pct(v.other)} abgeschlossen. ${v.yearly === v.base ? `Bei ${num(v.base)} Neukunden ergibt das Beispiel ${euro(v.extra)}.` : `Mehr Neukunden nutzen denselben Lift öfter: ${v.yearly > v.base ? "mehr" : "weniger"} zusätzlicher Umsatz.`}`,
    ),
  footnote: t("Illustration on Elbe Cloudwerk (Case assumption). The extra revenue is the extra yearly value of a customer who finishes set-up, times how many more finish.", "Illustration mit Elbe Cloudwerk (Fallannahme). Der zusätzliche Umsatz ist der zusätzliche Jahreswert eines Kunden, der die Einrichtung abschließt, mal wie viele mehr abschließen."),
});

/* ------------------------------------------------------------------ A5 · a KPI tree for game elements */

const KIND_DE = { outcome: "ein Outcome-KPI", driver: "ein Treiber-KPI", guardrail: "eine Guardrail", vanity: "eine Vanity Metric" } as const;
export const KPI_TREE: TreeCfg = bi({
  point: t(
    "Not every number is a KPI. The result sits at the top, the behaviours that lead to it below, a limit that must not get worse beside it; numbers that only count what you handed out do not belong in the picture.",
    "Nicht jede Zahl ist ein KPI. Das Ergebnis steht oben, die Verhalten, die dorthin führen, darunter, eine Grenze, die nicht schlechter werden darf, daneben; Zahlen, die nur zählen, was Sie ausgegeben haben, gehören nicht ins Bild.",
  ),
  aria: t("Elbe Cloudwerk's metrics as a KPI tree", "Die Kennzahlen von Elbe Cloudwerk als KPI-Baum"),
  kindLabel: { outcome: t("Outcome KPI", "Outcome-KPI"), driver: t("Driver KPI", "Treiber-KPI"), guardrail: t("Guardrail", "Guardrail"), vanity: t("Vanity metric", "Vanity Metric") },
  initial: "setup",
  metrics: [
    { id: "rev", name: t("Revenue per customer, all modules", "Umsatz pro Kunde, alle Module"), kind: "outcome" as const, moved: true, why: t("Money: the result Elbe is paid for. It moves last.", "Geld: das Ergebnis, für das Elbe bezahlt wird. Es bewegt sich zuletzt.") },
    { id: "renew", name: t("Renewal rate", "Verlängerungsrate"), kind: "outcome" as const, moved: true, why: t("Customers kept: a result.", "Gehaltene Kunden: ein Ergebnis.") },
    { id: "setup", name: t("New customers who finish set-up", "Neukunden, die die Einrichtung abschließen"), kind: "driver" as const, moved: true, why: t("It comes before the renewal and onboarding can raise it this month.", "Es kommt vor der Verlängerung, und das Onboarding kann es diesen Monat steigern.") },
    { id: "invite", name: t("Customers who invite a colleague", "Kunden, die einen Kollegen einladen"), kind: "driver" as const, moved: false, why: t("A customer behaviour before the renewal; it did not move with value last year, which is a finding, not another kind.", "Ein Kundenverhalten vor der Verlängerung; es bewegte sich letztes Jahr nicht mit dem Wert, das ist ein Befund, keine andere Art.") },
    { id: "pointsonly", name: t("Accounts with many points but no real use", "Konten mit vielen Punkten, aber ohne echte Nutzung"), kind: "guardrail" as const, moved: true, why: t("It must not rise while Elbe adds game elements.", "Es darf nicht steigen, während Elbe Spielelemente einführt.") },
    { id: "badges", name: t("Badges issued", "Ausgegebene Badges"), kind: "vanity" as const, moved: false, why: t("It counts what Elbe handed out, not what customers did.", "Es zählt, was Elbe ausgegeben hat, nicht was Kunden taten.") },
  ],
  steps: [
    { title: t("A driver you can steer by", "Ein Treiber, nach dem Sie steuern"), say: t("Elbe Cloudwerk is an example company, not your case. New customers who finish set-up come before the renewal, onboarding can raise them this month, and they moved with value last year: a driver.", "Elbe Cloudwerk ist ein Beispielunternehmen, nicht Ihr Fall. Neukunden, die die Einrichtung abschließen, kommen vor der Verlängerung, das Onboarding kann sie diesen Monat steigern, und sie bewegten sich letztes Jahr mit dem Wert: ein Treiber."), look: t("the box under the top, and “moved with value”", "der Kasten unter der Spitze und „mit dem Wert bewegt“"), sel: "setup" },
    { title: t("A number that flatters", "Eine Zahl, die schmeichelt"), say: t("Badges issued counts what Elbe handed out, not what customers did. It looks like engagement and decides nothing: a vanity metric, a number that only flatters.", "Ausgegebene Badges zählt, was Elbe ausgegeben hat, nicht was Kunden taten. Es sieht nach Engagement aus und entscheidet nichts: eine Vanity Metric, eine Zahl, die nur schmeichelt."), look: t("the grey box outside the tree", "der graue Kasten außerhalb des Baums"), sel: "badges" },
    { title: t("The point", "Das Wichtigste"), say: t("Steer by the result and the behaviours that lead to it, watch a limit such as accounts that only collect points, and stop reporting numbers that only count what you handed out. Choose any metric.", "Steuern Sie nach dem Ergebnis und den Verhalten, die dorthin führen, beobachten Sie eine Grenze wie Konten, die nur Punkte sammeln, und hören Sie auf, Zahlen zu berichten, die nur zählen, was Sie ausgegeben haben. Wählen Sie eine beliebige Kennzahl."), look: t("the dashed amber frame: the guardrail", "der gestrichelte bernsteinfarbene Rahmen: die Guardrail"), sel: "pointsonly" },
  ],
  labels: {
    outcome: t("outcome", "Outcome"),
    drivers: t("drivers", "Treiber"),
    guardrail: t("guardrail: must not get worse", "Guardrail: darf nicht schlechter werden"),
    outside: t("outside the tree: decides nothing", "außerhalb des Baums: entscheidet nichts"),
    moved: t("● moved with value", "● mit dem Wert bewegt"),
    notMoved: t("○ did not move", "○ nicht bewegt"),
    toggleMetric: t("Metric", "Kennzahl"),
    toggleYear: t("Last year", "Letztes Jahr"),
    yearOn: t("Show whether it moved with value last year", "Zeigen, ob es sich letztes Jahr mit dem Wert bewegte"),
    yearOff: t("Hide last year", "Letztes Jahr verbergen"),
  },
  insightPast: (m: { name: string; kind: "outcome" | "driver" | "guardrail" | "vanity"; moved: boolean; why: string }) =>
    tt(
      `${m.name} → ${KPI_TREE.kindLabel[m.kind]}. ${m.why} Last year it ${m.moved ? "moved" : "did not move"} with customer value. Both outcomes moved, one of two drivers, the guardrail moved, the vanity metric did not: the closer to the top of the tree, the stronger the link.`,
      `${m.name} ist ${KIND_DE[m.kind]}: ${m.why} Letztes Jahr ${m.moved ? "bewegte es sich" : "bewegte es sich nicht"} mit dem Kundenwert. Beide Outcomes bewegten sich, einer von zwei Treibern, die Guardrail bewegte sich, die Vanity Metric nicht: Je näher an der Spitze des Baums, desto stärker die Verbindung.`,
    ),
  insightNow: (m: { name: string; kind: "outcome" | "driver" | "guardrail" | "vanity"; why: string }) =>
    tt(`${m.name} → ${KPI_TREE.kindLabel[m.kind]}. ${m.why} Switch on “last year” to see which kinds move with customer value.`, `${m.name} ist ${KIND_DE[m.kind]}. ${m.why} Schalten Sie „letztes Jahr“ ein, um zu sehen, welche Arten sich mit dem Kundenwert bewegen.`),
});

/* ------------------------------------------------------------------ A6 · a fair test of a game element */

export const FAIR: FairCfg = bi({
  point: t(
    "A test is fair when only one thing differs, chance decides who is in which group, both groups run in the same weeks, and the size is fixed in advance. Even then, a small test tells you less than it seems.",
    "Ein Test ist fair, wenn sich nur eine Sache unterscheidet, der Zufall entscheidet, wer in welcher Gruppe ist, beide Gruppen in denselben Wochen laufen und die Größe vorab feststeht. Selbst dann sagt ein kleiner Test weniger, als es scheint.",
  ),
  aria: t("How sure the test is: the range of uplifts the result is compatible with", "Wie sicher der Test ist: die Spanne der Uplifts, mit denen das Ergebnis vereinbar ist"),
  rangeAria: t("How sure the test is: the range of uplifts the result is compatible with", "Wie sicher der Test ist: die Spanne der Uplifts, mit denen das Ergebnis vereinbar ist"),
  ratio: 1.5,
  groupA: t("Group A", "Gruppe A"),
  groupB: t("Group B", "Gruppe B"),
  runLabel: t("How Elbe runs the test", "Wie Elbe den Test durchführt"),
  flaws: [
    { id: "none", label: t("Fair test", "Fairer Test"), a: t("New customers without the set-up bar · random half of sign-ups · weeks 1–6", "Neukunden ohne Einrichtungsleiste · zufällige Hälfte der Anmeldungen · Wochen 1–6"), b: t("New customers with the bar · other half · weeks 1–6", "Neukunden mit der Leiste · andere Hälfte · Wochen 1–6"), reading: t("One change, a random split, the same weeks, a size fixed in advance: a difference between the groups can be put down to the bar.", "Eine Änderung, eine zufällige Aufteilung, dieselben Wochen, eine vorab festgelegte Größe: Ein Unterschied zwischen den Gruppen lässt sich der Leiste zuschreiben.") },
    { id: "two", label: t("Three changes at once", "Drei Änderungen auf einmal"), a: t("The old home screen · random half", "Der alte Startbildschirm · zufällige Hälfte"), b: t("Bar, points and a leaderboard together · other half", "Leiste, Punkte und Rangliste zusammen · andere Hälfte"), reading: t("The variant differs in three things. If it wins, nobody can say whether the bar, the points or the leaderboard did it.", "Die Variante unterscheidet sich in drei Dingen. Gewinnt sie, kann niemand sagen, ob Leiste, Punkte oder Rangliste es waren.") },
    { id: "time", label: t("Compared with last quarter", "Mit dem Vorquartal verglichen"), a: t("Without the bar · all sign-ups · first quarter", "Ohne Leiste · alle Anmeldungen · erstes Quartal"), b: t("With the bar · all sign-ups · second quarter", "Mit Leiste · alle Anmeldungen · zweites Quartal"), reading: t("The groups are different quarters. A trade fair, a price change or the season can explain the difference. Comparing periods is reading a trend, not testing a cause.", "Die Gruppen sind verschiedene Quartale. Eine Messe, eine Preisänderung oder die Saison können den Unterschied erklären. Zeiträume zu vergleichen heißt einen Trend lesen, nicht eine Ursache testen.") },
    { id: "peek", label: t("Stopped when ahead on the dashboard", "Gestoppt, sobald im Dashboard vorn"), a: t("Without the bar · random half · stopped after week 1", "Ohne Leiste · zufällige Hälfte · nach Woche 1 gestoppt"), b: t("With the bar · other half · stopped after week 1", "Mit Leiste · andere Hälfte · nach Woche 1 gestoppt"), reading: t("A finish rate swings with every customer. Stopping at the first lead picks a lucky moment, and customers who need longer to finish are left out.", "Eine Abschlussquote schwankt mit jedem Kunden. Beim ersten Vorsprung zu stoppen, wählt einen glücklichen Moment, und Kunden, die länger zum Abschließen brauchen, fehlen.") },
  ],
  steps: [
    { title: t("A fair test", "Ein fairer Test"), say: () => tt("Elbe Cloudwerk is an example company, not your case. A fair test is like a race: same track, same start, one runner changed. Elbe shows the set-up bar to a random half of sign-ups, in the same weeks.", "Elbe Cloudwerk ist ein Beispielunternehmen, nicht Ihr Fall. Ein fairer Test ist wie ein Rennen: dieselbe Bahn, derselbe Start, ein Läufer ausgetauscht. Elbe zeigt die Einrichtungsleiste einer zufälligen Hälfte der Anmeldungen, in denselben Wochen."), look: t("Group A and Group B: only the bar differs", "Gruppe A und Gruppe B: Nur die Leiste unterscheidet sich"), flaw: "none", conv: 30, spot: null },
    { title: t("An unfair test", "Ein unfairer Test"), say: () => tt("Now the variant gets the bar, points and a leaderboard together. If it wins, nobody knows which of the three did it.", "Jetzt bekommt die Variante Leiste, Punkte und Rangliste zusammen. Gewinnt sie, weiß niemand, was von den dreien es war."), look: t("the dashed amber Group B box", "der gestrichelte bernsteinfarbene Kasten von Gruppe B"), flaw: "two", conv: 30, spot: "b" },
    { title: t("The point", "Das Wichtigste"), say: (lo: number) => tt(`Even a fair test says less than it seems on few results: with 30 finished set-ups per group, the same 1.5× could be ${num(lo)}×, which is no gain. Move the slider to 100.`, `Selbst ein fairer Test sagt bei wenigen Ergebnissen weniger, als es scheint: Mit 30 abgeschlossenen Einrichtungen pro Gruppe könnte dasselbe 1,5× ${num(lo)}× sein, also kein Gewinn. Bewegen Sie den Regler auf 100.`), look: t("the hatched bar crossing the dashed 1× line", "der schraffierte Balken, der die gestrichelte 1×-Linie kreuzt"), flaw: "none", conv: 30, spot: "range" },
  ],
  noDiff: t("1× = no difference", "1× = kein Unterschied"),
  slider: (conv: number) => tt(`Finished set-ups in the group without the bar: ${conv} (the bar group has 1.5 times as many)`, `Abgeschlossene Einrichtungen in der Gruppe ohne Leiste: ${conv} (die Leisten-Gruppe hat 1,5-mal so viele)`),
  measured: (lo: number, hi: number) => tt(`measured: 1.5× · plausible range ${num(lo)}× to ${num(hi)}×`, `gemessen: 1,5× · plausible Spanne ${num(lo)}× bis ${num(hi)}×`),
  proven: (conv: number, lo: number, hi: number) =>
    tt(`With ${conv} finished set-ups per group, even the low end of the range (${num(lo)}×) is above “no difference”: the uplift is real, though its size is still uncertain (up to ${num(hi)}×). Around 100 per group is where a 1.5× result becomes solid.`, `Mit ${conv} abgeschlossenen Einrichtungen pro Gruppe liegt selbst das untere Ende der Spanne (${num(lo)}×) über „kein Unterschied“: Der Uplift ist echt, auch wenn seine Größe noch unsicher ist (bis ${num(hi)}×). Um 100 pro Gruppe wird ein Ergebnis von 1,5× belastbar.`),
  open: (conv: number, lo: number, hi: number) =>
    tt(`With ${conv} finished set-ups per group, the same 1.5× could be anything from ${num(lo)}× to ${num(hi)}×, and the range still includes “no difference” (hatched). Promising, not proven: keep the test running, however good the dashboard looks.`, `Mit ${conv} abgeschlossenen Einrichtungen pro Gruppe könnte dasselbe 1,5× alles zwischen ${num(lo)}× und ${num(hi)}× sein, und die Spanne schließt „kein Unterschied“ noch ein (schraffiert). Vielversprechend, nicht bewiesen: Lassen Sie den Test weiterlaufen, egal wie gut das Dashboard aussieht.`),
  footnote: t("Illustration on Elbe Cloudwerk (Case assumption). The range is a standard approximation, shown so the effect of the sample size is visible; the task never asks you to compute it.", "Illustration mit Elbe Cloudwerk (Fallannahme). Die Spanne ist eine übliche Näherung, gezeigt, damit die Wirkung der Stichprobengröße sichtbar wird; die Aufgabe verlangt nie, sie zu berechnen."),
});

/* ------------------------------------------------------------------ A7 · scoring: Elbe's three measures */

export const SCORE: ScoreCfg = bi({
  point: t(
    "Score a measure on three questions: does it join what exists, would customers do it without the prize, and does it still work after the novelty? The three scores are multiplied, so one weak answer lowers the whole.",
    "Bewerten Sie eine Maßnahme nach drei Fragen: Verbindet sie, was existiert, würden Kunden es auch ohne den Preis tun, und wirkt es nach der Neuheit noch? Die drei Werte werden multipliziert, also senkt eine schwache Antwort das Ganze.",
  ),
  aria: t("Elbe's three measures scored: integration × motivation × sustainability", "Die drei Maßnahmen von Elbe bewertet: Integration × Motivation × Nachhaltigkeit"),
  toggleLabel: t("Measure", "Maßnahme"),
  initial: "path",
  measures: [
    { id: "path", name: t("A progress path tied to the membership levels", "Ein Fortschrittspfad, gekoppelt an die Mitgliedschaftsstufen"), cost: 50000, joins: "all", i: 3 as const, eff: 3 as const, fea: 3 as const, note: t("Customers want what each step leads to, so the path only carries them there; it needs no prizes and it joins membership, referral and profile.", "Kunden wollen das, wozu jeder Schritt führt, also trägt der Pfad sie nur dorthin; er braucht keine Preise und verbindet Mitgliedschaft, Empfehlung und Profil.") },
    { id: "board", name: t("A public leaderboard of the top ten", "Eine öffentliche Rangliste der Top Ten"), cost: 30000, joins: "one", i: 2 as const, eff: 2 as const, fea: 1 as const, note: t("Only the few at the top care and it reads one system; it needs a prize and fresh moderation every month, so it fades.", "Nur die wenigen an der Spitze interessiert es, und es liest ein System; es braucht jeden Monat einen Preis und frische Moderation, also verblasst es.") },
    { id: "points", name: t("Points for every login", "Punkte für jeden Login"), cost: 20000, joins: "none", i: 1 as const, eff: 1 as const, fea: 1 as const, note: t("Customers log in for the points, and it connects to nothing; it stops working the day the discount stops.", "Kunden loggen sich für die Punkte ein, und es ist mit nichts verbunden; es wirkt nicht mehr an dem Tag, an dem der Rabatt endet.") },
  ],
  steps: [
    { title: t("Strong on all three", "Stark in allen dreien"), say: (s: Record<string, number>) => tt(`Elbe Cloudwerk is an example company, not your case. The progress path scores ${s.path}: it joins membership, referral and profile, customers want the result, and it needs no prizes.`, `Elbe Cloudwerk ist ein Beispielunternehmen, nicht Ihr Fall. Der Fortschrittspfad erzielt ${s.path}: Er verbindet Mitgliedschaft, Empfehlung und Profil, Kunden wollen das Ergebnis, und er braucht keine Preise.`), look: t("the longest bar", "der längste Balken"), sel: "path" },
    { title: t("One weak factor", "Ein schwacher Faktor"), say: (s: Record<string, number>) => tt(`Points for every login score only ${s.points}: customers log in for the points and it connects to nothing. One weak factor, here motivation, pulls the product down.`, `Punkte für jeden Login erzielen nur ${s.points}: Kunden loggen sich für die Punkte ein, und es ist mit nichts verbunden. Ein schwacher Faktor, hier die Motivation, zieht das Produkt herunter.`), look: t("the short bar, and its three parts in “What this shows”", "der kurze Balken und seine drei Teile in „Was das zeigt“"), sel: "points" },
    { title: t("The point", "Das Wichtigste"), say: () => tt("Multiply integration, motivation and sustainability. Integration is read from what the measure connects to, never guessed. Choose a measure to read its three parts.", "Multiplizieren Sie Integration, Motivation und Nachhaltigkeit. Die Integration wird daraus gelesen, womit die Maßnahme verbunden ist, nie geschätzt. Wählen Sie eine Maßnahme, um ihre drei Teile zu lesen."), look: t("the leaderboard: a few care, and it fades", "die Rangliste: wenige interessiert es, und sie verblasst"), sel: "board" },
  ],
  insight: (m: { name: string; cost: number; joins: string; i: number; eff: number; fea: number; note: string }, score: number) =>
    tt(
      `${m.name} (${euro(m.cost)}, connects to ${JOINS_LABEL[m.joins as Joins]}): integration ${m.i} × motivation ${m.eff} × sustainability ${m.fea} = ${score}. ${m.note}`,
      `${m.name} (${euro(m.cost)}, verbunden mit ${JOINS_LABEL[m.joins as Joins]}): Integration ${m.i} × Motivation ${m.eff} × Nachhaltigkeit ${m.fea} = ${score}. ${m.note}`,
    ),
});

/* ------------------------------------------------------------------ B1 · four stages towards an integrated retention system */

export const STAGES: StagesCfg = bi({
  point: t(
    "An integrated retention system is not a pile of busy measures. It is one profile every measure reads, one rulebook for rewards, and game elements that learn from the joined data.",
    "Ein integriertes Kundenbindungssystem ist keine Ansammlung beschäftigter Maßnahmen. Es ist ein Profil, das jede Maßnahme liest, ein Regelwerk für Belohnungen, und Spielelemente, die aus den verbundenen Daten lernen.",
  ),
  aria: t("Four stages towards an integrated retention system", "Vier Stufen zu einem integrierten Kundenbindungssystem"),
  caption: t("from measures side by side → to one profile → to one rulebook → to game elements on joined data", "von Maßnahmen nebeneinander → zu einem Profil → zu einem Regelwerk → zu Spielelementen auf verbundenen Daten"),
  company: "Neckar Systeme",
  toggleLabel: t("Stage", "Stufe"),
  initial: "profile",
  stages: [
    { id: "side", name: t("Measures side by side", "Maßnahmen nebeneinander"), spree: t("Discounts, a newsletter, support, a membership programme and a referral scheme each run on their own, with their own customer list and their own numbers.", "Rabatte, ein Newsletter, Support, ein Mitgliedschaftsprogramm und ein Empfehlungsprogramm laufen je für sich, mit eigener Kundenliste und eigenen Zahlen."), reading: t("A customer gets a discount e-mail while support is fixing their problem, and every team reports that it is doing well.", "Ein Kunde bekommt eine Rabatt-E-Mail, während der Support sein Problem behebt, und jedes Team berichtet, dass es gut läuft.") },
    { id: "profile", name: t("One customer profile", "Ein Kundenprofil"), spree: t("Membership, referral and personalisation read and write one profile: use, level, referrals and contacts in one place.", "Mitgliedschaft, Empfehlung und Personalisierung lesen und schreiben ein Profil: Nutzung, Stufe, Empfehlungen und Kontakte an einem Ort."), reading: t("Every measure now knows the customer; what they do together is still left to chance.", "Jede Maßnahme kennt jetzt den Kunden; was sie zusammen tun, bleibt noch dem Zufall überlassen.") },
    { id: "rules", name: t("One rulebook", "Ein Regelwerk"), spree: t("One page says which actions earn a reward, what does not count, and who decides when a customer is eligible. Rewards go to finished set-ups and to customers who stay, not to logins.", "Eine Seite sagt, welche Handlungen eine Belohnung bringen, was nicht zählt und wer entscheidet, wann ein Kunde berechtigt ist. Belohnungen gehen an abgeschlossene Einrichtungen und an Kunden, die bleiben, nicht an Logins."), reading: t("Rewards are designed, not left to chance. This is where separate measures become one system.", "Belohnungen sind gestaltet, nicht dem Zufall überlassen. Hier werden aus getrennten Maßnahmen ein System.") },
    { id: "game", name: t("Game elements on joined data", "Spielelemente auf verbundenen Daten"), spree: t("A progress path and referral invitations read the shared profile; every month the same KPIs decide what is kept, changed or stopped.", "Ein Fortschrittspfad und Empfehlungseinladungen lesen das gemeinsame Profil; jeden Monat entscheiden dieselben KPIs, was bleibt, sich ändert oder gestoppt wird."), reading: t("Game elements now build on data from every measure, and the system improves month by month.", "Spielelemente bauen jetzt auf Daten aus jeder Maßnahme auf, und das System verbessert sich Monat für Monat.") },
  ],
  steps: [
    { title: t("Game elements on the joined data", "Spielelemente auf den verbundenen Daten"), say: t("Neckar Systeme is an example company, not your case. A progress path and referral invitations read the shared profile, and every month the same KPIs decide what is kept.", "Neckar Systeme ist ein Beispielunternehmen, nicht Ihr Fall. Ein Fortschrittspfad und Empfehlungseinladungen lesen das gemeinsame Profil, und jeden Monat entscheiden dieselben KPIs, was bleibt."), look: t("the last, tallest bar", "der letzte, höchste Balken"), stage: "game" },
    { title: t("Measures side by side", "Maßnahmen nebeneinander"), say: t("Before that, discounts, newsletter, support, membership and referral each ran on their own. A customer got a discount e-mail while support was fixing their problem.", "Davor liefen Rabatte, Newsletter, Support, Mitgliedschaft und Empfehlung je für sich. Ein Kunde bekam eine Rabatt-E-Mail, während der Support sein Problem behob."), look: t("the first, shortest bar", "der erste, niedrigste Balken"), stage: "side" },
    { title: t("The point", "Das Wichtigste"), say: t("The jump from separate measures to a system is one customer profile that every measure reads and writes. Try the four stages.", "Der Sprung von getrennten Maßnahmen zu einem System ist ein Kundenprofil, das jede Maßnahme liest und schreibt. Probieren Sie die vier Stufen."), look: t("the second bar", "der zweite Balken"), stage: "profile" },
  ],
});

/* ------------------------------------------------------------------ B2 · the moment first, then the tool */

export const SOURCE_MAP: MapCfg = bi({
  point: t(
    "Start from what the customer wants to get done, not from the tool. A moment where the customer wants something done and the data is ready is integrated now; with data not ready it waits; where nobody wants anything done it is not central, however well connected.",
    "Gehen Sie von dem aus, was der Kunde erledigen will, nicht vom Werkzeug. Ein Moment, in dem der Kunde etwas erledigen will und die Daten bereit sind, wird jetzt integriert; mit nicht bereiten Daten wartet er; wo niemand etwas erledigen will, ist er nicht zentral, egal wie gut verbunden.",
  ),
  aria: t("Neckar Systeme's moments by what the customer wants done and connected data", "Momente von Neckar Systeme nach dem, was der Kunde erledigen will, und verbundenen Daten"),
  xTicks: [0, 20, 40, 60, 80, 100],
  xUnit: "%",
  xAxisLabel: t("share of its data that reaches the shared profile →", "Anteil seiner Daten, der das gemeinsame Profil erreicht →"),
  rows: [t("customer wants something done", "Kunde will etwas erledigen"), t("nothing the customer wants done", "nichts, was der Kunde erledigen will")],
  zones: [
    { x1: 0, x2: 80, r1: 0, r2: 0, kind: "soft", label: t("Central: connect the data first", "Zentral: zuerst die Daten verbinden"), lx: 40, lr: 0, color: "amber" },
    { x1: 80, x2: 100, r1: 0, r2: 0, kind: "teal", label: t("integrate now", "jetzt integrieren"), lx: 90, lr: 0, color: "teal" },
    { x1: 0, x2: 100, r1: 1, r2: 1, kind: "mist", label: t("Not central: nobody wants anything done", "Nicht zentral: niemand will etwas erledigen"), lx: 50, lr: 1, color: "ash" },
  ],
  items: [
    { id: "s1", name: t("Set-up → full use", "Einrichtung → volle Nutzung"), x: 91, row: 0, square: false, glyph: "●", verdict: t("integrate now", "jetzt integrieren"), fact: t("91% connected · the customer wants it done", "91 % verbunden · der Kunde will es erledigen"), why: t("The customer wants to get to full use and 91% of its data reaches the shared profile. Central: integrate it now, with a progress path.", "Der Kunde will zur vollen Nutzung kommen, und 91 % seiner Daten erreichen das gemeinsame Profil. Zentral: jetzt integrieren, mit einem Fortschrittspfad.") },
    { id: "s2", name: t("Admin course → certificate", "Admin-Kurs → Zertifikat"), x: 86, row: 0, square: false, glyph: "●", verdict: t("integrate now", "jetzt integrieren"), fact: t("86% connected · the customer wants it done", "86 % verbunden · der Kunde will es erledigen"), why: t("The customer wants to finish the course and the data is ready: integrate now.", "Der Kunde will den Kurs abschließen, und die Daten sind bereit: jetzt integrieren.") },
    { id: "s3", name: t("Renewal talk → referral invitation", "Verlängerungsgespräch → Empfehlungseinladung"), x: 50, row: 0, square: false, glyph: "◐", verdict: t("connect the data first", "zuerst die Daten verbinden"), fact: t("50% connected · the customer wants it done", "50 % verbunden · der Kunde will es erledigen"), why: t("The customer decides whether to renew and recommend, but only 50% of its data reaches the profile. Built on now, it would learn the gaps. Connect the data first.", "Der Kunde entscheidet, ob er verlängert und empfiehlt, aber nur 50 % seiner Daten erreichen das Profil. Jetzt darauf gebaut, würde es die Lücken lernen. Erst die Daten verbinden.") },
    { id: "s4", name: t("Events newsletter", "Veranstaltungs-Newsletter"), x: 75, row: 1, square: false, glyph: "○", verdict: t("not central", "nicht zentral"), fact: t("75% connected · nobody wants anything done", "75 % verbunden · niemand will etwas erledigen"), why: t("75% connected, but nobody wants to get anything done in a newsletter. A game element would only buy clicks.", "75 % verbunden, aber in einem Newsletter will niemand etwas erledigen. Ein Spielelement würde nur Klicks kaufen.") },
    { id: "s5", name: t("Supplier invoices", "Lieferantenrechnungen"), x: 98, row: 1, square: false, glyph: "○", verdict: t("not central", "nicht zentral"), fact: t("98% connected · nobody wants anything done", "98 % verbunden · niemand will etwas erledigen"), why: t("The best-connected data of all, but it has nothing to do with the customer. Not central, however complete.", "Die am besten verbundenen Daten von allen, aber sie haben mit dem Kunden nichts zu tun. Nicht zentral, egal wie vollständig.") },
  ],
  steps: [
    { title: t("Integrate now", "Jetzt integrieren"), say: t("Neckar Systeme is an example company, not your case. At set-up the customer wants to get to full use and 91% of the data is ready: integrate now, and test it against a control group.", "Neckar Systeme ist ein Beispielunternehmen, nicht Ihr Fall. Bei der Einrichtung will der Kunde zur vollen Nutzung kommen, und 91 % der Daten sind bereit: jetzt integrieren und gegen eine Kontrollgruppe testen."), look: t("the dot in the teal area", "der Punkt im türkisen Feld"), item: "s1" },
    { title: t("Data first", "Erst die Daten"), say: t("The referral invitation after a renewal talk would help too, but only 50% of its data is ready. Built on now, it would learn the gaps. Fix the data first.", "Die Empfehlungseinladung nach einem Verlängerungsgespräch würde auch helfen, aber nur 50 % ihrer Daten sind bereit. Jetzt darauf gebaut, würde sie die Lücken lernen. Erst die Daten verbessern."), look: t("the dot in the amber area", "der Punkt im bernsteinfarbenen Feld"), item: "s3" },
    { title: t("The point", "Das Wichtigste"), say: t("Supplier invoices have 98% of the data ready, but the customer wants nothing done there. However complete, not central. Try the other moments.", "Lieferantenrechnungen haben 98 % der Daten bereit, aber der Kunde will dort nichts erledigen. Egal wie vollständig: nicht zentral. Probieren Sie die anderen Momente."), look: t("the dot in the grey area", "der Punkt im grauen Feld"), item: "s5" },
  ],
  initial: "s3",
  toggleLabel: t("Moments", "Momente"),
  legend: t("Illustration on Neckar Systeme (Case assumption). Top row: the customer wants something done in the moment; bottom row: nobody does. Left to right: how much of its data reaches the shared profile.", "Illustration mit Neckar Systeme (Fallannahme). Obere Zeile: Der Kunde will im Moment etwas erledigen; untere Zeile: niemand. Von links nach rechts: wie viel seiner Daten das gemeinsame Profil erreicht."),
});

/* ------------------------------------------------------------------ B3 · four tests for a management KPI */

export const COMP_TESTS: CompCfg = bi({
  point: t(
    "A KPI worth steering by is linked to value, shows a change early, covers every customer and is counted by the systems. The printed facts cap each rating.",
    "Ein KPI, nach dem es sich zu steuern lohnt, ist mit dem Wert verbunden, zeigt früh eine Veränderung, deckt jeden Kunden ab und wird von den Systemen gezählt. Die gedruckten Fakten deckeln jede Bewertung.",
  ),
  aria: t("One KPI candidate of Neckar Systeme on four tests", "Ein KPI-Kandidat von Neckar Systeme nach vier Tests"),
  crits: [
    { id: "explain", name: t("Link to value", "Verbindung zum Wert") },
    { id: "timely", name: t("Early", "Früh") },
    { id: "reach", name: t("Reach", "Reichweite") },
    { id: "scale", name: t("Measured automatically", "Automatisch gemessen") },
  ],
  levels: [t("Low", "Niedrig"), t("Mid", "Mittel"), t("High", "Hoch")],
  initial: "points",
  toggleLabel: t("KPI candidate", "KPI-Kandidat"),
  factsLabel: t("Printed facts: ", "Gedruckte Fakten: "),
  comps: [
    { id: "finish", name: t("New customers who finish set-up", "Neukunden, die die Einrichtung abschließen"), facts: t("linked to value · daily · every customer · counted by the systems", "mit dem Wert verbunden · täglich · jeder Kunde · von den Systemen gezählt"), r: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("High on all four: it is linked to renewals, it moves as soon as the first step is fixed, it covers every new customer and nobody has to collect it.", "Hoch auf allen vier: Es ist mit Verlängerungen verbunden, bewegt sich, sobald der erste Schritt behoben ist, deckt jeden Neukunden ab, und niemand muss es sammeln.") },
    { id: "survey", name: t("Yearly customer survey", "Jährliche Kundenbefragung"), facts: t("linked to value · yearly · those who answer · by a survey", "mit dem Wert verbunden · jährlich · wer antwortet · über eine Befragung"), r: { explain: 3, timely: 1, reach: 2, scale: 2 }, note: t("Linked to loyalty, but once a year is too late to steer a five-month plan.", "Mit Loyalität verbunden, aber einmal im Jahr ist zu spät, um einen Fünfmonatsplan zu steuern.") },
    { id: "points", name: t("Points awarded per month", "Vergebene Punkte pro Monat"), facts: t("not linked to value · daily · every customer · counted by the systems", "nicht mit dem Wert verbunden · täglich · jeder Kunde · von den Systemen gezählt"), r: { explain: 1, timely: 3, reach: 3, scale: 3 }, note: t("Easy to count, and it rose while use did not: points are what we hand out, not what customers do.", "Leicht zu zählen, und sie stiegen, während die Nutzung nicht stieg: Punkte sind, was wir ausgeben, nicht was Kunden tun.") },
    { id: "stories", name: t("Account managers' monthly success stories", "Monatliche Erfolgsgeschichten der Account Manager"), facts: t("not linked to value · monthly · cases someone picks · collected by hand", "nicht mit dem Wert verbunden · monatlich · von jemandem ausgewählte Fälle · von Hand gesammelt"), r: { explain: 1, timely: 2, reach: 2, scale: 1 }, note: t("Each manager reports a favourite case, so the customers who do not respond never appear.", "Jeder Manager berichtet einen Lieblingsfall, also tauchen die Kunden, die nicht reagieren, nie auf.") },
  ],
  steps: [
    { title: t("A KPI that passes", "Ein KPI, der besteht"), say: t("Neckar Systeme is an example company, not your case. New customers who finish set-up are linked to renewals and counted daily for every customer by the systems: High on all four, 12 of 12.", "Neckar Systeme ist ein Beispielunternehmen, nicht Ihr Fall. Neukunden, die die Einrichtung abschließen, sind mit Verlängerungen verbunden und werden täglich für jeden Kunden von den Systemen gezählt: Hoch auf allen vier, 12 von 12."), look: t("all four rows filled to High", "alle vier Zeilen bis Hoch gefüllt"), sel: "finish", spot: null },
    { title: t("A number that does not", "Eine Zahl, die nicht besteht"), say: t("Points awarded are easy to count, but they rose while use did not: points are not a better experience. The link to value stays Low, whatever the rest.", "Vergebene Punkte sind leicht zu zählen, stiegen aber, während die Nutzung nicht stieg: Punkte sind keine bessere Erfahrung. Die Verbindung zum Wert bleibt Niedrig, egal wie der Rest ist."), look: t("the first row, Link to value", "die erste Zeile, Verbindung zum Wert"), sel: "points", spot: "explain" },
    { title: t("The point", "Das Wichtigste"), say: t("The yearly survey score is linked to value but arrives once a year, so it is Low on early: a number for learning, not for steering. Try the other candidates.", "Der jährliche Befragungswert ist mit dem Wert verbunden, kommt aber einmal im Jahr und ist daher bei „früh“ Niedrig: eine Zahl zum Lernen, nicht zum Steuern. Probieren Sie die anderen Kandidaten."), look: t("the second row, Early", "die zweite Zeile, Früh"), sel: "survey", spot: "timely" },
  ],
  insight: (c: { name: string; note: string }, total: number) =>
    tt(
      `${c.name}: ${total} of 12. ${c.note} Each rating is capped by a printed fact: “not linked to value” caps the link at Low; “after the customer has left” or “yearly” caps early at Low; “some customers” caps reach at Mid; “collected by hand” caps measured automatically at Low.`,
      `${c.name}: ${total} von 12. ${c.note} Jede Bewertung ist durch einen gedruckten Fakt gedeckelt: „nicht mit dem Wert verbunden“ deckelt die Verbindung bei Niedrig; „nachdem der Kunde gegangen ist“ oder „jährlich“ deckeln früh bei Niedrig; „einige Kunden“ deckelt die Reichweite bei Mittel; „von Hand gesammelt“ deckelt automatisch gemessen bei Niedrig.`,
    ),
});

/* ------------------------------------------------------------------ B4 · roll out, keep testing or stop */

export const LIFT: LiftCfg = bi({
  point: t(
    "Every test ends in a decision. A clear uplift on enough conversions: roll out. A strong uplift on too few, or a small one: keep testing. No real uplift: stop.",
    "Jeder Test endet in einer Entscheidung. Ein klarer Uplift bei genug Conversions: ausrollen. Ein starker Uplift bei zu wenigen oder ein kleiner: weiter testen. Kein echter Uplift: stoppen.",
  ),
  aria: t("Roll out, keep testing or stop, by uplift and conversions per group", "Ausrollen, weiter testen oder stoppen, nach Uplift und Conversions pro Gruppe"),
  actAt: LIFT_ACT,
  watchAt: LIFT_WATCH,
  casesMin: CASES_MIN,
  initial: { lift: 20, cases: 40 },
  steps: [
    { title: t("Roll out", "Ausrollen"), say: t("Neckar Systeme is an example company, not your case. A test of a progress bar shows +30% on 200 conversions per group: clear and proven. Roll out.", "Neckar Systeme ist ein Beispielunternehmen, nicht Ihr Fall. Ein Test einer Fortschrittsleiste zeigt +30 % bei 200 Conversions pro Gruppe: klar und belegt. Ausrollen."), look: t("the dot in the teal area", "der Punkt im türkisen Feld"), lift: 30, cases: 200 },
    { title: t("Keep testing", "Weiter testen"), say: t(`Another test also shows +30%, but on only 40 conversions per group, fewer than ${CASES_MIN}. Too few to trust it: keep testing.`, `Ein anderer Test zeigt auch +30 %, aber nur bei 40 Conversions pro Gruppe, weniger als ${CASES_MIN}. Zu wenig, um ihm zu trauen: weiter testen.`), look: t("the dot in the left amber strip", "der Punkt im linken bernsteinfarbenen Streifen"), lift: 30, cases: 40 },
    { title: t("The point", "Das Wichtigste"), say: t("A third test, a mascot in the platform, shows +2% on 300 conversions. Many conversions do not rescue a tiny uplift: they prove it is tiny. Stop. Move the two sliders to try your own.", "Ein dritter Test, ein Maskottchen in der Plattform, zeigt +2 % bei 300 Conversions. Viele Conversions retten keinen winzigen Uplift: Sie beweisen, dass er winzig ist. Stoppen. Bewegen Sie die beiden Regler, um eigene Werte zu probieren."), look: t("the dot in the grey area", "der Punkt im grauen Feld"), lift: 2, cases: 300 },
  ],
  labels: {
    roll: t("roll out", "ausrollen"),
    keep: t("keep testing", "weiter testen"),
    stop: t("stop", "stoppen"),
    x: t("conversions in the smaller group →", "Conversions in der kleineren Gruppe →"),
    y: t("uplift % →", "Uplift % →"),
    lift: (l: number) => tt(`Uplift over the control group: ${l > 0 ? "+" : ""}${l}%`, `Uplift gegenüber der Kontrollgruppe: ${l > 0 ? "+" : ""}${l} %`),
    cases: (c: number) => tt(`Conversions per group: ${c}`, `Conversions pro Gruppe: ${c}`),
  },
  read: {
    act: (l: number, c: number) => tt(`An uplift of ${l}% on ${c} conversions per group: clear and proven. Roll out, and hand it to the team that owns it.`, `Ein Uplift von ${l} % bei ${c} Conversions pro Gruppe: klar und belegt. Ausrollen, und dem Team übergeben, dem es gehört.`),
    watchHigh: (l: number, c: number) => tt(`An uplift of ${l}% looks strong, but ${c} conversions are too few to trust it (fewer than ${CASES_MIN}). Keep testing; the data team runs it until the size is reached.`, `Ein Uplift von ${l} % sieht stark aus, aber ${c} Conversions sind zu wenig, um ihm zu trauen (weniger als ${CASES_MIN}). Weiter testen; das Datenteam lässt ihn laufen, bis die Größe erreicht ist.`),
    watchLow: (l: number) => tt(`An uplift of ${l}%: a small difference. Not worth a rollout yet; keep testing a stronger variant.`, `Ein Uplift von ${l} %: ein kleiner Unterschied. Noch keinen Rollout wert; eine stärkere Variante weiter testen.`),
    none: (l: number) => tt(`An uplift of ${l}%: the variant does about as well as the control, or worse. Stop; running it on costs money and attention for nothing.`, `Ein Uplift von ${l} %: Die Variante schneidet etwa so gut ab wie die Kontrolle, oder schlechter. Stoppen; sie weiterlaufen zu lassen kostet Geld und Aufmerksamkeit für nichts.`),
  },
});

/* ------------------------------------------------------------------ B5 · how an architecture is built */

export const ARCH_MINI: ArchMiniCfg = bi({
  point: t(
    "An architecture is built in order: the base first (one customer profile and the KPIs), then the data, then the game elements. Where a link in that chain is missing, the element above it cannot be trusted.",
    "Eine Architektur wird der Reihe nach gebaut: zuerst die Basis (ein Kundenprofil und die KPIs), dann die Daten, dann die Spielelemente. Wo ein Glied dieser Kette fehlt, lässt sich dem Element darüber nicht trauen.",
  ),
  aria: t("Neckar's progress path and its base", "Der Fortschrittspfad von Neckar und seine Basis"),
  company: "Neckar Systeme",
  meet: t("What customers meet: the home screen of the platform", "Was Kunden erleben: der Startbildschirm der Plattform"),
  tool: {
    name: t("Progress path connected to the customer profile", "Fortschrittspfad mit Anbindung an das Kundenprofil"),
    startsFirst: t("Starts in month 1", "Startet in Monat 1"),
    startsAfter: t("Starts in month 1, before the base", "Startet in Monat 1, vor der Basis"),
    noBase: t("no profile to read and nothing measures it yet", "noch kein Profil zum Lesen, und nichts misst es"),
    weak: (p: number) => tt(`its data is ${p}% connected, below 80%, when it starts`, `seine Daten sind zu ${p} % verbunden, unter 80 %, wenn es startet`),
  },
  base: { name: t("Shared profile and retention dashboard", "Gemeinsames Profil und Retention-Dashboard"), first: t("Starts in month 1", "Startet in Monat 1"), after: t("Starts in month 3, after the path", "Startet in Monat 3, nach dem Pfad") },
  link: { ok: t("reads the profile", "liest das Profil"), no: t("no profile to read", "kein Profil zum Lesen") },
  data: {
    flow: t("raw data from every system flows up", "Rohdaten aus jedem System fließen nach oben"),
    lives: (p: number) => tt(`Where the data lives: platform, membership tool and referral scheme, ${p}% of what the path reads is connected`, `Wo die Daten liegen: Plattform, Mitgliedschaftstool und Empfehlungsprogramm, ${p} % dessen, was der Pfad liest, sind verbunden`),
  },
  levels: { ready: 90, weak: 75, bar: 80 },
  toggles: {
    heading: t("Two things to change", "Zwei Dinge zum Ändern"),
    baseLabel: t("The shared profile starts", "Das gemeinsame Profil startet"),
    baseFirst: t("Before the path", "Vor dem Pfad"),
    baseAfter: t("After the path", "Nach dem Pfad"),
    dataLabel: t("Data behind the path", "Daten hinter dem Pfad"),
    dataReady: t("90% connected", "90 % verbunden"),
    dataWeak: t("75% connected", "75 % verbunden"),
  },
  steps: [
    { title: t("The base first", "Die Basis zuerst"), say: t("Neckar Systeme is an example company, not your case. It builds its shared profile and dashboard first, so its progress path reads one customer and is measured from its first week.", "Neckar Systeme ist ein Beispielunternehmen, nicht Ihr Fall. Es baut zuerst sein gemeinsames Profil und sein Dashboard, damit sein Fortschrittspfad einen Kunden liest und ab der ersten Woche gemessen wird."), look: t("the solid teal link between the path and the base", "die durchgezogene teal Verbindung zwischen Pfad und Basis"), measFirst: true, ready: true },
    { title: t("The element before the base", "Das Element vor der Basis"), say: t("Now the path starts first. It has no profile to read and nothing measures it, so nobody can say whether it helps. Its link is dashed.", "Jetzt startet der Pfad zuerst. Er hat kein Profil zum Lesen, und nichts misst ihn, also kann niemand sagen, ob er hilft. Seine Verbindung ist gestrichelt."), look: t("the dashed amber link and the note on the path", "die gestrichelte amberfarbene Verbindung und der Vermerk am Pfad"), measFirst: false, ready: true },
    { title: t("The point", "Das Wichtigste"), say: t("Integrated, but on data only 75% connected, the path would learn the gaps. Base first, then a game element on connected data. Try the two buttons.", "Integriert, aber auf nur zu 75 % verbundenen Daten würde der Pfad die Lücken lernen. Zuerst die Basis, dann ein Spielelement auf verbundenen Daten. Probieren Sie die beiden Schaltflächen."), look: t("the data note under the path", "den Datenvermerk unter dem Pfad"), measFirst: true, ready: false },
  ],
  read: {
    good: t("The base exists before the element and the element runs on data that is connected. Neckar can say whether the path helps, and its data does not teach it gaps. This is what a plan that holds looks like.", "Die Basis steht vor dem Element, und das Element läuft auf verbundenen Daten. Neckar kann sagen, ob der Pfad hilft, und seine Daten lehren ihn keine Lücken. So sieht ein Plan aus, der hält."),
    noBase: t("The path starts before the profile it reads exists. Its link to the base is dashed: Neckar would pay for an element and never know whether it works. The fix is the order: the shared profile and dashboard first.", "Der Pfad startet, bevor das Profil existiert, das er liest. Seine Verbindung zur Basis ist gestrichelt: Neckar würde für ein Element zahlen und nie wissen, ob es wirkt. Die Lösung ist die Reihenfolge: zuerst gemeinsames Profil und Dashboard."),
    weakData: t("It reads the profile, but its data is only 75% connected, below the 80% a game element should start on. It would learn the gaps. The fix is to connect the data first, or to hold the element back until it is ready.", "Er liest das Profil, aber seine Daten sind nur zu 75 % verbunden, unter den 80 %, auf denen ein Spielelement starten sollte. Er würde die Lücken lernen. Die Lösung ist, zuerst die Daten zu verbinden oder das Element zurückzuhalten, bis sie bereit sind."),
  },
});
