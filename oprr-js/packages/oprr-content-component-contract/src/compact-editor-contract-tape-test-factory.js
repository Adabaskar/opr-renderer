const test = require('tape');

const compactEditorContractTapeTestFactory = function (sut) {

    /**
     * @param {Test} assert
     */
    return function (assert) {
        assert.true(sut.hasOwnProperty('getDomSubtree'), 'has HTMLElement getDomSubtree()');      

        assert.true(sut.hasOwnProperty('release'), 'has void release() method)');
        /**
         * This method is called by the component-controller, when configuration changes occur that might be of
         * interesst to the editor, e.g. a view has been added or removed.
         */
     //   assert.true(sut.hasOwnProperty('evaluateContentComponentConfigurationStateChange'), 'has void evaluateContentComponentConfigurationStateChange()');
        
        assert.end();
    }

}

module.exports = compactEditorContractTapeTestFactory;