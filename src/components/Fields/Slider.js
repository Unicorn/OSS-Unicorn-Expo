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
exports.Slider = exports.sliderVariants = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var restyle_1 = require("@shopify/restyle");
var themeKey = 'sliderVariants';
exports.sliderVariants = {
    defaults: {
        alignItems: 'stretch',
        backgroundColor: 'fieldAccent_normal',
        borderRadius: 20,
        marginVertical: 'xs',
        position: 'relative',
        height: 40,
        overflow: 'hidden',
        width: '100%',
    },
};
var Styled = (0, restyle_1.createRestyleComponent)([(0, restyle_1.createVariant)({ themeKey: themeKey, defaults: exports.sliderVariants.defaults })], react_native_1.View);
var Slider = function (_a) {
    var variant = _a.variant, _b = _a.initialValue, initialValue = _b === void 0 ? 0 : _b, label = _a.label, handler = _a.handler, _c = _a.step, step = _c === void 0 ? 10 : _c, _d = _a.disabled, disabled = _d === void 0 ? false : _d, props = __rest(_a, ["variant", "initialValue", "label", "handler", "step", "disabled"]);
    // Note: we may consider moving 'value' out of the component
    // if it makes sense to have it managed by the parent component (ie: controlled component)
    var _e = (0, react_1.useState)(false), isPanning = _e[0], setIsPanning = _e[1];
    var _f = (0, react_1.useState)(initialValue), value = _f[0], setValue = _f[1];
    var sliderRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (handler && !isPanning && value !== initialValue) {
            handler(value);
        }
    }, [value, isPanning]);
    function calculateSnapValue(sliderLocation) {
        return Math.round(sliderLocation / step) * step;
    }
    var panResponder = (0, react_1.useMemo)(function () {
        return react_native_1.PanResponder.create({
            onStartShouldSetPanResponder: function () { return true; },
            onMoveShouldSetPanResponder: function () { return true; },
            onPanResponderGrant: function (e) {
                handleSetSliderValue({ x: e.nativeEvent.locationX });
                setIsPanning(true);
            },
            onPanResponderMove: function (e) { return handleSetSliderValue({ x: e.nativeEvent.locationX }); },
            onPanResponderRelease: function (e) {
                handleSetSliderValue({ x: e.nativeEvent.locationX, snap: true, isDone: true });
            },
            onPanResponderTerminationRequest: function () { return true; },
        });
    }, [setValue, disabled]);
    var handleSetSliderValue = function (_a) {
        var x = _a.x, _b = _a.snap, snap = _b === void 0 ? false : _b, isDone = _a.isDone;
        if (!sliderRef.current || disabled)
            return;
        sliderRef.current.measure(function (fx, fy, width, height, px, py) {
            var newValue = Math.max(0, Math.min(100, (x / width) * 100));
            var finalValue = snap ? calculateSnapValue(newValue) : newValue;
            setValue(finalValue); // not snapping during drag to preserve smoothness
            // we'll make this operation as done at the very end
            // so that we can prevent the handler from being called multiple times
            if (isDone) {
                setIsPanning(false);
            }
        });
    };
    var renderLabel = function () {
        if (typeof label === 'string')
            return <react_native_1.Text style={styles.label}>{label}</react_native_1.Text>;
        return label;
    };
    return (<react_native_1.View ref={sliderRef} {...panResponder.panHandlers}>
      <react_native_1.View style={styles.meta}>
        {label && renderLabel()}
        <react_native_1.Text>{value.toFixed(0)}%</react_native_1.Text>
      </react_native_1.View>
      <Styled>
        <react_native_1.View style={[styles.fill, { width: "".concat(value, "%"), backgroundColor: "hsl(171, ".concat(50 + 0.3 * value, "%, ").concat(30 + 0.1 * value, "%)") }]}/>
      </Styled>
    </react_native_1.View>);
};
exports.Slider = Slider;
var styles = react_native_1.StyleSheet.create({
    fill: {
        height: 300,
        borderRadius: 20,
    },
    meta: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 16,
    },
});
