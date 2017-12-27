/**
 * Contract interface for content component views.
 */
class ContentComponentView {
    constructor(domDoc) {
        if (domDoc === undefined || domDoc === null)
            throw new Error("DOM Document required!");
            
        this.getDomSubtree = function () {
            throw new Error('implement in derived class!');
        }
    }
}
module.exports = ContentComponentView;