const test = require('tape');
const sinon = require('sinon');
const ContextInfoContentComponentState = require('../../src/component-state/context-info-content-component-state.js');

test('ctr_always_initializedState', function(t) {

    const sut = new ContextInfoContentComponentState();
    const initialState = sut.getContentState();

    t.ok(initialState);

    t.end();
});

test('getContentState_Always_returnsNewInstance', function(t){
    const sut = new ContextInfoContentComponentState();
    const first = sut.getContentState();
    const second = sut.getContentState();

    t.notEquals(first, second);
    t.end();
})

test('addOnChangeListener_AfterStateChanges_addedListenerCalled', function(t) {

    const sut = new ContextInfoContentComponentState();
    const listenerStub = sinon.spy();

    sut.addOnChangeListener(listenerStub);
    sut.setContentState({topicLabel : 'changedTopicLabel'});

    t.true(listenerStub.called);
    t.end();
});

test('removeOnChangeListener_AfterStateChanges_removedListenerNotCalled', function(t) {

    const sut = new ContextInfoContentComponentState();
    const listenerStub = sinon.spy();
    sut.addOnChangeListener(listenerStub);
    sut.removeOnChangeListener(listenerStub);
    sut.setContentState({topicLabel : 'changedTopicLabel'});

    t.false(listenerStub.called)
    t.end();
});