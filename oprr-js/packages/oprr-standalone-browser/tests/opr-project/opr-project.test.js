const test = require('tape');
const OprProject = require('../../src/opr-project/opr-project.js');
const IdTakenError = require('../../src/common/id-taken-error.js');
const OprView = require('../../src/opr-project/opr-view.js');

const testgroup = 'OprProject: '

test('addContentComponent_unusedId_canBeRetrievedById', function (t) {

    const sut = new OprProject();
    const contentComponentStub = {};
    const idStub = 'idStub';
    const idTypeStub = 'idTYpeStub';

    sut.addContentComponent(contentComponentStub, idTypeStub, idStub);

    t.equal(sut.getContentComponent(idStub), contentComponentStub);

    t.end();

});

test('addContentComponent_usedId_throwsIdTakenError', function (t) {

    const sut = new OprProject();
    const contentComponentStub = {};
    const idStub = 'idStub';
    const idTypeStub = 'idTypeStub';

    sut.addContentComponent(contentComponentStub, idTypeStub, idStub);
    let caughtProperError = false;
    try {
        sut.addContentComponent(contentComponentStub, idTypeStub, idStub)
    } catch (e) {
        caughtProperError = e instanceof IdTakenError;
    }

    t.true(caughtProperError, 'expected throw of IdTakenError');
    t.end();

});

test('getContentComponentCount_notUsedId_returnsZero', function (t) {
    const sut = new OprProject();

    t.equals(sut.getContentComponentTypeCount('typeIdStub'), 0);

    t.end();
});

test(`${testgroup} getContentComponentCount_alreadyUsedId_returnsOne`, function (t) {
    const sut = new OprProject();

    const contentComponentStub = {};
    const idStub = 'idStub';
    const typeIdStub = 'typeIdStub';
    sut.addContentComponent(contentComponentStub, typeIdStub, idStub);

    t.equals(sut.getContentComponentTypeCount(typeIdStub), 1);
    t.end();
});

test(`${testgroup} getCurrentOprView_Always_returnDefinedOprView`, function (t) {

    const sut = new OprProject();

    const observedCurrentOprView = sut.getCurrentOprView();

    t.notEqual(observedCurrentOprView, undefined);   
    t.true(observedCurrentOprView instanceof OprView, 'should be OprView Type');
    t.end();
});


