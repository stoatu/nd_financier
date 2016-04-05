

function  Popbox()
{

    this.iframeid = "pop_iframe"; //不能修改
    this.iframename = "pop_iframe"; //不能修改
    this.iframe_width = 640;
    this.iframe_height = 640;

    this.success_callback;
    this.close_callback;
    this.error_callback;





    //开始载入
    this.Init = function(){

        $("body").append("<div id='popbox_main' class='hidden'><div class='iframe_main'><iframe frameborder=no id='"+this.iframeid +"' name='"+this.iframename+"' ></iframe></div></div>");

    };

    //显示

    this.show = function(url,width,height,success_function,close_function,error_function) {


        $("#pop_iframe").attr("src","");

        $("#pop_iframe").css("width",width+"px");
        $("#pop_iframe").css("height",height+"px");

        $("#pop_iframe").attr("src",url);

        $("#popbox_main").removeClass("hidden");
        $("#pop_iframe").css("display","block");

        this.success_callback = success_function;
        this.close_callback = close_function;
        this.error_callback = error_function;

    };



    this.close = function() {

        $("#popbox_main").addClass("hidden");
        $("#pop_iframe").css("display","none");



        this.close_callback();

    };

    //成功

    this.success = function() {

        $("#popbox_main").addClass("hidden");
        $("#pop_iframe").css("display","none");


        this.success_callback();

    };

    this.error = function() {

        $("#popbox_main").addClass("hidden");
        $("#pop_iframe").css("display","none");


        this.error_callback();

    };

}