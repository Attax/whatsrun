(function() {
    if (chrome.runtime.lastError) return false;
    const EXTENSION_URL = /chrome:\/\/\w+/;

    chrome.browserAction.onClicked.addListener(function(tab) {
        //console.warn('error:', tab)


        if (!tab.url || EXTENSION_URL.test(tab.url)) {
            return false;
        }
        if (tab.status !== 'complete') return false;
        //发送注入命令
        //确保接收方存在（效果存疑）

        chrome.tabs.sendMessage(tab.id, { action: "Inject" }, function(response) {
            if (response) {

            }
            //fuck google chrome developers 
            //只要有这个，就不会因为错误，中断代码执行
            chrome.runtime.lastError

        });




        // chrome.tabs.executeScript({
        //     file: 'static/js/injector.js'
        // });



    });




    //listen content script message.
    chrome.extension.onMessage.addListener(function(message, sender, response) {

    });




})();