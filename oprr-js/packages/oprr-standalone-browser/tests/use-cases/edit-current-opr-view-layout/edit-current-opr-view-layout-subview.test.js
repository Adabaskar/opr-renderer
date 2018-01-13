const test = require('tape');
const sinon = require('sinon');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const EditCurrentOprViewLayoutSubview = require('../../../src/use-cases/edit-current-opr-view-layout/edit-current-opr-view-layout-subview.js');
const EditCurrentOprViewLayoutUcService = require('../../../src/use-cases/edit-current-opr-view-layout/edit-current-opr-view-layout-uc-service.js');
const OprProject = require('../../../src/opr-project/opr-project.js');

const testgroup = 'EditCurrentOprViewLayoutSubview:'


function typeVerticalGridLineDataIntoInputFields(sut, lineName, position) {
    sut.getDomSubtree().querySelector(`.${sut.ADD_VERTICAL_GRID_LINE_NAME_INPUT_MARKER_CLASS}`).value = lineName;
    sut.getDomSubtree().querySelector(`.${sut.ADD_VERTICAL_GRID_LINE_POSITION_INPUT_MARKER_CLASS}`).value = position;
}
function clickOnVerticalGridLineSetButton(sut, domDoc) {
    const addButton = sut.getDomSubtree().querySelector(`.${sut.ADD_VERTICAL_GRID_LINE_BUTTON_MARKER_CLASS}`);
    const clickEventStub = domDoc.createEvent('MouseEvent');
    clickEventStub.initEvent('click');
    addButton.dispatchEvent(clickEventStub);
}

function typeHorizontalGridLineDataIntoInputFields(sut, lineName, position) {
    sut.getDomSubtree().querySelector(`.${sut.ADD_HORIZONTAL_GRID_LINE_NAME_INPUT_MARKER_CLASS}`).value = lineName;
    sut.getDomSubtree().querySelector(`.${sut.ADD_HORIZONTAL_GRID_LINE_POSITION_INPUT_MARKER_CLASS}`).value = position;
}
function clickOnHorizontalGridLineSetButton(sut, domDoc) {
    const addButton = sut.getDomSubtree().querySelector(`.${sut.ADD_HORIZONTAL_GRID_LINE_BUTTON_MARKER_CLASS}`);
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
    
    const verticalLinesList = sut.getDomSubtree().querySelector(`.${sut.AVAILABLE_VERTICAL_LINES_LIST_MARKER_CLASS}`);
    const expectedElement = verticalLinesList.querySelector(`[data-linename=${lineNameStub}]`); 
    t.true(expectedElement.innerHTML.includes(lineNameStub));
    t.true(expectedElement.innerHTML.includes(positionStub));
    t.true(expectedElement.innerHTML.includes(100-positionStub));

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
    
    const horizontalLinesList = sut.getDomSubtree().querySelector(`.${sut.AVAILABLE_HORIZONTAL_LINES_LIST_MARKER_CLASS}`);
    const expectedElement = horizontalLinesList.querySelector(`[data-linename=${lineNameStub}]`);      
    t.true(expectedElement.innerHTML.includes(lineNameStub));
    t.true(expectedElement.innerHTML.includes(positionStub));
    t.true(expectedElement.innerHTML.includes(100-positionStub));
    t.end();
});