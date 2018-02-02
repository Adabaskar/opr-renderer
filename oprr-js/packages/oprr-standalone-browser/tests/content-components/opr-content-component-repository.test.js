const test = require('tape');
const OprContentComponentRepository = require('../../src/content-components/opr-content-component-repository.js');
const contentComponentContractValidationTestFactory = require('oprr-content-component-contract').contentComponentMetadatContractTapeTestFactory;
const sinon = require('sinon');

const testgroup = 'OprContentComponentRepository:'

function makeStubContentComponentModule(id) {

    return {
        metadata: {
            contentComponentTypeId: `${id}`,
            contentViews: [{viewTypeId: '', defaultDisplayName: ''}],
            getDisplayName: function () { return `displayName${id}`; }
        },
        makeInstance: function () { return {} }

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

test(`${testgroup} getNewContentComponentInstance_KnownContentComponent_callsModulesExportetMakeInstanceMethod`, function (t) {

    const ccIdStub = 'ccIdStub';
    const registerStub = [];
    const stubCCModule = makeStubContentComponentModule(ccIdStub);
    stubCCModule.makeInstance = sinon.spy();
    registerStub.push(stubCCModule);
    const registryStub = {};
    registryStub.getRegister = () => { return registerStub; }
    const sut = new OprContentComponentRepository(registryStub);

    sut.getNewContentComponentInstance(ccIdStub);

    t.true(  stubCCModule.makeInstance.called);
    t.end();
});

test(`${testgroup} getNameOfContentComponent_KnownContentComponent_returnsDisplaynameFromMetadata`, function (t) {

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