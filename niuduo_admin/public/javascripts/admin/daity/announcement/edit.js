
var status = 0;
$(document).ready(function() {


    $("#infoAnnouncementId").val(parent.temp_user_obj.infoAnnouncementId);
    $("#title").val( line2brde(urldecode( parent.temp_user_obj.title)));
    //alert(parent.temp_user_obj.content);
    $("#content").val(line2brde(urldecode(parent.temp_user_obj.content)));
    $("#top_flag").val(line2brde(urldecode(parent.temp_user_obj.top_flag)));
    $("#thumbnail").val(line2brde(urldecode(parent.temp_user_obj.thumbnail)));


    //取消
    $(".btn_cancel").bind("click",function(){

        //alert(parent.name);
        parent.popbox.close();
    });

    //成功
    $(".btn_submits").bind("click",function(){

        if(status==1)
            return;

        //$("#top_flag").val('0');

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

       /* send_request(form_name, function process_data(data){

            parent.popbox.success();
            //window.location = data.data.redirectUrl;

        });*/


    });

    //提交并置顶
    $(".btn_save").bind("click",function(){

        if(status==1)
            return;

        $("#top_flag").val('1');


        var form_name = get_form_name( $(this));

        //验证
        if(check_form_info_all(form_name) == false)
            return;

        $(this).html("提交中...");

        ajax_request(form_name,"",function process_data(data){

            parent.popbox.success();

        },function process_fail(){

            status = 0;

            $(".btn_save").html("提交并置顶");
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