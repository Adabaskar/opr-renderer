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

let HtmlOprScaffolding = require('./infrastructure/block-based-opr/html/html-opr-scaffolding');
let Block = require('./infrastructure/block-based-opr/layout/block');
let RecursiveHtmlBlockRenderer = require('./infrastructure/block-based-opr/html/blockrecursive-html-renderer');
let RelativeIrregularGridLine = require('./infrastructure/block-based-opr/layout/relative-irregular-grid-line');
const IrregularGridPlacement = require('./infrastructure/block-based-opr/layout/parent-relative-irregular-grid-block-placement');
const PlainOprContextSubDOM = require('./content-components/plain-opr-context/html/plain-opr-context-subdom');
const PlainOprContextContentData = require('./content-components/plain-opr-context/viewmodel/plain-opr-context-content-data');

let makeGridLineFromOffset = function (offset) {
    let gridLine = new RelativeIrregularGridLine();
    gridLine.setOffset(offset);
    return gridLine;
};

let makeGridLineFromInverseOffset = function (inverseOffset) {
    let gridLine = new RelativeIrregularGridLine();
    gridLine.setInverseOffset(inverseOffset);
    return gridLine;
};

let topicBlock;

let makeIrregularGridLayout = function () {

    const topBaseLine = makeGridLineFromOffset(0);
    const leftBaseLine = makeGridLineFromOffset(0);
    const rightBaseLine = makeGridLineFromInverseOffset(0);
    const bottomBaseLine = makeGridLineFromInverseOffset(0);
    const headerBottomLine = makeGridLineFromOffset(10);
    const summaryTopLine = makeGridLineFromInverseOffset(10);
    const logoRightLine = makeGridLineFromOffset(7);
    const reportInstanceInfoLeftLine = makeGridLineFromInverseOffset(10);
    const goalsRightLine = makeGridLineFromOffset(10);
    const dataLabelsTopLine = makeGridLineFromInverseOffset(30);
    const taskRightLine = makeGridLineFromOffset(35);

    const logoPlacement = new IrregularGridPlacement(leftBaseLine, topBaseLine, logoRightLine, headerBottomLine);
    const topicPlacement = new IrregularGridPlacement(logoRightLine, topBaseLine, reportInstanceInfoLeftLine, headerBottomLine);
    const reportInstanceInfoPlacement = new IrregularGridPlacement(reportInstanceInfoLeftLine, topBaseLine, rightBaseLine, headerBottomLine);
    const goalsToTasksPlacement = new IrregularGridPlacement(leftBaseLine, headerBottomLine, goalsRightLine, dataLabelsTopLine);
    const tasksPlacement = new IrregularGridPlacement(goalsRightLine, headerBottomLine, taskRightLine, dataLabelsTopLine);
    const summaryPlacement = new IrregularGridPlacement(leftBaseLine, summaryTopLine, rightBaseLine, bottomBaseLine);
    const timelinePlacement = new IrregularGridPlacement(taskRightLine, headerBottomLine, rightBaseLine, dataLabelsTopLine);
    const goalLabelsPlacement = new IrregularGridPlacement(leftBaseLine, dataLabelsTopLine, goalsRightLine, summaryTopLine);
    const timelineLabelsPlacement = new IrregularGridPlacement(taskRightLine, dataLabelsTopLine, rightBaseLine, summaryTopLine);

    const rootBlock = new Block('b_root');
    const logoBlock = new Block('b_logo', logoPlacement);
    topicBlock = new Block('b_topic', topicPlacement);
    const reportInstanceInfoBlock = new Block('b_reportInstanceInfo', reportInstanceInfoPlacement);
    const goalToTaskAssociationsBlock = new Block('b_goalToTask', goalsToTasksPlacement);
    const tasksBlock = new Block('b_tasks', tasksPlacement);
    const timelineBlock = new Block('b_timeline', timelinePlacement);
    const goalLabelsBlock = new Block('b_goalLabels', goalLabelsPlacement);
    const timelineLabelsBlock = new Block('b_timelineLabels', timelineLabelsPlacement);
    const summaryBlock = new Block('b_summary', summaryPlacement);

    rootBlock.addChildren([logoBlock, topicBlock, reportInstanceInfoBlock, goalToTaskAssociationsBlock, tasksBlock, timelineBlock, goalLabelsBlock, timelineLabelsBlock, summaryBlock]);

    return rootBlock;

};

(function main() {

    let scaffold = new HtmlOprScaffolding();
    scaffold.setup();

    let simpleBlockLayout = makeIrregularGridLayout();
   
    const oprContextContentData = new PlainOprContextContentData();
    const oprContext = new PlainOprContextSubDOM(oprContextContentData);
    
    const renderer = new RecursiveHtmlBlockRenderer();
    renderer.setContentComponentForBlock(topicBlock, oprContext);
    renderer.appendChildBlocksToHtml(simpleBlockLayout, scaffold.oprDiv);

})();

