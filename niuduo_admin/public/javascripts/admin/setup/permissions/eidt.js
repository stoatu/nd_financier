
var status = 0;
$(document).ready(function() {


    $("#role_name").val(urldecode(parent.temp_user_obj.role_name));
    $("#role_id").val(urldecode(parent.temp_user_obj.role_id));

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

       /* send_request(form_name, function process_data(data){
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