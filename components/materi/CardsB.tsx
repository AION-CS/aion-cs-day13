"use client";

import { Bul, Diagram } from "@/components/materi/kit";
import { ArchMini, CompProfile, LiftCases, ScatterMap, StageBars } from "@/components/materi/diagrams";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { ARCH_MINI, COMP_TESTS, LIFT, SOURCE_MAP, STAGES } from "@/data/diagramData";
import { CASES_MIN, CRITERIA, LIFT_ACT, LIFT_WATCH, QUALITY_BAR, R2_MONTHS } from "@/data/route2";
import { tt } from "@/lib/lang";

/** Materi B: the five cards of Route 2 (Level 3). 60 minutes in all; B5 is the one Core card (CLAUDE.md #48). */
const p = "text-body text-ink";

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("An integrated retention system joins what a company already runs around the customer: one customer profile that membership, referral and personalisation all read, and one rulebook that says which actions earn a reward. A target vision says in two sentences what all of it is for, and how the company will steer it.", "Ein integriertes Kundenbindungssystem verbindet, was ein Unternehmen schon betreibt, um den Kunden: ein Kundenprofil, das Mitgliedschaft, Empfehlung und Personalisierung alle lesen, und ein Regelwerk, das sagt, welche Handlungen eine Belohnung bringen. Ein Zielbild sagt in zwei Sätzen, wofür das alles da ist und wie das Unternehmen es steuert.")}
      reasoning={[
        tt("A target vision says, in two sentences, what changes for customers and teams once the system runs, and how the company steers it: by which few KPIs, and what every new game element has to do before it grows.", "Ein Zielbild sagt in zwei Sätzen, was sich für Kunden und Teams ändert, wenn das System läuft, und wie das Unternehmen es steuert: nach welchen wenigen KPIs, und was jedes neue Spielelement tun muss, bevor es wächst."),
        tt("Two foundations hold an integrated system: one customer profile that membership, referral and personalisation all read (every game element then knows the customer), and one rulebook that says which actions earn a reward (so nobody earns a prize for a click).", "Zwei Fundamente tragen ein integriertes System: ein Kundenprofil, das Mitgliedschaft, Empfehlung und Personalisierung alle lesen (jedes Spielelement kennt dann den Kunden), und ein Regelwerk, das sagt, welche Handlungen eine Belohnung bringen (damit niemand für einen Klick einen Preis erhält)."),
        tt("A good third principle is a KPI owner who can move the number, or a monthly review that decides keep, change or stop with the same few KPIs for every game element.", "Ein gutes drittes Prinzip ist ein KPI-Owner, der die Zahl bewegen kann, oder ein monatliches Review, das mit denselben wenigen KPIs für jedes Spielelement entscheidet: behalten, ändern oder stoppen."),
        tt("Reject “add as many game elements as possible”: more elements without integration is over-complexity and pays for clicks. Reject “hand every reward to one automatic platform first”: nothing changes for customers until it runs everywhere, and nobody can explain its rewards.", "Verwerfen Sie „so viele Spielelemente wie möglich einführen“: Mehr Elemente ohne Integration sind Übermaß an Komplexität und bezahlen Klicks. Verwerfen Sie „jede Belohnung zuerst einer automatischen Plattform übergeben“: Für Kunden ändert sich nichts, bis sie überall läuft, und niemand kann ihre Belohnungen erklären."),
        tt("Say what each principle means in the company, and which problem or risk it answers: low use, mediocre retention, measures not integrated, or wrong incentives.", "Sagen Sie, was jedes Prinzip im Unternehmen bedeutet und welches Problem oder Risiko es beantwortet: geringe Nutzung, mittelmäßige Kundenbindung, nicht integrierte Maßnahmen oder falsche Anreize."),
      ]}
      sources={["kaplan1992", "courtney1997"]}
    >
      <ShowMore id="B1" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kaplan and Norton (1992) argued for a few linked measures instead of many unrelated ones, which is what a shared profile and one dashboard make possible. Courtney, Kirkland and Viguerie (1997) advise matching the commitment to what is known: build the foundations that no-regret moves rest on first.",
            "Kaplan und Norton (1992) plädierten für wenige verbundene Kennzahlen statt vieler unverbundener, was ein gemeinsames Profil und ein Dashboard möglich machen. Courtney, Kirkland und Viguerie (1997) raten, die Festlegung an das Bekannte anzupassen: zuerst die Fundamente bauen, auf denen No-regret-Schritte ruhen.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Four stages towards an integrated retention system · a worked example on Neckar Systeme", "Vier Stufen zu einem integrierten Kundenbindungssystem · ein Beispiel mit Neckar Systeme")} caption={tt("Move through the four stages and read what each one adds.", "Gehen Sie die vier Stufen durch und lesen Sie, was jede hinzufügt.")}>
        <StageBars cfg={STAGES} />
      </Diagram>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Start from what the customer wants to get done, not from the tool. A moment in the journey where the customer wants something done and the data is ready is integrated now; where the data is not ready it waits; where nobody wants anything done it is not central, however well connected.", "Gehen Sie von dem aus, was der Kunde erledigen will, nicht vom Werkzeug. Ein Moment der Journey, in dem der Kunde etwas erledigen will und die Daten bereit sind, wird jetzt integriert; wo die Daten nicht bereit sind, wartet er; wo niemand etwas erledigen will, ist er nicht zentral, egal wie gut verbunden.")}
      reasoning={[
        tt("Does the customer want something done in the moment (get going, keep learning, use more, renew and recommend)? If not, a game element would only buy clicks: not central.", "Will der Kunde im Moment etwas erledigen (loslegen, weiterlernen, mehr nutzen, verlängern und empfehlen)? Wenn nicht, würde ein Spielelement nur Klicks kaufen: nicht zentral."),
        tt(`Does at least ${QUALITY_BAR}% of its data reach the shared profile? Then integrate it now. If not, connect the data first: built on now, it would learn the gaps.`, `Erreichen mindestens ${QUALITY_BAR} % seiner Daten das gemeinsame Profil? Dann integrieren Sie ihn jetzt. Wenn nicht, verbinden Sie zuerst die Daten: Jetzt darauf gebaut, würde er die Lücken lernen.`),
        tt("Volume and cost are not the test: a newsletter nobody wants to open is not central; a renewal talk is.", "Menge und Kosten sind nicht der Test: Ein Newsletter, den niemand öffnen will, ist nicht zentral; ein Verlängerungsgespräch schon."),
        tt("Joining the data of several systems is processing personal data: it needs a lawful basis (GDPR Art. 6), and a reward scheme does not change that.", "Die Daten mehrerer Systeme zu verbinden ist Verarbeitung personenbezogener Daten: Sie braucht eine Rechtsgrundlage (DSGVO Art. 6), und ein Belohnungsschema ändert daran nichts."),
      ]}
      sources={["davenport2018", "gdpr2016"]}
    >
      <ShowMore id="B2" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Davenport and Ronanki (2018) found that technology pays where it starts from a business problem and fits existing processes and data. The GDPR (2016) adds the legal condition for joining data about customers: a lawful basis for each use.",
            "Davenport und Ronanki (2018) fanden, dass sich Technologie dort auszahlt, wo sie von einem Geschäftsproblem ausgeht und zu bestehenden Prozessen und Daten passt. Die DSGVO (2016) ergänzt die rechtliche Bedingung für das Verbinden von Kundendaten: eine Rechtsgrundlage für jede Nutzung.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("The moment first, then the tool · a worked example on Neckar Systeme", "Zuerst der Moment, dann das Werkzeug · ein Beispiel mit Neckar Systeme")} caption={tt("Choose a moment on the map or in the list and read what the rule gives.", "Wählen Sie einen Moment auf der Karte oder in der Liste und lesen Sie, was die Regel ergibt.")}>
        <ScatterMap cfg={SOURCE_MAP} />
      </Diagram>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("A KPI system for management uses a few numbers that pass four tests: linked to value, early, covering every customer, and counted by the systems. A number that only counts what you hand out fails the first test, however easy it is to count.", "Ein KPI-System für das Management nutzt wenige Zahlen, die vier Tests bestehen: mit dem Wert verbunden, früh, jeden Kunden abdeckend und von den Systemen gezählt. Eine Zahl, die nur zählt, was Sie ausgeben, besteht den ersten Test nicht, egal wie leicht sie zu zählen ist.")}
      reasoning={[
        ...CRITERIA.map((c) => `${c.name}: ${c.test} ${tt("Low:", "Niedrig:")} ${c.low} ${tt("High:", "Hoch:")} ${c.high}`),
        tt("The printed facts cap each rating: “not linked to value” caps the link at Low; “after the customer has left” or “twice a year” caps early at Low; “some customers” caps reach at Mid; “collected by hand” caps measured automatically at Low.", "Die gedruckten Fakten deckeln jede Bewertung: „nicht mit dem Wert verbunden“ deckelt die Verbindung bei Niedrig; „nachdem der Kunde gegangen ist“ oder „zweimal im Jahr“ deckeln früh bei Niedrig; „einige Kunden“ deckelt die Reichweite bei Mittel; „von Hand gesammelt“ deckelt automatisch gemessen bei Niedrig."),
        tt("A management system needs most of its KPIs to show a change before the result is lost (daily or monthly).", "Ein Managementsystem braucht, dass die meisten seiner KPIs eine Veränderung zeigen, bevor das Ergebnis verloren ist (täglich oder monatlich)."),
        tt("The KPI with the greatest leverage is one a team can move this month and that is linked to value: name the tests that decide it and the problem it answers.", "Der KPI mit der größten Hebelwirkung ist einer, den ein Team diesen Monat bewegen kann und der mit dem Wert verbunden ist: Nennen Sie die Tests, die es entscheiden, und das Problem, das er beantwortet."),
        tt("A guardrail belongs in the system: the share of accounts that only collect points is the number that shows when a reward pays for clicks.", "Eine Guardrail gehört ins System: Der Anteil der Konten, die nur Punkte sammeln, ist die Zahl, die zeigt, wann eine Belohnung Klicks bezahlt."),
      ]}
      sources={["kaplan1992", "hubbard2014"]}
    >
      <ShowMore id="B3" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kaplan and Norton (1992) argued for a few linked measures, results and the drivers behind them. Hubbard (2014) adds that a measure earns its place when it would change a decision, which is why a number that only counts what you hand out does not.",
            "Kaplan und Norton (1992) plädierten für wenige verbundene Kennzahlen, Ergebnisse und ihre Treiber. Hubbard (2014) ergänzt, dass eine Kennzahl ihren Platz verdient, wenn sie eine Entscheidung ändern würde, weshalb eine Zahl, die nur zählt, was Sie ausgeben, ihn nicht verdient.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Four tests for one KPI candidate · a worked example on Neckar Systeme", "Vier Tests für einen KPI-Kandidaten · ein Beispiel mit Neckar Systeme")} caption={tt("Choose a candidate and read how it does on each test.", "Wählen Sie einen Kandidaten und lesen Sie, wie er bei jedem Test abschneidet.")}>
        <CompProfile cfg={COMP_TESTS} />
      </Diagram>
    </MaterialCard>
  );
}

export function CardB4() {
  return (
    <MaterialCard
      id="B4"
      scan={tt("Game elements are optimised by testing them on the joined data: every test ends in a decision, roll out, keep testing or stop, and who acts. Two numbers decide it: the uplift over the control group, and how many conversions it rests on. An element that makes customers game the system is stopped, however good the number looks.", "Spielelemente werden optimiert, indem man sie auf den verbundenen Daten testet: Jeder Test endet in einer Entscheidung, ausrollen, weiter testen oder stoppen, und wer handelt. Zwei Zahlen entscheiden: der Uplift gegenüber der Kontrollgruppe und auf wie vielen Conversions er beruht. Ein Element, das Kunden das System austricksen lässt, wird gestoppt, egal wie gut die Zahl aussieht.")}
      reasoning={[
        tt(`Roll out when the uplift is ${LIFT_ACT}% or more and each group has at least ${CASES_MIN} conversions: the gain is clear and proven.`, `Ausrollen, wenn der Uplift ${LIFT_ACT} % oder mehr beträgt und jede Gruppe mindestens ${CASES_MIN} Conversions hat: Der Gewinn ist klar und belegt.`),
        tt(`Keep testing when the uplift is ${LIFT_ACT}% or more but on fewer than ${CASES_MIN} conversions, or when it is between ${LIFT_WATCH}% and ${LIFT_ACT}%.`, `Weiter testen, wenn der Uplift ${LIFT_ACT} % oder mehr beträgt, aber auf weniger als ${CASES_MIN} Conversions beruht, oder wenn er zwischen ${LIFT_WATCH} % und ${LIFT_ACT} % liegt.`),
        tt(`Stop when the uplift is below ${LIFT_WATCH}% or negative. Many conversions do not rescue a tiny uplift: they prove it is tiny.`, `Stoppen, wenn der Uplift unter ${LIFT_WATCH} % liegt oder negativ ist. Viele Conversions retten keinen winzigen Uplift: Sie belegen, dass er winzig ist.`),
        tt("A guardrail can stop a winner: if accounts that only collect points rise, or customers switch off the prompts, the element is not rolled out until the cause is fixed.", "Eine Guardrail kann einen Gewinner stoppen: Steigen Konten, die nur Punkte sammeln, oder schalten Kunden die Hinweise ab, wird das Element nicht ausgerollt, bis die Ursache behoben ist."),
        tt("Who acts follows from what the test is about: an element in the product goes to the product team, one that gives customers a service benefit goes to customer success; keep testing belongs to the data team; a stopped test has no owner.", "Wer handelt, folgt daraus, worum es im Test geht: Ein Element im Produkt geht an das Produktteam, eines, das Kunden einen Service-Vorteil gibt, an Customer Success; Weitertesten gehört dem Datenteam; ein gestoppter Test hat keinen Owner."),
      ]}
      sources={["kohavi2020", "hamari2014"]}
    >
      <ShowMore id="B4" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kohavi, Tang and Xu (2020) describe how firms that test continuously decide on each result with rules agreed before the test: a minimum effect worth shipping, a minimum sample, and guardrail metrics that veto a rollout. Hamari, Koivisto and Sarsa (2014) found that gamification effects depend on context and user, which is why each element is tested, not assumed.",
            "Kohavi, Tang und Xu (2020) beschreiben, wie Firmen, die laufend testen, über jedes Ergebnis mit Regeln entscheiden, die vor dem Test vereinbart sind: ein Mindesteffekt, der einen Rollout lohnt, eine Mindeststichprobe und Guardrail-Kennzahlen, die einen Rollout verhindern können. Hamari, Koivisto und Sarsa (2014) fanden, dass die Effekte von Gamification von Umfeld und Nutzer abhängen, weshalb jedes Element getestet statt angenommen wird.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Roll out, keep testing or stop · move the two sliders", "Ausrollen, weiter testen oder stoppen · die zwei Regler bewegen")} caption={tt("Set an uplift and a number of conversions and read which decision the rule gives.", "Stellen Sie einen Uplift und eine Zahl von Conversions ein und lesen Sie, welche Entscheidung die Regel ergibt.")}>
        <LiftCases cfg={LIFT} />
      </Diagram>
      <ShowMore id="B4" part="table" label={tt("Show the table: a worked decision on other tests (Case assumption)", "Tabelle zeigen: Eine Beispielentscheidung mit anderen Tests (Fallannahme)")}>
        <DataTable
          head={[tt("Neckar test", "Test bei Neckar"), tt("Uplift", "Uplift"), tt("Conversions", "Conversions"), tt("Rule gives", "Regel ergibt"), tt("Who acts", "Wer handelt")]}
          rows={[
            [tt("Progress bar in the set-up", "Fortschrittsleiste in der Einrichtung"), "+36%", "150", tt("Roll out", "Ausrollen"), tt("Product team", "Produktteam")],
            [tt("Referral credit for satisfied customers", "Empfehlungs-Guthaben für zufriedene Kunden"), "+28%", "30", tt("Keep testing", "Weiter testen"), tt("Data team", "Datenteam")],
            [tt("Animated confetti after every login", "Animiertes Konfetti nach jedem Login"), "+1%", "700", tt("Stop", "Stoppen"), tt("No one", "Niemand")],
          ]}
          caption={tt("A worked decision on other tests (Case assumption)", "Eine Beispielentscheidung mit anderen Tests (Fallannahme)")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardB5() {
  return (
    <MaterialCard
      id="B5"
      scan={tt("An architecture is built in order: the base first (one shared profile and the KPIs), then the data, the rules and the people, then the game elements on connected data, and the rest held back. Four tests tell you whether it holds, and with five months the time test matters. Integrate now, in stages, and say what you will watch and when you would stop.", "Eine Architektur wird der Reihe nach gebaut: zuerst die Basis (ein gemeinsames Profil und die KPIs), dann die Daten, die Regeln und die Menschen, dann die Spielelemente auf verbundenen Daten, und der Rest wird zurückgehalten. Vier Tests sagen Ihnen, ob sie hält, und bei fünf Monaten zählt der Zeittest. Integrieren Sie jetzt, in Stufen, und sagen Sie, was Sie beobachten und wann Sie aufhören würden.")}
      reasoning={[
        tt("Build in this order. The base first: the shared customer profile and retention dashboard, so every game element reads one customer. Then the data, the rules and the people: the usage data clean-up so use is recorded the same way everywhere, one rulebook for rewards, and teams trained to read the dashboard. Then the game elements that move a named customer KPI, on data that is connected. Hold back the rest.", "Bauen Sie in dieser Reihenfolge. Zuerst die Basis: gemeinsames Kundenprofil und Retention-Dashboard, damit jedes Spielelement einen Kunden liest. Dann die Daten, die Regeln und die Menschen: die Bereinigung der Nutzungsdaten, damit Nutzung überall gleich erfasst wird, ein Regelwerk für Belohnungen und Teams, die geschult sind, das Dashboard zu lesen. Dann die Spielelemente, die einen benannten Kunden-KPI bewegen, auf Daten, die verbunden sind. Den Rest halten Sie zurück."),
        tt(`Four tests check an architecture. Integration first: the shared profile and dashboard start no later than the first game element. Every funded item has a purpose: it moves a named customer KPI or makes one measurable; a black box and a points scheme that names no customer KPI do neither. Data connected: a game element starts on data of which at least ${QUALITY_BAR}% already reaches the shared profile. It fits: inside the budget and in use by month ${R2_MONTHS}.`, `Vier Tests prüfen eine Architektur. Integration zuerst: Gemeinsames Profil und Dashboard starten nicht später als das erste Spielelement. Jeder finanzierte Punkt hat einen Zweck: Er bewegt einen benannten Kunden-KPI oder macht einen messbar; eine Black Box und ein Punkteschema, das keinen Kunden-KPI nennt, tun keines von beidem. Daten verbunden: Ein Spielelement startet auf Daten, von denen mindestens ${QUALITY_BAR} % schon das gemeinsame Profil erreichen. Es passt: innerhalb des Budgets und bis Monat ${R2_MONTHS} im Einsatz.`),
        tt(`Time: an item is in use in the month = start + weeks ÷ 4, rounded up. A Now item starts in month 1; an After data is ready item starts in the month the usage data clean-up is in use, so the clean-up has to be Now itself: a clean record of use is what puts the data into the profile. With ${R2_MONTHS} months, an item of 32 weeks is in use only in month 9.`, `Zeit: Ein Punkt ist im Monat = Start + Wochen ÷ 4, aufgerundet, im Einsatz. Ein Jetzt-Punkt startet in Monat 1; ein Punkt „Wenn die Daten bereit sind“ startet in dem Monat, in dem die Bereinigung der Nutzungsdaten im Einsatz ist, die Bereinigung muss also selbst auf Jetzt stehen: Eine saubere Nutzungserfassung bringt die Daten ins Profil. Bei ${R2_MONTHS} Monaten ist ein Punkt mit 32 Wochen erst in Monat 9 im Einsatz.`),
        tt(`Three bars show where the money sits: Budget (the money against the limit), Measurable (the share on items that are measured, whose data is connected and that are in use within the ${R2_MONTHS} months) and Risk (the share on a black box, on data below ${QUALITY_BAR}% connected or on an item in use only after the ${R2_MONTHS} months). Measurable and Risk are ranges, because customers may react more weakly than the brief says: a plan that holds at both ends is the safer one.`, `Drei Balken zeigen, wo das Geld liegt: Budget (das Geld gegen die Grenze), Messbar (der Anteil auf Punkten, die gemessen werden, deren Daten verbunden sind und die innerhalb der ${R2_MONTHS} Monate im Einsatz sind) und Risiko (der Anteil auf einer Black Box, auf Daten unter ${QUALITY_BAR} % verbunden oder auf einem Punkt, der erst nach den ${R2_MONTHS} Monaten im Einsatz ist). Messbar und Risiko sind Spannen, weil Kunden schwächer reagieren können, als der Auftrag sagt: Ein Plan, der an beiden Enden hält, ist der sicherere.`),
        tt("Waiting until success is proven is also a decision: the measures stay side by side in the meantime, and a shared profile and a rulebook could start within weeks. The brief asks for an integration decision despite unclear success impact.", "Zu warten, bis der Erfolg bewiesen ist, ist auch eine Entscheidung: Die Maßnahmen bleiben in der Zwischenzeit nebeneinander, und ein gemeinsames Profil und ein Regelwerk ließen sich in Wochen starten. Der Auftrag verlangt eine Integrationsentscheidung trotz unklarer Erfolgswirkung."),
        tt("Buying one big game platform at once feels like catching up, but it is in use only after 32 weeks, takes most of the budget, and nothing is measured before the money is spent. Staging changes something for customers within weeks and spends the rest as the evidence arrives.", "Eine große Spieleplattform auf einmal zu kaufen fühlt sich wie Aufholen an, ist aber erst nach 32 Wochen in Betrieb, nimmt den Großteil des Budgets, und nichts wird gemessen, bevor das Geld ausgegeben ist. Stufenweise ändert sich innerhalb von Wochen etwas für Kunden, und der Rest wird ausgegeben, während die Evidenz kommt."),
        tt("Fund inside the budget, and fund nothing nobody at the company can explain or measure: a black box that decides rewards by itself cannot be steered. Points for every login with a public leaderboard, not connected to the membership tool, pay for clicks and name no customer KPI.", "Finanzieren Sie innerhalb des Budgets, und nichts, was im Unternehmen niemand erklären oder messen kann: Eine Black Box, die Belohnungen selbst entscheidet, lässt sich nicht steuern. Punkte für jeden Login mit einer öffentlichen Rangliste, nicht mit dem Mitgliedschaftstool verbunden, bezahlen Klicks und nennen keinen Kunden-KPI."),
        tt("What you will watch is one figure about customers (the share of new customers who finish set-up, the accounts that only collect points), not what you hand out (points awarded, badges, leaderboard visits), the month it can first be read, and what you do if it falls short: stop, pause or change one thing.", "Was Sie beobachten, ist eine Zahl über Kunden (der Anteil der Neukunden, die die Einrichtung abschließen, die Konten, die nur Punkte sammeln), nicht das, was Sie ausgeben (vergebene Punkte, Badges, Ranglisten-Besuche), der Monat, in dem sie sich zuerst lesen lässt, und was Sie tun, wenn sie zu kurz greift: stoppen, pausieren oder eine Sache ändern."),
        tt("Every plan gives something and costs something. Say what it gives (measured, connected, inside the budget and the months) and what it leaves open (an item not now, data below 80% if customers react more weakly, budget left unspent). A plan that differs from this order can still be argued: say why.", "Jeder Plan gibt etwas und kostet etwas. Sagen Sie, was er gibt (gemessen, verbunden, innerhalb von Budget und Monaten) und was er offen lässt (ein Punkt, der jetzt nicht kommt, Daten unter 80 %, wenn Kunden schwächer reagieren, ungenutztes Budget). Ein Plan, der von dieser Reihenfolge abweicht, lässt sich trotzdem vertreten: Sagen Sie, warum."),
      ]}
      sources={["courtney1997", "klein2007"]}
    >
      <Diagram label={tt("A progress path and its base · a worked example on Neckar Systeme", "Ein Fortschrittspfad und seine Basis · ein Beispiel mit Neckar Systeme")} caption={tt("Change when the shared profile starts and how much of the data is connected, and watch the links.", "Ändern Sie, wann das gemeinsame Profil startet und wie viel der Daten verbunden ist, und beobachten Sie die Verbindungen.")}>
        <ArchMini cfg={ARCH_MINI} />
      </Diagram>
      <ShowMore id="B5" part="calc" label={tt("Show the worked numbers on another company (Case assumption)", "Die Rechenwege an einem anderen Unternehmen zeigen (Fallannahme)")}>
        <DataTable
          head={[tt("Rule", "Regel"), tt("Neckar's figures", "Zahlen von Neckar"), tt("Result", "Ergebnis")]}
          rows={[
            [tt("Month in use: starts in month 1, needs 8 weeks", "Monat im Einsatz: startet in Monat 1, braucht 8 Wochen"), "1 + 8 ÷ 4 = 1 + 2", tt("month 3", "Monat 3")],
            [tt("After data is ready: the usage data clean-up is in use in month 2, the item needs 10 weeks", "Wenn die Daten bereit sind: Die Bereinigung der Nutzungsdaten ist in Monat 2 im Einsatz, der Punkt braucht 10 Wochen"), "2 + 10 ÷ 4 = 2 + 3", tt("starts month 2, in use month 5", "Start Monat 2, im Einsatz Monat 5")],
            [tt("Time: a platform of 28 weeks that starts in month 1, in a plan of 5 months", "Zeit: eine Plattform mit 28 Wochen, die in Monat 1 startet, in einem Plan von 5 Monaten"), "1 + 28 ÷ 4 = 1 + 7", tt("month 8: too late", "Monat 8: zu spät")],
            [tt("Data connected: the path's data is 90% connected, the bar is 80%", "Daten verbunden: Die Daten des Pfads sind zu 90 % verbunden, die Grenze ist 80 %"), "90 ≥ 80", tt("ready", "bereit")],
            [tt("The same path when customers react more weakly and the data is 15 points weaker", "Derselbe Pfad, wenn Kunden schwächer reagieren und die Daten 15 Punkte schwächer sind"), "90 − 15 = 75 < 80", tt("not ready", "nicht bereit")],
            [tt("Money: three funded items against Neckar's €160,000", "Geld: drei finanzierte Punkte gegen Neckars 160.000 €"), "70,000 + 30,000 + 20,000", tt("€120,000, €40,000 left", "120.000 €, 40.000 € übrig")],
          ]}
          caption={tt("Neckar's numbers (Case assumption). The panel in the task does this for you and says what it means.", "Zahlen von Neckar (Fallannahme). Das Panel in der Aufgabe macht das für Sie und sagt, was es bedeutet.")}
        />
      </ShowMore>
      <ShowMore id="B5" part="notes" label={tt("Show two short notes", "Zwei kurze Hinweise zeigen")}>
        <Bul
          items={[
            tt("Stage it: the no-regret items first (the shared profile, the rulebook), the game elements that need more connected data when the usage data is clean.", "Stufenweise: die No-regret-Punkte zuerst (gemeinsames Profil, Regelwerk), die Spielelemente, die mehr verbundene Daten brauchen, wenn die Nutzungsdaten sauber sind."),
            tt("Premortem: imagine the plan failed after five months, and write down why. Those reasons are what you watch.", "Premortem: Stellen Sie sich vor, der Plan sei nach fünf Monaten gescheitert, und schreiben Sie auf, warum. Diese Gründe beobachten Sie."),
          ]}
        />
      </ShowMore>
      <ShowMore id="B5" part="extra" label={tt("Show: Unclear success impact is not a reason to bet everything, or nothing", "Zeigen: Unklare Erfolgswirkung ist kein Grund, alles oder nichts zu setzen")}>
        <Callout label={tt("Unclear success impact is not a reason to bet everything, or nothing", "Unklare Erfolgswirkung ist kein Grund, alles oder nichts zu setzen")} tone="signal">
          <p>{tt("Courtney, Kirkland and Viguerie (1997) advise matching the commitment to what is known: no-regret moves now, options that can be scaled later, and big bets only when the evidence is in. A staged integration with a sentence on what you watch is decisive and still honest about what you do not know yet.", "Courtney, Kirkland und Viguerie (1997) raten, die Festlegung an das Bekannte anzupassen: No-regret-Schritte jetzt, Optionen, die sich später ausweiten lassen, und große Wetten erst, wenn die Evidenz da ist. Eine gestufte Integration mit einem Satz dazu, was Sie beobachten, ist entschlossen und trotzdem ehrlich darüber, was Sie noch nicht wissen.")}</p>
        </Callout>
      </ShowMore>
    </MaterialCard>
  );
}

export const CARDS_B = [CardB1, CardB2, CardB3, CardB4, CardB5];
