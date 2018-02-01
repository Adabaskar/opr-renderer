const ContextInfoContentComponentController = require('./src/component-controller/context-info-content-component-controller.js');

module.exports = {    
    metadata : {
        contentComponentTypeId : 'OprrContextInfoContentComponent',
        contentViews : [ {viewTypeId: 'contextInfoAsHeader', defaultDisplayName: 'Main Header View'}],
        /**
         * Function because i18n might need to pass params or more complex lookup might be required.
         */
        getDisplayName : function() { return 'Context Info';}
    },
    /**
     * @returns {ContextInfoContentComponentController} a new instance of this component (or reather the head to the instance aggregate).
     */
    makeInstance : function() {return new ContextInfoContentComponentController();}
}