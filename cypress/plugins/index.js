// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const webpack = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config

    const options = {
        // send in the options from your webpack.config.js, so it works the same
        // as your app's code
        // webpackOptions: require('../../webpack.config'),
        webpackOptions: {
            mode: "development",
            module: {
                rules: [
                    {
                        test: /\.js?$/,
                        exclude: [/node_modules/],
                        use: [{
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                                plugins: [
                                    '@babel/plugin-proposal-class-properties',
                                    '@babel/plugin-proposal-object-rest-spread',
                                    '@babel/plugin-syntax-dynamic-import',
                                    '@babel/plugin-transform-runtime',
                                ],
                            },
                        }],
                    },
                ],
            },
        },
        watchOptions: {},
    }

    on('file:preprocessor', webpack(options))
}
