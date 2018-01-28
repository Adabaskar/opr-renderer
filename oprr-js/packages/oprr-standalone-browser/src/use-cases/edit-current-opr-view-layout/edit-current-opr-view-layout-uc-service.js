const validateRequiredArg = require('oprr-utilities').validateRequiredArg;
const OprProject = require('../../opr-project/opr-project.js');
const NonUniformGrid = require('../../opr-project/non-uniform-grid.js');
const OprView = require('../../opr-project/opr-view.js');

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

            oprProject.getCurrentOprView().getLayoutGrid().setVerticalGridLineFromLeft(lineName, offset);
        }

        this.setHorizontalGridLine = function (lineName, offset, relativeToTop) {
            validateRequiredArg(lineName, 'lineName required');
            validateRequiredArg(offset, 'position required');
            validateRequiredArg(relativeToTop, 'relativeToLeft required');

            if (!relativeToTop)
                throw Error('Not Implemented Yet!');
            
            oprProject.getCurrentOprView().getLayoutGrid().setHorizontalGridLineFromTop(lineName, offset);
        }

        this.getVerticalGridLineList = function () {
            return oprProject.getCurrentOprView().getLayoutGrid().getVerticalGridLineList();
        }

        this.getHorizontalGridLineList = function () {
            return oprProject.getCurrentOprView().getLayoutGrid().getHorizontalGridLineList();
        }

        this.getContentViewsList = function () {
            return oprProject.getCurrentOprView().getContentViewsList();
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
            return oprProject.getCurrentOprView().getContentViewBoundaryNames(viewName);
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
            return oprProject.getCurrentOprView().getContentViewsWithBoundaryList();
        }

        /**
         * 
         * @param {string} viewName 
         * @param {GridLineNames} lineNames 
         */
        this.setContentViewBoundaries = function (viewName, lineNames) {
            oprProject.getCurrentOprView().setContentViewBoundary(viewName, lineNames);
        }
    }
}
module.exports = EditCurrentOprViewLayoutUcService;