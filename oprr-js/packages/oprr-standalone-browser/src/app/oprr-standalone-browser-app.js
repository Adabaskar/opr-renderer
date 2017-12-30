const validateRequiredArg = require('oprr-utilities').validateRequiredArg;
const MainMenu = require('./main-menu.js');
const SubviewScaffold = require('../gui/subview-scaffold.js');
const OprProject = require('../opr-project/opr-project.js');
const ContentComponentsRepository = require('../content-components/opr-content-component-repository.js');
const ManageContentComponentSubview = require('../use-cases/manage-content-components/manage-content-components-subview.js');
const ManageContentComponentUcService = require('../use-cases/manage-content-components/manage-content-components-uc-service.js');

class OprrStandaloneBrowserApp {
    /**
     * 
     * @param {Window} win 
     */
    constructor(win) {
        validateRequiredArg(win, 'Window Required');
        validateRequiredArg(win.document, 'Dom Document in Window Object Required');

        let _domDoc = win.document;
        let _ApplicationSubview = new SubviewScaffold(_domDoc);
        let _currentOprProject = new OprProject();
        const _contentComponentsRepository = new ContentComponentsRepository();

        let _manageContentComponentSubview = undefined;

        this.start = function () {
            _initUseCaseComponents();
            _normalizeHtmlDocument();
            _initMainMenu();
            _initFullscreenSubviewFacility();
        }

        function _initUseCaseComponents() {
            const manageContentComponentUcService = new ManageContentComponentUcService(_currentOprProject, _contentComponentsRepository);
            _manageContentComponentSubview = new ManageContentComponentSubview(_domDoc, manageContentComponentUcService);
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
            win.document.body.appendChild(mainMenu.getDomSubtree());
            mainMenu.setContentComponentMenuItemClickedListener(() => _openContentComponentManagement());
        };
        
    }
}
module.exports = OprrStandaloneBrowserApp;