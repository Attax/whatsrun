(function() {
    //是否注入过
    var _injected = false;

    function injectIframe(config) {
        var _WIN = window.top.document;
        var _injected = _WIN.getElementById('inject-iframe');
        if (_injected) {
            return false;
        }

        config = config || {};

        var _doc = _WIN.getElementsByTagName('body')[0];

        var _frame = document.createElement('iframe');

        _frame.id = 'inject-iframe';
        _frame.width = '100%';
        _frame.src = 'https://dogedoge.com/';

        _doc.appendChild(_frame);
    }


    //执行注入操作
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