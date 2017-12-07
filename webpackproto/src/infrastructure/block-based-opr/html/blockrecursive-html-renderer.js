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

const Block = require('../layout/block');
const BlockHtmlElementFactory = require('./block-html-element-factory');
const ContentComponentSubDOM = require('./content-component-subdom');

/**
 * 
 */
class BlockrecursiveHtmlRenderer {
    constructor(domDoc) {
        const self = this;
        const _domDoc = domDoc || document;

        let defaultBlockHtmlElementFactor = new BlockHtmlElementFactory(_domDoc);

        const _contentComponentMap = new Map();

        this.setContentComponentForBlock = function (block, contentComponent) {
            if (!(contentComponent instanceof ContentComponentSubDOM))
                throw new TypeError("ContentComponentSubDOM expected");
            _contentComponentMap.set(block, contentComponent);
        }

        let makeBlockHtmlElement = function (block) {
            const blockDiv = defaultBlockHtmlElementFactor.makeFromBlock(block);
            return blockDiv;
        }

        this.appendChildBlocksToHtml = function (notRenderedRootBlock, parentHtmlElement) {
            if (!(notRenderedRootBlock instanceof Block))
                throw new TypeError('block is not of type Block');

            let childBlocks = notRenderedRootBlock.getChildren();
            for (let i = 0; i < childBlocks.length; i++) {
                const childBlock = childBlocks[i];

                const childsHtmlElement = makeBlockHtmlElement(childBlock);
                parentHtmlElement.appendChild(childsHtmlElement);
             
                if (_contentComponentMap.has(childBlock)) {
                    let contentComponent = _contentComponentMap.get(childBlock);

                    childsHtmlElement.appendChild(contentComponent.getRootNode());
                    
                } else {
                    self.appendChildBlocksToHtml(childBlock, childsHtmlElement);
                }
            }

        }

    }
}

module.exports = BlockrecursiveHtmlRenderer;