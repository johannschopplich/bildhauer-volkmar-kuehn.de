import type { Theme } from "@unocss/preset-wind";
import { defineConfig, presetWind } from "unocss";
import { rules } from "./src/unocss";

export default defineConfig<Theme>({
  cli: {
    entry: {
      patterns: ["site/{snippets,templates}/**/*"],
      outFile: "src/styles/uno.css",
    },
  },
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
      link: {
        DEFAULT: "var(--un-color-link)",
        hover: "var(--un-color-link-hover)",
      },
      theme: {
        base: "var(--un-color-text)",
        background: "var(--un-color-background)",
      },
      contrast: {
        lowest: "var(--un-color-contrast-lowest)",
        lower: "var(--un-color-contrast-lower)",
        low: "var(--un-color-contrast-low)",
        medium: "var(--un-color-contrast-medium)",
        high: "var(--un-color-contrast-high)",
        higher: "var(--un-color-contrast-higher)",
      },
    },
    borderRadius: {
      DEFAULT: "0.125rem",
    },
    fontSize: {
      xs: ["0.75rem", "var(--un-line-height-normal)"],
      sm: ["0.875rem", "var(--un-line-height-normal)"],
      base: ["1rem", "var(--un-line-height-normal)"],
      lg: ["var(--un-text-lg)", "var(--un-line-height-heading)"],
      xl: ["var(--un-text-xl)", "var(--un-line-height-heading)"],
      "2xl": ["var(--un-text-2xl)", "var(--un-line-height-heading)"],
      "3xl": ["var(--un-text-3xl)", "var(--un-line-height-heading)"],
      "4xl": ["var(--un-text-4xl)", "var(--un-line-height-heading)"],
    },
    fontFamily: {
      normal: "var(--un-font-family-normal)",
      heading: "var(--un-font-family-heading)",
    },
    lineHeight: {
      normal: "var(--un-line-height-normal)",
      heading: "var(--un-line-height-heading)",
    },
  },

  rules: [
    ...rules,
    [
      /^column-count-(\d+)$/,
      ([, d], { theme }) => ({
        "column-count": d,
        "column-gap": theme.spacing?.["4xl"],
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

  shortcuts: {
    "masonry-grid":
      "grid grid-cols-[repeat(auto-fit,minmax(min(var(--masonry-col-max-w,25rem),100%),1fr))] justify-center children:self-start", // grid-rows-[masonry]
  },

  presets: [presetWind()],
});
