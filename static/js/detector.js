/**
 * detector.js js框架检测器
 * 需要在DOMready之后，甚至window.onload之后运行才更准确
 */
(function() {

    //技术栈列表
    var appList = {};

    //待检测项目
    var detectionList = {
        'jQuery': {
            appChecker: function() {
                return window.jQuery;
            },

            versionChecker: function() {

            }
        },
    };


    var detector = function() {
        var _that = this;
        _that.apps = {};
        _that.init();
    }

    detector.prototype = {
        init: function() {
            var _that = this;
            _that.scan();
        },
        parser: function() {

        },


        scan: function() {
            var _that = this;
            //对待检测项进行检测
            for (var appName in detectionList) {
                //如果已经存在该技术方案，跳出当前循环，不再重复检测该项
                //继续下一项方案检测
                if (appList[appName]) continue;
                //当前待检查项
                var _detectItem = detectionList[appName];
                //如果检测到该项技术方案存在
                console.log('result', window.jQuery)
                if (_detectItem.appChecker && _detectItem.appChecker()) {
                    appList[appName] = {
                        //技术栈名称
                        appName: appName,
                        //版本
                        version: _detectItem.versionChecker && _detectItem.versionChecker()
                    }
                    console.log('appchecker', appName)
                }
            }

            console.log('app', appList)

        }
    }

    var scanner = new detector();


    window.appList = appList;




})();