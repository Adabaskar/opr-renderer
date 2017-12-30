const test = require('tape');
const sinon = require('sinon');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const SubviewScaffold = require('../../src/gui/subview-scaffold.js');

test('getDomSubtree_Always_returnsAbsolutePositionedFullscreenElement', function (t) {

    const domDocStub = new JSDOM('').window.document;
    const sut = new SubviewScaffold(domDocStub);

    t.equals(sut.getDomSubtree().style.position, 'absolute');
    t.equals(sut.getDomSubtree().style.left, '0px');
    t.equals(sut.getDomSubtree().style.right, '0px');
    t.equals(sut.getDomSubtree().style.top, '0px');
    t.equals(sut.getDomSubtree().style.bottom, '0px');

    t.end();
});

test('getDomSubtree_FreshAfterConstruction_isHidden', function (t) {
    const domDocStub = new JSDOM('').window.document;
    const sut = new SubviewScaffold(domDocStub);

    t.equals(sut.getDomSubtree().style.display, 'none');

    t.end();
});

test('open_isHidden_changesToVisible', function (t) {
    const domDocStub = new JSDOM('').window.document;
    const sut = new SubviewScaffold(domDocStub);

    t.equals(sut.getDomSubtree().style.display, 'none');
    sut.open();

    t.equals(sut.getDomSubtree().style.display, 'block');
    t.end();

});

test('close_opened_rootElementIsHidden', function (t) {
    const domDocStub = new JSDOM('').window.document;
    const sut = new SubviewScaffold(domDocStub);

    sut.open();
    t.equals(sut.getDomSubtree().style.display, 'block');
    sut.close();
    t.equals(sut.getDomSubtree().style.display, 'none');
    t.end();

});

test('getDomSubtree_Always_HasElementWithClassReturnFromSubviewButton', function (t) {
    const domDocStub = new JSDOM('').window.document;
    const sut = new SubviewScaffold(domDocStub);

    const rootElement = sut.getDomSubtree();
    const expectedReturnElement = rootElement.querySelector('.ReturnFromSubviewButton');

    t.ok(expectedReturnElement, 'should contain return button element');
    t.end();
});

test('clickReturnButton_Always_hidesSubview', function (t) {
    const domDocStub = new JSDOM('').window.document;
    const sut = new SubviewScaffold(domDocStub);
    sut.open();
    const rootElement = sut.getDomSubtree();
    const returnButton = rootElement.querySelector('.ReturnFromSubviewButton');
    const clickEventStub = domDocStub.createEvent('MouseEvent');
    clickEventStub.initEvent('click');

    returnButton.dispatchEvent(clickEventStub);

    t.equals(rootElement.style.display, 'none');
    t.end();
});

test('setContent_Always_hasOneChild', function(t) {
    const domDocStub = new JSDOM('').window.document;
    const sut = new SubviewScaffold(domDocStub);
    const contentSetFirstStub = domDocStub.createElement('div');
    const contentSetSecondStub = domDocStub.createElement('div');

    sut.setContent(contentSetFirstStub);
    sut.setContent(contentSetSecondStub); 

    const rootNode = sut.getDomSubtree();
    const contentNode = rootNode.querySelector('.SubviewContent');
    t.equals(contentNode.childElementCount, 1);

    t.end();
});