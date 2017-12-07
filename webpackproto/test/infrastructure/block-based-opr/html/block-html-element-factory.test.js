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
const sinon = require('sinon');
const BlockHtmlElementFactory = require('../../../../src/infrastructure/block-based-opr/html/block-html-element-factory');
const Placement = require('../../../../src/infrastructure/block-based-opr/layout/parent-relative-block-placement');
const Block = require('../../../../src/infrastructure/block-based-opr/layout/block');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;



test('factory calls document to create a div', function (t) {

    const documentMock = (new JSDOM()).window.document;
    
    const blockStub = new Block();

    const sut = new BlockHtmlElementFactory(documentMock);
    const product = sut.makeFromBlock(blockStub);

    t.equals(product.nodeName, 'DIV');

    t.end();
});
    

test('factory throws exception if not proper placement type is used', function (t) {

    const documentMock = (new JSDOM()).window.document;

    const sut = new BlockHtmlElementFactory(documentMock);
    let caughtTypeException = false;
    try {
        sut.makeFromBlock({});
    } catch (e) {
        if (e instanceof TypeError)
            caughtTypeException = true;
    }
    t.true(caughtTypeException);
    t.end();
});

test('adds element with id matching block id', function(t) {

    const documentMock = (new JSDOM()).window.document;   
    const idStub = "idStub";
    const blockStub = new Block(idStub);

    const sut = new BlockHtmlElementFactory(documentMock);
    const product = sut.makeFromBlock(blockStub);

    const observedElementId = product.getAttribute('id');
    t.equals(observedElementId, idStub);
    
    t.end();
});

test('adds offsets from block to style attributes of element', function(t) {
    const documentMock = (new JSDOM()).window.document;   
    const idStub = "idStub";
    const leftStub = 7;
    const rightStub = 77;
    const topStub = 86;
    const bottomStub = 5;
    const placementStub = new Placement(leftStub, topStub, rightStub, bottomStub);
    const blockStub = new Block(idStub, placementStub);

    const sut = new BlockHtmlElementFactory(documentMock);
    const product = sut.makeFromBlock(blockStub);

    t.equals(product.style.position, 'absolute');
    t.equals(product.style.left, leftStub+'%');
    t.equals(product.style.right, rightStub +'%');
    t.equals(product.style.top, topStub +'%');
    t.equals(product.style.bottom, bottomStub +'%');

    t.end();
})