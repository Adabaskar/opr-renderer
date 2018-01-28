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

        this.SET_VERTICAL_GRID_LINE_NAME_INPUT_MARKER_CLASS = 'js-AddVerticalGridLineNameInput';
        this.ADD_VERTICAL_GRID_LINE_POSITION_INPUT_MARKER_CLASS = 'js-AddVerticalGridLinePositionInput';
        this.VERTICAL_GRID_LINE_SET_BUTTON_MARKER_CLASS = 'js-AddVerticalGridLineButton';
        this.ADD_HORIZONTAL_GRID_LINE_NAME_INPUT_MARKER_CLASS = 'js-AddHorizontalGridLineNameInput';
        this.ADD_HORIZONTAL_GRID_LINE_POSITION_INPUT_MARKER_CLASS = 'js-AddHorizontalGridLinePositionInput';
        this.HORIZONTAL_GRID_LINE_SET_BUTTON_MARKER_CLASS = 'js-AddHorizontalGridLineButton';
        this.AVAILABLE_VERTICAL_LINES_LIST_CONTAINER_MARKER_CLASS = 'js-AvailableVerticalGridLinesList';
        this.AVAILABLE_HORIZONTAL_LINES_LIST_CONTAINER_MARKER_CLASS = 'js-AvailableHorizontalGridLinesList';
        this.CONTENT_COMPONENT_VIEW_SELECTION_MARKER_CLASS = 'js-ContentComponentViewSelection';
        this.CONTENT_COMPONENT_VIEW_LEFT_LINE_SELECTION_MARKER_CLASS = 'js-ContentComponentViewLeftLineSelection';
        this.CONTENT_COMPONENT_VIEW_RIGHT_LINE_SELECTION_MARKER_CLASS = 'js-ContentComponentViewRightLineSelection';
        this.CONTENT_COMPONENT_VIEW_TOP_LINE_SELECTION_MARKER_CLASS = 'js-ContentComponentViewTopLineSelection';
        this.CONTENT_COMPONENT_VIEW_BOTTOM_LINE_SELECTION_MARKER_CLASS = 'js-ContentComponentViewBottomLineSelection';
        this.CONTENT_COMPONENT_VIEW_SET_LINES_BUTTON_MARKER_CLASS = 'js-ContentComponentViewSetLinesButton';
        this.CONTENT_COMPONENT_VIEWS_WITH_GRID_LINES_LIST_CONTAINER_MARKER_CLASS = 'js-ContentComponentViewWithGridLinesList';

        this.forceRerender = function() {
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
    
                <legend>Vertical Grid Lines</legend>
                <label>Name</label>
                <input type="text" class="${_self.SET_VERTICAL_GRID_LINE_NAME_INPUT_MARKER_CLASS}">
                <label>Position</label>
                <input type="text" class="${_self.ADD_VERTICAL_GRID_LINE_POSITION_INPUT_MARKER_CLASS}">
                <label>relative to</label>
                <select></select>
                <button class="${_self.VERTICAL_GRID_LINE_SET_BUTTON_MARKER_CLASS}" }" type="button">set</button>
            </fieldset>
            <fieldset>
                <legend>Horizontal Grid Lines</legend>
                <label>Name</label>
                <input type="text" class="${_self.ADD_HORIZONTAL_GRID_LINE_NAME_INPUT_MARKER_CLASS}">
                <label>Position</label>
                <input type="text" class="${_self.ADD_HORIZONTAL_GRID_LINE_POSITION_INPUT_MARKER_CLASS}">
                <label>relative to</label>
                <select></select>
                <button class="${_self.HORIZONTAL_GRID_LINE_SET_BUTTON_MARKER_CLASS}" type="button">set</button>
            </fieldset>
            <fieldset>
                <legend>Content Component Views</legend>
                <label>View Name in current Opr View</label>
                <select class="${_self.CONTENT_COMPONENT_VIEW_SELECTION_MARKER_CLASS}">
                    <option>-- please select --</option>                    
                </select>

                <label>Left Grid Line</label>
                <select class="${_self.CONTENT_COMPONENT_VIEW_LEFT_LINE_SELECTION_MARKER_CLASS}">
                    <option>-- please select --</option>                    
                </select>
                
                <label>Right Grid Line</label>
                <select class="${_self.CONTENT_COMPONENT_VIEW_RIGHT_LINE_SELECTION_MARKER_CLASS}">
                    <option>-- please select --</option>                    
                </select>

                <label>Top Grid Line</label>
                <select class="${_self.CONTENT_COMPONENT_VIEW_TOP_LINE_SELECTION_MARKER_CLASS}">
                    <option>-- please select --</option>                    
                </select>
                
                <label>Bottom Grid Line</label>
                <select class="${_self.CONTENT_COMPONENT_VIEW_BOTTOM_LINE_SELECTION_MARKER_CLASS}">
                    <option>-- please select --</option>                    
                </select>
                                
                <button class="${_self.CONTENT_COMPONENT_VIEW_SET_LINES_BUTTON_MARKER_CLASS}" type="button">set</button>
            </fieldset>

            <hr/>
            <fieldset>
                <legend>Available Vertical Lines</legend>
                <div class="${_self.AVAILABLE_VERTICAL_LINES_LIST_CONTAINER_MARKER_CLASS}">
                </div>
            </fieldset>
            <fieldset>
                <legend>Available Horizontal Lines</legend>
                <div class="${_self.AVAILABLE_HORIZONTAL_LINES_LIST_CONTAINER_MARKER_CLASS}">
                </div>
            </fieldset>
            <fieldset>
                <legend>Content Component Views in Layout</legend>
                <div class="${_self.CONTENT_COMPONENT_VIEWS_WITH_GRID_LINES_LIST_CONTAINER_MARKER_CLASS}">
                </div>
            </fieldset>
    
        </form>`
            _rootNode.innerHTML = rootElementInnerHtml;
            _renderGridLinesListNodesToRootNode();
            _renderContentViewsWithGridLinesToRootNode();
            _renderContentViewSelectionOptions();
            _renderVerticalGridLineSelectionOptionsForContentComponentViewLayout();
            _renderHorizontalGridLineSelectionOptionsForContentComponentViewLayout();
            _needsRerender = false;
            _attachListenersToButtonNodes();
            _attachContentComponentViewSelectListener();
        }
        function _renderGridLinesListNodesToRootNode() {
            _availableVerticalGridLinesListDiv = _rootNode.querySelector(`.${_self.AVAILABLE_VERTICAL_LINES_LIST_CONTAINER_MARKER_CLASS}`);
            _availableHorizontalGridLinesListDiv = _rootNode.querySelector(`.${_self.AVAILABLE_HORIZONTAL_LINES_LIST_CONTAINER_MARKER_CLASS}`);
            _renderAvailableVerticalLinesList();
            _renderAvailableHorizontalLinesList();
        }
        function _renderAvailableVerticalLinesList() {
            const verticalLinesList = _ucService.getVerticalGridLineList();
            _availableVerticalGridLinesListDiv.innerHTML = _renderLinesList(verticalLinesList, 'left', 'right');
        }
        function _renderLinesList(linesList, firstPosProp, secondPosProp) {
            let resultList = `<ul>`;
            linesList.forEach((value) => resultList += _renderSimpleListeElementForGridLine(value, firstPosProp, secondPosProp));
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

        function _renderContentViewsWithGridLinesToRootNode() {
            const contentViewsWithGridLinesList = _ucService.getContentViewsWithBoundariesList();
            let listHtml = '<ul>';
            for(let i=0; i<contentViewsWithGridLinesList.length; i++) {
                listHtml += _renderContentViewWithGridLinesListItem(contentViewsWithGridLinesList[i]);
                listHtml += '\n';
            }
            listHtml += '</ul>';
            const contentViewWithGridLinesListContainerNode = _rootNode.querySelector(`.${_self.CONTENT_COMPONENT_VIEWS_WITH_GRID_LINES_LIST_CONTAINER_MARKER_CLASS}`);
            contentViewWithGridLinesListContainerNode.innerHTML = listHtml;
        }
       
        /**
         * @param {Object} listElement
         * @param {string} listElement.viewName the view name
         * @param {GridLineNames} listElement.lineNames
         */        
        function _renderContentViewWithGridLinesListItem(listElement) {
            const viewName = listElement.viewName;
            const lineNames = listElement.lineNames;
            const result = `<li data-viewname="${viewName}">${viewName}: ${lineNames.left} / ${lineNames.top} / ${lineNames.right}/ ${lineNames.bottom} </li>`;
            return result;
        }

        function _renderContentViewSelectionOptions() {
            const contentComponentViewSelectionNode = _rootNode.querySelector(`.${_self.CONTENT_COMPONENT_VIEW_SELECTION_MARKER_CLASS} `);
            const currentOprViewsContenComponentViews = _ucService.getContentViewsList();
            let selectionNodeInnerHtml = "";
            for (let i = 0; i < currentOprViewsContenComponentViews.length; i++) {
                let value = currentOprViewsContenComponentViews[i].viewname;
                let label = value;
                selectionNodeInnerHtml += _renderOptionElementString(value, label);
                selectionNodeInnerHtml += '\n';
            }
            contentComponentViewSelectionNode.innerHTML = selectionNodeInnerHtml;
        }

        function _renderOptionElementString(value, label) {
            let result = `<option value="${value}">${label}</option>`;
            //  console.log(result);
            return result;
        }

        /**
         * 
         * @param {HTMLSelectElement} selectNode 
         * @param {Object[]} gridLineList 
         */
        function _renderOptionsToGridLinesSelect(selectNode, gridLineList) {
            let selectInnerHtml = '';
            selectInnerHtml += _renderOptionElementString('', '--');
            for (let i = 0; i < gridLineList.length; i++) {
                const lineName = gridLineList[i].name;
                selectInnerHtml += _renderOptionElementString(lineName, lineName);
                selectInnerHtml += '\n';
            }
            selectNode.innerHTML = selectInnerHtml;
        }

        function _renderVerticalGridLineSelectionOptionsForContentComponentViewLayout() {
            const verticalGridLines = _ucService.getVerticalGridLineList();
            const leftGridLineSelectNode = _getLeftGridLineSelectNode();
            const rightGridLineSelectNode = _getRightGridLineSelectNode();
            _renderOptionsToGridLinesSelect(leftGridLineSelectNode, verticalGridLines);
            _renderOptionsToGridLinesSelect(rightGridLineSelectNode, verticalGridLines);
        }
        function _getLeftGridLineSelectNode() {
            return _rootNode.querySelector(`.${_self.CONTENT_COMPONENT_VIEW_LEFT_LINE_SELECTION_MARKER_CLASS}`);
        }
        function _getRightGridLineSelectNode() {
            return _rootNode.querySelector(`.${_self.CONTENT_COMPONENT_VIEW_RIGHT_LINE_SELECTION_MARKER_CLASS}`);
        }

        function _renderHorizontalGridLineSelectionOptionsForContentComponentViewLayout() {
            const gridLineList = _ucService.getHorizontalGridLineList();
            const topGridLineSelectNode = _getTopGridLineSelectNode();
            const bottomGridLineSelectNode = _getBottomGridLineSelectNode();
            _renderOptionsToGridLinesSelect(topGridLineSelectNode, gridLineList);
            _renderOptionsToGridLinesSelect(bottomGridLineSelectNode, gridLineList);
        }
        function _getTopGridLineSelectNode() {
            return _rootNode.querySelector(`.${_self.CONTENT_COMPONENT_VIEW_TOP_LINE_SELECTION_MARKER_CLASS}`);
        }
        function _getBottomGridLineSelectNode() {
            return _rootNode.querySelector(`.${_self.CONTENT_COMPONENT_VIEW_BOTTOM_LINE_SELECTION_MARKER_CLASS}`);
        }


        function _attachListenersToButtonNodes() {
            _rootNode.querySelector(`.${_self.VERTICAL_GRID_LINE_SET_BUTTON_MARKER_CLASS} `).
                addEventListener('click', _setVerticalLineButtonListener);
            _rootNode.querySelector(`.${_self.HORIZONTAL_GRID_LINE_SET_BUTTON_MARKER_CLASS} `).
                addEventListener('click', _setHorizontalLineButtonListener);
            _rootNode.querySelector(`.${_self.CONTENT_COMPONENT_VIEW_SET_LINES_BUTTON_MARKER_CLASS}`).
                addEventListener('click', _setContentComponentViewGridLineNamesListener);

        }
        function _setVerticalLineButtonListener() {
            const lineName = _rootNode.querySelector(`.${_self.SET_VERTICAL_GRID_LINE_NAME_INPUT_MARKER_CLASS} `).value;
            const position = _rootNode.querySelector(`.${_self.ADD_VERTICAL_GRID_LINE_POSITION_INPUT_MARKER_CLASS} `).value;
            _ucService.setVerticalGridLine(lineName, position, true);
            _renderAvailableVerticalLinesList();//update view
            _renderVerticalGridLineSelectionOptionsForContentComponentViewLayout();
            _selectGridLinesOfSelectedContentView();//adjust selected content component view line display
        }

        function _setHorizontalLineButtonListener() {
            const lineName = _rootNode.querySelector(`.${_self.ADD_HORIZONTAL_GRID_LINE_NAME_INPUT_MARKER_CLASS} `).value;
            const position = _rootNode.querySelector(`.${_self.ADD_HORIZONTAL_GRID_LINE_POSITION_INPUT_MARKER_CLASS} `).value;
            _ucService.setHorizontalGridLine(lineName, position, true);
            _renderAvailableHorizontalLinesList();//update view
            _renderHorizontalGridLineSelectionOptionsForContentComponentViewLayout();
            _selectGridLinesOfSelectedContentView();//adjust selected content component view line display
        }
        function _setContentComponentViewGridLineNamesListener() {
            const selectedViewName = _getSelectedOptionValue(_rootNode.querySelector(`.${_self.CONTENT_COMPONENT_VIEW_SELECTION_MARKER_CLASS}`));
            const selectedGridLineNames = {
                left: _getSelectedOptionValue(_rootNode.querySelector(`.${_self.CONTENT_COMPONENT_VIEW_LEFT_LINE_SELECTION_MARKER_CLASS}`)),
                right: _getSelectedOptionValue(_rootNode.querySelector(`.${_self.CONTENT_COMPONENT_VIEW_RIGHT_LINE_SELECTION_MARKER_CLASS}`)),
                top: _getSelectedOptionValue(_rootNode.querySelector(`.${_self.CONTENT_COMPONENT_VIEW_TOP_LINE_SELECTION_MARKER_CLASS}`)),
                bottom: _getSelectedOptionValue(_rootNode.querySelector(`.${_self.CONTENT_COMPONENT_VIEW_BOTTOM_LINE_SELECTION_MARKER_CLASS}`)),
            }
            _ucService.setContentViewBoundaries(selectedViewName, selectedGridLineNames);
        }

        function _attachContentComponentViewSelectListener() {
            const selectNode = _getContentComponentViewSelectionNode();
            selectNode.addEventListener('change', () => _selectGridLinesOfSelectedContentView());
        }
        function _getContentComponentViewSelectionNode() {
            return _rootNode.querySelector(`.${_self.CONTENT_COMPONENT_VIEW_SELECTION_MARKER_CLASS}`);
        }
        function _selectGridLinesOfSelectedContentView() {
            const selectNode = _getContentComponentViewSelectionNode();
            let selectedContentViewGridLines = {
                left: undefined,
                right: undefined,
                top: undefined,
                bottom: undefined
            };

            if (selectNode.selectedIndex != -1) {
                const selectedOption = selectNode.options.item(selectNode.selectedIndex);
                selectedContentViewGridLines = _ucService.getContentViewBoundary(selectedOption.value);
            }

            _selectOptionByValue(_getLeftGridLineSelectNode(), selectedContentViewGridLines.left);
            _selectOptionByValue(_getRightGridLineSelectNode(), selectedContentViewGridLines.right);
            _selectOptionByValue(_getTopGridLineSelectNode(), selectedContentViewGridLines.top);
            _selectOptionByValue(_getBottomGridLineSelectNode(), selectedContentViewGridLines.bottom);
        }
        /**
         * 
         * @param {HTMLSelectElement} selectNode 
         * @param {String} value 
         */
        function _selectOptionByValue(selectNode, value) {
            if (value == undefined) {
                selectNode.selectedIndex = -1;
                return;
            }

            let i = 0;
            let found = false;
            while (i < selectNode.options.length && !found) {
                found = selectNode.options.item(i).value === value;
                if (found)
                    selectNode.selectedIndex = i;
                else
                    i++;
            }
            if (!found) {
                selectNode.selectedIndex = -1;
            }
        }

        /**
         * 
         * @param {HTMLSelectElement} selectNode 
         */
        function _getSelectedOptionValue(selectNode) {
            const i = selectNode.selectedIndex;            
            if (i !== -1) {
                const result = selectNode.options.item(i).value;
                // console.log(`value at selected index ${i} is ${result}`);
                return result;
            }
            return undefined;
        }



    }
}
module.exports = EditCurrentOprViewLayoutSubview;