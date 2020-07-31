module.exports = {
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
