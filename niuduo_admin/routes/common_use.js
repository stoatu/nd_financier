
var httpconf = require('data-proxy/lib/httpconf');
var img_prefix = "http://resource-chaogu.b0.upaiyun.com/resources/"; //图片资源
exports.get_cookie_info = function(req){

    req.cookies.mobile =  req.cookies.user_id;

    if(req.cookies.nickname == ""){
        req.cookies.nickname = req.cookies.mobile;
    }
    return req.cookies;
};

exports.get_real_cookie_info = function(req){
    return req.cookies;
};


exports.get_main_layout_path = function(){
    return "nd_layout";
};

exports.get_param_array = function(req,res){
    var common_info_array=Array();

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
    //common_info_array["avatar_upyun"] = this.get_upyun_array(this.randompic(),"avatar-chaogu");
    return  common_info_array;
};