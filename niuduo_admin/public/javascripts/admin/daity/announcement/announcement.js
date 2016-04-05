/**
 * Created by Administrator on 2015/1/7.
 */
var popbox;
var grid;

var temp_user_obj ;
//编辑
function editarticle(index)
{
    temp_user_obj = grid.date_list[index];
    popbox.show("/admin/article/addarticle","1000","600",
        function(){
            dialog.show(2,"600","800","编辑文件","编辑文件成功。","确定","",
                function(){
                    dataInit();
                },
                function(){},
                function(){});
        },
        function(){},
        function(){});
}

//修改
function editanou(index)
{ console.log(popbox);
    temp_user_obj = grid.date_list[index];
    popbox.show("/admin/daily/announcement/release","900","500",
        //success
        function(){
            dialog.show(2,"500","500","修改成功","公告修改成功。","确定","",
                //success
                function(){
                    dataInit();
                }, function(){}, function(){});
        }, function(){}, function(){});

}
//文章是否设置上架
function setpassed(index)
{
    temp_user_obj = grid.date_list[index];
    popbox.show("/admin/daily/announcement/setpassed","400","300",
        function(){
            dialog.show(2,"400","300","设置成功","上架设置成功。","确定","",
                function(){
                    dataInit();
                },
                function(){},
                function(){});
        },
        function(){},
        function(){});
}
//删除公告
function resetanou(index)
{

    temp_user_obj = grid.date_list[index];

    popbox.show("/admin/daily/announcement/delete","500","500",
        //success
        function(){
            dialog.show(2,"500","500","删除成功","公告删除成功。","确定","",
                //success
                function(){
                    dataInit();
                }, function(){}, function(){});
        }, function(){}, function(){});

}
//置顶
function placedtop(index)
{
    //alert(index);
    $.ajax({
        url:"/topCurrentAnnouncement",
        type:"post",
        data: "infoAnnouncementId="+grid.date_list[index].infoAnnouncementId,
        dataType:'json',
        success: function(data){

            //alert(data.code);
            if(data.code == 1)
            {
                export_api_error(form_name,data.msg);
                //alert(data.msg)
            }
            else
            {
                dialog.show(2,"500","500","修改成功","置顶修改成功。","确定","",
                    //success
                    function(){
                        dataInit();
                    }, function(){}, function(){});
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {

            export_api_error(form_name,textStatus);

        }
    });

}

var  columns = [
    {title : '编号',dataIndex :'toastid',dataSource:function(data,datarow,gridobj,current_column) {

        return (gridobj.current_page-1)*gridobj.page_rows+datarow+1; }
    },
    {
        title: '公告标题', dataIndex: 'title', dataSource: function (data, datarow, gridobj, current_column) {
        var title = data[datarow].title.length >15 ?data[datarow].title.substring(0, 15)+"...":data[datarow].title;
        return "<span>"+title+"</span>";
    }},
    {title : '内容',dataIndex :'content',dataSource: function(data,datarow,gridobj,current_column) {
        var content = data[datarow].content.length >25 ?data[datarow].content.substring(0, 25)+"...":data[datarow].content;
        return "<span>"+ content +"</span>";
    }},
    {title : '摘要',dataIndex :'introduction',dataSource: function(data,datarow,gridobj,current_column) {
        var introduction = data[datarow].introduction.length >20 ?data[datarow].introduction.substring(0, 20)+"...":data[datarow].introduction;
        return "<span>"+ introduction +"</span>";
    }},
    {title : '发布时间',dataIndex :'addtime',dataSource: function(data,datarow,gridobj,current_column) {

        return "<span>"+data[datarow].addtime+"</span>";
    }},
    {title : '是否上架',dataIndex :'passed',dataSource: function(data,datarow,gridobj,current_column) {
        if (data[datarow].passed == "1") {
            return "<span>是</span>";
        }else{
            return "<span>否</span>";
        }
    }},
    {title : '操作',dataIndex :'top_flag',dataSource: function(data,datarow,gridobj,current_column) {
        var flag="";
        if(data[datarow].top_flag == 1){
            flag="取消置顶"
        }else{
            flag="置顶";
        }

        return "<input  type='button' onclick='editanou("+datarow+")' class='btn_blue' value='修改'>" +
            "<input type='button' onclick='placedtop("+datarow+")' class='btn_red' value='"+flag+"'>" +
            "<input onclick='setpassed("+datarow+")'  type='button' class='btn_blue' value='是否上架'>" +
            "<input onclick='resetanou("+datarow+")'  type='button' class='btn_yellow' value='删除'>";

    }}
];
var style=[{tr_class:function(data,datarow,gridobj){
    if(data[datarow].top_flag == 1){
        return "tr_rack";
    }
}}];

function dataInit(){
    grid = new GridStyle("/showAllAnnouncementAdmin",$("#table_my_simple"),$("#paging_my_toast"),1,8,columns,"",10,style);

    //初始化
    grid.Init();
}

$(document).ready(function()    {

    //新建弹出框
    popbox=new Popbox();
    popbox.Init();

    dataInit();



    //添加
    $("#release").bind("click",function(){
        temp_user_obj = null;
        popbox.show("/admin/daily/announcement/release","900","500",
            //success
            function(){
                dialog.show(2,"500","500","添加成功","公告添加成功。","确定","",
                    //success
                    function(){
                        dataInit();
                    }, function(){}, function(){});
            }, function(){}, function(){});
    });

});


