const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Html = require('html-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDevelop = process.env.NODE_ENV === 'development';
const isProduct = !isDevelop;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };
  if (isProduct) {
    config.minimizer = [
      new TerserPlugin(),
      new OptimizeCssAssetsPlugin(),
    ];
  }
  return config;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    script: './script/script.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: optimization(),
  // resolve: {
  //   alias: {
  //     '@style': path.resolve(__dirname, 'src/style'),
  //   },
  // },
  plugins: [
    new Html({
      template: './index.html',
      minify: {
        collapseWhitespace: isProduct,
      },
    }),
    new CleanWebpackPlugin(),
    new Copy([
      {
        from: path.resolve(__dirname, 'src/assets/'),
        to: path.resolve(__dirname, 'dist/assets/'),
      },
    ]),
    new MiniCss({
      filename: 'style.css',
    }),
  ],
  devServer: {
    port: 4700,
    hot: isDevelop,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.css$/,
        loader: [
          {
            loader: MiniCss.loader,
            options: {
              hmr: isDevelop,
              reloadAll: true,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: 'file-loader',
      },
    ],
  },
};
