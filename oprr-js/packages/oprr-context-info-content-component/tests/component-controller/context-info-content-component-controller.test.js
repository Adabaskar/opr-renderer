const test = require('tape');
const ContextInfoContentComponentController = require('../../src/component-controller/context-info-content-component-controller.js');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const controllerContractTapeTestFactory = require('oprr-content-component-contract').componentControllerContractTapeTestFactory;

test('contract validity', controllerContractTapeTestFactory(new ContextInfoContentComponentController()));

test('getViewsDomSubtree with unknown view id throws error', function (t) {

    const sut = new ContextInfoContentComponentController();

    t.throws(() => { sut.getViewsDomSubtree('someId'); });
    t.end();

});

test('getViewsDomSubtree with known view returns HTMLElement', function (t) {

    const jsdomMock = (new JSDOM(''));
    const domDocStub = jsdomMock.window.document;

    const sut = new ContextInfoContentComponentController();
    const viewId = sut.addDomBasedView(domDocStub);

    const subtree = sut.getViewsDomSubtree(viewId);

    t.true(subtree instanceof jsdomMock.window.HTMLElement);
    t.end();
});

test('removeDomBasedView_previouslyActivated_noLongerAvailable', function (t) {
    const jsdomMock = (new JSDOM(''));
    const domDocStub = jsdomMock.window.document;

    const sut = new ContextInfoContentComponentController();
    const viewId = sut.addDomBasedView(domDocStub);
    sut.removeDomBasedView(viewId);

    t.throws(() => sut.getViewsDomSubtree(viewId));
    t.end();
});