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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonGroup = exports.ButtonGroupBase = exports.buttonGroupVariants = void 0;
var react_native_1 = require("react-native");
var react_1 = require("react");
var restyle_1 = require("@shopify/restyle");
var Base_1 = require("../Base");
var Button_1 = require("../Button");
var helpers_1 = require("../../helpers");
var expo_crypto_1 = require("expo-crypto");
var themeKey = "buttonGroupVariants";
exports.buttonGroupVariants = {
    defaults: {},
    segmented: {
        flexDirection: "row",
        flexWrap: "nowrap",
    },
};
var Styled = (0, restyle_1.createRestyleComponent)([(0, restyle_1.createVariant)({ themeKey: themeKey, defaults: exports.buttonGroupVariants.defaults })], react_native_1.View);
var ButtonGroupBase = function (_a) {
    var buttons = _a.buttons, buttonVariant = _a.buttonVariant, buttonType = _a.buttonType, selected = _a.selected, onSelect = _a.onSelect, onChange = _a.onChange, divider = _a.divider, props = __rest(_a, ["buttons", "buttonVariant", "buttonType", "selected", "onSelect", "onChange", "divider"]);
    var _b = (0, react_1.useState)(selected !== null && selected !== void 0 ? selected : []), selectedOptions = _b[0], setSelectedOptions = _b[1];
    var colors = (0, restyle_1.useTheme)().colors;
    var selectHandler = function (option) {
        setSelectedOptions(function (prev) { return (0, helpers_1.toggleItemInArray)(option, prev); });
        onSelect && onSelect(option);
    };
    (0, react_1.useEffect)(function () {
        onChange && onChange(selectedOptions);
    }, [selectedOptions]);
    return (<Styled {...props}>
      {buttons.map(function (b, i) {
            var s = __assign(__assign({}, b.style), { borderLeftWidth: 2, borderRightWidth: 2, borderRadius: 0 });
            var active = (0, helpers_1.itemInArray)(b, selectedOptions);
            if (i === 0) {
                s["borderRightWidth"] = buttons.length > 2 ? 0 : 1;
                s["borderTopLeftRadius"] = 5;
                s["borderBottomLeftRadius"] = 5;
            }
            if (i === buttons.length - 1) {
                s["borderLeftWidth"] = buttons.length > 2 ? 0 : 1;
                s["borderTopRightRadius"] = 5;
                s["borderBottomRightRadius"] = 5;
            }
            return (<react_1.Fragment key={(0, expo_crypto_1.randomUUID)()}>
            <Button_1.Button variant={buttonVariant} type={buttonType} active={active} {...b} style={s} onPress={function () { return selectHandler(b); }}/>
            {(divider || !buttonVariant) && i < buttons.length - 1 && (<react_native_1.View style={{ width: 2, backgroundColor: colors.segmentDividerColor }}/>)}
          </react_1.Fragment>);
        })}
    </Styled>);
};
exports.ButtonGroupBase = ButtonGroupBase;
exports.ButtonGroup = (0, Base_1.withFeatures)(exports.ButtonGroupBase);
