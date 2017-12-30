const OprContentComponentRegistry = require('./opr-content-components-registry.js');


/**
 * Repository of available Content Components that can be used in an OPR.
 */
class OprContentComponentRepository {

    /**
     * 
     * @param {OprContentComponentRegistry} registry optional, for testing purposes
     */
    constructor(registry) {
        let _registry = registry
        if (_registry === undefined)
            _registry = new OprContentComponentRegistry();

        const _contentComponentRegisterCache = new Map();

        (function _init() {
            const staticRegister = _registry.getRegister();
            for (let i = 0; i < staticRegister.length; i++)
                _contentComponentRegisterCache.set(staticRegister[i].metadata.contentComponentTypeId, staticRegister[i]);
        })();

      

        /**
         * @returns a list containing only the name and the id of all available content components.
         */
        this.getContentComponentNonVerboseList = function () {
            const resultList = [];
            _contentComponentRegisterCache.forEach((value) => resultList.push(_makeNonVerboseListeElement(value)));
            return resultList;
        }
        function _makeNonVerboseListeElement(contentComponent) {
            return {
                typeId: contentComponent.metadata.contentComponentTypeId,
                name: contentComponent.metadata.getDisplayName()
            };
        }

        this.getNewContentComponentInstance = function(contentComponentTypeId) {            
            const addressedContentComponent = _contentComponentRegisterCache.get(contentComponentTypeId);
            return addressedContentComponent.makeInstance();
        }

        this.getNameOfContentComponent = function(contentComponentTypeId) {
            const addressedContentComponent = _contentComponentRegisterCache.get(contentComponentTypeId);
            return addressedContentComponent.metadata.getDisplayName();
        }
    }
}
module.exports = OprContentComponentRepository;