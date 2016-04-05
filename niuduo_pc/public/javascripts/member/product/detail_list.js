/**
 * Created by 15224 on 2016/3/17.
 */

function init_list(){
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

            $('#detail_list ul').append(product_content);

        },
        error:function(){
            alert("异步调用失败！");
        }
    });
}

$(document).ready(function(){
    init_list();
});