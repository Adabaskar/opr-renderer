const clone = require('oprr-utilities').clone;
/**
 * The State Model of the component. 
 */

class ContextInfoContentComponentState {
    constructor() {

        const _contentData = {
            topicLabel: 'Topic',
            topic: '',
            reporterLabel: 'Reporter',
            reporter: '',
            motivationLabel: 'Motivation',
            motivation: ''
        };

        const _onChangeListeners = [];

        this.getContentState = function () {
            return clone(_contentData);
        }

        this.setContentState = function ({ topicLabel, topic, reporterLabel, reporter, motivationLabel, motivation }) {
            _contentData.topicLabel = topicLabel || _contentData.topicLabel;
            _contentData.topic = topic || _contentData.topic;
            _contentData.reporterLabel = reporterLabel || _contentData.reporterLabel;
            _contentData.reporter = reporter || _contentData.reporter;
            _contentData.motivationLabel = motivationLabel || _contentData.motivationLabel;
            _contentData.motivation = motivation || _contentData.motivation;
            _raiseChangedEvent();
        }

        /**
         * 
         * @param {function} callback called when the state changes
         */
        this.addOnChangeListener = function (callback) {
            _onChangeListeners.push(callback);
        }

        this.removeOnChangeListener = function(callback) {
            const index = _onChangeListeners.indexOf(callback)
            if(index > -1) 
                _onChangeListeners.splice(index, 1);
        }

        function _raiseChangedEvent() {
            for (let i = 0; i < _onChangeListeners.length; i++) {
                const cb = _onChangeListeners[i];
                cb();
            }
                
        }

    }
}
module.exports = ContextInfoContentComponentState;