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
            _oprProject.addContentViewToCurrentOprViewConfig(contentViewName, contentComponentInstanceId, viewId);
        }
        /**
        * @typedef {Object} AddedContentViewListeElement
        * @property {string} contentViewId from current opr view via opr project, created by content component instance
        * @property {string} contentViewName from current opr view via opr project, specified by user
        * @property {string} contentViewTypeDisplayName from repo using view type id with content component type id
        * @property {string} contentComponentInstanceId from op project, assigned during instance addition
        * @property {string} contentComponentInstanceName from opr project, specifiable by user
        * @property {string} contentComponentTypeDisplayName from repo useing content component type id
        */

        /**
         * @returns {AddedContentViewListeElement[]}
         */
        this.getAddedContentViewsList = function () {
            const contentViewsInCurrentOprViewList = _oprProject.getContentViewMetadataInCurrentOprView();
            const resultList = [];
            for(let i=0; i<contentViewsInCurrentOprViewList.length; i++) {
                const viewMetadata = contentViewsInCurrentOprViewList[i];
                const ccTypeId = viewMetadata.contentComponentInstanceMetadata.contentComponentTypeId;
                const viewTypeId = viewMetadata.contentViewTypeId;
                const resultElement = {
                    contentViewId : viewMetadata.contentViewId,
                    contentViewName : viewMetadata.contentViewName,
                    contentViewTypeDisplayName : _contentComponentRepo.getContentViewDefaultDisplayName(ccTypeId, viewTypeId),
                    contentComponentInstanceId : viewMetadata.contentComponentInstanceMetadata.contentComponentInstanceId,
                    contentComponentInstanceName : viewMetadata.contentComponentInstanceMetadata.contentComponentInstanceName,
                    contentComponentTypeDisplayName : _contentComponentRepo.getDisplayNameOfContentComponent(ccTypeId)
                };
                resultList.push(resultElement);
            }

            return resultList;
        }
    }
}
module.exports = ManageContentViewsOfCurrentOprViewUcService;