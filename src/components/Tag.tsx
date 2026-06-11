import type { TagType } from "@/types";

const TAG_STYLES: Record<TagType, string> = {
  pvp: "bg-red-900/30 text-red-400 border border-red-800/40",
  pve: "bg-green-900/30 text-green-400 border border-green-800/40",
  drop: "bg-yellow-900/20 text-yellow-500 border border-yellow-800/30",
  misc: "bg-teal-900/20 text-teal-400 border border-teal-800/30",
};

export function Tag({ type }: { type: TagType }) {
  return (
    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${TAG_STYLES[type]}`}>
      {type.toUpperCase()}
    </span>
  );
}
