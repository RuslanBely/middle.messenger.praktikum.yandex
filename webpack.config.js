const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './static/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle-[hash].js',
    clean:true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    alias: { handlebars: 'handlebars/dist/handlebars.js' },
  },
  devServer: {
    open: true,
    port: 3030
  },
  module: {
    rules: [
      { test: /\.hbs/, loader: 'handlebars-loader' },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',        
        exclude: ['/node_modules/'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(svg|png|jpg|gif)([\?]?.*)$/,
        use: [
          {
            loader: 'file-loader?name=img/[name]-[hash].[ext]',
          },
        ],
      },
      
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: './static/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style-[hash].css',
    }),
  ],
};
