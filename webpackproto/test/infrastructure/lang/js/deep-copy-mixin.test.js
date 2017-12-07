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
const deepCopyMixin = require('../../../../src/infrastructure/lang/js/deep-copy-mixin');

test('target has mixed in properties', function (t) {

    const expectedFuncStubReturnValue = "returnValueStub";
    class MixedInClassStub {
        constructor() {
            this.funcStub = function () {
                return expectedFuncStubReturnValue;
            }
        }
    }
    const mixedInStub = new MixedInClassStub();

    class ClassStub {
        constructor() {
            this.propertyStub = "propertyStub";
        }
    }
    const targetStub = new ClassStub();

    const sut = deepCopyMixin;
    sut(targetStub, mixedInStub);

    t.equals(targetStub.funcStub(), expectedFuncStubReturnValue);

    t.end();
});

test('mixin generated does not reference nested objects from source object', function (t) {

    const expectedMemberValueStub = "fixedValueMemberStub";
    const nestedObjectStub = {
        memberStub: expectedMemberValueStub
    };
    const mixedInStub = {
        nestedObject: nestedObjectStub
    };

    class ClassStub {
        constructor() {
            this.propertyStub = "propertyStub";
        }
    }
    const targetStub = new ClassStub();

    const sut = deepCopyMixin;
    sut(targetStub, mixedInStub);
    targetStub.nestedObject.memberStub = "changedValue";

    t.equals(mixedInStub.nestedObject.memberStub, expectedMemberValueStub);

    t.end();
});