"use client";

import { LOKI_DATA, LOKI_QUEST_NAMES } from "@/lib/data";
import type { useTracker } from "@/hooks/useTracker";

type TrackerAPI = ReturnType<typeof useTracker>;

export function LokiSection({ tracker }: { tracker: TrackerAPI }) {
  const { lokiTierDone, lokiSel, lokiUnlocked, selectLoki, completeLoki, undoLoki, clearLokiSel, toggleCard, isOpen } = tracker;

  return (
    <div className="space-y-2">
      <p className="text-[11px] text-stone-500 mb-3">
        1 quest por tier por dia (randomizada pelo jogo). Selecione a que recebeu e marque como completo.
      </p>

      {LOKI_DATA.map((tierData) => {
        const tier = tierData.tier;
        const unlocked = lokiUnlocked(tier);
        const done = lokiTierDone(tier);
        const sel = lokiSel(tier);
        const open = isOpen(String(tier), "_lo_");

        return (
          <div
            key={tier}
            className={`rounded-lg border overflow-hidden transition-colors ${
              done ? "border-green-800/40 bg-cave-card"
              : unlocked ? "border-rune bg-cave-card hover:border-rune-border"
              : "border-rune bg-cave-card opacity-45 pointer-events-none"
            }`}
          >
            <button
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-left"
              onClick={() => toggleCard(String(tier), "_lo_")}
              disabled={!unlocked}
            >
              <span className="text-sm font-medium text-loki">Tier {tier}</span>
              <div className="flex items-center gap-2">
                {!unlocked && <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-900/20 text-red-400 border border-red-800/30">Bloqueado</span>}
                {done && <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-900/20 text-green-400 border border-green-800/30">✓ Completo</span>}
                {unlocked && !done && <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-900/20 text-teal-400 border border-teal-800/30">Em andamento</span>}
                <span className={`text-stone-600 text-sm transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▾</span>
              </div>
            </button>

            {open && unlocked && (
              <div className="px-3.5 pb-3 border-t border-rune">
                <p className="text-[11px] text-stone-500 mt-2.5 mb-2">
                  {done ? "Quest completada:" : "Selecione a quest que o jogo sorteou:"}
                </p>

                <div className="space-y-1.5">
                  {tierData.quests.map((q) => {
                    const isSel = sel === q.qid;
                    const isDoneQ = done && isSel;
                    const showAll = !done;

                    // when done, only show the selected quest
                    if (done && !isSel) return null;

                    return (
                      <button
                        key={q.qid}
                        onClick={() => !done && selectLoki(tier, q.qid)}
                        disabled={done}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md border text-left transition-all ${
                          isDoneQ ? "bg-green-900/15 border-green-800/35 cursor-default"
                          : isSel ? "bg-teal-900/15 border-teal-700/40 cursor-pointer"
                          : done ? "border-rune bg-cave-card2 opacity-40 cursor-not-allowed"
                          : "border-rune bg-cave-card2 hover:border-teal-800/40 cursor-pointer"
                        }`}
                      >
                        <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isDoneQ ? "border-green-600 bg-green-600"
                          : isSel ? "border-loki bg-loki"
                          : "border-stone-600"
                        }`}>
                          {(isSel || isDoneQ) && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-xs font-medium ${isDoneQ ? "text-green-400" : isSel ? "text-teal-400" : "text-stone-300"}`}>
                            {LOKI_QUEST_NAMES[q.qid] ?? q.qid}
                          </div>
                          <div className="text-[11px] text-stone-500 mt-0.5">{q.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* actions */}
                <div className="flex gap-2 mt-3 flex-wrap">
                  {sel && !done && (
                    <>
                      <button
                        onClick={() => completeLoki(tier)}
                        className="px-3.5 py-1.5 rounded-md border border-teal-700/40 bg-teal-900/15 text-teal-400 text-xs hover:bg-teal-900/30 transition-colors"
                      >
                        ✓ Marcar como completo
                      </button>
                      <button
                        onClick={() => clearLokiSel(tier)}
                        className="px-3.5 py-1.5 rounded-md border border-red-800/30 bg-red-900/10 text-red-400 text-xs hover:bg-red-900/25 transition-colors"
                      >
                        Limpar seleção
                      </button>
                    </>
                  )}
                  {done && (
                    <button
                      onClick={() => undoLoki(tier)}
                      className="px-3.5 py-1.5 rounded-md border border-stone-700/40 bg-stone-800/20 text-stone-400 text-xs hover:border-red-800/40 hover:text-red-400 transition-colors"
                    >
                      ↩ Desfazer conclusão
                    </button>
                  )}
                </div>

                {done && (
                  <p className="text-[11px] text-green-400 mt-2">
                    ✓ Tier completo! O próximo tier foi desbloqueado.
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
