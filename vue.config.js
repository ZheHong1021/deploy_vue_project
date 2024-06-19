const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  lintOnSave: false,

  transpileDependencies: [
    'vuetify',
  ],
  publicPath: '/deploy_vue_project/',


  //#region (設定代理)
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }

  //#endregion

});
