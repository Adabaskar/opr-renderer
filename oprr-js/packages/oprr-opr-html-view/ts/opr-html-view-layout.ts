import {HtmlContentViewCell} from './html-content-view-cell';
import {IContentHtmlView} from 'oprr-content-component-base';
import {TSMap} from 'typescript-map';

/**
 * An Opr View is made up of content component views positioned somewhere on a 
 * area with fixed aspect ratio.
 */
export class OprHtmlViewLayout {

    private _domDoc: Document;
    private _htmlRootElement: HTMLDivElement;
    private _nextId : number = 0;    
    private _cells : TSMap<string, HtmlContentViewCell> = new TSMap();

    constructor(domDoc: Document) {
        this._domDoc = domDoc;
        this._htmlRootElement = this._setupRootElement(domDoc);
    }

    private _setupRootElement(domDoc: Document) : HTMLDivElement{
        const htmlRootElement = domDoc.createElement('div');
        const style = htmlRootElement.style;
        style.position = 'relative';
        style.width = '100%';
        style.height = '100%';
        return htmlRootElement
    }

    public getHtmlRootElement(): HTMLElement {
        return this._htmlRootElement;
    }

    /**
     * 
     * @param cell 
     * @returns the id of the cell in the opr view for editing and management
     */
    public addCell(name: string, left: number, top: number, right: number,bottom: number) : string {
        const id = String(this._nextId++);
        const cell = new HtmlContentViewCell(this._domDoc, name, left, top, right, bottom);
        this._htmlRootElement.appendChild(cell.getHtmlRootElement());
        this._cells.set(id, cell);
        return id;
    }

    public assignContentViewToCell(content: IContentHtmlView, cellId: string) : void {
        if(!this._cells.has(cellId))
            throw new Error(`cell id: '${cellId}' unknown`);
        this._cells.get(cellId).getHtmlRootElement().appendChild(content.getHtmlRootElement());

    }

}