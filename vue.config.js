module.exports = {
  configureWebpack: {
    module: {
      rules: [{
        test: /\.less$/,
        use: [{
          loader: 'less-loader', options: {
            javascriptEnabled: true,
          },
        }],
      }],
    },
    // Configuration applied to all builds
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        'productName': 'OIM-E',
        'appId': 'com.oimchat.oim',
        'copyright': 'onlyxiahui',//版权  信息
        'dmg': {
          'contents': [
            {
              'x': 410,
              'y': 150,
              'type': 'link',
              'path': '/Applications',
            },
            {
              'x': 130,
              'y': 150,
              'type': 'file',
            },
          ],
        },
        'mac': {
          'icon': 'build/icons/icon.icns',
        },
        'win': {
          'icon': 'build/icons/icon.ico',
          'target': [
            {
              'target': 'nsis',
              'arch': [
                'ia32',
              ],
            },
          ],
        },
        'linux': {
          'icon': 'build/icons',
        },
        // 'asar': false,
        'directories': {
          'output': 'dist_electron',
          'buildResources': 'build',
          'app': 'dist_electron/bundled',
        },
        'files': ['**/*'],
        'extraResources': [
          { // 拷贝dll等静态文件到指定位置
            'from': './public/assets',
            'to': './app/assets',
          },
          { // 拷贝dll等静态文件到指定位置
            'from': './public/lib',
            'to': './app/lib',
          },
        ],
        'nsis': {
          'oneClick': false,
          'allowToChangeInstallationDirectory': true,
          'createDesktopShortcut': true,
          'createStartMenuShortcut': true,
        },
      },
    },
  },
};
