var select_product_ids = "";
var select_article_ids = "";
/*function select_product(){
    $("#material").attr("src","/member/product");
}

function select_article(){
    $("#material").attr("src","/member/article/index");
}*/

$(document).ready(function() {
    if(typeof parent.select_article_ids != "undefined"){
        select_article_ids = parent.select_article_ids;
    }

    if(typeof parent.select_product_ids != "undefined"){
        select_product_ids = parent.select_product_ids;
    }

    //取消
    $(".btn_cancel").bind("click",function(){
        parent.popupbox.close();
    });

    //成功
    $(".btn_save").bind("click",function(){
        if(typeof parent.select_product_ids != "undefined"){
            parent.select_product_ids = select_product_ids;
        }
        if(typeof parent.select_article_ids != "undefined"){
            parent.select_article_ids = select_article_ids;
        }
        parent.popupbox.success();
    });
    //取消
    $(".fork").bind("click",function(){
        parent.popupbox.close();
    });

    $('#product_tag').on('click','span',function (){
        $(this).removeClass('active').siblings().addClass('active');
        $("#material").prop('src',$(this).data('ifsrc'))
    });
});



