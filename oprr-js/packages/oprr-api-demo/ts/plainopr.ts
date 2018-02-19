import { OprHtmlViewLayout, OprHtmlViewSizer } from 'oprr-opr-html-view';
import {OprrCcContextInfoBlockViewHtmlWrapper} from 'oprr-cc-context-info';

(function plainopr() {

    const oprLayout = new OprHtmlViewLayout(document);

    const oprSizer = new OprHtmlViewSizer(document);

    //A4 Paper
    const targetPrintWidth = 29.7;
    const targetPrintHeight = 21;
    oprSizer.setTargetAspectRatio(targetPrintWidth, targetPrintHeight);
    oprSizer.setLayout(oprLayout);

    const oprContainer = document.body.querySelector('#oprcontainer');
    if (oprContainer != null)
        oprContainer.appendChild(oprSizer.getHtmlRootElement());

    

    const contextInfo = new OprrCcContextInfoBlockViewHtmlWrapper(document);

    const mainHeaderId = oprLayout.addCell('mainHeader', 20, 0, 20, 80);
    oprLayout.assignContentViewToCell(contextInfo, mainHeaderId);

    const headElement = document.querySelector('head');
    if(headElement != null)
        headElement.appendChild(contextInfo.getDefaultStyle());

    oprSizer.adjustSizeToParentPreserveTargetAspectRatio();

})();