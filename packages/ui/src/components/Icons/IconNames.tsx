// packages/ui/src/components/Icons/lia-icons.ts
import type { IconType } from "react-icons";
import {
  LiaHomeSolid,
  LiaUserSolid,
  LiaSearchSolid,
  LiaBellSolid,
  LiaPlusSolid,
  LiaMinusSolid,
  LiaAngleDownSolid,
  LiaAngleUpSolid,
  LiaAngleRightSolid,
  LiaAngleLeftSolid,
  LiaCheckSolid,
  LiaTimesSolid,
} from "react-icons/lia";
import type { IconVariant } from "./Icon";

export const LIA_ICONS = {
  home: LiaHomeSolid,
  user: LiaUserSolid,
  search: LiaSearchSolid,
  bell: LiaBellSolid,
  plus: LiaPlusSolid,
  minus: LiaMinusSolid,
  angleDown: LiaAngleDownSolid,
  angleUp: LiaAngleUpSolid,
  angleRight: LiaAngleRightSolid,
  angleLeft: LiaAngleLeftSolid,
  checkmark: LiaCheckSolid,
  close: LiaTimesSolid,
} satisfies Record<string, IconType>;

export type IconName = keyof typeof LIA_ICONS;

export function getIconByName(icon: IconVariant): IconType {
  if (typeof icon === "string" && icon in LIA_ICONS) {
    return LIA_ICONS[icon];
  } else {
    return icon as IconType;
  }
}
