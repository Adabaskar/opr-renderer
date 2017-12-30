class IdTakenError extends Error {
    constructor(msg) {
        super(msg);
    }
}
module.exports = IdTakenError;