interface SummaryBarProps {
  totalMain: number;
  arenaWins: number;
  totalSecondary: number;
}

export function SummaryBar({ totalMain, arenaWins, totalSecondary }: SummaryBarProps) {
  const cards = [
    {
      label: "Quests Main",
      value: `${totalMain} / 12`,
      danger: totalMain >= 12,
      warn: totalMain >= 10,
    },
    {
      label: "Vitórias Arena",
      value: `${arenaWins} / 5`,
      danger: arenaWins >= 5,
      warn: arenaWins >= 4,
    },
    {
      label: "Secondary",
      value: String(totalSecondary),
      danger: false,
      warn: false,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="bg-cave-card border border-rune rounded-lg px-3 py-2.5 text-center"
        >
          <div
            className={`text-xl font-medium leading-none ${
              c.danger ? "text-red-400" : "text-yellow-500"
            }`}
          >
            {c.value}
          </div>
          <div className="text-[10px] text-stone-500 mt-1 uppercase tracking-wide">
            {c.label}
          </div>
        </div>
      ))}
    </div>
  );
}
