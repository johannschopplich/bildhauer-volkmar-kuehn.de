import { defineConfig, presetWind } from "unocss";
import { presetDue } from "duecss";

export default defineConfig({
  theme: {
    colors: {
      primary: {
        DEFAULT: "#A2553F",
        50: "#EED9D3",
        100: "#E8CDC5",
        200: "#DDB3A7",
        300: "#D19A8A",
        400: "#C6806D",
        500: "#BB674F",
        600: "#A2553F",
        700: "#7A402F",
        800: "#512B20",
        900: "#291510",
      },
      accent: {
        DEFAULT: "#5F5341",
        50: "#EDEAE5",
        100: "#E5E0D9",
        200: "#D4CCC1",
        300: "#C4B9A8",
        400: "#B3A590",
        500: "#A39178",
        600: "#8F7D62",
        700: "#776852",
        800: "#5F5341",
        900: "#3E362A",
      },
    },
  },

  rules: [
    [
      /^column-count-(\d+)$/,
      ([, d]) => ({ "column-count": d, "column-gap": "var(--du-space-m)" }),
    ],
    [
      "animate-scale",
      { transform: "scale(calc(1 + var(--scrollY, 0) * 0.05))" },
    ],
  ],

  presets: [presetWind(), presetDue()],
});
