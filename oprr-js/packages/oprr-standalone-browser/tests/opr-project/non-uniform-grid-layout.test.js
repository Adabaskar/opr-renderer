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

    sut.setVerticalGridLineFromLeft(lineNameStub, leftOffset);

    const observedVerticalLineLeft = sut.getVerticalGridLineLeftOffset(lineNameStub);
    t.equals(observedVerticalLineLeft, leftOffset);

    const observedVerticalLineRight = sut.getVerticalGridLineRightOffset(lineNameStub);
    t.equals(observedVerticalLineRight, 100 - leftOffset);
    t.end();

});


test(`${testgroup} addHorizontalGridLineFromTop_validMeasure_retrievableViaGetHorizontalGridLine`, function (t) {

    const sut = new NonUnfiormGridLayout();
    const lineNameStub = 'horizontalLineNameStub';
    const topOffset = 20.134;

    sut.setHorizontalGridLineFromTop(lineNameStub, topOffset);

    const observedHorizontalLineTop = sut.getHorizontalGridLineTopOffset(lineNameStub);
    t.equals(observedHorizontalLineTop, topOffset);

    const observedHorizontalLineBottom = sut.getHorizontalGridLineBottomOffset(lineNameStub);
    t.equals(observedHorizontalLineBottom, 100 - topOffset);
    t.end();

});

test(`${testgroup} setArea_ValidInput_getAreaHaveUndefinedGridLineLinks`, function (t) {

    const sut = new NonUnfiormGridLayout();
    const areaNameStub = 'areaNameStub';

    sut.setArea(areaNameStub);

    const areaLinks = sut.getArea(areaNameStub);

    t.equals(areaLinks.left, undefined);
    t.equals(areaLinks.top, undefined);
    t.equals(areaLinks.bottom, undefined);
    t.equals(areaLinks.right, undefined);

    t.end();
});

test(`${testgroup} setVerticalGridLineFromLeft_ValidData_lineIsInList`, function (t) {

    const sut = new NonUnfiormGridLayout();
    const lineNameStub = 'lineStubName';
    const positionStub = 20.44;
    sut.setVerticalGridLineFromLeft(lineNameStub, positionStub);

    const expectedResult = [];
    const expectedItem = { name: lineNameStub, left: positionStub, right: 100 - positionStub };
    expectedResult.push(expectedItem);

    const observedResult = sut.getVerticalGridLineList();
    t.deepEquals(observedResult, expectedResult);
    t.end();
});

test(`${testgroup} setHorizontalGridLineFromLeft_ValidData_lineIsInList`, function (t) {

    const sut = new NonUnfiormGridLayout();
    const lineNameStub = 'lineStubName';
    const positionStub = 20.44;
    sut.setHorizontalGridLineFromTop(lineNameStub, positionStub);

    const expectedResult = [];
    const expectedItem = { name: lineNameStub, top: positionStub, bottom: 100 - positionStub };
    expectedResult.push(expectedItem);

    const observedResult = sut.getHorizontalGridLineList();
    t.deepEquals(observedResult, expectedResult);
    t.end();
});