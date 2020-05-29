// primitive value： 原始值
// plain object：纯粹对象
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        // 普通的'.scss'文件和'*.vue'文件中的
        // <style lang="scss">块都应用它
        // import '*.scss'也可以使用
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // 全局共享变量
              // 也可以是一个文件路径
              // sass-loader 版本 < 8 这里是data
              prependData: `$color: red;`
            }
          }
        ]
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugin: [
    new VueLoaderPlugin()
  ]
}