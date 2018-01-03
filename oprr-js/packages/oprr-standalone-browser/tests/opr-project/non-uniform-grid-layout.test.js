const test = require('tape');
const sinon = require('sinon');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const NonUnfiormGridLayout = require('../../src/opr-project/non-uniform-grid-layout.js');

const testgroup = 'NonUniformGridLayout:';

test(`${testgroup} addVerticalGridLineFromLeft_validMeasure_retrievableViaGetVerticalGridLine`, function (t) {

    const sut = new NonUnfiormGridLayout();
    const lineNameStub = 'verticalLineNameStub';
    const leftOffset = 20.134;

    sut.addVerticalGridLineFromLeft(lineNameStub, leftOffset);

    const observedVerticalLineLeft = sut.getVerticalGridLineLeft(lineNameStub);
    t.equals(observedVerticalLineLeft, leftOffset);

    const observedVerticalLineRight = sut.getVerticalGridLineRight(lineNameStub);
    t.equals(observedVerticalLineRight, 100 - leftOffset);
    t.end();

});


test(`${testgroup} addHorizontalGridLineFromTop_validMeasure_retrievableViaGetHorizontalGridLine`, function (t) {

    const sut = new NonUnfiormGridLayout();
    const lineNameStub = 'horizontalLineNameStub';
    const topOffset = 20.134;

    sut.addHorizontalGridLineFromTop(lineNameStub, topOffset);

    const observedHorizontalLineTop = sut.getHorizontalGridLineTop(lineNameStub);
    t.equals(observedHorizontalLineTop, topOffset);

    const observedHorizontalLineBottom = sut.getHorizontalGridLineBottom(lineNameStub);
    t.equals(observedHorizontalLineBottom, 100 - topOffset);
    t.end();

});

test(`${testgroup} addArea_ValidInput_getAreaGridLinkWillHaveUndefinedLinks`, function (t) {

    const sut = new NonUnfiormGridLayout();
    const areaNameStub = 'areaNameStub';

    sut.addArea(areaNameStub);

    const areaLinks = sut.getArea(areaNameStub);

    t.equals(areaLinks.left, undefined);
    t.equals(areaLinks.top, undefined);
    t.equals(areaLinks.bottom, undefined);
    t.equals(areaLinks.right, undefined);

    t.end();
});