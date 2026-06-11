"use client";

import { HH_TIERS } from "@/lib/data";
import type { useTracker } from "@/hooks/useTracker";

type TrackerAPI = ReturnType<typeof useTracker>;

export function HeadHunting({ tracker }: { tracker: TrackerAPI }) {
  const { hhDone, hhTierComplete, markMob } = tracker;

  return (
    <div className="mt-3 space-y-3">
      {Object.entries(HH_TIERS).map(([tier, mobs]) => {
        const complete = hhTierComplete(tier);
        return (
          <div key={tier}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] text-stone-500 uppercase tracking-wide">
                Tier {tier}
              </span>
              {complete && (
                <span className="text-[10px] text-green-400">✓ completo (permanente)</span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {mobs.map((mob) => {
                const done = hhDone(mob);
                return (
                  <button
                    key={mob}
                    onClick={() => !done && markMob(mob)}
                    disabled={done}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs transition-all ${
                      done
                        ? "bg-green-900/15 border-green-800/35 text-green-400 cursor-not-allowed"
                        : "border-rune bg-cave-card2 text-stone-300 hover:border-teal-700/50 hover:text-teal-400 cursor-pointer"
                    }`}
                  >
                    {mob}
                    {done && <span className="text-green-400">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
