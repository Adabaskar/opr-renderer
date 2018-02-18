"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oprr_opr_html_view_1 = require("oprr-opr-html-view");
(function plainopr() {
    const oprLayout = new oprr_opr_html_view_1.OprHtmlViewLayout(document);
    const oprSizer = new oprr_opr_html_view_1.OprHtmlViewSizer(document);
    //A4 Paper
    const targetPrintWidth = 29.7;
    const targetPrintHeight = 21;
    oprSizer.setTargetAspectRatio(targetPrintWidth, targetPrintHeight);
    oprSizer.setLayout(oprLayout);
    const oprContainer = document.body.querySelector('#oprcontainer');
    if (oprContainer != null)
        oprContainer.appendChild(oprSizer.getHtmlRootElement());
    oprSizer.adjustSizeToParentPreserveTargetAspectRatio();
})();
