const validateRequiredArg = require('oprr-utilities').validateRequiredArg;
const OprProject = require('../../opr-project/opr-project.js');

class ManageContentViewsOfCurrentOprViewUcService {

    /**
   * 
   * @param {OprProject} oprProject 
   */
    constructor(oprProject) {
        validateRequiredArg(oprProject, 'oprProject required');
        const _oprProject = oprProject;

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
            return [];
        }
    }
}
module.exports = ManageContentViewsOfCurrentOprViewUcService;