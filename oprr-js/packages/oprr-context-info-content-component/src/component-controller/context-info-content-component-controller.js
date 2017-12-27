const ContextInfoAsMainHeaderView = require('../views/context-info-as-main-header-view.js');
const ContextInfoCompactEditor = require('../compact-editor/context-info-compact-editor.js');
const ComponentState = require('../component-state/context-info-content-component-state.js');

class ContextInfoContentComponentController  {
    
    constructor() {    

        let _viewIdCounter = 0;
        let _views = new Map();
        const _componentState = new ComponentState();

        /**
         * @type {ContextInfoDomBasedCompactEditor}
         */         
        let _domBasedCompactEditor = undefined;

        /**
           * Activates the view, so that it is refreshed, and observed by the component.         
           * @param {Document} domDoc the root node of the DOM.
           */
        this.addDomBasedView = function (domDoc) {
            _views.set(_viewIdCounter, new ContextInfoAsMainHeaderView(domDoc, _componentState));
            return _viewIdCounter++;
        }

        this.getViewsDomSubtree = function (viewId) {
            if (!_views.has(viewId))
                throw new Error(`unknown view id: ${viewId}.`);
            
            return _views.get(viewId).getDomSubtree();            
        }

        this.removeDomBasedView = function(viewId) {
            _views.delete(viewId);
        }

        /**
         * 
         * @param {Document} domDoc 
         */
        this.activateDomBasedCompactEditor = function(domDoc) {
            _domBasedCompactEditor = new ContextInfoCompactEditor({domDoc : domDoc, contextInfoComponentState : _componentState});
        }

        this.getDomBasedCompactEditorsDomSubtree = function() {
            return _domBasedCompactEditor.getDomSubtree();
        }


    }
}
module.exports = ContextInfoContentComponentController;