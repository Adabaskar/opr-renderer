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

const JsonObjectStore = require('./json-object-store');

class FileAPIBasedJsonObjectStore extends JsonObjectStore {
    constructor() {
        super();
        let _store = undefined;

        const _loadSuccessCallbacks = [];

        const _fileReader = new FileReader();
        const _onSuccessfullFileRead = function () {
            const result = JSON.parse(_fileReader.result);
            _store = result;
        
            for(let i=0; i<_loadSuccessCallbacks.length; i++) 
                _loadSuccessCallbacks[i]();
        }
        _fileReader.onload = _onSuccessfullFileRead;
        
        this.fromFile = function(file) {        
            _fileReader.readAsText(file);
        }

        this.toDownloadUrl = function() {
            //see https://stackoverflow.com/questions/21012580/is-it-possible-to-write-data-to-file-using-only-javascript
            const stringifiedStore = JSON.stringify(_store);
            // const data = new Blob([stringifiedStore], {type: 'application/json'});
            // const downloadUrl = window.URL.createObjectURL(data);
            const escapedStringifiedStore = escape(stringifiedStore);
            const downloadUrl = `data: text/plain charset=utf-8, ${escapedStringifiedStore}`;


            return downloadUrl;
        }

        this.addLoadSuccessCallback = function(callback) {
            _loadSuccessCallbacks.push(callback);
        }

        this.retrieve = function(label) {
        
            return _store[label];
        }
    }
}
module.exports = FileAPIBasedJsonObjectStore;