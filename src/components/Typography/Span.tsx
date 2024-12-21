import { Text, TextProps } from "react-native";

import { ComponentProps, FC } from "react";

import { BaseTheme, VariantProps, createRestyleComponent, createVariant } from "@shopify/restyle";

import { ChuzTheme } from "../../types";

const themeKey = "spanVariants";

export const spanVariants: Partial<BaseTheme> = {
  defaults: {
    color: "text_color",
    fontSize: {
      mobile: 16,
      tablet: 20,
      desktop: 22,
    },
    lineHeight: {
      mobile: 24,
      tablet: 24,
      desktop: 32,
    },
  },
};

const Styled = createRestyleComponent<
  VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof Text>,
  ChuzTheme
>([createVariant({ themeKey, defaults: spanVariants.defaults })], Text);

interface Props extends TextProps {
  variant?: "defaults";
}

export const Span: FC<Props> = ({ children, ...props }) => {
  return <Styled {...props}>{children}</Styled>;
};
