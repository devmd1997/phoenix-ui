import type { AtLeastOne } from "../utlis/helpers";
import type { Breakpoint } from "./breakpoint.types";

export type Space = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

export const SPACE_TO_NUM: Record<Exclude<Space, "none">, "1"|"2"|"3"|"4"|"6"|"8"|"12"|"16"> = {
  xs: "1",
  sm: "2",
  md: "4",
  lg: "6",
  xl: "8",
  "2xl": "12",
  "3xl": "16",
};


export type AxisSpace = | Space | {
    all?: Space;
    x?: Space;
    y?: Space;
    t?: Space;
    r?: Space;
    b?: Space;
    l?: Space;
}

export type SpacingSpec = {
    m?: AxisSpace;
    p?: AxisSpace;
}

export type SpacingOnly = AtLeastOne<SpacingSpec>;
export type ResponsiveMap = Partial<Record<Breakpoint, SpacingOnly>>;


export type ResponsiveSpacing = AtLeastOne<ResponsiveMap>;

export const M_ALL: Record<Space, string> = {
  none: "ui:m-0",
  xs: "ui:m-1",
  sm: "ui:m-2",
  md: "ui:m-4",
  lg: "ui:m-6",
  xl: "ui:m-8",
  "2xl": "ui:m-12",
  "3xl": "ui:m-16"
};

export const MX: Record<Space, string> = {
  none: "ui:mx-0",
  xs: "ui:mx-1",
  sm: "ui:mx-2",
  md: "ui:mx-4",
  lg: "ui:mx-6",
  xl: "ui:mx-8",
  "2xl": "ui:mx-12",
  "3xl": "ui:mx-16"
};

export const MY: Record<Space, string> = {
  none: "ui:my-0",
  xs: "ui:my-1",
  sm: "ui:my-2",
  md: "ui:my-4",
  lg: "ui:my-6",
  xl: "ui:my-8",
  "2xl": "ui:my-12",
  "3xl": "ui:my-16"
};

export const MT: Record<Space, string> = { none:"ui:mt-0", xs:"ui:mt-1", sm:"ui:mt-2", md:"ui:mt-4", lg:"ui:mt-6", xl:"ui:mt-8", "2xl":"ui:mt-12", "3xl": "ui:mt-16"};
export const MR: Record<Space, string> = { none:"ui:mr-0", xs:"ui:mr-1", sm:"ui:mr-2", md:"ui:mr-4", lg:"ui:mr-6", xl:"ui:mr-8", "2xl":"ui:mr-12", "3xl": "ui:mr-16"};
export const MB: Record<Space, string> = { none:"ui:mb-0", xs:"ui:mb-1", sm:"ui:mb-2", md:"ui:mb-4", lg:"ui:mb-6", xl:"ui:mb-8", "2xl":"ui:mb-12", "3xl": "ui:mb-16"};
export const ML: Record<Space, string> = { none:"ui:ml-0", xs:"ui:ml-1", sm:"ui:ml-2", md:"ui:ml-4", lg:"ui:ml-6", xl:"ui:ml-8", "2xl":"ui:ml-12", "3xl": "ui:ml-16"};

export const P_ALL: Record<Space, string> = { none:"ui:p-0", xs:"ui:p-1", sm:"ui:p-2", md:"ui:p-4", lg:"ui:p-6", xl:"ui:p-8", "2xl":"ui:p-12", "3xl": "ui:p-16"};
export const PX: Record<Space, string> = { none:"ui:px-0", xs:"ui:px-1", sm:"ui:px-2", md:"ui:px-4", lg:"ui:px-6", xl:"ui:px-8", "2xl":"ui:px-12", "3xl": "ui:px-16"};
export const PY: Record<Space, string> = { none:"ui:py-0", xs:"ui:py-1", sm:"ui:py-2", md:"ui:py-4", lg:"ui:py-6", xl:"ui:py-8", "2xl":"ui:py-12", "3xl": "ui:py-16"};
export const PT: Record<Space, string> = { none:"ui:pt-0", xs:"ui:pt-1", sm:"ui:pt-2", md:"ui:pt-4", lg:"ui:pt-6", xl:"ui:pt-8", "2xl":"ui:pt-12", "3xl": "ui:pt-16"};
export const PR: Record<Space, string> = { none:"ui:pr-0", xs:"ui:pr-1", sm:"ui:pr-2", md:"ui:pr-4", lg:"ui:pr-6", xl:"ui:pr-8", "2xl":"ui:pr-12", "3xl": "ui:pr-16"};
export const PB: Record<Space, string> = { none:"ui:pb-0", xs:"ui:pb-1", sm:"ui:pb-2", md:"ui:pb-4", lg:"ui:pb-6", xl:"ui:pb-8", "2xl":"ui:pb-12", "3xl": "ui:pb-16"};
export const PL: Record<Space, string> = { none:"ui:pl-0", xs:"ui:pl-1", sm:"ui:pl-2", md:"ui:pl-4", lg:"ui:pl-6", xl:"ui:pl-8", "2xl":"ui:pl-12", "3xl": "ui:pl-16"};


