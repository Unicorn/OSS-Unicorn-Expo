import { Text } from "react-native";

import { ComponentProps, FC } from "react";

import { BaseTheme, VariantProps, createRestyleComponent, createVariant } from "@shopify/restyle";

import { ChuzTheme } from "../../types";

const themeKey = "navTextVariants";

export const navTextVariants: Partial<BaseTheme> = {
  defaults: {
    color: "navItem_normal",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 1,
  },
  hovered: {
    color: "navItem_hovered",
  },
  active: {
    color: "navItem_active",
  },
};

const Styled = createRestyleComponent<
  VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof Text>,
  ChuzTheme
>([createVariant({ themeKey, defaults: navTextVariants.defaults })], Text);

interface Props {
  label: string;
  variant?: "defaults" | "hovered" | "active";
}

export const NavText: FC<Props> = ({ label, variant }) => {
  return <Styled variant={variant}>{label}</Styled>;
};
