"use client";

import { Bul, Diagram } from "@/components/materi/kit";
import { BarToggle, FairTest, KpiTree, SceneCards, ScatterMap, ScoreBars, TwoRates } from "@/components/materi/diagrams";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { BAR_RATES, FAIR, KPI_TREE, MECH, MOMENTS, PRIZE, SCORE } from "@/data/diagramData";
import { LEVEL_TESTS } from "@/data/ladder";
import { PATTERNS, PATTERN_IDS, PATTERN_PAIR_TESTS, RISK_RULE } from "@/data/patterns";
import { EFFECT_ANCHOR, EXPLAIN_RULE, SCALE_ANCHOR } from "@/data/measures";
import { MOSEL, MOSEL_RESULT } from "@/data/forecast";
import { euro, num, pct, tt } from "@/lib/lang";

/** Materi A: the seven cards of Route 1 (Levels 1 and 2 on one case). 60 minutes in all; A1 (Level 1) and A7 (Level 2) are the two Core cards (CLAUDE.md #48). */
const p = "text-body text-ink";

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("Gamification means using game elements, such as rewards, rankings and progress bars, in something that is not a game. In customer retention it works when the customer already wants the result and the element only helps them get there. When they do it only for the prize, the behaviour is artificial and stops with the prize. There are three mechanisms: a reward, competition, and progress and status.", "Gamification heißt, Spielelemente wie Belohnungen, Ranglisten und Fortschrittsleisten in etwas zu nutzen, das kein Spiel ist. In der Kundenbindung wirkt sie, wenn der Kunde das Ergebnis ohnehin will und das Element ihm nur dorthin hilft. Tut er es nur für den Preis, ist das Verhalten künstlich und hört mit dem Preis auf. Es gibt drei Mechanismen: eine Belohnung, Wettbewerb, und Fortschritt und Status.")}
      reasoning={[
        tt("Gamification is a tool, not a goal. Start from the customer behaviour you want (finish set-up, use more features, invite a colleague) and ask why the customer would want it too.", "Gamification ist ein Werkzeug, kein Ziel. Gehen Sie vom Kundenverhalten aus, das Sie wollen (die Einrichtung abschließen, mehr Funktionen nutzen, einen Kollegen einladen), und fragen Sie, warum der Kunde es auch wollen würde."),
        ...LEVEL_TESTS.map((x) => `${x.name}: ${x.test}`),
        tt("Real motivation or a short-term incentive? Ask: would the customer do it without the prize? If yes, the element supports real motivation and keeps working when the novelty is gone. If no, it buys a click and stops with the prize.", "Echte Motivation oder kurzfristiger Anreiz? Fragen Sie: Würde der Kunde es ohne den Preis tun? Wenn ja, stützt das Element echte Motivation und wirkt weiter, wenn die Neuheit verflogen ist. Wenn nein, kauft es einen Klick und hört mit dem Preis auf."),
        tt("Choose the moment where the customer wants the result: a first project, inviting colleagues. A prize for something nobody wants (opening a newsletter, writing a rating) buys the click, not the habit, and it is the risk the plan asks you to name: artificial behaviour.", "Wählen Sie den Moment, in dem der Kunde das Ergebnis will: ein erstes Projekt, Kollegen einladen. Ein Preis für etwas, das niemand will (einen Newsletter öffnen, eine Bewertung schreiben), kauft den Klick, nicht die Gewohnheit, und es ist das Risiko, das der Plan Sie benennen lässt: künstliches Verhalten."),
        tt("A reward works best as help that deepens real use (consultant hours, a training seat), not as a discount: a discount trains customers to wait for the next one.", "Eine Belohnung wirkt am besten als Hilfe, die die echte Nutzung vertieft (Beraterstunden, ein Schulungsplatz), nicht als Rabatt: Ein Rabatt bringt Kunden bei, auf den nächsten zu warten."),
        tt("Competition motivates the few at the top and can discourage the many. Where it is used, keep it private or among similar companies. Progress and status measure the customer against their own path, and a title or level stays theirs; that is why a progress path rarely discourages.", "Wettbewerb motiviert die wenigen an der Spitze und kann die vielen entmutigen. Wo er genutzt wird, halten Sie ihn privat oder unter ähnlichen Unternehmen. Fortschritt und Status messen den Kunden an seinem eigenen Weg, und ein Titel oder eine Stufe bleibt ihm; deshalb entmutigt ein Fortschrittspfad selten."),
        tt("Watch for artificial behaviour: accounts with many points and almost no real use are the sign that a reward pays for clicks. Too many elements at once (levels, badges, streaks and quests) cannot be explained, tested or kept going: start with one.", "Achten Sie auf künstliches Verhalten: Konten mit vielen Punkten und kaum echter Nutzung sind das Zeichen, dass eine Belohnung Klicks bezahlt. Zu viele Elemente auf einmal (Stufen, Badges, Serien und Quests) lassen sich nicht erklären, testen oder am Laufen halten: Beginnen Sie mit einem."),
        tt("A game idea of your own names a moment on the platform, the mechanism, and what the customer gains (“so …”): a real result, not a prize for a click.", "Eine eigene Spielidee nennt einen Moment auf der Plattform, den Mechanismus, und was der Kunde gewinnt („sodass …“): ein echtes Ergebnis, kein Preis für einen Klick."),
      ]}
      sources={["deterding2011", "ryan2000", "hamari2014"]}
    >
      <ShowMore id="A1" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Deterding and colleagues (2011) define gamification as the use of game design elements in settings that are not games. Hamari, Koivisto and Sarsa (2014) reviewed the studies and found mostly positive effects that depend on the context and on the user. Ryan and Deci (2000) explain why: people stay motivated when they want the activity itself, and prizes and control can push that out. Nunes and Drèze (2006) and Kivetz, Urminsky and Zheng (2006) show why progress works: people put in more effort the closer they can see the goal.",
            "Deterding und Kollegen (2011) definieren Gamification als die Nutzung von Spielelementen in Umfeldern, die keine Spiele sind. Hamari, Koivisto und Sarsa (2014) werteten die Studien aus und fanden meist positive Effekte, die vom Umfeld und vom Nutzer abhängen. Ryan und Deci (2000) erklären warum: Menschen bleiben motiviert, wenn sie die Tätigkeit selbst wollen, und Preise und Kontrolle können das verdrängen. Nunes und Drèze (2006) sowie Kivetz, Urminsky und Zheng (2006) zeigen, warum Fortschritt wirkt: Menschen strengen sich mehr an, je näher sie das Ziel sehen.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Three mechanisms, three states · a worked example on Elbe Cloudwerk", "Drei Mechanismen, drei Zustände · ein Beispiel mit Elbe Cloudwerk")} caption={tt("Choose a mechanism and a state and read what the customer experiences; then try the worked sort below.", "Wählen Sie einen Mechanismus und einen Zustand und lesen Sie, was der Kunde erlebt; probieren Sie dann die Beispielsortierung darunter.")}>
        <SceneCards cfg={MECH} />
      </Diagram>
      <ShowMore id="A1" part="notes" label={tt("Show two short notes", "Zwei kurze Hinweise zeigen")}>
        <Bul
          items={[
            tt("Reward: the customer receives something for doing it. Competition: their place depends on what others do. Progress and status: they see their own path, or hold a title that stays theirs.", "Belohnung: Der Kunde erhält etwas dafür, dass er es tut. Wettbewerb: Sein Platz hängt davon ab, was andere tun. Fortschritt und Status: Er sieht seinen eigenen Weg oder hält einen Titel, der ihm bleibt."),
            tt("A game element is never the whole retention plan: it has to join the membership programme, the referral scheme and the customer profile that already exist (Materi A7).", "Ein Spielelement ist nie der ganze Kundenbindungsplan: Es muss das Mitgliedschaftsprogramm, das Empfehlungsprogramm und das Kundenprofil verbinden, die es schon gibt (Materi A7)."),
          ]}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("A prize can lift a number for a while, but only an action the customer wants keeps going after the prize stops. The test is simple: would the customer do it without the prize? Where the answer is no, the game element creates artificial behaviour, and the accounts with many points but no real use pile up.", "Ein Preis kann eine Zahl eine Zeit lang heben, aber nur eine Handlung, die der Kunde will, geht weiter, wenn der Preis endet. Der Test ist einfach: Würde der Kunde es ohne den Preis tun? Lautet die Antwort Nein, erzeugt das Spielelement künstliches Verhalten, und die Konten mit vielen Punkten, aber ohne echte Nutzung, häufen sich.")}
      reasoning={[
        tt("Real motivation: the customer does it for its own result. Short-term incentive: the customer does it for the prize and stops when the prize stops.", "Echte Motivation: Der Kunde tut es um seines Ergebnisses willen. Kurzfristiger Anreiz: Der Kunde tut es für den Preis und hört auf, wenn der Preis endet."),
        tt("The test: take the prize away in your head. If the behaviour stays, the element only helped. If it collapses, you bought it.", "Der Test: Nehmen Sie den Preis gedanklich weg. Bleibt das Verhalten, hat das Element nur geholfen. Bricht es ein, haben Sie es gekauft."),
        tt("A prize for something people already want can lower their interest once the prize ends (Deci et al. 1999): reward the milestone that serves the customer, not the click.", "Ein Preis für etwas, das Menschen ohnehin wollen, kann ihr Interesse senken, sobald der Preis endet (Deci et al. 1999): Belohnen Sie den Meilenstein, der dem Kunden dient, nicht den Klick."),
        tt("Wherever the wrong behaviour is rewarded, customers learn it: they log in for the points and open nothing else.", "Wo das falsche Verhalten belohnt wird, lernen Kunden es: Sie loggen sich für die Punkte ein und öffnen sonst nichts."),
        tt("The numbers that show it: accounts with many points but almost no real use rise (a guardrail), and points awarded rise while renewals do not (a vanity metric).", "Die Zahlen, die es zeigen: Konten mit vielen Punkten, aber kaum echter Nutzung, nehmen zu (eine Guardrail), und vergebene Punkte steigen, während Verlängerungen nicht steigen (eine Vanity Metric)."),
        tt("A discount is a prize that is also a price cut: customers learn to wait for it, and it connects to nothing.", "Ein Rabatt ist ein Preis, der zugleich eine Preissenkung ist: Kunden lernen, darauf zu warten, und er ist mit nichts verbunden."),
      ]}
      sources={["ryan2000", "deci1999", "hamari2017"]}
    >
      <ShowMore id="A2" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Deci, Koestner and Ryan (1999) combined 128 experiments and found that tangible rewards for an activity people already enjoy tend to lower their interest in it once the reward ends. Hamari (2017) ran a field experiment with badges and found that they raised activity, but that the effect depended on what the badges were for. Both point to the same rule: reward what serves the customer.",
            "Deci, Koestner und Ryan (1999) fassten 128 Experimente zusammen und fanden, dass greifbare Belohnungen für eine Tätigkeit, die Menschen ohnehin gern tun, ihr Interesse daran tendenziell senken, sobald die Belohnung endet. Hamari (2017) führte ein Feldexperiment mit Badges durch und fand, dass sie die Aktivität hoben, der Effekt aber davon abhing, wofür die Badges standen. Beides weist auf dieselbe Regel: Belohnen Sie, was dem Kunden dient.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("What is left when the prize stops · a worked example on Elbe Cloudwerk", "Was bleibt, wenn der Preis endet · ein Beispiel mit Elbe Cloudwerk")} caption={tt("Switch between the time the prize is paid and the time after it stops, and choose an action.", "Wechseln Sie zwischen der Zeit, in der der Preis gezahlt wird, und der Zeit danach, und wählen Sie eine Handlung.")}>
        <BarToggle cfg={PRIZE} />
      </Diagram>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Not every moment on the platform needs a game element. A game element helps most where the customer wants the result and many stop. It can plug into what exists only where part or all of the membership, referral and profile data already reaches the moment.", "Nicht jeder Moment auf der Plattform braucht ein Spielelement. Ein Spielelement hilft am meisten dort, wo der Kunde das Ergebnis will und viele aufhören. Es kann sich nur dort an Bestehendes anschließen, wo ein Teil oder alle Daten aus Mitgliedschaft, Empfehlung und Profil den Moment schon erreichen.")}
      reasoning={[
        tt("A game element helps most where two things hold: the customer wants the result of the step, and 25% or more stop there. Help those moments first.", "Ein Spielelement hilft am meisten, wo zwei Dinge gelten: Der Kunde will das Ergebnis des Schritts, und 25 % oder mehr hören dort auf. Helfen Sie diesen Momenten zuerst."),
        tt("Many stopping is not enough: nobody wants to open the platform because of a newsletter or to write a rating, so a prize there buys clicks, not a habit. A moment where the customer wants the result but few stop works already; it is not the first place to act.", "Dass viele aufhören, reicht nicht: Niemand will wegen eines Newsletters die Plattform öffnen oder eine Bewertung schreiben, also kauft ein Preis dort Klicks, keine Gewohnheit. Ein Moment, in dem der Kunde das Ergebnis will, aber wenige aufhören, funktioniert schon; er ist nicht der erste Ort zum Handeln."),
        tt("A game element plugs into what exists where part or all of the data of the membership programme, the referral scheme and the customer profile reaches the moment: it can read the customer's level, who they might invite, what they used last.", "Ein Spielelement schließt sich dort an Bestehendes an, wo ein Teil oder alle Daten des Mitgliedschaftsprogramms, des Empfehlungsprogramms und des Kundenprofils den Moment erreichen: Es kann die Stufe des Kunden lesen, wen er einladen könnte, was er zuletzt nutzte."),
        tt("Where nothing is connected, a game element stands alone and adds one more island: choose it only if the moment is one that helps most.", "Wo nichts verbunden ist, steht ein Spielelement allein und fügt eine weitere Insel hinzu: Wählen Sie es nur, wenn der Moment einer ist, in dem es am meisten hilft."),
        tt("A progress path suits moments that lead to something the customer wants (a first project); a reward suits a finished milestone; competition rarely suits a moment where many are still stuck at the start.", "Ein Fortschrittspfad passt zu Momenten, die zu etwas führen, das der Kunde will (ein erstes Projekt); eine Belohnung passt zu einem abgeschlossenen Meilenstein; Wettbewerb passt selten zu einem Moment, in dem viele noch am Anfang feststecken."),
        tt("Three simple approaches use three different mechanisms and each says what the customer gains (“so …”).", "Drei einfache Ansätze nutzen drei verschiedene Mechanismen, und jeder sagt, was der Kunde gewinnt („sodass …“)."),
      ]}
      sources={["kivetz2006", "nunes2006"]}
    >
      <ShowMore id="A3" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kivetz, Urminsky and Zheng (2006) found that people speed up as a goal gets closer and that a visible path keeps customers going; Nunes and Drèze (2006) found that customers work harder towards a goal when they can see progress already made. That is why the first moments, where customers have not yet got going, are where a progress path pays.",
            "Kivetz, Urminsky und Zheng (2006) fanden, dass Menschen schneller werden, je näher ein Ziel rückt, und dass ein sichtbarer Weg Kunden bei der Stange hält; Nunes und Drèze (2006) fanden, dass Kunden sich mehr auf ein Ziel hin anstrengen, wenn sie schon gemachten Fortschritt sehen. Deshalb sind die ersten Momente, in denen Kunden noch nicht in Gang gekommen sind, dort, wo sich ein Fortschrittspfad auszahlt.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Where game elements help, and where they plug in · a worked example on Elbe Cloudwerk", "Wo Spielelemente helfen, und wo sie sich anschließen · ein Beispiel mit Elbe Cloudwerk")} caption={tt("Choose a moment on the map or in the list and read where it falls and why.", "Wählen Sie einen Moment auf der Karte oder in der Liste und lesen Sie, wo er liegt und warum.")}>
        <ScatterMap cfg={MOMENTS} />
      </Diagram>
      <ShowMore id="A3" part="table" label={tt("Show the table: three systems and what a game element needs from each", "Tabelle zeigen: Drei Systeme und was ein Spielelement von jedem braucht")}>
        <DataTable
          head={[tt("What exists", "Was existiert"), tt("What it holds", "Was es enthält"), tt("What a game element needs from it", "Was ein Spielelement davon braucht")]}
          rows={[
            [tt("Membership programme", "Mitgliedschaftsprogramm"), tt("The customer's level and the benefits they hold", "Die Stufe des Kunden und die Vorteile, die er hat"), tt("A benefit to hand over that serves the customer", "Einen Vorteil zum Übergeben, der dem Kunden dient")],
            [tt("Referral scheme", "Empfehlungsprogramm"), tt("Who invited whom, and whether the invited customer stayed", "Wer wen eingeladen hat, und ob der eingeladene Kunde blieb"), tt("A way to pay only for a customer who stays", "Einen Weg, nur für einen Kunden zu zahlen, der bleibt")],
            [tt("Customer profile", "Kundenprofil"), tt("What the customer used and when", "Was der Kunde nutzte und wann"), tt("The next step to show and who is ready to be asked", "Den nächsten Schritt, den man zeigt, und wer bereit ist, gefragt zu werden")],
          ]}
          caption={tt("Three systems and what a game element needs from each", "Drei Systeme und was ein Spielelement von jedem braucht")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA4() {
  const r = MOSEL_RESULT;
  return (
    <MaterialCard
      id="A4"
      scan={tt("To put a euro figure on a set-up bar, compare how often new customers finished set-up when they saw the bar and when they did not. Three figures read it: the finish rate of each group, the lift, and the extra revenue a year.", "Um einer Einrichtungsleiste einen Euro-Wert zu geben, vergleichen Sie, wie oft Neukunden die Einrichtung abschlossen, wenn sie die Leiste sahen, und wenn nicht. Drei Werte lesen es: die Abschlussquote jeder Gruppe, der Lift und der zusätzliche Umsatz pro Jahr.")}
      reasoning={[
        tt("Finish rate = finished set-ups ÷ new customers × 100. Take both numbers from the same group's rows.", "Abschlussquote = abgeschlossene Einrichtungen ÷ Neukunden × 100. Nehmen Sie beide Zahlen aus den Zeilen derselben Gruppe."),
        tt("Lift = finish rate with the bar ÷ finish rate without it. Work out the second rate from its own rows first; the groups are not the same size, so compare rates, never counts.", "Lift = Abschlussquote mit Leiste ÷ Abschlussquote ohne. Berechnen Sie die zweite Quote zuerst aus ihren eigenen Zeilen; die Gruppen sind nicht gleich groß, also vergleichen Sie Quoten, nie Zahlen."),
        tt("Extra revenue a year = new customers a year × (rate with − rate without, as a share of one) × the extra yearly value of a customer who finishes set-up. Only the difference counts: customers without the bar would have finished their share anyway. One point is 0.01.", "Zusätzlicher Umsatz pro Jahr = Neukunden pro Jahr × (Quote mit − Quote ohne, als Anteil von eins) × der zusätzliche Jahreswert eines Kunden, der die Einrichtung abschließt. Nur der Unterschied zählt: Kunden ohne die Leiste hätten ihren Anteil ohnehin abgeschlossen. Ein Punkt ist 0,01."),
        tt("Use the new customers of a whole year, not the customers of one group.", "Nehmen Sie die Neukunden eines ganzen Jahres, nicht die Kunden einer Gruppe."),
        tt("These figures compare customers who happened to see the bar or not, so they are not yet a fair test: say them as an estimate, and test fairly before you promise the full amount (Materi A6).", "Diese Werte vergleichen Kunden, die die Leiste zufällig sahen oder nicht, sind also noch kein fairer Test: Sagen Sie sie als Schätzung, und testen Sie fair, bevor Sie den ganzen Betrag versprechen (Materi A6)."),
        tt("A sentence about a set-up bar quotes at least one figure, says what to change first, and how sure it can be.", "Ein Satz über eine Einrichtungsleiste nennt mindestens einen Wert, sagt, was zuerst zu ändern ist, und wie sicher man sein kann."),
      ]}
      sources={["provost2013", "nunes2006"]}
    >
      <ShowMore id="A4" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Provost and Fawcett (2013) name rates, lift and expected value as the basic tools for reading any comparison: compare two groups, and put a value on the difference. The worked example uses Elbe Cloudwerk's numbers; the steps are the same for any company.",
            "Provost und Fawcett (2013) nennen Raten, Lift und Erwartungswert als Grundwerkzeuge, um jeden Vergleich zu lesen: zwei Gruppen vergleichen und dem Unterschied einen Wert geben. Das Beispiel nutzt die Zahlen von Elbe Cloudwerk; die Schritte sind für jedes Unternehmen gleich.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("What a set-up bar is worth · worked example on Elbe Cloudwerk (Case assumption)", "Was eine Einrichtungsleiste wert ist · Beispiel mit Elbe Cloudwerk (Fallannahme)")} caption={tt("Move the slider to change how many new customers Elbe has in a year.", "Bewegen Sie den Regler, um zu ändern, wie viele Neukunden Elbe pro Jahr hat.")}>
        <TwoRates cfg={BAR_RATES} />
      </Diagram>
      <ShowMore id="A4" part="calc" label={tt("Show the table: the four steps, on other numbers than the task", "Tabelle zeigen: Die vier Schritte, mit anderen Zahlen als in der Aufgabe")}>
        <DataTable
          head={[tt("Step", "Schritt"), tt("Calculation · Elbe Cloudwerk", "Rechnung · Elbe Cloudwerk"), tt("Result", "Ergebnis")]}
          rows={[
            [tt("1 · Finish rate with the bar", "1 · Abschlussquote mit Leiste"), `${MOSEL.variant.orders} ÷ ${num(MOSEL.variant.sent)} × 100`, pct(r.rate)],
            [tt("2 · Finish rate without it", "2 · Abschlussquote ohne"), `${MOSEL.control.orders} ÷ ${num(MOSEL.control.sent)} × 100`, pct(r.other)],
            [tt("3 · Lift", "3 · Lift"), `${num(r.rate)} ÷ ${num(r.other)}`, tt(`${num(r.lift)} times`, `${num(r.lift)}-mal`)],
            [tt("4 · Extra revenue a year", "4 · Zusätzlicher Umsatz pro Jahr"), `${num(MOSEL.yearly)} × ${num((r.rate - r.other) / 100)} × ${euro(MOSEL.order)}`, euro(r.extra)],
          ]}
          caption={tt("The four steps, on other numbers than the task", "Die vier Schritte, mit anderen Zahlen als in der Aufgabe")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("If every game element reports its own numbers, nobody sees whether customers really use the platform more. Measure what customers do: an outcome KPI is the result (renewals, revenue, customers kept); a driver KPI comes before it (finished set-up, features used); a guardrail must not get worse (accounts that only collect points); a vanity metric counts what you hand out (points, badges).", "Wenn jedes Spielelement seine eigenen Zahlen berichtet, sieht niemand, ob Kunden die Plattform wirklich mehr nutzen. Messen Sie, was Kunden tun: Ein Outcome-KPI ist das Ergebnis (Verlängerungen, Umsatz, gehaltene Kunden); ein Treiber-KPI kommt davor (abgeschlossene Einrichtung, genutzte Funktionen); eine Guardrail darf nicht schlechter werden (Konten, die nur Punkte sammeln); eine Vanity Metric zählt, was Sie ausgeben (Punkte, Badges).")}
      reasoning={[
        ...PATTERN_IDS.map((x) => `${PATTERNS[x].label}: ${PATTERNS[x].test}`),
        ...PATTERN_PAIR_TESTS.map((x) => `${x.pair} ${x.test}`),
        tt("Tag what a metric measures, not how it behaved last year: a driver that did not move with value is still a driver. Inviting a colleague counts as a driver although it did not move with value last year: it comes before the renewal and onboarding moves it.", "Ordnen Sie zu, was eine Kennzahl misst, nicht wie sie sich letztes Jahr verhielt: Ein Treiber, der sich nicht mit dem Wert bewegte, ist trotzdem ein Treiber. Einen Kollegen einzuladen zählt als Treiber, obwohl es sich letztes Jahr nicht mit dem Wert bewegte: Es kommt vor der Verlängerung, und das Onboarding bewegt es."),
        RISK_RULE.v,
        tt("How to use each kind: outcome → the target on the management dashboard; driver → the team that owns onboarding, reviewed weekly; guardrail → a limit that stops a game element when it is crossed; vanity → stop reporting it as success. A bonus on a number rewards reporting it, not moving it.", "Wie man jede Art nutzt: Outcome → das Ziel im Management-Dashboard; Treiber → das Team, dem das Onboarding gehört, wöchentlich geprüft; Guardrail → eine Grenze, die ein Spielelement stoppt, wenn sie überschritten wird; Vanity → nicht mehr als Erfolg berichten. Ein Bonus auf eine Zahl belohnt, dass sie berichtet wird, nicht dass sie bewegt wird."),
        tt("A good set of three KPIs has at least one outcome and one driver, each with where the number comes from, what you would aim for and why it is a KPI; a guardrail is a strong third.", "Ein gutes Set aus drei KPIs hat mindestens ein Outcome und einen Treiber, jeder mit Quelle der Zahl, dem, was Sie anstreben würden, und warum er ein KPI ist; eine Guardrail ist ein starker dritter."),
      ]}
      sources={["kaplan1992", "ries2011", "hubbard2014"]}
    >
      <ShowMore id="A5" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kaplan and Norton (1992) argued that managers should steer by a few linked measures: the results, and the drivers that lead to them. Ries (2011) called the numbers that go up whatever you do “vanity metrics”. Hubbard (2014) advises measuring what would change a decision.",
            "Kaplan und Norton (1992) forderten, dass Führungskräfte nach wenigen verbundenen Kennzahlen steuern: den Ergebnissen und den Treibern, die zu ihnen führen. Ries (2011) nannte die Zahlen, die steigen, egal was man tut, „Vanity Metrics“. Hubbard (2014) rät, zu messen, was eine Entscheidung ändern würde.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("A KPI tree for game elements · a worked example on Elbe Cloudwerk", "Ein KPI-Baum für Spielelemente · ein Beispiel mit Elbe Cloudwerk")} caption={tt("Choose a metric to read its kind, then show whether each moved with customer value last year.", "Wählen Sie eine Kennzahl, um ihre Art zu lesen, und zeigen Sie dann, ob sich jede letztes Jahr mit dem Kundenwert bewegte.")}>
        <KpiTree cfg={KPI_TREE} />
      </Diagram>
      <ShowMore id="A5" part="table" label={tt("Show the table: the four kinds of metric", "Tabelle zeigen: Die vier Arten von Kennzahlen")}>
        <DataTable
          head={[tt("Kind", "Art"), tt("What it is", "Was es ist"), tt("Where it sits", "Wo es steht")]}
          rows={PATTERN_IDS.map((x) => [PATTERNS[x].label, PATTERNS[x].means, PATTERNS[x].shape])}
          caption={tt("The four kinds of metric", "Die vier Arten von Kennzahlen")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA6() {
  return (
    <MaterialCard
      id="A6"
      scan={tt("Two tools tell you whether a game element works. A fair A/B test shows the cause: one change, a random split in the same weeks, judged by the result, with a size fixed before the start. Reading trends shows the direction: a change that holds over several periods, not one good week.", "Zwei Werkzeuge zeigen, ob ein Spielelement wirkt. Ein fairer A/B-Test zeigt die Ursache: eine Änderung, eine zufällige Aufteilung in denselben Wochen, am Ergebnis gemessen, mit einer vor dem Start festgelegten Größe. Trends zu lesen zeigt die Richtung: eine Veränderung, die über mehrere Zeiträume hält, nicht eine gute Woche.")}
      reasoning={[
        tt("One change: if the variant differs in two things and wins, nobody knows which one did it.", "Eine Änderung: Unterscheidet sich die Variante in zwei Dingen und gewinnt, weiß niemand, welches es war."),
        tt("A random split in the same weeks: comparing with last quarter, partner sign-ups with direct sign-ups, or customers who chose to hide the bar lets something other than the change explain the difference.", "Eine zufällige Aufteilung in denselben Wochen: Der Vergleich mit dem Vorquartal, von Partner-Anmeldungen mit Direkt-Anmeldungen oder mit Kunden, die die Leiste ausblenden wollten, lässt etwas anderes als die Änderung den Unterschied erklären."),
        tt("The KPI that decides is the result the problem is about (for customers who never get going: the share who finish set-up), not views of the bar and not points awarded.", "Der KPI, der entscheidet, ist das Ergebnis, um das es beim Problem geht (bei Kunden, die nie in Gang kommen: der Anteil, der die Einrichtung abschließt), nicht Aufrufe der Leiste und nicht vergebene Punkte."),
        tt("Fix the size before you start: about 100 finished set-ups per group and at least one full onboarding cycle. Stopping when the variant is ahead picks a lucky moment.", "Legen Sie die Größe vor dem Start fest: etwa 100 abgeschlossene Einrichtungen pro Gruppe und mindestens ein voller Onboarding-Zyklus. Zu stoppen, wenn die Variante vorn liegt, wählt einen glücklichen Moment."),
        tt("Write the hypothesis (“if we …, then … rises, because …”) and the decision rule (roll out, keep testing, stop, and which guardrail must hold) before the test starts.", "Schreiben Sie die Hypothese („wenn wir …, dann steigt …, weil …“) und die Entscheidungsregel (ausrollen, weiter testen, stoppen, und welche Guardrail halten muss) vor dem Teststart auf."),
        tt("A trend is a change that holds for several periods in a row; one good week is noise. Compare the same periods and look at the groups: a rise in one group and a fall in another may be one shift, not two trends.", "Ein Trend ist eine Veränderung, die mehrere Zeiträume in Folge hält; eine gute Woche ist Rauschen. Vergleichen Sie gleiche Zeiträume und schauen Sie auf die Gruppen: Ein Anstieg in einer Gruppe und ein Rückgang in einer anderen können eine Verschiebung sein, nicht zwei Trends."),
        tt("A trend shows where to look, not why: use it to choose what to test, then test before you scale. A game element that works only while it is new will show as a rise that fades: watch the following quarters.", "Ein Trend zeigt, wo man hinschauen muss, nicht warum: Nutzen Sie ihn, um zu wählen, was getestet wird, und testen Sie dann, bevor Sie ausweiten. Ein Spielelement, das nur wirkt, solange es neu ist, zeigt sich als Anstieg, der verblasst: Beobachten Sie die folgenden Quartale."),
        tt("Real uncertainties: a small base, the bar shown only to engaged customers (not a fair split), use that is not logged (the mobile app), and a new release that changes what customers use. “More points always mean more motivation”, “once the game is live the motivation lasts” and “the more badges, the more engaged” are mistakes, not uncertainties.", "Echte Unsicherheiten: eine kleine Basis, die Leiste nur engagierten Kunden gezeigt (keine faire Aufteilung), Nutzung, die nicht protokolliert wird (die Mobile-App), und ein neues Release, das ändert, was Kunden nutzen. „Mehr Punkte bedeuten immer mehr Motivation“, „sobald das Spiel läuft, hält die Motivation an“ und „je mehr Badges, desto engagierter“ sind Fehler, keine Unsicherheiten."),
      ]}
      sources={["kohavi2020", "hubbard2014"]}
    >
      <ShowMore id="A6" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kohavi, Tang and Xu (2020) collected what makes controlled experiments trustworthy: a random split, one change at a time, a size fixed in advance, guardrail metrics, and no peeking to stop early. Hubbard (2014) reminds us that most business measurement is about reducing uncertainty enough to decide, which is what reading a trend over several periods does.",
            "Kohavi, Tang und Xu (2020) haben gesammelt, was kontrollierte Experimente vertrauenswürdig macht: eine zufällige Aufteilung, eine Änderung auf einmal, eine vorab festgelegte Größe, Guardrail-Kennzahlen und kein vorzeitiges Hinschauen, um früh zu stoppen. Hubbard (2014) erinnert daran, dass die meiste Messung im Unternehmen Unsicherheit so weit verringern soll, dass man entscheiden kann; genau das tut ein Trend über mehrere Zeiträume.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("A fair test of a game element, and how sure it is · a worked example on Elbe Cloudwerk", "Ein fairer Test eines Spielelements, und wie sicher er ist · ein Beispiel mit Elbe Cloudwerk")} caption={tt("Switch between the four ways of running the test, then move the slider to change how many finished set-ups each group has.", "Wechseln Sie zwischen den vier Arten, den Test durchzuführen, und bewegen Sie dann den Regler, um zu ändern, wie viele abgeschlossene Einrichtungen jede Gruppe hat.")}>
        <FairTest cfg={FAIR} />
      </Diagram>
      <ShowMore id="A6" part="table" label={tt("Show the table: reading a trend: Elbe's share of customers by quarter (Case assumption)", "Tabelle zeigen: Einen Trend lesen: Anteil der Kunden bei Elbe nach Quartal (Fallannahme)")}>
        <DataTable
          head={[tt("Group at Elbe", "Gruppe bei Elbe"), "Q1", "Q2", "Q3", "Q4", tt("Reading", "Lesart")]}
          rows={[
            [tt("Direct sign-ups who finish set-up", "Direkt-Anmeldungen, die die Einrichtung abschließen"), pct(15), pct(14), pct(28), pct(31), tt("A trend: it rose after the set-up bar in Q3 and held in Q4.", "Ein Trend: Er stieg nach der Einrichtungsleiste in Q3 und hielt in Q4.")],
            [tt("Partner sign-ups who finish set-up", "Partner-Anmeldungen, die die Einrichtung abschließen"), pct(30), pct(29), pct(31), pct(30), tt("Flat: small moves are noise, not a trend.", "Flach: Kleine Bewegungen sind Rauschen, kein Trend.")],
            [tt("Accounts that only collect points", "Konten, die nur Punkte sammeln"), pct(4), pct(9), pct(11), pct(14), tt("A shift: it jumped when points for logins started in Q2; customers now log in for points.", "Eine Verschiebung: Er sprang, als die Punkte für Logins in Q2 starteten; Kunden loggen sich jetzt für Punkte ein.")],
          ]}
          caption={tt("Reading a trend: Elbe's share of customers by quarter (Case assumption)", "Einen Trend lesen: Anteil der Kunden bei Elbe nach Quartal (Fallannahme)")}
        />
      </ShowMore>
      <ShowMore id="A6" part="table" label={tt("Show the table: the test card, part by part", "Tabelle zeigen: Die Testkarte, Teil für Teil")}>
        <DataTable
          head={[tt("Part of the test card", "Teil der Testkarte"), tt("Fair", "Fair"), tt("What goes wrong otherwise", "Was sonst schiefgeht")]}
          rows={[
            [tt("What changes", "Was sich ändert"), tt("One thing only", "Nur eine Sache"), tt("A win cannot be put down to anything", "Ein Gewinn lässt sich nichts zuschreiben")],
            [tt("Control group", "Kontrollgruppe"), tt("Random half, same weeks", "Zufällige Hälfte, dieselben Wochen"), tt("Another quarter, another sign-up source or self-chosen cases explain the difference", "Ein anderes Quartal, eine andere Anmelde-Quelle oder selbst gewählte Fälle erklären den Unterschied")],
            [tt("Success KPI", "Erfolgs-KPI"), tt("The result: share who finish set-up", "Das Ergebnis: Anteil, der die Einrichtung abschließt"), tt("The bar is viewed and nobody finishes", "Die Leiste wird angesehen, und niemand wird fertig")],
            [tt("Size and duration", "Größe und Dauer"), tt("Fixed: about 100 finished set-ups per group, one full onboarding cycle", "Fest: etwa 100 abgeschlossene Einrichtungen pro Gruppe, ein voller Onboarding-Zyklus"), tt("A lucky moment on the dashboard is taken for a result", "Ein glücklicher Moment im Dashboard wird für ein Ergebnis gehalten")],
          ]}
          caption={tt("The test card, part by part", "Die Testkarte, Teil für Teil")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA7() {
  return (
    <MaterialCard
      id="A7"
      scan={tt("Choose measures by the plan's three tests, each Low (1) to High (3), multiplied: motivation (would customers do it for the result, not the prize), integration (what the measure connects to) and sustainability (does it still work after the novelty, and what keeps it going). Then check the budget, the weeks and which problems you answer.", "Wählen Sie Maßnahmen nach den drei Tests des Plans, jeweils Niedrig (1) bis Hoch (3), multipliziert: Motivation (würden Kunden es für das Ergebnis tun, nicht für den Preis), Integration (womit die Maßnahme verbunden ist) und Nachhaltigkeit (wirkt es nach der Neuheit noch, und was hält es am Laufen). Prüfen Sie dann das Budget, die Wochen und welche Probleme Sie beantworten.")}
      reasoning={[
        tt("The plan's evaluation is Motivation × Integration × Sustainability. Score each from 1 to 3 and multiply: one weak answer lowers the whole.", "Die Bewertung des Plans ist Motivation × Integration × Nachhaltigkeit. Bewerten Sie jede von 1 bis 3 und multiplizieren Sie: Eine schwache Antwort senkt das Ganze."),
        EXPLAIN_RULE.v,
        tt(`Motivation. ${EFFECT_ANCHOR.v}`, `Motivation. ${EFFECT_ANCHOR.v}`),
        tt(`Sustainability. ${SCALE_ANCHOR.v}`, `Nachhaltigkeit. ${SCALE_ANCHOR.v}`),
        tt("Apply Materi A1's test to the measure: would the customer do it without the prize? A measure that pays for a click (points for every login) scores 1 on motivation, and it connects to nothing: do not rank it above a measure that rewards real use.", "Wenden Sie den Test aus Materi A1 auf die Maßnahme an: Würde der Kunde es ohne den Preis tun? Eine Maßnahme, die einen Klick bezahlt (Punkte für jeden Login), erzielt bei Motivation 1 und ist mit nichts verbunden: Setzen Sie sie nicht über eine Maßnahme, die echte Nutzung belohnt."),
        tt("Match each measure to the problems it really answers: “low use of the platform” is answered by what carries customers to features they want; “mediocre retention” by what gives customers a reason to stay and to bring others; “measures not integrated” by what joins membership, referral and the customer profile. A prize for a click answers none.", "Ordnen Sie jede Maßnahme den Problemen zu, die sie wirklich beantwortet: „Geringe Nutzung der Plattform“ beantwortet, was Kunden zu Funktionen trägt, die sie wollen; „mittelmäßige Kundenbindung“, was Kunden einen Grund gibt, zu bleiben und andere mitzubringen; „Maßnahmen nicht integriert“, was Mitgliedschaft, Empfehlung und Kundenprofil verbindet. Ein Preis für einen Klick beantwortet keines."),
        tt("The label after the weeks says which mechanism the measure uses: a reward, competition, progress and status, or all three at once. It is a fact, not a score: a reward can be strong (service help) or weak (points for a login). Judge it by the three scores.", "Das Etikett hinter den Wochen sagt, welchen Mechanismus die Maßnahme nutzt: eine Belohnung, Wettbewerb, Fortschritt und Status, oder alle drei auf einmal. Es ist eine Tatsache, keine Note: Eine Belohnung kann stark sein (Service-Hilfe) oder schwach (Punkte für einen Login). Beurteilen Sie sie an den drei Werten."),
        tt("A price is built from parts: set-up, a licence for the months, and days or hours of work × the day or hour rate. Add the parts to check a price, and ask which part recurs: people and prizes grow with volume, a path built once does not.", "Ein Preis besteht aus Teilen: Einrichtung, eine Lizenz für die Monate und Arbeitstage oder -stunden × Tages- oder Stundensatz. Addieren Sie die Teile, um einen Preis zu prüfen, und fragen Sie, welcher Teil wiederkehrt: Personal und Preise wachsen mit der Menge, ein einmal gebauter Pfad nicht."),
        tt("Weeks decide whether a measure has time to work. Five months are 20 weeks: a measure in use after 10 weeks works for the other 10; one in use only after 32 weeks answers its problem too late, however well it is connected.", "Die Wochen entscheiden, ob eine Maßnahme Zeit hat zu wirken. Fünf Monate sind 20 Wochen: Eine Maßnahme, die nach 10 Wochen in Betrieb ist, wirkt in den übrigen 10; eine, die erst nach 32 Wochen in Betrieb ist, beantwortet ihr Problem zu spät, so gut sie auch verbunden ist."),
        tt("Over-complexity lowers sustainability: one platform with points, levels, leaderboards, quests and streaks at once cannot be explained, tested or kept going, however well it is connected.", "Übermaß an Komplexität senkt die Nachhaltigkeit: Eine Plattform mit Punkten, Stufen, Ranglisten, Quests und Serien auf einmal lässt sich nicht erklären, testen oder am Laufen halten, so gut sie auch verbunden ist."),
        tt("Give a reason for the two judged scores, in your own words and with a fact from the card: for motivation, whether customers would do it without the prize; for sustainability, whether it still works after the novelty and what keeps it going (prizes, people or nothing), and the weeks it needs.", "Geben Sie für die zwei beurteilten Werte einen Grund, in eigenen Worten und mit einer Tatsache von der Karte: bei der Motivation, ob Kunden es ohne den Preis täten; bei der Nachhaltigkeit, ob es nach der Neuheit noch wirkt und was es am Laufen hält (Preise, Personal oder nichts), und die Wochen, die es braucht."),
        tt("The budget is a limit to weigh, not a lock. If the plan is over, the rule is to leave out the lowest score rather than trim every measure a little; if you keep it anyway, say why.", "Das Budget ist eine Grenze zum Abwägen, keine Sperre. Liegt der Plan darüber, ist die Regel, den niedrigsten Wert wegzulassen, statt jede Maßnahme ein bisschen zu kürzen; behalten Sie ihn trotzdem, sagen Sie warum."),
        tt("Order by score and by dependency: what others read from goes first (a path that reads the customer profile); a measure that needs the data of another comes after it. Name what you left out and why.", "Ordnen Sie nach Wert und nach Abhängigkeit: Woraus andere lesen, kommt zuerst (ein Pfad, der das Kundenprofil liest); eine Maßnahme, die die Daten einer anderen braucht, kommt danach. Nennen Sie, was Sie weggelassen haben und warum."),
      ]}
      sources={["davenport2018", "hubbard2014"]}
    >
      <ShowMore id="A7" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Davenport and Ronanki (2018) found that technology projects succeed when they start from a business problem and fit into existing processes and systems, and fail when they are bought as stand-alone tools; the same holds for game elements. Hubbard (2014) advises measuring what would change a decision. The plan names the evaluation for this day: motivation × integration × sustainability.",
            "Davenport und Ronanki (2018) fanden, dass Technologieprojekte gelingen, wenn sie von einem Geschäftsproblem ausgehen und in bestehende Prozesse und Systeme passen, und scheitern, wenn sie als allein stehende Werkzeuge gekauft werden; dasselbe gilt für Spielelemente. Hubbard (2014) rät, zu messen, was eine Entscheidung ändern würde. Der Plan nennt die Bewertung für diesen Tag: Motivation × Integration × Nachhaltigkeit.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Three measures of Elbe Cloudwerk, scored", "Drei Maßnahmen von Elbe Cloudwerk, bewertet")} caption={tt("Choose a measure to read its three scores and why each one is what it is.", "Wählen Sie eine Maßnahme, um ihre drei Werte zu lesen und warum jeder so ist.")}>
        <ScoreBars cfg={SCORE} />
      </Diagram>
      <ShowMore id="A7" part="notes" label={tt("Show two short notes", "Zwei kurze Hinweise zeigen")}>
        <Bul
          items={[
            tt("Integration is read from what the measure is printed to connect to, never guessed.", "Die Integration wird aus dem gelesen, womit die Maßnahme laut Beschreibung verbunden ist, nie geschätzt."),
            tt("A clever game element that stands alone scores low: it adds an island instead of joining what exists.", "Ein kluges Spielelement, das allein steht, punktet niedrig: Es fügt eine Insel hinzu, statt zu verbinden, was existiert."),
          ]}
        />
      </ShowMore>
      <ShowMore id="A7" part="extra" label={tt("Show: A discount is not a game element", "Zeigen: Ein Rabatt ist kein Spielelement")}>
        <Callout label={tt("A discount is not a game element", "Ein Rabatt ist kein Spielelement")} tone="signal">
          <p>{tt("Points that can be exchanged for a discount turn a game element into a price cut: customers learn to wait for it, and the effect ends when the discount ends. Reward service, help or access, which deepens use, rather than money off.", "Punkte, die gegen einen Rabatt getauscht werden können, machen aus einem Spielelement eine Preissenkung: Kunden lernen, darauf zu warten, und die Wirkung endet mit dem Rabatt. Belohnen Sie Service, Hilfe oder Zugang, was die Nutzung vertieft, statt Preisnachlass.")}</p>
        </Callout>
      </ShowMore>
    </MaterialCard>
  );
}

export const CARDS_A = [CardA1, CardA2, CardA3, CardA4, CardA5, CardA6, CardA7];
