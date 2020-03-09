/**
 * injector.js 注入器，用于向页面注入检测器 嗅探器等
 */
(function() {

    var bd = document.getElementsByTagName('body')[0];
    var head = document.getElementsByTagName('head')[0];

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'whatsrun';
    script.src = chrome.extension.getURL('static/js/detector.js');

    if (bd) {
        bd.appendChild(script);
    } else if (head) {
        head.appendChild(script);
    }



})();