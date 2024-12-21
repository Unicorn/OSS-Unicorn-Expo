"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavIcon = exports.navIconVariants = void 0;
var vector_icons_1 = require("@expo/vector-icons");
var restyle_1 = require("@shopify/restyle");
var themeKey = "navIconVariants";
exports.navIconVariants = {
    defaults: {
        color: "navItem_normal",
        fontSize: 24,
    },
    active: {
        color: "navItem_active",
    },
    hovered: {
        color: "navItem_hovered",
    },
};
var Styled = (0, restyle_1.createRestyleComponent)([(0, restyle_1.createVariant)({ themeKey: themeKey, defaults: exports.navIconVariants.defaults })], vector_icons_1.MaterialIcons);
var NavIcon = function (props) {
    return <Styled {...props}/>;
};
exports.NavIcon = NavIcon;
