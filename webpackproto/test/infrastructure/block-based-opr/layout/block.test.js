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

let test = require('tape');
let Block = require('../../../../src/infrastructure/block-based-opr/layout/block');

test('block should have id passed during construction', function (t) {
    let blockIdStub = "idStub";
    let block = new Block(blockIdStub);
    t.equal(block.getId(), blockIdStub);
    t.end();
});

test('block has children and tells so', function (t) {

    let childBlockStub = new Block('childBlockStub');
    let sut = new Block('rootBlock');
    sut.addChild(childBlockStub);

    t.true(sut.hasChildren());
    t.end();
});

test('block has no children and tells so', function (t) {

    let sut = new Block('rootBlock');

    t.false(sut.hasChildren());
    t.end();
});