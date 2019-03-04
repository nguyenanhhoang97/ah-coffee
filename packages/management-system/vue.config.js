const path = require('path');
const os = require('os');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  css: undefined,
  // lintOnSave: true,
  baseUrl: undefined,
  assetsDir: 'assets',
  outputDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: os.cpus().length > 1,
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        core: resolve('src/core'),
        store: resolve('src/store'),
        components: resolve('src/components'),
        modules: resolve('src/modules'),
        locales: resolve('src/locales'),
        assets: resolve('src/assets'),
        fonts: resolve('src/assets/fonts'),
        images: resolve('src/assets/images'),
      }
    }
  }
};
