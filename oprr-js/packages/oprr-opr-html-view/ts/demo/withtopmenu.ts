import { ContentViewStub } from "./content-view-stub";
import { OprHtmlViewLayout, OprHtmlViewSizer } from "../index";


(function main() {


    const oprViewLayout = new OprHtmlViewLayout(document);
    const oprViewSizer = new OprHtmlViewSizer(document);
    oprViewSizer.setLayout(oprViewLayout);

    //A4 Paper
    const targetPrintWidth = 29.7;
    const targetPrintHeight = 21;
    oprViewSizer.setTargetAspectRatio(targetPrintWidth, targetPrintHeight);

    const blueContentViewStub = new ContentViewStub(document, 'blue');
    blueContentViewStub.getHtmlRootElement().innerHTML = '<div>blah blah</div>';

    const oprViewContainer = document.body.querySelector('#oprviewcontainer');
    if (oprViewContainer != null)
        oprViewContainer.appendChild(oprViewSizer.getHtmlRootElement());

    const topCenterCellId = oprViewLayout.addCell('topCenterCell', 20, 50, 20, 10);
    oprViewLayout.assignContentViewToCell(blueContentViewStub, topCenterCellId);

    oprViewSizer.adjustSizeToParentPreserveTargetAspectRatio();

})()