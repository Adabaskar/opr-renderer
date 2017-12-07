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

const deepCopyMixin = require('./deep-copy-mixin');

/**
 * See "JavaScript: Novice to Ninja, 2nd Edition Ch. 12".
 * @param {*} cloned object a clone is made from
 */
const clone = function(cloned) {
    const cloneResult = Object.create(Object.getPrototypeOf(cloned));
    deepCopyMixin(cloneResult, cloned);
    return cloneResult;
}
module.exports = clone;

