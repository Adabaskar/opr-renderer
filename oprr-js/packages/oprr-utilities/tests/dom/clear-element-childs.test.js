const test = require('tape');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const clearElementChilds = require('../../src/dom/clear-element-childs.js');


test('clearElementChilds_WithSeveralChilds_resultsInChildCountZero', function (t) {

    const domDocStub = new JSDOM('').window.document;
    const nodeStub = domDocStub.createElement('div');
    const severalChildCount = 3;
    for (let i = 0; i < severalChildCount; i++)
        nodeStub.appendChild(domDocStub.createElement('span'));

    clearElementChilds(nodeStub);

    t.equals(nodeStub.childElementCount, 0, 'all childs should be removed');
    t.end();
});