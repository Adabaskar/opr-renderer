const ContextInfoContentComponent = require('./src/component/context-info-content-component.js');

module.exports = {
    metadata : {
        contentComponentId : 'OprrContextInfoContentComponent',
        viewIds : ['AsMainHeader'],
    },
    /**
     * @returns {ContextInfoContentComponent} a new instance of this component.
     */
    makeInstance : function() {return new ContextInfoContentComponent();}
}