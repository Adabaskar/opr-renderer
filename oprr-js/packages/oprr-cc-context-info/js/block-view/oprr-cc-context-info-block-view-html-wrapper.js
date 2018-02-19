"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OprrCcContextInfoBlockViewHtmlWrapper {
    constructor(domDoc) {
        this._style = '.OprrCcContextInfoBlockView .firstRow {display : flex; justify-content:flex-center; margin-bottom : 0.2%;  } .OprrCcContextInfoBlockView .firstRow .topic { margin: auto;background: red;}';
        this._subDom = '<div class="firstRow">' +
            '<div class="reporter"> <span class="jss-reporterLabel">Reporter</span> <span>: </span> <span class="jss-reporterValue">n.n.</span></div>' +
            '<div class="topic"> <span class="jss-topicLabel">Topic</span> <span>: </span> <span class="jss-topicValue">no topic specified</span> </div>' +
            '</div>' +
            '<div class="secondRow">' +
            '<div class="motivation"> <span class="jss-motivationLabel">Motivation</span> <span>: </span> <span class="jss-motivationValue">no motivation</span> </div>' +
            '</div>';
        this._rootElement = this._makeRootElement(domDoc);
        this._styleElement = this._makeStyleElement(domDoc);
    }
    getHtmlRootElement() {
        return this._rootElement;
    }
    getDefaultStyle() {
        return this._styleElement;
    }
    _makeRootElement(domDoc) {
        const result = domDoc.createElement('div');
        result.classList.add('jssroot-OprrCcContextInfoBlockView');
        result.classList.add('OprrCcContextInfoBlockView');
        result.innerHTML = this._subDom;
        return result;
    }
    _makeStyleElement(domDoc) {
        const result = domDoc.createElement('style');
        result.innerHTML = this._style;
        return result;
    }
}
exports.OprrCcContextInfoBlockViewHtmlWrapper = OprrCcContextInfoBlockViewHtmlWrapper;
