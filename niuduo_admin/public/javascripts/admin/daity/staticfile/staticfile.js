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
    popbox.show("/admin/article/addarticle","1000","800",
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
{
    temp_user_obj = grid.date_list[index];
    popbox.show("/admin/daily/staticfile/release","900","800",
        //success
        function(){
            dialog.show(2,"500","500","修改成功","修改成功。","确定","",
                //success
                function(){
                    dataInit();
                }, function(){}, function(){});
        }, function(){}, function(){});

}

//删除公告
function resetanou(index)
{
    temp_user_obj = grid.date_list[index];

    popbox.show("/admin/daily/staticfile/delete","500","500",
        //success
        function(){
            dialog.show(2,"500","500","删除成功","删除成功。","确定","",
                //success
                function(){
                    dataInit();
                }, function(){}, function(){});
        }, function(){}, function(){});

}


var  columns = [
    {title : '编号',dataIndex :'toastid',dataSource:function(data,datarow,gridobj,current_column) {

        return (gridobj.current_page-1)*gridobj.page_rows+datarow+1; }
    },
    {
        title: '标题', dataIndex: 'title', dataSource: function (data, datarow, gridobj, current_column) {

        return "<span>" + urldecode(data[datarow].title) + "</span>";
    }},
    {title : '内容',dataIndex :'content',dataSource: function(data,datarow,gridobj,current_column) {
        var content = data[datarow].content.length >50 ?data[datarow].content.substring(0, 50)+"...":data[datarow].content;
        return "<span>"+ content +"</span>";
    }},
    {title : '所属分类',dataIndex :'catname',dataSource: function(data,datarow,gridobj,current_column) {
        return "<span>"+data[datarow].catname+"</span>";
    }},
    {title : '操作',dataIndex :'top_flag',dataSource: function(data,datarow,gridobj,current_column) {
        return "<input  type='button' onclick='editanou("+datarow+")' class='btn_blue' value='修改'>" +
            "<input onclick='resetanou("+datarow+")'  type='button' class='btn_yellow' value='删除'>";
    }}
];
var style=[{tr_class:function(data,datarow,gridobj){
    if(data[datarow].top_flag == 1){
        return "tr_rack";
    }
}}];

function dataInit(){
    grid = new GridStyle("/showStaticFileAdmin",$("#table_my_simple"),$("#paging_my_toast"),1,8,columns,"",10,style);

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
        popbox.show("/admin/daily/staticfile/release","900","800",
            //success
            function(){
                dialog.show(2,"500","500","添加成功","添加成功。","确定","",
                    //success
                    function(){
                        dataInit();
                    }, function(){}, function(){});
            }, function(){}, function(){});
    });

});


