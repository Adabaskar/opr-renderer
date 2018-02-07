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
        const _self = this;
        let _registry = registry
        if (_registry === undefined)
            _registry = new OprContentComponentRegistry();

        const _contentComponentRegisterCache = new Map();

        (function _init() {
            const staticRegister = _registry.getRegister();
            for (let i = 0; i < staticRegister.length; i++)
                _contentComponentRegisterCache.set(staticRegister[i].metadata.contentComponentTypeId, staticRegister[i]);
        })();

        let _domDoc = undefined;
        this.enableDomBasedViewsOnNewContentComponentInstances = function (domDoc) {
            _domDoc = domDoc;
        }

        /**
         * @returns a list containing only the display name and the id of all available content components.
         */
        this.getContentComponentNonVerboseList = function () {
            const resultList = [];
            _contentComponentRegisterCache.forEach((value) => resultList.push(_makeNonVerboseListeElement(value)));
            return resultList;
        }
        function _makeNonVerboseListeElement(contentComponent) {
            return {
                typeId: contentComponent.metadata.contentComponentTypeId,
                name: contentComponent.metadata.defaultDisplayName
            };
        }

        this.getNewContentComponentInstance = function (contentComponentTypeId) {
            const addressedContentComponent = _contentComponentRegisterCache.get(contentComponentTypeId);
            const contenComponentInstance = addressedContentComponent.makeInstance();
            if (_domDoc !== undefined)
                contenComponentInstance.setDomDoc(_domDoc);
            return contenComponentInstance;
        }

        this.getDisplayNameOfContentComponent = function (contentComponentTypeId) {
            const addressedContentComponent = _contentComponentRegisterCache.get(contentComponentTypeId);
            return addressedContentComponent.metadata.defaultDisplayName;
        }

        /**
         * @typedef {Object} ContentViewMetadata
         * @property {string} viewTypeId
         * @property {string} defaultDisplayName
         */

        /**
         * 
         * @param {string} contentComponentTypeId 
         * @returns {ContentViewMetadata[]} the list of content views supported by the addressed content component
         */
        this.getContentViewMetadata = function (contentComponentTypeId) {
            const addressedContentComponent = _contentComponentRegisterCache.get(contentComponentTypeId);
            return addressedContentComponent.metadata.contentViews;
        }

        this.getContentViewDefaultDisplayName = function (contentComponentTypeId, viewTypeId) {
            const viewMetdataList = _self.getContentViewMetadata(contentComponentTypeId);
            for (let i = 0; i < viewMetdataList.length; i++) {
                if (viewMetdataList[i].viewTypeId === viewTypeId)
                    return viewMetdataList[i].defaultDisplayName;
            }
            return null;
        }
    }
}
module.exports = OprContentComponentRepository;