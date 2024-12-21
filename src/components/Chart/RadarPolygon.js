"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadarPolygon = void 0;
var react_1 = require("react");
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var react_native_svg_1 = require("react-native-svg");
var AnimatedPolygon = react_native_reanimated_1.default.createAnimatedComponent(react_native_svg_1.Polygon);
var RadarPolygon = function (_a) {
    var dimensions = _a.dimensions, fill = _a.fill, stroke = _a.stroke, data = _a.data;
    var animatedValue = (0, react_native_reanimated_1.useSharedValue)(0);
    var animatedProps = (0, react_native_reanimated_1.useAnimatedProps)(function () {
        // Calculate the points of each axis based on the animated value
        var animatedPoints = data.map(function (_a, i) {
            var value = _a.value;
            var adjustedPoint = (value / dimensions.max) * animatedValue.value * dimensions.size;
            var x = dimensions.centerX + adjustedPoint * Math.cos(dimensions.angle * i - Math.PI / 2);
            var y = dimensions.centerY + adjustedPoint * Math.sin(dimensions.angle * i - Math.PI / 2);
            return "".concat(x, ",").concat(y);
        });
        return {
            points: animatedPoints.join(" "),
        };
    });
    (0, react_1.useEffect)(function () {
        animatedValue.value = (0, react_native_reanimated_1.withSpring)(1);
    }, []);
    return <AnimatedPolygon animatedProps={animatedProps} fill={fill} stroke={stroke} strokeWidth="2"/>;
};
exports.RadarPolygon = RadarPolygon;
