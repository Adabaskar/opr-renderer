const test = require('tape');
const validateRequiredParam = require('../../src/js/validateRequiredParam.js');

test('validateRequiredParam_emptyLambdaNoTypeCheck_throwsException', function(t) {

    const errorMessageStub = 'required param not passed';
    function sut(arg) {
        validateRequiredParam(arg, errorMessageStub);
    }

    t.throws(() => { sut(); });
    t.end();
});

test('validateRequiredParam_LambdaWithArg_throwsNoException', function(t) {

    const errorMessageStub = 'required param not passed';
    function sut(arg) {
        validateRequiredParam(arg, errorMessageStub, String);
    }

    t.doesNotThrow(() => { sut('string'); });
    t.end();
});