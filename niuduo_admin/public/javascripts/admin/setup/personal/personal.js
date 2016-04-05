

var popbox;
var temp_user_obj ;
var grid;

//配置
function configuration(index)
{
    //alert(index);

    temp_user_obj = grid.date_list[index];

    popbox.show("/admin/setup/personal/configuration","500","500",
        //success
        function(){
            dialog.show(2,"500","500","配置成功","角色配置成功。","确定","",
                //success
                function(){
                    dataInit();
                },
                //close
                function(){

                    //window.location = "/login";
                },
                //error
                function(){

                });
           //alert("配置成功");
            //window.location.reload();
        },
        //close
        function(){

        },
        //error
        function(){

        });

}

//修改
function edituser(index)
{

    temp_user_obj = grid.date_list[index];

    popbox.show("/admin/setup/personal/edituser", "500","500",
        //success
        function () {
            dialog.show(2,"500","500","修改成功","角色修改成功。","确定","",
                //success
                function(){

                    dataInit();
                },
                //close
                function(){

                    //window.location = "/login";
                },
                //error
                function(){

                });
            //alert("修改成功");
            //window.location.reload();
            //alert("sucess");
        },
        //close
        function () {

        },
        //error
        function () {

        });

}

//重置密码
function resetpwd(index)
{
    temp_user_obj = grid.date_list[index];

    popbox.show("/admin/setup/personal/resetpwd","500","500",
        //success
        function(){
            dialog.show(2,"500","500","重置成功","角色密码重置成功。","确定","",
                //success
                function(){
                    dataInit();
                },
                //close
                function(){

                    //window.location = "/login";
                },
                //error
                function(){

                });
            //alert("重置成功");
            //window.location.reload();
        },
        //close
        function(){

        },
        //error
        function(){

        });

}

//改变状态
function changeflag(index)
{
    //console.log(index);
    //alert(index);
    $.ajax({
        url:"/changeAdminState",
        type:"post",
        data: "user_id="+grid.date_list[index].user_id,
        dataType:'json',
        success: function(data){

            //alert(data.code);
            if(data.code == 1)
            {
                export_api_error(form_name,data.msg);
                //alert(data.msg)
            }
            else
            {
                //alert("修改成功");
                //window.location.reload();
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {

            export_api_error(form_name,textStatus);

        }
    });
}

var columns = [
    {title : '编号',dataIndex :'toastid',dataSource:function(data,datarow,gridobj,current_column) {

        return (gridobj.current_page-1)*gridobj.page_rows+datarow+1; }
    },
    {title : '帐号',dataIndex :'login_name',dataSource: function(data,datarow,gridobj,current_column) {

        return "<span>"+urldecode(data[datarow].login_name)+"</span>";
    }},
    /*
     {title : '密码',dataIndex :'password',dataSource: function(data,datarow,gridobj,current_column) {
     return "<span>"+data[datarow].password+"</span>";

     }},*/
    {title : '姓名',dataIndex :'real_name',dataSource: function(data,datarow,gridobj,current_column) {
        return "<span>"+urldecode(data[datarow].real_name)+"</span>";

    }},
    {title : '所属权限组',dataIndex :'role_name',dataSource: function(data,datarow,gridobj,current_column) {
        return "<span>"+urldecode(data[datarow].role_name) +"</span>";

    }},
    {title : '状态',dataIndex :'del_flag',dataSource: function(data,datarow,gridobj,current_column) {
        if(data[datarow].del_flag == 0)
        {
            return "<input type='checkbox' onchange='changeflag("+datarow+")'  name='my-checkbox' checked>";
        }else if(data[datarow].del_flag == 1){
            return "<input type='checkbox' onchange='changeflag("+datarow+")' name='my-checkbox'>";
        }
    }},
    {title : '操作',dataIndex :'createdDate',dataSource: function(data,datarow,gridobj,current_column) {
        return "<input  type='button' class='btn_blue' onclick='configuration("+datarow+")'  value='配置权限组'><input  type='button' class='btn_red' onclick='edituser("+datarow+")'  value='修改'><input onclick='resetpwd("+datarow+")'  type='button' class='btn_yellow' value='密码重置'>";

    }}

];

function dataInit(){
    grid = new Grid("/showAllAdmin",$("#table_my_toast"),$("#paging_my_toast"),1,8,columns,"",20);

    grid.callback_render_ready = function(){
        $("[name='my-checkbox']").bootstrapSwitch();
    }

    //初始化
    grid.Init();
}

$(document).ready(function()
{

    //新建弹出框
     popbox=new Popbox();
     popbox.Init();


    dataInit();



    //添加
    $("#addusers").bind("click",function(){

       // alert("1");
        popbox.show("/admin/setup/personal/adduser","500","500",
            //success
            function(){
                dialog.show(2,"500","500","添加成功","角色添加成功。","确定","",
                    //success
                    function(){
                        dataInit();
                    }, function(){}, function(){});
            }, function(){}, function(){});
    });

    //查询
    $("#query").bind("click",function() {

        var loginname = $("#login_name").val();
        var realname = $("#real_name").val();

        if (loginname == "" && realname == "") {
            dataInit();
        } else {
            var paramstr = "loginname=" + loginname + "&realname=" + realname;
            grid = new Grid("/getAdminByName", $("#table_my_toast"), $("#paging_my_toast"), 1, 8, columns, paramstr, 10);

            grid.callback_render_ready = function () {
                $("[name='my-checkbox']").bootstrapSwitch();
            }
            //初始化
            grid.Init();
        }

    });


})

