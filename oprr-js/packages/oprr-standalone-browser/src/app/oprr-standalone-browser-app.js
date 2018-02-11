const validateRequiredArg = require('oprr-utilities').validateRequiredArg;
const MainMenu = require('./main-menu.js');
const SubviewScaffold = require('../gui/subview-scaffold.js');
const OprProject = require('../opr-project/opr-project.js');

const ContentComponentsRepository = require('../content-components/opr-content-component-repository.js');
const ManageContentComponentSubview = require('../use-cases/manage-content-components/manage-content-components-subview.js');
const ManageContentComponentUcService = require('../use-cases/manage-content-components/manage-content-components-uc-service.js');

const EditCurrentOprViewLayoutUcService = require('../use-cases/edit-current-opr-view-layout/edit-current-opr-view-layout-uc-service.js');
const EditCurrentOprViewLayoutSubview = require('../use-cases/edit-current-opr-view-layout/edit-current-opr-view-layout-subview.js');

const ManageContentViewsOfCurrentOprViewSubview = require('../use-cases/manage-content-views-of-current-opr-view/manage-content-views-of-current-opr-view-subview.js');
const ManageContentViewsOfCurrentOprViewUcService = require('../use-cases/manage-content-views-of-current-opr-view/manage-content-views-of-current-opr-view-uc-service.js');
const OprHtmlViewSizer = require('oprr-opr-html-view').OprHtmlViewSizer;
const OprHtmlViewLayout = require('oprr-opr-html-view').OprHtmlViewLayout;

class OprrStandaloneBrowserApp {
    /**
     * 
     * @param {Window} win 
     */
    constructor(win) {
        validateRequiredArg(win, 'Window Required');
        validateRequiredArg(win.document, 'Dom Document in Window Object Required');
        const _self = this;

        let _domDoc = win.document;
        let _mainMenuContainer = _domDoc.body.querySelector('#mainmenucontainer');
        if (_mainMenuContainer == null || _mainMenuContainer == undefined)
            throw new Error('main menu container ("#mainmenucontainer") not found!');
        let _oprViewContainer = _domDoc.body.querySelector('#oprviewcontainer');
        if (_oprViewContainer == null || _oprViewContainer == undefined)
            throw new Error('opr view container ("#oprviewcontainer") not found!');
        const _oprHtmlViewSizer = new OprHtmlViewSizer(_domDoc);
        const _oprHtmlViewLayout = new OprHtmlViewLayout(_domDoc);
        let _ApplicationSubview = new SubviewScaffold(_domDoc);
        let _currentOprProject = new OprProject();
        const _contentComponentsRepository = new ContentComponentsRepository();
        _contentComponentsRepository.enableDomBasedViewsOnNewContentComponentInstances(_domDoc);

        let _manageContentComponentSubview = undefined;
        let _editCurrentOprViewLayoutSubview = undefined;
        let _manageContentViewsOfCurrentOprViewSubview = undefined;

        let _oprContainer = undefined;

        this.start = function () {
            _initUseCaseComponents();
            _normalizeHtmlDocument();
            _initMainMenu();
            _initFullscreenSubviewFacility();
            _initOprView();
        }

        function _initUseCaseComponents() {
            const manageContentComponentUcService = new ManageContentComponentUcService(_currentOprProject, _contentComponentsRepository);
            _manageContentComponentSubview = new ManageContentComponentSubview(_domDoc, manageContentComponentUcService);

            const editCurrentOprViewLayoutUcService = new EditCurrentOprViewLayoutUcService(_currentOprProject);
            _editCurrentOprViewLayoutSubview = new EditCurrentOprViewLayoutSubview(_domDoc, editCurrentOprViewLayoutUcService);

            const manageContentViewsOfCurrentOprViewUcService = new ManageContentViewsOfCurrentOprViewUcService(_currentOprProject, _contentComponentsRepository);
            _manageContentViewsOfCurrentOprViewSubview = new ManageContentViewsOfCurrentOprViewSubview(_domDoc, manageContentViewsOfCurrentOprViewUcService);
        }

        function _normalizeHtmlDocument() {
            win.document.body.style.position = 'relative';
            win.document.body.style.height = '100%';
            win.document.body.style.width = '100%';
            const htmlNode = win.document.querySelector('html');
            htmlNode.style.width = '100%';
            htmlNode.style.height = '100%';
        };

        function _openContentComponentManagement() {
            _ApplicationSubview.setContent(_manageContentComponentSubview.getDomSubtree());
            _ApplicationSubview.open();
        };

        function _initFullscreenSubviewFacility() {
            win.document.body.appendChild(_ApplicationSubview.getDomSubtree());
        };


        function _initMainMenu() {
            const mainMenu = new MainMenu(_domDoc);
            _mainMenuContainer.appendChild(mainMenu.getDomSubtree());
            mainMenu.setContentComponentMenuItemClickedListener(() => _openContentComponentManagement());
            mainMenu.setEditCurrentOprViewLayoutMenuItemClickedListener(() => { _editCurrentOprViewLayoutSubview.forceRerender(); _ApplicationSubview.setContent(_editCurrentOprViewLayoutSubview.getDomSubtree()); _ApplicationSubview.open(); });
            mainMenu.setManageContentViewsOfCurrentOprViewMenuItemtClickedListener(() => { _manageContentViewsOfCurrentOprViewSubview.forceRerender(); _ApplicationSubview.setContent(_manageContentViewsOfCurrentOprViewSubview.getDomSubtree()); _ApplicationSubview.open(); });
        };

        function _initOprView() {
            _oprViewContainer.appendChild(_oprHtmlViewSizer.getHtmlRootElement());
            _oprHtmlViewSizer.setLayout(_oprHtmlViewLayout);
        }

    }
}
module.exports = OprrStandaloneBrowserApp;