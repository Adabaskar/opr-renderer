import { IContentHtmlView } from 'oprr-content-component-base';
export declare class OprrCcContextInfoBlockViewHtmlWrapper implements IContentHtmlView {
    private _style;
    private _subDom;
    private _rootElement;
    private _styleElement;
    constructor(domDoc: Document);
    getHtmlRootElement(): HTMLElement;
    getDefaultStyle(): HTMLStyleElement;
    private _makeRootElement(domDoc);
    private _makeStyleElement(domDoc);
}
