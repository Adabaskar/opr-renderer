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

const PlainOPRContextSubDom = require('./content-components/plain-opr-context/html/plain-opr-context-subdom');
const PlainOPRContextContentData = require('./content-components/plain-opr-context/viewmodel/plain-opr-context-content-data');

/**
 * Used to test if a button click will change the content of a 
 * content component already attached to the dom.
 */
(function main() {

    const contentData = new PlainOPRContextContentData();
    const contentComponent = new PlainOPRContextSubDom(contentData);

    const bodyNode = document.getElementsByTagName('body')[0];
    bodyNode.appendChild(contentComponent.getRootNode());

    const updateContentComponent = function () {
        const contentDataUpdate = new PlainOPRContextContentData();
        contentDataUpdate.setReporter('ME!');

        contentComponent.updateContent(contentDataUpdate);
    };

    const updateButton = document.getElementById('updateBtn');
    updateButton.addEventListener('click', updateContentComponent);

})();