/**
 * Created by Administrator on 2015/2/27.
 */

var popbox;
var grid;
var temp_user_obj;

//修改
function editsystem(index){
    temp_user_obj = grid.date_list[index];
    popbox.show("/admin/setup/system/eidt", "500","500",
        //success
        function () {
            dialog.show(2,"500","500","修改成功","修改配置成功。","确定","",
                //success
                function(){
                    dataInit();
                }, function(){}, function(){});
        }, function () {}, function () {});
}

//添加
function addsystem(){
    temp_user_obj = "add";
    popbox.show("/admin/setup/system/eidt", "500","500",
        function () {
            dialog.show(2,"500","500","添加成功","添加配置成功。","确定","",
                function(){
                    dataInit();
                }, function(){}, function(){});
        }, function () {}, function () {});
}

var  columns = [
    {
        title: '配置名称', dataIndex: 'config_key', dataSource: function (data, datarow, gridobj, current_column) {
        return "<span>" + data[datarow].config_key + "</span>";
    }},
    {title : '值',dataIndex :'config_value',dataSource: function(data,datarow,gridobj,current_column) {
        return "<span>"+data[datarow].config_value+"</span>";
    }},
    {title : '说明',dataIndex :'etc',dataSource: function(data,datarow,gridobj,current_column) {
        return "<span>"+data[datarow].etc+"</span>";
    }},
    {title : '修改时间',dataIndex :'updatedDate',dataSource: function(data,datarow,gridobj,current_column) {
        return "<span>"+data[datarow].updatedDate+"</span>";
    }},
    {title : '操作人',dataIndex :'updatedBy',dataSource: function(data,datarow,gridobj,current_column) {
        return "<span>"+data[datarow].updatedBy+"</span>";
    }},

    {title : '操作',dataIndex :'etc',dataSource: function(data,datarow,gridobj,current_column) {
        return "<input  type='button' class='btn_red' onclick='editsystem("+datarow+")'  value='修改'>";
    }}

];

function dataInit(){
    grid = new Grid("/getConfiguration",$("#table_my_simple"),$("#paging_my_toast_to"),1,8,columns,"",10);
    //初始化
    grid.Init();
}

$(document).ready(function()    {
    //新建弹出框
    popbox=new Popbox();
    popbox.Init();
    dataInit();
});

