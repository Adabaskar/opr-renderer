const validateRequiredArg = require('oprr-utilities').validateRequiredArg;
const OprProject = require('../../opr-project/opr-project.js');
const NonUniformGrid = require('../../opr-project/non-uniform-grid.js');
const OprViewConfiguration = require('../../opr-project/opr-view-configuration.js');

/**
 * Provides methods to implement the Use Case for editing the layout of the current OPR View
 */
class EditCurrentOprViewLayoutUcService {

    /**
     * 
     * @param {OprProject} oprProject 
     */
    constructor(oprProject) {
        validateRequiredArg(oprProject, 'oprProject required');        
        const _oprProject = oprProject;

        /**
         * 
         * @param {string} lineName the unique name of the line within the current layout
         * @param {number} offset offset from left (or right) 
         * @param {boolean} relativeToLeft true if position is relative to left, otherwise false
         */
        this.setVerticalGridLine = function (lineName, offset, relativeToLeft) {
            validateRequiredArg(lineName, 'lineName required');
            validateRequiredArg(offset, 'position required');
            validateRequiredArg(relativeToLeft, 'relativeToLeft required');

            if (!relativeToLeft)
                throw Error('Not Implemented Yet!');

            oprProject.setCurrentOprViewConfigurationVerticalGridLineFromLeft(lineName, offset);           
        }

        this.setHorizontalGridLine = function (lineName, offset, relativeToTop) {
            validateRequiredArg(lineName, 'lineName required');
            validateRequiredArg(offset, 'position required');
            validateRequiredArg(relativeToTop, 'relativeToLeft required');

            if (!relativeToTop)
                throw Error('Not Implemented Yet!');
            
            oprProject.setCurrentOprViewConfigurationHorizontalGridLineFromTop(lineName, offset);
        }

        this.getVerticalGridLineList = function () {
            return oprProject.getCurrentOprViewConfigVerticalGridLineList();
        }

        this.getHorizontalGridLineList = function () {
            return oprProject.getCurrentOprViewConfigHorizontalGridLineList();
        }

        this.getContentViewNamesList = function () {
            return oprProject.getCurrentOprViewConfigurationContentViewNamesList();
        }
        /**
        * @typedef {Object} GridLineNames
        * @property {string} left
        * @property {string} right
        * @property {string} top
        * @property {string} bottom
        */
        /**
         * @param {string} viewName
         * @returns {GridLineNames}
         */
        this.getContentViewBoundary = function (viewName) {
            return oprProject.getCurrentOprViewConfigContentViewBoundary(viewName);
        }

        /**
         * @typedef {Object} ViewNameWithGridLineNames
         * @property {string} viewName
         * @property {GridLineNames} lineNames
         */
        /**
         * @returns {ViewNameWithGridLineNames[]}
         */
        this.getContentViewsWithBoundariesList = function () {
            return oprProject.getCurrentOprViewConfigContentViewsWithBoundaryList();
        }

        /**
         * 
         * @param {string} viewName 
         * @param {GridLineNames} lineNames 
         */
        this.setContentViewBoundaries = function (viewName, lineNames) {
            oprProject.setCurrentOprViewConfigContentViewBoundary(viewName, lineNames);
        }
    }
}
module.exports = EditCurrentOprViewLayoutUcService;