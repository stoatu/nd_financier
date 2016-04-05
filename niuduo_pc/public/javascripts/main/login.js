$(document).ready(function(){
    $('#submit_btn').on('click',function(){
        var form_name = get_form_name($(this));
        $(this).val("登陆中...");
        var param="";
        ajax_request(form_name,param,function process_data(data){
            window.location="/member/account";
        },function process_fail(){
            $("#submit_btn").val("登陆");
        });
    });
});