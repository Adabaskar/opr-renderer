const test = require('tape');
/**
 * @typedef {Object} ContentViewMetadata
 * @property {string} viewTypeId
 * @property {string} defaultDisplayName
 */
/**
 * @typedef {Object} ContentComponentMetadata
 * @property {string} contentComponentTypeId
 * @property {ContentViewMetadata[]} contentViews
 * @property {function} getDisplayName
 */
/**
 * @param {ContentComponentMetadata} metadataInstance
 */
const contentComponentContractTapeTestFactory = function (metadataInstance) {

    /**
     * @param {Test} assert
     */
    return function (assert) {
       
        assert.true(metadataInstance.hasOwnProperty('contentComponentTypeId'), 'has contentComponentTypeId');   
        assert.true(metadataInstance.hasOwnProperty('contentViews'), 'provides content views');           
        assert.true(metadataInstance.hasOwnProperty('defaultDisplayName'), 'has defaultDisplayName');   

        assert.true(metadataInstance.contentViews.length > 0, 'minimum of one content view');
        assert.true(metadataInstance.contentViews[0].hasOwnProperty('viewTypeId'), 'content view metadata has type id');
        assert.true(metadataInstance.contentViews[0].hasOwnProperty('defaultDisplayName'), 'content view metadata has default display name');
       
        assert.end();        
    }

}

module.exports = contentComponentContractTapeTestFactory;