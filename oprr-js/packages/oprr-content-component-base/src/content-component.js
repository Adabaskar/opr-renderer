/**
 * Contract Class for all OPR Renderer Content Components
 */
class OprrContentComponent {
    constructor() {        

        /**
         * Activates the view, so that it is refreshed, and observed by the component.
         * @param {string} viewId the id of the view to be activated 
         * @param {Document} domDoc the root node of the DOM.
         */
        this.activateDomBasedView = function (viewId, domDoc) {
            throw new Error('implement in derived class');
        }

        /**
         * Opposite of activateView
         * @param {string} viewId the id of the view to be deactivated.
         */
        this.deactivateView = function (viewId) {
            throw new Error('implement in derived class');
        }

        /**
         * For Dom based views, this returns the root element of the 
         * corresponding view, which than can be appended to the DOM.
         * @param {string} viewId 
         * @returns {HTMLElement} the root dom element of the identified view.        
         */
        this.getDomBasedViewRootElement = function (viewId) {
            throw new Error('implement in derived class');
        }

        /**
         * Activates the compact editor for this content component.
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
        this.getDomBasedCompactEditorRootElement = function() {
            throw new Error('implement in derived class');
        }

    }
}
module.exports = OprrContentComponent;