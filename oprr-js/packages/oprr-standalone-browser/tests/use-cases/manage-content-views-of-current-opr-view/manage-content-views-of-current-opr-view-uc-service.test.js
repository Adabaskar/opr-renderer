import { equal } from 'assert';

const test = require('tape');
const sinon = require('sinon');
const OprProject = require('../../../src/opr-project/opr-project.js');
const ManageContentViewsOfCurrentOprViewUcService = require('../../../src/use-cases/manage-content-views-of-current-opr-view/manage-content-views-of-current-opr-view-uc-service.js');
const OprContentComponentRepository = require('../../../src/content-components/opr-content-component-repository.js');

const testgroup = 'ManageContentViewsOfCurrentOprViewUcService:';

test(`${testgroup} getAvailableContentComponents_Always_returnsAllContentComponentNamesFromOprProject`, function (t) {

    const oprProjectStub = new OprProject();
    const getAddedContentComponentsListStub = sinon.stub(oprProjectStub, 'getAddedContentComponentsList');
    const contentComponentNameStub0 = 'contentComponentNameStub0';
    const contentComponentNameStub1 = 'contentComponentNameStub1';
    const addedContentComponentsListStub = [
        {
            contentComponentName: contentComponentNameStub0,
            contentComponentTypeId: 'type0'
        },
        {
            contentComponentName: contentComponentNameStub1,
            contentComponentTypeId: 'type1'
        },
    ];
    getAddedContentComponentsListStub.returns(addedContentComponentsListStub);
    const sut = new ManageContentViewsOfCurrentOprViewUcService(oprProjectStub, {});

    const observedContentComponentsList = sut.getAvailableContentComponents();
    const expectedContentComponentsListElements = [contentComponentNameStub0, contentComponentNameStub1];

    for (let i = 0; i < expectedContentComponentsListElements.length; i++) {
        t.true(observedContentComponentsList.includes(expectedContentComponentsListElements[i]), `missing ${expectedContentComponentsListElements[i]}`);
    }
    t.end();
});

test(`${testgroup} getAvailableContentViewOptions_Always_asksContentComponentRepositoryWithProperId`, function (t) {


    const oprProjectStub = new OprProject();
    const contentComponentRepoStub = new OprContentComponentRepository();
    const getContentViewMetdataStub = sinon.stub(contentComponentRepoStub, 'getContentViewMetadata');
    const contentViewMetadataStub = [{ viewTypeId: 'typeStub', defaultDisplayName: 'defaultDisplayNameStub' }];
    getContentViewMetdataStub.returns(contentViewMetadataStub);
    const getAddedContentComponentsListStub = sinon.stub(oprProjectStub, 'getAddedContentComponentsList');
    const contentComponentNameStub0 = 'contentComponentNameStub0';
    const contentComponentIdStub0 = 'typeId0';
    const addedContentComponentsListStub = [
        {
            contentComponentName: contentComponentNameStub0,
            contentComponentTypeId: contentComponentIdStub0
        }
    ];
    getAddedContentComponentsListStub.returns(addedContentComponentsListStub);
    const sut = new ManageContentViewsOfCurrentOprViewUcService(oprProjectStub, contentComponentRepoStub);

    sut.getAvailableContentViewOptions(contentComponentNameStub0);

    t.equal(getContentViewMetdataStub.getCall(0).args[0], contentComponentIdStub0);

    t.end();
});

test(`${testgroup} getAvailableContentViewOptions_Always_properlyMapsMetadata`, function (t) {


    const oprProjectStub = new OprProject();
    const contentComponentRepoStub = new OprContentComponentRepository();
    const getContentViewMetdataStub = sinon.stub(contentComponentRepoStub, 'getContentViewMetadata');
    const contentViewMetadataStub = [{ viewTypeId: 'typeStub', defaultDisplayName: 'defaultDisplayNameStub' }];
    getContentViewMetdataStub.returns(contentViewMetadataStub);
    const getAddedContentComponentsListStub = sinon.stub(oprProjectStub, 'getAddedContentComponentsList');
    const contentComponentNameStub0 = 'contentComponentNameStub0';
    const contentComponentIdStub0 = 'typeId0';
    const addedContentComponentsListStub = [
        {
            contentComponentName: contentComponentNameStub0,
            contentComponentTypeId: contentComponentIdStub0
        }
    ];
    getAddedContentComponentsListStub.returns(addedContentComponentsListStub);
    const sut = new ManageContentViewsOfCurrentOprViewUcService(oprProjectStub, contentComponentRepoStub);

    const observedContentViewList = sut.getAvailableContentViewOptions(contentComponentNameStub0);
    t.equal(observedContentViewList.length, 1);
    t.equals(observedContentViewList[0].typeId, contentViewMetadataStub[0].viewTypeId);
    t.equals(observedContentViewList[0].displayName, contentViewMetadataStub[0].defaultDisplayName);

    t.end();
});