/**
 * Created by cxj on 1/5/15.
 */

/*
 url :  url
 table_obj：select对象

 var columns =
 {name_title : '银行',name_dataIndex :'bank_name',value_title : '银行',value_dataIndex :'bank_id',name_dataSource:function(data,datarow,selectobj){

 return "haha";

 },value_dataSource:function(data,datarow,selectobj){

 return "haha";

 }};

 */

function  Select_Grid(url,select_obj,column_list,param_list)
{

    this.api_url = url; //url
    this.param_list = param_list; //默认参数
    this.status = 0; //状态 0 正常 1 载入中
    this.column_list = column_list; //表格 列的列表
    this.select_obj = select_obj;
    this.default_value = "";
    this.datalist;
    this.callback_render_ready=""; //
    this.init_complete_obj=""; //初始化回调


    //开始载入
    this.Init = function(init_complete){
        //alert("load");

        //初始化页面

        this.get_Data(param_list);

        this.init_complete_obj = init_complete;


        var callbak_obj = init_complete;


        if(init_complete == "")
        return;

        //callbak_obj();

    };



    //刷新
    this.ReloadData = function(paramstr,reload_complete){


        this.get_Data(paramstr);

        if(reload_complete == "")
            return;

        var callbak_obj = reload_complete;

        callbak_obj();

    };



    //获取数据接口
    this.get_Data = function(final_param){




        this.status = 1;

        var thisobj = this;

        $.ajax({
            url:this.api_url,
            type:"post",
            data: final_param,
            dataType:'json',
            success: function(data){



                if(data.code == 1)
                {
                    alert(data.msg);

                }
                else
                {


                    thisobj.load_page_data(data.data);


                }

                this.status = 0;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {

                this.status = 0;



            }
        });


    }

    //载入一页数据
    this.load_page_data = function(data)
    {
        this.datalist = data;

        //alert(this.datalist.length);
        select_obj.children().remove();




        var name_data_index =  this.column_list.name_dataIndex;
        var value_data_index =  this.column_list.value_dataIndex;

        //select_obj.append("<option value='-1'>全部</option>");

        for(var i=0;i<data.length;i++)
        {
            var name = "name";
            var value = "value";


            // name

            if(this.column_list.hasOwnProperty("name_dataSource")  )
            {

                var datasource_function = this.column_list.name_dataSource;

                name = datasource_function(data,i,this);

            }
            else
            {
                name = data[i][name_data_index];
            }

            //value

            if(this.column_list.hasOwnProperty("value_dataSource")  )
            {
                var value_dataSource = this.column_list.value_dataSource;

                value = value_dataSource(data,i,this);

            }
            else
            {
                value = data[i][value_data_index];
            }






            select_obj.append("<option value='"+value+"'>"+urldecode(name)+"</option>");
        }


        if(this.default_value == "")
        {

        }
        else
        {
            this.select_by_value(this.default_value);
        }

        // alert(this.callback_render_ready);
        if (this.callback_render_ready!="") {
            this.callback_render_ready();
        }


        var callbak_obj =  this.init_complete_obj;

        if(callbak_obj != "")
        {
            callbak_obj();
        }


    }


    //选择对应数据接口
    this.select_by_value = function(value){
        //alert(value);
        this.select_obj.children("option[value='"+value+"']").attr("selected",true);

    }

}
function urldecode (str) {
    str = (str + '').toString();

    return decodeURIComponent(str);
}
