module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    config.module.rule('pdf')
      .test(/\.pdf$/i)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: '[1]-[name].[ext]',
      })
      .end();
  },
  pwa: {
    name: "Attest'n'go'",
    themeColor: '#ffffff',
    msTileColor: '#FFFFFF',
    manifestOptions: {
      background_color: '#FFFFFF',
    },
    workboxOptions: {
      skipWaiting: true,
    },
  },
};
