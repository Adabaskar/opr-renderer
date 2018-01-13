const NonUniformGridLayout = require('./non-uniform-grid-layout.js');

/**
 * Models a particual one page report view onto the one page report project.
 * A one page report view  basically states, which view of the 
 * project's content components is shown where on a piece of "paper".
 * 
 */
class OprView {
    constructor() {

        const _layout = new NonUniformGridLayout();

        this.getLayout = function () {
            return _layout;
        }
    }
}
module.exports = OprView;