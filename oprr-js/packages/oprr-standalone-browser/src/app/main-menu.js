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
        const _MANAGE_OPR_VIEWS_MENU_ITEM_ID = 'ManageOprViewsMenuItem';
        const _EDIT_CURRENT_OPR_VIEW_LAYOUT_MENU_ITEM_ID = 'EditCurrentOprViewLayout';

        let _menuDiv = domDoc.createElement('div');
        function _renderMenuInnerHtml() {
            const innerHtml =
                `  <ul class="pure-menu-list">                     
                        <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                            <a href="" id="menuLink1" class="pure-menu-link">Project</a>
                            <ul class="pure-menu-children">                                
                                <li class="pure-menu-item"><a href="#" class="pure-menu-link pure-menu-disabled">Load</a></li>
                                <li class="pure-menu-item"><a href="#" class="pure-menu-link pure-menu-disabled">Save</a></li>
                                <hr/>
                                <li class="pure-menu-item" id='${_MANAGE_CONTENT_COMPONENTS_MENU_ITEM_ID}'><a class="pure-menu-link">Content Components</a></li>
                                <li class="pure-menu-item" id='${_MANAGE_OPR_VIEWS_MENU_ITEM_ID}'><a class="pure-menu-link">OPR Views</a></li>
                            </ul>
                        </li>
                        <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                            <a href="" id="menuLink1" class="pure-menu-link">Current OPR View</a>
                            <ul class="pure-menu-children">                                
                            <li class="pure-menu-item" id='${_EDIT_CURRENT_OPR_VIEW_LAYOUT_MENU_ITEM_ID}'><a class="pure-menu-link">Edit Layout</a></li>
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

        this.setEditCurrentOprViewLayoutMenuItemClickedListener = function(callback) {
            _menuDiv.querySelector(`#${_EDIT_CURRENT_OPR_VIEW_LAYOUT_MENU_ITEM_ID}`).addEventListener('click', callback);
        }

    }
}
module.exports = MainMenu;