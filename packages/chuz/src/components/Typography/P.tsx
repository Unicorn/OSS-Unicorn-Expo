import { StyleSheet, Text, TextProps } from "react-native";

import { ComponentProps, FC } from "react";

import { BaseTheme, VariantProps, createRestyleComponent, createVariant } from "@shopify/restyle";

import { ChuzTheme } from "../../types";

const themeKey = "pVariants";

export const pVariants: Partial<BaseTheme> = {
  defaults: {
    color: "text_color",
    fontSize: 18,
    lineHeight: 24,
    position: "relative",
    zIndex: 5,
  },
  small: {
    fontSize: 16,
    lineHeight: 22,
  },
  large: {
    fontSize: 22,
    lineHeight: 32,
  },
};

const Styled = createRestyleComponent<
  VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof Text>,
  ChuzTheme
>([createVariant({ themeKey, defaults: pVariants.defaults })], Text);

interface Props extends TextProps {
  variant?: "defaults" | "small" | "large";
}

export const P: FC<Props> = ({ children, ...props }) => {
  return <Styled {...props}>{children}</Styled>;
};

export const pStyles = StyleSheet.create({});
