const test = require('tape');
const MainMenu = require('../../src/app/main-menu.js');
const jsdom = require('jsdom');
const {JSDOM} =  jsdom ;
const sinon = require('sinon');

test('setContentComponentMenuItemClickedListener_whenClicked_callsAssignedListener', function (t) {

    const domDocStub = (new JSDOM('')).window.document;
    const sut = new MainMenu(domDocStub);
    const listenerStub = sinon.spy();
    sut.setContentComponentMenuItemClickedListener(listenerStub);
    const clickEventStub = domDocStub.createEvent('MouseEvent');
    clickEventStub.initEvent('click');

    const menuRootNode = sut.getDomSubtree();
    menuRootNode.querySelector('#ManageContentComponentsMenuItem').dispatchEvent(clickEventStub);

    t.true(listenerStub.called, 'listener spy should be called');

    t.end();
})