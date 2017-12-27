const test = require('tape');

const componentControllerContractTapeTestFactory = function (sut) {

    /**
     * @param {Test} assert
     */
    return function (assert) {
        assert.true(sut.hasOwnProperty('addDomBasedView'), 'has viewId addDomBasedView(domDoc[, viewTypeId])');
        assert.true(sut.hasOwnProperty('removeDomBasedView'), 'has removeDomBasedView(viewId)');
        assert.true(sut.hasOwnProperty('getViewsDomSubtree'), 'has HTMLElement getViewsDomSubtree(viewId)');
        assert.true(sut.hasOwnProperty('getDomBasedCompactEditorsDomSubtree'), 'has HTMLElement getDomBasedCompactEditorsDomSubtree()');        
        assert.end();        
    }

}

module.exports = componentControllerContractTapeTestFactory;