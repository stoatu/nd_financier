/**
 * Created by chogu on 2016/3/14.
 */
var checkdIds="";
var TYPE_STOCK=1;
var TYPE_PRIVATE=2;
var TYPE_ENTRUST=3;
var columns = [
    {title : '',dataIndex :'checkbox',dataSource:function(data,datarow,gridobj,current_column) {
        return "<input id='product_"+data[datarow].product_id+"' name='checkbox' type='checkbox' value='"+data[datarow].product_id+"' onclick='setChkValue(this)' />";
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
    }}
];

function init_grid(){
    var param="status=2";
    var grid_my = new Grid("/getProductVList",$("#table"),$("#page"),1,10,columns,param,1000,setChecked);
    //初始化
    grid_my.Init();

}
function setChecked(){
    if((typeof parent.select_product_ids != "undefined") && (parent.select_product_ids.indexOf("$")!=-1)){
        var ids = parent.select_product_ids.split("$");
        for(var i=0;i<ids.length;i++){
            if(ids[i]>0){
                $("#product_"+ids[i]).attr("checked",true);
            }
        }
        checkdIds = parent.select_product_ids;
    }
}
function setChkValue(thisObj){
    if(thisObj.checked){
        checkdIds += $(thisObj).val() + "$";
    }else{
        if(("$"+checkdIds).indexOf("$"+$(thisObj).val()+"$")!=-1){
            var ids = "$"+ checkdIds;
            ids = ids.replace("$"+$(thisObj).val()+"$","$");
            if(ids.indexOf("$")==0){
                ids = ids.substring(1,ids.length);
            }
            checkdIds = ids;
        }
    }
    if(typeof parent.select_product_ids != "undefined"){
        parent.select_product_ids = checkdIds;
    }
}



$(document).ready(function(){

    init_grid();

});