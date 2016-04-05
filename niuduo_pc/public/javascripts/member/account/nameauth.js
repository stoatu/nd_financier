/**
 * Created by 15224 on 2016/3/14.
 */

/*
$('#account_form .nameauth').on('click','button',function (){
    $(this).removeClass('active').siblings('button').addClass('active');
    $('#account_form .form_auth').hide().eq($(this).index()).show()
});*/
var file_name_not_upload = "file_0";
var  file_name_upload = "file";
var imgid = "";
var thumbnail = "!show";
var upload_status_positive = 0; //正面上传  0-未 1-正在  2-成功  3-失败
var upload_status_negative = 0; //反面上传
var upload_status_license = 0;
var upload_status_proxy = 0;

$(document).ready(function(){
    $("#submit_btn").on("click",function(){
        var form_name = get_form_name($(this));
        //$("form[name="+form_name+"] .personal_auth");

        //验证
        if(check_form_info_all(form_name) == false){
            return;
        }

        if($("#positive_file_pic_file").attr("param_value") == " "||$("#positive_file_pic_file").attr("param_value") ==null ||$("#positive_file_pic_file").attr("param_value") =="null!show" )
        {
            if(upload_status_positive == 1) {
                /*parent.dialog.show(2, "500", "500", "温馨提醒", "身份证正面照片正在上传中,请稍候...", "确定", "",
                    //success
                    function () {
                    }, function () {
                    }, function () {
                    });*/
                alert("身份证正面照片正在上传中,请稍候...");
                return;
            }
            else{
                /*parent.dialog.show(2, "500", "500", "温馨提醒", "身份证正面照片未上传。", "确定", "",
                    //success
                    function () {
                    }, function () {
                    }, function () {
                    });*/
                alert("身份证正面照片未上传。");
                return;
            }
        }

        if( $("#negative_file_pic_file").attr("param_value")== " "||$("#negative_file_pic_file").attr("param_value")==null||$("#negative_file_pic_file").attr("param_value")== "null!show" )
        {
            if(upload_status_negative == 1)
            {
                /*parent.dialog.show(2, "500", "500", "温馨提醒", "身份证反面照片正在上传中,请稍候...", "确定", "",
                    //success
                    function () {
                    }, function () {
                    }, function () {
                    });*/
                alert("身份证反面照片正在上传中,请稍候...");
                return;
            }
            else {
                /*parent.dialog.show(2, "500", "500", "温馨提醒", "身份证反面照片未上传。", "确定", "",
                    //success
                    function () {
                    }, function () {
                    }, function () {
                    });*/
                alert("身份证反面照片未上传。");
                return;
            }
        }

        var form_obj = get_form_obj($(this));
        if($(".personal_auth")[0]!=undefined){
            form_obj.attr("action","/member/authRealname");
        }else if($(".company_auth")[0]!=undefined){
            if($("#license_file_pic_file").attr("param_value") == " "||$("#license_file_pic_file").attr("param_value") ==null ||$("#license_file_pic_file").attr("param_value") =="null!show" )
            {
                if(upload_status_license == 1) {
                    /*parent.dialog.show(2, "500", "500", "温馨提醒", "身份证正面照片正在上传中,请稍候...", "确定", "",
                     //success
                     function () {
                     }, function () {
                     }, function () {
                     });*/
                    alert("营业执照照片正在上传中,请稍候...");
                    return;
                }
                else{
                    /*parent.dialog.show(2, "500", "500", "温馨提醒", "身份证正面照片未上传。", "确定", "",
                     //success
                     function () {
                     }, function () {
                     }, function () {
                     });*/
                    alert("营业执照照片未上传。");
                    return;
                }
            }

            if( $("#proxy_file_pic_file").attr("param_value")== " "||$("#proxy_file_pic_file").attr("param_value")==null||$("#proxy_file_pic_file").attr("param_value")== "null!show" )
            {
                if(upload_status_proxy == 1)
                {
                    /*parent.dialog.show(2, "500", "500", "温馨提醒", "身份证反面照片正在上传中,请稍候...", "确定", "",
                     //success
                     function () {
                     }, function () {
                     }, function () {
                     });*/
                    alert("合同扫描件照片正在上传中,请稍候...");
                    return;
                }
                else {
                    /*parent.dialog.show(2, "500", "500", "温馨提醒", "身份证反面照片未上传。", "确定", "",
                     //success
                     function () {
                     }, function () {
                     }, function () {
                     });*/
                    alert("合同扫描件照片未上传。");
                    return;
                }
            }
            form_obj.attr("action","/member/authEnterpriseRealname");
        }
        $(this).val("保存中...");
        var param="";
        ajax_request(form_name,param,function process_data(data){
            alert("实名认证信息保存成功，请耐心等待审核！");
            /*dialog.show(2,"500","500","温馨提醒","实名认证信息保存成功，请耐心等待审核","确定","",
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
            $("#submit_btn").val("确认保存");
        });
    })

    $("input[type=file]").change( function () {
        var timestamp = Date.parse(new Date());
        $("#timept").val(timestamp);
        if($(this).val() == "")
        {
            return;
        }
        if(typeof($(this).attr("target_id")) != "undefined")
        {
            imgid = $(this).attr("target_id");
        }
        else
        {
            return;
        }

        //get_sign(timestamp);

        //正面
        if(imgid == "positive_file_pic")
        {
            postive_flag = 1;
            $("#policy").val(policy_upyun1);
            $("#signature").val(sign_upyun1);
            upload_status_positive = 1;
        }
        else if(imgid == "negative_file_pic")
        {
            postive_flag =0;
            $("#policy").val(policy_upyun2);
            $("#signature").val(sign_upyun2);
            upload_status_negative = 1;
        }
        else if(imgid == "license_file_pic")
        {
            postive_flag =2;
            $("#policy").val(policy_upyun3);
            $("#signature").val(sign_upyun3);
            upload_status_license = 1;
        }
        else if(imgid == "proxy_file_pic")
        {
            postive_flag =3;
            $("#policy").val(policy_upyun4);
            $("#signature").val(sign_upyun4);
            upload_status_proxy = 1;
        }
        //return;
        $(this).attr("name",file_name_upload);
        var form_obj = get_form_obj($(this));
        form_obj.attr("action","https://v0.api.upyun.com/realname");
        file_object = $(this);
        form_obj.submit();
    });

    $("#pic_iframe").load(function(){
        //alert("pic_iframe change ");
        /*var data = $(window.frames['pic_iframe'].document.body).find("textarea").html();*/
        /*var url = prefix_upyun+data+thumbnail;*/
        var url="";
        if(postive_flag  == 1) {
            url =  picpath1 + thumbnail;
            upload_status_positive = 2;
        }else if(postive_flag  == 0) {
            url = picpath2 + thumbnail;
            upload_status_negative = 2;
        }else if(postive_flag == 2){
            url = picpath3 + thumbnail;
            upload_status_license = 2;
        }else if(postive_flag == 3){
            url = picpath4 + thumbnail;
            upload_status_proxy = 2;
        }
        set_url(url);
    });
});

function set_url(url)
{
    document.getElementById(imgid).src = prefix_upyun+url;
    file_object.attr("name",file_name_not_upload);
    file_object.attr("param_value",url);
    check_form_info_all(get_form_name(file_object));
}

function get_sign(timestamp)
{
    //var timestamp = Date.parse(new Date());
    $.ajax({
        url:"/member/upyun/getkeyrealname",
        type:"get",
        data:"timestamp="+timestamp ,
        dataType:'json',
        success: function(data){
            //alert(data.picpath);
            //正面
            if(postive_flag == 1)
            {
                /*sign_upyun1 = data.sign;
                policy_upyun1 = data.policy;
                picpath1 = data.picpath;*/
            }else if(postive_flag == 0)
            {
                //正面
               /* sign_upyun2 = data.sign;
                policy_upyun2 = data.policy;
                picpath2 = data.picpath;*/

            }else{
                sign_upyun3 = data.sign;
                policy_upyun3 = data.policy;
                picpath3 = data.picpath;
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {

        }
    });
}