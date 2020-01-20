(function() {

    // chrome.webRequest.onCompleted.addListener(function(details) {
    //     //console.log('拦截请求', details);
    // }, { urls: ["<all_urls>"] }, ["responseHeaders"]);



    var app = new Vue({
        el: "#J-Whatsrun-App",
        data: {
            url: null,
            languages: [],
            frontEnd: {},
            jsFramework: [{
                name: 'React',
                version: '16.10.1',
                source: 'https://github.com/facebook/react',
                icon: '',
                homepage: 'https://react.org',
            }, {
                name: 'Vue',
                version: '2.6.9',
                source: 'https://gitee.com/vue/vue',
                icon: '',
                homepage: 'https://vue.org/'
            }, {
                name: 'Angular',
                version: '16.10.1',
                source: 'https://bitbucket.com/google/angular',
                icon: '',
                homepage: 'https://angular.org',
            }, {
                name: 'AngularJS',
                version: '2.6.9',
                source: 'https://github.com/google/angularjs',
                icon: '',
                homepage: 'https://angularjs.org'
            }, {
                name: 'jQuery',
                version: '16.10.1',
                github: '',
                icon: '',
                homepage: '',
            }, {
                name: 'Backbone',
                version: '2.6.9',
                github: '',
                icon: '',
                homepage: ''
            }, {
                name: 'Ember',
                version: '16.10.1',
                github: '',
                icon: '',
                homepage: '',
            }, ],
            uiLibrary: [{
                name: 'Bootstrap',
                version: '4.10.1',
                github: '',
                icon: '',
                homepage: '',
            }, {
                name: 'ElementUI',
                version: '2.6.9',
                github: '',
                icon: '',
                homepage: ''
            }, {
                name: 'Materialize',
                version: '16.10.1',
                github: '',
                icon: '',
                homepage: '',
            }, {
                name: 'Foundation',
                version: '2.6.9',
                github: '',
                icon: '',
                homepage: ''
            }],
            fontFamily: [],
            background: [{
                name: 'PHP',
                version: '16.10.1',
                github: '',
                icon: '',
                homepage: '',
            }, {
                name: 'Java',
                version: '2.6.9',
                github: '',
                icon: '',
                homepage: ''
            }, {
                name: 'Python',
                version: '3.3.1',
                github: '',
                icon: '',
                homepage: '',
            }, {
                name: 'Lua',
                version: '2.6.9',
                github: '',
                icon: '',
                homepage: ''
            }, {
                name: 'Node.js',
                version: '2.6.9',
                github: '',
                icon: '',
                homepage: ''
            }, ],
            serverEnd: [{
                name: 'Apache',
                version: '2.4.7',
                github: '',
                icon: '',
                homepage: '',
            }, {
                name: 'Nginx',
                version: '1.18.1',
                github: '',
                icon: '',
                homepage: ''
            }, {
                name: 'OpenResty',
                version: '1.18.1',
                github: '',
                icon: '',
                homepage: ''
            }, {
                name: 'Tengine',
                version: '1.18.1',
                github: '',
                icon: '',
                homepage: ''
            }, {
                name: 'LightHttped',
                version: '16.10.1',
                github: '',
                icon: '',
                homepage: '',
            }],
            backendFramework: [],
            backgroundLanguage: [],
        },
        computed: {
            domain: function() {
                if (this.url) {
                    return this.url.hostname;
                }
            }
        },
        filters: {
            lowercase: function(value) {
                return !value ? '' : value.toString().toLowerCase();
            },
            nameLink: function(item) {
                return !item ? 'javascript:;' : `https://whatsrun.com/stackinfo/${item.name.toLowerCase()}`;
            },
            versionLink: function(item) {
                if (!item) {
                    return 'javascript:;';
                }

                return !item.version ? `https://whatsrun.com/stackinfo/${item.name.toLowerCase()}` : `https://whatsrun.com/stackinfo/${item.name.toLowerCase()}?ver=${item.version.toLowerCase()}`;
            },
            openSourceType: function(source) {
                if (!source) return '';

                var openSourceList = {
                    'icon-github': /^https:\/\/github.com/,
                    'icon-bitbucket': /^https:\/\/bitbucket.com/,
                    'icon-gitee': /^https:\/\/gitee.com/,
                    'icon-gitlab': /^https:\/\/gitlab.com/,
                    'icon-coding': /^https:\/\/coding.net/,
                };

                for (key in openSourceList) {
                    if (openSourceList[key].test(source)) {
                        return key;
                    }
                }

                return '';

            }
        },
        methods: {
            init: function() {

                this.initi18n();
                this.initScroller();

            },
            initi18n: function() {
                var _that = this;
                chrome.i18n.getAcceptLanguages(function(languageList) {
                    _that.languages = languageList;
                });
            },
            initScroller() {
                this.$nextTick(() => {
                    this.scroll = new BScroll('.layout-scroller', {
                        scrollbar: {
                            fade: false,
                            interactive: false // 1.8.0 新增
                        },
                        bounce: false,
                        preventDefault: true,
                        tap: true,
                        mouseWheel: true
                    })
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
            this.getDomain();
            console.log('created')
        },
        mounted() {
            console.log('mounted');
            this.init();

        },
    });
})();