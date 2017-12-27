const ContextInfoContentEditorForm = require('./context-info-content-editor-form.js');
const ContextInfoContentComponentState = require('../component-state/context-info-content-component-state.js');
const validateRequiredArg = require('oprr-utilities').validateRequiredArg;

/**
 * The Compact editor provides a dom subtree to be appended to some part of the main dom 
 * when and where required. 
 * It always provides all edit controls for all active views of a content component.
 */
class ContextInfoDomBasedCompactEditor {
    /**
     * 
     * @param {Document} domDoc 
     * @param {ContextInfoContentComponentState} contextInfoComponentState
     * @param {ContextInfoContentEditorForm} contentEditorForm optional, can be passed in for tests.
     */
    constructor({domDoc, contextInfoComponentState, contentEditorForm}) {
        validateRequiredArg(contextInfoComponentState, 'Context Info Component State Reference Required');
       
        const _self = this;

        const _componentState = contextInfoComponentState;
        let _editorDomtreeRoot = domDoc.createElement('div');
        let _contentEditorForm = contentEditorForm || new ContextInfoContentEditorForm(domDoc);
        /**
         * @type {HTMLElement}
         */
        let _useChangesButton = domDoc.createElement('button');
        const _ACCEPT_BUTTON_ID = 'cntxInfoCompactEditor_acceptChanges_btn';
        
        function _setFormValuesFromComponentState() {
            _contentEditorForm.setValues(_componentState.getContentState());
        }

        
        /**
         * Method induces that editor will retrieve all user input from its managed uis and 
         * to evaluate into a new component state
         */
        function _evaluateUserInputToNewComponentState() {
            const values = _contentEditorForm.getValues();
            _componentState.setContentState(values);
        };
     
        (function _init() {
            _editorDomtreeRoot.appendChild(_contentEditorForm.getDomSubtree() );    
            _useChangesButton.id = _ACCEPT_BUTTON_ID;
            _useChangesButton.disabled = true;
            _useChangesButton.innerHTML = 'accept';
            _editorDomtreeRoot.appendChild(_useChangesButton);

            _setFormValuesFromComponentState();

            _contentEditorForm.addOnFormChangedEventListener(() =>  _useChangesButton.disabled = false );
            _useChangesButton.addEventListener('click', _evaluateUserInputToNewComponentState);
        })();

        
        this.getDomSubtree = function() {
            return _editorDomtreeRoot;
        };

        this.release = function() {
            _useChangesButton.removeEventListener('click', _evaluateUserInputToNewComponentState);    
            _editorDomtreeRoot = null;
            _useChangesButton = null;
            _contentEditorForm.release();
            _contentEditorForm = null;
        };
        
    }
}
module.exports = ContextInfoDomBasedCompactEditor;