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



    chrome.browserAction.onClicked.addListener(function(tab) {

        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            //发送注入命令
            chrome.tabs.sendMessage(tabs[0].id, { action: "Inject" }, function(response) {
                console.log(response);
                chrome.browserAction.setTitle({
                    title: '注入iframe:' + response.result
                }, function(result) {

                });
            });
        });




    });



})();