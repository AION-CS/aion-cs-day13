"use client";

import { SectionRail } from "@/components/chrome/SectionRail";
import { PageNav } from "@/components/chrome/PageNav";
import { HashFlash } from "@/components/chrome/HashFlash";
import { SuggestedOrderBanner } from "@/components/ui/Banner";
import { MateriB } from "@/components/materi/Materi";
import { Task2 } from "@/components/task2/Task2";
import { ResetRoute } from "@/components/ui/ResetRoute";
import { Gloss } from "@/lib/glossify";
import { tt } from "@/lib/lang";

export function Route2Page() {
  return (
    <div className="space-y-8 pt-4">
      <HashFlash />
      <header className="space-y-3">
        <div className="space-y-1">
          <p className="smallcaps text-accent">{tt("Route 2 · Level 3 · Management decision", "Route 2 · Level 3 · Managemententscheidung")}</p>
          <h1>{tt("Build an integrated retention architecture instead of isolated measures", "Eine integrierte Kundenbindungsarchitektur statt isolierter Maßnahmen aufbauen")}</h1>
        </div>
        <blockquote className="max-w-prose space-y-2 border-l-4 border-gold bg-accentSoft px-4 py-3 text-body text-ink">
          <p>
            <Gloss>
              {tt("Route 1 looked at EngageIT's game ideas: which mechanism each uses, where a game element helps, and which measures to choose. Level 3 asks a different question: what does an integrated retention architecture look like, which moments are central, which game elements come in and when, and what do you integrate today although nobody can promise the result?", "Route 1 hat die Spielideen von EngageIT betrachtet: welchen Mechanismus jede nutzt, wo ein Spielelement hilft und welche Maßnahmen zu wählen sind. Level 3 stellt eine andere Frage: Wie sieht eine integrierte Kundenbindungsarchitektur aus, welche Momente sind zentral, welche Spielelemente kommen wann dazu, und was integrieren Sie heute, obwohl niemand das Ergebnis versprechen kann?")}
            </Gloss>
          </p>
        </blockquote>
      </header>
      <SuggestedOrderBanner
        routeKey="r2"
        text={tt(
          "Route 1 first is recommended, because the situation quotes the measures you chose there. Every section stays open, so you can work through this route regardless.",
          "Route 1 zuerst wird empfohlen, weil die Lage die Maßnahmen zitiert, die Sie dort gewählt haben. Jeder Abschnitt bleibt offen, Sie können diese Route trotzdem bearbeiten.",
        )}
      />
      <SectionRail route={2} />
      <PageNav route={2} />
      <MateriB />
      <Task2 />
      <ResetRoute route={2} />
    </div>
  );
}
