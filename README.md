# Event Quest Tracker

Tracker de quests para evento de jogo. Todo o estado é salvo localmente no `localStorage`.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- sem banco de dados, sem backend

## Instalação

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura

```
src/
├── app/
│   ├── page.tsx          # Página principal
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Estilos globais
├── components/
│   ├── QuestCard.tsx     # Card colapsável genérico
│   ├── Tag.tsx           # Badge de tipo (pvp/pve/drop/misc)
│   ├── SummaryBar.tsx    # Barra de totais (Main / Arena / Secondary)
│   ├── ArenaSection.tsx  # Royal Arena + Arena Tower (5 vitórias/dia)
│   ├── MainSection.tsx   # Quests Main (limite 12/dia, 1x por opção)
│   ├── SecondarySection  # Ancient Titan, HH, IA, Sleipnir, Treasure
│   ├── HeadHunting.tsx   # Mobs por tier (permanente, não reseta)
│   ├── ImmaturiyAngel.tsx# Ciclo upgrade +0→+9 → downgrade +9→+0
│   └── LokiSection.tsx   # Loki Challenges Tier I-V (sequencial)
├── hooks/
│   └── useTracker.ts     # Todo o estado e lógica
├── lib/
│   └── data.ts           # Dados estáticos das quests e Loki
└── types/
    └── index.ts          # Types TypeScript
```

## Regras implementadas

| Regra | Detalhe |
|---|---|
| Main — limite diário | 12 entregas/dia (cada opção I/II/III = 1) |
| Main — entrega única | Cada opção só pode ser entregue 1x por dia |
| Arena — vitórias | Máximo 5/dia somando Royal Arena + Arena Tower |
| Secondary | Ilimitado, sem contador diário |
| Head Hunting | Cada mob marcado 1x (permanente, não reseta) |
| Immaturity Angel | Ciclo upgrade (+0→+9) depois downgrade (+9→+0) |
| Loki Challenges | Tier I-V sequencial; sorteia 1 quest por tier/dia |

## Reset

O botão **Resetar dia** limpa Main, Arena e Secondary padrão.
Head Hunting e Immaturity Angel **não** são resetados (progresso permanente).
