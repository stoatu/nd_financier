$(document).ready(function(){
    $('#submit_btn').on('click',function(){
        var form_name = get_form_name($(this));
        $(this).val("绑定中...");
        var param="";
        ajax_request(form_name,param,function process_data(data){
            alert("确认绑定邮箱邮件已经发送，请登录自己的邮箱，查看邮件激活一下");
        },function process_fail(){
            $("#submit_btn").val("确认绑定");
        });
    });
});