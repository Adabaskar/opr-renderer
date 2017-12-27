const test = require('tape');

const componentViewContractTapeTestFactory = function (sut) {

    /**
     * @param {Test} assert
     */
    return function (assert) {
        assert.true(sut.hasOwnProperty('getDomSubtree'), 'has HTMLElement getDomSubtree()');   
        /**
         * Method is called to force cleanup action that shall avoid memory leaks, like removing listeners and 
         * nulling referenced objects, especially dom node references.
         */
        assert.true(sut.hasOwnProperty('release'), 'has void release() method)');
        assert.end();        
    }

}

module.exports = componentViewContractTapeTestFactory;