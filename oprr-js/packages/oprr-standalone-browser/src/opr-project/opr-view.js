const NonUniformGrid = require('./non-uniform-grid.js');
const clone = require('oprr-utilities').clone;
const validateRequiredArg = require('oprr-utilities').validateRequiredArg;

/**
 * Models a particual one page report view onto the one page report project.
 * A one page report view basically states, which view of the 
 * project's content components is shown at which position on a piece of "paper".
 * 
 */
class OprView {
    constructor() {

        const _layoutGrid = new NonUniformGrid();
        /**
      * @typedef {Object} ContentViewCoordinates
      * @property {string} contentComponentInstanceId
      * @property {string} contentViewId
      */
        /**
         * We stick with the (user specified) name, when a system id shall be introduced it must
         * be generated in class, since one must not oversee that the viewId which is part of the ViewCoordinates, is an id reltive to
         * the corresponding content component instance and cannot be reused as an system id here.
         */
        /** @type {Object.<string,ContentViewCoordinates>} */
        const _viewNameToViewCoordinatesMap = new Map();
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
            return {
                viewName: viewName,
                lineNames: lineNames
            };
        }

        /**
         * @typedef {Object} ViewNamesListElement
         * @property {string} viewId
         * @property {string} viewName
         */
        /**
         * @returns {string}[] list of view names
         */
        this.getContentViewNamesList = function () {
            return Array.from(_viewNameToViewCoordinatesMap.keys());
        }

        this.isContentViewNameTaken = function (viewName) {
            return _viewNameToViewCoordinatesMap.has(viewName);
        }



        /**
         * 
         * @param {string} contentComponentViewId the id, that is returned by a content component when a new content view is added.
         * @param {string} contentComponentInstanceId the id, of the content component instance in the opr project the contentComponentViewId is relative to.
         * @param {string} viewName the id, the user has given to the view to address it when editing and designing the opr view.         
         */
        this.addContentView = function (viewName, contentComponentInstanceId, contentViewId) {
            validateRequiredArg(viewName, 'view name is required');
            validateRequiredArg(contentComponentInstanceId, 'content component instance is required');
            validateRequiredArg(contentViewId, 'content component view id is required');
            /** @type {ContentViewCoordinates} */
            const contentViewCoordinates = {
                contentComponentInstanceId: contentComponentInstanceId,
                contentViewId: contentViewId
            };
            _viewNameToViewCoordinatesMap.set(viewName, contentViewCoordinates);
        }

        /**
         * @typedef {Object} OprViewContentViewMetadata
         * @property {string} oprViewContentViewName
         * @property {string} ccInstId
         * @property {string} ccInstContentViewId
         */
        /**
         * @returns {OprViewContentViewMetadata[]}
         */
        this.getContentViewMetadataList = function () {
            let resultList = [];
            _viewNameToViewCoordinatesMap.forEach((coord, name) => resultList.push(
                {
                    oprViewContentViewName: name,
                    ccInstId: coord.contentComponentInstanceId,
                    ccInstContentViewId: coord.contentViewId
                }
            )
            );
            return resultList;
        }


    }
}
module.exports = OprView;