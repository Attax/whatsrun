(function() {
    var app = new Vue({
        el: "#J-Whatsrun-App",
        data: {
            url: null,
            languages: [],
            stackList: [{
                name: 'Vue',
                version: '2.6.10',
                summary: 'a js framework',
                id: 1,
            }, {
                name: 'jQuery',
                version: '2.10',
                summary: 'a js library',
                id: 2,
            }]
        },
        computed: {
            domain: function() {
                if (this.url) {
                    return this.url.hostname;
                }
            }
        },
        methods: {
            init: function() {
                this.getDomain();
                this.initi18n();
            },
            initi18n: function() {
                var _that = this;
                chrome.i18n.getAcceptLanguages(function(languageList) {
                    _that.languages = languageList;
                });
            },
            getStack: function() {
                axios.get('https://www.baidu.com/sugrec', {
                        params: {
                            domain: this.domain,
                            wd: new Date().getTime(),
                            t: new Date().getTime()
                        }
                    }).then(function(res) {
                        console.log(res);
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
                    .then(function() {
                        // always executed
                    });
            },

            getDomain: function() {
                var _that = this;
                //当前页面
                chrome.tabs.getSelected(null, function(tab) {
                    _that.url = new URL(tab.url);
                });
            }

        },
        created: function() {

            console.log('created')
        },
        mounted: function() {
            console.log('mounted');
            this.init();
        },
    });
})();