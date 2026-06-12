interface SummaryBarProps {
  totalMain: number;
  totalArenaWins: number;
  totalSecondary: number;
}

export function SummaryBar({ totalMain, totalArenaWins, totalSecondary }: SummaryBarProps) {
  const cards = [
    { label: "Quests Main", value: `${totalMain} / 12`, danger: totalMain >= 12 },
    { label: "Vitórias Arena", value: `${totalArenaWins} / 5`, danger: totalArenaWins >= 5 },
    { label: "Secondary", value: String(totalSecondary), danger: false },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      {cards.map((c) => (
        <div key={c.label} className="bg-cave-card border border-rune rounded-lg px-3 py-2.5 text-center">
          <div className={`text-xl font-medium leading-none ${c.danger ? "text-red-400" : "text-yellow-500"}`}>
            {c.value}
          </div>
          <div className="text-[10px] text-stone-500 mt-1 uppercase tracking-wide">{c.label}</div>
        </div>
      ))}
    </div>
  );
}
