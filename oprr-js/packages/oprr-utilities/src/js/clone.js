
const deepCopyMixin = require('./deep-copy-mixin');

/**
 * See "JavaScript: Novice to Ninja, 2nd Edition Ch. 12".
 * @param {*} cloned object a clone is made from
 */
const clone = function(cloned) {
    const cloneResult = Object.create(Object.getPrototypeOf(cloned));
    deepCopyMixin(cloneResult, cloned);
    return cloneResult;
}
module.exports = clone;

