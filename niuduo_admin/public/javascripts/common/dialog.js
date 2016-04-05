/**
 * Created by Administrator on 2015/1/23.
 */


/*
//新建弹出框
var dialog=new dialog();
dialog.Init();

$("#dianji").bind("click",function(){
    dialog.show(1,"500","500","对话框","确定取消吗？","确定","取消",
        //success
        function(){
            alert("success");
            //window.location.reload();
        },
        //close
        function(){
            alert("close");
        },
        //error
        function(){alert("error");});
    //dialog.data();
})
*/



function  Dialog()
{

    this.iframeid = "pop_iframe1"; //不能修改
    this.iframename = "pop_iframe1"; //不能修改
   



    //开始载入
    this.Init = function(){

        $("body").append("<div id='popbox_main1' class='hidden'><div class='iframe_main1'><div id='"+this.iframeid +"' name='"+this.iframename+"' ></div></div></div>");

    };

    //显示

    this.show = function(state,width,height,title,center,button1,button2,success_function,close_function,error_function) {

        //$("#pop_iframe").attr("src","");
        $("#pop_iframe1").empty();
       // $("#pop_iframe").css("width",width+"px");
       // $("#pop_iframe").css("height",height+"px");

        //$("#pop_iframe").attr("src",url);
        var fork="";//叉叉
        //if(state == 1){
        //    fork="<div class='fork'><img src='http://resource-chaogu.b0.upaiyun.com/resources/images/admin/login/close.png'></div>";
        //}

        var str=fork+"<div class='msg_box_content'>" +
            "<!--添加用户--><div class='layer_title' id='dialog_title'></div> <!-- 信息总揽 --> <div class='form_view1'>" +
            "<table><tr><td colspan='2'  class='td_content'><div id='dialog_content'></div></td></tr><tr><td colspan='2' class='td_content_center' id='dialog_button'>";
        if(state==1){
            str+="<button type='button' class='btn_save width1'>"+button1+"</button><button type='button' class='btn_cancel width1 margin-left20'>"+button2+"</button>";
        }else if(state==2){
            str+="<button type='button' class='btn_save width1'>"+button1+"</button>";
        }
        str+="</td></tr></table></div></div><script src='/javascripts/jquery-1.11.3.min.js'></script>" +
            "<script src='/javascripts/common/format.js'  ></script>";

        $("#pop_iframe1").append(str);


        $("#dialog_title").html(title);
        $("#dialog_content").html(center);


        $("#popbox_main1").removeClass("hidden");
        // document.body.style.overflow = "hidden";


        this.error_callback = error_function;
        this.close_callback = close_function;
        this.success_callback = success_function;



        var this_obj = this;

        //取消
        $(".btn_cancel").bind("click",function(){
            $("#popbox_main1").addClass("hidden");
            // document.body.style.overflow = "auto";
            this_obj.close_callback();

        });

        //成功
        $(".btn_save").bind("click",function(){
            $("#popbox_main1").addClass("hidden");
            // document.body.style.overflow = "auto";
            this_obj.success_callback();
        });

        //取消
        $(".fork").bind("click",function(){
            $("#popbox_main1").addClass("hidden");
            // document.body.style.overflow = "auto";
            this_obj.error_callback();
        });
    };


    this.showleft = function(state,width,height,title,center,button1,button2,success_function,close_function,error_function) {

        //$("#pop_iframe").attr("src","");
        $("#pop_iframe1").empty();
        // $("#pop_iframe").css("width",width+"px");
        // $("#pop_iframe").css("height",height+"px");

        //$("#pop_iframe").attr("src",url);
        var fork="";//叉叉
        //if(state == 1){
        //    fork="<div class='fork'><img src='http://resource-chaogu.b0.upaiyun.com/resources/images/admin/login/close.png'></div>";
        //}

        var str=fork+"<div class='msg_box_content'>" +
            "<!--添加用户--><div class='layer_title' id='dialog_title'></div> <!-- 信息总揽 --> <div class='form_view1'>" +
            "<table><tr><td colspan='2'  class='td_content'><div id='dialog_content_left'></div></td></tr><tr><td colspan='2' class='td_content_center' id='dialog_button'>";
        if(state==1){
            str+="<button type='button' class='btn_save width1'>"+button1+"</button><button type='button' class='btn_cancel width1 margin-left20'>"+button2+"</button>";
        }else if(state==2){
            str+="<button type='button' class='btn_save width1'>"+button1+"</button>";
        }
        str+="</td></tr></table></div></div><script src='/javascripts/jquery-1.11.3.min.js'></script>" +
        "<script src='/javascripts/common/format.js'  ></script>";

        $("#pop_iframe1").append(str);


        $("#dialog_title").html(title);
        $("#dialog_content_left").html(center);


        $("#popbox_main1").removeClass("hidden");
        document.body.style.overflow = "hidden";


        this.error_callback = error_function;
        this.close_callback = close_function;
        this.success_callback = success_function;



        var this_obj = this;

        //取消
        $(".btn_cancel").bind("click",function(){
            $("#popbox_main1").addClass("hidden");
            document.body.style.overflow = "auto";
            this_obj.close_callback();

        });

        //成功
        $(".btn_save").bind("click",function(){
            $("#popbox_main1").addClass("hidden");
            document.body.style.overflow = "auto";
            this_obj.success_callback();
        });

        //取消
        $(".fork").bind("click",function(){
            $("#popbox_main1").addClass("hidden");
            document.body.style.overflow = "auto";
            this_obj.error_callback();
        });
    };


    this.showleft3 = function(state,width,height,title,center,button1,button2,button3,success_function,close_function,error_function,success2_function) {

        //$("#pop_iframe").attr("src","");
        $("#pop_iframe1").empty();
        // $("#pop_iframe").css("width",width+"px");
        // $("#pop_iframe").css("height",height+"px");

        //$("#pop_iframe").attr("src",url);
        var fork="";//叉叉
        //if(state == 1){
        //    fork="<div class='fork'><img src='http://resource-chaogu.b0.upaiyun.com/resources/images/admin/login/close.png'></div>";
        //}

        var str=fork+"<div class='msg_box_content'>" +
            "<!--添加用户--><div class='layer_title' id='dialog_title'></div> <!-- 信息总揽 --> <div class='form_view1'>" +
            "<table><tr><td colspan='2'  class='td_content'><div id='dialog_content_left'></div></td></tr><tr><td colspan='2' class='td_content_center' id='dialog_button'>";
        if(state==1){
            str+="<button type='button' class='btn_save width1'>"+button1+"</button><button type='button'  class='btn_save width1 margin-left3 btn_more'>"+button3+"</button><button type='button' class='btn_cancel width1 margin-left20'>"+button2+"</button>";
        }else if(state==2){
            str+="<button type='button' class='btn_save width1'>"+button1+"</button>";
        }
        str+="</td></tr></table></div></div><script src='/javascripts/jquery-1.11.3.min.js'></script>" +
        "<script src='/javascripts/common/format.js'  ></script>";

        $("#pop_iframe1").append(str);


        $("#dialog_title").html(title);
        $("#dialog_content_left").html(center);


        $("#popbox_main1").removeClass("hidden");
        document.body.style.overflow = "hidden";


        this.error_callback = error_function;
        this.close_callback = close_function;
        this.success_callback = success_function;



        var this_obj = this;

        //取消
        $(".btn_cancel").bind("click",function(){
            $("#popbox_main1").addClass("hidden");
            document.body.style.overflow = "auto";
            this_obj.close_callback();

        });

        //成功
        $(".btn_save").bind("click",function(){
            $("#popbox_main1").addClass("hidden");
            document.body.style.overflow = "auto";
            this_obj.success_callback();
        });

        //取消
        $(".fork").bind("click",function(){
            $("#popbox_main1").addClass("hidden");
            document.body.style.overflow = "auto";
            this_obj.error_callback();
        });

        $(".btn_more").bind("click",function(){
            $("#popbox_main1").addClass("hidden");
            document.body.style.overflow = "auto";

            var obj3 = success2_function;
            obj3();
        });


    };


}

