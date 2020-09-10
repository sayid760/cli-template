const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const OptimizeCss=require('optimize-css-assets-webpack-plugin');
const UglifyjsPlugin=require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = {
  mode: 'development',
  entry: {
    app: resolve('../src/main.js'),
  },
  output: {
    path: resolve('../dist'),
    publicPath: '/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
        '@': resolve('src')
    },
    extensions: ['.ts','.js', '.jsx', '.vue', '.md'],
  },
  devServer: {
    disableHostCheck: true,
    hot: true,
    open: true,
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css', // 把css抽离到[name].css
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'public/index.html',
        favicon: 'public/favicon.ico',
        pathname: '/',
        chunks: ['app'],
        inject: true,
    }),
    new VueLoaderPlugin()
  ],
};


if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // module.exports.plugins = (module.exports.plugins || []).concat([])
  module.exports.optimization = { // 优化项
    minimizer:[
      new UglifyjsPlugin({
          cache:true, //是否缓存
          parallel:true, // 是否并发压缩，一起压缩
          sourceMap:true //是否源码调试
      }),
      new OptimizeCss({
        assetNameRegExp:/\.css$/g,
        cssProcessor:require('cssnano')
      })
    ]
  }
}