const ContextInfoContentComponent = require('oprr-context-info-content-component');

class OprContentComponentsRegistry {
    constructor() {
        this.getRegister = function () {
            const register = [];
            register.push(ContextInfoContentComponent);

            return register;
        }

    }
}
module.exports = OprContentComponentsRegistry;