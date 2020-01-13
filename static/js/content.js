(function() {

    //是否注入过
    var _injected = false;


    function parseDom(domString) {
        var boxNode = document.createElement('div');　　
        boxNode.innerHTML = domString;　　
        return boxNode.childNodes;
    };


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
        _frame.style = 'width:470px;height:100%;position:fixed;top:0;right:-470px;z-index:99999;border:1px solid #cc9;background-color:#fff;';


        _doc.appendChild(_frame);





        var _contextFrame = document.createElement('iframe');

        _contextFrame.id = 'context-iframe';
        _contextFrame.width = '100%';
        _contextFrame.style = 'width:100%;height:100%;background-color:#fff;';

        _contextFrame.src = chrome.extension.getURL('iframe.html');

        var _injectFrame = document.getElementById('inject-iframe');

        var _frameDoc = _injectFrame.contentDocument || _injectFrame.contentWindow.document;

        var _frameBody = _frameDoc.getElementsByTagName('body')[0];
        var _frameHead = _frameDoc.getElementsByTagName('head')[0];

        _frameHead.innerHTML = '<style type="text/css">body{margin:0;padding:0;} iframe{width:100%;height:100%;border:none;overflow:hidden;}</style>';
        _frameBody.appendChild(_contextFrame);
        _injected = true;


    }

    //此处使用runtime还是extension 存疑，网上两种都有，runtime居多
    chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {

        if (message.action == 'Inject') {
            injectIframe();

            sendResponse({ result: '注入成功' });
            return false;
        }

        sendResponse({ result: 'pong' });

    });




})();