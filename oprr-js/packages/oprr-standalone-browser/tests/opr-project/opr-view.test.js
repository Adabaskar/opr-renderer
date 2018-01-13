const test = require('tape');
const OprView = require('../../src/opr-project/opr-view.js');
const NonUniformGridLayout = require('../../src/opr-project/non-uniform-grid-layout.js');

const testgroup = 'OprView:';

test(`${testgroup} getLayout_Always_DefinedObject`, function (t) {

    const sut = new OprView();
    const observedLayout = sut.getLayout();

    t.notEqual(observedLayout, undefined);
    t.true(observedLayout instanceof NonUniformGridLayout, 'should be NonUniformGridLayout type');
    t.end();
});