/**
 * Created by chogu on 2016/3/14.
 */
var TYPE_STOCK=1;//私募股权
var TYPE_PRIVATE=2;//阳光私募
var TYPE_ENTRUST=3;//信托资管
var edit_product_id;
var columns = [
    {title : '',dataIndex :'checkbox',dataSource:function(data,datarow,gridobj,current_column) {
        return "<input id='"+data[datarow].product_id+"' name='checkbox' type='checkbox' value='' />";
    }},
    {title : '产品名称',dataIndex :'product_name',dataSource:function(data,datarow,gridobj,current_column) {
       var a_url='/member/product/detail?product_id='+data[datarow].product_id;
        return "<a onclick='window.open(\""+a_url+"\")'>"+data[datarow].product_name+"</a>";
    }},
    {title : '产品类型',dataIndex :'type_name',dataSource: function(data,datarow,gridobj,current_column) {
        return data[datarow].type_name;
    }},
    {title : '存续期限',dataIndex :'cycle',dataSource: function(data,datarow,gridobj,current_column) {
        var type_id=data[datarow].type_id;
        switch(type_id){
            case TYPE_STOCK:return data[datarow].stock_cycle+"天";
            case TYPE_PRIVATE:return "-";
            case TYPE_ENTRUST:return data[datarow].entrust_cycle+"天";
            default : return "-";
        }
    }},
    {title : '审核状态',dataIndex :'status',dataSource: function(data,datarow,gridobj,current_column) {
         var stauts= data[datarow].status;
        switch(stauts){
            case 1:return "待审核";
            case 2:return "审核成功";
            case 3:return "进行中";
            case 4:return "已完成";
            case 5:return "审核失败";
        }
    }},
    {title : '开始时间',dataIndex :'start_time',dataSource: function(data,datarow,gridobj,current_column) {
        var start_time=data[datarow].start_time;
        if(start_time!=null){
            return date_format(start_time,'yyyy-MM-dd');
        }
        return "-";
    }},
    {title : '结束时间',dataIndex :'end_time',dataSource: function(data,datarow,gridobj,current_column) {
        var end_time=data[datarow].end_time;
        if(end_time!=null){
            return date_format(end_time,'yyyy-MM-dd');
        }
        return "-";
    }},
    {title : '募集目标',dataIndex :'raise_target',dataSource: function(data,datarow,gridobj,current_column) {
        var type_id=data[datarow].type_id;
        switch(type_id){
            case TYPE_STOCK:return "<i class='up'>" + format(data[datarow].raise_target==null?0:data[datarow].raise_target/10000,2,"","","")+"</i>万元";
            case TYPE_PRIVATE:return "-";
            case TYPE_ENTRUST: return format(data[datarow].all_amount==null?0:data[datarow].all_amount/10000,2,"","","")+"万元";
            default : return "-";
        }

    }},
    {title : '最小起投',dataIndex :'min_invest',dataSource: function(data,datarow,gridobj,current_column) {
        var type_id=data[datarow].type_id;
        switch(type_id){
            case TYPE_STOCK:return "<i class='down'>" + format(data[datarow].min_invest==null?0:data[datarow].min_invest/10000,2,"","","")+"</i>万元";
            case TYPE_PRIVATE:return "-";
            case TYPE_ENTRUST: return format(data[datarow].min_buy==null?0:data[datarow].min_buy/10000,2,"","","")+"万元";
            default : return "-";
        }
    }},
    /*{title : '上、下架',dataIndex :'on_flag',dataSource: function(data,datarow,gridobj,current_column) {
        var on_flag=data[datarow].on_flag;
        if(on_flag==1){
             return "<span>上架</span>";
        }else if(on_flag==2){
            return "<span>下架</span>";
        }else{
            return "<span>-</span>";
        }
    }},*/
    {title : '操作',dataIndex :'operate',dataSource: function(data,datarow,gridobj,current_column) {
        var operate_content="";
        var type_id=data[datarow].type_id;
        var status= data[datarow].status;
         if(status==1){
             operate_content+="<button id='cancle' name='' value=''>取消申请</button>";
         }else if(status==3){
             if(type_id==TYPE_PRIVATE) {
                 edit_product_id=data[datarow].product_id;
                 operate_content += "<button id='update' name='' value='' onclick='fresh()'>更新信息</button>";
             }
         }else if(status==5){
             operate_content+= "<div class='issue'><img  class='log_img'  src='http://resource-chaogu.b0.upaiyun.com/resources/sg/images/front/member/futures_trade/log.png'><p>"+data[datarow].error_msg+"</p></div>";
         }
        return operate_content;
    }}
];
function start_time_click(){
    //$("form[name='add_form'] .form-error-bottom").hide();
    WdatePicker({dateFmt:'yyyy-MM-dd',minDate:''});
}

function init_grid(){
    var param="product_name="+$('#product_name').val()+"&type_id="+$('#type_id option:selected').val();
    var grid_my = new Grid("/getProductVList",$("#table"),$("#page"),1,10,columns,param,10,callback);
    //初始化
    grid_my.Init();

}

//更新
function fresh(){
    var content = '<form action="/member/product/edit" method="post" name="product_edit" id="product_edit" role="form">' +
                      '<div>' +
                          '<label>更新日期：</label>' +
                          '<input readonly="readonly" type="text" class="Wdate" id="edit_date" name="edit_date" onFocus="start_time_click()" data-verify="empty"  />' +
                      '</div>' +
                      '<div>' +
                          '<label>最新净值：</label>' +
                          '<input id="last_net_value" name="last_net_value" type="text" placeholder="请输入最新净值" data-verify="empty" />' +
                      '</div>' +
                      '<div>' +
                          '<label>累计收益：</label>' +
                          '<input id="all_profit" name="all_profit" type="text" placeholder="请输入累计收益" data-verify="empty" /><span >%</span>' +
                      '</div>' +
                 '</form>';

    popup.create_dom(2,'更新信息',content,'更新','取消',edit,function (){});

    function edit(){
        var form_name = "product_edit";
        $('#btn1').html("更新中...");
        var param="&product_id="+edit_product_id;
        ajax_request(form_name,param,function process_data(data){
            $("#btn1").html("更新");
            //$('#refresh_page').hide();
            popup.create_dom(1,'温馨提示','更新成功','确定','取消',function (){},function (){});
        },function process_fail(){
            $("#btn1").html("更新");
        });
    }
}

function callback(){
    $('#table p').each(function (){
        $(this).css('marginLeft',-parseInt($(this).outerWidth()) / 2);
    });

    $('#table img').hover(function (){
        $(this).next().toggle();
    });
}

$(document).ready(function(){

    init_grid();

    $('#search').on('click',function(){
        init_grid();
    });

    $('#share').on('click',function(){
        var product_ids="";
        $("input[name=checkbox]:checked").each(function(index,element){
            if(product_ids!=""){
                product_ids=product_ids+","+$(this).attr("id");
            }else{
                product_ids=$(this).attr("id");
            }
        });
        if(product_ids.length>0){
            var a_url=location.href;
            if(product_ids.split(",").length==1){
                a_url='/member/product/detail?product_id='+product_ids;
            }else{
                a_url='/member/product/detail_list?product_ids='+product_ids;
            }
            window.open(a_url);
        }else{
            popup.create_dom(1,'提示信息','请选择您需要分享的产品！','确定','取消',function (){},function (){});
        }
    });



});
