
$(document).ready(function()    {
    dataInit();
    //初始化
    $('#member-left-menu').on('click','ul li',function (){
        $(this).addClass('active').siblings().removeClass('active');
    });

    function dataInit(){
        $.ajax({
            url:"/getAdminUserRole",
            type:"post",
            data: "",
            dataType:'json',
            success: function(data){
                if(data.code == 1){
                    alert(data.msg);
                }else{
                    var RoleAuth=data.data;
                    $.ajax({
                        url:"/showRoleAuth",
                        type:"post",
                        data: "parent_id="+parent_auth_id+"&role_id="+RoleAuth.role_id,
                        dataType:'json',
                        success: function(data){
                            if(data.code == 1){
                                alert(data.msg);
                            }else{
                                datalist(data.data);
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

    //加载菜单
    function datalist(data) {
        var str="";
        if(data.length>0){
            //str+="<dd>";
            //str+='<div class="title"><span><img src="images/leftico01.png"></span>管理信息</div>';
            str+='<ul class="menuson">';
        }
        for(var i=0;i<data.length;i++){
            if(i==0){
                $("#rightFrame",parent.document).prop("src",data[i].url+'?parentid='+data[i].parent_id);
            }
           str+='<li '+(i == 0 ? 'class="active"' : '') + '><cite></cite><a href="'+data[i].url+'?parentid='+data[i].parent_id+'" target="rightFrame">'+data[i].text+'</a><i></i></li>';
        }
        if(data.length>0){
            str+='</ul>';
            //str+="</dd>";
        }
        $("#member-left-menu").append(str);
    }

    //导航切换
    $(".menuson .header").click(function(){
        var $parent = $(this).parent();
        $(".menuson>li.active").not($parent).removeClass("active open").find('.sub-menus').hide();

        $parent.addClass("active");
        if(!!$(this).next('.sub-menus').size()){
            if($parent.hasClass("open")){
                $parent.removeClass("open").find('.sub-menus').hide();
            }else{
                $parent.addClass("open").find('.sub-menus').show();
            }
        }
    });
    // 三级菜单点击
    $('.sub-menus li').click(function(e) {
        $(".sub-menus li.active").removeClass("active")
        $(this).addClass("active");
    });
    $('.title').click(function(){
        var $ul = $(this).next('ul');
        $('dd').find('.menuson').slideUp();
        if($ul.is(':visible')){
            $(this).next('.menuson').slideUp();
        }else{
            $(this).next('.menuson').slideDown();
        }
    });
});