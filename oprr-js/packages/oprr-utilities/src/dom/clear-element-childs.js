/**
 * Removes all child elements of argument
 * @param {HTMLElement} domElement 
 */
const clearElementChilds = function (domElement) {
    while (domElement.hasChildNodes())
        domElement.removeChild(domElement.firstChild);
    return domElement;
}
module.exports = clearElementChilds;