import { bi, t } from "@/lib/lang";

/**
 * Day 13 reference list. Cards cite by key; each `References` accordion shows the union of what its own cards cite. Every entry is a
 * published work or an official legal text cited by its usual reference; the bracketed note says what the card takes from it. Check every
 * source before you teach from it: page numbers and editions differ between printings.
 */
export type RefKey =
  | "deterding2011"
  | "hamari2014"
  | "ryan2000"
  | "deci1999"
  | "nunes2006"
  | "kivetz2006"
  | "hamari2017"
  | "provost2013"
  | "kaplan1992"
  | "ries2011"
  | "kohavi2020"
  | "hubbard2014"
  | "davenport2018"
  | "lemon2016"
  | "gdpr2016"
  | "courtney1997"
  | "klein2007"
  | "tetlock2015";

export type Reference = { key: RefKey; chip: string; full: string };

const r = (key: RefKey, chip: string, en: string, de: string) => ({ key, chip, full: t(en, de) });

export const REFERENCES: Record<RefKey, Reference> = bi({
  deterding2011: r("deterding2011", "Deterding et al. 2011", "Deterding, S., Dixon, D., Khaled, R., & Nacke, L. (2011). From game design elements to gamefulness: Defining “gamification”. Proceedings of the 15th International Academic MindTrek Conference, 9–15. (Gamification means using game design elements in a setting that is not a game.)", "Deterding, S., Dixon, D., Khaled, R., & Nacke, L. (2011). From game design elements to gamefulness: Defining “gamification”. Proceedings of the 15th International Academic MindTrek Conference, 9–15. (Gamification heißt, Spielelemente in einem Umfeld zu nutzen, das kein Spiel ist.)"),
  hamari2014: r("hamari2014", "Hamari et al. 2014", "Hamari, J., Koivisto, J., & Sarsa, H. (2014). Does gamification work? A literature review of empirical studies on gamification. Proceedings of the 47th Hawaii International Conference on System Sciences, 3025–3034. (Gamification mostly produces positive effects, but they depend on the context and on the users.)", "Hamari, J., Koivisto, J., & Sarsa, H. (2014). Does gamification work? A literature review of empirical studies on gamification. Proceedings of the 47th Hawaii International Conference on System Sciences, 3025–3034. (Gamification hat meist positive Wirkungen, doch sie hängen vom Umfeld und von den Nutzern ab.)"),
  ryan2000: r("ryan2000", "Ryan & Deci 2000", "Ryan, R. M., & Deci, E. L. (2000). Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. American Psychologist, 55(1), 68–78. (People are most lastingly motivated when they want the activity itself; control and prizes can crowd that out.)", "Ryan, R. M., & Deci, E. L. (2000). Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. American Psychologist, 55(1), 68–78. (Menschen sind am dauerhaftesten motiviert, wenn sie die Tätigkeit selbst wollen; Kontrolle und Preise können das verdrängen.)"),
  deci1999: r("deci1999", "Deci et al. 1999", "Deci, E. L., Koestner, R., & Ryan, R. M. (1999). A meta-analytic review of experiments examining the effects of extrinsic rewards on intrinsic motivation. Psychological Bulletin, 125(6), 627–668. (Tangible rewards for an activity people already enjoy tend to lower their interest in it once the reward ends.)", "Deci, E. L., Koestner, R., & Ryan, R. M. (1999). A meta-analytic review of experiments examining the effects of extrinsic rewards on intrinsic motivation. Psychological Bulletin, 125(6), 627–668. (Greifbare Belohnungen für eine Tätigkeit, die Menschen ohnehin gern tun, senken ihr Interesse daran tendenziell, sobald die Belohnung endet.)"),
  nunes2006: r("nunes2006", "Nunes & Drèze 2006", "Nunes, J. C., & Drèze, X. (2006). The endowed progress effect: How artificial advancement increases effort. Journal of Consumer Research, 32(4), 504–512. (Customers work harder towards a goal when they can see progress already made.)", "Nunes, J. C., & Drèze, X. (2006). The endowed progress effect: How artificial advancement increases effort. Journal of Consumer Research, 32(4), 504–512. (Kunden strengen sich mehr auf ein Ziel hin an, wenn sie schon gemachten Fortschritt sehen.)"),
  kivetz2006: r("kivetz2006", "Kivetz et al. 2006", "Kivetz, R., Urminsky, O., & Zheng, Y. (2006). The goal-gradient hypothesis resurrected: Purchase acceleration, illusionary goal progress, and customer retention. Journal of Marketing Research, 43(1), 39–58. (Effort speeds up the closer a goal gets; a visible path to a goal keeps customers going.)", "Kivetz, R., Urminsky, O., & Zheng, Y. (2006). The goal-gradient hypothesis resurrected: Purchase acceleration, illusionary goal progress, and customer retention. Journal of Marketing Research, 43(1), 39–58. (Der Einsatz steigt, je näher ein Ziel rückt; ein sichtbarer Weg zum Ziel hält Kunden bei der Stange.)"),
  hamari2017: r("hamari2017", "Hamari 2017", "Hamari, J. (2017). Do badges increase user activity? A field experiment on the effects of gamification. Computers in Human Behavior, 71, 469–478. (In a field experiment, badges raised activity, but the effect depended on what the badges were for.)", "Hamari, J. (2017). Do badges increase user activity? A field experiment on the effects of gamification. Computers in Human Behavior, 71, 469–478. (In einem Feldexperiment hoben Badges die Aktivität, aber der Effekt hing davon ab, wofür die Badges standen.)"),
  provost2013: r("provost2013", "Provost & Fawcett 2013", "Provost, F., & Fawcett, T. (2013). Data Science for Business. O'Reilly. (Rates, lift and expected value as the basic tools for reading a result.)", "Provost, F., & Fawcett, T. (2013). Data Science for Business. O'Reilly. (Raten, Lift und Erwartungswert als Grundwerkzeuge, um ein Ergebnis zu lesen.)"),
  kaplan1992: r("kaplan1992", "Kaplan & Norton 1992", "Kaplan, R. S., & Norton, D. P. (1992). The balanced scorecard: Measures that drive performance. Harvard Business Review, 70(1), 71–79. (A few linked measures, results and the drivers behind them, instead of many unrelated ones.)", "Kaplan, R. S., & Norton, D. P. (1992). The balanced scorecard: Measures that drive performance. Harvard Business Review, 70(1), 71–79. (Wenige verbundene Kennzahlen, Ergebnisse und ihre Treiber, statt vieler unverbundener.)"),
  ries2011: r("ries2011", "Ries 2011", "Ries, E. (2011). The Lean Startup. Crown Business. (Vanity metrics against actionable metrics; learning through controlled experiments.)", "Ries, E. (2011). The Lean Startup. Crown Business. (Vanity Metrics gegenüber handlungsleitenden Kennzahlen; Lernen durch kontrollierte Experimente.)"),
  kohavi2020: r("kohavi2020", "Kohavi et al. 2020", "Kohavi, R., Tang, D., & Xu, Y. (2020). Trustworthy Online Controlled Experiments. Cambridge University Press. (Random split, one change, a size fixed in advance, guardrail metrics, and the danger of stopping early.)", "Kohavi, R., Tang, D., & Xu, Y. (2020). Trustworthy Online Controlled Experiments. Cambridge University Press. (Zufällige Aufteilung, eine Änderung, eine vorab festgelegte Größe, Guardrail-Kennzahlen und die Gefahr, zu früh zu stoppen.)"),
  hubbard2014: r("hubbard2014", "Hubbard 2014", "Hubbard, D. W. (2014). How to Measure Anything, 3rd ed. Wiley. (Start from the decision; measure what would change it.)", "Hubbard, D. W. (2014). How to Measure Anything, 3. Aufl. Wiley. (Von der Entscheidung ausgehen; messen, was sie ändern würde.)"),
  davenport2018: r("davenport2018", "Davenport & Ronanki 2018", "Davenport, T. H., & Ronanki, R. (2018). Artificial intelligence for the real world. Harvard Business Review, 96(1), 108–116. (Start from a business problem with small, measurable projects, not from the technology.)", "Davenport, T. H., & Ronanki, R. (2018). Artificial intelligence for the real world. Harvard Business Review, 96(1), 108–116. (Von einem Geschäftsproblem mit kleinen, messbaren Projekten ausgehen, nicht von der Technologie.)"),
  lemon2016: r("lemon2016", "Lemon & Verhoef 2016", "Lemon, K. N., & Verhoef, P. C. (2016). Understanding customer experience throughout the customer journey. Journal of Marketing, 80(6), 69–96. (Customer experience as a journey across many touchpoints, before, during and after the purchase.)", "Lemon, K. N., & Verhoef, P. C. (2016). Understanding customer experience throughout the customer journey. Journal of Marketing, 80(6), 69–96. (Kundenerlebnis als Journey über viele Touchpoints, vor, während und nach dem Kauf.)"),
  gdpr2016: r("gdpr2016", "GDPR 2016", "Regulation (EU) 2016/679 of the European Parliament and of the Council (General Data Protection Regulation), Art. 6 (lawful basis), Art. 21 (objection to direct marketing) and Art. 22 (automated individual decisions).", "Verordnung (EU) 2016/679 des Europäischen Parlaments und des Rates (Datenschutz-Grundverordnung, DSGVO), Art. 6 (Rechtsgrundlage), Art. 21 (Widerspruch gegen Direktwerbung) und Art. 22 (automatisierte Einzelentscheidungen)."),
  courtney1997: r("courtney1997", "Courtney et al. 1997", "Courtney, H., Kirkland, J., & Viguerie, P. (1997). Strategy under uncertainty. Harvard Business Review, 75(6), 67–79. (Match the commitment to how much is known; no-regret moves first.)", "Courtney, H., Kirkland, J., & Viguerie, P. (1997). Strategy under uncertainty. Harvard Business Review, 75(6), 67–79. (Die Festlegung daran ausrichten, wie viel man weiß; No-regret-Schritte zuerst.)"),
  klein2007: r("klein2007", "Klein 2007", "Klein, G. (2007). Performing a project premortem. Harvard Business Review, 85(9), 18–19. (Imagine the plan has failed and write down why, before it starts.)", "Klein, G. (2007). Performing a project premortem. Harvard Business Review, 85(9), 18–19. (Sich vorstellen, der Plan sei gescheitert, und aufschreiben warum, bevor er startet.)"),
  tetlock2015: r("tetlock2015", "Tetlock & Gardner 2015", "Tetlock, P. E., & Gardner, D. (2015). Superforecasting: The Art and Science of Prediction. Crown. (Forecasts improve only when they are checked against outcomes.)", "Tetlock, P. E., & Gardner, D. (2015). Superforecasting: The Art and Science of Prediction. Crown. (Prognosen werden nur besser, wenn sie mit Ergebnissen abgeglichen werden.)"),
});

export const refFull = (key: RefKey) => REFERENCES[key].full;
export const REFERENCE_ORDER: RefKey[] = Object.keys(REFERENCES) as RefKey[];
