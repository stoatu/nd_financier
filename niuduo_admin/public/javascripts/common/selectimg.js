

/*
 url :  url
 table_obj：表格对象
 paging_obj：分页对象
 current_page：起始页面
 total_pages：总页面
 column_list：表格 列的列表
 param_list：调用url的参数
 page_rows:一页的数量

 */

function  GridSelect(url,table_obj,paging_obj,current_page,total_pages,column_list,param_list,page_rows)
{

    this.api_url = url; //url
    this.table_obj = table_obj; //表格
    this.paging_obj = paging_obj; //分页
    this.current_page = current_page; //开始页面
    this.total_pages = 1; // total_pages; //总页面
    this.column_list = column_list; //表格 列的列表
    this.param_list = param_list; //默认参数
    this.status = 0; //状态 0 正常 1 载入中
    this.page_rows = page_rows; //一页的数量
    this.date_list ;

    this.callback_render_ready=""; //



    //开始载入
    this.Init = function(){

        //alert(this.api_url);
        //alert(table_obj.attr("id"));
        //alert(paging_obj.attr("id"));

        //初始化表格控件
        //this.init_table();

        //初始化分页控件
        this.init_paging();

        //初始化页面

        this.get_Data(this.current_page);
    };


    //初始化分页控件
    this.init_paging = function()
    {
        this.paging_obj.children('ul').children("li").remove();

        //增加上一页
        //this.paging_obj.children('ul').append("<li dataindex＝\"0\"  class='prepage'>上一页</li>");

        //初始化页面

        for(var i=0;i<=this.total_pages+1;i++)
        {

            //var numLi= "<li class='num'>"+i+"</li>";

            var numLi = document.createElement("li");

            numLi.setAttribute("dataindex",i);

            if(i==0)
            {
                numLi.setAttribute("class","prepage");
                numLi.innerHTML="上一页";
            }
            if(i>0 && i<=this.total_pages)
            {
                numLi.setAttribute("class","li_num");

                numLi.innerHTML=""+i+"";

            }
            if(i>this.total_pages)
            {
                numLi.setAttribute("class","nextpage");
                numLi.innerHTML="下一页";
            }
            this.paging_obj.children('ul').append(numLi);

            if(i>0 && i<this.total_pages)
                this.paging_obj.children('ul').children("li:eq("+i+")").addClass("li_num");


        }
        this.paging_obj.children('ul').children("li:eq("+this.current_page+")").addClass("selected");



        //增加下一页
        // this.paging_obj.children('ul').append("<li dataindex＝\"100\"  class='nextpage'>下一页</li>");

        var thisobj = this;

        this.paging_obj.children('ul').children().each (function() {

            // alert($(this).attr("class"));

            $(this).bind("click",function() {


                //alert($(this).attr("dataindex"));

                var dataindex = $(this).attr("dataindex");
                thisobj.clickLi(dataindex);

            });

        });


    };


    //初始化表格控件
    this.init_table = function()
    {
        table_obj.children().remove();



        var thead = document.createElement("thead");
        var thead_tr = document.createElement("tr");

        for(var i=0;i<this.column_list.length;i++)
        {
            var thead_td = document.createElement("td");
            thead_td.innerHTML = column_list[i].title;
            thead_tr.appendChild(thead_td);


        }
        thead.appendChild(thead_tr);
        table_obj.append(thead);

        //var  tbody= document.createElement("tbody");

        //table_obj.append(tbody);

    }

    //载入一页数据
    this.load_page_data = function(datalist) {

        this.date_list = datalist;
        var data = datalist;
        if (datalist instanceof Array) {

        }
        else {
            var data = new Array();
            data[0] = datalist;
        }
        table_obj.children('tbody').remove();
        //var tbody = table_obj.children('tbody');


        var tbody = document.createElement("tbody");


        for (var t = 0; t < data.length; t++) {


            var tbody_tr = document.createElement("tr");



            for (var i = 0; i < this.column_list.length; i++) {
                var dataindex = this.column_list[i].dataIndex;


                var tbody_td = document.createElement("td");


                if (this.column_list[i].hasOwnProperty("dataSource")) {


                    var datasource_function = this.column_list[i].dataSource;

                    //data,datarow,gridobj,current_column

                    tbody_td.innerHTML = datasource_function(data, t, this, i);
                }
                else
                    tbody_td.innerHTML = data[t][dataindex];


                if(this.column_list[i].hasOwnProperty("td_class")  )
                {

                    tbody_td.setAttribute("class",this.column_list[i].td_class );
                }



                tbody_tr.appendChild(tbody_td);
            }

            tbody.appendChild(tbody_tr);


        }

        table_obj.append(tbody);

       // alert(this.callback_render_ready);
        if (this.callback_render_ready!="") {
            this.callback_render_ready();
        }


    }

    //切换分页控件的选择
    this.changePageShow=function(newpageindex)
    {

        this.paging_obj.children('ul').children("li:eq("+this.current_page+")").removeClass("selected");
        this.paging_obj.children('ul').children("li:eq("+newpageindex+")").addClass("selected");

        this.current_page = newpageindex;

    }


    //获取数据接口
    this.get_Data = function(pageindex){

        var final_param = param_list+"&page="+pageindex+"&rows="+page_rows;


        this.status = 1;

        var thisobj = this;

        $.ajax({
            url:this.api_url,
            type:"post",
            data: final_param,
            dataType:'json',
            success: function(data){

               // alert(data.code);

                if(data.code == 1)
                {
                    alert(data.msg);

                }
                else
                {
                    if(data.hasOwnProperty("total") )
                    {
                       // console.log(data.total);

                        var total_page_num = get_page_num(data.total,thisobj.page_rows) ;



                        if(total_page_num != thisobj.total_pages)
                        {
                            thisobj.total_pages = total_page_num;

                            thisobj.init_paging();
                        }

                    }



                    //alert(data.msg);
                    //alert(data.data.length);
                    //alert(data.data.login_name);
                    thisobj.changePageShow(pageindex);
                    thisobj.load_page_data(data.data);


                }

                this.status = 0;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {

                this.status = 0;



            }
        });


    }


    //点击li时间
    this.clickLi=function(num)
    {

        //alert(num);
        //上一页
        if(num ==0)
        {
            if(this.current_page>1)
            {
                num=this.current_page-1;
            }
            else
            {
                return;
            }

        }

        //下一页

        if(num > this.total_pages)
        {
            //alert(this.current_page);
            //alert(this.total_pages);
            if(this.current_page<this.total_pages)
            {
                //alert(this.current_page);
                num = this.current_page+1;
            }
            else
            {
                return;
            }
        }

        //alert(num);
        this.get_Data(num);
    }


}


