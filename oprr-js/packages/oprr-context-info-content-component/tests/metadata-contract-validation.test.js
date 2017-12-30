const test = require('tape');
const metadata = require('../index.js').metadata;
const contractTestFactory = require('oprr-content-component-contract').contentComponentMetadatContractTapeTestFactory;

test('oprr-context-info-component-repository adhers to metadata contract', function (t) {

    validationTest = contractTestFactory(metadata);
    validationTest(t);
  
});