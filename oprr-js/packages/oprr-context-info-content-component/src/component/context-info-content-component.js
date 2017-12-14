const OprrContentComponentBase = require('oprr-content-component-base');
const ContextInfoAsMainHeaderView = require('../views/context-info-as-main-header-view.js');
/**
 * Represents a
 */
class ContextInfoContentComponent extends OprrContentComponentBase {
    constructor() {
        super();

        let _view = undefined;

        /**
           * Activates the view, so that it is refreshed, and observed by the component.
           * @param {string} viewId the id of the view to be activated 
           * @param {Document} domDoc the root node of the DOM.
           */
        this.activateDomBasedView = function (viewId, domDoc) {
            _view = new ContextInfoAsMainHeaderView(domDoc);
        }

        this.getViewDomSubTree = function (viewId) {
            return _view.getDomSubTreeRoot();
        }


    }
}
module.exports = ContextInfoContentComponent;