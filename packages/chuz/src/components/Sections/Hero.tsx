import { ImageBackground, ImageProps, StyleSheet, View } from "react-native";

import { ComponentProps, FC, ReactNode } from "react";

import { BaseTheme, VariantProps, createRestyleComponent, createVariant } from "@shopify/restyle";

import { Overlay } from "../Visual/Overlay";
import { ChuzTheme } from "../../types";
import { responsiveDimensions } from "../../hooks/useResponsive";

const themeKey = "heroVariants";

export const heroVariants: Partial<BaseTheme> = {
  defaults: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  fullscreen: {
    margin: 0,
    minHeight: {
      mobile: responsiveDimensions().height - 150,
      tablet: "100dvh",
      desktop: "100dvh",
    },
    width: "100%",
  },
};

const Styled = createRestyleComponent<
  VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof View>,
  ChuzTheme
>([createVariant({ themeKey, defaults: heroVariants.defaults })], View);

interface Props {
  body?: string;
  children?: ReactNode;
  variant?: "defaults" | "fullscreen";
  imageProps?: ImageProps;
}

export const Hero: FC<Props> = ({ children, variant, imageProps }) => {
  return (
    <Styled variant={variant}>
      <ImageBackground {...imageProps} style={heroStyles.background}>
        <Overlay />
        {children}
      </ImageBackground>
    </Styled>
  );
};

export const heroStyles = StyleSheet.create({
  background: {
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    minHeight: 500,
    position: "relative",
    width: "100%",
  },
});
