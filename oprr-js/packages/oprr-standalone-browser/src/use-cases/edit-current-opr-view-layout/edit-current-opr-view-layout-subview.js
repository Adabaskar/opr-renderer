const validateRequiredArg = require('oprr-utilities').validateRequiredArg;
const EditCurrentOprViewLayoutUcService = require('./edit-current-opr-view-layout-uc-service.js');


class EditCurrentOprViewLayoutSubview {
    /**
     * 
     * @param {Document} domDoc 
     * @param {EditCurrentOprViewLayoutUcService} ucService 
     */
    constructor(domDoc, ucService) {
        validateRequiredArg(domDoc, 'Document required');
        validateRequiredArg(ucService, 'UC Service required');

        const _self = this;
        const _ucService = ucService;
        let _needsRerender = true;
        let _rootNode = domDoc.createElement('div');
        let _availableVerticalGridLinesListDiv = undefined;
        let _availableHorizontalGridLinesListDiv = undefined;

        this.ADD_VERTICAL_GRID_LINE_NAME_INPUT_MARKER_CLASS = 'AddVerticalGridLineNameInput';
        this.ADD_VERTICAL_GRID_LINE_POSITION_INPUT_MARKER_CLASS = 'AddVerticalGridLinePositionInput';
        this.ADD_VERTICAL_GRID_LINE_BUTTON_MARKER_CLASS = 'AddVerticalGridLineButton';
        this.ADD_HORIZONTAL_GRID_LINE_NAME_INPUT_MARKER_CLASS = 'AddHorizontalGridLineNameInput';
        this.ADD_HORIZONTAL_GRID_LINE_POSITION_INPUT_MARKER_CLASS = 'AddHorizontalGridLinePositionInput';
        this.ADD_HORIZONTAL_GRID_LINE_BUTTON_MARKER_CLASS = 'AddHorizontalGridLineButton';
        this.AVAILABLE_VERTICAL_LINES_LIST_MARKER_CLASS = 'AvailableVerticalGridLinesList';
        this.AVAILABLE_HORIZONTAL_LINES_LIST_MARKER_CLASS = 'AvailableHorizontalGridLinesList';

        this.getDomSubtree = function () {
            if (_needsRerender)
                _renderEditorView();
            return _rootNode;
        }
        function _renderEditorView() {
            const rootElementInnerHtml = `<form class="pure-form">
            <fieldset>
    
                <legend>Add Vertical line</legend>
                <label>Name</label>
                <input type="text" class="${_self.ADD_VERTICAL_GRID_LINE_NAME_INPUT_MARKER_CLASS}">
                <label>Position</label>
                <input type="text" class="${_self.ADD_VERTICAL_GRID_LINE_POSITION_INPUT_MARKER_CLASS}">
                <label>relative to</label>
                <select></select>
                <button class="${_self.ADD_VERTICAL_GRID_LINE_BUTTON_MARKER_CLASS}" }" type="button">set</button>
            </fieldset>
            <fieldset>
                <legend>Add Horizontal Line</legend>
                <label>Name</label>
                <input type="text" class="${_self.ADD_HORIZONTAL_GRID_LINE_NAME_INPUT_MARKER_CLASS}">
                <label>Position</label>
                <input type="text" class="${_self.ADD_HORIZONTAL_GRID_LINE_POSITION_INPUT_MARKER_CLASS}">
                <label>relative to</label>
                <select></select>
                <button class="${_self.ADD_HORIZONTAL_GRID_LINE_BUTTON_MARKER_CLASS}" type="button">set</button>
            </fieldset>

            <hr/>
            <fieldset>
                <legend>Available Vertical Lines</legend>
                <div class="${_self.AVAILABLE_VERTICAL_LINES_LIST_MARKER_CLASS}">
                </div>
            </fieldset>
            <fieldset>
                <legend>Available Horizontal Lines</legend>
                <div class="${_self.AVAILABLE_HORIZONTAL_LINES_LIST_MARKER_CLASS}">
                </div>
            </fieldset>
    
        </form>`
            _rootNode.innerHTML = rootElementInnerHtml;        
            _attachListNodes();
            _needsRerender = false;
            _attachListeners();
        }
        function _attachListeners() {
            _rootNode.querySelector(`.${_self.ADD_VERTICAL_GRID_LINE_BUTTON_MARKER_CLASS}`).
                addEventListener('click', _addVerticalLineButtonListener);
            _rootNode.querySelector(`.${_self.ADD_HORIZONTAL_GRID_LINE_BUTTON_MARKER_CLASS}`).
                addEventListener('click', _addHorizontalLineButtonListener);

        }
        function _addVerticalLineButtonListener() {
            const lineName = _rootNode.querySelector(`.${_self.ADD_VERTICAL_GRID_LINE_NAME_INPUT_MARKER_CLASS}`).value;
            const position = _rootNode.querySelector(`.${_self.ADD_VERTICAL_GRID_LINE_POSITION_INPUT_MARKER_CLASS}`).value;
            _ucService.setVerticalGridLine(lineName, position, true);
            _renderAvailableVerticalLinesList();//update view
        }

        function _addHorizontalLineButtonListener() {
            const lineName = _rootNode.querySelector(`.${_self.ADD_HORIZONTAL_GRID_LINE_NAME_INPUT_MARKER_CLASS}`).value;
            const position = _rootNode.querySelector(`.${_self.ADD_HORIZONTAL_GRID_LINE_POSITION_INPUT_MARKER_CLASS}`).value;
            _ucService.setHorizontalGridLine(lineName, position, true);
            _renderAvailableHorizontalLinesList();//update view
        }

        function _attachListNodes() {
            _availableVerticalGridLinesListDiv = _rootNode.querySelector(`.${_self.AVAILABLE_VERTICAL_LINES_LIST_MARKER_CLASS}`);
            _availableHorizontalGridLinesListDiv = _rootNode.querySelector(`.${_self.AVAILABLE_HORIZONTAL_LINES_LIST_MARKER_CLASS}`);
            _renderAvailableVerticalLinesList();
            _renderAvailableHorizontalLinesList();
        }
        function _renderAvailableVerticalLinesList() {
            const verticalLinesList = _ucService.getVerticalGridLineList();          
            _availableVerticalGridLinesListDiv.innerHTML = _renderLinesList(verticalLinesList, 'left', 'right');            
        }
        function _renderLinesList(linesList, firstPosProp, secondPosProp) {
            let resultList = `<ul>`;
            linesList.forEach((value) => resultList += _renderSimpleListeElementForGridLine(value, firstPosProp , secondPosProp));
            resultList += `</ul>`;
            return resultList;
        }
        function _renderSimpleListeElementForGridLine(gridLine, firstPositionProp, secondPositionProp) {
            const result = `<li data-linename="${gridLine.name}">${gridLine.name} ${firstPositionProp}:  ${gridLine[firstPositionProp]} /  ${secondPositionProp}: ${gridLine[secondPositionProp]}</li>`;
            return result;
        }
        function _renderAvailableHorizontalLinesList() {
            const horizontalLinesList = _ucService.getHorizontalGridLineList();              
            _availableHorizontalGridLinesListDiv.innerHTML = _renderLinesList(horizontalLinesList, 'top', 'bottom');
        }


    }
}
module.exports = EditCurrentOprViewLayoutSubview;