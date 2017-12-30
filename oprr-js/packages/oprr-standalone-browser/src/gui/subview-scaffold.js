const validateRequiredArg = require('oprr-utilities').validateRequiredArg;
const clearHtmlElementChilds = require('oprr-utilities').clearHtmlElementChilds;

/**
 * Represents a subview, that completely fills the parent element, if this allows relative positioning.
 */
class SubviewScaffold {
    /**
     * 
     * @param {Document} domDoc 
     */
    constructor(domDoc) {
        validateRequiredArg(domDoc, 'Dom Document required');

        const _self = this;   

        let _rootDiv = domDoc.createElement('div');
        let _contentDiv = domDoc.createElement('div');
        const _RETURN_BUTTON_MARKER_CLASS = 'ReturnFromSubviewButton';
        const _CONTENT_AREA_MARKER_CLASS = 'SubviewContent';

        function _makeReturnButton() {
            let returnButton = domDoc.createElement('button');
            returnButton.classList.add(_RETURN_BUTTON_MARKER_CLASS);
            returnButton.addEventListener('click', () => _self.close());
            returnButton.innerText = 'return';
            return returnButton;
        }

        (function _init() {

            const stl = _rootDiv.style;
            stl.position = 'absolute';
            stl.top = 0;
            stl.bottom = 0;
            stl.left = 0;
            stl.right = 0;
            stl.display = 'none';

            const returnButton = _makeReturnButton();
            _rootDiv.appendChild(returnButton);
            _contentDiv.classList.add(_CONTENT_AREA_MARKER_CLASS);
            _rootDiv.appendChild(_contentDiv);
            

        })();

        this.getDomSubtree = function() {
            return _rootDiv;
        };

        this.open = function() {
            _rootDiv.style.display = 'block';
        }

        this.close = function() {
            _rootDiv.style.display = 'none';
        }

        /**
         * 
         * @param {HTMLElement} contentDomSubtreeRoot 
         */
        this.setContent = function(contentDomSubtreeRoot) {
            clearHtmlElementChilds(_contentDiv);
            _contentDiv.appendChild(contentDomSubtreeRoot);
        }
    }
}
module.exports = SubviewScaffold;