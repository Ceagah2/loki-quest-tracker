/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cave: {
          DEFAULT: "#0F0D0A",
          card: "#1A1612",
          card2: "#231F19",
        },
        rune: {
          DEFAULT: "#3A3020",
          border: "rgba(201,168,76,0.3)",
        },
        gold: {
          DEFAULT: "#C9A84C",
          dim: "#8A6A2A",
          pale: "#F5E6C0",
        },
        arena: "#8B5CF6",
        loki: "#2DD4BF",
      },
    },
  },
  plugins: [],
};
