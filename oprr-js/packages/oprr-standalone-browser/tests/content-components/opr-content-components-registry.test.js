const test = require('tape');
const OprContentComponentsRegistry = require('../../src/content-components/opr-content-components-registry.js');
const ContextInfoContentComponent = require('oprr-context-info-content-component');

test('Context Info Component is Registered', function (t) {

    const sut = new OprContentComponentsRegistry();
    const registeredComponents = sut.getRegister();

    t.true(registeredComponents.includes(ContextInfoContentComponent));
    t.end();
});