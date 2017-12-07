/* 
    Copyright (C) 2017 Bogumil Bartczak

    This file is part of opr-renderer.

    opr-renderer is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    opr-renderer is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with opr-renderer.  If not, see <http://www.gnu.org/licenses/>.
*/

const test = require('tape');
const SimpleDomNodeBuilder = require('../../../src/infrastructure/dom-node-builder/simple-dom-node-builder');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

test('sets all styles provided', function (t) {

    const documentStub = (new JSDOM()).window.document;
    const sut = new SimpleDomNodeBuilder(documentStub);

    sut.addStyle('color', 'red').addStyle('display', 'block');
    const result = sut.build();

    t.equal(result.style.color, 'red');
    t.equal(result.style.display, 'block');

    t.end();
});

test('if style attribute name is not valid throw error', function (t) {

    const documentStub = (new JSDOM()).window.document;
    const sut = new SimpleDomNodeBuilder(documentStub);

    sut.addStyle('colors', 'red');

    let caughtError = false;
    try {
        const result = sut.build();
    } catch (e) {
        caughtError = true;
    }

    t.true(caughtError, 'should result in error');
    t.end();
});

test('div() results in div node with', function (t) {

    const documentStub = (new JSDOM()).window.document;
    const sut = new SimpleDomNodeBuilder(documentStub);

    const result = sut.div().build();

    t.equal(result.nodeName, 'DIV');
    t.end();
});

test('span() results in span node', function (t) {

    const documentStub = (new JSDOM()).window.document;
    const sut = new SimpleDomNodeBuilder(documentStub);

    const result = sut.span().build();

    t.equal(result.nodeName, 'SPAN');
    t.end();
});

test('with text adds text node with equal content', function (t) {
    const textStub = "complex text stub";
    const documentStub = (new JSDOM()).window.document;
    const sut = new SimpleDomNodeBuilder(documentStub);

    const result = sut.span().text(textStub).build();

    const firstChildNode = result.firstChild;
    t.equals(firstChildNode.nodeType, 3, 'node type should be teyt node');
    t.equals(firstChildNode.nodeValue, textStub, 'text should be equal to method argument');

    t.end();
});

test('with id adds id to node', function (t) {

    const idStub = "idStub";
    const documentStub = (new JSDOM()).window.document;
    const sut = new SimpleDomNodeBuilder(documentStub);

    const result = sut.div().id(idStub).build();

    t.equal(result.id, idStub, "id value should equal passed argument");
    t.end();
});