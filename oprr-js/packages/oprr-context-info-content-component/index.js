const ContextInfoContentComponent = require('./src/component/context-info-content-component.js');

module.exports = {
    metadata : {
        viewIds : ['AsMainHeader'],
    },
    /**
     * @returns {ContextInfoContentComponent} a new instance of this component.
     */
    makeInstance : function() {return new ContextInfoContentComponent();}
}