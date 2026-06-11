"use client";

import { useState } from "react";
import { useTracker } from "@/hooks/useTracker";
import { SummaryBar } from "@/components/SummaryBar";
import { ArenaSection } from "@/components/ArenaSection";
import { MainSection } from "@/components/MainSection";
import { SecondarySection } from "@/components/SecondarySection";
import { LokiSection } from "@/components/LokiSection";

type Tab = "quests" | "loki";

function SectionHeader({ dot, label }: { dot: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[10px] font-medium text-stone-500 uppercase tracking-widest mt-4 mb-2 pb-1.5 border-b border-rune">
      <span className={`w-2 h-2 rounded-full ${dot} shrink-0`} />
      {label}
    </div>
  );
}

export default function Home() {
  const tracker = useTracker();
  const [tab, setTab] = useState<Tab>("quests");

  if (!tracker.mounted) {
    return (
      <main className="min-h-screen bg-cave flex items-center justify-center">
        <div className="text-stone-500 text-sm">Carregando...</div>
      </main>
    );
  }

  const { totalMain, arenaWins, totalSecondary, resetDay } = tracker;

  const handleReset = () => {
    if (confirm("Resetar o dia? Head Hunting e Immaturity Angel NÃO serão resetados.")) {
      resetDay();
    }
  };

  return (
    <main className="min-h-screen bg-cave text-stone-200">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center pb-5 mb-5 border-b border-rune">
          <h1 className="text-xl font-medium text-yellow-500 tracking-[3px] uppercase">
            ⚔ Event Quest Tracker
          </h1>
          <p className="text-[11px] text-stone-500 mt-1 tracking-wider">
            Registre suas entregas e desafios do dia
          </p>
        </div>

        {/* Summary */}
        <SummaryBar
          totalMain={totalMain}
          arenaWins={arenaWins}
          totalSecondary={totalSecondary}
        />

        {/* Tabs */}
        <div className="flex gap-1 mb-4 border-b border-rune">
          {(["quests", "loki"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-xs font-medium tracking-wider uppercase rounded-t-md border border-b-0 transition-colors -mb-px ${
                tab === t
                  ? "border-rune bg-cave-card text-yellow-500"
                  : "border-transparent text-stone-500 hover:text-stone-300"
              }`}
            >
              {t === "quests" ? "Quests" : "Loki Challenges"}
            </button>
          ))}
        </div>

        {/* Quest Tab */}
        {tab === "quests" && (
          <div>
            <SectionHeader dot="bg-arena" label="Arena" />
            <ArenaSection tracker={tracker} />

            <SectionHeader dot="bg-yellow-600" label="Main" />
            <MainSection tracker={tracker} />

            <SectionHeader dot="bg-teal-600" label="Secondary" />
            <SecondarySection tracker={tracker} />
          </div>
        )}

        {/* Loki Tab */}
        {tab === "loki" && (
          <div>
            <SectionHeader dot="bg-loki" label="Loki Challenges" />
            <LokiSection tracker={tracker} />
          </div>
        )}

        {/* Reset */}
        <div className="mt-6 text-center">
          <button
            onClick={handleReset}
            className="px-6 py-2 rounded-md border border-red-900/40 bg-red-950/20 text-red-400 text-xs tracking-wide hover:bg-red-950/40 transition-colors"
          >
            ↺ Resetar dia
          </button>
          <p className="text-[10px] text-stone-600 mt-1.5">
            Head Hunting não reseta (progresso permanente)
          </p>
        </div>
      </div>
    </main>
  );
}
