var status = 0;
$(document).ready(function() {

    //权限组
    var columns_city ={name_dataIndex :'role_name',value_dataIndex :'role_id'};

    grid_citylist = new Select_Grid("/showAllRole",$("#role"),columns_city,"");
    grid_citylist.default_value=parent.temp_user_obj.role_id;
    grid_citylist.Init("");

    $("#user_id").val(parent.temp_user_obj.user_id);

    //取消
    $(".btn_cancel").bind("click",function(){

        //alert(parent.name);
        parent.popbox.close();
    });

    //成功
    $(".btn_save").bind("click",function(){

        if(status==1)
            return;

        var form_name = get_form_name( $(this));

        //验证
        if(check_form_info_all(form_name) == false)
            return;

        $(this).html("保存中...");

        ajax_request(form_name,"",function process_data(data){

            parent.popbox.success();

        },function process_fail(){

            status = 0;

            $(".btn_save").html("保存");
        });

        /*send_request(form_name, function process_data(data){

            parent.popbox.success();
            //window.location = data.data.redirectUrl;

        });*/
    });

    //取消
    $(".fork").bind("click",function(){

        //alert(parent.name);
        parent.popbox.close();
    });
})