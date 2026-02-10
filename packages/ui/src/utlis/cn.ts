import {clsx, type ClassValue} from "clsx"
import { customTwMerge } from "./tailwindMerge";

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs))
}