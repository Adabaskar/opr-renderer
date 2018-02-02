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
            _attachListenerToContentComponentSelectElement();
            _attachListenerToAddContentViewButton();
        }
        function _renderContentComponentSelectOptions() {
            const contentComponentNamesList = _ucService.getAvailableContentComponents();
            let selectInnerHtml = '';
            selectInnerHtml += '<option value="undefined" selected="true" disabled="disabled">--</option>\n';
            for (let i = 0; i < contentComponentNamesList.length; i++) {
                const contentComponentName = contentComponentNamesList[i];
                selectInnerHtml += `<option value="${contentComponentName}">${contentComponentName}</option>`
                selectInnerHtml += '\n';
            }
            const contentComponentSelectElement = _getContentComponentSelectElement();
            contentComponentSelectElement.innerHTML = selectInnerHtml;
        }
        /**
         * @returns {HTMLSelectElement}
         */
        function _getContentComponentSelectElement() {
            return _rootNode.querySelector(`.${_self.NEW_CONTENT_VIEW_CONTENT_COMPONTENT_SELECT_MARKER_CLASS}`)
        }
        function _getViewTypeSelectElement() {
            return _rootNode.querySelector(`.${_self.NEW_CONTENT_VIEW_TYPE_SELECT_MARKER_CLASS}`);
        }
        function _getViewNameInputElement() {
            return _rootNode.querySelector(`.${_self.NEW_CONTENT_VIEW_NAME_INPUT_MARKER_CLASS}`);
        }

        function _attachListenerToContentComponentSelectElement() {          
            const contentComponentSelectElement = _getContentComponentSelectElement();
            contentComponentSelectElement.addEventListener('change', () => _renderContentViewTypeSelectOptions());
        }
        function _renderContentViewTypeSelectOptions() {            
            const selectedContentComponent = _getSelectedContentComponentName();
            const contentViewSelectOptionList = _ucService.getAvailableContentViewOptions(selectedContentComponent);
            let optionsString = '';
            for(let i=0; i<contentViewSelectOptionList.length; i++) {
                const optionElement = contentViewSelectOptionList[i];
                optionsString += `<option value="${optionElement.typeId}">${optionElement.displayName}</option>`;
            }
            const contentViewSelectElement = _getViewTypeSelectElement();
            contentViewSelectElement.innerHTML = optionsString;
        }
        function _getSelectedContentComponentName() {
            const contentComponentSelectElement = _getContentComponentSelectElement();
            const selectedElementIndex = contentComponentSelectElement.options.selectedIndex;
            return contentComponentSelectElement.options.item(selectedElementIndex).value;
        }

        function _attachListenerToAddContentViewButton() {
            const addButtonElement = _rootNode.querySelector(`.${_self.NEW_CONTENT_VIEW_ADD_BUTTON_MARKER_CLASS}`);
            addButtonElement.addEventListener('click', () => _addContentView());
        }
        function _addContentView() {
            const enteredName = _getEnteredViewName();
            const selectedContentComponentName = _getSelectedContentComponentName();
            const selectedViewType = _getSelectedViewType();
            _ucService.addContentView(enteredName, selectedContentComponentName, selectedViewType);
        }
        function _getEnteredViewName() {
            const inputElement = _getViewNameInputElement();
            return inputElement.value;
        }
        function _getSelectedViewType() {
            const viewTypeSelectElement = _getViewTypeSelectElement();
            return viewTypeSelectElement.options.item(viewTypeSelectElement.selectedIndex).value;
        }
    }
}
module.exports = ManageContentViewsOfCurrentOprViewSubview;