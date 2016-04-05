


var file_name_not_upload = "file_0";

var  file_name_upload = "file";

var thumbnail = "";

var status = 0;


var sign_upyun1;
var policy_upyun1 ;


var picpath ;


var prefix_upyun = "http://resource-chaogu.b0.upaiyun.com";


var imgid = "positive_file_pic";




function get_sign()
{
    $.ajax({
        url:"/upyun/getkeyresource",
        type:"get",
        data:"" ,
        dataType:'json',
        success: function(data){

            //alert(data.policy);

            sign_upyun1 = data.sign;
            policy_upyun1 = data.policy;

            picpath = data.picpath;

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {


        }
    });
}


$(document).ready(function() {


    get_sign();
    $("#diagram_id").val(parent.temp_user_obj.diagram_id);
    $("#imgwidth").val(parent.temp_user_obj.width);
    $("#imgheight").val(parent.temp_user_obj.height);
    if(parent.temp_user_obj.linkurl!=null  && parent.temp_user_obj.linkurl!=" ")
        $("#linkurl").val(parent.temp_user_obj.linkurl);

    //alert(parent.temp_user_obj.diagram_url);
    $("#positive_file_pic").attr("src",parent.temp_user_obj.diagram_url);
    $("#positive_file_pic1").attr("param_value",parent.temp_user_obj.diagram_url);



    //取消
    $(".btn_cancel").bind("click",function(){

        //alert(parent.name);
        parent.popbox.close();
    });

    //提交
    $(".btn_save").bind("click",function(){

        if(status==1)
            return;

        var width=$("#positive_file_pic").width();
        var height=$("#positive_file_pic").height();

        $("#imgwidth").val(width);
        $("#imgheight").val(height);

        $("#add_form").attr("action","/editAdminDiagram");

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


    $("input[type=file]").change( function () {


        //alert("check");


        if($(this).val() == "")
        {
            //alert("no change");
            return;
        }


        $("#policy").val(policy_upyun1);
        $("#signature").val(sign_upyun1);



        $(this).attr("name",file_name_upload);

        var form_obj = get_form_obj($(this));

        // alert("change1");

        form_obj.attr("action","http://v0.api.upyun.com/resource-chaogu");

        // alert("change2");


        file_object = $(this);

        form_obj.submit();


      //  get_sign();






    });


    $("#pic_iframe").load(function(){

       // alert("load");
        //var data = $(window.frames['pic_iframe'].document.body).find("textarea").html();

       // parent.alert(data);

        //set_url(prefix_upyun+data);

        set_url(prefix_upyun+picpath);
        get_sign();

    });


    function set_url(url)
    {

       // alert(url);
        document.getElementById(imgid).src = url;


        file_object.attr("name",file_name_not_upload);

        file_object.attr("param_value",url);

        check_form_info_all(get_form_name(file_object));


    }


})