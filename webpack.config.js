const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      assets: `${__dirname}/assets/`,
      ts: `${__dirname}/src/`
    },
    mainFields: ['main'],
    extensions: ['.js', '.ts']
  },
  entry: './src/main.ts',
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './html/index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'textures', to: 'textures' },
        { from: 'audio', to: 'audio' },
        { from: 'fonts', to: 'fonts' },
      ],
    }),
  ]
};
