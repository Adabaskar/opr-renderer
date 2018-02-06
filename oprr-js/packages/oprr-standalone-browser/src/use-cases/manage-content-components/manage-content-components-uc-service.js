const OprContentComponentsRepository = require('../../content-components/opr-content-component-repository.js');
const OprProject = require('../../opr-project/opr-project.js');
const validateRequiredArg = require('oprr-utilities').validateRequiredArg;

/**
 * Services all aspects of content component management for the current opr project.
 */
class ManageContentComponentUcService {
    /**
     * 
     * @param {OprProject} oprProject 
     * @param {OprContentComponentsRepository} oprContentComponentRepository 
     */
    constructor(oprProject, oprContentComponentRepository) {
        validateRequiredArg(oprProject, 'OPR Project required');
        validateRequiredArg(oprContentComponentRepository, 'Content Compontent Repository required');

        /**
         * @returns a non verbose array of content component ids and their names, which can be added to the project.
         */
        this.getAddableContentComponents = function () {
            return oprContentComponentRepository.getContentComponentNonVerboseList();
        }

        /**
         * Used to add the identified content component to the current OPR project.
         * @param {*} contentComponentTypeId the type id of the content component that shall be added.
         */
        this.addContentComponent = function (contentComponentTypeId) {
            const contentComponentInstance = oprContentComponentRepository.getNewContentComponentInstance(contentComponentTypeId);

            let name = oprContentComponentRepository.getDisplayNameOfContentComponent(contentComponentTypeId);
            const alreadyAddedContentComponentsOfThatTypeCount = oprProject.getContentComponentTypeCount(contentComponentTypeId);
            if (alreadyAddedContentComponentsOfThatTypeCount > 0)
                name = name + ' ' + alreadyAddedContentComponentsOfThatTypeCount;

            oprProject.addContentComponent(contentComponentInstance, contentComponentTypeId, name);

        }
    }
}
module.exports = ManageContentComponentUcService;
