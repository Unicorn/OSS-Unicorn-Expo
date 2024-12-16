import { palette } from "./palette";

export const colors = {
  /**
   * General
   */
  primary: palette.primary[500],
  primary_bold: palette.primary[600],
  primary_text_normal: palette.primary[500],
  primary_text_hover: palette.primary[900],
  secondary: palette.secondary[500],
  secondary_text_normal: palette.secondary[500],
  secondary_text_hover: palette.secondary[100],

  page_background: palette.neutral[50],
  overlay_background: palette.neutral[100],
  divider_color: palette.neutral[100],
  shadow_color: palette.neutral[900],
  surface: palette.neutral[0],

  link_color: palette.primary[500],
  link_hover: palette.primary[900],
  text_color: palette.neutral[900],

  /**
   * Buttons
   */
  segmentDivider_color: palette.primary[700],

  button_default_primary_border_normal: "transparent",
  button_default_primary_border_hover: "transparent",
  button_default_primary_border_active: "transparent",
  button_default_primary_background_normal: palette.primary[500],
  button_default_primary_background_hover: palette.primary[900],
  button_default_primary_background_active: palette.primary[900],
  button_default_primary_text_normal: palette.primary[900],
  button_default_primary_text_hover: palette.primary[100],
  button_default_primary_text_active: palette.primary[100],

  button_outlined_primary_border_normal: palette.primary[500],
  button_outlined_primary_border_hover: palette.primary[900],
  button_outlined_primary_border_active: palette.primary[900],
  button_outlined_primary_background_normal: "transparent",
  button_outlined_primary_background_hover: "transparent",
  button_outlined_primary_background_active: "transparent",
  button_outlined_primary_text_normal: palette.primary[500],
  button_outlined_primary_text_hover: palette.primary[900],
  button_outlined_primary_text_active: palette.primary[900],

  button_default_secondary_border_normal: "transparent",
  button_default_secondary_border_hover: "transparent",
  button_default_secondary_border_active: "transparent",
  button_default_secondary_background_normal: palette.secondary[500],
  button_default_secondary_background_hover: palette.secondary[900],
  button_default_secondary_background_active: palette.secondary[900],
  button_default_secondary_text_normal: palette.secondary[900],
  button_default_secondary_text_hover: palette.secondary[100],
  button_default_secondary_text_active: palette.secondary[100],

  button_outlined_secondary_border_normal: palette.secondary[500],
  button_outlined_secondary_border_hover: palette.secondary[900],
  button_outlined_secondary_border_active: palette.secondary[900],
  button_outlined_secondary_background_normal: "transparent",
  button_outlined_secondary_background_hover: "transparent",
  button_outlined_secondary_background_active: "transparent",
  button_outlined_secondary_text_normal: palette.secondary[500],
  button_outlined_secondary_text_hover: palette.secondary[900],
  button_outlined_secondary_text_active: palette.secondary[900],

  button_default_neutral_border_normal: "transparent",
  button_default_neutral_border_hover: "transparent",
  button_default_neutral_border_active: "transparent",
  button_default_neutral_background_normal: palette.neutral[0],
  button_default_neutral_background_hover: palette.neutral[300],
  button_default_neutral_background_active: palette.neutral[900],
  button_default_neutral_text_normal: palette.neutral[900],
  button_default_neutral_text_hover: palette.neutral[900],
  button_default_neutral_text_active: palette.neutral[0],

  button_outlined_neutral_border_normal: palette.neutral[500],
  button_outlined_neutral_border_hover: palette.neutral[900],
  button_outlined_neutral_border_active: palette.neutral[900],
  button_outlined_neutral_background_normal: "transparent",
  button_outlined_neutral_background_hover: "transparent",
  button_outlined_neutral_background_active: "transparent",
  button_outlined_neutral_text_normal: palette.neutral[500],
  button_outlined_neutral_text_hover: palette.neutral[900],
  button_outlined_neutral_text_active: palette.neutral[900],

  button_default_green_border_normal: "transparent",
  button_default_green_border_hover: "transparent",
  button_default_green_border_active: "transparent",
  button_default_green_background_normal: palette.green[500],
  button_default_green_background_hover: palette.green[900],
  button_default_green_background_active: palette.green[900],
  button_default_green_text_normal: palette.neutral[900],
  button_default_green_text_hover: palette.green[100],
  button_default_green_text_active: palette.green[100],

  button_outlined_green_border_normal: palette.green[500],
  button_outlined_green_border_hover: palette.green[900],
  button_outlined_green_border_active: palette.green[900],
  button_outlined_green_background_normal: "transparent",
  button_outlined_green_background_hover: "transparent",
  button_outlined_green_background_active: "transparent",
  button_outlined_green_text_normal: palette.green[500],
  button_outlined_green_text_hover: palette.green[900],
  button_outlined_green_text_active: palette.green[900],

  button_default_red_border_normal: "transparent",
  button_default_red_border_hover: "transparent",
  button_default_red_border_active: "transparent",
  button_default_red_background_normal: palette.red[500],
  button_default_red_background_hover: palette.red[900],
  button_default_red_background_active: palette.red[900],
  button_default_red_text_normal: palette.red[900],
  button_default_red_text_hover: palette.red[100],
  button_default_red_text_active: palette.red[100],

  button_outlined_red_border_normal: palette.red[500],
  button_outlined_red_border_hover: palette.red[900],
  button_outlined_red_border_active: palette.red[900],
  button_outlined_red_background_normal: "transparent",
  button_outlined_red_background_hover: "transparent",
  button_outlined_red_background_active: "transparent",
  button_outlined_red_text_normal: palette.red[500],
  button_outlined_red_text_hover: palette.red[900],
  button_outlined_red_text_active: palette.red[900],

  button_select_neutral_border_normal: "transparent",
  button_select_neutral_border_hover: "transparent",
  button_select_neutral_border_active: "transparent",
  button_select_neutral_background_normal: palette.neutral[0],
  button_select_neutral_background_hover: palette.secondary[100],
  button_select_neutral_background_active: palette.secondary[300],
  button_select_neutral_text_normal: palette.neutral[900],
  button_select_neutral_text_hover: palette.neutral[900],
  button_select_neutral_text_active: palette.neutral[900],

  nav_background: palette.neutral[0],
  subnav_background: palette.neutral[200],
  nav_shadow: palette.neutral[500],
  navItem_normal: palette.neutral[700],
  navItem_hovered: palette.secondary[500],
  navItem_active: palette.primary[500],

  /**
   * Fields
   */
  field_select_menu_background: palette.neutral[0],
  fieldAccent_normal: palette.neutral[100],
  fieldAccent_focused: palette.primary[500],

  /**
   * Charts
   */
  chart_radar_axis_start: palette.neutral[500],
  chart_radar_axis_end: palette.neutral[100],
  chart_radar_levels: palette.neutral[300],
  chart_radar_set1_label: palette.primary[700],
  chart_radar_set1_outline: palette.primary[500],
  chart_radar_set1_fill: `${palette.primary[500]}22`,
  chart_radar_set2_label: palette.secondary[700],
  chart_radar_set2_outline: palette.secondary[500],
  chart_radar_set2_fill: `${palette.secondary[500]}22`,
  chart_radar_set3_label: palette.green[700],
  chart_radar_set3_outline: palette.green[500],
  chart_radar_set3_fill: `${palette.green[500]}22`,

  /**
   * Sliders
   */
  slider_background: "#D8EDE9",
  slider_text_area_background: "#BCE2DB",
};
