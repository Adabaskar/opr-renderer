"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oprr_opr_html_view_1 = require("oprr-opr-html-view");
const oprr_cc_context_info_1 = require("oprr-cc-context-info");
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
    const contextInfo = new oprr_cc_context_info_1.OprrCcContextInfoBlockViewHtmlWrapper(document);
    const mainHeaderId = oprLayout.addCell('mainHeader', 20, 0, 20, 80);
    oprLayout.assignContentViewToCell(contextInfo, mainHeaderId);
    const headElement = document.querySelector('head');
    if (headElement != null)
        headElement.appendChild(contextInfo.getDefaultStyle());
    oprSizer.adjustSizeToParentPreserveTargetAspectRatio();
})();
