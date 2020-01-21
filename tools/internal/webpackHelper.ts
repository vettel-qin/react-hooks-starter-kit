import webpack from 'webpack';

/**
 * Inject webpack entries
 */
export function injectEntries(webpackConfig: webpack.Configuration, entries: string[]) {
  if (!webpackConfig.entry) {
    webpackConfig.entry = './src';
  }

  if (Array.isArray(webpackConfig.entry) || typeof webpackConfig.entry === 'string') {
    webpackConfig.entry = entries.concat(webpackConfig.entry);
  } else {
    const entrys = webpackConfig.entry as webpack.Entry;
    Object.keys(entrys).forEach(entry => {
      entrys[entry] = entries.concat(entrys[entry]);
    });
  }
}

/**
 * Inject webpack plugins
 */
export function injectPlugins(webpackConfig: webpack.Configuration, plugins: webpack.Plugin[]) {
  webpackConfig.plugins = webpackConfig.plugins || [];
  webpackConfig.plugins.push.apply(webpackConfig.plugins, plugins);
}
