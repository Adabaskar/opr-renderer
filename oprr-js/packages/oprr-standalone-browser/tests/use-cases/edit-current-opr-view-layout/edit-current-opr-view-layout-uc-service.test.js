const test = require('tape');
const sinon = require('sinon');
const EditCurrentOprViewLayoutUcService = require('../../../src/use-cases/edit-current-opr-view-layout/edit-current-opr-view-layout-uc-service.js');
const OprProject = require('../../../src/opr-project/opr-project.js');

const testgroup = 'EditCurrentOprViewLayoutUcService :';

test(`${testgroup} setVerticalGridLine_RelativeToLeftUnusedName_retrievableViaCurrentOprView`, function (t) {

    const oprProject = new OprProject();
    const gridLineNameStub = 'gridLineNameStub';
    const reltiveToLeft = true;
    const offsetStub = 10;
    const sut = new EditCurrentOprViewLayoutUcService(oprProject);

    sut.setVerticalGridLine(gridLineNameStub, offsetStub, reltiveToLeft);

    const currentLayout = oprProject.getCurrentOprView().getLayoutGrid();
    const observedGridLine = currentLayout.getVerticalGridLineLeftOffset(gridLineNameStub);

    t.equals(observedGridLine, offsetStub);
    t.end();
});

test(`${testgroup} setHorizontalGridLine_RelativeToTopUnusedName_retrievableViaCurrentOprViewsLayout`, function (t) {

    const oprProject = new OprProject();
    const gridLineNameStube = 'gridLineNameStub';
    const reltiveToTop = true;
    const offsetStub = 12;
    const sut = new EditCurrentOprViewLayoutUcService(oprProject);

    sut.setHorizontalGridLine(gridLineNameStube, offsetStub, reltiveToTop);

    const currentLayout = oprProject.getCurrentOprView().getLayoutGrid();
    const observedGridLineTopOffset = currentLayout.getHorizontalGridLineTopOffset(gridLineNameStube);    

    t.equals(observedGridLineTopOffset, offsetStub);
    t.end();
});

test(`${testgroup} getVerticalGridLineList_Always_returnsListFromCurrentViewLayout`, function (t) {

    const oprProjectStub = new OprProject();
    oprProjectStub.getCurrentOprView().getLayoutGrid().setVerticalGridLineFromLeft('lineNameStub', 20.546);
    const sut = new EditCurrentOprViewLayoutUcService(oprProjectStub);

    const expectedList = oprProjectStub.getCurrentOprView().getLayoutGrid().getVerticalGridLineList();
    const observedList = sut.getVerticalGridLineList();
    t.deepEquals(observedList, expectedList);
    t.end();
});

test(`${testgroup} getHorizontalGridLineList_Always_returnsListFromCurrentViewLayout`, function (t) {

    const oprProjectStub = new OprProject();
    const sut = new EditCurrentOprViewLayoutUcService(oprProjectStub);

    oprProjectStub.getCurrentOprView().getLayoutGrid().setHorizontalGridLineFromTop('lineNameStub', 20.546);
    const expectedList = oprProjectStub.getCurrentOprView().getLayoutGrid().getHorizontalGridLineList();
    const observedList = sut.getHorizontalGridLineList();

    t.true(observedList.length > 0);
    t.deepEquals(observedList, expectedList);
    t.end();
});

test(`${testgroup} setContentViewBoundaries_Always_callsSetContentViewBoundaries`, function (t) {

    const oprProjectStub = new OprProject();
    const currenOprView = oprProjectStub.getCurrentOprView();
    const setContentViewGridLineNamesSpy = sinon.spy(currenOprView, 'setContentViewBoundary');
    const sut = new EditCurrentOprViewLayoutUcService(oprProjectStub);
    const viewNameStub = 'viewNameStub';
    const lineNamesStub = {
        left: 'leftStub',
        right: 'rightStub',
        top: 'topStub',
        bottom: 'bottomStub'
    };
    sut.setContentViewBoundaries(viewNameStub, lineNamesStub);

    t.equal(setContentViewGridLineNamesSpy.getCall(0).args[0], viewNameStub);
    t.deepEqual(setContentViewGridLineNamesSpy.getCall(0).args[1], lineNamesStub);
    t.end();
});

test(`${testgroup} getContentViewsWithBoundariesList_Always_CallsCurrentOprViewMethod`, function (t) {

    const oprProjectStub = new OprProject();
    const currenOprView = oprProjectStub.getCurrentOprView();
    const getContentViewWithBoundariesListSpy = sinon.spy(currenOprView, 'getContentViewsWithBoundaryList');
    const sut = new EditCurrentOprViewLayoutUcService(oprProjectStub);

    sut.getContentViewsWithBoundariesList();

    t.true(getContentViewWithBoundariesListSpy.called);
    t.end();
});

test(`${testgroup} getContentViewsBoundary_Always_callsCurrentViewsMethod`, function (t) {

    const oprProjectStub = new OprProject();
    const currenOprView = oprProjectStub.getCurrentOprView();
    const getContentViewBoundarySpy = sinon.spy(currenOprView, 'getContentViewBoundaryNames');
    const sut = new EditCurrentOprViewLayoutUcService(oprProjectStub);
    const viewNameStub = 'viewNameStub';
    sut.getContentViewBoundary(viewNameStub);

    t.equal(getContentViewBoundarySpy.getCall(0).args[0], viewNameStub);
    t.end();
});


test(`${testgroup} ghetContentViewsList_Always_callsCurrentViewsMethod`, function (t) {

    const oprProjectStub = new OprProject();
    const currenOprView = oprProjectStub.getCurrentOprView();
    const getContentViewsListSpy = sinon.spy(currenOprView, 'getContentViewNamesList');
    const sut = new EditCurrentOprViewLayoutUcService(oprProjectStub);
    const viewNameStub = 'viewNameStub';
    sut.getContentViewNamesList();

    t.true(getContentViewsListSpy.called);
    t.end();
});