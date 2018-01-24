const validateRequiredArg = require('oprr-utilities').validateRequiredArg;
const OprProject = require('../../opr-project/opr-project.js');
const NonUniformGridLayout = require('../../opr-project/non-uniform-grid-layout.js');
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

        /**
         * 
         * @param {string} lineName the unique name of the line within the current layout
         * @param {number} offset offset from left (or right) 
         * @param {boolean} relativeToLeft true if position is relative to left, otherwise false
         */
        this.setVerticalGridLine = function(lineName, offset, relativeToLeft) {
            validateRequiredArg(lineName, 'lineName required');
            validateRequiredArg(offset, 'position required');
            validateRequiredArg(relativeToLeft, 'relativeToLeft required');

            if(!relativeToLeft)
                throw Error('Not Implemented Yet!');

            oprProject.getCurrentOprView().getLayout().setVerticalGridLineFromLeft(lineName, offset);            
        }

        this.setHorizontalGridLine = function(lineName, offset, relativeToTop) {
            validateRequiredArg(lineName, 'lineName required');
            validateRequiredArg(offset, 'position required');
            validateRequiredArg(relativeToTop, 'relativeToLeft required');

            if(! relativeToTop)
                throw Error('Not Implemented Yet!');

            oprProject.getCurrentOprView().getLayout().setHorizontalGridLineFromTop(lineName, offset);            
        }

        this.getVerticalGridLineList = function() {
            return oprProject.getCurrentOprView().getLayout().getVerticalGridLineList();
        }

        this.getHorizontalGridLineList = function() {
            return oprProject.getCurrentOprView().getLayout().getHorizontalGridLineList();
        }

        this.getContentComponentViewList = function() {
            return [];
        }

        this.getContentComponentViewsLayoutGridLineNames = function(viewName) {
            return {
                left: undefined,
                right: undefined,
                top : undefined,
                bottom : undefined
            };
        }

        this.setContentComponentViewsLayoutGridLineNames = function(viewName, lineNames) {

        }
    }
}
module.exports = EditCurrentOprViewLayoutUcService;