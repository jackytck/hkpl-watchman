require('dotenv').config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Load *package.json* so we can use `dependencies` from there
const pkg = require('./package.json');

// Detect how npm is run and branch based on that
const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  react: path.join(__dirname, 'node_modules/react/dist/react.min.js'),
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
  style: path.join(__dirname, 'src/style/main.sass'),
  template: path.join(__dirname, 'src/template/index.html'),
  favicon: path.join(__dirname, 'src/style/favicon.ico')
};

const common = {
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  entry: {
    src: PATHS.src,
    style: PATHS.style
  },
  output: {
    path: PATHS.build,
    // filename: 'bundle.js'

    // Output using the entry name
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Alti-React',
      template: PATHS.template,
      inject: 'body',
      favicon: PATHS.favicon
    })
  ]
};

// Default configuration. We will return this if
// Webpack is called outside of npm.
if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env to allow customization.
      //
      // If you use Vagrant or Cloud9, set
      // host: process.env.HOST || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default localhost
      host: process.env.HOST,
      port: process.env.PORT

      // If you want defaults, you can use a little trick like this
      // port: process.env.PORT || 3000
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({
        save: true // --save
      })
    ],
    module: {
      loaders: [
        // Define development specific CSS setup
        {
          // Test expects a RegExp! Note the slashes!
          test: /\.css$/,
          loaders: ['style', 'css'], // loaders are evaluated from right to left
          // Include accepts either a path or an array of paths.
          include: PATHS.style
        },
        {
          test: /\.sass$/,
          loaders: ['style', 'css', 'sass'],
          include: PATHS.style
        }
      ]
    }
  });
}

if(TARGET === 'build' || TARGET === 'stats') {
  module.exports = merge(common, {
    // Define vendor entry point needed for splitting
    entry: {
      // Set up an entry chunk for our vendor bundle.
      // You can filter out dependencies here if needed with
      // `.filter(...)`.
      vendor: Object.keys(pkg.dependencies)
    },
    output: {
      path: PATHS.build,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js'
    },
    module: {
      loaders: [
        // Extract CSS during build
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css'),
          include: PATHS.style
        },
        {
          test: /\.sass$/,
          loader: ExtractTextPlugin.extract('style', 'css!sass'),
          include: PATHS.style
        }
      ]
    },
    plugins: [
      // Output extracted CSS to a file
      new ExtractTextPlugin('[name].[chunkhash].css'),
      new CleanWebpackPlugin([PATHS.build]),
      // Extract vendor and manifest files
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      // Setting DefinePlugin affects React library size!
      // DefinePlugin replaces content "as is" so we need some
      // extra quotes for the generated code to make sense
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        'process.env.WRAP_API_KEY': `'${process.env.WRAP_API_KEY}'`

        // You can set this to '"development"' or
        // JSON.stringify('development') for your
        // development target to force NODE_ENV to development mode
        // no matter what
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}
