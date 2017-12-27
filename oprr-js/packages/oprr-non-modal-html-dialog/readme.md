# Non Modal HTML Dialog

This component provides a dragable, resizeable html block element, which can be used as a 
non modal dialog in a browser.

It is bases on https://codepen.io/zz85/pen/gbOoVP/.

## Webpack Dependency

This module was implemented relying on webpack's asset management facilities using style-loader and css-loader
like described in https://webpack.js.org/guides/asset-management/#loading-css. Since no alternative has been investigated it 
is recommended to use a similar module configuration like included in `demo\demo.webpack-config.js`, as well as the required 
dependencies to webpack, style-loader and css-loader
(see https://webpack.js.org/guides/asset-management/#loading-css and `devDependencies` in this module's `package.json`).

