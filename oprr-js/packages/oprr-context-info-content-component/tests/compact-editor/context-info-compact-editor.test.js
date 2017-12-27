const test = require('tape');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const sinon = require('sinon');
const compactEditorContractTestFactory = require('oprr-content-component-contract').compactEditorContractTapeTestFactory;
const ContextInfoCompactEditor = require('../../src/compact-editor/context-info-compact-editor.js');
const ContextInfoComponentState = require('../../src/component-state/context-info-content-component-state.js');
const ContextInfoContentEditorForm = require('../../src/compact-editor/context-info-content-editor-form.js');

test('ContextInfoDomBasedCompactEditor contract validation', t => {

    const jsdomStub = (new JSDOM(''));
    const domDocStub = jsdomStub.window.document;
    const stateStub = new ContextInfoComponentState();

    const validatorFunc = compactEditorContractTestFactory(new ContextInfoCompactEditor({ domDoc: domDocStub, contextInfoComponentState: stateStub }));
    validatorFunc(t);

});

test('clickOnAcceptButton_Always_retirevesContentFormValuesAndPropagatesToComponentState', function (t) {

    const jsdomStub = (new JSDOM(''));
    const domDocStub = jsdomStub.window.document;
    const stateStub = new ContextInfoComponentState();
    const formStub = new ContextInfoContentEditorForm(domDocStub);
    const setContentStateSpy = sinon.spy(stateStub, 'setContentState');
    const getValuesSpy = sinon.spy(formStub, 'getValues');
    const clickEventStub = domDocStub.createEvent('MouseEvent');
    clickEventStub.initEvent('click');

    const sut = new ContextInfoCompactEditor({ domDoc: domDocStub, contextInfoComponentState: stateStub, contentEditorForm: formStub });
    const acceptButton = sut.getDomSubtree().querySelector('#cntxInfoCompactEditor_acceptChanges_btn');
    acceptButton.dispatchEvent(clickEventStub);

    t.true(setContentStateSpy.calledAfter(getValuesSpy));

    t.end();
});

test('release_always_removesEventListenerFromButton', function (t) {
    const jsdomStub = (new JSDOM(''));
    const domDocStub = jsdomStub.window.document;
    const stateStub = new ContextInfoComponentState();

    const sut = new ContextInfoCompactEditor({ domDoc: domDocStub, contextInfoComponentState: stateStub });
    const acceptButton = sut.getDomSubtree().querySelector('#cntxInfoCompactEditor_acceptChanges_btn');
    const removeEventListenerSpy = sinon.spy(acceptButton, 'removeEventListener');
    sut.release();

    t.true(removeEventListenerSpy.called);
    t.end();
});

