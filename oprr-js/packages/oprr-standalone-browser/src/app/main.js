const OprStandaloneBrowserApp = require('./oprr-standalone-browser-app.js');

(function main() {
    const app = new OprStandaloneBrowserApp(window);
    app.start();
})();