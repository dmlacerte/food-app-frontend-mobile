module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // presets: ['babel-preset-expo', "module:metro-react-native-babel-preset"],
    // plugins: [
    //   "react-native-reanimated/plugin",
    // ],
    // env: {
    //   development: {
    //     plugins: ["transform-react-jsx-source", "react-native-reanimated/plugin"]
    //   },
    //   production: {
    //     plugins: ["react-native-paper/babel", "react-native-reanimated/plugin"]
    //   }
    // }
  };
};
