/**
 * Checks if a required argument was provided to a function (constructor)
 * @param {*} arg the required parameter
 * @param {string} msg message output if argument was not given  
 */
function validateRequiredArg(arg, msg) {
    if(arg == undefined || arg == null) {        
        throw Error(msg);
    }
};
module.exports = validateRequiredArg;