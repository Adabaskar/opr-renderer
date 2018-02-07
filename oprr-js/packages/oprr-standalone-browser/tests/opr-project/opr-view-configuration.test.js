const test = require('tape');
const OprViewConfiguration = require('../../src/opr-project/opr-view-configuration.js');
const NonUniformGrid = require('../../src/opr-project/non-uniform-grid.js');

const testgroup = 'OprViewConfiguration:';

test(`${testgroup} addContentView_ViewNameNotTaken_isPartOfViewList`, function (t) {

    const sut = new OprViewConfiguration();
    const viewNameStub = 'viewNameStub';
    const contentComponentInstanceIdStub = 'contentComponentInstanceIdStub';
    const viewIdStub = 'viewIdStub';

    sut.addContentView(viewNameStub, contentComponentInstanceIdStub, viewIdStub);

    t.true(sut.getContentViewNamesList().includes(viewNameStub));
    t.end();
});

test(`${testgroup} isContentViewNameTaken_ViewNameTaken_returnTrue`, function (t) {

    const sut = new OprViewConfiguration();
    const viewNameStub = 'viewNameStub';
    const contentComponentInstanceIdStub = 'contentComponentInstanceIdStub';
    const viewIdStub = 'viewIdStub';
    sut.addContentView(viewNameStub, contentComponentInstanceIdStub, viewIdStub);

    t.true(sut.isContentViewNameTaken(viewNameStub));

    t.end();
});

test(`${testgroup} isContentViewNameTaken_ViewNameNotTaken_returnFalse`, function (t) {

    const sut = new OprViewConfiguration();
    const viewNameStub = 'viewNameStub';

    t.false(sut.isContentViewNameTaken(viewNameStub));

    t.end();
});

test(`${testgroup} setContentViewBoundary_ValidInput_returnedByGetContenViewBoundary`, function (t) {

    const sut = new OprViewConfiguration();
    const viewNameStub = 'viewNameStub';
    const leftNameStub = 'leftNameStub';
    const rightNameStub = 'rightNameStub';
    const topNameStub = 'topNameStub';
    const bottomNameStub = 'bottomNameStub';
    const lineNamesStub = {
        left: leftNameStub,
        right: rightNameStub,
        top: topNameStub,
        bottom: bottomNameStub
    };
    sut.setContentViewBoundary(viewNameStub, lineNamesStub);

    t.deepEqual(sut.getContentViewBoundaryNames(viewNameStub), lineNamesStub);
    t.end();
});

test(`${testgroup} setContentViewBoundary_ValidInput_getContentViewsWithBoundariesList`, function (t) {

    const sut = new OprViewConfiguration();
    const viewNameStub = 'viewNameStub';
    const leftNameStub = 'leftNameStub';
    const rightNameStub = 'rightNameStub';
    const topNameStub = 'topNameStub';
    const bottomNameStub = 'bottomNameStub';
    const lineNamesStub = {
        left: leftNameStub,
        right: rightNameStub,
        top: topNameStub,
        bottom: bottomNameStub
    };
    sut.setContentViewBoundary(viewNameStub, lineNamesStub);

    const observedContentViewsWithBoundaryList = sut.getContentViewsWithBoundaryList();

    let found = false;
    for (let i = 0; i < observedContentViewsWithBoundaryList.length && !found; i++) {
        found = observedContentViewsWithBoundaryList[i].viewName === viewNameStub;
    }
    t.true(found);

    t.end();
});


test(`${testgroup} getContentViewMetadataList_Always_retrievesAddedView`, function (t) {

    const sut = new OprViewConfiguration();
    const viewNameStub = 'viewNameStub';
    const contentComponentInstanceIdStub = 'contentComponentInstanceIdStub';
    const viewIdStub = 'viewIdStub';

    sut.addContentView(viewNameStub, contentComponentInstanceIdStub, viewIdStub);
    const observedList = sut.getContentViewMetadataList();
    t.equal(observedList.length, 1);
    const observedElement = observedList[0];
    t.equal(observedElement.ccInstId, contentComponentInstanceIdStub);
    t.equal(observedElement.ccInstContentViewId, viewIdStub);
    t.equal(observedElement.oprViewContentViewName, viewNameStub);
    t.end();
});