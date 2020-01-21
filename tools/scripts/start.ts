import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import httpProxyMiddleware from 'http-proxy-middleware';
import { ParsedArgs } from 'minimist';
import Defer from '../internal/defer';
import { injectEntries, injectPlugins } from '../internal/webpackHelper';
import { PUBLIC_DIR } from '../config/paths.config';
import webpackConfig from '../config/webpack.config';
import proxyConfig from '../config/proxy.config';

/**
 * Launches a development web server
 */
function start(args: ParsedArgs) {
  const host = args.host || process.env.HOST || 'localhost';
  const port = parseInt(args.port || process.env.PORT, 10) || 3000;
  const useHMR = args.dev && args.hmr !== false;

  if (useHMR) {
    // Inject webpack hot loading configuration
    injectEntries(webpackConfig, ['webpack-hot-middleware/client']);
    injectPlugins(webpackConfig, [new webpack.HotModuleReplacementPlugin()]);
  }

  const server = express();
  const compiler = webpack(webpackConfig);
  const deferred = new Defer();

  // Webpack development compiler middleware
  // https://github.com/webpack/webpack-dev-middleware#options
  server.use(
    webpackDevMiddleware(compiler, {
      publicPath: (webpackConfig.output && webpackConfig.output.publicPath) || '/',
      stats: webpackConfig.stats,
    }),
  );

  if (useHMR) {
    // Webpack hot reloading middleware
    // https://github.com/webpack-contrib/webpack-hot-middleware#middleware
    server.use(webpackHotMiddleware(compiler));
  }

  // Serves static files
  // https://expressjs.com/en/api.html#express.static
  server.use(express.static(PUBLIC_DIR));

  // Apply proxy configurations
  // https://github.com/chimurai/http-proxy-middleware#proxycontext-config
  if (Array.isArray(proxyConfig) && proxyConfig.length) {
    proxyConfig.forEach(({ context, ...config }) => {
      server.use(httpProxyMiddleware(context, config));
    });
  }

  // Start listening to the server port
  // http://expressjs.com/en/api.html#app.listen
  server.listen(port, host, (err?: Error) => {
    if (err) {
      return deferred.reject(err);
    }

    console.info(`The server is running at http://${host}:${port}`);
  });

  return deferred.promise;
}

export default start;
