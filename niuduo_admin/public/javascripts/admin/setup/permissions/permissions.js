var popbox;
var grid;
var temp_user_obj ;
//修改
function edit(index)
{
    temp_user_obj = grid.date_list[index];

    popbox.show("/admin/setup/permissions/eidt","500", "500",
        //success
        function () {
            dialog.show(2,"500","500","修改成功","权限组修改成功。","确定","",
                //success
                function(){
                    dataInit();
                }, function(){}, function(){});
        }, function () {}, function () {});

}

//删除
function reset(index)
{
    temp_user_obj = grid.date_list[index];

    popbox.show("/admin/setup/permissions/delete","500", "500",
        //success
        function () {
            dialog.show(2, "500", "500", "删除成功", "权限组删除成功。", "确定", "",
                //success
                function () {
                    dataInit();
                }, function () {}, function () {});
        }, function () {}, function () {});
}

//配置
function configuration(index)
{
    temp_user_obj = grid.date_list[index];

    popbox.show("/admin/setup/permissions/configuration","500", "500",
        //success
        function () {
            dialog.show(2,"500","500","配置成功","权限组配置成功。","确定","",
                //success
                function(){
                    dataInit();
                }, function(){}, function(){});
        }, function () {}, function () {});
}

    var columns = [
        {
            title: '编号', dataIndex: 'toastid', dataSource: function (data, datarow, gridobj, current_column) {

            return (gridobj.current_page - 1) * gridobj.page_rows + datarow + 1;
        }
        },
        {
            title: '权限组名称', dataIndex: 'role_text', dataSource: function (data, datarow, gridobj, current_column) {
            return "<span>" + urldecode(data[datarow].role_name) + "</span>";

        }
        },
        {
            title: '操作', dataIndex: 'createdDate', dataSource: function (data, datarow, gridobj, current_column) {
            return "<input type='button' onclick='configuration("+datarow+")' class='btn_blue' value='配置权限'>" +
                "<input onclick='edit("+datarow+")'  type='button' class='btn_red' value='修改'>";

        }
        }

    ];

function dataInit(){
    grid = new Grid("/showAllRole", $("#table_my_simple"), $("#paging_my_toast"), 1, 8, columns, "", 10);

    //初始化
    grid.Init();
}

$(document).ready(function() {
    //新建弹出框
    popbox = new Popbox();
    popbox.Init();

    dataInit();

    //添加
    $("#addchange").bind("click", function () {

        popbox.show("/admin/setup/permissions/add","500", "500",
            //success
            function () {
                dialog.show(2,"500","500","添加成功","权限组添加成功。","确定","",
                    //success
                    function(){
                        dataInit();
                    }, function(){}, function(){});
            }, function () {}, function () {});
    });


})