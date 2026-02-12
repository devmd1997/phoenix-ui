import type { Breakpoint, ResponsiveProp } from "../types/breakpoint.types";
import { M_ALL, MB, ML, MR, MT, MX, MY, P_ALL, PB, PL, PR, PT, PX, PY, type AxisSpace } from "../types/spacing.types";

const BP_Prefix: Record<Breakpoint, string> = {
    sm: "sm:",
    md: "md:",
    lg: "lg:",
}

/**
 * Applies responsive prefixes to a map of classes keyed by breakpoint.
 * Each breakpoint value can be a single class or an array of classes.
 */
export function responsiveClass(
  value: ResponsiveProp<string | string[]> | undefined
): string {
  if (!value) return "";

  const prefixed = (bp: Breakpoint, cls: string) => `${BP_Prefix[bp]}${cls}`;

  return (Object.keys(value) as Breakpoint[])
    .map((bp) => {
      const cls = value[bp];
      if (Array.isArray(cls)) {
        return cls.map((item) => prefixed(bp, item)).join(" ");
      }
      return cls ? prefixed(bp, cls) : "";
    })
    .filter(Boolean)
    .join(" ");
}

export function axisSpaceToClasses(
  kind: "m" | "p",
  value: AxisSpace | undefined,
  bp?: Breakpoint
): string[] {
  if (!value) return [];
  const pre = bp ? BP_Prefix[bp] : '';

  // If string => apply to all
  if (typeof value === "string") {
    const cls = kind === "m" ? M_ALL[value] : P_ALL[value];
    return cls ? [pre + cls] : [];
  }

  // Object spec
  const out: string[] = [];
  const all = value.all;
  if (all) out.push(pre + (kind === "m" ? M_ALL[all] : P_ALL[all]));

  if (value.x) out.push(pre + (kind === "m" ? MX[value.x] : PX[value.x]));
  if (value.y) out.push(pre + (kind === "m" ? MY[value.y] : PY[value.y]));

  if (value.t) out.push(pre + (kind === "m" ? MT[value.t] : PT[value.t]));
  if (value.r) out.push(pre + (kind === "m" ? MR[value.r] : PR[value.r]));
  if (value.b) out.push(pre + (kind === "m" ? MB[value.b] : PB[value.b]));
  if (value.l) out.push(pre + (kind === "m" ? ML[value.l] : PL[value.l]));

  return out.filter(Boolean);
}
