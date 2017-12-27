const test = require('tape');
const sinon = require('sinon');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const ContextInfoContentEditorForm = require('../../src/compact-editor/context-info-content-editor-form.js');

test('release_HasOnChangeRegisteredCallback_callsRemoveOnForm', function(t) {

    const jsdomStub = (new JSDOM(''));
    const domDocStub = jsdomStub.window.document;

    const sut = new ContextInfoContentEditorForm(domDocStub);

    const callbackStub = () => { };
    sut.addOnFormChangedEventListener(callbackStub);
    const domSubtree = sut.getDomSubtree();
    const removeEventListenerSpy = sinon.spy(domSubtree, 'removeEventListener');

    sut.release();

    t.true(removeEventListenerSpy.called);
    t.equal(removeEventListenerSpy.args[0][0], 'change');
    t.equal(removeEventListenerSpy.args[0][1], callbackStub);
    t.end();

});