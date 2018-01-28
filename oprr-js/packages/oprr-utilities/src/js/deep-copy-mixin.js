/**
 * 
 * This is basicaly the mixin-util code found in "JavaScript: Novice to Ninja, 2nd Edition, Ch.12." 
 * 
 * @param {*} target the object extended by the mixin
 * @param {*} mixedInObject members of this object are recursively copied to the target
 */
const deepCopyMixin = function (target, mixedInObject) {

    if (typeof mixedInObject === 'object') {
        for (const key of Object.keys(mixedInObject)) {            
            if (typeof mixedInObject[key] === 'object') {
                target[key] = Array.isArray(mixedInObject[key]) ? [] : {};
                deepCopyMixin(target[key], mixedInObject[key]);
            } else {
                Object.assign(target, mixedInObject);
            }
        }
    }
 
    return target;
}
module.exports = deepCopyMixin;