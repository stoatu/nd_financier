/**
 * Created by chogu on 2016/3/14.
 */

var columns = [
    {title : '',dataIndex :'checkbox',dataSource:function(data,datarow,gridobj,current_column) {
        return "<input id='"+data[datarow].info_id+"' name='checkbox' type='checkbox' value='"+data[datarow].info_id+"' />";
    }},
    {title : '标题',dataIndex :'title',dataSource:function(data,datarow,gridobj,current_column) {
        var a_url='/member/article/detail?info_id='+ data[datarow].info_id;
        return "<a onclick='window.open(\""+a_url+"\")'>"+ data[datarow].title +"</a>";

    }},
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
    }},
    {title : '操作',dataIndex :'operate',dataSource: function(data,datarow,gridobj,current_column) {
        return "<font class='operation' onclick=\"editarticle('"+ data[datarow].info_id +"')\">修改</font> " +
            "<font class='operation' onclick=\"delarticle('"+ data[datarow].info_id +"')\"> 删除</font> " ;
    }}
];
//删除
function delarticle(index){
    $.ajax({
        url:"/member/article/delete",
        type:"post",
        data: "info_id="+index,
        dataType:'json',
        success: function(data){
            if(data.code == 1){
                // dialog.show(2,"500","500","温馨提醒",data.msg,"确定","", function(){}, function(){}, function(){});
                alert(data.msg);
            }else{
                //dialog.show(2,"500","500","温馨提示","删除成功","确定", function(){}, function(){dataInit();}, function(){});
                alert("删除成功");
                init_grid();
            }
            this.status = 0;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            this.status = 0;
        }
    });
}
//修改
function editarticle(index){
    window.location = "/member/article/addArticle?info_id="+index;
}
function init_grid(){
    //var param="title="+$('#searchtitle').val()+"&type_id="+$('#type_id option:selected').val();
    var param="title="+$('#searchtitle').val();
    var grid_my = new Grid("/getArticleVList",$("#table"),$("#page"),1,10,columns,param,10);
    //初始化
    grid_my.Init();
}


$(document).ready(function(){
    init_grid();

    $("#search").click(function(){
        init_grid();
    });

    $('#share').on('click',function(){
        var info_ids="";
        $("input[name=checkbox]:checked").each(function(index,element){
            if(info_ids!=""){
                info_ids=info_ids+","+$(this).attr("id");
            }else{
                info_ids=$(this).attr("id");
            }
           // alert(info_ids);
        });
        if(info_ids.length>0){
            var a_url=location.href;
            if(info_ids.split(",").length==1){
                a_url='/member/article/detail?info_id='+info_ids;
            }else{
                a_url='/member/article/detail_list?info_ids='+info_ids;
            }
            window.open(a_url);
        }else{
            popup.create_dom(1,'提示信息','请选择您需要分享的产品！','确定','取消',function (){},function (){});
        }
    });

});