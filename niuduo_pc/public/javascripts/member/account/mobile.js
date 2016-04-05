var smstype = 1;

$(document).ready(function(){
    $('#submit_btn').on('click',function(){
        var form_name = get_form_name($(this));
        //验证
        if(check_form_info_all(form_name) == false){
            return;
        }
        $(this).val("绑定中...");
        var param="";
        ajax_request(form_name,param,function process_data(data){
            alert("绑定成功！");
            /*dialog.show(2,"500","500","温馨提醒","手机号绑定成功","确定","",
                //success
                function(){
                    window.location = "/member/account";
                },
                //close
                function(){
                },
                //error
                function(){
                });*/
        },function process_fail(){
            $("#submit_btn").val("确认绑定");
        });
    });
});