const path = require('path');

module.exports = {
    entry: {
        "oprr-standalone-browser": ['babel-polyfill', './src/app/main.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: [
                            [require.resolve('babel-preset-env'),
                            {
                                targets: {
                                    browsers: ['last 2 versions', "IE 11"]
                                }
                            }
                            ]
                        ]
                    }
                }
            },
            {
                test : /\.css$/,
                use : [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }


};