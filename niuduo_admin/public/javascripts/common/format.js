/*
 num 数字
 digit_num 小数位数

 unit 1 个位  1000 千 10000 万
 unit_name 单位名 千，万
 process_function 处理方法

//sample
format(1000,2,1,'', function(num,digit_num,unit,unit_name,return_value){ return <span>"return_value"; })


 format(1000,2,1,'', function(num,digit_num,unit,unit_name,'')
 <script> document.write(format(<%= datainfo.account_freeze %>,2,1,'', '') );</script>

 dataSource:function(data,datarow,gridobj,current_column) {  return format(data[datarow].comm_account ,2,1,'', '')   }

 */

function format(num,digit_num,unit,unit_name,process_function)
{
    var value = parseFloat(num);



    //unit 单位转换
    if(unit>1)
        value = value / unit;


    //保留小数

    //如果是0位
    if(digit_num == 0)
        value = value.toFixed(digit_num);
    else
    {
       // alert(num);
        var divide_num = 100*digit_num;

       // alert(Math.floor(num*100));

        value = Math.floor(num*100)/100;


        value = value.toFixed(digit_num);

    }



    //加上单位
    if(unit>1)
        value = value +unit_name;

    //回调函数

    if(process_function == "")
        return value;
    else
    {
        var obj = process_function;

        return  obj(num,digit_num,unit,unit_name,value);
    }
}



function format_old(num,digit_num,unit,unit_name,process_function)
{
    var value = parseFloat(num);



    //unit 单位转换
    if(unit>1)
        value = value / unit;


    //保留小数

    //如果是0位
    if(digit_num == 0)
        value = value.toFixed(digit_num);
    else
    {



        value = value.toFixed(digit_num);

    }



    //加上单位
    if(unit>1)
        value = value +unit_name;

    //回调函数

    if(process_function == "")
        return value;
    else
    {
        var obj = process_function;

        return  obj(num,digit_num,unit,unit_name,value);
    }
}


function positiveandnegative(num){
    if(num>0){
        return "red";
    }else if(num<0){
        return "green";
    }
}

function text_color_yellow(){
    return "yellow";
}


function percentFormat(num,digit_num){
 if(num==null||num=='null'||num==undefined||typeof(num)=='undefined'||num==''){
     num=0;
 }
  var value = parseFloat(num);

  value=value*100;

    if(value>0){
        return "<i style='font-style:normal;color: #ff4f3a;'>"+parseFloat(value.toFixed(digit_num))+"%</i>";
    }else if(value<0){
        return  "<i style='font-style:normal;color: green;'>"+ parseFloat(value.toFixed(digit_num))+"%</i>";
    }else{
        return   "<i style='font-style:normal;color: grey;'>"+parseFloat(value.toFixed(digit_num))+"%</i>";
    }
}

function percentFormat2(num,digit_num){
    if(num==null||num=='null'||num==undefined||typeof(num)=='undefined'||num==''){
        num=0;
    }
    var num=isNullForamt2(num);
    var value = parseFloat(num);

    value=value*100;

    return parseFloat(value.toFixed(digit_num));

}

function addFloat(num1,num2,digit_num){
    var value1 = parseFloat(num1);
    var value2 = parseFloat(num2);
    var value=value1+value2;
    return  parseFloat(value.toFixed(digit_num));
}

function isNullFormat(_in){
    if(typeof(_in)=='undefined'||_in=='null'||_in==undefined ||_in==null){
         return '-';
    }else{
        return _in;
    }

}

function isNullFormat2(_in){
    if(typeof(_in)=='undefined'||_in=='null'||_in==undefined ||_in==null){
        return 0;
    }else{
        return _in;
    }
}


function isNullFormatPercent(_in,digit_num){
    if(typeof(_in)=='undefined'||_in=='null'||_in==undefined ||_in==null||_in==''){
        return '-';
    }else{
        return (parseFloat(_in)*100).toFixed(digit_num)+"%";
    }

}

function format_toFix(num,ratio,digit_num){
   return num*ratio.toFixed(digit_num);
}

function add_data(_data1,_data2){
    if(_data1==''){
        _data1=0;
    }
    if(_data2==''){
        _data2=0;
    }
    var data1=parseInt(_data1);
    var data2=parseInt(_data2);

    return data1+data2;
}

function sub_data(_data1,_data2){
    if(_data1==''){
        _data1=0;
    }
    if(_data2==''){
        _data2=0;
    }
    var data1=parseInt(_data1);
    var data2=parseInt(_data2);
    if(data1<data2){
        return 0;
    }
    return data1-data2;
}

function sub_data_float(_data1,_data2,digit_num){
    if(_data1==''||_data1=='null'||typeof(_data1)=='undefined'||_data1==null||typeof(_data1)=='undefined'){
        _data1=0;
    }
    if(_data2==''||_data2=='null'||typeof(_data2)=='undefined'||_data2==null||typeof(_data2)=='undefined'){
        _data2=0;
    }
    var data1=parseFloat(_data1);
    var data2=parseFloat(_data2);
    if(data1<data2){
        return 0;
    }
    return (data1-data2).toFixed(digit_num);
}

function data_div(_data1,_data2,digit_num){
    if(_data1==''||_data1=='null'||typeof(_data1)=='undefined'||_data1==null||typeof(_data1)=='undefined'){
        _data1=0;
    }
    if(_data2==''||_data2=='null'||typeof(_data2)=='undefined'||_data2==null||typeof(_data2)=='undefined'){
        return 0;
    }

    return (parseFloat(_data1)/parseFloat(_data2)).toFixed(digit_num);

}