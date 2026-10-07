"use client";

import { useState } from "react";
import { Block31, Block32, Block33, Block34 } from "@/components/task2/Blocks";
import { MemoPanel } from "@/components/task2/MemoPanel";
import { Panel } from "@/components/task2/Panel";
import { StepA } from "@/components/task2/StepA";
import { StepB } from "@/components/task2/StepB";
import { TodayTable } from "@/components/task2/Kits";
import { ExportBar } from "@/components/ui/ExportBar";
import { Callout } from "@/components/ui/MaterialCard";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { MEASURE_BY_ID } from "@/data/measures";
import { R2_BUDGET, R2_MONTHS } from "@/data/route2";
import { Gloss } from "@/lib/glossify";
import { euro, tt } from "@/lib/lang";
import { memoBody } from "@/lib/exportDoc";
import { r2Missing } from "@/lib/missing";
import { BLOCK_MINUTES, CORE2_MINUTES } from "@/lib/routes";
import { exportName } from "@/lib/slug";
import type { Scn } from "@/lib/r2Panel";
import { useJumpTo } from "@/lib/useJumpTo";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated } from "@/store/useStore";

/** The situation of Route 2, stated once, directly above the task, with a soft pointer to the learner's own Route 1 answers. */
function CaseBrief() {
  const hydrated = useHydrated();
  const p = usePersisted();
  const jump = useJumpTo();
  const chosen = p.l1.chosen.map((id) => MEASURE_BY_ID[id].name);
  const has = hydrated && chosen.length > 0;
  return (
    <section id="task-2" aria-labelledby="task2-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="task2-h">{tt("The situation: you are the Chief Customer Officer", "Die Lage: Sie sind Chief Customer Officer")}</h2>
        <span className="smallcaps">{tt("Read once · about 4 min", "Einmal lesen · ca. 4 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt("EngageIT has seen that a set-up bar can double how many new customers finish set-up. You now answer for how the whole company keeps its customers. Single measures exist (discounts, a newsletter, support, a membership programme, a referral scheme), but retention is not managed as a system and the potential is unused. The budget is limited, customers' reactions are uncertain and the system landscape is complex. The board wants an integrated retention architecture, and an integration decision now, although nobody can say how much it will help.", "EngageIT hat gesehen, dass eine Einrichtungsleiste verdoppeln kann, wie viele Neukunden die Einrichtung abschließen. Sie verantworten jetzt, wie das ganze Unternehmen seine Kunden hält. Einzelne Maßnahmen existieren (Rabatte, ein Newsletter, Support, ein Mitgliedschaftsprogramm, ein Empfehlungsprogramm), aber die Kundenbindung wird nicht als System gesteuert, und das Potenzial ist ungenutzt. Das Budget ist begrenzt, die Reaktionen der Kunden sind unsicher, und die Systemlandschaft ist komplex. Der Vorstand will eine integrierte Kundenbindungsarchitektur, und jetzt eine Integrationsentscheidung, obwohl niemand sagen kann, wie viel sie helfen wird.")}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              {tt("Budget: ", "Budget: ")}
              <strong>{euro(R2_BUDGET)}</strong> {tt("(Case assumption)", "(Fallannahme)")}
            </li>
            <li>
              {tt("Time: ", "Zeit: ")}
              <strong>{tt(`${R2_MONTHS} months`, `${R2_MONTHS} Monate`)}</strong>
            </li>
            <li>{tt("The items and their costs are in Step A; the numbers today are in the table below.", "Die Punkte und ihre Kosten stehen in Schritt A; die Zahlen heute stehen in der Tabelle darunter.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption md:col-span-2">
          <p className="smallcaps">{tt(`What you build · one core task, about ${CORE2_MINUTES} min`, `Was Sie bauen · eine Kernaufgabe, ca. ${CORE2_MINUTES} Min.`)}</p>
          <ol className="mt-1 grid list-decimal gap-x-6 pl-4 text-ink sm:grid-cols-2">
            <li>{tt("The target vision of an integrated retention architecture", "Das Zielbild einer integrierten Kundenbindungsarchitektur")}</li>
            <li>{tt("The central motivation mechanisms (game elements)", "Die zentralen Motivationsmechanismen (Spielelemente)")}</li>
            <li>{tt("The integration of membership, referral and personalisation", "Die Integration von Mitgliedschaft, Empfehlung und Personalisierung")}</li>
            <li>{tt("A continuous optimisation model", "Ein kontinuierliches Optimierungsmodell")}</li>
            <li>{tt("A prioritised implementation strategy", "Eine priorisierte Umsetzungsstrategie")}</li>
            <li>{tt("An integration decision despite unclear success impact", "Eine Integrationsentscheidung trotz unklarer Erfolgswirkung")}</li>
          </ol>
          <p className="mt-1 text-ash">{tt("Step A (the architecture) and Step B (the decision) are one frame: together they are the one core task of this route. Four optional blocks below go deeper.", "Schritt A (die Architektur) und Schritt B (die Entscheidung) sind ein Rahmen: Zusammen sind sie die eine Kernaufgabe dieser Route. Vier optionale Blöcke unten vertiefen.")}</p>
        </div>
      </div>
      <TodayTable />
      <div role="note" className="rounded-lg border border-gold bg-accentSoft p-3 text-caption text-ink" id="task1-quote">
        <p className="smallcaps text-accent">{tt("Where Route 1 left off · your own answers", "Wo Route 1 aufgehört hat · Ihre eigenen Antworten")}</p>
        {has ? (
          <p className="mt-1">
            {tt("Measures you chose in Route 1: ", "Von Ihnen in Route 1 gewählte Maßnahmen: ")}
            <strong>{chosen.join(", ")}</strong>.
          </p>
        ) : (
          <p className="mt-1">{tt("You have not answered Route 1 yet. That is fine: nothing here is blocked, and this box fills in when you do.", "Sie haben Route 1 noch nicht beantwortet. Das ist in Ordnung: Hier ist nichts gesperrt, und dieses Feld füllt sich, sobald Sie es tun.")}</p>
        )}
        <button type="button" onClick={() => jump("block-2-4", "/route-1/")} className="btn-ghost btn-sm mt-2">
          {tt("Go to Block 2.4 in Route 1", "Zu Block 2.4 in Route 1")}
        </button>
      </div>
      <Callout label={tt("Case assumption", "Fallannahme")} tone="amber">
        <p>
          {tt("The brief gives the role (Chief Customer Officer or sales manager) and the situation: single measures exist, customer retention is not managed systematically, the potential is unused; a limited budget, uncertain customer reactions, a complex system landscape; and an integration decision despite unclear success impact. The budget, the items, the uplifts, the costs and the baselines are made up for this exercise.", "Der Auftrag nennt die Rolle (Chief Customer Officer oder Vertriebsleitung) und die Lage: Einzelne Maßnahmen existieren, die Kundenbindung wird nicht systematisch gesteuert, das Potenzial ist ungenutzt; ein begrenztes Budget, unsichere Kundenreaktionen, eine komplexe Systemlandschaft; und eine Integrationsentscheidung trotz unklarer Erfolgswirkung. Budget, Punkte, Uplifts, Kosten und Ausgangswerte sind für diese Übung erfunden.")}
        </p>
      </Callout>
    </section>
  );
}

export function Task2() {
  const p = usePersisted();
  const [scn, setScn] = useState<Scn>(0);
  const missing = r2Missing(p);
  const filename = exportName(p.participant.name, "l3-retention-memo");
  return (
    <div className="space-y-6">
      <CaseBrief />
      <div id="r2-frame" className="space-y-4">
        <Panel scn={scn} setScn={setScn} />
        <StepA scn={scn} />
        <StepB scn={scn} />
      </div>
      <section id="go-deeper" aria-labelledby="go-deeper-h" className="space-y-3">
        <div className="space-y-1">
          <h2 id="go-deeper-h">{tt("Go deeper · optional", "Vertiefen · optional")}</h2>
          <p className="max-w-prose text-caption text-ash">
            {tt(
              "Four blocks that each practise one part of the plan: the principles of the vision, the definition of central motivation moments, the KPI system, and roll out, keep testing or stop for game elements. They are folded: nothing in the frame needs them, and they are not counted in the progress ring or the missing list. Open one any time.",
              "Vier Blöcke, die je einen Teil des Plans üben: die Prinzipien des Zielbilds, die Festlegung zentraler Motivationsmomente, das KPI-System, und ausrollen, weiter testen oder stoppen bei Spielelementen. Sie sind eingeklappt: Nichts im Rahmen braucht sie, und sie zählen nicht im Fortschrittsring oder in der Liste des Offenen. Öffnen Sie einen jederzeit.",
            )}
          </p>
        </div>
        <OptionalSection
          id="block-3-1"
          title={tt("Block 3.1 · The target vision of an integrated retention system", "Block 3.1 · Das Zielbild eines integrierten Kundenbindungssystems")}
          minutes={BLOCK_MINUTES["3.1"]}
          reason={tt("Names the principles behind an integrated retention system; Step A asks for your vision without them.", "Benennt die Prinzipien hinter einem integrierten Kundenbindungssystem; Schritt A fragt Ihr Zielbild auch ohne sie ab.")}
        >
          <Block31 />
        </OptionalSection>
        <OptionalSection
          id="block-3-2"
          title={tt("Block 3.2 · Definition of central motivation moments", "Block 3.2 · Festlegung zentraler Motivationsmomente")}
          minutes={BLOCK_MINUTES["3.2"]}
          reason={tt("Sorts eight moments in the customer journey into integrate now, connect the data first or not central; Step A prints the figures it needs itself.", "Sortiert acht Momente der Customer Journey in jetzt integrieren, zuerst die Daten verbinden oder nicht zentral; Schritt A druckt die Zahlen, die er braucht, selbst.")}
        >
          <Block32 />
        </OptionalSection>
        <OptionalSection
          id="block-3-3"
          title={tt("Block 3.3 · A KPI system for game elements", "Block 3.3 · Ein KPI-System für Spielelemente")}
          minutes={BLOCK_MINUTES["3.3"]}
          reason={tt("Rates KPI candidates on four tests; Step B prints the customer figures it uses, so the decision does not need the ratings.", "Bewertet KPI-Kandidaten nach vier Tests; Schritt B druckt die Kundenzahlen, die er nutzt, die Entscheidung braucht die Bewertungen also nicht.")}
        >
          <Block33 />
        </OptionalSection>
        <OptionalSection
          id="block-3-4"
          title={tt("Block 3.4 · Game elements tested: roll out, keep testing or stop", "Block 3.4 · Spielelemente getestet: ausrollen, weiter testen oder stoppen")}
          minutes={BLOCK_MINUTES["3.4"]}
          reason={tt("Decides roll out, keep testing or stop for six game-element tests; Step B asks only when you would stop.", "Entscheidet für sechs Tests von Spielelementen über Ausrollen, Weitertesten oder Stoppen; Schritt B fragt nur, wann Sie aufhören würden.")}
        >
          <Block34 />
        </OptionalSection>
      </section>
      <MemoPanel />
      <ExportBar
        id="export-l3"
        previewTitle={tt("Preview of your memo", "Vorschau Ihres Memos")}
        exportLabel={tt("Export the Retention System Memo", "Retention System Memo exportieren")}
        docTitle="Retention System Memo"
        filename={filename}
        missing={missing}
        buildBody={() => memoBody(p)}
        showPreview={false}
      />
    </div>
  );
}
