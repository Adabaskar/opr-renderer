const path = require('path');

module.exports = {
    entry: {
        simpleBlockRenderingDemoBabeled: ['babel-polyfill', './src/simple-block-rendering-demo.js'],
        htmlFileAPITryoutBabeled : ['babel-polyfill','./src/html-file-api-tryout.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [     
            {       
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['es2015'],
               // plugins: [require('transform-runtime')]
              }
            }
        }
        ]
    }    
  
  
};