define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'result/index' + location.search,
                    add_url: 'result/add',
                    edit_url: 'result/edit',
                    del_url: 'result/del',
                    multi_url: 'result/multi',
                    import_url: 'result/import',
                    table: 'result',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'grade', title: __('Grade'), operate: 'LIKE'},
                        {field: 'number', title: __('Number'), operate: 'LIKE'},
                        {field: 'name', title: __('Name'), operate: 'LIKE'},
                        {field: 'chinese', title: __('Chinese'), operate: 'LIKE'},
                        {field: 'math', title: __('Math'), operate: 'LIKE'},
                        {field: 'English', title: __('English'), operate: 'LIKE'},
                        {field: 'physics', title: __('Physics'), operate: 'LIKE'},
                        {field: 'chemistry', title: __('Chemistry'), operate: 'LIKE'},
                        {field: 'biology', title: __('Biology'), operate: 'LIKE'},
                        {field: 'sum', title: __('Sum')},
                        {field: 'classr', title: __('Classr'), operate: 'LIKE'},
                        {field: 'grader', title: __('Grader'), operate: 'LIKE'},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});