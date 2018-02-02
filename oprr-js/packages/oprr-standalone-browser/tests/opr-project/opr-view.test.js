const test = require('tape');
const OprView = require('../../src/opr-project/opr-view.js');
const NonUniformGrid = require('../../src/opr-project/non-uniform-grid.js');

const testgroup = 'OprView:';

test(`${testgroup} getLayout_Always_DefinedObject`, function (t) {

    const sut = new OprView();
    const observedLayout = sut.getLayoutGrid();

    t.notEqual(observedLayout, undefined);
    t.true(observedLayout instanceof NonUniformGrid, 'should be NonUniformGrid type');
    t.end();
});

test(`${testgroup} addContentView_ViewNameNotTaken_isPartOfViewList`, function (t) {

    const sut = new OprView();
    const viewNameStub = 'viewNameStub';
    const viewIdStub = 'viewIdStub';

    sut.addContentView(viewNameStub, viewIdStub);

    t.true(sut.getContentViewNamesList().includes(viewNameStub));
    t.end();
});

test(`${testgroup} isContentViewNameTaken_ViewNameTaken_returnTrue`, function (t) {

    const sut = new OprView();
    const viewNameStub = 'viewNameStub';
    const viewIdStub = 'viewIdStub';
    sut.addContentView(viewNameStub, viewIdStub);

    t.true(sut.isContentViewNameTaken(viewNameStub));

    t.end();
});

test(`${testgroup} isContentViewNameTaken_ViewNameNotTaken_returnFalse`, function (t) {

    const sut = new OprView();
    const viewNameStub = 'viewNameStub';

    t.false(sut.isContentViewNameTaken(viewNameStub));

    t.end();
});

test(`${testgroup} setContentViewBoundary_ValidInput_returnedByGetContenViewBoundary`, function (t) {

    const sut = new OprView();
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

    const sut = new OprView();
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