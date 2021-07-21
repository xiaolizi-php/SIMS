define([], function () {
    require([], function () {
    //绑定data-toggle=importguide属性点击事件

    $(document).on('click', "[data-toggle='importguide']", function () {
        var that = this;
        var callback = $(that).data('callback');
        var table = $(that).data("table") ? $(that).data("table") : "";
        var update = $(that).data("update") ? $(that).data("update") : 0;
        var to = $(that).data("to") ? $(that).data("to") : 0;
        var url = "import/log/add";
        url += (table) ? '?table=' + table : '';
        url += (update) ? '&update=' + update : '';
        url += (to) ? '&to=' + to : '';
        Fast.api.open(url, $(that).attr('title')?$(that).attr('title'):'导入向导', {
            area:['95%', '90%'],
            callback: function (res) {
                try {
                    //执行回调函数
                    if (typeof callback === 'function') {
                        callback.call(that, res);
                    }
                } catch (e) {

                }
            }
        });
    });
});

if (Config.modulename === 'index' && Config.controllername === 'user' && ['login', 'register'].indexOf(Config.actionname) > -1 && $("#register-form,#login-form").size() > 0) {
    $('<style>.social-login{display:flex}.social-login a{flex:1;margin:0 2px;}.social-login a:first-child{margin-left:0;}.social-login a:last-child{margin-right:0;}</style>').appendTo("head");
    $("#register-form,#login-form").append('<div class="form-group social-login"></div>');
    if (Config.third.status.indexOf("wechat") > -1) {
        $('<a class="btn btn-success" href="' + Fast.api.fixurl('/third/connect/wechat') + '"><i class="fa fa-wechat"></i> 微信登录</a>').appendTo(".social-login");
    }
    if (Config.third.status.indexOf("qq") > -1) {
        $('<a class="btn btn-info" href="' + Fast.api.fixurl('/third/connect/qq') + '"><i class="fa fa-qq"></i> QQ登录</a>').appendTo(".social-login");
    }
    if (Config.third.status.indexOf("weibo") > -1) {
        $('<a class="btn btn-danger" href="' + Fast.api.fixurl('/third/connect/weibo') + '"><i class="fa fa-weibo"></i> 微博登录</a>').appendTo(".social-login");
    }
}

});