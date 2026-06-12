import type { QuestSchedule } from "@/types";

export function ScheduleBadge({ schedule }: { schedule: QuestSchedule }) {
  const isAny = schedule.window === "Qualquer hora";
  const isAllServers = schedule.server === "Todos";
  return (
    <div className="flex flex-wrap gap-1.5 mt-2.5 mb-1">
      <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-stone-800/60 border border-stone-700/40 text-stone-400">
        <span className="opacity-60">🖥</span>
        Servidor{" "}
        <span className={isAllServers ? "text-yellow-500" : "text-stone-200"}>
          {schedule.server}
        </span>
      </span>
      <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-stone-800/60 border border-stone-700/40 text-stone-400">
        <span className="opacity-60">🕐</span>
        <span className={isAny ? "text-stone-400" : "text-stone-200"}>
          {schedule.window}
        </span>
      </span>
    </div>
  );
}
