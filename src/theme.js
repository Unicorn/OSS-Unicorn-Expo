"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chuzUIDark = exports.chuzUILight = exports.theme = void 0;
var restyle_1 = require("@shopify/restyle");
var config_1 = require("./config");
var components_1 = require("./components");
exports.theme = {
    breakpoints: config_1.breakpoints,
    spacing: config_1.spacing,
    blockImageVariants: components_1.blockImageVariants,
    buttonVariants: components_1.buttonVariants,
    buttonGroupVariants: components_1.buttonGroupVariants,
    contentVariants: components_1.contentVariants,
    dividerVariants: components_1.dividerVariants,
    selectVariants: components_1.selectVariants,
    multiSelectVariants: components_1.multiSelectVariants,
    heroVariants: components_1.heroVariants,
    overlayVariants: components_1.overlayVariants,
    navVariants: components_1.navVariants,
    navItemVariants: components_1.navItemVariants,
    navIconVariants: components_1.navIconVariants,
    navTextVariants: components_1.navTextVariants,
    pageVariants: components_1.pageVariants,
    pVariants: components_1.pVariants,
    sliderVariants: components_1.sliderVariants,
    toggleVariants: components_1.toggleVariants,
    aVariants: components_1.aVariants,
    spanVariants: components_1.spanVariants,
    strongVariants: components_1.strongVariants,
    headerVariants: components_1.headerVariants,
    titleVariants: components_1.titleVariants,
    columnsVariants: components_1.columnsVariants,
};
exports.chuzUILight = (0, restyle_1.createTheme)(__assign(__assign({}, exports.theme), { colors: config_1.colors }));
exports.chuzUIDark = (0, restyle_1.createTheme)(__assign(__assign({}, exports.theme), { colors: __assign(__assign({}, config_1.colors), { 
        /**
         * General
         */
        primary: config_1.palette.primary[500], primary_text_normal: config_1.palette.primary[500], primary_text_hover: config_1.palette.primary[100], secondary: config_1.palette.secondary[500], secondary_text_normal: config_1.palette.secondary[100], secondary_text_hover: config_1.palette.secondary[900], page_background: config_1.palette.neutral[800], overlay_background: config_1.palette.neutral[900], divider_color: config_1.palette.neutral[800], shadow_color: config_1.palette.neutral[900], surface: config_1.palette.neutral[900], link_color: config_1.palette.primary[500], link_hover: config_1.palette.primary[100], text_color: config_1.palette.neutral[100], 
        /**
         * Buttons
         */
        button_default_primary_background_hover: config_1.palette.primary[100], button_default_primary_background_active: config_1.palette.primary[100], button_default_primary_text_hover: config_1.palette.primary[900], button_default_primary_text_active: config_1.palette.primary[900], button_outlined_primary_border_hover: config_1.palette.primary[100], button_outlined_primary_border_active: config_1.palette.primary[100], button_outlined_primary_text_hover: config_1.palette.primary[100], button_outlined_primary_text_active: config_1.palette.primary[100], button_default_secondary_background_hover: config_1.palette.secondary[100], button_default_secondary_background_active: config_1.palette.secondary[100], button_default_secondary_text_hover: config_1.palette.secondary[900], button_default_secondary_text_active: config_1.palette.secondary[900], button_outlined_secondary_border_hover: config_1.palette.secondary[100], button_outlined_secondary_border_active: config_1.palette.secondary[100], button_outlined_secondary_text_hover: config_1.palette.secondary[100], button_outlined_secondary_text_active: config_1.palette.secondary[100], button_default_neutral_background_normal: config_1.palette.neutral[1000], button_default_neutral_background_hover: config_1.palette.neutral[900], button_default_neutral_background_active: config_1.palette.neutral[600], button_default_neutral_text_normal: config_1.palette.neutral[500], button_default_neutral_text_hover: config_1.palette.neutral[200], button_outlined_neutral_border_hover: config_1.palette.neutral[100], button_outlined_neutral_border_active: config_1.palette.neutral[100], button_outlined_neutral_text_hover: config_1.palette.neutral[100], button_outlined_neutral_text_active: config_1.palette.neutral[100], button_default_green_background_normal: config_1.palette.green[500], button_default_green_background_hover: config_1.palette.green[100], button_default_green_background_active: config_1.palette.green[100], button_default_green_text_normal: config_1.palette.neutral[900], button_default_green_text_hover: config_1.palette.green[900], button_default_green_text_active: config_1.palette.green[900], button_outlined_green_border_hover: config_1.palette.green[100], button_outlined_green_border_active: config_1.palette.green[100], button_outlined_green_text_hover: config_1.palette.green[100], button_outlined_green_text_active: config_1.palette.green[100], button_default_red_background_normal: config_1.palette.red[500], button_default_red_background_hover: config_1.palette.red[100], button_default_red_background_active: config_1.palette.red[100], button_default_red_text_normal: config_1.palette.red[900], button_default_red_text_hover: config_1.palette.red[900], button_default_red_text_active: config_1.palette.red[900], button_outlined_red_border_hover: config_1.palette.red[100], button_outlined_red_border_active: config_1.palette.red[100], button_outlined_red_text_hover: config_1.palette.red[100], button_outlined_red_text_active: config_1.palette.red[100], button_select_neutral_background_normal: config_1.palette.neutral[300], button_select_neutral_background_hover: config_1.palette.secondary[100], button_select_neutral_background_active: config_1.palette.secondary[300], button_select_neutral_text_normal: config_1.palette.neutral[900], button_select_neutral_text_hover: config_1.palette.neutral[900], button_select_neutral_text_active: config_1.palette.neutral[900], nav_background: config_1.palette.neutral[1000], subnav_background: config_1.palette.neutral[800], nav_shadow: config_1.palette.neutral[900], navItem_normal: config_1.palette.neutral[300], navItem_hovered: config_1.palette.secondary[500], navItem_active: config_1.palette.primary[500], fieldAccent_normal: config_1.palette.neutral[100], fieldAccent_focused: config_1.palette.primary[500], 
        /**
         * Charts
         */
        chart_radar_axis_start: config_1.palette.neutral[800], chart_radar_axis_end: config_1.palette.neutral[700], chart_radar_levels: config_1.palette.neutral[700], chart_radar_set1_label: config_1.palette.primary[500], chart_radar_set2_label: config_1.palette.secondary[500], chart_radar_set3_label: config_1.palette.green[500] }) }));
