import { StyleSheet, View, ViewProps } from "react-native";

import { ComponentProps, FC } from "react";

import { BaseTheme, VariantProps, createRestyleComponent, createVariant } from "@shopify/restyle";

import { breakpoints } from "../../config";
import { ChuzTheme } from "../../types";

const themeKey = "dividerVariants";

export const dividerVariants: Partial<BaseTheme> = {
  defaults: {
    alignSelf: "center",
    borderTopWidth: 2,
    borderTopColor: "divider_color",
    marginTop: "xs",
    width: "100%",
  },
};

const Styled = createRestyleComponent<
  VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof View>,
  ChuzTheme
>([createVariant({ themeKey, defaults: dividerVariants.defaults })], View);

export const Divider: FC<ViewProps> = (props) => {
  return <Styled {...props} style={dividerStyles.wrapper} />;
};

export const dividerStyles = StyleSheet.create({
  wrapper: {
    maxWidth: breakpoints.desktop,
  },
});
