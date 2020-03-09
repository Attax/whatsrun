(function() {

    var app = new Vue({
        el: "#J-Whatsrun-App",
        data: {
            url: null,
            appList: [],
            languages: [],
            frontEnd: {},
            jsFramework: jsFramework,
            uiLibrary: uiLibrary,
            fontFamily: [],
            serverList: [],
            backendFramework: [],
            serverLang: serverLang,
        },
        computed: {
            domain: function() {
                if (this.url) {
                    return this.url.hostname;
                }
            },
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

            },
            chromei18n: function(message) {
                if (chrome.i18n.getMessage) {
                    return chrome.i18n.getMessage(message)
                }

                return message;
            }
        },
        methods: {
            init: function() {

                this.initi18n();
                this.initScroller();
                this.detect();
                this.getApp();

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
            },

            detect: function() {
                //监听detect事件
                var _that = this;
                chrome.extension.sendMessage({ action: "detect" }, function(response) {
                    console.log('detected:', response);
                    //fuck google chrome developers 
                    //只要有这个，就不会因为错误，中断代码执行
                    chrome.runtime.lastError
                    return true
                });
            },

            getApp: function() {
                var _that = this;
                chrome.extension.sendMessage({ action: "getApp" }, function(response) {
                    var _servers = response;
                    _that.getServer(_servers);
                    //fuck google chrome developers 
                    //只要有这个，就不会因为错误，中断代码执行
                    chrome.runtime.lastError
                    return true
                });
            },

            getAppFromStorage: function() {
                chrome.storage.sync.get('headers', function(result) {
                    console.log('headers存储成功', result);
                });
            },

            getServer: function(servers) {
                var _that = this;
                var _serverList = [];
                if (servers && servers.length) {

                    serverList.forEach(item => {
                        if (servers.includes(item.name)) {
                            _serverList.push(item);
                        }
                    });

                }

                _that.serverList = _serverList;

                console.log(_that.serverList)
            },

            getCDN: function() {},

            getCloudService: function() {

            }

        },
        created: function() {
            this.getDomain();
        },
        mounted() {
            this.init();
            console.log(window.appList)
        },
    });
})();