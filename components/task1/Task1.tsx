"use client";

import { ExportBar } from "@/components/ui/ExportBar";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { Block11, Block12, Block13, Block14 } from "@/components/task1/Part1";
import { Block21, Block22, Block23, Block24 } from "@/components/task1/Part2";
import { Callout } from "@/components/ui/MaterialCard";
import { BUDGET, MONTHS } from "@/data/measures";
import { analysisBody } from "@/lib/exportDoc";
import { l1Missing } from "@/lib/missing";
import { euro, num, tt } from "@/lib/lang";
import { FORECAST, PILOT } from "@/data/forecast";
import { exportName } from "@/lib/slug";
import { usePersisted } from "@/store/usePersisted";
import { Gloss } from "@/lib/glossify";
import { BLOCK_MINUTES, CORE1_MINUTES, TASK1_MINUTES } from "@/lib/routes";

function CaseBrief() {
  return (
    <section id="case-brief" aria-labelledby="case-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case-h">{tt("The case: EngageIT Systems GmbH", "Der Fall: EngageIT Systems GmbH")}</h2>
        <span className="smallcaps">{tt("Read once · about 5 min", "Einmal lesen · ca. 5 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt("EngageIT Systems GmbH sells an IT platform for project and service management to the Mittelstand. Its customers rarely use the features they pay for, so engagement is low and retention is mediocre. The company already runs several measures (discounts, a newsletter, support, a membership programme and a referral scheme), but each one works on its own and nobody connects them. Management wants to know whether game elements such as rewards, rankings and progress bars can raise use and retention, and how they fit with what already exists.", "EngageIT Systems GmbH verkauft dem Mittelstand eine IT-Plattform für Projekt- und Servicemanagement. Die Kunden nutzen die Funktionen, für die sie bezahlen, kaum, also ist das Engagement gering und die Kundenbindung mittelmäßig. Das Unternehmen betreibt schon mehrere Maßnahmen (Rabatte, einen Newsletter, Support, ein Mitgliedschaftsprogramm und ein Empfehlungsprogramm), aber jede arbeitet für sich, und niemand verbindet sie. Die Geschäftsführung will wissen, ob Spielelemente wie Belohnungen, Ranglisten und Fortschrittsleisten Nutzung und Kundenbindung steigern können und wie sie zu dem passen, was schon existiert.")}
        </Gloss>
      </p>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt(
            `One first sign: last year ${num(PILOT.control.sent)} new customers saw a home screen without a set-up bar; ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })}% finished set-up. ${num(PILOT.variant.sent)} new customers saw a set-up bar; ${num(FORECAST.f1, { maximumFractionDigits: 1 })}% finished set-up, ${num(FORECAST.f2)} times as often. The groups may differ in other ways, so it is a hint, not proof.`,
            `Ein erstes Zeichen: Im letzten Jahr sahen ${num(PILOT.control.sent)} Neukunden einen Startbildschirm ohne Einrichtungsleiste; ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })} % schlossen die Einrichtung ab. ${num(PILOT.variant.sent)} Neukunden sahen eine Einrichtungsleiste; ${num(FORECAST.f1, { maximumFractionDigits: 1 })} % schlossen die Einrichtung ab, ${num(FORECAST.f2)}-mal so oft. Die Gruppen unterscheiden sich vielleicht auch in anderem, also ist es ein Hinweis, kein Beweis.`,
          )}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("What you have", "Was Sie haben")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>{tt("Nine game ideas the teams have proposed (Block 1.1).", "Neun Spielideen, die die Teams vorgeschlagen haben (Block 1.1).")}</li>
            <li>{tt("Last year's set-up figures (optional Block 1.2) and eight moments on the platform (optional Block 1.3).", "Die Einrichtungs-Werte des letzten Jahres (optionaler Block 1.2) und acht Momente auf der Plattform (optionaler Block 1.3).")}</li>
            <li>{tt("Twelve metrics EngageIT reports today (optional Block 2.1) and six measures it could fund (Block 2.4).", "Zwölf Kennzahlen, die EngageIT heute berichtet (optionaler Block 2.1), und sechs Maßnahmen, die es finanzieren könnte (Block 2.4).")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              {tt("Budget: ", "Budget: ")}
              <strong>{euro(BUDGET)}</strong>
            </li>
            <li>
              {tt("Time: ", "Zeit: ")}
              <strong>{tt(`${MONTHS} months`, `${MONTHS} Monate`)}</strong>
            </li>
            <li>{tt("The cost, the weeks and what every measure connects to are printed in Block 2.4.", "Kosten, Wochen und womit jede Maßnahme verbunden ist, stehen in Block 2.4.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · two core blocks, about ${CORE1_MINUTES} min`, `So läuft die Aufgabe · zwei Kernblöcke, ca. ${CORE1_MINUTES} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Block 1.1: sort nine game ideas by the mechanism each uses (reward, competition, progress and status), and add one idea of your own (Level 1, material A1).", "Block 1.1: neun Spielideen nach dem Mechanismus sortieren, den jede nutzt (Belohnung, Wettbewerb, Fortschritt und Status), und eine eigene Idee ergänzen (Level 1, Material A1).")}</li>
            <li>{tt("Block 2.4: choose three of six measures, score them by motivation, integration and sustainability, and defend the order (Level 2, material A7).", "Block 2.4: drei von sechs Maßnahmen wählen, sie nach Motivation, Integration und Nachhaltigkeit bewerten und die Reihenfolge begründen (Level 2, Material A7).")}</li>
          </ol>
          <p className="mt-1 text-ash">{tt(`Six more blocks (about ${TASK1_MINUTES - CORE1_MINUTES} min) are optional and folded.`, `Sechs weitere Blöcke (ca. ${TASK1_MINUTES - CORE1_MINUTES} Min.) sind optional und eingeklappt.`)}</p>
        </div>
      </div>
      <Callout label={tt("Case assumption", "Fallannahme")} tone="amber">
        <p>
          {tt("The brief says: customers rarely use the platform; retention is mediocre; the existing measures are not integrated; €150,000 and five months. Everything else is made up for this exercise: the game ideas, the set-up figures, the moments on the platform, the metrics, the rates and the costs.", "Der Auftrag sagt: Kunden nutzen die Plattform kaum; die Kundenbindung ist mittelmäßig; die bestehenden Maßnahmen sind nicht integriert; 150.000 € und fünf Monate. Alles andere ist für diese Übung erfunden: die Spielideen, die Einrichtungs-Werte, die Momente auf der Plattform, die Kennzahlen, die Quoten und die Kosten.")}
        </p>
      </Callout>
    </section>
  );
}

function PartHeading({ id, n, title, level }: { id: string; n: number; title: string; level: string }) {
  return (
    <div id={id} className="flex flex-wrap items-baseline gap-x-3 border-b-2 border-ink pb-1 pt-2">
      <span className="smallcaps text-accent">{tt(`Part ${n}`, `Teil ${n}`)}</span>
      <h2>{title}</h2>
      <span className="smallcaps ml-auto">{level}</span>
    </div>
  );
}

export function Task1() {
  const p = usePersisted();
  const missing = l1Missing(p);
  const filename = exportName(p.participant.name, "l1l2-gamification-file");
  return (
    <section id="task-1" aria-labelledby="task1-h" className="space-y-6">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt(`Task 1 · two core blocks, one per level; optional blocks folded`, `Task 1 · zwei Kernblöcke, einer pro Level; optionale Blöcke eingeklappt`)}</p>
        <h2 id="task1-h">{tt("Gamification Analysis: motivate, integrate, choose", "Gamification Analysis: motivieren, integrieren, wählen")}</h2>
      </header>
      <CaseBrief />
      <PartHeading id="part-1" n={1} title={tt("Understand gamification", "Gamification verstehen")} level={tt("Level 1 · Knowledge", "Level 1 · Wissen")} />
      <Block11 />
      <OptionalSection
        id="block-1-2"
        title={tt("Block 1.2 · Read the set-up figures: two finish rates side by side", "Block 1.2 · Die Einrichtungs-Werte lesen: zwei Abschlussquoten nebeneinander")}
        minutes={BLOCK_MINUTES["1.2"]}
        reason={tt("Practises reading one comparison without being fooled by it (the two groups may differ in other ways); the choices of Block 2.4 do not need it.", "Übt, einen Vergleich zu lesen, ohne sich täuschen zu lassen (die zwei Gruppen unterscheiden sich vielleicht auch in anderem); die Entscheidungen in Block 2.4 brauchen es nicht.")}
      >
        <Block12 />
      </OptionalSection>
      <OptionalSection
        id="block-1-3"
        title={tt("Block 1.3 · Where a game element helps, where it plugs in, and three approaches", "Block 1.3 · Wo ein Spielelement hilft, wo es sich anschließt, und drei Ansätze")}
        minutes={BLOCK_MINUTES["1.3"]}
        reason={tt("Develops three simple gamification approaches and finds the moments they belong to; Block 1.1 and the measures of Block 2.4 are answered without it.", "Entwickelt drei einfache Gamification-Ansätze und findet die Momente, zu denen sie gehören; Block 1.1 und die Maßnahmen in Block 2.4 werden auch ohne ihn beantwortet.")}
      >
        <Block13 />
      </OptionalSection>
      <OptionalSection
        id="block-1-4"
        title={tt("Block 1.4 · Coaching reflection: from Level 1 to Level 2", "Block 1.4 · Coaching-Reflexion: von Level 1 zu Level 2")}
        minutes={BLOCK_MINUTES["1.4"]}
        reason={tt("A reflective bridge between Level 1 and Level 2, not content the Gamification Analysis File itself needs.", "Eine reflektierende Brücke zwischen Level 1 und Level 2, kein Inhalt, den die Gamification Analysis File selbst braucht.")}
      >
        <Block14 />
      </OptionalSection>
      <PartHeading id="part-2" n={2} title={tt("Measure it and choose", "Messen und auswählen")} level={tt("Level 2 · Application", "Level 2 · Anwendung")} />
      <OptionalSection
        id="block-2-1"
        title={tt("Block 2.1 · Tag EngageIT's twelve metrics by kind, and name your three KPIs", "Block 2.1 · Die zwölf Kennzahlen von EngageIT nach Art zuordnen, und Ihre drei KPIs nennen")}
        minutes={BLOCK_MINUTES["2.1"]}
        reason={tt("Practises telling an outcome, a driver, a guardrail and a vanity metric apart; the choices of Block 2.4 are made and scored without it.", "Übt, Outcome, Treiber, Guardrail und Vanity Metric zu unterscheiden; die Entscheidungen in Block 2.4 werden auch ohne ihn getroffen und bewertet.")}
      >
        <Block21 />
      </OptionalSection>
      <OptionalSection
        id="block-2-2"
        title={tt("Block 2.2 · What each kind of metric is worth, and the uncertainties", "Block 2.2 · Was jede Art von Kennzahl wert ist, und die Unsicherheiten")}
        minutes={BLOCK_MINUTES["2.2"]}
        reason={tt("Reads what each kind of metric tells management, from your tags in Block 2.1, and what can mislead a measurement; Block 2.4 can be answered without it.", "Liest, was jede Art von Kennzahl dem Management sagt, aus Ihren Zuordnungen in Block 2.1, und was eine Messung in die Irre führen kann; Block 2.4 lässt sich auch ohne es beantworten.")}
      >
        <Block22 />
      </OptionalSection>
      <OptionalSection
        id="block-2-3"
        title={tt("Block 2.3 · Design a fair A/B test", "Block 2.3 · Einen fairen A/B-Test entwerfen")}
        minutes={BLOCK_MINUTES["2.3"]}
        reason={tt("Applies the fair-test rules of Materi A6 to a set-up bar; the measures of Block 2.4 are chosen and scored without it.", "Wendet die Regeln eines fairen Tests aus Materi A6 auf eine Einrichtungsleiste an; die Maßnahmen in Block 2.4 werden auch ohne ihn gewählt und bewertet.")}
      >
        <Block23 />
      </OptionalSection>
      <Block24 />
      <ExportBar
        id="export-l1l2"
        previewTitle={tt("Preview of your Gamification Analysis File", "Vorschau Ihrer Gamification Analysis File")}
        exportLabel={tt("Export the Gamification Analysis File", "Gamification Analysis File exportieren")}
        docTitle="Gamification Analysis File"
        filename={filename}
        missing={missing}
        buildBody={() => analysisBody(p)}
      />
    </section>
  );
}
