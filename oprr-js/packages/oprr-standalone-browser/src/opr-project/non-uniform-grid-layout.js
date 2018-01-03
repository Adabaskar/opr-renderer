const clone = require('oprr-utilities').clone;

/**
 * Class managing set of areas defined by non uniformly distributable horizontal and vertical grid lines.
 * The grid lines are placed using css absolute positioning with relative measures in percent.
 */
class NonUniformGridLayout {
    constructor() {

        const _verticalGridLines = new Map();
        const _horizontalGridLines = new Map();
        const _areas = new Map();

        /**
         * 
         * @param {string} lineName unique name for the line
         * @param {number} leftOffset the relative offset in percent
         */
        this.addVerticalGridLineFromLeft = function (lineName, leftOffset) {
            _verticalGridLines.set(lineName, _makeVerticalGridLineFromLeft(leftOffset));
        };
        function _makeVerticalGridLineFromLeft(leftOffset) {
            return {
                left: leftOffset,
                right: 100 - leftOffset
            }
        }

        this.getVerticalGridLineLeft = function (lineName) {
            return _verticalGridLines.get(lineName).left;
        }

        this.getVerticalGridLineRight = function (lineName) {
            return _verticalGridLines.get(lineName).right;
        }

        /**
         * 
         * @param {string} lineName unique name for the line
         * @param {number} topOffset the relative offset in percent
         */
        this.addHorizontalGridLineFromTop = function (lineName, topOffset) {
            _horizontalGridLines.set(lineName, _makeHorizontalGridLineFromTop(topOffset));
        }
        function _makeHorizontalGridLineFromTop(topOffset) {
            return {
                top: topOffset,
                bottom: 100 - topOffset
            }
        }

        this.getHorizontalGridLineTop = function (lineName) {
            return _horizontalGridLines.get(lineName).top;
        }


        this.getHorizontalGridLineBottom = function (lineName) {
            return _horizontalGridLines.get(lineName).bottom;
        }

        /**
         * @param {string} areaName unquie name of the area
         */
        this.addArea = function (areaName) {
            _areas.set(areaName, _makeUndefinedAreaLinks);
        }
        function _makeUndefinedAreaLinks() {
            return {
                left: undefined,
                top: undefined,
                right: undefined,
                bottom: undefined
            };
        }

        /**
         * 
         * @param {string} areaName unquie name of the area previously added
         */
        this.getArea = function (areaName) {
            return clone(_areas.get(areaName));
        }
    }
}
module.exports = NonUniformGridLayout;