
var crypto = require('crypto');
var httpconf = require('data-proxy/lib/httpconf');
var img_prefix = "http://resource-chaogu.b0.upaiyun.com/resources/"; //图片资源

var upyun_callback_url =httpconf.httpconf_web_url;//前端
var upyun_callback_url_admin = httpconf.httpconf_admin_url;//后台

exports.get_cookie_info = function(req){
    if(req.cookies.mobile != "")
    {
        req.cookies.mobile =  hide_mobile(req.cookies.mobile);
    }
    else
    {
        req.cookies.mobile =  req.cookies.user_id;
    }

    if(req.cookies.nickname == ""){
        req.cookies.nickname = req.cookies.mobile;
    }
    return req.cookies;
}

exports.get_real_cookie_info = function(req){
    return req.cookies;
}

function hide_mobile(mobile){
    if(mobile==null)
        return mobile;
    if(mobile.length >=11)
        return mobile.substr(0,3)+"****"+ mobile.substr(7,4);
    else
        return  mobile;
}

exports.get_main_layout_path = function(){
    return "layout";
}


exports.get_param_array = function(req,res){
    var common_info_array=Array()

    //推广链接
    var recommenderid = "-1";
    common_info_array["spread_url"] = "";
    if(req.param("u")!= "" && req.param("u")!= null)
    {
        common_info_array["spread_url"] = "?u="+req.param("u");
        res.setHeader("Set-Cookie", ["u="+req.param("u")]);
        recommenderid =  req.param("u");
    }
    else
    {
        if(req.cookies.u != "" && req.cookies.u != null )
        {
            recommenderid = req.cookies.u;
            common_info_array["spread_url"] = "?u="+req.cookies.u;
        }
    }

    var url_u="";
    common_info_array["previous_url"] = "";
    if(req.param("u_url")!= "" && req.param("u_url")!= null)
    {
        common_info_array["previous_url"] = req.param("u_url");
        url_u= req.param("u_url");
        res.setHeader("Set-Cookie", ["previous_url="+req.param("u_url")]);
        //recommenderid =  req.param("u_url");
    }
    else
    {
        if(req.cookies.previous_url != "" && req.cookies.previous_url != null )
        {
            //recommenderid = req.cookies.previous_url;
            common_info_array["previous_url"] = req.cookies.previous_url;
        }
    }

    common_info_array["backUrl"]="http://"+httpconf.host+":"+httpconf.port+httpconf.root;
    //推荐用户
    common_info_array["recommenderid"] = recommenderid; //默认为－1
    //prefix img
    common_info_array["img_prefix"] = img_prefix;
    common_info_array["avatar_upyun"] = this.get_upyun_array(this.randompic(),"avatar-chaogu");
    return  common_info_array;
}

exports.randompic = function  () {
    var final_pic = "/nd/"
    var timestamp = (new Date()).valueOf();
    final_pic = final_pic+timestamp+"/";
    var pic = Math.floor(Math.random()*10+1);
    final_pic  = final_pic + pic +".jpg";
    return final_pic;
}

exports.randompicnew = function  (str) {
    var final_pic = "/nd/"
    var timestamp = (new Date()).valueOf();
    final_pic = final_pic+timestamp+"/";
    var pic = Math.floor(Math.random()*10+1);
    final_pic  = final_pic + pic +str+".jpg";
    return final_pic;
}

exports.urlencode = function  (str) {
    str = (str + '').toString();
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
        replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

exports.urldecode =function(str) {
    str = (str + '').toString();
    return decodeURIComponent(str);
}

exports.get_upyun_array = function(picpath,bucket) {

    var upyun_info_array = Array();
    var form_api_secret_realname = '2NyJqkzBX0u5pQ7dAZBvcgb7JSI='; //api key 身份证空间
    var form_api_secret_avatar = '4SN1uFPmTKxh1W44K0mSVuREeGE='; //api key 头像空间
    var form_api_secret_resource = 'AUDWBpSAMOwH7IOnKMKREvEEsFY='; //api key 资源空间
    var form_api_secret = form_api_secret_realname;
    if(bucket == "avatar-chaogu")
        form_api_secret = form_api_secret_avatar;
    if(bucket == "resource-chaogu")
        form_api_secret = form_api_secret_resource;
    var timestamp = (new Date()).valueOf();
    var base_time = parseFloat(timestamp)/1000;
    var expiration = parseInt(base_time+parseFloat(6000));
    //var expiration = 1427363311;
    var return_url = upyun_callback_url+'/upyun/callback';
    if(bucket == "resource-chaogu")
        return_url = upyun_callback_url_admin+'/upyun/callback';
    var  options_array = "{\"bucket\":\""+bucket+"\",\"expiration\":\""+expiration+"\",\"return-url\":\""+return_url+"\",\"save-key\":\""+picpath+"\"}";
    // console.log(options_array);
    //var policy = base64_encode(json_encode($options));
    //var sign = md5(policy+'&'+form_api_secret); /// MD5的操作员密码

    var policy = new Buffer(options_array).toString('base64');
    //console.log(policy);
    //var policy = 'eyJidWNrZXQiOiJyZWFsbmFtZSIsImV4cGlyYXRpb24iOjE0MjczNTU3NDUsInNhdmUta2V5IjoiXC8xMjNcLzEyMy5qcGciLCJhbGxvdy1maWxlLXR5cGUiOiJqcGcsanNwZWcsZ2lmLHBuZyJ9';
    var md5 = crypto.createHash('md5');
    var sign_string =  policy+'&'+form_api_secret;
    md5.update(sign_string);
    // console.log(sign_string);
    //console.log("eyJidWNrZXQiOiJyZWFsbmFtZSIsImV4cGlyYXRpb24iOjE0MjczNjMzMTEsInNhdmUta2V5IjoiXC8xMjNcLzEyMy5qcGcifQ==&2NyJqkzBX0u5pQ7dAZBvcgb7JSI=");

    var sign =md5.digest('hex');
    console.log(sign);

    //var sign = '54a9ea88ffecdda966e2407fcf30349d';
    upyun_info_array["bucket"] = bucket;
    upyun_info_array["policy"] = policy;
    upyun_info_array["sign"] = sign;
    upyun_info_array["sign"] = sign;
    upyun_info_array["picpath"] = picpath;
    upyun_info_array["prefix_upyun"] = "https://"+bucket+".b0.upaiyun.com/";
    var  array = "{\"bucket\":\""+bucket+"\",\"policy\":\""+policy+"\",\"return-url\":\""+return_url+"\",\"sign\":\""+sign+"\"}";
    return upyun_info_array;
}