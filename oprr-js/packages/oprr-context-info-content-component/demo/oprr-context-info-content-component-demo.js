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
        
        const contentComponent = ContextInfoContentComponent.makeInstance();    
        console.log(ContextInfoContentComponent.metadata.viewIds[0]);
        contentComponent.activateDomBasedView(ContextInfoContentComponent.metadata.viewIds[0], document);
        

        //get views
        //activate first view
        //get root dom node of first view
        //append it to contenComponentArea

        //build editor modal dom element
        //get editor of content component
        //append it to modal
        //open modal on double click
        //close modal on cancel
        //retrieve editor state on ok/store and give the editor state to the controller        

}())