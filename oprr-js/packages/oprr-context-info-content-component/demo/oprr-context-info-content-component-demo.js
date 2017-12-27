const ContextInfoContentComponent = require('../index.js');

(function main() {

    if (document === undefined || document === null)
        throw new Error('this demo requires a DOM');

        const contentComponentViewArea = document.createElement('div');
        document.body.appendChild(contentComponentViewArea);

        contentComponentViewArea.style.position = 'absolute';
        contentComponentViewArea.style.top = '0%';
        contentComponentViewArea.style.bottom = '90%';
        contentComponentViewArea.style.left = '10%';
        contentComponentViewArea.style.right = '10%';
        contentComponentViewArea.style.border = 'black solid 1px';
        
        const viewTypeId = ContextInfoContentComponent.metadata.viewIds[0];
        const contentComponent = ContextInfoContentComponent.makeInstance();            
        const viewId = contentComponent.addDomBasedView(document);
        const viewRoot = contentComponent.getViewsDomSubtree(viewId);
        
        contentComponentViewArea.appendChild(viewRoot);
               
//build editor modal dom element
        const compactEditorArea = document.createElement('div');
        document.body.appendChild(compactEditorArea);

        compactEditorArea.style.position = 'absolute';
        compactEditorArea.style.top = '15%';
        compactEditorArea.style.bottom = '50%';
        compactEditorArea.style.left = '10%';
        compactEditorArea.style.right = '10%';
        compactEditorArea.style.border = 'black solid 1px';

        contentComponent.activateDomBasedCompactEditor(document);
        compactEditorArea.appendChild(contentComponent.getDomBasedCompactEditorsDomSubtree());
      
}())