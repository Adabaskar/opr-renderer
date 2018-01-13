const test = require('tape');
const sinon = require('sinon');
const EditCurrentOprViewLayoutUcService = require('../../../src/use-cases/edit-current-opr-view-layout/edit-current-opr-view-layout-uc-service.js');
const OprProject = require('../../../src/opr-project/opr-project.js');

const testgroup = 'EditCurrentOprViewLayoutUcService :';

test(`${testgroup} setVerticalGridLine_RelativeToLeftUnusedName_retrievableViaCurrentOprViewsLayout`, function (t) {

    const oprProject = new OprProject();
    const gridLineNameStube = 'gridLineNameStub';
    const reltiveToLeft = true;
    const offsetStub = 10;
    const sut = new EditCurrentOprViewLayoutUcService(oprProject);

    sut.setVerticalGridLine(gridLineNameStube, offsetStub, reltiveToLeft);

    const currentLayout = oprProject.getCurrentOprView().getLayout();
    const observedGridLine = currentLayout.getVerticalGridLineLeftOffset(gridLineNameStube);

    t.equals(observedGridLine, offsetStub);
    t.end();
});

test(`${testgroup} setHorizontalGridLine_RelativeToTopUnusedName_retrievableViaCurrentOprViewsLayout`, function (t) {

    const oprProject = new OprProject();
    const gridLineNameStube = 'gridLineNameStub';
    const reltiveToTop = true;
    const offsetStub = 10;
    const sut = new EditCurrentOprViewLayoutUcService(oprProject);

    sut.setHorizontalGridLine(gridLineNameStube, offsetStub, reltiveToTop);

    const currentLayout = oprProject.getCurrentOprView().getLayout();
    const observedGridLine = currentLayout.getHorizontalGridLineTopOffset(gridLineNameStube);

    t.equals(observedGridLine, offsetStub);
    t.end();
});

test(`${testgroup} getVerticalGridLineList_Always_returnsListFromCurrentViewLayout`, function (t) {

    const oprProjectStub = new OprProject();
    oprProjectStub.getCurrentOprView().getLayout().setVerticalGridLineFromLeft('lineNameStub', 20.546);
    const sut = new EditCurrentOprViewLayoutUcService(oprProjectStub);

    const expectedList =  oprProjectStub.getCurrentOprView().getLayout().getVerticalGridLineList();
    const observedList = sut.getVerticalGridLineList();
    t.deepEquals(observedList, expectedList);
    t.end();
});

test(`${testgroup} getHorizontalGridLineList_Always_returnsListFromCurrentViewLayout`, function (t) {

    const oprProjectStub = new OprProject();    
    const sut = new EditCurrentOprViewLayoutUcService(oprProjectStub);

    oprProjectStub.getCurrentOprView().getLayout().setHorizontalGridLineFromTop('lineNameStub', 20.546);
    const expectedList =  oprProjectStub.getCurrentOprView().getLayout().getHorizontalGridLineList();
    const observedList = sut.getHorizontalGridLineList();
    
    t.true(observedList.length > 0);
    t.deepEquals(observedList, expectedList);
    t.end();
});