const IdTakenError = require('../../src/common/id-taken-error.js');
const validateRequiredArg = require('oprr-utilities').validateRequiredArg;
const OprView = require('./opr-view.js');

/**
 * Represents the current OPR Project
 */
class OprProject {
    constructor() {

        const _contentComponents = new Map();

        const _currentOprView = new OprView();

        /**
         * 
         * @param {Object} contentComponentInstance the instance of the contentComponent to be added to the project.
         * @param {string} contentComponentTypeId the content component id like provided by its respective meta data.
         * @param {string} name unique name under which the Content Component will be identified by the system and the user, can be specified by the user.
         */
        this.addContentComponent = function (contentComponentInstance, contentComponentTypeId, name) {
            validateRequiredArg(contentComponentInstance, 'content component instance required');
            validateRequiredArg(contentComponentTypeId, 'content component type id required');
            validateRequiredArg(name, 'name required');

            if (_contentComponents.has(name))
                throw new IdTakenError(`${name} already in use`);
            _contentComponents.set(name, _makeContentComponentInstanceEnvelope(contentComponentInstance, contentComponentTypeId));

            //  _logAllAddedComponentsToConsole();
        }
        function _logAllAddedComponentsToConsole() {
            _contentComponents.forEach((value, name) => { console.log(`Project has ContenComponentInstance of type ${value.typeId} named ${name}`); });
        }

        /**
         * @typedef {Object} ContentComponentInstanceEnvelope
         * @property {string} typeId
         * @property {string} instance
         */

        /**
         * 
         * @param {string} contentComponentInstance 
         * @param {string} contentComponentTypeId 
         */
        function _makeContentComponentInstanceEnvelope(contentComponentInstance, contentComponentTypeId) {
            return {
                typeId: contentComponentTypeId,
                instance: contentComponentInstance
            };
        }

        /**
         * 
         * @param {string} name the instance name, provided when the component instance was added (not the conten component type id).
         * @returns the instance of the content component
         */
        this.getContentComponent = function (name) {
            if (_contentComponents.has(name))
                return _contentComponents.get(name).instance;
        }

        /**
         * 
         * @param {string} contentComponentTypeId the content component id like provided by its respective meta data.
         */
        this.getContentComponentTypeCount = function (contentComponentTypeId) {
            let typeCount = 0;

            _contentComponents.forEach((value) => { if (contentComponentTypeId === value.typeId) typeCount++; });

            return typeCount;
        }

        /**
         * @typedef {Object} AddedContentComponentsListElement
         * @property {string} contentComponentName
         * @property {string} contentComponentTypeId
         */

        /**
         * @returns {AddedContentComponentsListElement}[]
         */
        this.getAddedContentComponentsList = function () {
            let result = [];
            _contentComponents.forEach(
                (envelope, contentComponentName) =>
                    result.push({
                        contentComponentName: contentComponentName,
                        contentComponentTypeId: envelope.typeId
                    })
            );
            return result;
        }

        /**
         * @returns {OprView}
         */
        this.getCurrentOprView = function () {
            return _currentOprView;
        }
    }
}
module.exports = OprProject;
