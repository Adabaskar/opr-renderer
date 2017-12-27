const NonModalDilalog = require('../index.js');

/**
 * adds the non modal dialog to the body
 */

 (function main() {

    const nonModalDialog = new NonModalDilalog(document);

    document.body.appendChild(nonModalDialog.getDomSubtree());

 })()