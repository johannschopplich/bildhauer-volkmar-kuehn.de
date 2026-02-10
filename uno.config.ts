import type { Theme } from "@unocss/preset-wind4";
import {
  defineConfig,
  presetIcons,
  presetWind4,
  transformerDirectives,
} from "unocss";

export default defineConfig<Theme>({
  cli: {
    entry: {
      patterns: ["site/{snippets,templates}/**/*"],
      outFile: "src/styles/uno.css",
    },
  },
  theme: {
    colors: {
      primary: {
        DEFAULT: "var(--un-color-primary)",
        50: "var(--un-color-primary-50)",
        100: "var(--un-color-primary-100)",
        200: "var(--un-color-primary-200)",
        300: "var(--un-color-primary-300)",
        400: "var(--un-color-primary-400)",
        500: "var(--un-color-primary-500)",
        600: "var(--un-color-primary-600)",
        700: "var(--un-color-primary-700)",
        800: "var(--un-color-primary-800)",
        900: "var(--un-color-primary-900)",
      },
      accent: {
        DEFAULT: "var(--un-color-accent)",
        50: "var(--un-color-accent-50)",
        100: "var(--un-color-accent-100)",
        200: "var(--un-color-accent-200)",
        300: "var(--un-color-accent-300)",
        400: "var(--un-color-accent-400)",
        500: "var(--un-color-accent-500)",
        600: "var(--un-color-accent-600)",
        700: "var(--un-color-accent-700)",
        800: "var(--un-color-accent-800)",
        900: "var(--un-color-accent-900)",
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
        soft: "var(--un-color-contrast-soft)",
        medium: "var(--un-color-contrast-medium)",
        high: "var(--un-color-contrast-high)",
        higher: "var(--un-color-contrast-higher)",
      },
    },
    radius: {
      DEFAULT: "0.125rem",
    },
    text: {
      xs: { fontSize: "0.75rem", lineHeight: "var(--un-line-height-normal)" },
      sm: { fontSize: "0.875rem", lineHeight: "var(--un-line-height-normal)" },
      base: { fontSize: "1rem", lineHeight: "var(--un-line-height-normal)" },
      lg: {
        fontSize: "var(--un-text-lg)",
        lineHeight: "var(--un-line-height-heading)",
      },
      xl: {
        fontSize: "var(--un-text-xl)",
        lineHeight: "var(--un-line-height-heading)",
      },
      "2xl": {
        fontSize: "var(--un-text-2xl)",
        lineHeight: "var(--un-line-height-heading)",
      },
      "3xl": {
        fontSize: "var(--un-text-3xl)",
        lineHeight: "var(--un-line-height-heading)",
      },
      "4xl": {
        fontSize: "var(--un-text-4xl)",
        lineHeight: "var(--un-line-height-heading)",
      },
    },
    font: {
      normal: "var(--un-font-family-normal)",
      heading: "var(--un-font-family-heading)",
    },
    leading: {
      normal: "var(--un-line-height-normal)",
      heading: "var(--un-line-height-heading)",
    },
    container: {
      prose: "60ch",
    },
  },
  rules: [
    [
      "hyphenate",
      {
        "overflow-wrap": "break-word",

        "-webkit-hyphens": "auto",
        "-webkit-hyphenate-limit-before": "4",
        "-webkit-hyphenate-limit-after": "4",
        "-webkit-hyphenate-limit-chars": "8 4 4",
        "-webkit-hyphenate-limit-lines": "2",
        "-webkit-hyphenate-limit-last": "always",
        "-webkit-hyphenate-limit-zone": "10%",

        hyphens: "auto",
        "hyphenate-limit-chars": "8 4 4",
        "hyphenate-limit-lines": "2",
        "hyphenate-limit-last": "always",
        "hyphenate-limit-zone": "10%",
      },
    ],
    [
      "animate-scale",
      {
        transform:
          "translateY(calc(1rem * var(--scrollY, 0))) scale(calc(1 + var(--scrollY, 0) * 0.05))",
      },
    ],
  ],
  safelist: ["sr-only", "invisible"],
  outputToCssLayers: true,
  transformers: [transformerDirectives()],
  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        height: "1.25em",
        width: "1.25em",
        "vertical-align": "text-bottom",
      },
    }),
  ],
});
