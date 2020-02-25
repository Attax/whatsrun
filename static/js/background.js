(function() {
    if (chrome.runtime.lastError) return false;
    const EXTENSION_URL = /chrome:\/\/\w+/;



    chrome.browserAction.onClicked.addListener(function(tab) {

        if (!tab.url || EXTENSION_URL.test(tab.url)) {
            return false;
        }
        if (tab.status !== 'complete') return false;
        //发送注入命令
        //确保接收方存在（效果存疑）



        chrome.tabs.sendMessage(tab.id, { 'action': "Inject" }, function(response) {
            if (response.result == 'injected') {
                return false;
            }
            //fuck google chrome developers 
            //只要有这个，就不会因为错误，中断代码执行
            chrome.runtime.lastError
        });



    });

})();