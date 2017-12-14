/**
 * Sub Dom Tree for a simple Context Information View meant to be used 
 * as the report's main header.
 */
class ContextInfoAsMainHeaderView {
    /**
     * 
     * @param {Document} domDoc 
     */
    constructor(domDoc) {
        if (domDoc === undefined || domDoc === null)
            throw new Error("DOM Document required!");

        const _rootNode = domDoc.createElement('div');
        const _reporterLabel = 'Reporter';
        const _reporter = 'n.n.';
        const _topic = 'No Title';
        const _motivationLabel = 'Motivation';
        const _motivation = 'no motivation given';

        const _renderInnerHtml = function () {
            const innerHtml = 
                `<div style="display : flex; justify-content:flex-center; margin-bottom : 0.2%;">
                    <div>
                        <span>${_reporterLabel}</span>
                        <span>:</span>
                        <span>${_reporter}</span>
                    </div>
                    <div style="margin : auto">              
                        <span>${_topic}</span>
                    </div>
                </div>
                <div>
                    <span>${_motivationLabel}</span>
                    <span>:</span>
                    <span>${_motivation}</span>
                </div>`;
                _rootNode.innerHTML = innerHtml;
        }
        _renderInnerHtml();

        this.getDomSubTreeRoot = function () {
            return _rootNode;
        }

    }
}
module.exports = ContextInfoAsMainHeaderView;