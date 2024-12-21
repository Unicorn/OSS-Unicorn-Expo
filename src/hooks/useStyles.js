"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStyles = void 0;
var react_native_1 = require("react-native");
var restyle_1 = require("@shopify/restyle");
// TODO: Revisit when doing a final pass for dark/light theme colors
var scrollbarStyles = "\n  ::-webkit-scrollbar {\n    width: 8px;\n  }\n  ::-webkit-scrollbar-thumb {\n    background-color: #ccc;\n    border-radius: 4px;\n  }\n  ::-webkit-scrollbar-track {\n    background-color: #f0f0f0;\n  }\n\n  * {\n    scrollbar-width: thin;\n    scrollbar-color: #ccc #f0f0f0;\n  }\n";
var injectScrollbarStyles = function () {
    if (react_native_1.Platform.OS === "web") {
        if (typeof window !== "undefined") {
            var styleElement = document.createElement("style");
            styleElement.textContent = scrollbarStyles;
            document.head.append(styleElement);
        }
    }
};
var replaceColors = function (styles, colors) {
    var newStyles = {};
    for (var key in styles) {
        if (typeof styles[key] === "object" && !Array.isArray(styles[key])) {
            newStyles[key] = replaceColors(styles[key], colors);
        }
        else if (typeof styles[key] === "string" && styles[key].startsWith("colors.")) {
            var colorKey = styles[key].substring(7); // Remove "colors." prefix
            newStyles[key] = colors[colorKey];
        }
        else {
            newStyles[key] = styles[key];
        }
    }
    return newStyles;
};
var useStyles = function (styles) {
    var colors = (0, restyle_1.useTheme)().colors;
    injectScrollbarStyles();
    return replaceColors(styles, colors);
};
exports.useStyles = useStyles;
