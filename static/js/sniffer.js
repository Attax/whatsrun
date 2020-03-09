/**
 * sniffer.js 网络资源嗅探器，根据网络请求，检测出请求里能获取到的相关资源
 */

(function() {

    /**
     * http response header
     * @ content example:
     *  [{name: "Server", value: "openresty"},
        {name: "Date", value: "Thu, 27 Feb 2020 17:31:46 GMT"},
        {name: "Content-Type", value: "text/html; charset=UTF-8"},
        {name: "Transfer-Encoding", value: "chunked"},
        {name: "Connection", value: "keep-alive"},
        {name: "Vary", value: "Accept-Encoding"},
        {name: "Content-Encoding", value: "gzip"}]
     */


    //待检测项列表
    const snifferList = {
        'server': {
            /**
             * Apache
             * Apache/2.4.18 (Ubuntu)
             * Apache/2.4.41 (Win64) OpenSSL/1.1.1c PHP/7.4.2
             */
            'Apache': /Apache\/?(.*)/,
            /**
             * nginx
             * nginx/1.17.
             */
            'Nginx': /nginx\/?(.*)/,
            //openresty/1.15.8.
            'OpenResty': /openresty/i,
            //Microsoft-IIS/8.5
            'IIS': /Microsoft-IIS\/\d+\.\d+/,
            'Tengine': /Tengine/,
            //lighttpd/2.0.0
            'Lighttpd': /lighttpd\/\d+(\.\d{1,2}){1,2}/,
            //meinheld/1.0.1
            'Meinheld': /meinheld\/\d+(.\d{1,2}){1,2}/,
            'Caddy': /Caddy/
        },
        'x-powered-by': {
            'PHP': /PHP\/?(.*)/,
            'ASP.NET': /ASP\.NET/,
            'Next.js': /Next\.js/i,
            'ThinkPHP': /ThinkPHP?(.*)/i
        }
    };

    //从response header里嗅探相关服务
    var sniffer = function(headers) {
        var appInfo = [];
        //对response header循环 匹配每一个待检测项
        for (var i = 0; i < headers.length; i++) {
            //因为存在Server server 类似的情况，所以将当前项的名称统一为小写
            var _itemName = headers[i].name.toLowerCase();
            //header 当前项的value
            var _itemVal = headers[i].value;
            //待检测项
            var snifferItem = snifferList[_itemName];
            //如果header中的字段属于待检测字段
            if (snifferItem) {
                for (var key in snifferItem) {
                    var result = snifferItem[key].test(_itemVal);
                    if (result) {
                        appInfo.push(key);
                    }
                }
            }
        }

        return appInfo;
    }




    var headers = [];
    var appInfo = [];
    //当接收到response header
    chrome.webRequest.onHeadersReceived.addListener(function(details) {
        var url = details.url
        var tabId = details.tabId
        headers = details.responseHeaders;
        appInfo = sniffer(headers);
    }, {
        urls: ['<all_urls>'],
        types: ['main_frame']
    }, ['responseHeaders'])





    //监听getApp事件
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action == 'getApp') {
            sendResponse(appInfo);
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