import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Event Quest Tracker",
  description: "Track your daily event quests and Loki Challenges",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
