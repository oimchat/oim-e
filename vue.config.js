const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    chainWebpack: (config) => {
        // @scss是你取的静态资源路径别名
        config.resolve.alias.set('@', resolve('src'));
        config.resolve.alias.set('@scss', resolve('src/styles'));
        // 若需要配置多个别名，后续紧跟着设置set即可
        /* config.resolve.alias.set('@scss', resolve('src/static/scss')).set('@',resolve('src'))
    */
    },
    configureWebpack: {

        module: {
            rules: [{
                test: /\.less$/,
                use: [{
                    loader: "less-loader", options: {
                        lessOptions: {
                            javascriptEnabled: true
                        }
                    },
                }],
            }],
        },
        // Configuration applied to all builds
    },

    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                productName: 'OIM-E',
                appId: 'com.oimchat.oim',
                copyright: 'onlyxiahui',
                dmg: {
                    contents: [
                        {
                            x: 410,
                            y: 150,
                            type: 'link',
                            path: '/Applications'
                        },
                        {
                            x: 130,
                            y: 150,
                            type: 'file'
                        }
                    ]
                },
                mac: {
                    icon: 'build/icons/icon.icns'
                },
                win: {
                    icon: 'build/icons/icon.ico',
                    target: [
                        {
                            target: 'nsis',
                            arch: [
                                'ia32'
                            ]
                        }
                    ]
                },
                linux: {
                    icon: 'build/icons'
                },
                directories: {
                    output: 'dist_electron',
                    buildResources: 'build',
                    app: 'dist_electron/bundled'
                },
                files: [
                    '**/*'
                ],
                extraResources: [
                    {
                        from: './public/assets',
                        to: './app/assets'
                    },
                    {
                        from: './public/lib',
                        to: './app/lib'
                    }
                ],
                nsis: {
                    oneClick: false,
                    allowToChangeInstallationDirectory: true,
                    createDesktopShortcut: true,
                    createStartMenuShortcut: true
                }
            }
        },
        quasar: {
            importStrategy: 'kebab',
            rtlSupport: true
        }
    },

    transpileDependencies: [
        'quasar'
    ]
};
