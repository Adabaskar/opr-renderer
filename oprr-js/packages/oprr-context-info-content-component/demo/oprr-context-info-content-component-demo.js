const ContextInfoContentComponent = require('../index.js');

(function main() {

    if (document === undefined || document === null)
        throw new Error('this demo requires a DOM');

        const contentComponentArea = document.createElement('div');
        document.body.appendChild(contentComponentArea);

        contentComponentArea.style.position = 'absolute';
        contentComponentArea.style.top = '0%';
        contentComponentArea.style.bottom = '90%';
        contentComponentArea.style.left = '10%';
        contentComponentArea.style.right = '10%';
        
        const usedViewId = ContextInfoContentComponent.metadata.viewIds[0];
        const contentComponent = ContextInfoContentComponent.makeInstance();            
        contentComponent.activateDomBasedView(usedViewId, document);
        const viewRoot = contentComponent.getViewDomSubTree(usedViewId);
        
        contentComponentArea.appendChild(viewRoot);


        //build editor modal dom element
        //get editor of content component
        //append it to modal
        //open modal on double click
        //close modal on cancel
        //retrieve editor state on ok/store and give the editor state to the controller        

}())