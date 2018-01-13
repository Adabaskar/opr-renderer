const validateRequiredArg = require('oprr-utilities').validateRequiredArg;
const clearHtmlElementChilds = require('oprr-utilities').clearHtmlElementChilds;
const UcService = require('./manage-content-components-uc-service.js');
const purecss = require('../../../node_modules/purecss/build/pure-min.css');

class ManageContentComponentsSubview {
    /**
     * 
     * @param {Document} domDoc 
     * @param {UcService} ucService 
     */
    constructor(domDoc, ucService) {
        validateRequiredArg(domDoc, 'DOM Document required');
        validateRequiredArg(ucService, 'UC Service required');

        let _ucService = ucService;

        let _rootNode = domDoc.createElement('div');
        let _addableContentComponentsView = domDoc.createElement('div');
        let _requiresRendering = true;

        const _ADDABLE_CONTENT_COMPONENT_UI_AREA_MARKER_CLASS = 'AddableContentComponentUiArea';
        const _ADDABLE_CONTENT_COMPONENT_SELECTION_MARKER_CLASS = 'AddableContentComponentSelection';
        const _ADDED_CONTENT_COMPONENT_UI_AREA_MARKER_CLASS = 'AddedContentComponentUiArea';
        const _ADD_SELECTED_CONTENT_COMPONENT_TO_PROJECT_BUTTON_MARKER_CLASS = 'AddContentComponentToProjectButton';

        (function _init() {
            _addableContentComponentsView.classList.add(_ADDABLE_CONTENT_COMPONENT_UI_AREA_MARKER_CLASS);
            _rootNode.appendChild(_addableContentComponentsView);
        })();

        this.getDomSubtree = function () {
            //  _clearAddableContentComponentsView();
            _renderAddableContentComponentsView();
            return _rootNode;
        }
        function _renderAddableContentComponentsView() {
            const addableContentComponentSelectOptions = _renderAddableComponentsSelectOptions();
            const innerHtml = `
                <form class="pure-form pure-form-stacked">
                                                 
                        <label>Content Component</label>
                        <select class='${_ADDABLE_CONTENT_COMPONENT_SELECTION_MARKER_CLASS}'>
                            ${addableContentComponentSelectOptions}
                        </select>
                        <button class="${_ADD_SELECTED_CONTENT_COMPONENT_TO_PROJECT_BUTTON_MARKER_CLASS}" type="button">add</button>
                 
                </form>`;
            _addableContentComponentsView.innerHTML = innerHtml;
            _addableContentComponentsView.querySelector(`.${_ADD_SELECTED_CONTENT_COMPONENT_TO_PROJECT_BUTTON_MARKER_CLASS}`).addEventListener('click', _addSelectedContentComponent);
        }
        function _renderAddableComponentsSelectOptions() {
            const addableComponentsList = _ucService.getAddableContentComponents();

            let resultString = _renderOptionElementString(addableComponentsList[0].typeId, addableComponentsList[0].name);
            let i = 1;
            while (i < addableComponentsList.length) {
                resultString += '\n';
                resultString += _renderOptionElementString(addableComponentsList[i].typeId, addableComponentsList[i].name);
                i++;
            }
            return resultString;

        }
        function _renderOptionElementString(value, text) {
            return ` <option value='${value}'>${text}</option>`;
        }
        function _addSelectedContentComponent() {
            // const contentComponentSelectNode = _addableContentComponentsView.querySelector(`.${_ADDABLE_CONTENT_COMPONENT_SELECTION_MARKER_CLASS}`);
            // const selectedContentComponentId = contentComponentSelectNode.options[contentComponentSelectNode.selectedIndex].value;
            const selectedContentComponentId = _addableContentComponentsView.querySelector(`.${_ADDABLE_CONTENT_COMPONENT_SELECTION_MARKER_CLASS} option:checked`).value;
            _ucService.addContentComponent(selectedContentComponentId);
        }

        // function _clearAddableContentComponentsView() {
        //     clearHtmlElementChilds(_addableContentComponentsView);
        // }

    }
}
module.exports = ManageContentComponentsSubview;
