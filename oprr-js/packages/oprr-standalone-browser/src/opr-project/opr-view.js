const NonUniformGrid = require('./non-uniform-grid.js');
const clone = require('oprr-utilities').clone;

/**
 * Models a particual one page report view onto the one page report project.
 * A one page report view basically states, which view of the 
 * project's content components is shown at which position on a piece of "paper".
 * 
 */
class OprView {
    constructor() {

        const _layoutGrid = new NonUniformGrid();
        /** @type {Object<string,string>} */
        const _viewNameToViewIdMap = new Map();
        /**
         * @typedef {Object} GridLineNames
         * @property {string} left
         * @property {string} right
         * @property {string} top
         * @property {string} bottom
         */
        /** @type {Object<string, GridLineNames>} */
        const _viewNameToGridLineNamesMap = new Map();
        const _self = this;

        /**
         * DEPRECATED! Interface will be changed soon.
         * @returns {NonUniformGrid}
         */
        this.getLayoutGrid = function () {
            const result = _layoutGrid;
            return result;
        }


        /**
         * @param {string} viewName
         * @param {GridLineNames} line
         */
        this.setContentViewBoundary = function (viewName, lineNames) {
            _viewNameToGridLineNamesMap.set(viewName, clone(lineNames));
        }

        /**
         * @param {string} viewName    
         * @returns {GridLineNames}     
         */
        this.getContentViewBoundaryNames = function (viewName) {
            if (_viewNameToGridLineNamesMap.has(viewName)) {
                return clone(_viewNameToGridLineNamesMap.get(viewName));
            } else {
                return _makeUndefinedLineNames();
            }
        }
        function _makeUndefinedLineNames() {
            return {
                left: undefined,
                right: undefined,
                top: undefined,
                bottom: undefined
            };
        }

        /**
        * @typedef {Object} ViewNameWithGridLineNames
        * @property {string} viewName
        * @property {GridLineNames} lineNames
        */
        /**
         * @returns {ViewNameWithGridLineNames[]}
         */
        this.getContentViewsWithBoundaryList = function () {
            let result = [];
            _viewNameToGridLineNamesMap.forEach((value, key) => result.push(_makeViewNameWithGridLineNamesObject(key, value)));
            return result;
        }
        function _makeViewNameWithGridLineNamesObject(viewName, lineNames) {
            return clone({
                viewName: viewName,
                lineNames: lineNames
            });
        }

        /**
         * @returns {string}[] list of view names
         */
        this.getContentViewNamesList = function () {            
            return Array.from(_viewNameToViewIdMap.keys());
        }

        this.isContentViewNameTaken = function (viewName) {
            return _viewNameToViewIdMap.has(viewName);
        }

        /**
         * 
         * @param {string} contentComponentViewId the id, that is returned by a content component when a new content view is added.
         * @param {string} viewName the id, the user has given to the view to address it when editing and designing the opr view.         
         */
        this.addContentView = function (viewName, contentComponentViewId) {           
            _viewNameToViewIdMap.set(viewName, contentComponentViewId);
        }



    }
}
module.exports = OprView;