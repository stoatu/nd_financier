/**
 * Created by chogu on 2016/3/14.
 */
var checkdIds="";
var columns = [
    {title : '',dataIndex :'checkbox',dataSource:function(data,datarow,gridobj,current_column) {
        return "<input id='article_"+data[datarow].info_id+"' name='checkbox' type='checkbox' value='"+data[datarow].info_id+"'onclick='setChkValue(this)' />";
    }},
    {title : '标题',dataIndex :'title',dataSource:function(data,datarow,gridobj,current_column) {
        return data[datarow].title;
    }},
    /*{title : '内容',dataIndex :'content',dataSource:function(data,datarow,gridobj,current_column) {
        return data[datarow].content.length>30?data[datarow].content.substring(0,30):data[datarow].content;
    }},*/
    {title : '文章类型',dataIndex :'info_category_id',dataSource: function(data,datarow,gridobj,current_column) {
        var categoryName="";
        if(data[datarow].info_category_id==1){
            categoryName="新闻";
        }else if(data[datarow].info_category_id==2){
            categoryName="财经";
        }
        return categoryName;
    }},
    {title : '发布时间',dataIndex :'releasetime',dataSource: function(data,datarow,gridobj,current_column) {
        var start_time=data[datarow].releasetime;
        if(start_time!=null){
            return date_format(start_time,'yyyy-MM-dd');
        }
        return "-";
    }},

    {title : '状态',dataIndex :'passed',dataSource: function(data,datarow,gridobj,current_column) {
        var on_flag=data[datarow].passed;
        if(on_flag==1){
            return "<span>上架</span>";
        }else if(on_flag==2){
            return "<span>用户已删除</span>";
        }else{
            return "<span>审核未通过</span>";
        }
    }},
    {title : '点击量',dataIndex :'clicknum',dataSource: function(data,datarow,gridobj,current_column) {
        return data[datarow].clicknum;
    }}
];

function init_grid(){
    //var param="title="+$('#searchtitle').val()+"&type_id="+$('#type_id option:selected').val();
    var param="passed=1";
    var grid_my = new Grid("/getArticleVList",$("#table"),$("#page"),1,10,columns,param,1000,setChecked);
    //初始化
    grid_my.Init();

}
function setChecked(){
    if((typeof parent.select_article_ids != "undefined") && (parent.select_article_ids.indexOf("$")!=-1)){
        var ids = parent.select_article_ids.split("$");
        for(var i=0;i<ids.length;i++){
            if(ids[i]>0){
                $("#article_"+ids[i]).attr("checked",true);
            }
        }
        checkdIds = parent.select_article_ids;
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
    if(typeof parent.select_article_ids != "undefined"){
        parent.select_article_ids = checkdIds;
    }
}


$(document).ready(function(){
    init_grid();
});