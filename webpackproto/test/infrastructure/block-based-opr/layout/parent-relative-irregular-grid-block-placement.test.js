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

const test = require('tape');
const ParentRelativeIrregularGridBlockPlacement = require('../../../../src/infrastructure/block-based-opr/layout/parent-relative-irregular-grid-block-placement');
const RelativeIrregularGridLine = require('../../../../src/infrastructure/block-based-opr/layout/relative-irregular-grid-line');

test('offset getters respectively return expected offset or inverse offset of assigned lines', function (t) {

    const leftOffsetStub = 25;
    const topOffsetStub = 15;
    const rightOffsetStub = 90;
    const bottomOffsetStub = 80;
    
    const leftGridLine = new RelativeIrregularGridLine();
    const topGridLine = new RelativeIrregularGridLine();
    const bottomGridLine = new RelativeIrregularGridLine();
    const rightGridLine = new RelativeIrregularGridLine();

    leftGridLine.setOffset(leftOffsetStub);
    rightGridLine.setOffset(rightOffsetStub);
    bottomGridLine.setOffset(bottomOffsetStub);
    topGridLine.setOffset(topOffsetStub);

    const sut = new ParentRelativeIrregularGridBlockPlacement();

    sut.attachLeftBlockSideTo(leftGridLine);    
    sut.attachTopBlockSideTo(topGridLine);
    sut.attachRightBlockSideTo(rightGridLine);
    sut.attachBottomBlockSideTo(bottomGridLine);

    t.equals(sut.getLeft(), 25);
    t.equals(sut.getTop(), 15);
    t.equals(sut.getRight(), 10);    
    t.equals(sut.getBottom(), 20);

    t.end();

});