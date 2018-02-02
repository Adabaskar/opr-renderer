const test = require('tape');
const OprContentComponentRepository = require('../../src/content-components/opr-content-component-repository.js');
const contentComponentContractValidationTestFactory = require('oprr-content-component-contract').contentComponentMetadatContractTapeTestFactory;
const sinon = require('sinon');

const testgrouplabel = 'OprContentComponentRepository:'

function makeStubContentComponentModule(id) {

    return {
        metadata: {
            contentComponentTypeId: `${id}`,
            contentViews: [{ viewTypeId: '', defaultDisplayName: '' }],
            getDisplayName: function () { return `displayName${id}`; }
        },
        makeInstance: function () { return { setDomDoc: function (domDoc) { } } }

    }

};

test('metadataStub adhers to metadata contract', function (t) {

    const stubMetadata = makeStubContentComponentModule('someId').metadata;
    const stubMetadataValidationTest = contentComponentContractValidationTestFactory(stubMetadata);
    stubMetadataValidationTest(t);

});

test('getContentComponentNonVerboseList_RegistryReturnsNonEmptyList_usesIdAndDisplayNameFromMetdata', function (t) {

    const ccIdStub = 'ccIdStub';
    const registerStub = [];
    registerStub.push(makeStubContentComponentModule(ccIdStub));
    const registryStub = {};
    registryStub.getRegister = () => { return registerStub; }
    const sut = new OprContentComponentRepository(registryStub);

    const result = sut.getContentComponentNonVerboseList();

    t.equals(result.length, 1);
    t.equals(result[0].typeId, ccIdStub);
    t.equals(result[0].name, `displayName${ccIdStub}`);

    t.end();
});

test(`${testgrouplabel} getNewContentComponentInstance_KnownContentComponent_callsModulesExportetMakeInstanceMethod`, function (t) {

    const ccIdStub = 'ccIdStub';
    const registerStub = [];
    const stubCCModule = makeStubContentComponentModule(ccIdStub);
   sinon.spy(stubCCModule, 'makeInstance');
    registerStub.push(stubCCModule);
    const registryStub = {};
    registryStub.getRegister = () => { return registerStub; }
    const sut = new OprContentComponentRepository(registryStub);

    sut.getNewContentComponentInstance(ccIdStub);

    t.true(stubCCModule.makeInstance.called);
    t.end();
});

test(`${testgrouplabel} getNameOfContentComponent_KnownContentComponent_returnsDisplaynameFromMetadata`, function (t) {

    const ccIdStub = 'ccIdStub';
    const registerStub = [];
    const stubCCModule = makeStubContentComponentModule(ccIdStub);
    registerStub.push(stubCCModule);
    const registryStub = {};
    registryStub.getRegister = () => { return registerStub; }
    const sut = new OprContentComponentRepository(registryStub);

    const observedName = sut.getNameOfContentComponent(ccIdStub);

    t.equals(observedName, `displayName${ccIdStub}`);

    t.end();
});

test(`${testgrouplabel} getNewContentComponentInstance_DomViewsEnabled_callsSetDomDocOnNewInstance`, function (t) {

    const ccIdStub = 'ccIdStub';
    const registerStub = [];
    const stubCCModule = makeStubContentComponentModule(ccIdStub);
    const makeInstanceStub = sinon.stub(stubCCModule, 'makeInstance');
    const setDomDocSpy = sinon.spy();
    const domDocStub = {};
    makeInstanceStub.returns({setDomDoc : setDomDocSpy});
    registerStub.push(stubCCModule);
    const registryStub = {};
    registryStub.getRegister = () => { return registerStub; }
    const sut = new OprContentComponentRepository(registryStub);
    sut.enableDomBasedViewsOnNewContentComponentInstances(domDocStub);

    sut.getNewContentComponentInstance(ccIdStub);

    const expectedMethodCall = setDomDocSpy.getCall(0);
    t.equal(expectedMethodCall.args[0], domDocStub)
    t.end();
});
