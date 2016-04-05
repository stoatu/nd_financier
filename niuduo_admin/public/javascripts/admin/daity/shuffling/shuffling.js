/**
 * Created by Administrator on 2015/1/13.
 */

var popbox;
var grid;

var temp_user_obj ;

//修改
function eidtimg(index)
{
    temp_user_obj = grid.date_list[index];

    popbox.show("/admin/daily/shuffling/editimg","1000","700",
        //success
        function(){
            dialog.show(2,"500","500","修改成功","图片修改成功。","确定","",
                //success
                function(){
                    dataInit();
                }, function(){}, function(){});
        }, function(){}, function(){});

}

//下移
function downimg(index)
{
    $.ajax({
        url:"/downAdminDiagram",
        type:"post",
        data: "diagram_sort="+grid.date_list[index].diagram_sort,
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
                dialog.show(2,"500","500","下移成功","图片下移成功。","确定","",
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

//上移
function upimg(index)
{
    $.ajax({
        url:"/upAdminDiagram",
        type:"post",
        data: "diagram_sort="+grid.date_list[index].diagram_sort,
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
                dialog.show(2,"500","500","上移成功","图片上移成功。","确定","",
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

//删除
function deleteimg(index)
{
    temp_user_obj = grid.date_list[index];

    popbox.show("/admin/daily/shuffling/deleteimg","500","500",
        //success
        function(){
            dialog.show(2,"500","500","删除成功","图片删除成功。","确定","",
                //success
                function(){
                    dataInit();
                }, function(){}, function(){});
        }, function(){}, function(){});
}

var  columns = [
    {dataIndex :'toastid',dataSource:function(data,datarow,gridobj,current_column) {

        return (gridobj.current_page-1)*gridobj.page_rows+datarow+1; }
    },
    {dataIndex: 'diagram_url', dataSource: function (data, datarow, gridobj, current_column) {
        var linkurl=data[datarow].linkurl;
        if(linkurl==null||linkurl==""||linkurl=="null" ||linkurl==" "){
            linkurl="";
        }
        return "&nbsp;&nbsp; <img class='imglist' src='" + data[datarow].diagram_url + "' ><br />跳转链接:"+ linkurl;
    }},
    //{dataIndex: 'linkurl', dataSource: function (data, datarow, gridobj, current_column) {
    //    if(data[datarow].linkurl==null||data[datarow].linkurl==""||data[datarow].linkurl=="null" ||data[datarow].linkurl==" "){
    //        return "<span></span>";
    //    }else{
    //        return "<span>跳转链接:"+ data[datarow].linkurl+"</span>";
    //    }
    //
    //}},
    {dataIndex :'createdDate',dataSource: function(data,datarow,gridobj,current_column) {
        if(datarow == 0)
        {
            return "<div class='td-top'><button onclick='eidtimg("+datarow+")' class='btn btn-red btn-long'>点击修改</button></div>" +
                "<div class='td-buttom'><button onclick='downimg("+datarow+")' class='btn btn-blue btn-long'>下移</button></div>" +
                "<div class='td-buttom'><button onclick='deleteimg("+datarow+")' class='btn btn-orange btn-long'>删除</button></div>";
        }else if((data.length-1) == datarow){
            return "<div class='td-top'><button onclick='eidtimg("+datarow+")' class='btn btn-red btn-long'>点击修改</button></div>" +
                "<div class='td-buttom'><button onclick='upimg("+datarow+")' class='btn btn-yellow btn-long'>上移</button></div>" +
                "<div class='td-buttom'><button onclick='deleteimg("+datarow+")' class='btn btn-orange btn-long'>删除</button></div>";
        }else{
            return "<div class='td-top'><button onclick='eidtimg("+datarow+")' class='btn btn-red btn-long'>点击修改</button></div>" +
                "<div class='td-buttom'><button onclick='upimg("+datarow+")' class='btn btn-yellow btn-store'>上移</button>" +
                "<button onclick='downimg("+datarow+")' class='btn btn-blue btn-store btn-marginleft'>下移</button></div>" +
                "<div class='td-buttom'><button onclick='deleteimg("+datarow+")' class='btn btn-orange btn-long'>删除</button></div>";
        }
    }}
   /* , {dataIndex :'org_id',dataSource: function(data,datarow,gridobj,current_column) {
        return "<div class='delimg'><img onclick='deleteimg("+datarow+")' src='http://resource-chaogu.b0.upaiyun.com/resources/images/admin/login/close.png'></div>";

    }}*/
];

function dataInit(){
    grid = new GridSelect("/showAllAdminDiagram",$("#table_img_list"),$("#paging_my_toast"),1,8,columns,"",10,"");

    //初始化
    grid.Init();
}

$(document).ready(function() {

    //新建弹出框
    popbox=new Popbox();
    popbox.Init();

    dataInit();

    //添加
    $("#addimg").bind("click",function(){

        popbox.show("/admin/daily/shuffling/addimg","1000","700",
            //success
            function(){
                dialog.show(2,"500","500","添加成功","图片添加成功。","确定","",
                    //success
                    function(){
                        dataInit();
                    }, function(){}, function(){});
            }, function(){}, function(){});
    });


})