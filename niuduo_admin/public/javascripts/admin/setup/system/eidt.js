var status = 0;
$(document).ready(function() {
    if(parent.temp_user_obj != "add"){
        $("#configKey").val(parent.temp_user_obj.config_key);
        $("#configKey").attr("disabled","disabled");
        $("#configValue").val(parent.temp_user_obj.config_value);
        $("#etc").val(parent.temp_user_obj.etc);
    }
    //取消
    $(".btn_cancel").bind("click",function(){
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
    });
    //取消
    $(".fork").bind("click",function(){
        parent.popbox.close();
    });
});