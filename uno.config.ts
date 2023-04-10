import { defineConfig, presetWind } from "unocss";
import { presetForms } from "@julr/unocss-preset-forms";
import { presetDue } from "duecss";

export default defineConfig({
  theme: {
    maxWidth: {
      prose: "60ch",
    },
    colors: {
      primary: {
        DEFAULT: "#A39178",
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
      accent: {
        DEFAULT: "#3A445D",
        50: "#DEE2EB",
        100: "#D2D7E3",
        200: "#B9C0D3",
        300: "#A0AAC3",
        400: "#8693B4",
        500: "#6D7DA4",
        600: "#59698F",
        700: "#4A5676",
        800: "#3A445D",
        900: "#242B3A",
      },
      tertiary: {
        DEFAULT: "#BB674F",
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
    },
  },

  rules: [
    [
      /^column-count-(\d+)$/,
      ([, d], { theme }) => ({
        "column-count": d,
        // @ts-expect-error: missing type
        "column-gap": theme.spacing["4xl"],
      }),
    ],
    [
      "animate-scale",
      {
        transform:
          "translateY(calc(1rem * var(--scrollY, 0))) scale(calc(1 + var(--scrollY, 0) * 0.05))",
      },
    ],
  ],

  presets: [presetWind(), presetForms(), presetDue()],
});
