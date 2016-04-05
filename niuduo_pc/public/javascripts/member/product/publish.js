/**
 * Created by chogu on 2016/3/10.

 */
var product_type_stock='1';
var product_type_private='2';
var product_type_entrust='3';
var min_date;
var status=0;
function getTypeList(){
    $.ajax({
        url:'/member/product/getByKindType',
        data:'',
        type:'post',
        dataType:'json',
        success:function(data){
            if(data.code==0){
                var option_content="";
                var typeList=data.data;
                for(var i=0;i<typeList.length;i++){
                    option_content+='<option  value="'+typeList[i].type_id+'"> '+typeList[i].type_name+'</option>';
                }
                $('#product_type').append(option_content);
            }
        }
    });
}

function initStartTime(){
    var html_content="<input readonly='readonly' type='text' class='Wdate' id='start_time' onFocus='start_time_click()' />";
    $('#start_date').html(html_content);
}
function start_time_click(){
    WdatePicker({dateFmt:'yyyy-MM-dd',minDate:min_date});
}
Date.prototype.Format = function Format(fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

$(document).ready(function(){
    min_date=(new Date()).Format("yyyy-MM-dd");

    getTypeList();

    $('#template_img').on('click',function(){
        $('#template_img_large').removeClass('hidden').addClass('display');
        $('#template_img_large').on('click',function(){
            $(this).removeClass('display').addClass('hidden');
        });

    })

    $('#product_type').on('change',function(){
         var product_type= $(this).find('option:selected').val();
         switch(product_type){
             case product_type_stock:
                 $('#stock_private_product').addClass('display').removeClass('hidden');
                 $('#cycle').addClass('display').removeClass('hidden');
                 $('#entrust_product').addClass('hidden').removeClass('display');
                 $('#stock_private_product input').data('verify','empty');
                 $('#entrust_product input').data('verify','');
                 break;
             case product_type_private:
                 $('#stock_private_product').addClass('hidden').removeClass('display');
                 $('#cycle').addClass('hidden').removeClass('display');
                 $('#entrust_product').addClass('hidden').removeClass('display');
                 $('#stock_private_product input').data('verify','');
                 $('#entrust_product input').data('verify','');
                 break;
             case product_type_entrust:
                 $('#stock_private_product').addClass('display').removeClass('hidden');
                 $('#cycle').addClass('display').removeClass('hidden');
                 $('#entrust_product').addClass('display').removeClass('hidden');
                 $('#stock_private_product input').data('verify','empty');
                 $('#entrust_product input').data('verify','empty');
                 break;
         }
    });

   $('#submit_btn').on('click',function(){
       if(status!=0){
           return ;
       }
       status=1;
       if($('#product_name').val().length>50){
           $("form[name='add_form'] .form-error-bottom").html("产品名称不能超过50个字！");
           $("form[name='add_form'] .form-error-bottom").removeClass("display_none");
           return ;
       }

       if($('#key_word').val().length>20){
           $("form[name='add_form'] .form-error-bottom").html("关键字不能超过20个字！");
           $("form[name='add_form'] .form-error-bottom").removeClass("display_none");
           return ;
       }
       var check=/^[1-9][0-9]*$/;
       var type_id=$('#product_type option:selected').val();
       if(type_id==product_type_stock||type_id==product_type_entrust){
           if(!check.test($('#raise_target').val())){
               $("form[name='add_form'] .form-error-bottom").html("募集目标只能为数字");
               $("form[name='add_form'] .form-error-bottom").removeClass("display_none");
               return ;
           }
           if(!check.test($('#min_invest').val())){
               $("form[name='add_form'] .form-error-bottom").html("最小起投只能为数字");
               $("form[name='add_form'] .form-error-bottom").removeClass("display_none");
               return ;
           }
           if(type_id==product_type_entrust){
               var check2=/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
               if(!check2.test($('#year_yield').val())){
                   $("form[name='add_form'] .form-error-bottom").html("预期年化只能为数字");
                   $("form[name='add_form'] .form-error-bottom").removeClass("display_none");
                   return ;
               }
           }
       }

       var form_name = get_form_name( $(this));

       $(this).html("申请中...");

       ajax_request_post(form_name,{product_description:editor.html()},function process_data(data){
           status=0
           popup.create_dom(1,'提示信息','产品发布成功！','确定','取消',function (){
               location.href="/member/product/manage";
           },function (){});
       },function process_fail(){
           $(".submit").html("提交");
           status=0;
       });
   });
});