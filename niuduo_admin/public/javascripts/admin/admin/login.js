/**
 * Created by cxj on 12/16/14.
 */

var status = 0;
$(document).ready(function()    {

    //验证码
   // $.idcode.setCode();

    // logout_sina();
    document.onkeydown = function(e){
        if(!e) e = window.event;//火狐中是 window.event
        if((e.keyCode || e.which) == 13){
            $(".btnlogin").click();
        }
    }


    $(".btnlogin").bind("click",function()
    {
        if(status==1)
            return;

       var form_name = get_form_name( $(this));
        //alert("1");
        //return;
        //验证
        if(check_form_info_all(form_name) == false)
            return;

        $(this).html("登录中...");

        ajax_request(form_name,"",function process_data(data){

            window.location = data.data.redirectUrl;

        },function process_fail(){

            status = 0;

            $(".btnlogin").html("登录");
        });

    });

    function logout_sina()
    {
        //alert("logout");
        $(".WB_loginButton .loginout").click();

        var tags = tags || document.getElementsByTagName("*");
        var list = [];
        for( var k in tags)
        {
            var tag = tags[k];
            if(tag.className == "login_a loginout")
            {
                //alert(tag.className);
                tag.click();
            }
        }
    }


});