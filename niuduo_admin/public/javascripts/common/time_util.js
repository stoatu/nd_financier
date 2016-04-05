/**
 * Created by chogu on 2015/8/20.
 */


function formatTime(time){
    var lastupdatetime="";
    if(time!=null&&time!=''){
        var last_update_time=new Date(Date.parse(time.replace(/-/g,"/")));
        var  hour=(new Date().getTime()-last_update_time.getTime())/(1000*60*60);//最近更新时间到现在多少小时
        if(hour<=24){
            lastupdatetime=parseInt(hour)+"小时前";
        }else if(hour>24&&hour<=24*30){
            lastupdatetime=parseInt(hour/24)+"天前";
        }else if(hour>720){
            lastupdatetime=parseInt(hour/720)+"月前";
        }
    }

    return lastupdatetime;
}

function getTimeMi(date){

    var date_new=new Date(Date.parse(date.replace(/-/g,"/")));
    //date_new.setHours(date_new.getHours()+8);
    return date_new.getTime();
}

function new_date(date){
    date = date.substring(0,10);
    var flag = true;
    var dateArray = date.split("-");
    if (dateArray.length != 3) {
        dateArray = date.split("/");
        if (dateArray.length != 3) {
            return null;
        }
        flag = false;
    }
    var newDate = new Date();
    if (flag) {
        newDate.setFullYear(dateArray[0], dateArray[1] - 1, dateArray[2]);
    }
    else {
        newDate.setFullYear(dateArray[2], dateArray[1] - 1, dateArray[0]);
    }
    newDate.setHours(0, 0, 0);
    return newDate;

}

function date_format(date_in,format){
    var date=new Date(Date.parse(date_in.replace(/-/g,"/")));
    var o = {
        "M+" : date.getMonth()+1, //month
        "d+" : date.getDate(), //day
        "h+" : date.getHours(), //hour
        "m+" : date.getMinutes(), //minute
        "s+" : date.getSeconds(), //second
        "q+" : Math.floor((date.getMonth()+3)/3), //quarter
        "S" : date.getMilliseconds() //millisecond
    }

    if(/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    }

    for(var k in o) {
        if(new RegExp("("+ k +")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
}



/*获取输入时间与当前时间的时间差
* */
function date_sub(_date1){
    if(_date1==''||_date1=='null'||_date1=='undefined'||_date1==null||typeof(_date1)=='undefined'){
        _date1=new Date();
    }
    var date1=new Date();  //开始时间
    var date2=new Date(_date1);    //结束时间
    var date3=date2.getTime()-date1.getTime()  //时间差的毫秒数

//计算出相差天数
    var days=Math.floor(date3/(24*3600*1000))

    if(days<0){
        return "已结束";
    }
    //var days=sub_day(_date1);
//计算出小时数

    var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
    var hours=Math.floor(leave1/(3600*1000))
//计算相差分钟数
    var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
    var minutes=Math.floor(leave2/(60*1000))
//计算相差秒数
    var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
    var seconds=Math.round(leave3/1000)
    return days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒";
}
/*
function sub_day(_date1){
    if(_date1==''||_date1=='null'||_date1=='undefined'||_date1==null||typeof(_date1)=='undefined'){
        _date1=Date.parse(getNowDateStr(-1).replace(/-/g,"/"));
    }
    var date1=new Date(Date.parse(_date1.replace(/-/g,"/")));  //开始时间
    var date2=new Date();    //结束时间
    return sub_day(date2,date1);
}*/

function sub_day(_date1,_date2){
    if(_date1==''||_date1=='null'||_date1=='undefined'||_date1==null||typeof(_date1)=='undefined'){
        _date1=getNowDateStr(-1);
    }
    if(_date2==''||_date2=='null'||_date2=='undefined'||_date2==null||typeof(_date2)=='undefined'){
        _date2=getNowDateStr(-1);
    }
    var date1=new Date(Date.parse(_date1.replace(/-/g,"/")));
    var date2=new Date(Date.parse(_date2.replace(/-/g,"/")));
    var date3=date1.getTime()-date2.getTime()  //时间差的毫秒数

//计算出相差天数
    var days=Math.ceil(date3/(24*3600*1000));
    if(days<0){
        return 0;
    }
    return days;
}


function getNowDateStr(type){
    var now=new Date();
    var dateStr=now.getFullYear()+"/"+(now.getMonth()+1)+"/"+now.getDate();
    var dateEnd=" 09:00:01";
    if(type==1){ //获取结束日期
        dateEnd=" 14:59:59";
    }else if(type==0){
        dateEnd=" 09:00:01";
    }else{
        return dateStr+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
    }
    return dateStr+dateEnd;
}
