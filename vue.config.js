const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  lintOnSave: false,

  transpileDependencies: [
    'vuetify',
  ],
  publicPath: '/deploy_vue_project/',
});
