const path = require('path');

module.exports = {
    entry: {
        plainopr: ['babel-polyfill', './js/plainopr.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
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
            }
        ]
    }


};