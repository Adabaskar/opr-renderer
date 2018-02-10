export class HtmlContentViewCell {

    private _top: number = 0;
    private _bottom: number = 100;
    private _left: number = 0;
    private _right: number = 100;
    private _name: string;

    private _rootElement: HTMLDivElement;

    constructor(domDoc: Document, name: string, left: number, top: number, right: number, bottom: number) {
        if (!this._checkLines(left, right))
            throw new Error('violated left < right ');
        if (!this._checkLines(top, bottom))
            throw new Error('violated top < bottom ');

        this._left = left;
        this._top = top;
        this._right = right;
        this._bottom = bottom;

        this._name = name;
        this._rootElement = this._setupHtmlElement(domDoc);
        this._applyOffsetsToHtmlElement();

    }
    private _checkRange(offset: number) {
        if (offset < 0 || offset > 100) {
            throw new Error(`Offset has to be between 0 and 100. Observed ${offset}`)
        }
    }
    private _checkLines(smaller: number, larger: number): boolean {
        this._checkRange(smaller);
        this._checkRange(larger);
        return smaller < larger;
    }
    private _setupHtmlElement(domDoc: Document): HTMLDivElement {
        const htmlElement = domDoc.createElement('div');
        const style = htmlElement.style;
        style.position = 'absolute';
        return htmlElement;
    }
    private _applyOffsetsToHtmlElement(): void {
        const style = this._rootElement.style;
        style.left = this.getLeftOffset();
        style.top = this.getTopOffset();
        style.right = this.getRightOffset();
        style.bottom = this.getBottomOffset();
    }

    public getLeftOffset(): string {
        return String(this._left) + '%';
    }
    public getRightOffset(): string {
        return String(this._right) + '%';
    }
    public getTopOffset(): string {
        return String(this._top) + '%';
    }
    public getBottomOffset(): string {
        return String(this._bottom) + '%';
    }

    public getHtmlRootElement(): HTMLDivElement {
        return this._rootElement;
    }
}