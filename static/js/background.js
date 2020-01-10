(function() {
    function getWeather() {
        axios.get('https://free-api.heweather.net/s6/weather/now', {
                params: {
                    key: 'ae7528a2ee9c48b78ba7a3dc366568a1'
                }
            })
            .then(function(response) {
                // handle success
                console.log(response);

            })
            .catch(function(error) {
                // handle error
                console.log(error);
            })
            .then(function() {
                // always executed
            });
    }

    // setInterval(function() {
    //     //getWeather();
    //     // chrome.browserAction.setTitle({
    //     //     title: Math.random().toString()
    //     // }, function(result) {

    //     // });

    // }, 2000);




    const EXTENSION_URL = /chrome:\/\/\w+/;

    var _clicked = false;



    chrome.browserAction.onClicked.addListener(function(tab) {
        if (_clicked) return false;
        if (!tab.url || EXTENSION_URL.test(tab.url)) {
            return false;
        }

        /*
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {

            //标签页没有加载完成，不允许通信
            if (tabs[0].status !== 'complete') return false;

            _clicked = true;
            //发送注入命令
            chrome.tabs.sendMessage(tabs[0].id, { action: "Inject" }, function(response) {
                _clicked = false;
                chrome.browserAction.setTitle({
                    title: '注入iframe:' + response.result
                }, function(result) {

                });
            });

        });

        */

        console.log(chrome.extension.getURL('static/js/injector.js'))

        chrome.tabs.executeScript({
            file: 'static/js/injector.js'
        });







    });



})();