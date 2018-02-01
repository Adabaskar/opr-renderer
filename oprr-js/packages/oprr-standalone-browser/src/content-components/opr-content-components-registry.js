const ContextInfoContentComponent = require('oprr-context-info-content-component');

class OprContentComponentsRegistry {
    constructor() {
        const _register = [];
        _register.push(ContextInfoContentComponent);

        this.getRegister = function () {
            return _register;
        }

    }
}
module.exports = OprContentComponentsRegistry;