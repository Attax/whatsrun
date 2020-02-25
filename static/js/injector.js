/**
 * injector.js 注入器，用于向页面注入检测器 嗅探器等
 */
(function() {

    var head = document.getElementsByTagName('head')[0];

    if (head) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = chrome.extension.getURL('static/js/detector.js');
    }


})();