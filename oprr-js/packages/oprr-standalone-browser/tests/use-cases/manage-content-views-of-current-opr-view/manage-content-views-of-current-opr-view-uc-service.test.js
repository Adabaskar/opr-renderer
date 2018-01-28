const test = require('tape');
const sinon = require('sinon');
const OprProject = require('../../../src/opr-project/opr-project.js');
const ManageContentViewsOfCurrentOprViewUcService = require('../../../src/use-cases/manage-content-views-of-current-opr-view/manage-content-views-of-current-opr-view-uc-service.js');

const testgroup = 'ManageContentViewsOfCurrentOprViewUcService:';

test(`${testgroup} getAvailableContentComponents_Always_returnsAllContentComponentNamesFromOprProject`, function (t) {

    const oprProjectStub = new OprProject();
    const getAddedContentComponentsListStub = sinon.stub(oprProjectStub, 'getAddedContentComponentsList');
    const contentComponentNameStub0 = 'contentComponentNameStub0';
    const contentComponentNameStub1 = 'contentComponentNameStub1';    
    const addedContentComponentsListStub = [
        {contentComponentName: contentComponentNameStub0,
            contentComponentTypeId: 'type0'
        }, 
        {contentComponentName: contentComponentNameStub1,
            contentComponentTypeId: 'type1'
        }, 
    ];
    getAddedContentComponentsListStub.returns(addedContentComponentsListStub);
    const sut = new ManageContentViewsOfCurrentOprViewUcService(oprProjectStub);

    const observedContentComponentsList = sut.getAvailableContentComponents();
    const expectedContentComponentsListElements = [contentComponentNameStub0, contentComponentNameStub1];

    for(let i=0; i<expectedContentComponentsListElements.length; i++) {
        t.true(observedContentComponentsList.includes(expectedContentComponentsListElements[i]), `missing ${expectedContentComponentsListElements[i]}`);
    }    
    t.end();
});