const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify',
  ],
  publicPath: '/deploy_vue_project/',
});
