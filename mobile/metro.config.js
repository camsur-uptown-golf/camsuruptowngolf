// https://docs.expo.dev/guides/customizing-metro/
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

/**
 * Iisang pinagmumulan ng content: binabasa ng app ang `src/lib/` ng website
 * (`@site/site-content`, `@site/clubhouse`, …) imbes na kopyahin ito.
 *
 * Gumagamit din ang mga file na iyon ng `@/lib/...` — sa website, ang `@/` ay
 * ang `src/` ng website, hindi ang `mobile/src/`. Kaya kapag nasa labas ng
 * `mobile/` ang nag-import, doon itinuturo ang `@/`.
 */
const repoRoot = path.resolve(__dirname, '..');
const siteSrc = path.join(repoRoot, 'src');

/* `i18n/config` — kailangan ng `lib/weather-i18n` (at ng mga salin sa susunod). */
config.watchFolders = [path.join(siteSrc, 'lib'), path.join(siteSrc, 'i18n')];

const upstreamResolve = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  const resolve = upstreamResolve ?? context.resolveRequest;

  if (moduleName.startsWith('@site/')) {
    return context.resolveRequest(context, path.join(siteSrc, 'lib', moduleName.slice('@site/'.length)), platform);
  }
  if (moduleName.startsWith('@/') && context.originModulePath.startsWith(siteSrc + path.sep)) {
    return context.resolveRequest(context, path.join(siteSrc, moduleName.slice(2)), platform);
  }
  return resolve(context, moduleName, platform);
};

module.exports = config;
