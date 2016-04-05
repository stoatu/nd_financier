/**
 * Created by chogu on 2016/3/10.

 */
var edit_product_id;
function start_time_click(){
    //$("form[name='add_form'] .form-error-bottom").hide();
    WdatePicker({dateFmt:'yyyy-MM-dd',minDate:''});
}


$(document).ready(function(){


   $('#edit').on('click',function(){
       var form_name = get_form_name( $(this));
       $(this).html("更新中...");
       var param="&product_id="+edit_product_id;
       ajax_request(form_name,param,function process_data(data){
            $("#edit").html("更新");
           $('#refresh_page').hide();
           dialog.show(2,"350","500","温馨提醒","更新成功","确定","",function(){}, function(){}, function(){});

       },function process_fail(){
           $("#edit").html("更新");
       });
   });


    $('#product_edit').css({
        marginLeft: -parseInt($('#product_edit').css('width') / 2),
        marginTop: -parseInt($('#product_edit').css('height') / 2)
    }).find('button:eq(1)').on('click',function (){
        $('#refresh_page').hide();
    });
});





