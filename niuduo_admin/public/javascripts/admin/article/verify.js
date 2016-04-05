function verify2(param){
    $.ajax({
        url:'/member/article/updateArticle',
        data:param,
        type:'post',
        dataType:'json',
        success:function(data){
            if(data.code==0){
                parent.popbox.success();
            }else{
                parent.popbox.close();
            }
        },
        error:function(){
            parent.popbox.close();
        }
    });
}


$(document).ready(function() {
    $("#success").bind("click",function(){
        var param="passed=1&info_id="+parent.verify_product_id+"&createdBy="+$('#error_msg').val();
        verify2(param);
    });

    $("#failed").bind("click",function(){
        var param="passed=0&info_id="+parent.verify_product_id+"&createdBy="+$('#error_msg').val();
        verify2(param);
    });

    //关闭
    $(".fork").bind("click",function(){
        parent.popbox.close();
    });


});