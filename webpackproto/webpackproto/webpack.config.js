const path = require('path');

module.exports = {
    entry: {      
        simpleBlockRenderingDemo : './src/simple-block-rendering-demo.js',
        simpleRefreshTryOut : './src/simple-refresh-tryout.js',
        htmlFileAPITryout : './src/html-file-api-tryout.js',        
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};