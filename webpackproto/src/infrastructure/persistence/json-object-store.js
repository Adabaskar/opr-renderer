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

/**
 * Interface defining the common functions of a Json object store.
 * A Json Object store converts passed in objects to json and stores them.
 * This has to be considered by usersa, since it might be necessary to 
 * cast retrieved objects back from string to a particular type.
 */
class JsonObjectStore {
    constructor() {
        this.store = function(label, object) {}
        this.retrieve = function(label) {return undefined;}
        this.has = function(label) {return false;}
    }
}
module.exports = JsonObjectStore;