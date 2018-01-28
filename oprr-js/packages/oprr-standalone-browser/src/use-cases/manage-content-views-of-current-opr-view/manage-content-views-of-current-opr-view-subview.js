const validateRequiredArg = require('oprr-utilities').validateRequiredArg;
const ManageContentViewsOfCurrentOprViewUcService = require('./manage-content-views-of-current-opr-view-uc-service.js');

class ManageContentViewsOfCurrentOprViewSubview {
    /**
     * 
     * @param {Document} domDoc 
     * @param {ManageContentViewsOfCurrentOprViewUcService} ucService 
     */
    constructor(domDoc, ucService) {
        validateRequiredArg(domDoc, 'Document required');
        validateRequiredArg(ucService, 'UC Service required');
        const _self = this;
        const _ucService = ucService;
        let _rootNode = domDoc.createElement('div');
        let _needsRerender = true;

        this.NEW_CONTENT_VIEW_NAME_INPUT_MARKER_CLASS = 'js-NewContentViewNameInput';
        this.NEW_CONTENT_VIEW_CONTENT_COMPONTENT_SELECT_MARKER_CLASS = 'js-NewContentViewContentComponentSelection';
        this.NEW_CONTENT_VIEW_TYPE_SELECT_MARKER_CLASS = 'js-NewContentViewTypeSelection';
        this.NEW_CONTENT_VIEW_ADD_BUTTON_MARKER_CLASS = 'js-NewContentViewAddButton';
        this.CONTENT_VIEWS_ALREADY_ADDED_LIST_MARKER_CLASS = 'js-ContentViewsAlreadyAddedListContainer';

        this.forceRerender = function () {
            _self._needsRerender = true;
        }

        this.getDomSubtree = function () {
            if (_needsRerender)
                _renderCompleteEditorView();
            return _rootNode;
        }

        function _renderCompleteEditorView() {
            const rootElementInnerHtml = `<form class="pure-form">
                <fieldset>    
                    <legend>Add new Content View</legend>
                    <label>Content View Name</label>
                    <input type="text" class="${_self.NEW_CONTENT_VIEW_NAME_INPUT_MARKER_CLASS}">
                    <label>Content Component</label>
                    <select class="${_self.NEW_CONTENT_VIEW_CONTENT_COMPONTENT_SELECT_MARKER_CLASS}"></select>
                    <label>Available Content View Types</label>
                    <select class="${_self.NEW_CONTENT_VIEW_TYPE_SELECT_MARKER_CLASS}"></select>
                    <button class="${_self.NEW_CONTENT_VIEW_ADD_BUTTON_MARKER_CLASS}" }" type="button">add</button>
                </fieldset>
            </form>
            </hr>
            <div>
                <ul class="${_self.CONTENT_VIEWS_ALREADY_ADDED_LIST_MARKER_CLASS}">
                </ul>
            </div>`;
            _rootNode.innerHTML = rootElementInnerHtml;
            _renderContentComponentSelectOptions();
        }
        function _renderContentComponentSelectOptions() {
            const contentComponentNamesList = _ucService.getAvailableContentComponents();
            let selectInnerHtml = '';
            for (let i = 0; i < contentComponentNamesList.length; i++) {
                const contentComponentName = contentComponentNamesList[i];
                selectInnerHtml += `<option value="${contentComponentName}">${contentComponentName}</option>`
                selectInnerHtml += '\n';
            }
            _rootNode.querySelector(`.${_self.NEW_CONTENT_VIEW_CONTENT_COMPONTENT_SELECT_MARKER_CLASS}`).innerHTML = selectInnerHtml;
        }
    }
}
module.exports = ManageContentViewsOfCurrentOprViewSubview;