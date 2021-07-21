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
