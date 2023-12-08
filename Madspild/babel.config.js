// Eksporterer en Babel-konfigurationsfunktion, som Expo bruger automatisk
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
