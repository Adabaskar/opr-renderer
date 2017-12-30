const test = require('tape');
const contractTestFactory = require('../src/component-controller-contract-tape-test-factory.js');
const ContentComponentController = require('../src/content-component-controller.js');

test('ContentComponentController Base Class fullfills contract', function (t) {

    contractTestFactory(new ContentComponentController())(t);

});
