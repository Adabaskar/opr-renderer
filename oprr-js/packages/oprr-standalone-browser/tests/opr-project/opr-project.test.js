const test = require('tape');
const OprProject = require('../../src/opr-project/opr-project.js');
const IdTakenError = require('../../src/common/id-taken-error.js');
const OprView = require('../../src/opr-project/opr-view.js');
const sinon = require('sinon');

const testgrouplabel = 'OprProject: '

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

test(`${testgrouplabel} getContentComponentCount_alreadyUsedId_returnsOne`, function (t) {
    const sut = new OprProject();

    const contentComponentStub = {};
    const idStub = 'idStub';
    const typeIdStub = 'typeIdStub';
    sut.addContentComponent(contentComponentStub, typeIdStub, idStub);

    t.equals(sut.getContentComponentTypeCount(typeIdStub), 1);
    t.end();
});

test(`${testgrouplabel} getCurrentOprView_Always_returnDefinedOprView`, function (t) {

    const sut = new OprProject();

    const observedCurrentOprView = sut.getCurrentOprView();

    t.notEqual(observedCurrentOprView, undefined);
    t.true(observedCurrentOprView instanceof OprView, 'should be OprView Type');
    t.end();
});


test(`${testgrouplabel} getAddedContentComponentsList_ContentComponentAdded_returnsAppropriateMapContent`, function (t) {

    const sut = new OprProject();
    sut.addContentComponent({}, 'typeIdStub0', 'contentComponentStub0');
    sut.addContentComponent({}, 'typeIdStub1', 'contentComponentStub1');

    const observedContentComponentsList = sut.getAddedContentComponentInstancesList();

    function observedListContainsExpectedElement(expectedInstanceId, expectedTypeId) {
        let containsExpectedElement = false;
        for (let i = 0; i<observedContentComponentsList.length; i++) {
            const elementUnderTest = observedContentComponentsList[i];
            containsExpectedElement =
                (elementUnderTest.contentComponentInstanceId === expectedInstanceId) &&
                (elementUnderTest.contentComponentInstanceName === expectedInstanceId) &&
                (elementUnderTest.contentComponentTypeId === expectedTypeId);
            if (containsExpectedElement)
                return true;
        }
        return false;
    }

    t.true(observedListContainsExpectedElement('contentComponentStub0', 'typeIdStub0'), 'element 0 not found');
    t.true(observedListContainsExpectedElement('contentComponentStub1', 'typeIdStub1'), 'element 1 not found');
    t.end();
});

test(`${testgrouplabel} addContentComponentView_UnknownContentComponentName_throwsError`, function (t) {

    const sut = new OprProject();

    t.throws(() => sut.addContentComponentView('unknownContentComponentInstanceName', 'someViewTypeId'));

    t.end();
});

test(`${testgrouplabel} addContentComponentView_TechnicallyValidInput_returnsResultFromContentComponentMethodCall`, function (t) {
 
    const sut = new OprProject();
    const addDomBasedViewStub = sinon.stub();
    const assignedViewIdStub = 'assignedViewIdStub';
    addDomBasedViewStub.returns(assignedViewIdStub);
    const contentComponentInstanceStub = {
        addDomBasedView : addDomBasedViewStub
    }
    const contentComponentInstanceNameStub = 'contentComponentNameStub';
    sut.addContentComponent(contentComponentInstanceStub, 'someContentComponentTypeId', contentComponentInstanceNameStub);
    const contentViewTypeIdStub = 'contentViewTypeIdStub';
    const observedViewId = sut.addContentComponentView(contentComponentInstanceNameStub, contentViewTypeIdStub);

    const expectedMethodCall = addDomBasedViewStub.getCall(0);

    t.equal(expectedMethodCall.args[0], contentViewTypeIdStub);
    t.equal(observedViewId, assignedViewIdStub);
    
    t.end();
});