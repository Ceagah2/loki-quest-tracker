"use client";

import type { useTracker } from "@/hooks/useTracker";

type TrackerAPI = ReturnType<typeof useTracker>;

export function ImmaturiyAngel({ tracker }: { tracker: TrackerAPI }) {
  const { iaLevel, iaStep, iaUndo } = tracker;

  // 0-9 = upgrade steps (+0 to +9), done when iaLevel > stepIndex
  // 10-19 = downgrade steps (+9 down to +0), stepIndex = 10+i, label = +(9-i)
  const upgradeComplete = iaLevel >= 10;
  const cycleComplete = iaLevel >= 20;

  return (
    <div className="mt-3 space-y-3">
      <p className="text-[11px] text-stone-500">
        Faça upgrade até +9, depois downgrade até +0. Clique no próximo nível para marcar.
      </p>

      {/* Upgrade phase */}
      <div>
        <div className="text-[10px] text-stone-500 uppercase tracking-wide mb-2">
          Fase de Upgrade
          {upgradeComplete && <span className="text-green-400 ml-2">✓ completo</span>}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: 10 }, (_, i) => {
            const done = iaLevel > i;
            const active = iaLevel === i;
            return (
              <button
                key={i}
                onClick={() => active && iaStep(i)}
                disabled={!active}
                className={`w-10 h-10 rounded-md border text-xs font-medium transition-all flex items-center justify-center ${
                  done
                    ? "bg-green-900/20 border-green-800/40 text-green-400 cursor-not-allowed"
                    : active
                    ? "border-yellow-700/60 bg-yellow-900/20 text-yellow-400 cursor-pointer hover:bg-yellow-900/35"
                    : "border-rune bg-cave-card2 text-stone-600 cursor-not-allowed opacity-40"
                }`}
              >
                +{i}
              </button>
            );
          })}
        </div>
      </div>

      {/* Downgrade phase */}
      <div>
        <div className="text-[10px] text-stone-500 uppercase tracking-wide mb-2">
          Fase de Downgrade
          {cycleComplete && <span className="text-green-400 ml-2">✓ completo</span>}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: 10 }, (_, i) => {
            const stepIdx = 10 + i;
            const label = 9 - i;
            const done = iaLevel > stepIdx;
            const active = iaLevel === stepIdx && upgradeComplete;
            const unlocked = upgradeComplete;
            return (
              <button
                key={i}
                onClick={() => active && iaStep(stepIdx)}
                disabled={!active}
                className={`w-10 h-10 rounded-md border text-xs font-medium transition-all flex items-center justify-center ${
                  done
                    ? "bg-green-900/20 border-green-800/40 text-green-400 cursor-not-allowed"
                    : active
                    ? "border-yellow-700/60 bg-yellow-900/20 text-yellow-400 cursor-pointer hover:bg-yellow-900/35"
                    : "border-rune bg-cave-card2 text-stone-600 cursor-not-allowed opacity-40"
                } ${!unlocked && !done ? "opacity-25" : ""}`}
              >
                +{label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {iaLevel > 0 && !cycleComplete && (
          <button
            onClick={iaUndo}
            className="px-3 py-1.5 rounded-md border border-rune bg-transparent text-stone-500 text-xs hover:border-red-800/50 hover:text-red-400 transition-colors"
          >
            ↩ Desfazer último
          </button>
        )}
        {cycleComplete && (
          <p className="text-xs text-green-400">✓ Ciclo completo!</p>
        )}
      </div>
    </div>
  );
}
