/** @format */

import { createTheme } from '@shopify/restyle'

import { colors, palette, breakpoints, spacing } from './config'
import {
  blockImageVariants,
  buttonVariants,
  buttonGroupVariants,
  cardVariants,
  contentVariants,
  dividerVariants,
  multiSelectVariants,
  selectVariants,
  heroVariants,
  navVariants,
  navItemVariants,
  navIconVariants,
  navTextVariants,
  overlayVariants,
  pageVariants,
  pVariants,
  aVariants,
  spanVariants,
  strongVariants,
  sliderVariants,
  toggleVariants,
  headerVariants,
  titleVariants,
  columnsVariants,
} from './components'

export const theme = {
  breakpoints,
  spacing,

  blockImageVariants,
  buttonVariants,
  buttonGroupVariants,
  cardVariants,
  contentVariants,
  dividerVariants,
  selectVariants,
  multiSelectVariants,
  heroVariants,
  overlayVariants,
  navVariants,
  navItemVariants,
  navIconVariants,
  navTextVariants,
  pageVariants,
  pVariants,
  sliderVariants,
  toggleVariants,
  aVariants,
  spanVariants,
  strongVariants,
  headerVariants,
  titleVariants,
  columnsVariants,
}

export const chuzUILight = createTheme({
  ...theme,
  colors,
})

export const chuzUIDark = createTheme({
  ...theme,

  colors: {
    ...colors,
    /**
     * General
     */
    primary: palette.primary[500],
    primary_text_normal: palette.primary[500],
    primary_text_hover: palette.primary[100],
    secondary: palette.secondary[500],
    secondary_text_normal: palette.secondary[100],
    secondary_text_hover: palette.secondary[900],

    page_background: palette.neutral[800],
    overlay_background: palette.neutral[900],
    divider_color: palette.neutral[800],
    shadow_color: palette.neutral[900],
    surface: palette.neutral[900],

    link_color: palette.primary[500],
    link_hover: palette.primary[100],
    text_color: palette.neutral[100],

    /**
     * Buttons
     */
    button_default_primary_background_hover: palette.primary[100],
    button_default_primary_background_active: palette.primary[100],
    button_default_primary_text_hover: palette.primary[900],
    button_default_primary_text_active: palette.primary[900],

    button_outlined_primary_border_hover: palette.primary[100],
    button_outlined_primary_border_active: palette.primary[100],
    button_outlined_primary_text_hover: palette.primary[100],
    button_outlined_primary_text_active: palette.primary[100],

    button_default_secondary_background_hover: palette.secondary[100],
    button_default_secondary_background_active: palette.secondary[100],
    button_default_secondary_text_hover: palette.secondary[900],
    button_default_secondary_text_active: palette.secondary[900],

    button_outlined_secondary_border_hover: palette.secondary[100],
    button_outlined_secondary_border_active: palette.secondary[100],
    button_outlined_secondary_text_hover: palette.secondary[100],
    button_outlined_secondary_text_active: palette.secondary[100],

    button_default_neutral_background_normal: palette.neutral[1000],
    button_default_neutral_background_hover: palette.neutral[900],
    button_default_neutral_background_active: palette.neutral[600],
    button_default_neutral_text_normal: palette.neutral[500],
    button_default_neutral_text_hover: palette.neutral[200],

    button_outlined_neutral_border_hover: palette.neutral[100],
    button_outlined_neutral_border_active: palette.neutral[100],
    button_outlined_neutral_text_hover: palette.neutral[100],
    button_outlined_neutral_text_active: palette.neutral[100],

    button_default_green_background_normal: palette.green[500],
    button_default_green_background_hover: palette.green[100],
    button_default_green_background_active: palette.green[100],
    button_default_green_text_normal: palette.neutral[900],
    button_default_green_text_hover: palette.green[900],
    button_default_green_text_active: palette.green[900],

    button_outlined_green_border_hover: palette.green[100],
    button_outlined_green_border_active: palette.green[100],
    button_outlined_green_text_hover: palette.green[100],
    button_outlined_green_text_active: palette.green[100],

    button_default_red_background_normal: palette.red[500],
    button_default_red_background_hover: palette.red[100],
    button_default_red_background_active: palette.red[100],
    button_default_red_text_normal: palette.red[900],
    button_default_red_text_hover: palette.red[900],
    button_default_red_text_active: palette.red[900],

    button_outlined_red_border_hover: palette.red[100],
    button_outlined_red_border_active: palette.red[100],
    button_outlined_red_text_hover: palette.red[100],
    button_outlined_red_text_active: palette.red[100],

    button_select_neutral_background_normal: palette.neutral[300],
    button_select_neutral_background_hover: palette.secondary[100],
    button_select_neutral_background_active: palette.secondary[300],
    button_select_neutral_text_normal: palette.neutral[900],
    button_select_neutral_text_hover: palette.neutral[900],
    button_select_neutral_text_active: palette.neutral[900],

    nav_background: palette.neutral[1000],
    subnav_background: palette.neutral[800],
    nav_shadow: palette.neutral[900],
    navItem_normal: palette.neutral[300],
    navItem_hovered: palette.secondary[500],
    navItem_active: palette.primary[500],

    fieldAccent_normal: palette.neutral[100],
    fieldAccent_focused: palette.primary[500],

    /**
     * Charts
     */
    chart_radar_axis_start: palette.neutral[800],
    chart_radar_axis_end: palette.neutral[700],
    chart_radar_levels: palette.neutral[700],
    chart_radar_set1_label: palette.primary[500],
    chart_radar_set2_label: palette.secondary[500],
    chart_radar_set3_label: palette.green[500],
  },
})
