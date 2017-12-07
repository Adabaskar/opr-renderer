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
 * Calculates the rectangle size that fits into the rectangle defined by useWidth and useHeight, and which
 * preserves the aspect ratio of the rectangle defined by targetWidth and targetHeight.
 */
function getLargestFittingARPreservingRectangleSize(targetWidth, targetHeight, useableWidth, useableHeight) {

    /*
    Condtions:
      1) width = scaleW * useableWidth
      2) height = scaleH * useableHeight
      3) width / height = targetWidth / targetHeight = targetAspectRatio
      4) scaleW, scaleH from (0, 1]
      5) scaleW * scaleH be max
      
      a) useableAspectRatio = useableWidth / useableHeight
      b) ratioOfAspectRatios = targetAspectRatio / useableAspectRatio

      width this we can write
        width / height = scaleW / scaleH * useableWidth / useableHeight = targetWidth / targetHeight
        scaleW / scaleH * useableAspectRatio = targetAspectRatio

        A) scaleW = ratioOfAspectRatios * scaleH
        B) scaleH = scaleW / ratioOfAspectRatios

        The larger scaleH is, the bigger scaleW will be and vice versa, regardless of the value of ratioOfAspectRatio.
        The max of either value is 1 (Condition 4.)).
        If scaleH is chosen 1 (max) and ratioOfAspectRatio > 1 then scaleW will be larger than 1 and violate condition 4.).
        So scaleW = 1 should be chosen instead.

     */

    let targetAspectRatio = targetWidth / targetHeight;
    let useableAspectRatio = useableWidth / useableHeight;

    let ratioOfAspectRatios = targetAspectRatio / useableAspectRatio;

    let scaleW = 1;
    let scaleH = 1;
    if (ratioOfAspectRatios > 1) {
        scaleH = 1/ratioOfAspectRatios;
    } else {
        scaleW = ratioOfAspectRatios;
    }

    return {
        width : useableWidth * scaleW,
        height : useableHeight * scaleH
    }
};

module.exports = getLargestFittingARPreservingRectangleSize;