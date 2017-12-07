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

const test = require('tape');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const PlainOPRContextSubDOM = require('../../../../src/content-components/plain-opr-context/html/plain-opr-context-subdom');
const PlainOPRContextContentData = require('../../../../src/content-components/plain-opr-context/viewmodel/plain-opr-context-content-data');

test('renders a div-envelope ', function (t) {

    const documentStub = (new JSDOM()).window.document;
    const contentDataStub = new PlainOPRContextContentData();
    const sut = new PlainOPRContextSubDOM(contentDataStub, documentStub);

    const resultNode = sut.getRootNode();

    t.true(resultNode.nodeName === 'DIV');
    t.end();
});

test('renders expected content data', function (t) {

    const documentStub = (new JSDOM()).window.document;
    const contentDataStub = new PlainOPRContextContentData();

    const sut = new PlainOPRContextSubDOM(contentDataStub, documentStub);

    const resultNode = sut.getRootNode();

    const renderedInnerHtml = resultNode.innerHTML;

    t.true(renderedInnerHtml.includes(contentDataStub.getTopicLabel()), 'Topic Label Value has to be rendered');
    t.true(renderedInnerHtml.includes(contentDataStub.getTopic()), 'Topic Value has to be rendered');
    t.true(renderedInnerHtml.includes(contentDataStub.getReporterLabel()), 'Reporter Label Value has to be rendered');
    t.true(renderedInnerHtml.includes(contentDataStub.getReporter()), 'Reporter Value has to be rendered');
    t.true(renderedInnerHtml.includes(contentDataStub.getTopicMotivationLabel()), 'Topic Motivation Label Value has to be rendered');
    t.true(renderedInnerHtml.includes(contentDataStub.getTopicMotivation()), 'Topic Motivation Value has to be rendered');

    t.end();
});

test('updates to expected content data ', function (t) {

    const documentStub = (new JSDOM()).window.document;
    const contentDataStub = new PlainOPRContextContentData();

    const sut = new PlainOPRContextSubDOM(contentDataStub, documentStub);

    let resultNode = sut.getRootNode();

    let renderedInnerHtml = resultNode.innerHTML;

    t.true(renderedInnerHtml.includes(contentDataStub.getTopicLabel()), 'Topic Label Value has to be rendered');
    t.true(renderedInnerHtml.includes(contentDataStub.getTopic()), 'Topic Value has to be rendered');
    t.true(renderedInnerHtml.includes(contentDataStub.getReporterLabel()), 'Reporter Label Value has to be rendered');
    t.true(renderedInnerHtml.includes(contentDataStub.getReporter()), 'Reporter Value has to be rendered');
    t.true(renderedInnerHtml.includes(contentDataStub.getTopicMotivationLabel()), 'Topic Motivation Label Value has to be rendered');
    t.true(renderedInnerHtml.includes(contentDataStub.getTopicMotivation()), 'Topic Motivation Value has to be rendered');

    contentDataStub.setReporterLabel('Project Manager');
    contentDataStub.setReporter('Bob');
    contentDataStub.setTopic('OPR Renderer Open Source');
    contentDataStub.setTopicLabel('Project');
    contentDataStub.setTopicMotivation('Display, Edit and Refactor One Page Report  via the browser. Give something back.');

    sut.updateContent(contentDataStub);
    resultNode = sut.getRootNode();    
    renderedInnerHtml = resultNode.innerHTML;       

    t.true(renderedInnerHtml.includes(contentDataStub.getTopicLabel()), 'Topic Label Value has to be updated');
    t.true(renderedInnerHtml.includes(contentDataStub.getTopic()), 'Topic Value has to be updated');
    t.true(renderedInnerHtml.includes(contentDataStub.getReporterLabel()), 'Reporter Label Value has to be updated');
    t.true(renderedInnerHtml.includes(contentDataStub.getReporter()), 'Reporter Value has to be updated');
    t.true(renderedInnerHtml.includes(contentDataStub.getTopicMotivationLabel()), 'Topic Motivation Label Value has to be updated');
    t.true(renderedInnerHtml.includes(contentDataStub.getTopicMotivation()), 'Topic Motivation Value has to be updated');


    t.end();
});