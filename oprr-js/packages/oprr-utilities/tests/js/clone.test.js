const test = require('tape');
const clone = require('../../src/js/clone.js');

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

// test('closures are decoupled', function (t) {
//     class ClassStub {
//         constructor() {
//             let _someValue = 'initVal';            

//             this.setValue = function(val) {
//                 _someValue = val;
//             }
//             this.getValue = function() {
//                 return _someValue;
//             }
//         }
//     }
//     const clonedStub = new ClassStub();
//     const sut = clone;

//     const cloneResult = sut(clonedStub);
//     const notExpectedValue = 'notExpectedValue';
//     cloneResult.setValue(notExpectedValue);    
//     t.notEqual(cloneResult.getValue(), clonedStub.getValue());

//     t.end();
// }); 