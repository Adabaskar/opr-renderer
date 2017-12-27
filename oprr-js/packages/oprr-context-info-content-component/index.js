const ContextInfoContentComponentController = require('./src/component-controller/context-info-content-component-controller.js');

module.exports = {
    metadata : {
        contentComponentId : 'OprrContextInfoContentComponent',
        viewIds : ['AsMainHeader'],
    },
    /**
     * @returns {ContextInfoContentComponentController} a new instance of this component.
     */
    makeInstance : function() {return new ContextInfoContentComponentController();}
}