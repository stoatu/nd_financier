/**
 * Created by chogu on 2016/3/16.
 */
var TYPE_STOCK=1;//私募股权
var TYPE_PRIVATE=2;//阳光私募
var TYPE_ENTRUST=3;//信托资管
var verify_product_id = 0 ;
var popbox;
var columns = [
    {title : '产品名称',dataIndex :'product_name',dataSource:function(data,datarow,gridobj,current_column) {

        return  data[datarow].product_name;
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
            case TYPE_STOCK:return format(data[datarow].raise_target==null?0:data[datarow].raise_target/10000,2,"","","")+"万元";
            case TYPE_PRIVATE:return "-";
            case TYPE_ENTRUST: return format(data[datarow].all_amount==null?0:data[datarow].all_amount/10000,2,"","","")+"万元";
            default : return "-";
        }

    }},
    {title : '最小起投',dataIndex :'min_invest',dataSource: function(data,datarow,gridobj,current_column) {
        var type_id=data[datarow].type_id;
        switch(type_id){
            case TYPE_STOCK:return format(data[datarow].min_invest==null?0:data[datarow].min_invest/10000,2,"","","")+"万元";
            case TYPE_PRIVATE:return "-";
            case TYPE_ENTRUST: return format(data[datarow].min_buy==null?0:data[datarow].min_buy/10000,2,"","","")+"万元";
            default : return "-";
        }
    }},
    {title : '上、下架',dataIndex :'on_flag',dataSource: function(data,datarow,gridobj,current_column) {
        var on_flag=data[datarow].on_flag;
        if(on_flag==1){
            return "<span>上架</span>";
        }else if(on_flag==2){
            return "<span>下架</span>";
        }else{
            return "<span>-</span>";
        }
    }},
    {title : '操作',dataIndex :'operate',dataSource: function(data,datarow,gridobj,current_column) {
        var operate_content="";
        var status= data[datarow].status;
        if(status==1){
            operate_content+="<button id='cancle' name='' value='' onclick='verify(\""+data[datarow].product_id+"\")'>审核</button>";
        }
        return operate_content;
    }}
];

function init_grid(){
    var param="product_name="+$('#product_name').val()+"&type_id="+$('#type_id option:selected').val()+"&status="+$('#status option:selected').val();
    var grid_my = new Grid("/admin/getProductVList",$("#table"),$("#page"),1,10,columns,param,10);
    //初始化
    grid_my.Init();
}

function verify(product_id){
    verify_product_id = product_id;
    popbox.show("/admin/product/verify","500","500",
        function(){
            dialog.show(2,"500","500","温馨提示","操作成功。","确定","",
                function(){
                    init_grid();
                }, function(){}, function(){});
        }, function(){}, function(){});
}


$(document).ready(function(){

    popbox = new Popbox();
    popbox.Init();

    init_grid();

    $('#search').on('click',function(){
        init_grid();
    });



});