const test = require('tape');
const sinon = require('sinon');
const ManageContentComponentsUcService = require('../../../src/use-cases/manage-content-components/manage-content-components-uc-service.js');
const OprContentComponentsRepository = require('../../../src/content-components/opr-content-component-repository.js');
const OprProject = require('../../../src/opr-project/opr-project.js');

const testgroup = 'ManageContentComponentsUcService:'

test(`${testgroup} getAddableContentComponents_Always_queriesContentComponentRepository`, function (t) {

    const oprProjectStub = new OprProject();
    const repoStub = new OprContentComponentsRepository();
    const repoQuerySpy = sinon.spy(repoStub, 'getContentComponentNonVerboseList');
    const sut = new ManageContentComponentsUcService(oprProjectStub, repoStub);

    sut.getAddableContentComponents();

    t.true(repoQuerySpy.called, 'should query repo');
    t.end();
});

test(`${testgroup} addContentComponent_Always_callsRepositoryWithId`, function (t) {

    const oprProjectStub = new OprProject();
    const repoStub = new OprContentComponentsRepository();
    const getNewContentComponentInstanceStub = sinon.stub(repoStub, 'getNewContentComponentInstance');
    getNewContentComponentInstanceStub.returns({});
    const getDisplayNameOfContentComponentStub = sinon.stub(repoStub, 'getDisplayNameOfContentComponent');
    getDisplayNameOfContentComponentStub.returns('someName');
    const sut = new ManageContentComponentsUcService(oprProjectStub, repoStub);
    const typedIdStub = 'typeIdStub';
    sut.addContentComponent(typedIdStub);

    t.true(repoStub.getNewContentComponentInstance.calledWith(typedIdStub), `get instance for typeId="${typedIdStub}" from repo`);
    t.end();
});

test(`${testgroup} addContentComponent_InstanceReturnedFromRepository_callsOprProject`, function (t) {

    const oprProjectStub = new OprProject();
    const repoStub = new OprContentComponentsRepository();
    const getNewContentComponentInstanceStub = sinon.stub(repoStub, 'getNewContentComponentInstance');
    getNewContentComponentInstanceStub.returns({});
    const getDisplayNameOfContentComponentStub = sinon.stub(repoStub, 'getDisplayNameOfContentComponent');
    getDisplayNameOfContentComponentStub.returns('someName');

    const sut = new ManageContentComponentsUcService(oprProjectStub, repoStub);
    oprProjectStub.addContentComponent = sinon.spy();
    const contentComponentTypeIdStub = 'typeIdStub';
    sut.addContentComponent(contentComponentTypeIdStub);

    t.true(oprProjectStub.addContentComponent.called);

    t.end();
});

test(`${testgroup} addContentComponent_FirstInstanceAdded_usesContentComponentNameForName`, function (t) {

    const oprProjectStub = new OprProject();
    const repoStub = new OprContentComponentsRepository();
    const nameStub = 'contentComponentNameStub';
     const getNewContentComponentInstanceStub = sinon.stub(repoStub, 'getNewContentComponentInstance');
    getNewContentComponentInstanceStub.returns({});
    const getDisplayNameOfContentComponentStub = sinon.stub(repoStub, 'getDisplayNameOfContentComponent');
    getDisplayNameOfContentComponentStub.returns(nameStub);
 
    const sut = new ManageContentComponentsUcService(oprProjectStub, repoStub);
    oprProjectStub.addContentComponent = sinon.spy();
    const contentComponentTypeIdStub = 'typeIdStub';
    sut.addContentComponent(contentComponentTypeIdStub);

    t.equals(oprProjectStub.addContentComponent.getCall(0).args[2], nameStub);

    t.end();
});

test(`${testgroup} addContentComponent_SecondInstanceAdded_usesContentComponentNameForNameWithAddedCountNumber`, function (t) {

    const oprProjectStub = new OprProject();
    const repoStub = new OprContentComponentsRepository();
    const getNewContentComponentInstanceStub = sinon.stub(repoStub, 'getNewContentComponentInstance');
    getNewContentComponentInstanceStub.returns({});
    const nameStub = 'contentComponentNameStub';
    const getDisplayNameOfContentComponentStub = sinon.stub(repoStub, 'getDisplayNameOfContentComponent');
    getDisplayNameOfContentComponentStub.returns(nameStub);

    const sut = new ManageContentComponentsUcService(oprProjectStub, repoStub);
    const addContentComponentSpy = sinon.spy(oprProjectStub, 'addContentComponent');
    const contentComponentTypeIdStub = 'typeIdStub';
    oprProjectStub.addContentComponent({}, contentComponentTypeIdStub, 'unimportantName');
    sut.addContentComponent(contentComponentTypeIdStub);

    t.equals(addContentComponentSpy.getCall(1).args[2], nameStub + ' 1');

    t.end();
});





