(function() {

    const EXTENSION_URL = /chrome:\/\/\w+/;

    chrome.browserAction.onClicked.addListener(function(tab) {
        if (!tab.url || EXTENSION_URL.test(tab.url)) {
            return false;
        }
        if (tab.status !== 'complete') return false;
        //发送注入命令
        //确保接收方存在（效果存疑）
        chrome.tabs.sendMessage(tab.id, { action: "Inject" }, function(response) {
            chrome.browserAction.setTitle({
                title: '注入iframe:' + response.result
            }, function(result) {

            });
        });



        // chrome.tabs.executeScript({
        //     file: 'static/js/injector.js'
        // });



    });




    //listen content script message.
    chrome.extension.onMessage.addListener(function(message, sender, response) {

    });




})();