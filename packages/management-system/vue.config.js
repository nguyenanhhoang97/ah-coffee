const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: true,
  baseUrl: undefined,
  outputDir: undefined,
  assetsDir: 'assets',
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  css: undefined,
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        types: resolve('@types'),
        core: resolve('src/core'),
        mixins: resolve('src/mixins'),
        components: resolve('src/components'),
        modules: resolve('src/modules'),
        locales: resolve('src/locales'),
        gql: resolve('src/graphql'),
        assets: resolve('src/assets'),
        fonts: resolve('src/assets/fonts'),
        images: resolve('src/assets/images')
      }
    }
  }
};
