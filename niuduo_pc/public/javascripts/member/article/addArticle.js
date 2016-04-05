/**
 * Created by Administrator on 2015/8/21.
 */
var status = 0;


var thumbnail = "";


var editor;
KindEditor.ready(function(K) {
    editor = K.create('textarea[name="content"]', {
        allowFileManager : true
    });
    K('input[name=getHtml]').click(function(e) {
        alert(editor.html());
    });
    K('input[name=isEmpty]').click(function(e) {
        alert(editor.isEmpty());
    });
    K('input[name=getText]').click(function(e) {
        alert(editor.text());
    });
    K('input[name=selectedHtml]').click(function(e) {
        alert(editor.selectedHtml());
    });
    K('input[name=setHtml]').click(function(e) {
        editor.html('<h3>Hello KindEditor</h3>');
    });
    K('input[name=setText]').click(function(e) {
        editor.text('<h3>Hello KindEditor</h3>');
    });
    K('input[name=insertHtml]').click(function(e) {
        editor.insertHtml('<strong>插入HTML</strong>');
    });
    K('input[name=appendHtml]').click(function(e) {
        editor.appendHtml('<strong>添加HTML</strong>');
    });
    K('input[name=clear]').click(function(e) {
        editor.html('');
    });
});

$(document).ready(function()    {
    //存在id时
    if (info_id!="undefined" && info_id!="") {
        $.ajax({
            url:"/member/article/getArticleInfo",
            type:"post",
            data: "info_id="+info_id,
            dataType:'json',
            success: function(data){
                if(data.code == 1){
                    dialog.show(2,"500","500","温馨提醒",data.msg,"确定","", function(){}, function(){window.location = "/member/articleList";}, function(){});
                }else{
                    if(data.hasOwnProperty("data") && typeof(data.data) != undefined && data.data != "") {
                        var articleInfo = data.data;
                        $('#title').val(articleInfo.title);
                        $('#source').val(articleInfo.source);
                        $('#source_url').val(articleInfo.source_url);
                        $('#introduction').val(articleInfo.introduction);
                        $('#key_word').val(articleInfo.key_word);
                        $('#content').val(articleInfo.content);
                        editor.html(articleInfo.content);
                        $('#thumbnail').val(articleInfo.thumbnail);
                        $("#positive_file_pic").attr("src",articleInfo.thumbnail);
                        $('#file').val(articleInfo.file);
                        $("#passed").find("option[value='"+articleInfo.passed+"']").attr("selected",true);
                    }
                }
                this.status = 0;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                this.status = 0;
            }
        });
    }


    $(".save_add .btn_submit").bind("click",function(){
        // var form_name =  $(this).parent().parent().parent().attr("name");
        $("#add_form").attr("action","/member/commitArticle");
        var form_name = get_form_name( $(this));
        //验证
        if(check_form_info_all(form_name) == false)
        {
            remove_api_error(form_name);
            return;
        }
        $(this).html("保存中...");
        var content=$(".ke-content").val();
        content= $(document.getElementsByTagName('iframe')[0].contentWindow.document.body).html();
        //{content:editor.html()}
        ajax_request_post(form_name,{content:editor.html()},function process_data(data){
            popup.create_dom(1,'提示信息','文章发布成功！','确定','取消',function (){
                location.href="/member/article/manage";
            },function (){});

        },function process_fail(){
            $(".member-body-content .btn_submit").html("提交");
        });
        document.onkeydown = function(e){
            if(!e) e = window.event;//火狐中是 window.event
            if((e.keyCode || e.which) == 13){
                $(".btn-submit").click();
            }
        }
    });
});

