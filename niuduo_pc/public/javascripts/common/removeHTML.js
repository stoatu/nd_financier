function removeHTMLTag(str,str_length) {
    var st_len = str_length || 80;
    if(typeof(str)!="undefined"){
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str = str.replace(/(\t)/g, "");
    //str=str.replace(/ /ig,'');//去掉
    str=str.length>st_len?str.substring(0,st_len)+"...":str;
    }
    //str = str.replace(/\s+/g,"");
    return str;
}
function removeTag(str) {
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str = str.replace(/(\t)/g, "");
    //str=str.replace(/ /ig,'');//去掉
    //str = str.replace(/\s+/g,"");
    return str;
}