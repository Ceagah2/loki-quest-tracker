interface SummaryBarProps {
  totalMain: number;
  totalArenaWins: number;
  totalSecondary: number;
  totalQuestScore: number;
}

export function SummaryBar({ totalMain, totalArenaWins, totalSecondary, totalQuestScore }: SummaryBarProps) {
  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {/* Score Quest — destaque */}
      <div className="col-span-2 bg-cave-card border border-yellow-800/40 rounded-lg px-4 py-3 flex items-center justify-between">
        <div>
          <div className="text-[10px] text-stone-500 uppercase tracking-widest mb-0.5">Score Quest do Dia</div>
          <div className="text-3xl font-medium text-yellow-400 leading-none">{totalQuestScore}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-stone-600 uppercase tracking-wide">pontos acumulados</div>
          <div className="flex gap-1 mt-1.5 justify-end">
            {[1,2,3].map(v => (
              <span key={v} className="text-[10px] px-1.5 py-0.5 rounded bg-stone-800/60 border border-stone-700/30 text-stone-500">
                {v === 1 ? "I" : v === 2 ? "II" : "III"} = {v}pt
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary cards */}
      {[
        { label: "Quests Main", value: `${totalMain} / 12`, danger: totalMain >= 12 },
        { label: "Vitórias Arena", value: `${totalArenaWins} / 5`, danger: totalArenaWins >= 5 },
        { label: "Secondary", value: String(totalSecondary), danger: false },
      ].map((c) => (
        <div key={c.label} className={`bg-cave-card border rounded-lg px-3 py-2.5 text-center ${c.danger ? "border-red-900/40" : "border-rune"}`}>
          <div className={`text-xl font-medium leading-none ${c.danger ? "text-red-400" : "text-yellow-500"}`}>
            {c.value}
          </div>
          <div className="text-[10px] text-stone-500 mt-1 uppercase tracking-wide">{c.label}</div>
        </div>
      ))}
    </div>
  );
}
