import type { ReactNode } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import type { ViewStyle, StyleProp, TextStyle } from "react-native";

import { Content } from "./Content";
import { Header } from "../Typography";

export interface TabItem {
  key: string;
  label: string;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  title?: string;
  style?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  activeTabStyle?: StyleProp<ViewStyle>;
  tabTextStyle?: StyleProp<TextStyle>;
  activeTabTextStyle?: StyleProp<TextStyle>;
}

export const Tabs = ({
  tabs,
  activeTab,
  onTabChange,
  title,
  tabStyle,
  activeTabStyle,
  tabTextStyle,
  activeTabTextStyle,
}: TabsProps) => {


  return (
    <Content variant="minimal">
      {title && <Header style={styles.titleText}>{title}</Header>}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.key}
            style={[
              styles.tabButton,
              tabStyle,
              activeTab === tab.key && styles.activeTab,
              activeTab === tab.key && activeTabStyle,
            ]}
            onPress={() => onTabChange(tab.key)}
          >
            {tab.icon}
            <Header
              style={[
                styles.tabText,
                tabTextStyle,
                activeTab === tab.key && styles.activeTabText,
                activeTab === tab.key && activeTabTextStyle,
              ]}
            >
              {tab.label}
            </Header>
          </Pressable>
        ))}
      </View>
    </Content>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  tabContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: 'primary',
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: 'primary',
    fontWeight: "bold",
  },
});