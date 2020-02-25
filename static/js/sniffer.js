/**
 * sniffer.js 网络资源嗅探器，根据网络请求，检测出请求里能获取到的相关资源
 */

(function() {


    var headers = [];
    chrome.webRequest.onHeadersReceived.addListener(function(details) {
        var url = details.url
        var tabId = details.tabId
        headers = details.responseHeaders;
    }, {
        urls: ['<all_urls>'],
        types: ['main_frame']
    }, ['responseHeaders'])




    //监听getApp事件
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action == 'getApp') {
            sendResponse(headers);
            return false;
        }
        sendResponse({});
        return true;
    });

    // chrome.webRequest.onBeforeRequest.addListener(function(details) {
    //     console.log('拦截请求', details);
    // }, { urls: ["<all_urls>"] }, ["responseHeaders"]);


    // chrome.webRequest.onCompleted.addListener(function(details) {
    //     console.log('拦截请求', details);
    // }, { urls: ["<all_urls>"] }, ["responseHeaders"]);









}());