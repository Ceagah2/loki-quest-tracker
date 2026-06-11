"use client";

import { ReactNode } from "react";
import { Tag } from "./Tag";
import type { TagType } from "@/types";

interface QuestCardProps {
  id: string;
  name: string;
  tags: TagType[];
  isOpen: boolean;
  onToggle: () => void;
  badge?: ReactNode;
  children: ReactNode;
  accent?: string;
}

export function QuestCard({ name, tags, isOpen, onToggle, badge, children, accent }: QuestCardProps) {
  return (
    <div
      className={`rounded-lg border mb-2 overflow-hidden transition-colors ${
        accent
          ? accent
          : "bg-cave-card border-rune hover:border-rune-border"
      }`}
    >
      <button
        className="w-full flex items-center justify-between px-3.5 py-2.5 text-left cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-stone-200">{name}</span>
          <div className="flex gap-1 flex-wrap">
            {tags.map((t) => (
              <Tag key={t} type={t} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          {badge}
          <span
            className={`text-stone-600 text-sm transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▾
          </span>
        </div>
      </button>
      {isOpen && (
        <div className="px-3.5 pb-3 border-t border-rune">
          {children}
        </div>
      )}
    </div>
  );
}
