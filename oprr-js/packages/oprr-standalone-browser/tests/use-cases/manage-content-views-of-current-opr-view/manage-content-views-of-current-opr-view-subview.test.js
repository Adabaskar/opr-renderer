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

test(`${testgroup} contentComponentSelectionChanged_Always_changesAvailableOptionsForContentViewType`, function (t) {

    const domDocStub = new JSDOM('').window.document;
    const oprProjectStub = new OprProject();
    const ucServiceStub = new ManageContentViewsOfCurrentOprViewUcService(oprProjectStub);

    /**
      * @typedef {Object} ContentViewSelectOption
      * @property {string} typeId
      * @property {string} displayName
      */
    /** @type {ContentViewSelectOption}[] */
    const contentViewSelectOptionListStub = [{ typeId: 'viewType0', displayName: 'view 0' }, { typeId: 'viewType1', displayName: 'view 1' }];
    const getAvailableContentViewOptionsStub = sinon.stub(ucServiceStub, 'getAvailableContentViewOptions');
    getAvailableContentViewOptionsStub.returns(contentViewSelectOptionListStub);

    const sut = new ManageContentViewsOfCurrentOprViewSubview(domDocStub, ucServiceStub);

    const ucGuiDomSubtree = sut.getDomSubtree();
    /** @type {HTMLSelectElement} */
    const contentComponentSelectElement = ucGuiDomSubtree.querySelector(`.${sut.NEW_CONTENT_VIEW_CONTENT_COMPONTENT_SELECT_MARKER_CLASS}`);
    contentComponentSelectElement.selectIndex = 1;

    /** @type {HTMLSelectElement} */
    const contentViewSelectElement = ucGuiDomSubtree.querySelector(`.${sut.NEW_CONTENT_VIEW_TYPE_SELECT_MARKER_CLASS}`);
    /**
     * 
     * @param {HTMLSelectElement} selectElement 
     * @param {ContentViewSelectOption} selectOption
     */
    function optionFound(selectElement, selectOption) {
        let found = false;
        for (let i = 0; i < selectElement.options.length; i++) {
            /**
             * @type {HTMLOptionElement}
             */
            let optionElement = selectElement.item(i);
            found = optionElement.text === selectOption.displayName && optionElement.value === selectOption.typeId;
            if (found)
                return found;
        }
        return found;
    }
    t.false(optionFound(contentViewSelectElement, contentViewSelectOptionListStub[0]));
    t.false(optionFound(contentViewSelectElement, contentViewSelectOptionListStub[1]));

    const changeEventStub = domDocStub.createEvent('HTMLEvents');
    changeEventStub.initEvent('change');
    contentComponentSelectElement.dispatchEvent(changeEventStub);

    t.true(optionFound(contentViewSelectElement, contentViewSelectOptionListStub[0]));
    t.true(optionFound(contentViewSelectElement, contentViewSelectOptionListStub[1]));
    t.end();
});

