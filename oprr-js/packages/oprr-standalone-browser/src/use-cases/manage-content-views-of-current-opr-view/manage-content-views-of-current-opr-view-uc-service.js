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
         * @returns {string}[] names of content components in the current opr project
         */
        this.getAvailableContentComponents = function () {
            const addedContentComponentsList = _oprProject.getAddedContentComponentsList();
            let result = [];
            addedContentComponentsList.forEach(element => {
                result.push(element.contentComponentName);
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
        this.getAvailableContentViewOptions = function (contentComponentName) {
            const addedContentComponentsList = _oprProject.getAddedContentComponentsList();
            let found = false;
            let i=0;
            let lastInspectedElementsTypeId = null;
            while (!found && i<addedContentComponentsList.length) {
                const inspectedContentComponent = addedContentComponentsList[i++];
                found = inspectedContentComponent.contentComponentName === contentComponentName;
                lastInspectedElementsTypeId = inspectedContentComponent.contentComponentTypeId;
            }
            if(found) {
                const contentViewMetadataList = _contentComponentRepo.getContentViewMetadata(lastInspectedElementsTypeId);
                let result = []
                contentViewMetadataList.forEach(metadata => result.push({typeId: metadata.viewTypeId, displayName: metadata.defaultDisplayName }));
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
        this.addContentView = function(contentViewName, contentComponentName, contentViewTypeId) {
            
        }
    }
}
module.exports = ManageContentViewsOfCurrentOprViewUcService;