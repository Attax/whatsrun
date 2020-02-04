/**
 * injector.js 注入器，用于向页面注入检测器 嗅探器等
 */
(function() {


    //通过dom appendChild方式引入js检测器，需要在DOMReady之后才能生效
    document.addEventListener('DOMContentLoaded', function() {
        var head = document.getElementsByTagName('head')[0];

        if (head) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = chrome.extension.getURL('static/js/detector.js');

            var meta = document.createElement('meta');
            meta.name = 'whatsrun';
            meta.id = 'whatsrun';
            head.appendChild(meta);
            head.appendChild(script);

            meta.addEventListener('ready', function() {

            });
        }
    }, false);

})();