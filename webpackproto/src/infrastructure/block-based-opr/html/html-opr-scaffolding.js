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

let getViewportSizeInPx = require('./html-viewport-size.js');
let getLargestFittingARPreservingRectangleSize = require('../math/largest-fitting-ar-preserving-rectangle-size.js');

/**
 * Manipulates the DOM so that it will have the basic 
 * structures to render the opr into it. 
 * It takes care that blocks can use relative sizes.
 * 
 * Only runs when DOM is present!
 */
class HtmlOprScaffolding {
    constructor() {
        const self = this;

        const oprDivId = "opr";
        const ratioEnforcerDivId = "arEnforcer";

        /**
         * After setup this will hold a div, that represensts the 
         * reports sheet (render area).
         */
        this.oprDiv = undefined;

        /**
         * will hold a div that is only placed in the dom, when opr is viewed on screen.
         * It is assumed that a particular print page ist targetd (i.e. A4-Paper), and that 
         * the user will use this sizing for printing. This div will be removed when 
         * the user switches into print view.
         */
        let targetAspectRatioEnforcerDiv = undefined;

        //A4 Paper
        let targetPrintWidth = 29.7;
        let targetPrintHeight = 21;

        let targetedScreenWidthPx = undefined;
        let targetedScreenHeightPx = undefined;

        let getBody = function () {
            return document.querySelector('body');
        }

        /**
         * assumes a very simple html 5 page is present, adds dom elements 
         * and keeps references to them so 
         */
        this.setup = function () {
            setHtmlElementStyleRequiredForSizeCalculation();
            setBodyStyleRequiredForSizeCalculation();
            initEnforcerDiv();
            initOprDiv();

            let currentViewportSizeInPx = getViewportSizeInPx();
            this.setTargetedScreenSize(currentViewportSizeInPx.width, currentViewportSizeInPx.height);

            insertAspectRatioEnforcerToBody();
            activateEnforcerDivRemovalWhenPrintMediaIsActivated();
        };

        let setHtmlElementStyleRequiredForSizeCalculation = function () {
            let htmlElement = document.querySelector('html');
            htmlElement.style.width = '100%';
            htmlElement.style.height = '100%';
        }

        let setBodyStyleRequiredForSizeCalculation = function () {
            let bodyElement = getBody();
            bodyElement.style.width = '100%';
            bodyElement.style.height = '100%';
            bodyElement.style.margin = '0';
        }

        let initEnforcerDiv = function () {
            targetAspectRatioEnforcerDiv = document.createElement('div');
            targetAspectRatioEnforcerDiv.setAttribute('id', ratioEnforcerDivId);

        };

        let initOprDiv = function () {
            self.oprDiv = document.createElement('div');
            self.oprDiv.setAttribute('id', oprDivId);
            self.oprDiv.style.width = '100%';
            self.oprDiv.style.height = '100%';
        };

        let activateEnforcerDivRemovalWhenPrintMediaIsActivated = function () {
            //chrome
            let printHandler = function (mql) {
                if (mql.matches) {
                    removeAspectRatioEnforcerFromBodyKeepOprDiv();
                } else {
                    insertAspectRatioEnforcerToBody();
                }
            }
            window.matchMedia('print').addListener(printHandler);

            //ie, ff, edge
            window.onbeforeprint = removeAspectRatioEnforcerFromBodyKeepOprDiv;
            window.onafterprint = insertAspectRatioEnforcerToBody;

        }

        let enforcerInBody = false;
        let insertAspectRatioEnforcerToBody = function () {
            let bodyElement = getBody();
            bodyElement.appendChild(targetAspectRatioEnforcerDiv);
            enforcerInBody = true;
            targetAspectRatioEnforcerDiv.appendChild(self.oprDiv);

        };


        let removeAspectRatioEnforcerFromBodyKeepOprDiv = function () {
            if (!enforcerInBody)
                return;
            console.log('remove started');
            let bodyElement = getBody();
            bodyElement.removeChild(targetAspectRatioEnforcerDiv);
            enforcerInBody = false;
            bodyElement.appendChild(self.oprDiv);
            console.log('remove finished');
        };

        let initTargetedScreenSizeToCurrentlyAvailableViewport = function () {
            let currentViewport = getViewportSizeInPx();
            targetedScreenWidthPx = currentViewport.width;
            targetedScreenHeightPx = currentViewport.height;
        }

        /**
         * It is assumed that an OPR is always printable. Here the targeted Print Width and Height 
         * can be specified. Currently for HTML rendering the unit of width and height is not 
         * important because only the ratio is used. 
         * Both parameter value however have to be related by the same unit (e.g. name printWidth and printHeight in cm).
         * The Default is set to A4 paper.
         * 
         * Do not call during setup.
         */
        this.setTargetPrintSize = function (printWidth, printHeight) {
            targetPrintWidth = printWidth;
            targetPrintHeight = printHeight;
            updateEnforcerDivSize();
        }

        /**
         * On screen (in the browser window) the OPR shall look like in print.
         * The Scaffolding will take care that aspect ratio of the targeted Print Size are presereved
         * on screen. However here scrolling or minification can be allowed. 
         * With this method the available or to be used screen size can be specified.
         * The Scaffolding will try to exploit as much of this size as possible.
         * The screen size has to be in pixel (css px) units. 
         */
        this.setTargetedScreenSize = function (screenWidthPx, screenHeightPx) {
            targetedScreenWidthPx = screenWidthPx;
            targetedScreenHeightPx = screenHeightPx;
            updateEnforcerDivSize();
        }

        /**
       * Updating the size of the enforcer div using the targetedScreenWidthPx
       * and targetdScreenHeightPx
       */
        let updateEnforcerDivSize = function () {

            let newSize = getLargestFittingARPreservingRectangleSize(
                targetPrintWidth, targetPrintHeight,
                targetedScreenWidthPx, targetedScreenHeightPx);

            targetAspectRatioEnforcerDiv.style.width = newSize.width + 'px';
            targetAspectRatioEnforcerDiv.style.height = newSize.height + 'px';
        };
    }
}

module.exports = HtmlOprScaffolding;