


var time_left = 120;
var _interval_time;

//smstype 0 注册 1 重置
function check_time()
{
    time_left--;
    $("#btn_recom_code").html("等待"+time_left+"s...");

    if(time_left==0)
    {
        clearInterval(_interval_time);

        $("#btn_recom_code").removeClass("btn-resendCaptcha_disable");
        $("#btn_recom_code").html("发送验证码");
    }

}

$(document).ready(function(){
    function enable_btn()
    {
        $("#btn_recom_code").removeClass("btn-resendCaptcha_disable");
        $("#btn_recom_code").html("发送验证码");
    }

    function disable_btn()
    {
        $("#btn_recom_code").addClass("btn-resendCaptcha_disable");
    }


    function end_time()
    {
        time_left = 119;
        $("#btn_recom_code").html("等待"+time_left+"s...");
        _interval_time = setInterval ("check_time()", 1000);
    }

    $("#btn_recom_code").bind("click",function()
    {
        var form_name = get_form_name( $(this));
        if( check_form_info(form_name,"mobile") == true)
        {
            /*
            if( check_form_info(form_name,"ehong") == false)
            {
                return;
            }
            */
            if($("#btn_recom_code").hasClass("btn-resendCaptcha_disable"))
            {
                return;
            }

            /*
            end_time();
            */

           // return;
            disable_btn();
            var mobile = $("#mobile").val();
            //alert(mobile);
            var param_str = "mobile="+mobile+"&type="+smstype;
            $("#btn_recom_code").html("发送中...");

            $.ajax({
                url:"/sendCaptchaNew",
                type:"post",
                data: param_str,
                dataType:'json',
                success: function(data){
                    if(data.code == 1)
                    {
                        //alert(data.msg);
                        export_api_error(form_name,data.msg);
                        enable_btn();
                    }
                    else
                    {
                        //alert("发送成功");
                        disable_btn();
                        end_time();
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {

                }
            });

        }

    });
});