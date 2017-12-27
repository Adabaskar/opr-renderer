const path = require('path');

module.exports = {
    entry: {
        demo: ['babel-polyfill', './demo/oprr-non-modal-html-dialog-demo.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '.')
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