"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenCache = void 0;
var react_native_1 = require("react-native");
var expo_secure_store_1 = require("expo-secure-store");
var createTokenCache = function () {
    return {
        getToken: function (key) {
            return (0, expo_secure_store_1.getItemAsync)(key);
        },
        saveToken: function (key, token) {
            return (0, expo_secure_store_1.setItemAsync)(key, token);
        },
    };
};
// SecureStore is not supported on the web
// https://github.com/expo/expo/issues/7744#issuecomment-611093485
exports.tokenCache = react_native_1.Platform.OS !== 'web' ? createTokenCache() : undefined;
