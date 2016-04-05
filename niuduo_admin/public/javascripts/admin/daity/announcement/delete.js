
var status = 0;
$(document).ready(function() {


   // $("#announcement_id").val(parent.temp_user_obj.announcement_id);
    $("#infoAnnouncementId").val(parent.temp_user_obj.infoAnnouncementId);
    //取消
    $(".btn_cancel").bind("click",function(){

        //alert(parent.name);
        parent.popbox.close();
    });

    //成功
    $(".btn_submits").bind("click",function(){

        if(status==1)
            return;

        var form_name = get_form_name( $(this));

        //验证
        if(check_form_info_all(form_name) == false)
            return;

        $(this).html("提交中...");

        ajax_request(form_name,"",function process_data(data){

            parent.popbox.success();

        },function process_fail(){

            status = 0;

            $(".btn_submits").html("提交");
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