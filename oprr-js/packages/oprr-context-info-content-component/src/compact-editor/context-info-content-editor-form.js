const validateRequiredArg = require('oprr-utilities').validateRequiredArg;

/**
 * This class provides a html form that can be added to the dom
 * where needed. 
 */
class ContextInfoContentEditorForm {
    /**
     * 
     * @param {Document} domDoc 
     */
    constructor(domDoc) {

        validateRequiredArg(domDoc, 'Dom Document required');

        let _rootForm = domDoc.createElement('form');
        const _onchangeCallbacks = [];

        function _renderFormContent() {
            const innerHtml = `
            <div>
                <input type="text" value="Topic" id="topicLabel" name="topicLabel" /> :
                <input type="text" value="no topic set" id="topic" name="topic" />
            </div>
            <div>
                <input type="text" value="Reporter" id="reporterLabel" name="reporterLabel" /> :
                <input type="text" value="n.n." id="reporter" name="reporter" />
            </div>
            <div>
                <input type="text" value="Motivation" id="motivationLabel" name="motivationLabel" /> :
                <input type="text" value="no specific motivation given" id="motivation" name="motivation" />
            </div>`;
            _rootForm.innerHTML = innerHtml;
        }
        _renderFormContent();

        this.setValues = function ({ topicLabel, topic, reporterLabel, reporter, motivationLabel, motivation }) {

            _rootForm.querySelector('#topicLabel').value = topicLabel;
            _rootForm.querySelector('#topic').value = topic;
            _rootForm.querySelector('#reporterLabel').value = reporterLabel;
            _rootForm.querySelector('#reporter').value = reporter;
            _rootForm.querySelector('#motivationLabel').value = motivationLabel;
            _rootForm.querySelector('#motivation').value = motivation;

        };

        this.getValues = function () {
            return {
                topicLabel: _rootForm.querySelector('#topicLabel').value,
                topic: _rootForm.querySelector('#topic').value,
                reporterLabel: _rootForm.querySelector('#reporterLabel').value,
                reporter: _rootForm.querySelector('#reporter').value,
                motivationLabel: _rootForm.querySelector('#motivationLabel').value,
                motivation: _rootForm.querySelector('#motivation').value
            }
        }

        /**
         * 
         * @param {function} callback
         */
        this.addOnFormChangedEventListener = function(callback) {            
            _onchangeCallbacks.push(callback);
            _rootForm.addEventListener('change', callback);
        }

        this.getDomSubtree = function () {
            return _rootForm;
        }

        this.release = function() {
            for(let i =0; i<_onchangeCallbacks.length; i++)
                _rootForm.removeEventListener('change', _onchangeCallbacks.pop());
            _rootForm = null;
        }
    }
}
module.exports = ContextInfoContentEditorForm;