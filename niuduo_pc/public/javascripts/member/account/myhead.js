var thumbnail = "!show";
var head_url;
var upload_status=0;//0-未上传，1-上传中，2-上传成功，3-上传失败
$(document).ready(function(){
    $("#myhead").on("click",function(){
        $("#file_avatar").click();
    });

    $("#submit_btn").on("click",function(){
        var form_name = get_form_name($(this));
        //验证
        if(check_form_info_all(form_name) == false){
            return;
        }

        if(typeof(head_url)=="undefined" || head_url==""){
            alert("头像未上传！");
            return;
        }
        if(upload_status==1){
            alert("头像上传中，请稍后再试！");
            return;
        }
        if(upload_status==3){
            alert("头像上传失败，请重新上传新头像！");
            return;
        }

        var form_obj = get_form_obj($(this));
        form_obj.attr("action","/member/changePortrait");
        var param="&portrait="+head_url;
        ajax_request(form_name,param,function process_data(data){
            window.top.popup.create_dom(1,'温馨提醒','昵称头像信息修改成功！','确定','',function (){window.top.location.reload();},function (){});
        },function process_fail(){
            $("#submit_btn").val("确认保存");
        });
    });
});


$("#file_avatar").change( function () {
    var form_obj = get_form_obj($(this));
    upload_status=1;
    form_obj.submit();
});

$("#avatar_iframe").load(function () {
    upload_status=3;
    var url = $(window.frames['avatar_iframe'].document.body).find("textarea").html();
    if (url != null && url.length > 5) {
        head_url=url;
        url = prefix_upyun_avatar + url;
        $("#avatar_img").attr("src",url);
        upload_status=2;
    }
});