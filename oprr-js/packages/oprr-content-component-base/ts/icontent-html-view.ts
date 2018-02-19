/**
 * Contract for Content Views of a content component
 */
export interface IContentHtmlView {
    getHtmlRootElement() : HTMLElement;
    getDefaultStyle() : HTMLStyleElement;
}