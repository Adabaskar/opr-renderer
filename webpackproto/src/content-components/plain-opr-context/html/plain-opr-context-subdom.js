/* 
    Copyright (C) 2017 Bogumil Bartczak

    This file is part of opr-renderer.

    opr-renderer is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    opr-renderer is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with opr-renderer.  If not, see <http://www.gnu.org/licenses/>.
*/

const ContentComponentSubDOM = require('../../../infrastructure/block-based-opr/html/content-component-subdom');
const PlainOPRContextContentData = require('../viewmodel/plain-opr-context-content-data');
const SimpleDomNodeBuilder = require('../../../infrastructure/dom-node-builder/simple-dom-node-builder');
const clone = require('../../../infrastructure/lang/js/clone');
const clearChilds = require('../../../infrastructure/lang/html/clear-element-childs');

/**
 * Renders a block explaining the context (like topic and relevant people) of the report
 */
class PlainOPRContextSubDOM extends ContentComponentSubDOM {
    constructor(contentData, domDoc) {
        if (!(contentData instanceof PlainOPRContextContentData))
            throw new TypeError("PlainOPRContextViewModel expected");

        let _contentData = clone(contentData);
        const _domDoc = domDoc || document;
        super();
        const self = this;
        let _rootNode = undefined;

        const makeReporterNode = function () {

            const labelValue = _contentData.getReporterLabel() + ": ";
            const reporterValue = _contentData.getReporter();

            const nodeBuilder = new SimpleDomNodeBuilder(_domDoc);
            nodeBuilder.span();
            const reporterLabelNode = nodeBuilder.id('oprcntxt_reporterLabel').text(labelValue).build();
            const reporterValueNode = nodeBuilder.id('oprcntxt_reporterValue').text(reporterValue).build();
            nodeBuilder.clear();

            const reporterNode = nodeBuilder.div().id('oprcntxt_reporter').build();
            reporterNode.appendChild(reporterLabelNode);
            reporterNode.appendChild(reporterValueNode);

            return reporterNode;
        }

        const makeTopicNode = function () {

            const labelValue = _contentData.getTopicLabel() + ": ";
            const topicValue = _contentData.getTopic();

            const nodeBuilder = new SimpleDomNodeBuilder(_domDoc);
            nodeBuilder.span();
            const topicLabelNode = nodeBuilder.id('oprcntxt_topicLabel').text(labelValue).build();
            const topicValueNode = nodeBuilder.id('oprcntxt_topicValue').text(topicValue).build();
            nodeBuilder.clear();

            const topicNode = nodeBuilder.div().id('oprcntxt_topic').addStyle('margin', 'auto').build();
            topicNode.appendChild(topicLabelNode);
            topicNode.appendChild(topicValueNode);

            return topicNode;
        }

        const makeFirstLine = function () {

            const reporterNode = makeReporterNode();
            const topicNode = makeTopicNode();
            const nodeBuilder = new SimpleDomNodeBuilder(_domDoc);
            //"display : flex; justify-content:flex-center; margin-bottom : 0.2%;"
            const firstLineNode = nodeBuilder.div().id('oprcntxt_firstLine').
                addStyle('display', 'flex').
                addStyle('justifyContent', 'flex-start').
                addStyle('marginBottom', '0.2%').
                build();

            firstLineNode.appendChild(reporterNode);
            firstLineNode.appendChild(topicNode);

            return firstLineNode;

        }

        const makeMotivatioNode = function () {

            const labelValue = _contentData.getTopicMotivationLabel() + ": ";
            const motivationValue = _contentData.getTopicMotivation();

            const nodeBuilder = new SimpleDomNodeBuilder(_domDoc);
            nodeBuilder.span();
            const motviationLabelNode = nodeBuilder.id('oprcntxt_motivationLabel').text(labelValue).build();
            const motivationValueNode = nodeBuilder.id('oprcntxt_motivationValue').text(motivationValue).build();
            nodeBuilder.clear();

            const motivationNode = nodeBuilder.div().id('oprcntxt_motivatio').build();
            motivationNode.appendChild(motviationLabelNode);
            motivationNode.appendChild(motivationValueNode);

            return motivationNode;
        }

        const renderContent = function () {
            const firstLineNode = makeFirstLine();
            const secondLineNode = makeMotivatioNode();
            _rootNode.appendChild(firstLineNode);
            _rootNode.appendChild(secondLineNode);
        }

        this.init = function () {
            _rootNode = _domDoc.createElement('div');

            renderContent();
        }

        this.getRootNode = function () {
            if (_rootNode === undefined)
                self.init();
            return _rootNode;
        }

        this.updateContent = function (contentData) {
            if (!(contentData instanceof PlainOPRContextContentData))
                throw new TypeError("PlainOPRContextContentData expected");
            _contentData = clone(contentData);
            if(_rootNode !== undefined) {
                clearChilds(_rootNode);
                renderContent();
            }
        }

    }
}
module.exports = PlainOPRContextSubDOM;