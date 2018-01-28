const clone = require('oprr-utilities').clone;

/**
 * Class managing set of areas defined by non uniformly distributable horizontal and vertical grid lines.
 * The grid lines are placed using css absolute positioning with relative measures in percent.
 */
class NonUniformGrid {
    constructor() {

        const _verticalGridLines = new Map();
        const _horizontalGridLines = new Map();      

        /**
         * 
         * @param {string} lineName unique name for the line
         * @param {number} leftOffset the relative offset in percent
         */
        this.setVerticalGridLineFromLeft = function (lineName, leftOffset) {
            _verticalGridLines.set(lineName, _makeVerticalGridLineFromLeft(leftOffset));
        };
        function _makeVerticalGridLineFromLeft(leftOffset) {
            return {
                left: leftOffset,
                right: 100 - leftOffset
            }
        }
        /**
         * 
         * @param {string} lineName the name of the gridline
         * @return {number} the offset from the left side of the parent container in percent
         */
        this.getVerticalGridLineLeftOffset = function (lineName) {
            return _verticalGridLines.get(lineName).left;
        }

        /**
       * 
       * @param {string} lineName the name of the gridline
       * @return {number} the offset from the right side of the parent container in percent
       */
        this.getVerticalGridLineRightOffset = function (lineName) {
            return _verticalGridLines.get(lineName).right;
        }

        /**
         * 
         * @param {string} lineName unique name for the line
         * @param {number} topOffset the relative offset in percent
         */
        this.setHorizontalGridLineFromTop = function (lineName, topOffset) {
            _horizontalGridLines.set(lineName, _makeHorizontalGridLineFromTop(topOffset));
        }
        function _makeHorizontalGridLineFromTop(topOffset) {
            return {
                top: topOffset,
                bottom: 100 - topOffset
            }
        }

        /**
       * 
       * @param {string} lineName the name of the gridline
       * @return {number} the offset from the top side of the parent container in percent
       */
        this.getHorizontalGridLineTopOffset = function (lineName) {
            return _horizontalGridLines.get(lineName).top;
        }


        /**
       * 
       * @param {string} lineName the name of the gridline
       * @return {number} the offset from the bottom side of the parent container in percent
       */
        this.getHorizontalGridLineBottomOffset = function (lineName) {
            return _horizontalGridLines.get(lineName).bottom;
        }
   
        this.getVerticalGridLineList = function() {
            const result = [];
            _verticalGridLines.forEach((value, key) => result.push( _makeVerticalListItem(key, value)) );
            return result;
        }
        function _makeVerticalListItem(verticalMapKey, verticalMapValue) {            
            return {
                name : verticalMapKey,
                left : verticalMapValue.left,
                right : verticalMapValue.right
            }
        }
        
        this.getHorizontalGridLineList = function() {
            const result = [];
            _horizontalGridLines.forEach((value, key) => result.push( _makeHorizontalListItem(key, value)) );
            return result;
        }
        function _makeHorizontalListItem(horizontalMapKey, horizontalMapValue) {            
            return {
                name : horizontalMapKey,
                top : horizontalMapValue.top,
                bottom : horizontalMapValue.bottom
            }
        }

    }
}
module.exports = NonUniformGrid;