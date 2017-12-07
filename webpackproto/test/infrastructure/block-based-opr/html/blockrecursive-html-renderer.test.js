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

const BlockrecursiveHtmlRenderer = require('../../../../src/infrastructure/block-based-opr/html/blockrecursive-html-renderer');
const ContentRendererInterface = require('../../../../src/infrastructure/block-based-opr/html/content-component-subdom');
const Block = require('../../../../src/infrastructure/block-based-opr/layout/block');
const test = require('tape');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

test('setting content renderer of wrong type throws type exception', function (t) {

    const documentMock = (new JSDOM()).window.document;
    const blockStub = new Block('blockStub');
    const sut = new BlockrecursiveHtmlRenderer(documentMock);

    let caughtTypException = false;

    try {
        sut.setContentComponentForBlock(blockStub, {});
    } catch (e) {
        if (e instanceof TypeError)
            caughtTypException = true;
    }

    t.true(caughtTypException);

    t.end();
});