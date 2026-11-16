const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { FileStore } = require('metro-cache');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * Cache pin: this machine's C: drive is nearly full, so Metro's transform
 * cache is written to D:\caches\metro instead of %TEMP%\metro-cache.
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  cacheStores: [
    new FileStore({
      root: path.resolve('D:\\caches\\metro'),
    }),
  ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
