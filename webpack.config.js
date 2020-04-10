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

const indexConfig = {
  entry: {
    index: './script/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
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
};

const categoriesConfig = {
  entry: {
    categories: './script/categories.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/pages'),
  },
  plugins: [
    new Html({
      filename: 'categories.html',
      template: './pages/categories.html',
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
      filename: 'categories.css',
    }),
  ],
};

const common = {
  context: path.resolve(__dirname, 'src'),
  optimization: optimization(),
  devServer: {
    port: 4700,
    hot: isDevelop,
  },
  devtool: isDevelop ? 'source-map' : '',
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      // },
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

module.exports = [{
  ...common,
  ...indexConfig,
}, {
  ...common,
  ...categoriesConfig,
}];
