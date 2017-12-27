const validateRequiredArgs = require('oprr-utilities').validateRequiredArg;

const ContextInfoContentComponentState = require('../component-state/context-info-content-component-state.js');

/**
 * Sub Dom Tree for a simple Context Information View meant to be used 
 * as the report's main header.
 */
class ContextInfoAsMainHeaderView {
    /**
     * 
     * @param {Document} domDoc 
     * @param {ContextInfoContentComponentState} componentState
     */
    constructor(domDoc, componentState) {
        validateRequiredArgs(domDoc, 'DOM Document required');
        validateRequiredArgs(componentState, 'Reference to Component State Required');
        
        const _componentState = componentState;
        let _rootNode = domDoc.createElement('div');
      
        const _renderInnerHtml = function ({reporterLabel, reporter, topicLabel, topic, motivationLabel, motivation}) {
            const innerHtml =
                `<div style="display : flex; justify-content:flex-center; margin-bottom : 0.2%;">
                    <div>
                        <span>${reporterLabel}</span>
                        <span>:</span>
                        <span>${reporter}</span>
                    </div>
                    <div style="margin : auto">
                    <span>${topicLabel}</span>
                    <span>:</span>   
                        <span>${topic}</span>
                    </div>
                </div>
                <div>
                    <span>${motivationLabel}</span>
                    <span>:</span>
                    <span>${motivation}</span>
                </div>`;
            _rootNode.innerHTML = innerHtml;
        };
        
        function _componentStateChangedListener() {
            _renderInnerHtml(_componentState.getContentState());
        }

        (function _init() {
            _componentState.addOnChangeListener(_componentStateChangedListener);
            _renderInnerHtml(_componentState.getContentState());
        })();

        this.getDomSubtree = function () {
            return _rootNode;
        }

        this.release = function() {
            _componentState.removeOnChangeListener(_componentStateChangedListener);
            _rootNode = undefined;
        }
    }
}
module.exports = ContextInfoAsMainHeaderView;