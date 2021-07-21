define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form, undefined) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'import/log/index' + location.search,
                    add_url: 'import/log/add',
                    del_url: 'import/log/del',
                    multi_url: 'import/log/multi',
                    table: 'import_log',
                    import_url: 'import/log/import',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                fixedColumns: true,
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'table', title: __('Table')},
                        {field: 'row', title: __('Row')},
                        {
                            field: 'head_type',
                            title: __('head_type'),
                            searchList: {"comment": __('comment'), "name": __('name')},
                            formatter: Table.api.formatter.status
                        },
                        {field: 'path', title: __('Path'), formatter: Table.api.formatter.url},
//                        {field: 'admin_id', title: __('Admin_id')},
                        {
                            field: 'createtime',
                            title: __('Createtime'),
                            operate: 'RANGE',
                            addclass: 'datetimerange',
                            formatter: Table.api.formatter.datetime
                        },
                        {
                            field: 'updatetime',
                            title: __('Updatetime'),
                            operate: 'RANGE',
                            addclass: 'datetimerange',
                            formatter: Table.api.formatter.datetime
                        },
                        {
                            field: 'status',
                            title: __('Status'),
                            searchList: {"normal": __('Normal'), "hidden": __('Hidden')},
                            formatter: Table.api.formatter.status
                        },
                        {
                            field: 'operate',
                            title: __('Operate'),
                            table: table,
                            events: Table.api.events.operate,
                            formatter: Table.api.formatter.operate,
                            buttons: [
                                {
                                    name: 'detail',
                                    text: __('查看'),
                                    title: __('查看'),
                                    classname: 'btn btn-xs btn-primary btn-dialog',
                                    icon: 'fa fa-eye',
                                    extend: 'data-area=\'["1000px","800px"]\'',
                                    url: 'import/log/edit',
                                    callback: function (data) {
                                        Layer.alert("接收到回传数据：" + JSON.stringify(data), {title: "回传数据"});
                                    },
                                    visible: function (row) {
                                        //返回true时按钮显示,返回false隐藏
                                        return true;
                                    }
                                }
                            ]
                        }
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            function reset() {
                $("#step").val(0);
                $("#import").hide();
                $("#createtable").hide();
                $("#updatetable").hide();
                var table = $("#table");
                var tableField = $("#tableField");
                tableField.bootstrapTable('destroy');
                table.bootstrapTable('destroy');

                if ($("#c-row").val() && $("#selecthead_type select").val() && $("#selectable select").val() && $("#c-rowpath").val()) {
                    Toastr.success('开始预览结果');
                    $("#submit").trigger("click");
                }
            }

            $("#selectable select").on("change", function () {
                $("#c-newtable").val('')
                reset()
            })

            $("#import").on("click", function () {
                $("#submit").trigger("click");
            })

            $("#c-newtable").on("change", function () {
                $("#selectable select").val("");
                reset()
            })

            $("#c-row").on("change", function () {
                reset()
            })
            $("#c-rowpath").on("change", function () {
                reset()
            })
            $("#selecthead_type select").on("change", function () {
                reset()
            })
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },

        api: {
            bindevent: function () {
                // Form.api.bindevent($("form[role=form]"));
                Form.api.bindevent($("form[role=form]"), function (data, ret) {
                    console.log(ret)
                    if (ret.data.count) {
                        $("#step").val(1);
                        $("#import").show();
                        Toastr.success(ret.msg);
                    } else {
                        Toastr.error(ret.msg);
                    }
                    if (ret.data.params) {
                        // 初始化表格参数配置
                        var params = ret.data.params
                        Table.api.init({
                            extend: {
                                index_url: 'import/log/preview?' + params,
                                field_url: 'import/log/preview?path=' + ret.data.path,
                            }
                        });

                        var table = $("#table");
                        var tableField = $("#tableField");
                        tableField.bootstrapTable('destroy');
                        table.bootstrapTable('destroy');
                        Fast.api.ajax({
                            url: 'import/log/preview/?columns=1&' + params
                        }, function (data) {
                            console.log(data)
                            var columns = [];
                            $.each(data, function (i, item) {
                                var row;
                                row = {
                                    "field": item.field,
                                    "title": item.title,
                                    "titleTooltip": item.field,
                                    "class": item.class,

                                };
                                if (item.width) row.width = item.width
                                if (item.buttons) row.buttons = eval('(' + item.buttons + ')');
                                if (item.type) row.visible = item.type
                                if (item.visible) row.visible = item.visible
                                if (item.operate) row.operate = item.operate
                                if (item.addclass) row.addclass = item.addclass
                                if (item.table) row.table = eval(item.table)
                                if (item.events) row.events = eval(item.events)
                                if (item.formatter) row.formatter = eval(item.formatter)
                                columns.push(row);
                            });

                            // 初始化表格
                            tableField.bootstrapTable({
                                data: data,
                                fixedColumns: true,
                                pagination: false,//是否分页
                                sidePagination: 'client',//server:服务器端分页|client：前端分页
                                pageSize: 20,//单页记录数
                                search: false, showColumns: false, showToggle: false, showExport: false,
                                columns: [
                                    [
                                        {field: 'field', title: __('匹配值')},
                                        {field: 'fieldName', title: __('字段名')},
                                        {field: 'type', title: __('类型')},
                                        {field: 'title', title: __('注释')},
                                        {field: 'class', title: __('匹配结果')}
                                    ]
                                ]
                            });

                            // 为表格绑定事件
                            Table.api.bindevent(tableField);
                            // 初始化表格
                            table.bootstrapTable({
                                url: $.fn.bootstrapTable.defaults.extend.index_url,
                                fixedColumns: true,
                                pagination: true,//是否分页
                                sidePagination: 'client',//server:服务器端分页|client：前端分页
                                pageSize: 20,//单页记录数
                                dataField: 'rows',
                                columns: columns
                            });

                            // 为表格绑定事件
                            Table.api.bindevent(table);

                        }, function () {
                            return false;
                        });
                        return false;
                    }
                    if (ret.url) {
                        window.location.href = ret.url;
                        return false;
                    }
                });
            }
        }
    };
    return Controller;
});