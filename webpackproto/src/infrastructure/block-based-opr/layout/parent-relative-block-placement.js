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
 * Represents the position of a block within its parent block as 
 * offsets from the parent block sides in percent.
 */
class ParentRelativeBlockPlacement {
    constructor(left, top, right, bottom) {
        let self = this;
        let _left = left;
        let _top = top;
        let _right = right;
        let _bottom = bottom;

        this.getLeft = function() {
            return _left;
        }
        this.getTop = function () {
            return top;
        }
        this.getRight = function() {
            return _right;
        }
        this.getBottom = function() {
            return _bottom;
        }

    }
}
module.exports = ParentRelativeBlockPlacement;