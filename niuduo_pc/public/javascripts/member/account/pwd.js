$(document).ready(function(){
    $("#submit_btn").on("click",function(){
        var form_name = get_form_name($(this));

        //验证
        if(check_form_info_all(form_name) == false){
            return;
        }

        var param="";
        ajax_request(form_name,param,function process_data(data){
            alert("密码修改成功！");
            parent.location="/member/account";
        },function process_fail(){
            $("#submit_btn").val("确认保存");
        });
    })
});