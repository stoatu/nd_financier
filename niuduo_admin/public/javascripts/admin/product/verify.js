function verify2(param){
    $.ajax({
        url:'/admin/updateStatus',
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
        var param="status=2&product_id="+parent.verify_product_id+"&error_msg="+$('#error_msg').val();
        verify2(param);
    });

    $("#failed").bind("click",function(){
        var param="status=5&product_id="+parent.verify_product_id+"&error_msg="+$('#error_msg').val();
        verify2(param);
    });

    //关闭
    $(".fork").bind("click",function(){
        parent.popbox.close();
    });


});