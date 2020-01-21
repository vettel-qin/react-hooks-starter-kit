import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { getClientEnvironment } from '../internal/env';
import lookupEntries from '../internal/lookupEntries';
import * as paths from './paths.config';

const isDev = process.env.NODE_ENV === 'development';
const isVerbose = process.argv.includes('--verbose');
const clientEnv = getClientEnvironment();

const webpackConfig: webpack.Configuration = {
  mode: isDev ? 'development' : 'production',

  context: paths.SRC_DIR,

  // Don't set any entries, it will reslove from the '~/src/entries' directory
  entry: {},

  output: {
    path: paths.BUILD_DIR,
    filename: isDev ? 'chunks/[name].js' : 'chunks/[name].[chunkhash:8].js',
    chunkFilename: isDev ? 'chunks/[name].js' : 'chunks/[name].[chunkhash:8].js',
    publicPath: process.env.PUBLIC_URL,
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      // Allow absolute paths in imports, e.g. import Button from '~/components/Button'
      // Keep in sync with tsconfig.json
      '~': paths.SRC_DIR,
    },
  },

  module: {
    // Make missing exports an error instead of warning
    strictExportPresence: true,

    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },

      // Rules for JS / JSX / TS / TSX
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [
          paths.SRC_DIR,
          paths.resolveModule('query-string'),
          paths.resolveModule('strict-uri-encode'),
          paths.resolveModule('split-on-first'),
        ],

        rules: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: isDev,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false, // for Tree-shaking
                    useBuiltIns: false,
                    loose: true,
                  },
                ],
                [
                  '@babel/preset-react',
                  {
                    development: isDev,
                  },
                ],
              ],
              plugins: [
                [
                  '@babel/plugin-transform-runtime',
                  {
                    corejs: false,
                    helpers: true,
                    regenerator: true,
                    useESModules: true,
                  },
                ],
                '@babel/plugin-syntax-dynamic-import',
                ['import', { libraryName: 'antd-mobile', style: 'css' }],
              ],
            },
          },

          {
            test: /\.(ts|tsx)$/,
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                module: 'esNext', // for Tree-shaking
                sourceMap: isDev,
              },
            },
          },
        ],
      },

      {
        test: /\.(css|less|scss|sass)$/,
        rules: [
          {
            loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          },

          // Process external/third-party styles
          {
            exclude: paths.SRC_DIR,
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
            },
          },

          // Process internal/project styles (from src folder)
          {
            include: paths.SRC_DIR,
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: isDev,
              // CSS Modules https://github.com/css-modules/css-modules
              modules: {
                localIdentName: isDev ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
              },
            },
          },

          // Apply PostCSS plugins including autoprefixer
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                // Add vendor prefixes to CSS rules using values from caniuse.com
                // https://github.com/postcss/autoprefixer
                require('autoprefixer')({
                  // flexbox: 'no-2009', // Recommended for modern browsers
                }),
              ],
            },
          },

          // Compile Less to CSS
          // https://github.com/webpack-contrib/less-loader
          // Install dependencies before uncommenting: yarn add --dev less-loader less
          // {
          //   test: /\.less$/,
          //   loader: 'less-loader',
          //   options: {
          //     sourceMap: isDev,
          //   },
          // },

          // Compile Sass to CSS
          // https://github.com/webpack-contrib/sass-loader
          // Install dependencies before uncommenting: yarn add --dev sass-loader node-sass
          {
            test: /\.(scss|sass)$/,
            loader: 'sass-loader',
            options: {
              prependData: '@import "style/variables.scss";',
              sourceMap: isDev,
              sassOptions: {
                includePaths: [paths.SRC_DIR],
              },
            },
          },
        ],
      },

      {
        test: /\.(bmp|gif|jpg|jpeg|png|svg)$/,
        oneOf: [
          {
            issuer: /\.(css|less|scss|sass)$/,
            oneOf: [
              {
                test: /\.svg$/,
                loader: 'svg-url-loader',
                options: {
                  name: 'assets/[hash:8].[ext]',
                  limit: 8192, // 8kb
                  publicPath: '../',
                },
              },

              {
                loader: 'url-loader',
                options: {
                  name: 'assets/[hash:8].[ext]',
                  limit: 8192, // 8kb
                  publicPath: '../',
                },
              },
            ],
          },

          {
            loader: 'file-loader',
            options: {
              name: 'assets/[hash:8].[ext]',
            },
          },
        ],
      },

      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[hash].[ext]',
        },
      },

      {
        test: /\.(avi|mp3|mp4|mpg|ogg|wav|wmv)$/,
        loader: 'file-loader',
        options: {
          name: 'media/[hash].[ext]',
        },
      },
    ],
  },

  plugins: [
    // Define free variables
    // https://webpack.js.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      'process.env': clientEnv.stringified,
      __DEV__: isDev,
    }),

    // Extracts CSS into separate files
    // https://webpack.js.org/plugins/mini-css-extract-plugin/
    new MiniCssExtractPlugin({
      filename: 'chunks/[name].[contenthash:8].css',
      chunkFilename: 'chunks/[name].[contenthash:8].css',
    }),
  ],

  optimization: {
    minimizer: [
      // Minimize all JavaScript output of chunks
      // https://github.com/webpack-contrib/terser-webpack-plugin
      new TerserPlugin(),

      // Optimize and minimize CSS assets
      // https://github.com/NMFR/optimize-css-assets-webpack-plugin
      new OptimizeCSSAssetsPlugin(),
    ],

    runtimeChunk: {
      name: 'runtime',
    },
  },

  // Don't attempt to continue if there are any errors.
  bail: !isDev,

  // Specify the generated source map
  // https://webpack.js.org/configuration/devtool/
  devtool: isDev ? 'cheap-module-eval-source-map' : false,

  // Configure bundle asset performance warnings
  // https://webpack.js.org/configuration/performance/
  performance: { hints: isDev ? false : 'warning' },

  // Specify what bundle information gets displayed
  // https://webpack.js.org/configuration/stats/
  stats: {
    cached: isVerbose,
    cachedAssets: isVerbose,
    children: isVerbose,
    chunks: isVerbose,
    chunkModules: isVerbose,
    colors: true,
    errorDetails: true,
    hash: isVerbose,
    modules: isVerbose,
    reasons: isDev,
    timings: true,
    version: isVerbose,
  },
};

const entries = lookupEntries();
const webpackEntry = (webpackConfig.entry = {} as webpack.Entry);
const webpackPlugins = webpackConfig.plugins!;
Object.keys(entries).forEach(name => {
  const entry = entries[name];

  webpackEntry[name] = ['./polyfill', entry.script];
  webpackPlugins.push(
    // Simplifies creation of HTML files to serve your webpack bundles
    // https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: `${name}.html`,
      chunks: ['runtime', name],
      hash: isDev,
      minify: {
        collapseWhitespace: !isDev,
      },
      ...(entry.template ? { template: entry.template } : {}),
    }),
  );
});

export default webpackConfig;
