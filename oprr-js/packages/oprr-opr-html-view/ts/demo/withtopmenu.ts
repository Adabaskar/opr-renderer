import { ContentViewStub } from "./content-view-stub";
import { OprHtmlView } from "../index";

(function main() {

    const oprView = new OprHtmlView(document);

    const blueContentViewStub = new ContentViewStub(document, 'blue');
    blueContentViewStub.getHtmlRootElement().innerHTML = '<div>blah blah</div>';

    const oprViewContainer = document.body.querySelector('#oprviewcontainer');
    if (oprViewContainer != null)
        oprViewContainer.appendChild(oprView.getHtmlRootElement());

    const topCenterCellId = oprView.addCell('topCenterCell', 20, 0, 80, 15);
    oprView.assignContentViewToCell(blueContentViewStub, topCenterCellId);

    console.log('ok running');

})()