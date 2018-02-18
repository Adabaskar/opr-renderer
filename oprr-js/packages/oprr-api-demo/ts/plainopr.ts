import { OprHtmlViewLayout, OprHtmlViewSizer } from 'oprr-opr-html-view';

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

    oprSizer.adjustSizeToParentPreserveTargetAspectRatio();
})();