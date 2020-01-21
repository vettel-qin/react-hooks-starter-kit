import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import Defer from '../internal/defer';
import { injectPlugins } from '../internal/webpackHelper';
import webpackConfig from '../config/webpack.config';

/**
 * Represents bundle content as convenient interactive zoomable treemap.
 */
function analyze() {
  injectPlugins(webpackConfig, [new BundleAnalyzerPlugin()]);

  const compiler = webpack(webpackConfig);
  const deferred = new Defer();

  compiler.run((err, stats) => {
    if (err) {
      return deferred.reject(err);
    }

    console.info(stats.toString(webpackConfig.stats));
    return deferred.resolve();
  });

  return deferred.promise;
}

export default analyze;
