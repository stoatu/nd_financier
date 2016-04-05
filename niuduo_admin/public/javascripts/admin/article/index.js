/**
 * Created by chogu on 2016/3/16.
 */
var TYPE_STOCK=1;//私募股权
var TYPE_PRIVATE=2;//阳光私募
var TYPE_ENTRUST=3;//信托资管
var verify_product_id = 0 ;
var popbox;
var columns = [
    {title : '标题',dataIndex :'title',dataSource:function(data,datarow,gridobj,current_column) {
        return data[datarow].title;
    }},
    {title : '内容',dataIndex :'content',dataSource:function(data,datarow,gridobj,current_column) {
        return data[datarow].content.length>30?data[datarow].content.substring(0,30):data[datarow].content;
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
        var operate_content="";
        var status= data[datarow].passed;
        /*if(status==1){*/
            operate_content+="<button id='cancle' name='' value='' onclick='verify(\""+data[datarow].info_id+"\")'>审核</button>";
       /* }else if(status==0){
            operate_content+="<button id='cancle' name='' value='' onclick='verify(\""+data[datarow].product_id+"\")'>审核通过</button>";
        }*/
        return operate_content;
    }}
];

function init_grid(){
    var param="title="+$('#title').val()+"&info_category_id="+$('#info_category_id option:selected').val()+"&passed="+$('#passed option:selected').val();
    var grid_my = new Grid("/admin/getArticleVList",$("#table"),$("#page"),1,10,columns,param,10);
    //初始化
    grid_my.Init();
}

function verify(info_id){
    verify_product_id = info_id;
    popbox.show("/admin/article/verify","500","500",
        function(){
            dialog.show(2,"500","500","温馨提示","操作成功。","确定","",
                function(){
                    init_grid();
                }, function(){}, function(){});
        }, function(){}, function(){});
}

/*function verify(info_id){
    $('#verify').css('display','block');
    $('#success').on('click',function(){
        var param="passed=1&info_id="+info_id+"&createdBy="+$('#error_msg').val();
        verify2(param);
    });

    $('#failed').on('click',function(){
        var param="passed=0&info_id="+info_id+"&createdBy="+$('#error_msg').val();
        verify2(param);
    });
}*/

function verify2(param){
    $.ajax({
        url:'/member/article/updateArticle',
        data:param,
        type:'post',
        dataType:'json',
        success:function(data){
            if(data.code==0){
                alert("审核完成！");
                $('#verify').css('display','none');
                init_grid();
            }else{
                alert("审核失败！");
            }
        },
        error:function(){
            alert("数据调用失败");
        }
    });
}

$(document).ready(function(){
    init_grid();
    popbox = new Popbox();
    popbox.Init();
    $('#search').on('click',function(){
        init_grid();
    });

});