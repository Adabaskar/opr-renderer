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
const clone = require('../../../../src/infrastructure/lang/js/clone');

test('clone is unequal to cloned object', function (t) {

    class ClassStub {
        constructor() {
            this.objectPropertyStub = { val: "val" }
        }
    }
    const clonedStub = new ClassStub();
    const sut = clone;

    const cloneResult = sut(clonedStub);
    t.notEqual(cloneResult, clonedStub);

    t.end();
});

test('clone has members from cloned', function (t) {
    class ClassStub {
        constructor() {
            this.objectPropertyStub = { val: "val" }
        }
    }
    const clonedStub = new ClassStub();
    const sut = clone;

    const cloneResult = sut(clonedStub);
    t.notEqual(cloneResult.objectPropertyStub, undefined);

    t.end();
});    

test('nested objects are also cloned', function (t) {
    class ClassStub {
        constructor() {
            this.objectPropertyStub = { val: "val" }
        }
    }
    const clonedStub = new ClassStub();
    const sut = clone;

    const cloneResult = sut(clonedStub);
    t.notEqual(cloneResult.objectPropertyStub, clonedStub.objectPropertyStub);

    t.end();
});    

