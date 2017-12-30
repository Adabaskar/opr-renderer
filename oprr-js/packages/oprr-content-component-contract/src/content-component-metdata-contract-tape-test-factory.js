const test = require('tape');

const contentComponentContractTapeTestFactory = function (metadataInstance) {

    /**
     * @param {Test} assert
     */
    return function (assert) {
       
        assert.true(metadataInstance.hasOwnProperty('contentComponentTypeId'), 'has contentComponentTypeId');   
        assert.true(metadataInstance.hasOwnProperty('viewIds'), 'has viewIds');   
        assert.true(metadataInstance.hasOwnProperty('getDisplayName'), 'has getDisplayName');   
       
        assert.end();        
    }

}

module.exports = contentComponentContractTapeTestFactory;