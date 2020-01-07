var app = new Vue({
    el: "#app",
    data: {
        domain: location.hostname,
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
    methods: {
        init: function() {
            this.initi18n();
            //this.getStack();
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
                        domain: '',
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
    },
    created: function() {

        console.log('created')
    },
    mounted: function() {
        console.log('mounted');
        this.init();
    },
});