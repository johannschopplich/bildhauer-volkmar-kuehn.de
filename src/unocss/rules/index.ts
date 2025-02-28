import type { Rule } from "@unocss/core";
import type { Theme } from "@unocss/preset-mini";
import { hyphenate } from "./hyphenate";
import { varColor } from "./var-color";

export const rules: Rule<Theme>[] = [hyphenate, varColor].flat(1);
