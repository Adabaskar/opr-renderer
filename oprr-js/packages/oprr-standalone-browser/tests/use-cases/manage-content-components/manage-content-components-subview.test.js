const test = require('tape');
const sinon = require('sinon');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const ManageContentComponentsSubview = require('../../../src/use-cases/manage-content-components/manage-content-components-subview.js');
const ManageContentComponentsUcService = require('../../../src/use-cases/manage-content-components/manage-content-components-uc-service.js');

const testgrouplabel = 'ManageContentComponentsSubview : ';

function makeAddableContentComponentListEntryStub(disc) {
    return { typeId: disc, name: `name${disc}`, defaultDisplayName: `displayName${disc}` };
};

test(`${testgrouplabel} getDomSubtree_UcServiceServesAddableContentComponents_AddableContentComponentsUiAreaContainsAllListEntries`, function (t) {

    const domDocStub = new JSDOM('').window.document;
    const addableComponentsCount = 3;

    const addableComponentsListStub = [];
    for (let i = 0; i < addableComponentsCount; i++)
        addableComponentsListStub.push(makeAddableContentComponentListEntryStub(i));
    let ucServiceStub = {};
    ucServiceStub.getAddableContentComponents = () => { return addableComponentsListStub; };

    const sut = new ManageContentComponentsSubview(domDocStub, ucServiceStub);

    const rootNode = sut.getDomSubtree();
    const addableAreaNode = rootNode.querySelector('.AddableContentComponentUiArea');
    const addableAreaNodeInnerHtml = addableAreaNode.innerHTML;

    for (let i = 0; i < addableComponentsCount; i++) {
        t.true(addableAreaNodeInnerHtml.includes(addableComponentsListStub[i].typeId), `should contain content component id ${addableComponentsListStub[i].typeId}`);
        t.true(addableAreaNodeInnerHtml.includes(addableComponentsListStub[i].name), `should contain content component name ${addableComponentsListStub[i].name}`);
    }
    t.end();
});

function makeUcServiceStub(addableComponentCount) {
    function makeAddableContentComponentListEntryStub(disc) {
        return { typeId: disc, name: `name${disc}` };
    }
    const addableComponentsListStub = [];
    for (let i = 0; i < addableComponentCount; i++)
        addableComponentsListStub.push(makeAddableContentComponentListEntryStub(i));
    let ucServiceStub = {};
    ucServiceStub.getAddableContentComponents = () => { return addableComponentsListStub; };
    return ucServiceStub;
}

test(`${testgrouplabel} addContentComponentButtonClicked_Always_callsUcService`, function (t) {
    const domDocStub = new JSDOM('').window.document;
    const ucServiceStub = makeUcServiceStub(1);
    ucServiceStub.addContentComponent = sinon.spy();
    const sut = new ManageContentComponentsSubview(domDocStub, ucServiceStub);
    const clickEventStub = domDocStub.createEvent('MouseEvent');
    clickEventStub.initEvent('click');

    sut.getDomSubtree().querySelector('.AddContentComponentToProjectButton').dispatchEvent(clickEventStub);
    t.true(ucServiceStub.addContentComponent.calledWith('0'), 'UC service method called with id = 0');
    t.end();
});