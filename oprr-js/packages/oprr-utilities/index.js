const clone = require('./src/js/clone.js');
const validateRequiredArg = require('./src/js/validateRequiredParam.js');
const clearHtmlElementChilds = require('./src/dom/clear-element-childs');

module.exports = {
    clone : clone,
    validateRequiredArg : validateRequiredArg,
    clearHtmlElementChilds : clearHtmlElementChilds
}