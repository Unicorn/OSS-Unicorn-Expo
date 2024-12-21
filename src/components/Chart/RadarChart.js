"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadarChart = void 0;
var react_native_1 = require("react-native");
var restyle_1 = require("@shopify/restyle");
var react_native_svg_1 = require("react-native-svg");
var expo_crypto_1 = require("expo-crypto");
var RadarPolygon_1 = require("./RadarPolygon");
var stubbedSets = [
    {
        label: "Hard Skills",
        data: [
            { label: "Wood Framing", value: 72 },
            { label: "Form Work", value: 94 },
            { label: "Metal Framing", value: 41 },
            { label: "Load Bearing", value: 64 },
            { label: "Floor Systems", value: 24 },
        ],
    },
    {
        label: "Soft Skills",
        data: [
            { label: "Communication", value: 12 },
            { label: "Punctuality", value: 54 },
            { label: "Reliability", value: 99 },
            { label: "Work Ethic", value: 74 },
            { label: "Management", value: 35 },
        ],
    },
    {
        label: "Test",
        data: [
            { label: "Item 1", value: 93 },
            { label: "Item 2", value: 34 },
            { label: "Item 3", value: 15 },
            { label: "Item 4", value: 36 },
            { label: "Item 5", value: 92 },
        ],
    },
];
var RadarChart = function (_a) {
    var numberOfAxes = _a.numberOfAxes, _b = _a.sets, sets = _b === void 0 ? stubbedSets : _b, _c = _a.showSets, showSets = _c === void 0 ? [0, 1, 2] : _c, _d = _a.axisWidth, axisWidth = _d === void 0 ? 150 : _d, _e = _a.axisLength, axisLength = _e === void 0 ? 1 : _e, _f = _a.size, size = _f === void 0 ? 150 : _f, height = _a.height, width = _a.width, _g = _a.labelHeight, labelHeight = _g === void 0 ? 20 : _g, _h = _a.labelWidth, labelWidth = _h === void 0 ? 80 : _h, _j = _a.labelSpacing, labelSpacing = _j === void 0 ? 20 : _j, _k = _a.dynamicSpacing, dynamicSpacing = _k === void 0 ? true : _k;
    var colors = (0, restyle_1.useTheme)().colors;
    if (sets && showSets.some(function (index) { return index >= sets.length; })) {
        console.error("Invalid index in showSets. Ensure indices are within the bounds of the sets array.");
        return (<react_native_1.View style={styles.container}>
        <react_native_1.Text>Cannot Display Data</react_native_1.Text>
      </react_native_1.View>);
    }
    var responsive = dynamicSpacing && react_native_1.Platform.OS === "web";
    var _l = (0, react_native_1.useWindowDimensions)(), screenWidth = _l.width, screenHeight = _l.height;
    var xSpacing = responsive && screenWidth > size ? (screenWidth / size / 2) * labelSpacing : labelSpacing;
    var ySpacing = responsive && screenHeight > size ? (screenHeight / size / 3) * labelSpacing : labelSpacing;
    var axes = numberOfAxes !== null && numberOfAxes !== void 0 ? numberOfAxes : sets[0].data.length; // number of axis on the radar chart
    var calculated = {
        centerX: (width !== null && width !== void 0 ? width : screenWidth) / 2,
        centerY: (height !== null && height !== void 0 ? height : 500) / 2,
        angle: (2 * Math.PI) / axes,
        angleDeg: 360 / axes,
        max: 100,
        size: size,
    };
    var renderAxis = function (data) {
        return data.map(function (d, i) { return (<react_native_svg_1.G key={i}>
        <react_native_svg_1.Circle cx={calculated.centerX} cy={calculated.centerY} r={(axisWidth / axes) * (i + 1)} stroke={colors.chart_radar_levels} strokeWidth="0.5" fill="none"/>
        <react_native_svg_1.Rect width={axisLength} height={axisWidth} fill="url(#gradient)" transform={"translate(".concat(calculated.centerX, ", ").concat(calculated.centerY, ") rotate(").concat(180 + calculated.angleDeg * i, ", ").concat(axisLength / 2, ", ").concat(axisLength / 2, ")")}/>
      </react_native_svg_1.G>); });
    };
    var renderLabels = function (data, set, index) { return (<react_native_1.View key={set} style={styles.labelsContainer}>
      {data.map(function (_a, i) {
            var label = _a.label;
            var x = calculated.centerX + size * Math.cos(calculated.angle * i - Math.PI / 2);
            var y = calculated.centerY + size * Math.sin(calculated.angle * i - Math.PI / 2);
            var left = x - labelWidth / 2;
            var top = y + index * labelHeight;
            if (y < calculated.centerY && x !== calculated.centerX)
                top -= labelHeight / 2;
            if (y < calculated.centerY && x === calculated.centerX)
                top -= ySpacing + labelHeight / 2;
            if (y > calculated.centerY)
                top += ySpacing;
            if (x < calculated.centerX)
                left -= xSpacing;
            if (x > calculated.centerX)
                left += xSpacing;
            return (<react_native_1.View key={i} style={[styles.labelContainer, { left: left, top: top }]}>
            <react_native_1.Text style={[styles.label, { color: colors["chart_radar_set".concat(set + 1, "_label")] }]} numberOfLines={2}>
              {label}
            </react_native_1.Text>
          </react_native_1.View>);
        })}
    </react_native_1.View>); };
    return (<react_native_1.View style={styles.container}>
      <react_native_1.View style={styles.radarContainer}>
        <react_native_svg_1.Svg height="100%" width="100%">
          <react_native_svg_1.Defs>
            <react_native_svg_1.LinearGradient id="gradient" gradientTransform="rotate(90)">
              <react_native_svg_1.Stop offset="0%" stopColor={colors.chart_radar_axis_start}/>
              <react_native_svg_1.Stop offset="100%" stopColor={colors.chart_radar_axis_end}/>
            </react_native_svg_1.LinearGradient>
          </react_native_svg_1.Defs>

          {renderAxis(sets[0].data)}

          {showSets.map(function (s) { return (<RadarPolygon_1.RadarPolygon key={(0, expo_crypto_1.randomUUID)()} dimensions={calculated} fill={colors["chart_radar_set".concat(s + 1, "_fill")]} stroke={colors["chart_radar_set".concat(s + 1, "_outline")]} data={sets[s].data}/>); })}
        </react_native_svg_1.Svg>
      </react_native_1.View>

      {showSets.map(function (s, i) { return renderLabels(sets[s].data, s, i); })}
    </react_native_1.View>);
};
exports.RadarChart = RadarChart;
var styles = react_native_1.StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        minHeight: 500,
        width: "100%",
    },
    radarContainer: {
        position: "absolute",
        height: "100%",
        width: "100%",
    },
    labelsContainer: {
        position: "absolute",
        height: "100%",
        width: "100%",
    },
    labelContainer: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center",
    },
});
