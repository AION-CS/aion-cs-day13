"use client";

import clsx from "clsx";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { CheckBar, OptionList, Reading, TextBox } from "@/components/ui/Inputs";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { PlacementBoard } from "@/components/ui/PlacementBoard";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { LEVEL_TAGS, LEVEL_TESTS, LINES, LINE_KEY } from "@/data/ladder";
import type { LevelTag, LineId } from "@/data/ladder";
import { BASES, BASIS_LABEL, CUSTOMERS, DECISION_LABEL, INSIGHT_COUNT, INSIGHT_FRAME, INSIGHT_MIN, KNOWN_LABEL, LEAVE_MIN, PICK, PILOT, FORECAST } from "@/data/forecast";
import type { Basis, CustId, } from "@/data/forecast";
import { citesForecastFigure, insightFlags, pickHolds, sortHolds } from "@/lib/checks";
import { scrollToAndFlash } from "@/lib/flash";
import { Gloss } from "@/lib/glossify";
import { IDS } from "@/lib/missing";
import { num, pct, tt } from "@/lib/lang";
import { extraInsightGuide, insightGuide, meaningGuide, reflectGuide } from "@/lib/mentorGuide";
import { pickKey, sortKey } from "@/lib/answerKey";
import { MIN_LINE, MIN_SENTENCE } from "@/lib/progress";
import { BLOCK_MINUTES } from "@/lib/routes";
import { useStore } from "@/store/useStore";

/* ------------------------------------------------------------------ Block 1.1 (Core, Level 1) */

export function Block11() {
  const l1 = useStore((s) => s.l1);
  const place = useStore((s) => s.placeLine);
  const undo = useStore((s) => s.undoSort);
  const redo = useStore((s) => s.redoSort);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  return (
    <AnswerBlock
      id="block-1-1"
      title={tt("Block 1.1 · Reward, competition, or progress and status?", "Block 1.1 · Belohnung, Wettbewerb oder Fortschritt und Status?")}
      kind="OBJECTIVE"
      core
      minutes={BLOCK_MINUTES["1.1"]}
      findIt={tt("Route 1 → Task 1 → the nine game ideas on the sort board below, proposed by EngageIT's teams for the platform. Answer on the sort board.", "Route 1 → Task 1 → die neun Spielideen auf der Sortiertafel unten, von den Teams von EngageIT für die Plattform vorgeschlagen. Antworten Sie auf der Sortiertafel.")}
    >
      <MaterialRefs refs={["A1"]} />
      <PlacementBoard<LevelTag>
        items={LINES.map((r) => ({ id: r.id, meta: r.source, text: r.text }))}
        bins={LEVEL_TAGS.map((t) => ({ id: t.id, label: t.label, hint: t.hint }))}
        value={l1.sort}
        onPlace={(id, tag) => place(id as LineId, tag)}
        onUndo={undo}
        onRedo={redo}
        undoCount={l1.sortHistory.length}
        redoCount={l1.sortFuture.length}
        domId={IDS.line}
        keyPhrases={LINE_KEY}
        clues={Object.fromEntries(LINES.map((r) => [r.id, r.clue]))}
        reasons={Object.fromEntries(LINES.map((r) => [r.id, r.why]))}
        result={l1.sortResult}
        checks={l1.sortChecks}
        onCheck={() => patch((s) => ({ checks: s.checks + 1, sortChecks: s.sortChecks + 1, sortResult: sortHolds(s.sort) }))}
        onClue={() => patch({ sortClue: true })}
        clueShown={l1.sortClue}
        reasoningOpened={l1.sortReasoning}
        onOpenReasoning={() => patch({ sortReasoning: true })}
        noun={tt("game idea", "Spielidee")}
        intro={tt("Drag a game idea onto the mechanism it uses, or select it and then select a mechanism. Select a placed one to move it again. One mechanism per idea: the one it mainly uses.", "Ziehen Sie eine Spielidee auf den Mechanismus, den sie nutzt, oder wählen Sie sie aus und dann einen Mechanismus. Wählen Sie eine platzierte, um sie zu verschieben. Ein Mechanismus pro Idee: der, den sie vor allem nutzt.")}
        tests={
          <RevealHint id="sort-tests" label={tt("Show the test questions", "Testfragen zeigen")} title={tt("Test questions · taught in Materi A1", "Testfragen · aus Materi A1")}>
            <div className="space-y-2 text-caption text-ink">
              <p>{tt("Ask these of every idea. They repeat the tests from Materi A1; they never say which idea goes where.", "Stellen Sie diese Fragen zu jeder Idee. Sie wiederholen die Tests aus Materi A1; sie sagen nie, welche Idee wohin gehört.")}</p>
              <ul className="space-y-1.5">
                {LEVEL_TESTS.map((c) => (
                  <li key={c.name}>
                    <span className="font-semibold">{c.name}. </span>
                    <Gloss>{c.test}</Gloss>
                  </li>
                ))}
              </ul>
              <MaterialRefs refs={["A1"]} lead={tt("Taught in", "Gelehrt in")} />
            </div>
          </RevealHint>
        }
      />
      <TextBox
        id={IDS.extraInsight}
        label={tt("One game idea of your own", "Eine eigene Spielidee")}
        help={tt("Name a moment on EngageIT's platform, the mechanism you would use, and what the customer gains (“so …”). At least 30 characters.", "Nennen Sie einen Moment auf der Plattform von EngageIT, den Mechanismus, den Sie nutzen würden, und was der Kunde gewinnt („sodass …“). Mindestens 30 Zeichen.")}
        value={l1.extraInsight}
        onChange={(v) => patch({ extraInsight: v })}
        min={MIN_LINE}
        rows={2}
      >
        <WritingHelp
          id="extra-insight-kit"
          refs={[
            { label: tt("What goes wrong today (the case)", "Was heute schiefgeht (der Fall)"), value: tt("customers rarely use features, retention is mediocre, the measures are not integrated", "Kunden nutzen Funktionen kaum, die Kundenbindung ist mittelmäßig, die Maßnahmen sind nicht integriert"), target: "case-brief" },
            { label: tt("The three mechanisms and the real-motivation rule (Materi A1)", "Die drei Mechanismen und die Regel zur echten Motivation (Materi A1)"), value: tt("reward · competition · progress and status", "Belohnung · Wettbewerb · Fortschritt und Status"), target: "mat-A1" },
            { label: tt("The nine game ideas above", "Die neun Spielideen oben"), value: tt("see what the teams already propose", "sehen Sie, was die Teams schon vorschlagen"), target: IDS.line(LINES[0].id) },
          ]}
          steps={[
            tt("Name a moment on the platform (for example the first login), not “the whole product”.", "Nennen Sie einen Moment auf der Plattform (zum Beispiel den ersten Login), nicht „das ganze Produkt“."),
            tt("Say what the customer would see or receive, and which mechanism it is.", "Sagen Sie, was der Kunde sehen oder erhalten würde, und welcher Mechanismus es ist."),
            tt("Finish with “so …”: what the customer gains that they want anyway.", "Schließen Sie mit „sodass …“: was der Kunde gewinnt, das er ohnehin will."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="extra-insight-example" guide={extraInsightGuide()} />
      {mentor && <MentorGuide guide={extraInsightGuide()} />}
      <AnswerKey block={sortKey()} />
      <BlockMissing block="1.1" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.2 (Optional, read-only) */

const row = (id: string, cells: string[]) => (
  <tr id={id} className="border-t border-line">
    <td className="px-3 py-2 font-semibold">{cells[0]}</td>
    {cells.slice(1).map((c, i) => (
      <td key={i} className="tnum px-3 py-2 text-right">
        {c}
      </td>
    ))}
  </tr>
);

export function Block12() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const check = () =>
    patch((s) => {
      const w = s.meaning.trim();
      return { checks: s.checks + 1, meaningFlagged: w !== "" && (w.length < MIN_SENTENCE || !citesForecastFigure(w)), meaningClue: false };
    });
  const pct1 = (v: number) => `${num(v, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;
  return (
    <AnswerBlock
      id="block-1-2"
      title={tt("Block 1.2 · Read the set-up figures: two finish rates side by side", "Block 1.2 · Die Einrichtungs-Werte lesen: zwei Abschlussquoten nebeneinander")}
      kind="JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["1.2"]}
      findIt={tt("Route 1 → Task 1 → the table “Last year” directly below, with the two finish rates the app prints. Answer in the field under the table.", "Route 1 → Task 1 → die Tabelle „Letztes Jahr“ direkt darunter, mit den zwei Abschlussquoten, die die App druckt. Antworten Sie im Feld unter der Tabelle.")}
    >
      <MaterialRefs refs={["A4"]} />
      <p className="text-body text-ink">
        <Gloss>
          {tt("EngageIT's usage data shows how new customers did last year, split by whether the home screen showed a set-up bar. The app divides finished set-ups by new customers and prints both finish rates for you; nothing is left to calculate. Your job is to read them side by side and say what they do and do not tell EngageIT. How such a rate is worked out is shown in", "Die Nutzungsdaten von EngageIT zeigen, wie Neukunden im letzten Jahr abschnitten, aufgeteilt danach, ob der Startbildschirm eine Einrichtungsleiste zeigte. Die App teilt abgeschlossene Einrichtungen durch Neukunden und druckt beide Abschlussquoten für Sie; es bleibt nichts zu rechnen. Ihre Aufgabe ist, sie nebeneinander zu lesen und zu sagen, was sie EngageIT sagen und was nicht. Wie eine solche Quote entsteht, zeigt")}
        </Gloss>{" "}
        <button type="button" onClick={() => scrollToAndFlash("mat-A4", "ref")} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
          Materi A4
        </button>
        .
      </p>
      <div className="relative overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[30rem] border-collapse text-caption">
          <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("Last year · new customers and their set-up (Case assumption)", "Letztes Jahr · Neukunden und ihre Einrichtung (Fallannahme)")}</caption>
          <thead>
            <tr className="text-left text-micro uppercase text-ash">
              <th className="px-3 py-2">{tt("Group", "Gruppe")}</th>
              <th className="px-3 py-2 text-right">{tt("New customers", "Neukunden")}</th>
              <th className="px-3 py-2 text-right">{tt("Finished set-up", "Einrichtung abgeschlossen")}</th>
              <th className="px-3 py-2 text-right">{tt("Finish rate (printed)", "Abschlussquote (gedruckt)")}</th>
            </tr>
          </thead>
          <tbody>
            {row("fc-ctl", [tt("Home screen without a set-up bar", "Startbildschirm ohne Einrichtungsleiste"), num(PILOT.control.sent), num(PILOT.control.orders), pct1(FORECAST.controlRate)])}
            {row("fc-var", [tt("Home screen with a set-up bar", "Startbildschirm mit Einrichtungsleiste"), num(PILOT.variant.sent), num(PILOT.variant.orders), pct1(FORECAST.f1)])}
          </tbody>
        </table>
      </div>
      <p className="text-caption text-ash">
        {tt(`Read it like this: of every 100 new customers, ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })} finished set-up without the bar and ${num(FORECAST.f1, { maximumFractionDigits: 1 })} with it, so the bar doubled the finish rate (${num(FORECAST.f2)} times). But the two groups may differ in other ways, so the true effect may be smaller.`, `So lesen Sie es: Von je 100 Neukunden schlossen ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })} die Einrichtung ohne die Leiste ab und ${num(FORECAST.f1, { maximumFractionDigits: 1 })} mit ihr; die Leiste verdoppelte also die Abschlussquote (${num(FORECAST.f2)}-mal). Aber die beiden Gruppen unterscheiden sich vielleicht auch in anderem, also kann der wahre Effekt kleiner sein.`)}
      </p>
      <TextBox
        id={IDS.meaning}
        label={tt("What do the set-up figures mean for EngageIT?", "Was bedeuten die Einrichtungs-Werte für EngageIT?")}
        help={tt("One or two sentences. Quote at least one printed figure, say what EngageIT should change first, and why it cannot be sure yet that the bar alone made the difference.", "Ein oder zwei Sätze. Zitieren Sie mindestens einen gedruckten Wert, sagen Sie, was EngageIT zuerst ändern sollte, und warum es noch nicht sicher sein kann, dass allein die Leiste den Unterschied machte.")}
        value={l1.meaning}
        onChange={(v) => patch({ meaning: v, meaningFlagged: false })}
        min={MIN_SENTENCE}
        rows={4}
        flagged={l1.meaningFlagged}
        clue={tt("Which printed figure says how much better new customers did when the bar was shown, and could the two groups differ in other ways? Quote one figure and say what follows.", "Welcher gedruckte Wert sagt, wie viel besser Neukunden abschnitten, wenn die Leiste gezeigt wurde, und könnten sich die zwei Gruppen auch in anderem unterscheiden? Zitieren Sie einen Wert und sagen Sie, was folgt.")}
        clueShown={l1.meaningClue}
        onShowClue={() => patch({ meaningClue: true })}
      >
        <WritingHelp
          id="meaning-help"
          refs={[
            { label: tt("Finish rates, without and with the bar", "Abschlussquoten, ohne und mit der Leiste"), value: `${pct1(FORECAST.controlRate)} · ${pct1(FORECAST.f1)}`, target: "fc-var" },
            { label: tt("Finished set-ups behind each group", "Abgeschlossene Einrichtungen hinter jeder Gruppe"), value: `${PILOT.control.orders} · ${PILOT.variant.orders}`, target: "fc-ctl" },
            { label: tt("Why a comparison like this is not yet proof (Materi A6)", "Warum ein solcher Vergleich noch kein Beweis ist (Materi A6)"), value: tt("the two groups may differ in other ways", "die zwei Gruppen unterscheiden sich vielleicht auch in anderem"), target: "mat-A6" },
          ]}
          steps={[
            tt("Say how much better new customers did with the bar (the two rates, or “twice”).", "Sagen Sie, wie viel besser Neukunden mit der Leiste abschnitten (die zwei Quoten, oder „doppelt“)."),
            tt("Say what EngageIT should change first, for example show the bar to every new customer.", "Sagen Sie, was EngageIT zuerst ändern sollte, zum Beispiel die Leiste jedem Neukunden zeigen."),
            tt("Say it as an estimate: the groups may differ in other ways.", "Sagen Sie es als Schätzung: Die Gruppen unterscheiden sich vielleicht auch in anderem."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="meaning-example" guide={meaningGuide()} />
      {mentor && <MentorGuide guide={meaningGuide()} />}
      <CheckBar onCheck={check} checkLabel={tt("Check my sentence", "Meinen Satz prüfen")} checks={l1.checks} />
      {l1.checks > 0 && (
        <Reading>
          {!l1.meaningFlagged
            ? tt("Nothing is outlined by the last check.", "Die letzte Prüfung hat nichts markiert.")
            : tt("The sentence is outlined: it needs at least one printed figure and a few words more.", "Der Satz ist markiert: Er braucht mindestens einen gedruckten Wert und ein paar Worte mehr.")}
        </Reading>
      )}
      <BlockMissing block="1.2" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.3 (Optional) */

export function Block13() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const toggle = (k: "valuable" | "churners", id: CustId) => patch((s) => ({ [k]: s[k].includes(id) ? s[k].filter((x) => x !== id) : [...s[k], id], pickResult: null }) as Partial<typeof s>);
  const setRow = (i: number, p: Partial<{ basis: Basis | null; text: string }>) => patch((s) => ({ insights: s.insights.map((h, j) => (j === i ? { ...h, ...p } : h)), insFlagged: s.insFlagged.filter((x) => x !== i) }));
  const check = () => patch((s) => ({ checks: s.checks + 1, insChecked: true, insClue: false, insFlagged: insightFlags(s), pickResult: pickHolds(s), pickClue: false }));
  const opts = CUSTOMERS.map((c) => ({ id: c.id, label: c.name }));
  return (
    <AnswerBlock
      id="block-1-3"
      title={tt("Block 1.3 · Where a game element helps, where it plugs in, and three approaches", "Block 1.3 · Wo ein Spielelement hilft, wo es sich anschließt, und drei Ansätze")}
      kind="OBJECTIVE + JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["1.3"]}
      findIt={tt("Route 1 → Task 1 → the table “Eight moments on the platform” below: customers a month, the share who stop there, whether the customer wants the result of the step, and what EngageIT already connects to it. Answer in the two lists and the three fields under it.", "Route 1 → Task 1 → die Tabelle „Acht Momente auf der Plattform“ unten: Kunden pro Monat, der Anteil, der dort aufhört, ob der Kunde das Ergebnis des Schritts will, und was EngageIT dort schon verbindet. Antworten Sie in den zwei Listen und den drei Feldern darunter.")}
    >
      <MaterialRefs refs={["A3"]} />
      <p className="rounded-md border border-line bg-mist/40 px-3 py-2 text-caption text-ink">
        <Gloss>
          {tt("How to read the table. Each row is one moment on EngageIT's platform, for example the first login. “Customers a month” says how many customers reach that moment. “Stop here” says what share of them stop at that point (bold means 25% or more). “Customer wants the result? · What is connected” says whether the customer wants what the step leads to (a first project) or does it only because they are asked to (a rating), and how much of the membership programme, the referral scheme and the customer profile already reaches the moment.", "So lesen Sie die Tabelle. Jede Zeile ist ein Moment auf der Plattform von EngageIT, zum Beispiel der erste Login. „Kunden pro Monat“ sagt, wie viele Kunden diesen Moment erreichen. „Hören hier auf“ sagt, welcher Anteil von ihnen an dieser Stelle aufhört (fett heißt 25 % oder mehr). „Kunde will das Ergebnis? · Was verbunden ist“ sagt, ob der Kunde will, wozu der Schritt führt (ein erstes Projekt), oder ihn nur macht, weil er gebeten wird (eine Bewertung), und wie viel vom Mitgliedschaftsprogramm, vom Empfehlungsprogramm und vom Kundenprofil den Moment schon erreicht.")}
        </Gloss>
      </p>
      <div className="relative overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[36rem] border-collapse text-caption">
          <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("Eight moments on the platform · EngageIT's usage data (Case assumption)", "Acht Momente auf der Plattform · Nutzungsdaten von EngageIT (Fallannahme)")}</caption>
          <thead>
            <tr className="text-left text-micro uppercase text-ash">
              <th className="px-3 py-2">{tt("Moment", "Moment")}</th>
              <th className="px-3 py-2 text-right">{tt("Customers a month", "Kunden pro Monat")}</th>
              <th className="px-3 py-2">{tt("Stop here", "Hören hier auf")}</th>
              <th className="px-3 py-2">{tt("Customer wants the result? · What is connected", "Kunde will das Ergebnis? · Was verbunden ist")}</th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((c) => (
              <tr key={c.id} id={`cust-${c.id}`} className="border-t border-line">
                <td className="px-3 py-2 font-semibold">{c.name}</td>
                <td className="tnum px-3 py-2 text-right">{num(c.volume)}</td>
                <td className={clsx("tnum px-3 py-2", c.leave >= LEAVE_MIN && "font-semibold")}>{pct(c.leave)}</td>
                <td className="px-3 py-2">{`${DECISION_LABEL[c.decision ? "yes" : "no"]} · ${KNOWN_LABEL[c.known]}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div id={IDS.valuable} className="space-y-1.5">
          <p className="font-semibold text-ink">{tt(`a · The ${PICK} moments where a game element helps most`, `a · Die ${PICK} Momente, in denen ein Spielelement am meisten hilft`)}</p>
          <OptionList<CustId> multi label={tt("Helps most", "Hilft am meisten")} value={l1.valuable} onChange={(id) => toggle("valuable", id)} disabledIds={l1.valuable.length >= PICK ? CUSTOMERS.map((c) => c.id) : []} onDisabledClick={() => scrollToAndFlash(IDS.valuable, "warn")} options={opts} />
          <p role="status" className="text-caption text-ash">{tt(`${l1.valuable.length} of ${PICK} chosen.`, `${l1.valuable.length} von ${PICK} gewählt.`)}</p>
        </div>
        <div id={IDS.churners} className="space-y-1.5">
          <p className="font-semibold text-ink">{tt(`b · The ${PICK} moments where a game element can plug into what exists`, `b · Die ${PICK} Momente, an denen sich ein Spielelement an Bestehendes anschließen kann`)}</p>
          <OptionList<CustId> multi label={tt("Can plug in", "Kann sich anschließen")} value={l1.churners} onChange={(id) => toggle("churners", id)} disabledIds={l1.churners.length >= PICK ? CUSTOMERS.map((c) => c.id) : []} onDisabledClick={() => scrollToAndFlash(IDS.churners, "warn")} options={opts} />
          <p role="status" className="text-caption text-ash">{tt(`${l1.churners.length} of ${PICK} chosen.`, `${l1.churners.length} von ${PICK} gewählt.`)}</p>
        </div>
      </div>
      {l1.pickResult && (
        <Reading>
          {tt(`${l1.pickResult.holds} of ${l1.pickResult.total} picks hold. A check never says which. `, `${l1.pickResult.holds} von ${l1.pickResult.total} Wahlen stimmen. Eine Prüfung sagt nie, welche. `)}
          {l1.pickClue ? (
            tt("Clue: a game element helps most where the customer wants the result and many stop. It can plug into what exists only where membership, referral or profile data already reaches the moment. Which moments have a wanted result and 25% or more stopping? Where does part or all of what EngageIT runs already reach?", "Hinweis: Ein Spielelement hilft am meisten dort, wo der Kunde das Ergebnis will und viele aufhören. Es kann sich nur dort an Bestehendes anschließen, wo Daten aus Mitgliedschaft, Empfehlung oder Profil den Moment schon erreichen. Welche Momente haben ein gewolltes Ergebnis und 25 % oder mehr, die aufhören? Wo reicht ein Teil oder alles von dem, was EngageIT betreibt, schon hin?")
          ) : l1.pickResult.holds < l1.pickResult.total ? (
            <button type="button" onClick={() => patch({ pickClue: true })} className="btn-ghost btn-sm border-gold">
              {tt("Show clue", "Hinweis zeigen")}
            </button>
          ) : null}
        </Reading>
      )}
      <AnswerKey block={pickKey()} />
      <div className="space-y-3 border-t border-line pt-3">
        <p className="font-semibold text-ink">{tt("c · Three simple gamification approaches", "c · Drei einfache Gamification-Ansätze")}</p>
        <p className="text-body text-ink">
          <Gloss>{tt("Write three simple gamification approaches for EngageIT, each using a different mechanism: a reward, competition, or progress and status. Say what each gives the customer: that is the real value the plan asks you to check, so the element does not only buy clicks.", "Schreiben Sie drei einfache Gamification-Ansätze für EngageIT, jeder mit einem anderen Mechanismus: eine Belohnung, Wettbewerb, oder Fortschritt und Status. Sagen Sie, was jeder dem Kunden bringt: Das ist der echte Wert, den der Plan Sie prüfen lässt, damit das Element nicht nur Klicks kauft.")}</Gloss>
        </p>
        <p className="text-caption text-ash">
          {tt("The frame: ", "Der Rahmen: ")}
          {INSIGHT_FRAME.v}
        </p>
        {l1.insights.map((a, i) => (
          <div key={i} className="space-y-1.5">
            <TextBox
              id={IDS.insight(i)}
              label={tt(`Approach ${i + 1}`, `Ansatz ${i + 1}`)}
              help={tt(`Choose the mechanism, then write the approach and what the customer gains in one or two sentences (“…, so …”), at least ${INSIGHT_MIN} characters.`, `Wählen Sie den Mechanismus und schreiben Sie dann den Ansatz und was der Kunde gewinnt in ein oder zwei Sätzen („…, sodass …“), mindestens ${INSIGHT_MIN} Zeichen.`)}
              value={a.text}
              onChange={(v) => setRow(i, { text: v })}
              min={INSIGHT_MIN}
              flagged={l1.insFlagged.includes(i)}
              clue={tt(`Use the frame: ${INSIGHT_FRAME.v} Choose a mechanism no other row uses, and finish with “so” and what the customer gains.`, `Nutzen Sie den Rahmen: ${INSIGHT_FRAME.v} Wählen Sie einen Mechanismus, den keine andere Zeile nutzt, und schließen Sie mit „sodass“ und dem, was der Kunde gewinnt.`)}
              clueShown={l1.insClue}
              onShowClue={() => patch({ insClue: true })}
            >
              <div>
                <label htmlFor={`insight-${i}-basis`} className="smallcaps block">
                  {tt("Mechanism", "Mechanismus")}
                </label>
                <select id={`insight-${i}-basis`} className="field mt-1 max-w-md" value={a.basis ?? ""} onChange={(e) => setRow(i, { basis: (e.target.value || null) as Basis | null })}>
                  <option value="">{tt("Choose the mechanism…", "Mechanismus wählen…")}</option>
                  {BASES.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label}
                    </option>
                  ))}
                </select>
                {a.basis && <p className="mt-1 text-micro normal-case tracking-normal text-ash">{tt("Chosen: ", "Gewählt: ")}{BASIS_LABEL[a.basis]}</p>}
              </div>
            </TextBox>
            {i === 0 && (
              <WritingHelp
                id="insight-kit"
                refs={[
                  { label: tt("What each mechanism asks for (Materi A1)", "Was jeder Mechanismus verlangt (Materi A1)"), value: tt("a reward · competition · progress and status", "eine Belohnung · Wettbewerb · Fortschritt und Status"), target: "mat-A1" },
                  { label: tt("The moments on the platform (table above)", "Die Momente auf der Plattform (Tabelle oben)"), value: tt("where customers stop and what is already connected", "wo Kunden aufhören und was schon verbunden ist"), target: "cust-c1" },
                ]}
                steps={[
                  tt("Choose the mechanism and name the moment you would change.", "Wählen Sie den Mechanismus und nennen Sie den Moment, den Sie ändern würden."),
                  tt("Say the game element in one sentence, concretely.", "Sagen Sie das Spielelement in einem Satz, konkret."),
                  tt("Finish with what the customer gets from it.", "Schließen Sie mit dem, was der Kunde davon hat."),
                ]}
              />
            )}
            <ExampleAnswer id={`insight-${i}-example`} guide={insightGuide(i)} />
            {mentor && <MentorGuide guide={insightGuide(i)} />}
          </div>
        ))}
      </div>
      <CheckBar onCheck={check} checkLabel={tt("Check my picks and approaches", "Meine Wahl und Ansätze prüfen")} checks={l1.checks} />
      {l1.insChecked && (
        <Reading>
          {l1.insFlagged.length === 0
            ? tt(`Nothing is outlined among the approaches. All ${INSIGHT_COUNT} use different mechanisms and say what the customer gains; whether they are good is for you and your facilitator to judge.`, `Bei den Ansätzen ist nichts markiert. Alle ${INSIGHT_COUNT} nutzen verschiedene Mechanismen und sagen, was der Kunde gewinnt; ob sie gut sind, beurteilen Sie und Ihre Moderation.`)
            : tt(`${l1.insFlagged.length} approach${l1.insFlagged.length === 1 ? " is" : "es are"} outlined: the mechanism is missing or repeated, the text is short, or it does not say what the customer gains.`, `${l1.insFlagged.length} ${l1.insFlagged.length === 1 ? "Ansatz ist" : "Ansätze sind"} markiert: Der Mechanismus fehlt oder wiederholt sich, der Text ist kurz, oder er sagt nicht, was der Kunde gewinnt.`)}
        </Reading>
      )}
      <BlockMissing block="1.3" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.4 (Optional) */

export function Block14() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const fields: { k: "interpret" | "causation" | "decider"; label: string; help: string }[] = [
    { k: "interpret", label: tt("When does gamification work at EngageIT, and when does it not?", "Wann wirkt Gamification bei EngageIT, und wann nicht?"), help: tt("One or two sentences, using one of the nine game ideas in Block 1.1 and the difference between a customer who wants the result and one who does not.", "Ein oder zwei Sätze, mit einer der neun Spielideen aus Block 1.1 und dem Unterschied zwischen einem Kunden, der das Ergebnis will, und einem, der es nicht will.") },
    { k: "causation", label: tt("What is the difference between real motivation and a short-term incentive?", "Was ist der Unterschied zwischen echter Motivation und einem kurzfristigen Anreiz?"), help: tt("Name one example from EngageIT where a prize would buy the behaviour without the real value, and say how you would see it in the numbers.", "Nennen Sie ein Beispiel bei EngageIT, bei dem ein Preis das Verhalten ohne den echten Wert kaufen würde, und sagen Sie, wie Sie es in den Zahlen sähen.") },
    { k: "decider", label: tt("Why is integration the key, and how would a strategic decision-maker prioritise without over-complexity?", "Warum ist Integration der Schlüssel, und wie würde eine strategische Entscheiderin priorisieren, ohne zu viel Komplexität?"), help: tt("Name what comes first, what builds on it, and which game element you would not add. Be concrete.", "Nennen Sie, was zuerst kommt, was darauf aufbaut, und welches Spielelement Sie nicht hinzufügen würden. Seien Sie konkret.") },
  ];
  return (
    <AnswerBlock
      id="block-1-4"
      title={tt("Block 1.4 · Coaching reflection: from Level 1 to Level 2", "Block 1.4 · Coaching-Reflexion: von Level 1 zu Level 2")}
      kind="JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["1.4"]}
      findIt={tt("Route 1 → Task 1 → your own answers in Block 1.1, and the real-motivation rule in Materi A1 and A2. Answer in the three fields below.", "Route 1 → Task 1 → Ihre eigenen Antworten in Block 1.1 und die Regel zur echten Motivation in Materi A1 und A2. Antworten Sie in den drei Feldern unten.")}
    >
      <MaterialRefs refs={["A1", "A2"]} />
      <p className="text-body text-ink">
        <Gloss>{tt("Before you weigh measures: when does gamification work, what separates real motivation from a short-term incentive, and what comes first?", "Bevor Sie Maßnahmen abwägen: Wann wirkt Gamification, was trennt echte Motivation von einem kurzfristigen Anreiz, und was kommt zuerst?")}</Gloss>
      </p>
      {fields.map((f) => (
        <div key={f.k} className="space-y-1.5">
          <TextBox id={IDS.reflect(f.k)} label={f.label} help={f.help} value={l1.reflect[f.k]} onChange={(v) => patch((s) => ({ reflect: { ...s.reflect, [f.k]: v } }))} min={MIN_LINE} rows={3} />
          <ExampleAnswer id={`reflect-${f.k}-example`} guide={reflectGuide(f.k)} />
          {mentor && <MentorGuide guide={reflectGuide(f.k)} />}
        </div>
      ))}
      <BlockMissing block="1.4" route={1} />
    </AnswerBlock>
  );
}
