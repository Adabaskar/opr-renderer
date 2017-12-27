require('./non-modal-html-dialog.css');

class NonModalHtmlDialog {
    /**
     * 
     * @param {Document} domDoc 
     */
    constructor(domDoc) {
        const _body = domDoc.createElement('div');
        _body.classList.add('nonModalDialogBody');

        this.getDomSubtree = function() {
            return _body;
        }
    }
}
module.exports = NonModalHtmlDialog;