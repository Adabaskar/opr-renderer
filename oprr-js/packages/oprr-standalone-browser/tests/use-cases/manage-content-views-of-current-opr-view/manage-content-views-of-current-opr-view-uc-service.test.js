const test = require('tape');
const sinon = require('sinon');
const OprProject = require('../../../src/opr-project/opr-project.js');
const ManageContentViewsOfCurrentOprViewUcService = require('../../../src/use-cases/manage-content-views-of-current-opr-view/manage-content-views-of-current-opr-view-uc-service.js');
const OprContentComponentRepository = require('../../../src/content-components/opr-content-component-repository.js');

const testgrouplabel = 'ManageContentViewsOfCurrentOprViewUcService:';

test(`${testgrouplabel} getAvailableContentComponents_Always_returnsAllContentComponentNamesFromOprProject`, function (t) {

    const oprProjectStub = new OprProject();
    const getAddedContentComponentsListStub = sinon.stub(oprProjectStub, 'getAddedContentComponentInstancesList');
    const contentComponentNameStub0 = 'contentComponentNameStub0';
    const contentComponentNameStub1 = 'contentComponentNameStub1';
    const addedContentComponentsListStub = [
        {
            contentComponentInstanceName: contentComponentNameStub0,
            contentComponentInstanceId: 'id0',
            contentComponentTypeId: 'type0'
        },
        {
            contentComponentInstanceName: contentComponentNameStub1,
            contentComponentInstanceId: 'id1',
            contentComponentTypeId: 'type1'
        },
    ];
    getAddedContentComponentsListStub.returns(addedContentComponentsListStub);
    const sut = new ManageContentViewsOfCurrentOprViewUcService(oprProjectStub, {});

    const observedContentComponentsList = sut.getAvailableContentComponentInstancesList();
    function makeExpectedListElement(contentComponentListStubElement) {
        return {
            contentComponentInstanceId: contentComponentListStubElement.contentComponentInstanceId,
            contentComponentInstanceName: contentComponentListStubElement.contentComponentInstanceName
        }
    }
    const expectedContentComponentsList = [
        makeExpectedListElement(addedContentComponentsListStub[0]),
        makeExpectedListElement(addedContentComponentsListStub[1])];

    function expectedContentComponentInstanceMetadataObserved(observedList, expectedContentComponentInstanceId, expectedContentComponentInstanceName) {
        let observed = false;
        for (let i = 0; i < observedList.length; i++) {

            const observedMetadata = observedList[i]
            const observed = (observedMetadata.contentComponentInstanceId === expectedContentComponentInstanceId &&
                observedMetadata.contentComponentInstanceName === expectedContentComponentInstanceName);
            if (observed)
                return true;
        }
        return false;
    }

    for (let i = 0; i < expectedContentComponentsList.length; i++) {
        t.true(expectedContentComponentInstanceMetadataObserved(observedContentComponentsList, expectedContentComponentsList[i].contentComponentInstanceId, expectedContentComponentsList[i].contentComponentInstanceName), `missing ${expectedContentComponentsList[i].contentComponentInstanceId}`);
    }
    t.end();
});

test(`${testgrouplabel} getAvailableContentViewOptions_Always_asksContentComponentRepositoryWithProperId`, function (t) {
    const oprProjectStub = new OprProject();
    const contentComponentRepoStub = new OprContentComponentRepository();
    const getContentViewMetdataStub = sinon.stub(contentComponentRepoStub, 'getContentViewMetadata');
    const contentViewMetadataStub = [{ viewTypeId: 'typeStub', defaultDisplayName: 'defaultDisplayNameStub' }];
    getContentViewMetdataStub.returns(contentViewMetadataStub);
    const getAddedContentComponentsListStub = sinon.stub(oprProjectStub, 'getAddedContentComponentInstancesList');
    const contentComponentNameStub0 = 'contentComponentNameStub0';
    const contentComponentIdStub0 = 'typeId0';
    const addedContentComponentsListStub = [
        {
            contentComponentInstanceId: contentComponentNameStub0,
            contentComponentInstanceName: contentComponentNameStub0,
            contentComponentTypeId: contentComponentIdStub0
        }
    ];
    getAddedContentComponentsListStub.returns(addedContentComponentsListStub);
    const sut = new ManageContentViewsOfCurrentOprViewUcService(oprProjectStub, contentComponentRepoStub);

    sut.getAvailableContentViewOptions(contentComponentNameStub0);

    t.equal(getContentViewMetdataStub.getCall(0).args[0], contentComponentIdStub0);

    t.end();
});

test(`${testgrouplabel} getAvailableContentViewOptions_Always_properlyMapsMetadata`, function (t) {
    const oprProjectStub = new OprProject();
    const contentComponentRepoStub = new OprContentComponentRepository();
    const getContentViewMetdataStub = sinon.stub(contentComponentRepoStub, 'getContentViewMetadata');
    const contentViewMetadataStub = [{ viewTypeId: 'typeStub', defaultDisplayName: 'defaultDisplayNameStub' }];
    getContentViewMetdataStub.returns(contentViewMetadataStub);
    const getAddedContentComponentsListStub = sinon.stub(oprProjectStub, 'getAddedContentComponentInstancesList');
    const contentComponentNameStub0 = 'contentComponentNameStub0';
    const contentComponentIdStub0 = 'typeId0';
    const addedContentComponentsListStub = [
        {
            contentComponentInstanceId: contentComponentNameStub0,
            contentComponentInstanceName: contentComponentNameStub0,
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

test(`${testgrouplabel} addContentView_EmptyName_throwsException`, function (t) {

    const oprProjectStub = new OprProject();
    const contentComponentRepoStub = new OprContentComponentRepository();

    const sut = new ManageContentViewsOfCurrentOprViewUcService(oprProjectStub, contentComponentRepoStub);

    t.throws(() => sut.addContentView('', 'someContentComponentName', 'someViewTypeId'));

    t.end();
});

test(`${testgrouplabel} addContentView_TechnicallyValidInput_callsOprProjectMethod`, function (t) {

    const oprProjectStub = new OprProject();
    const contentComponentRepoStub = new OprContentComponentRepository();

    const sut = new ManageContentViewsOfCurrentOprViewUcService(oprProjectStub, contentComponentRepoStub);

    const addContentComponentViewSpy = sinon.stub(oprProjectStub, 'addContentComponentView');
    addContentComponentViewSpy.returns('viewIdStub');
    const contentComponentInstanceIdStub = 'contentComponentInstanceIdStub';
    const contentViewTypeIdStub = 'contentViewTypeIdStub';
    sut.addContentView('someViewName', contentComponentInstanceIdStub, contentViewTypeIdStub);

    const observedCall = addContentComponentViewSpy.getCall(0);
    t.equal(observedCall.args[0], contentComponentInstanceIdStub);
    t.equal(observedCall.args[1], contentViewTypeIdStub);
    t.end();
});

test(`${testgrouplabel} addContentView_TechnicallyValidInput_callsCurrentOprViewMethod`, function (t) {

    const oprProjectStub = new OprProject();
    const currentOprView = oprProjectStub.getCurrentOprView();
    const contentComponentRepoStub = new OprContentComponentRepository();
    const sut = new ManageContentViewsOfCurrentOprViewUcService(oprProjectStub, contentComponentRepoStub);
    const viewNameStub = 'viewNameStub';
    const viewIdReturnedByOprProject = 'viewIdReturnedByOprProject';
    const addContentComponentViewStub = sinon.stub(oprProjectStub, 'addContentComponentView');
    addContentComponentViewStub.returns(viewIdReturnedByOprProject);
    const addContentViewSpy = sinon.spy(currentOprView, 'addContentView');
    const contentComponentInstanceIdStub = 'contentComponentInstanceIdStub';
    sut.addContentView(viewNameStub, contentComponentInstanceIdStub, 'someContentViewTypeId');

    const expectedCall = addContentViewSpy.getCall(0);
    t.equal(expectedCall.args[0], viewNameStub);
    t.equal(expectedCall.args[1], contentComponentInstanceIdStub);
    t.equal(expectedCall.args[2], viewIdReturnedByOprProject);
    t.end();
});

  /**
         * @typedef {Object} ContentComponentInstanceMetadata
         * @property {string} contentComponentInstanceId
         * @property {string} contentComponentInstanceName
         * @property {string} contentComponentTypeId
         */
 /**
         * @typedef {Object} ContentViewMetadata
         * @property {string} contentViewId
         * @property {string} contentViewName
         * @property {string} contentViewTypeId         
         * @property {ContentComponentInstanceMetadata} contentComponentInstanceMetadata            
         */

test(`${testgrouplabel} getAddedContentViewsList_Always_properlyMapsResponsesFromOprProjectAndRepo`, function (t) {

    const oprProjectStub = new OprProject();    
    const getContentViewMetadataInCurrentOprViewStub = sinon.stub(oprProjectStub, 'getContentViewMetadataInCurrentOprView');
    const ccInstMetadataStub = {
        contentComponentInstanceId : 'ccInstId',
        contentComponentInstanceName : 'ccInstName',
        contentComponentTypeId : 'ccTypeId'
    };
    const contentViewMetadataStub = {
        contentViewId : 'viewId',
        contentViewName : 'viewName',
        contentViewTypeId : 'viewTypeId',
        contentComponentInstanceMetadata : ccInstMetadataStub
    }
    const contentViewMetadataListInCurrOprViewStub = [contentViewMetadataStub];
    getContentViewMetadataInCurrentOprViewStub.returns(contentViewMetadataListInCurrOprViewStub);

    const contentComponentRepoStub = new OprContentComponentRepository();
    const contentComponentDisplayNameStub = 'contentComponentDisplayNameStub';
    const contentViewDefaultDisplayNameStub = 'contentViewDefaultDisplayNameStub';
    const getDisplayNameOfContentComponentStub = sinon.stub(contentComponentRepoStub, 'getDisplayNameOfContentComponent');
    getDisplayNameOfContentComponentStub.returns(contentComponentDisplayNameStub);
    const getContentViewDefaultDisplayNameStub = sinon.stub(contentComponentRepoStub, 'getContentViewDefaultDisplayName');
    getContentViewDefaultDisplayNameStub.returns(contentViewDefaultDisplayNameStub);

    const sut = new ManageContentViewsOfCurrentOprViewUcService(oprProjectStub, contentComponentRepoStub);


    const result = sut.getAddedContentViewsList();
    t.equal(result.length, 1);    
    t.equal(result[0].contentViewId, contentViewMetadataStub.contentViewId);
    t.equal(result[0].contentViewName, contentViewMetadataStub.contentViewName);
    t.equal(result[0].contentViewTypeDisplayName, contentViewDefaultDisplayNameStub);
    t.equal(result[0].contentComponentInstanceId, ccInstMetadataStub.contentComponentInstanceId);
    t.equal(result[0].contentComponentInstanceName, ccInstMetadataStub.contentComponentInstanceName);
    t.equal(result[0].contentComponentTypeDisplayName, contentComponentDisplayNameStub);
    t.equal(getDisplayNameOfContentComponentStub.getCall(0).args[0], contentViewMetadataStub.contentComponentInstanceMetadata.contentComponentTypeId);
    t.equal(getContentViewDefaultDisplayNameStub.getCall(0).args[0], contentViewMetadataStub.contentComponentInstanceMetadata.contentComponentTypeId);
    t.equal(getContentViewDefaultDisplayNameStub.getCall(0).args[1], contentViewMetadataStub.contentViewTypeId);

    
    t.end();
});