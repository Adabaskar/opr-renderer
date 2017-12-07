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

const ParentRelativeBlockPlacement = require('./parent-relative-block-placement');
const RelativeIrregularGridLine = require('./relative-irregular-grid-line');

class ParentRelativeIrregularGridBlockPlacement extends ParentRelativeBlockPlacement {
    constructor(leftGridLine, topGridLine, rightGridLine, bottomGridLine) {
        super();
        let _leftGridLine = leftGridLine;
        let _topGridLine = topGridLine;
        let _rightGridLine = rightGridLine;
        let _bottomGridLine = bottomGridLine;

        this.attachLeftBlockSideTo = function(irregularGridLine) {
            _leftGridLine = irregularGridLine;
        }
        this.getLeft = function() {
            return _leftGridLine.getOffset();
        }

        this.attachTopBlockSideTo = function(irregularGridLine) {
            _topGridLine = irregularGridLine;
        }
        this.getTop = function() {
            return _topGridLine.getOffset();
        }

        this.attachRightBlockSideTo = function(irregularGridLine) {
            _rightGridLine = irregularGridLine;
        }
        this.getRight = function() {
            return _rightGridLine.getInverseOffset();
        }

        this.attachBottomBlockSideTo = function(irregularGridLine) {
            _bottomGridLine = irregularGridLine;
        }
        this.getBottom = function() {
            return _bottomGridLine.getInverseOffset();
        }

    }

}

module.exports = ParentRelativeIrregularGridBlockPlacement;