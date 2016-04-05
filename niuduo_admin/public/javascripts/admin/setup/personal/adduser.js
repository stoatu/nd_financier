var status = 0;

var file_name_not_upload = "file_0";

var  file_name_upload = "file";

var thumbnail = "";

var sign_upyun1;
var policy_upyun1 ;
var picpath ;
var prefix_upyun = "http://resource-chaogu.b0.upaiyun.com";
var imgid = "positive_file_pic";

function get_sign(){
    var timestamp = Date.parse(new Date());
    $.ajax({
        url:"/upyun/getkeyresource",
        type:"get",
        data:"timestamp="+timestamp,
        dataType:'json',
        success: function(data){
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
    $("input[type=file]").change( function () {
        if($(this).val() == ""){
            return;
        }
        $("#policy").val(policy_upyun1);
        $("#signature").val(sign_upyun1);
        $(this).attr("name",file_name_upload);
        var form_obj = get_form_obj($(this));
        form_obj.attr("action","http://v0.api.upyun.com/resource-chaogu");
        file_object = $(this);
        form_obj.submit();
    });


    $("#pic_iframe").load(function(){
        set_url(prefix_upyun+picpath);
        get_sign();
    });
    function set_url(url){
        document.getElementById(imgid).src = url;
        file_object.attr("name",file_name_not_upload);
        file_object.attr("param_value",url);
        check_form_info_all(get_form_name(file_object));
        $("#thumbnail").val(url);
    }


    //权限组
    var columns_city ={name_dataIndex :'role_name',value_dataIndex :'role_id'};

    grid_citylist = new Select_Grid("/showAllRole",$("#role"),columns_city,"");

    grid_citylist.Init("");

    //取消
    $(".btn_cancel").bind("click",function(){

        //alert(parent.name);
        parent.popbox.close();
    });

    //成功
    $(".btn_save").bind("click",function(){
        $("#add_form").attr("action","/adminCreate");

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

})