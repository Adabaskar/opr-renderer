import { OprHtmlViewLayout } from './opr-html-view-layout';
/**
* Takes care to set width and height of the opr view.
* The OprView consists of an opr view container, the opr view sizer, the opr view layout strukture and the content views
* The view container is controlled by the page controller or is determined by html and css instructions defined during page design.
* The sizer has to be placed directly into the opr view container and if asked to will evaluate the size of its parent and resize 
* itself using px measuers, in contrast to the layout which use relative (%) positioning.
*/
export class OprHtmlViewSizer {

    private _rootHtmlElement: HTMLDivElement;
    private _targetAspectRatio: number = 0;

    constructor(domDoc: Document) {
        this._rootHtmlElement = domDoc.createElement('div');
        this._rootHtmlElement.classList.add('opr-view-sizer');
    }

    public getHtmlRootElement(): HTMLDivElement {
        return this._rootHtmlElement;
    }

    public adjustSizeToParent(): void {
        const parentSize = this._getParentSize();
        this._setHtmlRootElementSize(parentSize.width, parentSize.height);
    }
    private _getParentSize(): { width: number, height: number } {
        const parent = this._rootHtmlElement.parentElement;
        if (parent != null) {
            const parentRect = parent.getBoundingClientRect();
            return {
                width: parentRect.width,
                height: parentRect.height
            }
        } else {
            throw new Error('parent of OprHtmlViewSizer not found');
        }

    }
    private _setHtmlRootElementSize(width: number, height: number): void {
        const sizerStyle = this._rootHtmlElement.style;
        sizerStyle.width = String(width) + 'px';
        sizerStyle.height = String(height) + 'px';
    }

    public setLayout(layout: OprHtmlViewLayout): void {
        this._rootHtmlElement.appendChild(layout.getHtmlRootElement());
    }

    public setTargetAspectRatio(targetWidth: number, targetHeight: number) {
        if (targetWidth <= 0)
            throw new Error('target width has to be > 0');
        if (targetHeight <= 0)
            throw new Error('target height has to be > 0');
        this._targetAspectRatio = targetWidth / targetHeight;
    }

    public adjustSizeToParentPreserveTargetAspectRatio(): void {
        if (this._targetAspectRatio == 0)
            throw new Error('target aspect ratio not set. use setTargetAspectRatio-method');
        const parentSize = this._getParentSize();
        const resultSize = this._getLargestFittingARPreservingRectangleSize(parentSize.width, parentSize.height);
        this._setHtmlRootElementSize(resultSize.width, resultSize.height);
    }

    private _getLargestFittingARPreservingRectangleSize(useableWidth: number, useableHeight: number): { width: number, height: number } {

        /*
   Conditions:
     1) width = scaleW * useableWidth
     2) height = scaleH * useableHeight
     3) width / height = targetWidth / targetHeight = targetAspectRatio
     4) scaleW, scaleH from (0, 1]
     5) scaleW * scaleH be max
     
     a) useableAspectRatio = useableWidth / useableHeight
     b) ratioOfAspectRatios = targetAspectRatio / useableAspectRatio

     width this we can write
       width / height = scaleW / scaleH * useableWidth / useableHeight = targetWidth / targetHeight
       scaleW / scaleH * useableAspectRatio = targetAspectRatio

       A) scaleW = ratioOfAspectRatios * scaleH
       B) scaleH = scaleW / ratioOfAspectRatios

       The larger scaleH is, the bigger scaleW will be and vice versa, regardless of the value of ratioOfAspectRatio.
       The max of either value is 1 (Condition 4.)).
       If scaleH is chosen 1 (max) and ratioOfAspectRatio > 1 then scaleW will be larger than 1 and violate condition 4.).
       So scaleW = 1 should be chosen instead.

    */

        let useableAspectRatio = useableWidth / useableHeight;

        let ratioOfAspectRatios = this._targetAspectRatio / useableAspectRatio;

        let scaleW = 1;
        let scaleH = 1;
        if (ratioOfAspectRatios > 1) {
            scaleH = 1 / ratioOfAspectRatios;
        } else {
            scaleW = ratioOfAspectRatios;
        }

        return {
            width: useableWidth * scaleW,
            height: useableHeight * scaleH
        }

    }

}