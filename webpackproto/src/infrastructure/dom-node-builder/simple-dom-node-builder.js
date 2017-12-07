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

class SimpleDomNodeBuilder {
    constructor(domDoc) {
        const self = this;
        const _domDoc = domDoc || document;

        let _nodeName = 'span';
        let _id = undefined;
        let _inlineCssStyleAttribs = new Map();
        let _text = undefined;

        this.clear = function () {
            _nodeName = 'span';
            _id = undefined;
            _inlineCssStyleAttribs = new Map();
            _text = undefined;
        }

        this.div = function () {
            _nodeName = 'div';
            return self;
        }

        this.span = function () {
            _nodeName = 'span';
            return self;
        }

        this.id = function (id) {
            _id = id;
            return self;
        }

        this.addStyle = function (cssAttributeName, cssAttributeValue) {
            _inlineCssStyleAttribs.set(cssAttributeName, cssAttributeValue);
            return self;
        }

        this.text = function (text) {
            _text = text;
            return self;
        }

        const isKnownStyleAttribute = function (attributeName) {
            if (attributeName === 'justifyContent')
                return true;
            return false;
        }

        const addStylesTo = function (product) {
            for (let key of _inlineCssStyleAttribs.keys()) {
                if (key in product.style || isKnownStyleAttribute(key))
                    product.style[key] = _inlineCssStyleAttribs.get(key);
                else
                    throw new Error(`${key} does not refer to a valid style attribute`);
            }
        }

        const addTextNodeTo = function (product) {
            const textNode = _domDoc.createTextNode(_text);
            product.appendChild(textNode);
        }

        const addIdTo = function (product) {
            product.id = _id;
        }

        this.build = function () {
            const product = _domDoc.createElement(_nodeName);
            addStylesTo(product);
            if (_text !== undefined)
                addTextNodeTo(product);
            if (_id !== undefined)
                addIdTo(product);

            return product;
        }
    }
}
module.exports = SimpleDomNodeBuilder;