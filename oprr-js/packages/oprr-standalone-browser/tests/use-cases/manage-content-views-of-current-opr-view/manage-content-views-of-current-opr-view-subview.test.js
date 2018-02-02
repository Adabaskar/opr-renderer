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
    const ucServiceStub = new ManageContentViewsOfCurrentOprViewUcService(oprProjectStub, {});
    const contentComponentNamesListStub = ['contentComponentNameStub0', 'contentComponentNameStub1'];
    const getAvailableContentComponentsStub = sinon.stub(ucServiceStub, 'getAvailableContentComponents');
    getAvailableContentComponentsStub.returns(contentComponentNamesListStub);

    const sut = new ManageContentViewsOfCurrentOprViewSubview(domDocStub, ucServiceStub);

    const contentComponentSelectInnerHtml = sut.getDomSubtree().querySelector(`.${sut.NEW_CONTENT_VIEW_CONTENT_COMPONTENT_SELECT_MARKER_CLASS}`).innerHTML;

    t.true(contentComponentSelectInnerHtml.includes(contentComponentNamesListStub[0]));
    t.true(contentComponentSelectInnerHtml.includes(contentComponentNamesListStub[1]));
    t.end();
});


/**
  * @typedef {Object} ContentViewSelectOption
  * @property {string} typeId
  * @property {string} displayName
  */
/**
* 
* @param {HTMLSelectElement} selectElement 
* @param {ContentViewSelectOption} selectOption
*/
function _viewTypeSelectOptionFound(selectElement, selectOption) {
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

test(`${testgroup} contentComponentSelectionChanged_Always_changesAvailableOptionsForContentViewType`, function (t) {

    const domDocStub = new JSDOM('').window.document;
    const oprProjectStub = new OprProject();
    const ucServiceStub = new ManageContentViewsOfCurrentOprViewUcService(oprProjectStub, {});

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

    t.false(_viewTypeSelectOptionFound(contentViewSelectElement, contentViewSelectOptionListStub[0]));
    t.false(_viewTypeSelectOptionFound(contentViewSelectElement, contentViewSelectOptionListStub[1]));

    const changeEventStub = domDocStub.createEvent('HTMLEvents');
    changeEventStub.initEvent('change');
    contentComponentSelectElement.dispatchEvent(changeEventStub);

    t.true(_viewTypeSelectOptionFound(contentViewSelectElement, contentViewSelectOptionListStub[0]));
    t.true(_viewTypeSelectOptionFound(contentViewSelectElement, contentViewSelectOptionListStub[1]));
    t.end();
});

test(`${testgroup} addContentViewButtonClicked_ValidInput_PassedToUcServiceMethod`, function (t) {

    const domDocStub = new JSDOM('').window.document;
    const oprProjectStub = new OprProject();
    const ucServiceStub = new ManageContentViewsOfCurrentOprViewUcService(oprProjectStub, {});
    const contentComponentNameStub = 'ContentComponentNameStub';
    const contentComponentOptionsStub = [contentComponentNameStub];
     /** @type {ContentViewSelectOption}[] */
    const contentViewMetadataStub = { typeId: 'viewTypeIdStub', displayName: 'displayNameStub' };
    const contentViewOptionsStub = [contentViewMetadataStub];
    const getContentComponentOptionsStub = sinon.stub(ucServiceStub, 'getAvailableContentComponents');
    getContentComponentOptionsStub.returns(contentComponentOptionsStub);
    const getAvailableContentViewOptionsStub = sinon.stub(ucServiceStub, 'getAvailableContentViewOptions');
    getAvailableContentViewOptionsStub.returns(contentViewOptionsStub);
    const enteredContentViewNameStub = 'enteredContentViewNameStub';

    const sut = new ManageContentViewsOfCurrentOprViewSubview(domDocStub, ucServiceStub);

    //enter a name
    const ucUiRootElement = sut.getDomSubtree();
    /** @type {HTMLInputElement} */
    const nameInputElement = ucUiRootElement.querySelector(`.${sut.NEW_CONTENT_VIEW_NAME_INPUT_MARKER_CLASS}`);
    /** @type {HTMLSelectElement} */
    const contentComponentSelectElement = ucUiRootElement.querySelector(`.${sut.NEW_CONTENT_VIEW_CONTENT_COMPONTENT_SELECT_MARKER_CLASS}`);
    /** @type {HTMLSelectElement} */
    const viewTypeSelectElement = ucUiRootElement.querySelector(`.${sut.NEW_CONTENT_VIEW_TYPE_SELECT_MARKER_CLASS}`);
    nameInputElement.value = enteredContentViewNameStub;
    contentComponentSelectElement.selectedIndex = 1;
    const changeEventStub = domDocStub.createEvent('HTMLEvents');
    changeEventStub.initEvent('change');
    contentComponentSelectElement.dispatchEvent(changeEventStub);
    const selectedViewType = viewTypeSelectElement.options.item(viewTypeSelectElement.selectedIndex);
    t.equal(selectedViewType.value, contentViewMetadataStub.typeId);
    t.equal(selectedViewType.text, contentViewMetadataStub.displayName);

    const addContentViewSpy = sinon.spy(ucServiceStub, 'addContentView');
    /** @type {HTMLButtonElement} */
    const addButtonElement = ucUiRootElement.querySelector(`.${sut.NEW_CONTENT_VIEW_ADD_BUTTON_MARKER_CLASS}`);
    addButtonElement.click();
        
    t.equal(addContentViewSpy.getCall(0).args[0], enteredContentViewNameStub, `should pass ${enteredContentViewNameStub}` ) ;
    t.equal(addContentViewSpy.getCall(0).args[1], contentComponentNameStub, `should pass ${contentComponentNameStub}`);
    t.equal(addContentViewSpy.getCall(0).args[2], contentViewMetadataStub.typeId, `should bass ${contentViewMetadataStub.typeId}`);

    t.end();
});
