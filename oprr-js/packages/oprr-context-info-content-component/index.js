const ContextInfoContentComponentController = require('./src/component-controller/context-info-content-component-controller.js');
const MainHeaderView = require('./src/views/context-info-as-main-header-view.js');

module.exports = {    
    metadata : {
        contentComponentTypeId : 'OprrContextInfoContentComponent',
        contentViews : [ {viewTypeId: MainHeaderView.getViewTypeId(), defaultDisplayName: 'Main Header View'}],        
        defaultDisplayName : 'Context Info'
    },
    /**
     * @returns {ContextInfoContentComponentController} a new instance of this component (or reather the head to the instance aggregate).
     */
    makeInstance : function() {return new ContextInfoContentComponentController();}
}