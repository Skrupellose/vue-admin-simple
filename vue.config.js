const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  // 输出文件目录
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  /**
   * webpack配置,see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
   **/
  // chainWebpack: (config) => {
  //     config.resolve = { // 配置解析别名
  //       extensions: ['.js', '.json', '.vue'],
  //       alias: {
  //         '@': resolve(__dirname, './src'),
  //         'public': resolve(__dirname, './public'),
  //         'components': resolve(__dirname, './src/components'),
  //         'common': resolve(__dirname, './src/common'),
  //         'api': resolve(__dirname, './src/api'),
  //         'views': resolve(__dirname, './src/views'),
  //         'data': resolve(__dirname, './src/data')
  //       }
  //     }
  //   },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('api', resolve('./src/api'))
      .set('views', resolve('./src/views'))
      .set('assets', resolve('./src/assets'))
    //set第一个参数：设置的别名，第二个参数：设置的路径
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
        include: ["./src/icons"]
      });
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        prependData: `@import "./src/styles/main.scss";`
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    // modules: false,
    // vue cli3使用css.requireModuleExtension代替css.modules
    requireModuleExtension: true
    // false 无法引入element ui css样式
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  /**
   *  PWA 插件相关配置,see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
   */
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: false, // 编译完成是否打开网页
    host: '0.0.0.0', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080, // 访问端口
    https: false, // 编译失败时刷新页面
    hot: true, // 开启热加载
    hotOnly: false,
    proxy: null, // 设置代理
    proxy: {
      '/proxyApi': {
        target: 'http://www.web-jshtml.cn/vue_admin_api/token',
        changeOrigin: true,
        pathRewrite: {
          '^/proxyApi': ''
        }
      }
    },
    overlay: { // 全屏模式下是否显示脚本错误
      warnings: true,
      errors: true
    },
    before: app => {
    }
  },
  /**
   * 第三方插件配置
   */
  pluginOptions: {}
}
