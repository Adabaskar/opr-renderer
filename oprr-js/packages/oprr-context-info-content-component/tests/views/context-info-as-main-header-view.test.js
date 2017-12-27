const viewContractTapeTestFactory = require('oprr-content-component-contract').componentViewContractTapeTestFactory;
const test = require('tape');
const ContextInfoAsMainHeaderView = require('../../src/views/context-info-as-main-header-view.js');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const ContextInfoContentComponentState = require('../../src/component-state/context-info-content-component-state.js');
const sinon = require('sinon');

test('component view contract validation', function (t) {

    const jsdomStub = (new JSDOM(''));
    const domDocStub = jsdomStub.window.document;
    const stateStub = new ContextInfoContentComponentState();

    const validatorFunc = viewContractTapeTestFactory(new ContextInfoAsMainHeaderView(domDocStub, stateStub));
    validatorFunc(t);

});


test('ctr_Always_viewContainsContentOfState', function (t) {

    const jsdomStub = (new JSDOM(''));
    const domDocStub = jsdomStub.window.document;
    const topicLabelStub = 'topicLabelStub';
    const stateStub = new ContextInfoContentComponentState();
    stateStub.setContentState({ topicLabel: topicLabelStub });

    const sut = new ContextInfoAsMainHeaderView(domDocStub, stateStub);

    t.true(sut.getDomSubtree().innerHTML.includes(topicLabelStub));
    t.end();
});

test('componentStateChanges_Always_updatesView', function (t) {

    const jsdomStub = (new JSDOM(''));
    const domDocStub = jsdomStub.window.document;
    const stateStub = new ContextInfoContentComponentState();
    const sut = new ContextInfoAsMainHeaderView(domDocStub, stateStub);
    const viewDomSubtree = sut.getDomSubtree();
    const topicLabelStub = 'topicLabelStub';

    t.false(viewDomSubtree.innerHTML.includes(topicLabelStub));
    stateStub.setContentState({ topicLabel: topicLabelStub });

    t.true(viewDomSubtree.innerHTML.includes(topicLabelStub));
    t.end();
});

test('release_Always_callsRemoveListenerOnComponentState', function (t) {

    const jsdomStub = (new JSDOM(''));
    const domDocStub = jsdomStub.window.document;
    const stateStub = new ContextInfoContentComponentState();
    const sut = new ContextInfoAsMainHeaderView(domDocStub, stateStub);
    const removeListenerSpy = sinon.spy(stateStub, 'removeOnChangeListener');

    sut.release();

    t.true(removeListenerSpy.called);
    t.end();
});