const test = require('tape');
const sinon = require('sinon');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const ManageContentViewsOfCurrentOprViewSubview = require('../../../src/use-cases/manage-content-views-of-current-opr-view/manage-content-views-of-current-opr-view-subview.js');
const OprProject = require('../../../src/opr-project/opr-project.js');
const ManageContentViewsOfCurrentOprViewUcService = require('../../../src/use-cases/manage-content-views-of-current-opr-view/manage-content-views-of-current-opr-view-uc-service.js');

const testgroup = 'ManageContentViewsOfCurrentOprViewSubview:';

test(`${testgroup} getDomSubtree_ucServiceReturnsContentComponents_ContentComponentsAreSelectOptions`, function (t) {

    const domDocStub = new JSDOM('').window.document;
    const oprProjectStub = new OprProject();
    const ucServiceStub = new ManageContentViewsOfCurrentOprViewUcService(oprProjectStub);
    const contentComponentNamesListStub = ['contentComponentNameStub0', 'contentComponentNameStub1'];
    const getAvailableContentComponentsStub = sinon.stub(ucServiceStub, 'getAvailableContentComponents');
    getAvailableContentComponentsStub.returns(contentComponentNamesListStub);

    const sut = new ManageContentViewsOfCurrentOprViewSubview(domDocStub, ucServiceStub);

    const contentComponentSelectInnerHtml = sut.getDomSubtree().querySelector(`.${sut.NEW_CONTENT_VIEW_CONTENT_COMPONTENT_SELECT_MARKER_CLASS}`).innerHTML;

    t.true(contentComponentSelectInnerHtml.includes(contentComponentNamesListStub[0]));
    t.true(contentComponentSelectInnerHtml.includes(contentComponentNamesListStub[1]));    
    t.end();
});
