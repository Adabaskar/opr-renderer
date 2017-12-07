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
const RelativeIrregularGridLine = require('../../../../src/infrastructure/block-based-opr/layout/relative-irregular-grid-line');

test('setting offset also sets inverse offset', function (t) {

  
    const offsetStub = 25.0;
    const expectedInverseOffset = 75.0;
    const sut = new RelativeIrregularGridLine();
    sut.setOffset(offsetStub);
    let obserevedInverseOffset = sut.getInverseOffset();

    t.equal(obserevedInverseOffset, expectedInverseOffset);

    t.end();

});

test('setting offset return  offset', function (t) {
    
      
        const offsetStub = 25.0;        
        const sut = new RelativeIrregularGridLine();
        sut.setOffset(offsetStub);
        let obserevedOffset = sut.getOffset();
    
        t.equal(obserevedOffset, offsetStub);
    
        t.end();
    
    });