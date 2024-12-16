import { View, ViewProps } from "react-native";

import { ComponentProps, FC } from "react";

import { BaseTheme, VariantProps, createRestyleComponent, createVariant } from "@shopify/restyle";
import { ChuzTheme } from "../../types";
import { breakpoints } from "../../config";

const themeKey = "columnsVariants";

export const columnsVariants: Partial<BaseTheme> = {
  defaults: {
    alignSelf: "center",
    gap: "l",
    flex: 10,
    flexDirection: {
      mobile: "column",
      tablet: "row",
      desktop: "row",
    },
    flexWrap: "wrap",
    maxWidth: breakpoints.desktop,
    justifyContent: "stretch",
    width: "100%",
  },
};

const Styled = createRestyleComponent<
  VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof View>,
  ChuzTheme
>([createVariant({ themeKey, defaults: columnsVariants.defaults })], View);

interface Props extends ViewProps {
  variant?: "defaults";
}

export const Columns: FC<Props> = ({ children, ...props }) => {
  return <Styled {...props}>{children}</Styled>;
};
