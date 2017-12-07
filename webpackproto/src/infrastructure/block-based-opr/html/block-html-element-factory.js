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

const ParentRleativeBlockPlacement = require('./../layout/parent-relative-block-placement');
const Block = require('../layout/block');
/**
 * generates an html element representing the block, that is able to contain 
 * the opr content.
 */
class BlockHtmlElementFactory {
    constructor(htmlDoc) {

        const _htmlDoc = htmlDoc || document;// if no document is passed in use buildin document object

        this.makeFromBlock = function (block) {
            if (!(block instanceof Block))
                throw new TypeError('Block required');

            const placement = block.getParentRelativePlacement();

            const product = _htmlDoc.createElement('div');
            product.setAttribute('id', block.getId());
            product.style.position = 'absolute';
            product.style.left = placement.getLeft() + '%';
            product.style.top = placement.getTop() + '%';
            product.style.right = placement.getRight() + '%';
            product.style.bottom = placement.getBottom() + '%';
            return product;

        }
    }

}
module.exports = BlockHtmlElementFactory;