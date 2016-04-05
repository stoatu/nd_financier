
var popbox;
var grid;

var  columns = [
    {
        title: '帐号', dataIndex: 'login_name', dataSource: function (data, datarow, gridobj, current_column) {

        return "<span>" + data[datarow].login_name + "</span>";
    }},
    {title : '姓名',dataIndex :'real_name',dataSource: function(data,datarow,gridobj,current_column) {

        return "<span>"+urldecode(data[datarow].real_name)+"</span>";
    }},
    {title : '权限组',dataIndex :'role_name',dataSource: function(data,datarow,gridobj,current_column) {
        return "<span>"+urldecode(data[datarow].role_name)+"</span>";

    }}


];

function dataInit(){
    grid = new Grid("/getAdminUserRoleAndInfo",$("#table_my_simple"),$("#paging_my_toast"),1,8,columns,"",1);

    //初始化
    grid.Init();
}

$(document).ready(function()    {

    //新建弹出框
    popbox=new Popbox();
    popbox.Init();

    dataInit();


    //修改
    $("#changepwd").bind("click",function(){

        popbox.show("/admin/setup/role/eidt","500","500",
            //success
            function(){
                dialog.show(2,"500","500","修改成功","修改密码成功。","确定","",
                    //success
                    function(){
                        dataInit();
                    }, function(){}, function(){});
            }, function(){}, function(){});
    });


});

