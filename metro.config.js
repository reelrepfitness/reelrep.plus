const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Fix for moti/framer-motion dependencies:
// Add 'cjs' to the source extensions to support files with .cjs extension.
// Metro's resolver doesn't include this by default.
config.resolver.sourceExts.push('cjs');

module.exports = config;
