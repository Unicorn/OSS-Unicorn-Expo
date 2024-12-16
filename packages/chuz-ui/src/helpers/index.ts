import { Platform } from "react-native";
import Svg, { Path } from "react-native-svg";
import { isEqual } from "lodash";

export { PathPatched } from "./PatchedPath";

export const itemInArray = <T>(item: T, items: T[]): boolean => {
  return items.findIndex((s) => isEqual(s, item)) !== -1;
};

export const toggleItemInArray = <T>(item: T, items: T[]): T[] => {
  const found = items.findIndex((s) => isEqual(s, item));

  if (found !== -1) {
    return items.filter((_, index) => index !== found);
  } else {
    return [...items, item];
  }
};

export const isNativeDriver = () => {
  return Platform.OS !== "web";
};
