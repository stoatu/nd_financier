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
    if(parent.temp_user_obj!=null) {
        $("#title").val(parent.temp_user_obj.title);
        $("#staticfileid").val(parent.temp_user_obj.staticfileid);
        $("#passed").find("option[value='"+parent.temp_user_obj.passed+"']").attr("selected",true);
        $("#content").val(parent.temp_user_obj.content);
        $("#catname").val(parent.temp_user_obj.catname);
        editor.html(parent.temp_user_obj.content);
        $("#thumbnail").val(parent.temp_user_obj.thumbnail);
        $("#positive_file_pic").attr("src",parent.temp_user_obj.thumbnail);
        $("#file").val(parent.temp_user_obj.file);
        $("#introduction").val(parent.temp_user_obj.introduction);
    }

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

    //取消
    $(".btn_cancel").bind("click",function(){
        //alert(parent.name);
        parent.popbox.close();
    });
    //提交并置顶
    $(".btn_save").bind("click",function(){
        if(status==1){
            return;
        }

        $("#add_form").attr("action","/releasestaticfile");

        $("#content").remove();
        var form_name = get_form_name( $(this));
        if(check_form_info_all(form_name) == false){
            return;
        }

        var catname = $("#catname").val();

        $(this).html("提交中...");
        ajax_request_post(form_name,{content:editor.html(),catname:catname},function process_data(data){
            parent.popbox.success();
        },function process_fail(){
            status = 0;
            $(".btn_save").html("提交并置顶");
        });
    });
    //取消
    $(".fork").bind("click",function(){
        parent.popbox.close();
    });

    $(".ke-button-common").bind("click",function(){
        alert("1111");
        return false;
    });
    $('input.ke-button-common.ke-button').bind("click",function(){
        return false;
    });
});

function df() {
    var haspicContainer = document.getElementById("has_pic");
    if (haspicContainer == null) {
        haspicContainer = document.createElement("div");
        haspicContainer.id = "has_pic";
        haspicContainer.innerHTML = "<input type='text' id='piclist' value='' style='display:none;'/><div id='upload'><b>您有图片需要上传到服务器</b>&nbsp;&nbsp;<a href='javascript:uploadpic();' >上传</a></div><div id='confirm'></div>";
        $(".ke-toolbar").after(haspicContainer);
    }

    var img = $(".ke-edit-iframe").contents().find("img");

    var piccount = 0;
    var sstr = "";
    for(var i=0;i<img.length;i++){
        if (((img[i].src).indexOf("http://") >= 0 || (img[i].src).indexOf("https://") >= 0) && (img[i].src).indexOf("http://resource-chaogu.b0.upaiyun.com") == -1){
            piccount++;
            if (i == img.length - 1)
                sstr = sstr + img[i].src;
            else
                sstr = sstr + img[i].src + "|";
        }
    }
    $("#piclist").val(sstr);
    document.getElementById("has_pic").style.display = (piccount > 0) ? "block" : "none";
}

function closeupload() {
    $("#has_pic").hide();
    $("#upload").show();
}

function uploadpic() {
    var piclist = encodeURI($("#piclist").val());
    if (piclist.length == 0) return false;

    $.ajax({
        url: "asp.net/uploadpic.ashx",
        data: "pic=" + piclist,
        type: "GET",
        beforeSend: function () {
            $("#upload").hide();
            $("#confirm").text("正在上传中...");
        },
        success: function (msg) {
            if (msg !== "") {
                var str = new Array();
                str = msg.split('|');
                var img = $(".ke-edit-iframe").contents().find("img");

                $(img).each(function (i) {
                    var that = $(this);
                    if (that.attr("src").indexOf("http://") >= 0 || that.attr("src").indexOf("https://") >= 0) {
                        that.attr("src", "/uploads/image/" + str[i]);
                        that.attr("data-ke-src", "/uploads/image/" + str[i]);
                    }
                });

                $("#confirm").html(img.length + "张图片已经上传成功！&nbsp;&nbsp;<a href='javascript:closeupload();'>关闭</a>");
            }
            else $("#confirm").text("上传失败！");
        }
    });
}