const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ConcatPlugin = require('webpack-concat-plugin');

module.exports = {
 entry: ['./assets/scss/main.scss', './assets/js/general.js'],
 output: {
  filename: 'js/main.js',
  path: path.resolve(__dirname, "dist/"),
},
externals: {
  jquery: "jQuery"
},
devtool: "source-map",
watch: true,
module: {
  rules: [{
    test: /\.(sa|sc|c)ss$/,
    use: [
    { loader: MiniCssExtractPlugin.loader },
    { loader: "css-loader", options: { sourceMap: true, minimize: true} },
    {
      loader: 'resolve-url-loader',
      options: {
        root: 'assets',
        includeRoot: true,
      },
    },
    {
      loader: "sass-loader",
      options: { sourceMap: true, includePaths: ['./node_modules'] }
    }
    ]
  },
  {
    test: /\.(png|svg|jpg|gif|db)$/,
    use: [
    {
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]',
        context: path.resolve(__dirname, "assets/"),
        publicPath: '../',
        useRelativePaths: true
      }
    }
    ] 
  }, 
  {
    test: /\.js$/,
    loader: 'babel-loader',
    query: {
      presets: ['es2015'],
      plugins: ['transform-object-assign']
    },
  }
  ]
},
plugins: [
new MiniCssExtractPlugin({
  filename: "css/main.css"
}),

new ConcatPlugin({
  uglify: true,
  sourceMap: true,
  name: 'result',
  outputPath: '../dist',
  fileName: 'js/vendor.js',
  filesToConcat: [
  'jquery/dist/jquery.min.js',
  './assets/js/vendor/slick.min.js', 
  './assets/js/vendor/modernizer.js', 
  './assets/js/vendor/jquery.touchSwipe.min.js',  
  './assets/js/vendor/Chart.min.js', 
  './assets/js/vendor/Chart.roundedBarCharts.min.js', 
  './assets/js/vendor/utils.js', 
  'chartjs-plugin-labels/src/chartjs-plugin-labels.js',  
  './service-worker.js', 
  './assets/js/custom-general.js',
  './assets/js/chart-custom.js',

  ],
  attributes: {
    async: true
  }
}),

new CopyWebpackPlugin([
  { from: 'assets/images', to: 'images', toType: 'dir' },
  ])

]
};