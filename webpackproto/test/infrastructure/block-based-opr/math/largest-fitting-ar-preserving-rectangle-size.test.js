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

let test = require('tape');
let sut = require('../../../../src/infrastructure/block-based-opr/math/largest-fitting-ar-preserving-rectangle-size.js');

let testId = __filename;

test(`resulting aspect ratio is equal to target aspect ratio`, function(t) {
    let targetWidthStub = 100;
    let targetHeightStub = 10;
    let useableWidthStub = 20;
    let useableHeightStub = 10;

    let result = sut(targetWidthStub, targetHeightStub, useableWidthStub, useableHeightStub);
    let expectedAR = 10;
    t.equals(result.width / result.height, expectedAR);
    t.end();
} );

test(`result size does not exceed useable size`, function(t) {
    let targetWidthStub = 100;
    let targetHeightStub = 10;
    let useableWidthStub = 20;
    let useableHeightStub = 10;

    let result = sut(targetWidthStub, targetHeightStub, useableWidthStub, useableHeightStub);    
    t.true(result.width<= useableWidthStub);
    t.true(result.height<= useableHeightStub);

    t.end();
} );
