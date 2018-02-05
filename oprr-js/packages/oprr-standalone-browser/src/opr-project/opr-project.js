const IdTakenError = require('../../src/common/id-taken-error.js');
const validateRequiredArg = require('oprr-utilities').validateRequiredArg;
const OprView = require('./opr-view.js');

/**
 * Represents the current OPR Project
 */
class OprProject {
    constructor() {
        /**
                * @typedef {Object} ContentComponentInstanceEnvelope
                * @property {string} typeId
                * @property {string} instanceName the name given to the instance
                * @property {Object} instance the content component instance
                */

        /** @type {Object.<string, ContentComponentInstanceEnvelope} */
        const _contentComponentInstanceIdToInstanceEnvelopeMap = new Map();

        const _currentOprView = new OprView();

        /**
         * 
         * @param {Object} contentComponentInstance the instance of the contentComponent to be added to the project.
         * @param {string} contentComponentTypeId the content component id like provided by its respective meta data.
         * @param {string} contentComponentInstanceName unique name under which the Content Component will be identified by the system and the user, can be specified by the user.
         * @returns {string} the content component id used for this instance within this opr project
         */
        this.addContentComponent = function (contentComponentInstance, contentComponentTypeId, contentComponentInstanceName) {
            validateRequiredArg(contentComponentInstance, 'content component instance required');
            validateRequiredArg(contentComponentTypeId, 'content component type id required');
            validateRequiredArg(contentComponentInstanceName, 'name required');
            const contentComponentInstanceId = contentComponentInstanceName;//use name as id

            if (_contentComponentInstanceIdToInstanceEnvelopeMap.has(contentComponentInstanceId))
                throw new IdTakenError(`${contentComponentInstanceId} already in use`);
            _contentComponentInstanceIdToInstanceEnvelopeMap.set(contentComponentInstanceId, _makeContentComponentInstanceEnvelope(contentComponentInstance, contentComponentInstanceName, contentComponentTypeId));

            return contentComponentInstanceId;
        }

        /**
         * 
         * @param {Object} contentComponentInstance 
         * @param {string} contentComponentInstanceName 
         * @param {string} contentComponentTypeId 
         * @returns {ContentComponentInstanceEnvelope}
         */
        function _makeContentComponentInstanceEnvelope(contentComponentInstance, contentComponentInstanceName, contentComponentTypeId) {
            return {
                typeId: contentComponentTypeId,
                instanceName: contentComponentInstanceName,
                instance: contentComponentInstance
            };
        }

        /**
         * 
         * @param {string} contentComponentInstanceId the instance id, provided when the component instance was added (not the conten component type id).
         * @returns the instance of the content component
         */
        this.getContentComponent = function (contentComponentInstanceId) {
            if (_contentComponentInstanceIdToInstanceEnvelopeMap.has(contentComponentInstanceId))
                return _contentComponentInstanceIdToInstanceEnvelopeMap.get(contentComponentInstanceId).instance;
        }

        /**
         * 
         * @param {string} contentComponentTypeId the content component id like provided by its respective meta data.
         */
        this.getContentComponentTypeCount = function (contentComponentTypeId) {
            let typeCount = 0;

            _contentComponentInstanceIdToInstanceEnvelopeMap.forEach((value) => { if (contentComponentTypeId === value.typeId) typeCount++; });

            return typeCount;
        }

        /**
         * @typedef {Object} ContentComponentInstanceMetadata
         * @property {string} contentComponentInstanceId
         * @property {string} contentComponentInstanceName
         * @property {string} contentComponentTypeId
         */

        /**
         * @returns {ContentComponentInstanceMetadata[]}
         */
        this.getAddedContentComponentInstancesList = function () {
            let result = [];
            _contentComponentInstanceIdToInstanceEnvelopeMap.forEach(
                (envelope, contentComponentInstanceId) =>
                    result.push({
                        contentComponentInstanceId: contentComponentInstanceId,
                        contentComponentInstanceName: envelope.instanceName,
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

        /**
         * 
         * @param {string} contentComponentInstanceId 
         * @param {string} contentViewTypeId 
         * @returns {string} viewId the id of the view within the content component
         */
        this.addContentComponentView = function (contentComponentInstanceId, contentViewTypeId) {
            if (!_contentComponentInstanceIdToInstanceEnvelopeMap.has(contentComponentInstanceId))
                throw new Error(`${contentComponentInstanceId} is an unknown Content Component Instance`);

            /** @type {ContentComponentInstanceEnvelope} */
            const addressedContentComponentInstance = _contentComponentInstanceIdToInstanceEnvelopeMap.get(contentComponentInstanceId);
            const assignedViewId = addressedContentComponentInstance.instance.addDomBasedView(contentViewTypeId);

            return assignedViewId;
        }

        this.getContentViewTypeId = function (contentComponentInstanceId, contentViewId) {
            if (!_contentComponentInstanceIdToInstanceEnvelopeMap.has(contentComponentInstanceId))
                throw new Error(`${contentComponentInstanceId} is an unknown Content Component Instance`);
            return _contentComponentInstanceIdToInstanceEnvelopeMap.get(contentComponentInstanceId).getDomBasedViewTypeId(contentViewId);
        }

        /**
         * @typedef {Object} ContentViewMetadata
         * @property {string} contentViewId
         * @property {string} contentViewName
         * @property {string} contentViewTypeId
         * @property {string} contentViewDisplayName
         * @property {ContentComponentInstanceMetadata} contentComponentInstanceMetadata            
         */

        /**
         * @returns {ContentViewMetadata[]}
         */
        this.getContentViewMetadataInCurrentOprView = function () {
            return [];
        }

    }
}
module.exports = OprProject;
