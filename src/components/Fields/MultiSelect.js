"use strict";
/** @format */
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
exports.MultiSelect = exports.MultiSelectBase = exports.multiSelectVariants = void 0;
var restyle_1 = require("@shopify/restyle");
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_crypto_1 = require("expo-crypto");
var lodash_1 = require("lodash");
var Button_1 = require("../Button");
var Base_1 = require("../Base");
var Select_1 = require("./Select");
var helpers_1 = require("../../helpers");
var config_1 = require("../../config");
var themeKey = 'multiSelectVariants';
var stubbedOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
];
exports.multiSelectVariants = {
    defaults: {
        position: 'relative',
        zIndex: 900,
    },
};
var Styled = (0, restyle_1.createRestyleComponent)([(0, restyle_1.createVariant)({ themeKey: themeKey, defaults: exports.multiSelectVariants.defaults })], react_native_1.View);
var MultiSelectBase = function (_a) {
    var _b;
    var label = _a.label, style = _a.style, _c = _a.options, options = _c === void 0 ? stubbedOptions : _c, selected = _a.selected, onSelect = _a.onSelect, onChange = _a.onChange, props = __rest(_a, ["label", "style", "options", "selected", "onSelect", "onChange"]);
    var colors = (0, restyle_1.useTheme)().colors;
    var _d = (0, react_1.useState)(false), opened = _d[0], setOpened = _d[1];
    var _e = (0, react_1.useState)((_b = selected !== null && selected !== void 0 ? selected : options) !== null && _b !== void 0 ? _b : []), selectedOptions = _e[0], setSelectedOptions = _e[1];
    var animation = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    (0, react_1.useEffect)(function () {
        onChange && onChange(selectedOptions);
    }, [selectedOptions]);
    var toggleDropdown = function () {
        var toValue = opened ? 0 : 1;
        react_native_1.Animated.timing(animation, {
            toValue: toValue,
            duration: 500,
            useNativeDriver: (0, helpers_1.isNativeDriver)(),
        }).start();
        setOpened(!opened);
    };
    var selectHandler = function (option) {
        setSelectedOptions(function (prev) { return (0, helpers_1.toggleItemInArray)(option, prev); });
        onSelect && onSelect(option);
    };
    var renderLabel = function () {
        if (typeof label === 'string') {
            return (<Button_1.Button icon="keyboard-double-arrow-down" onPress={toggleDropdown} active={opened}>
          {label}
        </Button_1.Button>);
        }
        return label;
    };
    return (<Styled {...props}>
      <react_1.Fragment>
        {renderLabel()}
        {opened && (<react_native_1.Animated.View style={[
                style,
                Select_1.selectStyles.list,
                {
                    opacity: animation,
                    backgroundColor: colors.field_select_menu_background,
                    marginTop: config_1.spacing.s,
                },
            ]}>
            <react_native_1.ScrollView style={{ borderRadius: style['borderRadius'] }}>
              {options.map(function (item) { return (<Button_1.Button key={(0, expo_crypto_1.randomUUID)()} active={selectedOptions.findIndex(function (s) { return (0, lodash_1.isEqual)(s, item); }) !== -1} variant="select" onPress={function () { return selectHandler(item); }}>
                  {item.label}
                </Button_1.Button>); })}
            </react_native_1.ScrollView>
          </react_native_1.Animated.View>)}
      </react_1.Fragment>
    </Styled>);
};
exports.MultiSelectBase = MultiSelectBase;
exports.MultiSelect = (0, Base_1.withFeatures)(exports.MultiSelectBase);
