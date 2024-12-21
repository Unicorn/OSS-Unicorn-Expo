import { Text, TextStyle, Pressable, PressableProps, PressableStateCallbackType, ViewStyle } from "react-native";

import { ComponentProps, FC, Fragment, ReactNode } from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { BaseTheme, VariantProps, createRestyleComponent, createVariant, useTheme } from "@shopify/restyle";

import { ChuzTheme, PressableState, SizeOptions } from "../../types";
import { spacing, fontSizes } from "../../config";
import { LoadingIcon } from "../Icons/LoadingIcon";
import { withFeatures } from "../Base";

const themeKey = "buttonVariants";

export type ButtonVariants = "defaults" | "outlined" | "select";

export type ButtonTypes = "primary" | "secondary" | "neutral" | "select" | "green" | "red";

export const buttonVariants: Partial<BaseTheme> = {
  defaults: {
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: "xs",
    justifyContent: "center",
    width: "min-content",
  },
  outlined: {},
  select: {
    borderRadius: 0,
    justifyContent: "flex-start",
    width: "100%",
  },
};

const Styled = createRestyleComponent<
  VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof Pressable>,
  ChuzTheme
>([createVariant({ themeKey, defaults: buttonVariants.defaults })], Pressable);

export interface ButtonProps extends Partial<PressableProps> {
  variant?: ButtonVariants;
  type?: ButtonTypes;
  size?: SizeOptions;
  active?: boolean;
  loading?: boolean;
  icon?: keyof typeof MaterialIcons.glyphMap;
  label?: string;
  showIcon?: boolean;
  showLabel?: boolean;
  style?: ViewStyle; // Explicitly only allow object-based styles because we manage state conditions internally
}

export const ButtonBase: FC<ButtonProps> = ({
  variant,
  type = "neutral",
  size,
  active,
  loading,
  icon,
  label,
  children,
  showIcon = true,
  showLabel = true,
  style,
  ...props
}) => {
  const { colors } = useTheme();

  const getColorForState = (t: "background" | "text" | "border", state: PressableState): string => {
    const v = variant ?? "default";

    if (active) return colors[`button_${v}_${type}_${t}_active`];
    if (state.hovered || state.pressed) return colors[`button_${v}_${type}_${t}_hover`];

    return colors[`button_${v}_${type}_${t}_normal`];
  };

  const buttonStyle = (state: PressableState): ViewStyle => {
    const sx: ViewStyle = (style ?? {}) as ViewStyle;
    const s: ViewStyle = {
      borderColor: getColorForState("border", state),
      backgroundColor: getColorForState("background", state),
    };

    switch (size) {
      case "xxs":
        s["paddingHorizontal"] = spacing.xs;
        s["paddingVertical"] = spacing.xxs;
        break;
      case "xs":
        s["paddingHorizontal"] = spacing.s;
        s["paddingVertical"] = spacing.xxs;
        break;
      case "s":
        s["paddingHorizontal"] = spacing.m;
        s["paddingVertical"] = spacing.xs;
        break;
      case "m":
        s["paddingHorizontal"] = spacing.l;
        s["paddingVertical"] = spacing.s;
        break;
      case "l":
        s["paddingHorizontal"] = spacing.xl;
        s["paddingVertical"] = spacing.s;
        break;
      case "xl":
        s["paddingHorizontal"] = spacing.xl;
        s["paddingVertical"] = spacing.s;
        break;
      case "xxl":
        s["paddingHorizontal"] = spacing.xxl;
        s["paddingVertical"] = spacing.s;
        break;
      default:
        s["paddingHorizontal"] = spacing.m;
        s["paddingVertical"] = spacing.xs;
        break;
    }

    s["shadowOffset"] = { width: 0, height: 2 };
    s["shadowOpacity"] = 0.1;
    s["shadowRadius"] = 2;

    return { ...s, ...sx };
  };

  const buildTextStyle = (state: PressableStateCallbackType): TextStyle => {
    const s: TextStyle = { color: getColorForState("text", state) };

    s["fontSize"] = fontSizes[size];

    return s;
  };

  const renderLabel = (state: PressableState): ReactNode | null => {
    if (!showLabel) return null;

    if (label || typeof children === "string")
      return (
        <Text numberOfLines={1} style={buildTextStyle(state)}>
          {label ?? children?.toString()}
        </Text>
      );

    return children as ReactNode;
  };

  return (
    <Styled
      {...props}
      variant={variant}
      style={buttonStyle}
      children={(state) => {
        return (
          <Fragment>
            {loading && <LoadingIcon style={buildTextStyle(state)} />}
            {icon && showIcon && <MaterialIcons name={icon} style={buildTextStyle(state)} size={spacing[size] ?? 18} />}
            {renderLabel(state)}
          </Fragment>
        );
      }}
    ></Styled>
  );
};

export const Button = withFeatures(ButtonBase);
