var menulist;
var stylelist=new Array();

function select_onmore(authid){
    if($("#menu_list_"+authid).is(":checked")){
        $(".menu_list_"+authid).each(function(){
            $(this)[0].checked=true;
        });
    }else{
        $(".menu_list_"+authid).each(function(){
            $(this)[0].checked=false;
        });
    }
}
function select_onmore_up(authid){
    var pid = $("#menu_list_"+authid).attr("pid");
    if($("#menu_list_"+authid).is(":checked")){
        $("#menu_list_"+pid)[0].checked=true;
    }
}
var status = 0;
$(document).ready(function() {
    $("#role_id").val(parent.temp_user_obj.role_id);
    var role_id=parent.temp_user_obj.role_id;
    dataInit();
    function dataInit(){
        $.ajax({
            url:"/showAllAuth",
            type:"post",
            data: "",
            dataType:'json',
            success: function(data){
                if(data.code == 1){
                    alert(data.msg);
                } else{
                    menulist=data.data;
                    $.ajax({
                        url:"/showRoleAuth",
                        type:"post",
                        data: "parent_id=0&role_id="+role_id,
                        dataType:'json',
                        success: function(data){
                            if(data.code == 1){
                                alert(data.msg);
                            }else{
                                datalist(data.data)  ;
                            }
                            this.status = 0;
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            this.status = 0;
                        }
                    });
                }
                this.status = 0;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                this.status = 0;
            }
        });
    }

    function datalist(data){
        var main_array = new Array();
        var detailArray = new Array();
        var l = 0;
        //取出一级的元素
        for (var i = 0; i < menulist.length; i++) {
            var auth_id =  menulist[i].auth_id;
            var parent_id =  menulist[i].parent_id;
            if(parent_id == '0'){
                main_array[l] =  menulist[i];
                l++;
            }
        }
        //建立二级数组对象
        for(var i=0;i<main_array.length;i++){
            var detail2array = new Array();
            detailArray[i] = detail2array;
        }
        //填充二级数组数据
        for (var i = 0; i < menulist.length; i++) {
            var auth_id =  menulist[i].auth_id;
            var parent_id =  menulist[i].parent_id;
            if(parent_id != '0'){
                //不是父类元素
                for(var j=0;j<main_array.length;j++){
                    var p_obj = main_array[j];
                    if(p_obj.auth_id == parent_id){
                        var detail2array = detailArray[j];
                        var len = detail2array.length;
                        detail2array[len]= menulist[i];
                    }
                }
            }
        }
        var str="<ul class='menu_list_ul'>";
        for(var i=0;i<l;i++){
            var dis="";
            var parent_obj  = main_array[i];
            str+="<li>" +
                "<input type='checkbox' aid='"+parent_obj.auth_id+"' value='"+parent_obj.auth_id+"' "+dis+"  onclick='select_onmore("+parent_obj.auth_id+")'  id='menu_list_"+parent_obj.auth_id+"' > "+parent_obj.text+"" +
                "<ul>";
            var detail2array = detailArray[i];
            for (var j = 0; j < detail2array.length; j++) {
                str+="<li>" +
                    "<input type='checkbox' aid='"+detail2array[j].auth_id+"'  pid='"+parent_obj.auth_id+"'  value='"+detail2array[j].auth_id+"' "+dis+" onclick='select_onmore_up("+detail2array[j].auth_id+")' class='menu_list_"+detail2array[j].parent_id+"' id='menu_list_"+detail2array[j].auth_id+"'> "+detail2array[j].text+
                    "</li>";
            }
            str+="</ul></li>";
        }
        str += "</ul>";
        $("#perms_list").append(str);
        for(var j=0;j<data.length;j++){
            var authid = data[j].auth_id;
            $("[aid='"+authid+"']")[0].checked=true;
        }
    }
    //取消
    $(".btn_cancel").bind("click",function(){
        parent.popbox.close();
    });
    //成功
    $(".btn_save").bind("click",function(){
        if(status==1)
            return;
        var str="";
        $(".menu_list_ul input ").each(function(){
            //获取input类型
            var type=  $(this).attr("type");
            if(type == "checkbox"){
                if($(this).is(":checked")){
                    var auth_id = $(this).attr("aid");
                    if(str=="")
                        str = auth_id;
                    else
                        str = str+","+auth_id;
                }
            }
        });
        $("#adminRoleAuth").val(str);
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
    });
    //取消
    $(".fork").bind("click",function(){
        parent.popbox.close();
    });
});