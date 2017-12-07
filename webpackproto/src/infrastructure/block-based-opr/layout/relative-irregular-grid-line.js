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

class RelativeIrregularGridLine {
    constructor() {

        let _offset = 0;
        let _inverseOffset = 100;

        this.setOffset = function (offset) {
            _offset = offset;
            _inverseOffset = 100 - offset;
        }
        this.getOffset = function () {
            return _offset;
        }
        this.setInverseOffset = function(inverseOffset) {
            _inverseOffset = inverseOffset;
            _offset = 100 - inverseOffset;
        }
        this.getInverseOffset = function () {
            return _inverseOffset;
        }

    }

}
module.exports = RelativeIrregularGridLine;
