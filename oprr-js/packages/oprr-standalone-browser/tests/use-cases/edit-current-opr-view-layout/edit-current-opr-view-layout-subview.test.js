const test = require('tape');
const sinon = require('sinon');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const EditCurrentOprViewLayoutSubview = require('../../../src/use-cases/edit-current-opr-view-layout/edit-current-opr-view-layout-subview.js');
const EditCurrentOprViewLayoutUcService = require('../../../src/use-cases/edit-current-opr-view-layout/edit-current-opr-view-layout-uc-service.js');
const OprProject = require('../../../src/opr-project/opr-project.js');

const testgroup = 'EditCurrentOprViewLayoutSubview:'


function typeVerticalGridLineDataIntoInputFields(sut, lineName, position) {
    sut.getDomSubtree().querySelector(`.${sut.SET_VERTICAL_GRID_LINE_NAME_INPUT_MARKER_CLASS}`).value = lineName;
    sut.getDomSubtree().querySelector(`.${sut.ADD_VERTICAL_GRID_LINE_POSITION_INPUT_MARKER_CLASS}`).value = position;
}
function clickOnVerticalGridLineSetButton(sut, domDoc) {
    const addButton = sut.getDomSubtree().querySelector(`.${sut.VERTICAL_GRID_LINE_SET_BUTTON_MARKER_CLASS}`);
    const clickEventStub = domDoc.createEvent('MouseEvent');
    clickEventStub.initEvent('click');
    addButton.dispatchEvent(clickEventStub);
}

function typeHorizontalGridLineDataIntoInputFields(sut, lineName, position) {
    sut.getDomSubtree().querySelector(`.${sut.ADD_HORIZONTAL_GRID_LINE_NAME_INPUT_MARKER_CLASS}`).value = lineName;
    sut.getDomSubtree().querySelector(`.${sut.ADD_HORIZONTAL_GRID_LINE_POSITION_INPUT_MARKER_CLASS}`).value = position;
}
function clickOnHorizontalGridLineSetButton(sut, domDoc) {
    const addButton = sut.getDomSubtree().querySelector(`.${sut.HORIZONTAL_GRID_LINE_SET_BUTTON_MARKER_CLASS}`);
    const clickEventStub = domDoc.createEvent('MouseEvent');
    clickEventStub.initEvent('click');
    addButton.dispatchEvent(clickEventStub);
}

test(`${testgroup} setVerticalGridLineClicked_ValidUserInput_callsUcServiceWithExpectedParams`, function (t) {

    const domDocStub = new JSDOM('').window.document;
    const oprProjectStub = new OprProject();
    const ucServiceStub = new EditCurrentOprViewLayoutUcService(oprProjectStub);
    const ucServiceMethodSpy = sinon.spy(ucServiceStub, 'setVerticalGridLine');
    const lineNameStub = 'lineNameStub';
    const positionStub = '10.234';

    const sut = new EditCurrentOprViewLayoutSubview(domDocStub, ucServiceStub);
    typeVerticalGridLineDataIntoInputFields(sut, lineNameStub, positionStub);
    clickOnVerticalGridLineSetButton(sut, domDocStub);

    t.equals(ucServiceMethodSpy.getCall(0).args[0], lineNameStub);
    t.equals(ucServiceMethodSpy.getCall(0).args[1], positionStub);
    t.equals(ucServiceMethodSpy.getCall(0).args[2], true);
    t.end();
});

test(`${testgroup} setHorizontalGridLineClicked_ValidUserInput_callsUcServiceWithExpectedParams`, function (t) {

    const domDocStub = new JSDOM('').window.document;
    const oprProjectStub = new OprProject();
    const ucServiceStub = new EditCurrentOprViewLayoutUcService(oprProjectStub);
    const ucServiceMethodSpy = sinon.spy(ucServiceStub, 'setHorizontalGridLine');
    const lineNameStub = 'lineNameStub';
    const positionStub = '10.234';
    const sut = new EditCurrentOprViewLayoutSubview(domDocStub, ucServiceStub);

    typeHorizontalGridLineDataIntoInputFields(sut, lineNameStub, positionStub);
    clickOnHorizontalGridLineSetButton(sut, domDocStub);

    t.equals(ucServiceMethodSpy.getCall(0).args[0], lineNameStub);
    t.equals(ucServiceMethodSpy.getCall(0).args[1], positionStub);
    t.equals(ucServiceMethodSpy.getCall(0).args[2], true);
    t.end();
});


test(`${testgroup} setVerticalGridLineClicked_ValidUserInput_editorShowsAddedLineData`, function (t) {

    const domDocStub = new JSDOM('').window.document;
    const oprProjectStub = new OprProject();
    const ucServiceStub = new EditCurrentOprViewLayoutUcService(oprProjectStub);
    const sut = new EditCurrentOprViewLayoutSubview(domDocStub, ucServiceStub);
    const lineNameStub = 'verticaltalLineNameToBeSeenInList';
    const positionStub = '10.234';

    typeVerticalGridLineDataIntoInputFields(sut, lineNameStub, positionStub);
    clickOnVerticalGridLineSetButton(sut, domDocStub);

    const verticalLinesList = sut.getDomSubtree().querySelector(`.${sut.AVAILABLE_VERTICAL_LINES_LIST_CONTAINER_MARKER_CLASS}`);
    const expectedElement = verticalLinesList.querySelector(`[data-linename=${lineNameStub}]`);
    t.true(expectedElement.innerHTML.includes(lineNameStub));
    t.true(expectedElement.innerHTML.includes(positionStub));
    t.true(expectedElement.innerHTML.includes(100 - positionStub));

    t.end();
});

test(`${testgroup} setHorizontalGridLineClicked_ValidUserInput_editorShowsAddedLineData`, function (t) {

    const domDocStub = new JSDOM('').window.document;
    const oprProjectStub = new OprProject();
    const ucServiceStub = new EditCurrentOprViewLayoutUcService(oprProjectStub);
    const sut = new EditCurrentOprViewLayoutSubview(domDocStub, ucServiceStub);
    const lineNameStub = 'horizontalLineNameToBeSeenInList';
    const positionStub = '10.234';

    typeHorizontalGridLineDataIntoInputFields(sut, lineNameStub, positionStub);
    clickOnHorizontalGridLineSetButton(sut, domDocStub);

    const horizontalLinesList = sut.getDomSubtree().querySelector(`.${sut.AVAILABLE_HORIZONTAL_LINES_LIST_CONTAINER_MARKER_CLASS}`);
    const expectedElement = horizontalLinesList.querySelector(`[data-linename=${lineNameStub}]`);
    t.true(expectedElement.innerHTML.includes(lineNameStub));
    t.true(expectedElement.innerHTML.includes(positionStub));
    t.true(expectedElement.innerHTML.includes(100 - positionStub));
    t.end();
});

test(`${testgroup} getDomSubtree_UcServiceReturnsListOfAddedContentComponentViews_ContentComponentViewSelectionContainsNamesOfViews`, function (t) {

    const domDocStub = new JSDOM('').window.document;
    const oprProjectStub = new OprProject();
    const ucServiceStub = new EditCurrentOprViewLayoutUcService(oprProjectStub);
    const viewnameStub = 'viewnameStub';
    const contentComponentViewsListStub = [{ viewname: viewnameStub }];
    const getContentComponentViewsStubMethod = sinon.stub(ucServiceStub, 'getContentViewsList');
    getContentComponentViewsStubMethod.returns(contentComponentViewsListStub);

    const sut = new EditCurrentOprViewLayoutSubview(domDocStub, ucServiceStub);

    const selectionNode = sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_SELECTION_MARKER_CLASS}`);

    t.true(selectionNode.innerHTML.includes(viewnameStub), 'Stubed Viewname should be option in selection');

    t.end();
});

test(`${testgroup} changeSelectedContentComponentView_Always_queriesUcServiceForGridLines`, function (t) {

    const domDocStub = new JSDOM('').window.document;
    const oprProjectStub = new OprProject();
    const ucServiceStub = new EditCurrentOprViewLayoutUcService(oprProjectStub);
    const contentComponentViewsListStub = [{ viewname: 'viewNameStub0' }, { viewname: 'viewNameStub1' }];
    const getContentComponentViewsStubMethod = sinon.stub(ucServiceStub, 'getContentViewsList');
    getContentComponentViewsStubMethod.returns(contentComponentViewsListStub);
    const sut = new EditCurrentOprViewLayoutSubview(domDocStub, ucServiceStub);
    const getContentViewsBoundarySpy = sinon.spy(ucServiceStub, 'getContentViewBoundary');

    const changeEventStub = domDocStub.createEvent('HTMLEvents');
    changeEventStub.initEvent('change');
    const selectNode = sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_SELECTION_MARKER_CLASS}`);
    selectNode.selectedIndex = 1;
    selectNode.dispatchEvent(changeEventStub);

    t.true(getContentViewsBoundarySpy.calledWith(contentComponentViewsListStub[1].viewname));
    t.end();
});

test(`${testgroup} changeSelectedContentComponentView_LinkedGridLinesAreAvailableFromUcService_displaysLinkedGridLineNamesInCorrespondingSelectionNodes`, function (t) {

    const domDocStub = new JSDOM('').window.document;
    const oprProjectStub = new OprProject();
    const ucServiceStub = new EditCurrentOprViewLayoutUcService(oprProjectStub);
    //stub content component views assoziated with the current opr view
    const contentComponentViewsListStub = [{ viewname: 'viewNameStub0' }, { viewname: 'viewNameStub1' }];
    const getContentComponentViewsStubMethod = sinon.stub(ucServiceStub, 'getContentViewsList');
    getContentComponentViewsStubMethod.returns(contentComponentViewsListStub);
    // stub vertical and grid line list returned from ucService
    const verticalGridLineStub0 = 'verticalGridLineStub0';
    const verticalGridLineStub1 = 'verticalGridLineStub1';
    const horizontalGridLineStub0 = 'horizontalGridLineStub0';
    const horizontalGridLineStub1 = 'horizontalGridLineStub1';
    const availableVerticalGridLinesListStub = [{ name: verticalGridLineStub0 }, { name: verticalGridLineStub1 }];
    const getVerticalGridLineListStub = sinon.stub(ucServiceStub, 'getVerticalGridLineList');
    getVerticalGridLineListStub.returns(availableVerticalGridLinesListStub);
    const availableHorizontalGridLinesListStub = [{ name: horizontalGridLineStub0 }, { name: horizontalGridLineStub1 }];
    const getHorizontalGridLineList = sinon.stub(ucServiceStub, 'getHorizontalGridLineList');
    getHorizontalGridLineList.returns(availableHorizontalGridLinesListStub);
    // stub the lines linked to seleced viewname
    const selectedViewsGridLineNamesStub = {
        left: verticalGridLineStub0,
        right: verticalGridLineStub1,
        top: horizontalGridLineStub0,
        bottom: horizontalGridLineStub1
    };
    const getContentViewsBoundaryStub = sinon.stub(ucServiceStub, 'getContentViewBoundary');
    getContentViewsBoundaryStub.returns(selectedViewsGridLineNamesStub);
    const sut = new EditCurrentOprViewLayoutSubview(domDocStub, ucServiceStub);

    const changeEventStub = domDocStub.createEvent('HTMLEvents');
    changeEventStub.initEvent('change');
    const selectNode = sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_SELECTION_MARKER_CLASS}`);
    selectNode.selectedIndex = 1;
    selectNode.dispatchEvent(changeEventStub);

    //for each grid line selection check if the selectedIndex corresponds to the correct element
    const leftLineSelectionNode = sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_LEFT_LINE_SELECTION_MARKER_CLASS}`);
    const rightLineSelectionNode = sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_RIGHT_LINE_SELECTION_MARKER_CLASS}`);
    const topLineSelectionNode = sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_TOP_LINE_SELECTION_MARKER_CLASS}`);
    const bottomLineSelectionNode = sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_BOTTOM_LINE_SELECTION_MARKER_CLASS}`);
    function assertExpectedLineNameIsSelected(selectNode, expectedOptionText) {
        const i = selectNode.selectedIndex;
        // console.log(`${i} ${selectNode.options.item(i).text}`);
        t.equals(selectNode.options.item(i).text, expectedOptionText);
    }
    assertExpectedLineNameIsSelected(leftLineSelectionNode, selectedViewsGridLineNamesStub.left);
    assertExpectedLineNameIsSelected(rightLineSelectionNode, selectedViewsGridLineNamesStub.right);
    assertExpectedLineNameIsSelected(topLineSelectionNode, selectedViewsGridLineNamesStub.top);
    assertExpectedLineNameIsSelected(bottomLineSelectionNode, selectedViewsGridLineNamesStub.bottom);

    t.end();
});

//next test: what shall happen if the view has no associated grid lines?!
test(`${testgroup} changeSelectedContentComponentView_LinkedGridLinesAreUndefined_displaysDoubleDash`, function (t) {

    const domDocStub = new JSDOM('').window.document;
    const oprProjectStub = new OprProject();
    const ucServiceStub = new EditCurrentOprViewLayoutUcService(oprProjectStub);
    //stub content component views assoziated with the current opr view
    const contentComponentViewsListStub = [{ viewname: 'viewNameStub0' }, { viewname: 'viewNameStub1' }];
    const getContentComponentViewsStubMethod = sinon.stub(ucServiceStub, 'getContentViewsList');
    getContentComponentViewsStubMethod.returns(contentComponentViewsListStub);
    // stub vertical and grid line list returned from ucService
    const verticalGridLineStub0 = 'verticalGridLineStub0';
    const verticalGridLineStub1 = 'verticalGridLineStub1';
    const horizontalGridLineStub0 = 'horizontalGridLineStub0';
    const horizontalGridLineStub1 = 'horizontalGridLineStub1';
    const availableVerticalGridLinesListStub = [{ name: verticalGridLineStub0 }, { name: verticalGridLineStub1 }];
    const getVerticalGridLineListStub = sinon.stub(ucServiceStub, 'getVerticalGridLineList');
    getVerticalGridLineListStub.returns(availableVerticalGridLinesListStub);
    const availableHorizontalGridLinesListStub = [{ name: horizontalGridLineStub0 }, { name: horizontalGridLineStub1 }];
    const getHorizontalGridLineList = sinon.stub(ucServiceStub, 'getHorizontalGridLineList');
    getHorizontalGridLineList.returns(availableHorizontalGridLinesListStub);
    // stub the lines linked to seleced viewname
    const selectedViewsGridLineNamesStub = {
        left: undefined,
        right: undefined,
        top: undefined,
        bottom: undefined
    };
    const getContentViewBoundaryStub = sinon.stub(ucServiceStub, 'getContentViewBoundary');
    getContentViewBoundaryStub.returns(selectedViewsGridLineNamesStub);
    const sut = new EditCurrentOprViewLayoutSubview(domDocStub, ucServiceStub);

    const changeEventStub = domDocStub.createEvent('HTMLEvents');
    changeEventStub.initEvent('change');
    const selectNode = sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_SELECTION_MARKER_CLASS}`);
    selectNode.selectedIndex = 1;
    selectNode.dispatchEvent(changeEventStub);

    //for each grid line selection check if the selectedIndex corresponds to the correct element
    const leftLineSelectionNode = sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_LEFT_LINE_SELECTION_MARKER_CLASS}`);
    const rightLineSelectionNode = sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_RIGHT_LINE_SELECTION_MARKER_CLASS}`);
    const topLineSelectionNode = sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_TOP_LINE_SELECTION_MARKER_CLASS}`);
    const bottomLineSelectionNode = sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_BOTTOM_LINE_SELECTION_MARKER_CLASS}`);
    function assertExpectedLineNameIsSelected(selectNode, expectedOptionText) {
        const i = selectNode.selectedIndex;
        // console.log(`${i} ${selectNode.options.item(i).text}`);
        t.equals(selectNode.options.item(i).text, expectedOptionText);
    }
    assertExpectedLineNameIsSelected(leftLineSelectionNode, '--');
    assertExpectedLineNameIsSelected(rightLineSelectionNode, '--');
    assertExpectedLineNameIsSelected(topLineSelectionNode, '--');
    assertExpectedLineNameIsSelected(bottomLineSelectionNode, '--');

    t.end();
});


test(`${testgroup} setContentViewGridLinesClicked_AllGridLinesSelected_callsUCServiceWithProperParams`, function (t) {

    const domDocStub = new JSDOM('').window.document;
    const oprProjectStub = new OprProject();
    const ucServiceStub = new EditCurrentOprViewLayoutUcService(oprProjectStub);
    const setContentComponentViewsLayoutGridLineNamesSpy = sinon.spy(ucServiceStub, 'setContentViewBoundaries');  
    const viewNameStub = 'viewNameStub';
    const contentComponentViewsListStub = [{ viewname: viewNameStub }];
    const getContentComponentViewsStubMethod = sinon.stub(ucServiceStub, 'getContentViewsList');
    getContentComponentViewsStubMethod.returns(contentComponentViewsListStub);   
    const leftGridLineNameStub = 'leftGridLineNameStub';
    const rightGridLineNameStub = 'rightGridLineNameStub';
    const topGridLineNameStub = 'topGridLineNameStub';
    const bottomGridLineNameStub = 'bottomGridLineNameStub'; 
    const availableVerticalGridLinesListStub = [{ name: leftGridLineNameStub }, { name: rightGridLineNameStub }];
    const getVerticalGridLineListStub = sinon.stub(ucServiceStub, 'getVerticalGridLineList');
    getVerticalGridLineListStub.returns(availableVerticalGridLinesListStub);
    const availableHorizontalGridLinesListStub = [{ name: topGridLineNameStub }, { name: bottomGridLineNameStub }];
    const getHorizontalGridLineList = sinon.stub(ucServiceStub, 'getHorizontalGridLineList');
    getHorizontalGridLineList.returns(availableHorizontalGridLinesListStub);
    const sut = new EditCurrentOprViewLayoutSubview(domDocStub, ucServiceStub);//here because first call to getDomSubtree triggers rendering and changes to uc service are not observed afterwards
    sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_SELECTION_MARKER_CLASS}`).selectedIndex = 0;
    sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_LEFT_LINE_SELECTION_MARKER_CLASS}`).selectedIndex = 1;
    sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_RIGHT_LINE_SELECTION_MARKER_CLASS}`).selectedIndex = 2;
    sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_TOP_LINE_SELECTION_MARKER_CLASS}`).selectedIndex = 1;
    sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_BOTTOM_LINE_SELECTION_MARKER_CLASS}`).selectedIndex = 2;
    
    const setContentViewGridLinesButton = sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_SET_LINES_BUTTON_MARKER_CLASS}`);
    const clickEventStub = domDocStub.createEvent('MouseEvent');
    clickEventStub.initEvent('click');
    setContentViewGridLinesButton.dispatchEvent(clickEventStub);

    const expectedGridLineNames = {
        left: leftGridLineNameStub,
        right: rightGridLineNameStub,
        top: topGridLineNameStub,
         bottom: bottomGridLineNameStub
    };

    t.equals(setContentComponentViewsLayoutGridLineNamesSpy.getCall(0).args[0], viewNameStub);
    t.deepEqual(setContentComponentViewsLayoutGridLineNamesSpy.getCall(0).args[1], expectedGridLineNames);
    t.end();
});

//next test: when current Opr View grid lines are set, list displays this setting
test(`${testgroup} setContentViewGridLinesClicked_AllGridLinesSet_ShowsInContentComponentViewsWithGridLinesList`, function(t) {

    const domDocStub = new JSDOM('').window.document;
    const oprProjectStub = new OprProject();
    const ucServiceStub = new EditCurrentOprViewLayoutUcService(oprProjectStub);    
    const viewNameStub = 'viewNameStub';
    // const contentComponentViewsListStub = [{ viewname: viewNameStub }];
    // const getContentComponentViewsStubMethod = sinon.stub(ucServiceStub, 'getContentComponentViewList');
    // getContentComponentViewsStubMethod.returns(contentComponentViewsListStub);       
    const leftGridLineNameStub = 'leftGridLineNameStub';
    const rightGridLineNameStub = 'rightGridLineNameStub';
    const topGridLineNameStub = 'topGridLineNameStub';
    const bottomGridLineNameStub = 'bottomGridLineNameStub'; 
    const contentViewsWithGridLinesListStub = [{viewName: viewNameStub, lineNames : {left: leftGridLineNameStub, right: rightGridLineNameStub, top: topGridLineNameStub, bottom:bottomGridLineNameStub  }}];
    const getContentViewsWithGridLineNamesListStub = sinon.stub(ucServiceStub, 'getContentViewsWithBoundariesList');
    getContentViewsWithGridLineNamesListStub.returns(contentViewsWithGridLinesListStub);

    // const availableVerticalGridLinesListStub = [{ name: leftGridLineNameStub }, { name: rightGridLineNameStub }];
    // const getVerticalGridLineListStub = sinon.stub(ucServiceStub, 'getVerticalGridLineList');
    // getVerticalGridLineListStub.returns(availableVerticalGridLinesListStub);
    // const availableHorizontalGridLinesListStub = [{ name: topGridLineNameStub }, { name: bottomGridLineNameStub }];
    // const getHorizontalGridLineList = sinon.stub(ucServiceStub, 'getHorizontalGridLineList');
    // getHorizontalGridLineList.returns(availableHorizontalGridLinesListStub);
    const sut = new EditCurrentOprViewLayoutSubview(domDocStub, ucServiceStub);//here because first call to getDomSubtree triggers rendering and changes to uc service are not observed afterwards
    // sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_SELECTION_MARKER_CLASS}`).selectedIndex = 0;
    // sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_LEFT_LINE_SELECTION_MARKER_CLASS}`).selectedIndex = 1;
    // sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_RIGHT_LINE_SELECTION_MARKER_CLASS}`).selectedIndex = 2;
    // sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_TOP_LINE_SELECTION_MARKER_CLASS}`).selectedIndex = 1;
    // sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_BOTTOM_LINE_SELECTION_MARKER_CLASS}`).selectedIndex = 2;

    
    const setContentViewGridLinesButton = sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEW_SET_LINES_BUTTON_MARKER_CLASS}`);
    const clickEventStub = domDocStub.createEvent('MouseEvent');
    clickEventStub.initEvent('click');
    setContentViewGridLinesButton.dispatchEvent(clickEventStub);

    const listNodeContainer = sut.getDomSubtree().querySelector(`.${sut.CONTENT_COMPONENT_VIEWS_WITH_GRID_LINES_LIST_CONTAINER_MARKER_CLASS}`);
    const expectedListElement = listNodeContainer.querySelector(`[data-viewname=${viewNameStub}]`);
    const observedListElementInnerHtml = expectedListElement.innerHTML;
    
    t.true(observedListElementInnerHtml.includes(viewNameStub));
    t.true(observedListElementInnerHtml.includes(leftGridLineNameStub));
    t.true(observedListElementInnerHtml.includes(rightGridLineNameStub));
    t.true(observedListElementInnerHtml.includes(topGridLineNameStub));
    t.true(observedListElementInnerHtml.includes(bottomGridLineNameStub));
    t.end();
});