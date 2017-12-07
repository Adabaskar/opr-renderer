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

const FileApiBasedJsonObjectStore = require('./infrastructure/persistence/file-api-based-json-object-store');

/**
 * Evaluating HTML5 FileAPI suitability.
 * Using infos found here
 * https://www.html5rocks.com/en/tutorials/file/dndfiles/
 */
(function main() {

    //first apend a proper input field to html
    const bodyNode = document.getElementsByTagName('body')[0];

    const store = new FileApiBasedJsonObjectStore();

    const handleFileSelected = function (evt) {
        const fileList = evt.target.files;
        alert(`input files given : ${fileList.length}`);
        if (fileList.length === 1) {
            store.fromFile(fileList[0]);
        }
    }


    const inputNode = document.createElement('input');
    inputNode.type = 'file';
    inputNode.addEventListener('change', handleFileSelected);

    bodyNode.appendChild(inputNode);

    const downloadButton = document.createElement('input');
    downloadButton.type = 'button';
    downloadButton.value = 'download';
    downloadButton.disabled = true;

    const makeClickEvent = function() {
        const clickEvent = document.createEvent("MouseEvents");
        clickEvent.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        //const clickEvent = new MouseEvent('click');
        return clickEvent;
    }

    const downloadStoreContent = function () {
        //see https://stackoverflow.com/questions/21012580/is-it-possible-to-write-data-to-file-using-only-javascript
        const downloadUrl = store.toDownloadUrl();
        const link = document.createElement('a');
        link.value = "dl";
        link.setAttribute('download', 'opr.json');
        link.href = downloadUrl;
        bodyNode.appendChild(link);

        window.requestAnimationFrame(function() {
            const event = makeClickEvent();
            link.dispatchEvent(event);
            bodyNode.removeChild(link);
        });

    }
    downloadButton.addEventListener('click', downloadStoreContent);

    const successfullLoadCallback = function () {
        downloadButton.disabled = false;
        console.log(store.retrieve('attribute'));
    }
    store.addLoadSuccessCallback(successfullLoadCallback);

    bodyNode.appendChild(downloadButton);

})();