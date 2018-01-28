/**
 * Contract Class for all OPR Renderer Content Components
 */
class ContentComponentController {
    constructor() {        

        /**
         * Component will instantiates and manage a view with the designated viewTypeId.
         *             
         * @param {string} viewTypeId the id of the view-type to be instantiated and managed, can be optional for components only supporting a single view type.
         * @param {Document} domDoc the root node of the DOM.
         * @returns {string} the viewId to address the created view instance via the component.
         */
        this.addDomBasedView = function (domDoc, viewTypeId) {
            throw new Error('implement in derived class');
        }

        /**
         * Opposite of activateDomBasedView. Requires the viewId that was returned by
         * the activateDomBasedView-mdethod
         * @param {string} viewId the id of the view to be deactivated, previously returned by the activeDomBasedView method.
         */
        this.removeDomBasedView = function (viewId) {
            throw new Error('implement in derived class');
        }

        /**
         * For Dom based views, this returns the root element of the 
         * corresponding view, which than can be appended to the DOM.
         * @param {string} viewId 
         * @returns {HTMLElement} the root dom element of the named view.        
         */
        this.getViewsDomSubtree = function (viewId) {
            throw new Error('implement in derived class');
        }

        /**
         * Tells that the embedding application will use the compact 
         * editor for this content component. Without it the editor 
         * will not be instantiated and managed by the content component.
         * @param {Document} domDoc 
         */
        this.activateDomBasedCompactEditor = function(domDoc) {
            throw new Error('implement in derived class');
        }

        /**
         * The compact editor is an editor ui implementation that allows to edit all editable aspects
         * of the content component using a single dom sub tree.
         * @returns {HTMLElement} the root element of the editor view, to be appended to the DOM
         */
        this.getDomBasedCompactEditorsDomSubtree = function() {
            throw new Error('implement in derived class');
        }

    }
}
module.exports = ContentComponentController;