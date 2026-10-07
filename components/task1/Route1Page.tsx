"use client";

import { SectionRail } from "@/components/chrome/SectionRail";
import { PageNav } from "@/components/chrome/PageNav";
import { HashFlash } from "@/components/chrome/HashFlash";
import { SuggestedOrderBanner } from "@/components/ui/Banner";
import { MateriA } from "@/components/materi/Materi";
import { Task1 } from "@/components/task1/Task1";
import { ResetRoute } from "@/components/ui/ResetRoute";
import { tt } from "@/lib/lang";

export function Route1Page() {
  return (
    <div className="space-y-8 pt-4">
      <HashFlash />
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt("Route 1 · Levels 1 and 2 · Knowledge and application", "Route 1 · Level 1 und 2 · Wissen und Anwendung")}</p>
        <h1>{tt("Motivation through gamification: reward, competition and progress, real motivation versus short-term incentives, and how to integrate them", "Motivation durch Gamification: Belohnung, Wettbewerb und Fortschritt, echte Motivation gegen kurzfristige Anreize, und wie man sie integriert")}</h1>
      </header>
      <SuggestedOrderBanner
        routeKey="r1"
        text={tt("Materi A (the two core cards are A1 and A7) → the Gamification Analysis task, one case in two parts (Understand gamification, Measure it and choose), with two core blocks. Every section stays open, so you can start anywhere.", "Materi A (die zwei Kernkarten sind A1 und A7) → die Aufgabe Gamification Analysis, ein Fall in zwei Teilen (Gamification verstehen, Messen und auswählen), mit zwei Kernblöcken. Jeder Abschnitt bleibt offen, Sie können überall beginnen.")}
      />
      <SectionRail route={1} />
      <PageNav route={1} />
      <MateriA />
      <Task1 />
      <ResetRoute route={1} />
    </div>
  );
}
