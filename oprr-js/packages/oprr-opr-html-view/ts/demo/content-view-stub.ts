import { IContentHtmlView } from 'oprr-content-component-base';

export class ContentViewStub implements IContentHtmlView {

    getDefaultStyle(): HTMLStyleElement {
        throw new Error("Method not implemented.");
    }
    private _rootElement: HTMLDivElement;
    
    constructor(domDoc: Document, backgroundColor: string) {        
        this._rootElement = domDoc.createElement('div');
        this._rootElement.style.backgroundColor = backgroundColor;
    }

    getHtmlRootElement(): HTMLElement {
        return this._rootElement;
    }

}
