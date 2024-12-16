import { createRestyleComponent, VariantProps, createVariant, BaseTheme, useTheme } from "@shopify/restyle";
import { useState, useRef, FC, ComponentProps, ReactNode, useEffect } from "react";
import { View, StyleSheet, ScrollView, Animated, Pressable, TouchableWithoutFeedback } from "react-native";
import { randomUUID } from "expo-crypto";
import { isEqual } from "lodash";

import { ChuzTheme, SelectOption } from "../../types";
import { Button } from "../Button";
import { FeatureProps, withFeatures } from "../Base";
import { selectStyles } from "./Select";
import { toggleItemInArray, isNativeDriver } from "../../helpers";
import { spacing } from "../../config";

const themeKey = "multiSelectVariants";

const stubbedOptions = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

export const multiSelectVariants: Partial<BaseTheme> = {
  defaults: {
    position: "relative",
    zIndex: 900,
  },
};

const Styled = createRestyleComponent<
  VariantProps<ChuzTheme, typeof themeKey> & ComponentProps<typeof View>,
  ChuzTheme
>([createVariant({ themeKey, defaults: multiSelectVariants.defaults })], View);
interface Props extends FeatureProps {
  label: ReactNode;
  options?: SelectOption[];
  selected?: SelectOption[];
  onSelect?: (option: SelectOption) => void;
  onChange?: (options: SelectOption[]) => void;
}

export const MultiSelectBase: FC<Props> = ({
  label,
  style,
  options = stubbedOptions,
  selected,
  onSelect,
  onChange,
  ...props
}) => {
  const { colors } = useTheme();
  const [opened, setOpened] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>(selected ?? options ?? []);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    onChange && onChange(selectedOptions);
  }, [selectedOptions]);

  const toggleDropdown = () => {
    const toValue = opened ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 500,
      useNativeDriver: isNativeDriver(),
    }).start();
    setOpened(!opened);
  };

  const selectHandler = (option: SelectOption) => {
    setSelectedOptions((prev) => toggleItemInArray(option, prev));

    onSelect && onSelect(option);
  };

  const renderLabel = () => {
    if (typeof label === "string") {
      return (
        <Button icon="keyboard-double-arrow-down" onPress={toggleDropdown} active={opened}>
          {label}
        </Button>
      );
    }
    return label;
  };

  return (
    <Styled {...props}>
      <>
        {renderLabel()}
        {opened && (
          <Animated.View
            style={[
              style,
              selectStyles.list,
              {
                opacity: animation,
                backgroundColor: colors.field_select_menu_background,
                marginTop: spacing.s,
              },
            ]}
          >
            <ScrollView style={{ borderRadius: style["borderRadius"] }}>
              {options.map((item) => (
                <Button
                  key={randomUUID()}
                  active={selectedOptions.findIndex((s) => isEqual(s, item)) !== -1}
                  variant="select"
                  onPress={() => selectHandler(item)}
                >
                  {item.label}
                </Button>
              ))}
            </ScrollView>
          </Animated.View>
        )}
      </>
    </Styled>
  );
};

export const MultiSelect = withFeatures(MultiSelectBase);
