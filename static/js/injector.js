(function() {

    function injectIframe(config) {
        config = config || {};
        document.addEventListener('DOMContentLoaded', function() {


        });


        var _doc = document.getElementsByTagName('body')[0];

        var _frame = document.createElement('iframe');

        _frame.width = '100%';
        _frame.src = "https://dogedoge.com/";

        _doc.appendChild(_frame);
    }

    var _injected = false;

    injectIframe();

    /*
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

        if (message.action == 'Inject' && !_injected) {
            injectIframe();
            _injected = true;
            sendResponse({ result: '注入成功' });
            return false;
        }

        sendResponse({ result: 'pong' });

    });
    */



})();