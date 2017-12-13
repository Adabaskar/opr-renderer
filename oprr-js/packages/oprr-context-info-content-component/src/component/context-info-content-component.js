const OprrContentComponentBase = require('oprr-content-component-base');
/**
 * Represents a
 */
class ContextInfoContentComponent extends OprrContentComponentBase {
    constructor() {
        super();        

        let _domDoc = undefined;

      /**
         * Activates the view, so that it is refreshed, and observed by the component.
         * @param {string} viewId the id of the view to be activated 
         * @param {Document} domDoc the root node of the DOM.
         */
        this.activateDomBasedView = function (viewId, domDoc) {
            _domDoc = domDoc;
        }
    }
}
module.exports = ContextInfoContentComponent;