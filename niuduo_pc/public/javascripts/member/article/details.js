/**
 * Created by 15224 on 2016/3/17.
 */

function init_list(){
    $.ajax({
        url:'/getArticleListByIds',
        data:'info_ids='+info_ids,
        type:'post',
        dataType:'json',
        success:function(data){
            var info_list=data.data;
            var info_content="";
            for(var i=0;i<info_list.length;i++){

            }
            $('.detail_list').append(info_content);
        },
        error:function(){
            alert("异步调用失败！");
        }
    });
}

$(document).ready(function(){
    init_list();
});