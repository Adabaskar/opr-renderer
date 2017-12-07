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

const ParentRelativePlacement = require('./parent-relative-block-placement');

class Block {
    constructor(id, placement) {
        if (placement != undefined && !(placement instanceof ParentRelativePlacement))
            throw new TypeError();
        let self = this;
        let _id = id;
        this.getId = function () {
            return _id;
        }

        /**
       * Sub-Blocks are held here
       */
        const children = [];
        this.addChild = function (block) {
            children.push(block);
        };

        this.addChildren = function (arrayOfChildBlock) {
            children.push.apply(children, arrayOfChildBlock);
        }

        this.hasChildren = function() {
            return children.length > 0;
        }

        /**
         * returns an array with block references belonging to the children 
         * of this block.
         */
        this.getChildren = function () {
            return children.slice(0);
        }

        let _parentRelativePlacement = placement || new ParentRelativePlacement(0, 0, 0, 0);//fills complete parent
        this.getParentRelativePlacement = function () {
            return _parentRelativePlacement
        }

        this.setParentRelativePlacement = function (placement) {
            if (!(placement instanceof ParentRelativePlacement))
                throw new TypeError();
            _parentRelativePlacement = placement;
        }

    }
}
module.exports = Block;