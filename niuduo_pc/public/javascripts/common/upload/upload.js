

var file_name_not_upload = "file_0";

var  file_name_upload = "file";

var thumbnail = "!show";

var imgid = "";

var postive_flag = 1;

var upload_status_positive = 0; //正面上传  0-未 1-正在  2-成功  3-失败
var upload_status_negative = 0; //反面上传

var form_obj;

var action;

$(document).ready(function()    {



    $("input[type=file]").change( function () {

        var timestamp = Date.parse(new Date());

        $("#timept").val(timestamp);
        if($(this).val() == "")
        {
            return;
        }

      /* if($(this).attr("id")=="portrait"){

           $("#portrait").val($(this).val());
       }*/

        if(typeof($(this).attr("target_id")) != "undefined")
        {
            imgid = $(this).attr("target_id");
        }
        else
        {
            return;
        }

        $("#policy").val(policy_upyun1);
        $("#signature").val(sign_upyun1);
        $(this).attr("name",file_name_upload);
        form_obj = get_form_obj($(this));
        action= form_obj.attr("action");
        form_obj.attr("action","http://v0.api.upyun.com/avatar-chaogu");
        file_object = $(this);

        form_obj.submit();
    });

    $("#pic_iframe").load(function(){
       var    url = prefix_upyun + picpath1;
        form_obj.attr("action",action);
        set_url(url);

        get_sign();

    });

    function set_url(url)
    {

        document.getElementById(imgid).src = url;

        file_object.attr("name",file_name_not_upload);

        file_object.attr("param_value",url);
        check_form_info_all(get_form_name(file_object));
        $("#thumbnail").val(url);
    }



});

function get_sign()
{

    var timestamp = Date.parse(new Date());
    $.ajax({
        url:"/upyun/getkeyavatar",
        type:"get",
        data:"timestamp="+timestamp ,
        dataType:'json',
        success: function(data){
                sign_upyun1 = data.sign;
                policy_upyun1 = data.policy;
                picpath1 = data.picpath;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {


        }
    });
}
