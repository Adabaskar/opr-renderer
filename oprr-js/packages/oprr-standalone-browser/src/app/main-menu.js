const purecss = require('../../node_modules/purecss/build/pure-min.css');

/**
 * Menu for starting all primary use cases. It is placed here rather than gui, since the implementation is 
 * about plugging together the application rather than describing the gui model.
 */
class MainMenu {
    /**
     * 
     * @param {Document} domDoc 
     */
    constructor(domDoc) {

        const _MANAGE_CONTENT_COMPONENTS_MENU_ITEM_ID = 'ManageContentComponentsMenuItem';

        let _menuDiv = domDoc.createElement('div');
        function _renderMenuInnerHtml() {
            const innerHtml =
                `  <ul class="pure-menu-list">                     
                        <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                            <a href="#" id="menuLink1" class="pure-menu-link">Menu</a>
                            <ul class="pure-menu-children">                                
                                <li class="pure-menu-item"><a href="#" class="pure-menu-link pure-menu-disabled">Load</a></li>
                                <li class="pure-menu-item"><a href="#" class="pure-menu-link pure-menu-disabled">Save</a></li>
                                <hr/>
                                <li class="pure-menu-item" id='${_MANAGE_CONTENT_COMPONENTS_MENU_ITEM_ID}'><a href="#" class="pure-menu-link">Content Components</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>`;
            return innerHtml;
        };
        (function _init() {
            _menuDiv.classList.add('pure-menu');
            _menuDiv.classList.add('pure-menu-horizontal');
            _menuDiv.innerHTML = _renderMenuInnerHtml();
        })();

        this.getDomSubtree = function() {
            return _menuDiv;
        }

        let _manageContentComponentsListener = undefined;

        this.setContentComponentMenuItemClickedListener = function(callback) {
            _menuDiv.querySelector(`#${_MANAGE_CONTENT_COMPONENTS_MENU_ITEM_ID}`).addEventListener('click', callback);
        }
    }
}
module.exports = MainMenu;