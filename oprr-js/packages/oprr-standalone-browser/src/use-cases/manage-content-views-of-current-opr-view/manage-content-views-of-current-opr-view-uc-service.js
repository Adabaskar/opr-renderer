const validateRequiredArg = require('oprr-utilities').validateRequiredArg;
const OprProject = require('../../opr-project/opr-project.js');
const OprContentComponentRepository = require('../../content-components/opr-content-component-repository.js');

class ManageContentViewsOfCurrentOprViewUcService {

    /**
   * 
   * @param {OprProject} oprProject 
   * @param {OprContentComponentRepository} contentComponentRepo
   */
    constructor(oprProject, contentComponentRepo) {
        validateRequiredArg(oprProject, 'oprProject required');
        validateRequiredArg(contentComponentRepo, 'contentComponentRepo required');
        const _oprProject = oprProject;
        const _contentComponentRepo = contentComponentRepo;

        /**
         * @typedef {Object} AvailableContentComponentMetadata
         * @property {string} contentComponentInstanceId
         * @property {string} contentComponentInstanceName
         */
        /**
         * @returns {AvailableContentComponentMetadata[]}
         */
        this.getAvailableContentComponentInstancesList = function () {
            const addedContentComponentsList = _oprProject.getAddedContentComponentInstancesList();
            let result = [];
            addedContentComponentsList.forEach(element => {
                result.push({
                    contentComponentInstanceId: element.contentComponentInstanceId,
                    contentComponentInstanceName: element.contentComponentInstanceName
                }
                );
            });
            return result;
        }

        /**
         * @typedef {Object} ContentViewSelectOption
         * @property {string} typeId
         * @property {string} displayName
         */

        /**
         * @param {string} contentComponentName the name of the content component instance in the currrent opr project
         * @returns {ContentViewSelectOption[]}
         */
        this.getAvailableContentViewOptions = function (contentComponentInstanceId) {
            const addedContentComponentsList = _oprProject.getAddedContentComponentInstancesList();
            let found = false;
            let i = 0;
            let lastInspectedElementsTypeId = null;
            while (!found && i < addedContentComponentsList.length) {
                const inspectedContentComponent = addedContentComponentsList[i++];
                found = inspectedContentComponent.contentComponentInstanceId === contentComponentInstanceId;
                lastInspectedElementsTypeId = inspectedContentComponent.contentComponentTypeId;
            }
            if (found) {
                const contentViewMetadataList = _contentComponentRepo.getContentViewMetadata(lastInspectedElementsTypeId);
                let result = []
                contentViewMetadataList.forEach(metadata => result.push({ typeId: metadata.viewTypeId, displayName: metadata.defaultDisplayName }));
                return result;
            } else {
                return [];
            }
        }

        /**
         * 
         * @param {string} contentViewName 
         * @param {string} contentComponentName 
         * @param {string} contentViewTypeId 
         */
        this.addContentView = function (contentViewName, contentComponentInstanceId, contentViewTypeId) {
            validateRequiredArg(contentViewName, 'Content View Name required');
            validateRequiredArg(contentComponentInstanceId, 'Content Component required');
            validateRequiredArg(contentViewTypeId, 'Content View Type Id required');
            if (contentViewName.trim().length == 0)
                throw new Error('Content View Name is empty');

            const viewId = _oprProject.addContentComponentView(contentComponentInstanceId, contentViewTypeId);
            _oprProject.getCurrentOprView().addContentView(contentViewName, contentComponentInstanceId, viewId);
        }
        /**
        * @typedef {Object} AddedContentViewListeElement
        * @property {string} contentViewId
        * @property {string} contentViewName        
        * @property {string} contentViewTypeDisplayName
        * @property {string} contentComponentInstanceId
        * @property {string} contentComponentInstanceName
        * @property {string} contentComponentTypeDisplayName
        */

        /**
         * @returns {AddedContentViewListeElement[]}
         */
        this.getAddedContentViewsList = function () {
            return [];
        }
    }
}
module.exports = ManageContentViewsOfCurrentOprViewUcService;