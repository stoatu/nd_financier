var select_product_ids = "";
var select_article_ids = "";
var popupbox;
function create_product_article(){
    set_activle();
    set_product();
}
function set_activle(){
   if(select_article_ids.indexOf("$")!=-1){
       var info_ids = select_article_ids.substring(0,select_article_ids.length-1);
       info_ids = info_ids.replace(/\$/g,'\,');
       $.ajax({
           url:'/getArticleVListByIds',
           data:'info_ids='+info_ids,
           type:'post',
           dataType:'json',
           success:function(data){
               var product_list=data.data;
               var product_content="";
               for(var i=0;i<product_list.length;i++){
                   var list_data_content="";
                   var type_id=product_list[i].type_id;

                   product_content+='<li>' +
                    '<div class="title">' +
                    '<a target="_blank" href="/member/article/detail?info_id=' + product_list[i].info_id + '"><h4>' + removeHTMLTag(product_list[i].title,16) + '</h4></a>' +
                    '<div class="right_span">' +
                    '<span>发布人：<i>' + product_list[i].publisher + '</i></span>' +
                    '<span>时间：<i>' + product_list[i].releasetime + '</i></span>' +
                    '<span>来源：<i>' + product_list[i].source + '</i></span>' +
                    '<span>点击量：<i class="touch">' + product_list[i].clicknum + '</i></span>' +
                    '<span class="comm_de"></span>' +
                    '</div>' +
                    '</div>' +
                    '<p>' + product_list[i].introduction + '</p>' +
                    '</li>';
               }

               product_content = '<ul>' + product_content + '</ul>';

               $('#article_list').append(product_content);

           },
           error:function(){
               alert("异步调用失败！");
           }
       });
   }
}
function set_product(){
    if(select_product_ids.indexOf("$")!=-1){
        var product_ids = select_product_ids.substring(0,select_product_ids.length-1);
        product_ids = product_ids.replace(/\$/g,'\,');
        $.ajax({
            url:'/getProductVListByIds',
            data:'product_ids='+product_ids,
            type:'post',
            dataType:'json',
            success:function(data){
                var product_list=data.data;
                var product_content="";
                for(var i=0;i<product_list.length;i++){
                    var list_data_content="";
                    var type_id=product_list[i].type_id;
                    if(type_id==1){
                        list_data_content= " <p><span>募集目标：</span><i>"+data_div(product_list[i].raise_target,10000,2)+"万元</i></p>"+
                            " <p><span>最小起投：</span><i>"+data_div(product_list[i].min_invest,10000,2)+"万元</i></p>"+
                            " <p><span>存续期限：</span><i>"+product_list[i].stock_cycle+"天</i></p>";
                    }else if(type_id==2){
                        list_data_content= " <p><span>累计净值：</span><i>"+format(product_list[i].all_net_value,4,"","","")+"</i></p>"+
                            " <p><span>累计收益：</span><i>"+percentFormat2(product_list[i].all_profit,2)+"%</i></p>"+
                            " <p><span>最近更新：</span><i>"+date_format(product_list[i].update_date,'yyyy-MM-dd')+"</i></p>";
                    }else if(type_id==3){
                        list_data_content= " <p><span>募集目标：</span><i>"+data_div(product_list[i].all_amount,10000,2)+"万元</i></p>"+
                            " <p><span>最小起投：</span><i>"+data_div(product_list[i].min_buy,10000,2)+"万元</i></p>"+
                            " <p><span>存续期限：</span><i>"+product_list[i].entrust_cycle+"天</i></p>";
                    }
                    product_content+=  "<li>"+
                        "   <img src='"+product_list[i].portrait+"' alt='' class='list_con' />"+
                        "   <div class='list_con list_info'>"+
                        "   <h4>产品名称</h4>"+
                        "    <div class='descoration'>"+
                        " </div>"+
                        " </div>"+
                        " <div class='list_con list_data'>"+
                        list_data_content+
                        " </div>"+
                        " <div class='list_con list_type'>"+
                        "     <span>产品类型：</span>"+
                        " <h5>"+product_list[i].type_name+"</h5>"+
                        " </div>"+
                        "</li>";
                }

                product_content = '<ul>' + product_content + '</ul>';

                $('#product_list').append(product_content);

            },
            error:function(){
                alert("异步调用失败！");
            }
        });
    }
}
function addmaterial(){
    popupbox.show("/member/share/material", "900","500",
        function () {
            dialog.show(2,"500","500","添加成功","添加成功。","确定","",
                function(){
                    create_product_article();
                }, function(){}, function(){});
        }, function () {}, function () {});
}
$(document).ready(function(){
    $("#addmaterial").bind("click",addmaterial);
    select_product_ids = "";
    select_article_ids = "";
    popupbox = new Popbox();
    popupbox.Init();
});