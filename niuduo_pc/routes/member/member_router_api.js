var DataProxy = require("data-proxy");
/* GET home page. */
exports.memberRouter=function(router){

    //退出登录
    router.get('/logout',function(req,res) {
        var sessionid = req.cookies.sessionid;
        if(sessionid == null)
        {
            res.clearCookie('sessionid');
            res.clearCookie("user_id");
            res.redirect("/");
            return;
        }
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/session/clear",
                params: {sessionid: sessionid},
                success: function (res, data) {
                    res.clearCookie('sessionid');
                    res.clearCookie("user_id");
                    res.redirect("/");
                }
            }
        }).handleRequest();
    });

    //获取产品类型
    router.post('/member/product/getByKindType', function (req, res) {
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/member/product_type/getByKindType",
                params: {},
                success: function (res, data) {
                    var json = JSON.parse(data);
                    if(json.code == 0 ){
                        res.status(200).send(JSON.stringify(json));
                    }else{
                        res.status(200).send(data);
                    }
                }
            }
        }).handleRequest();
    });

    //增加产品信息
    router.post('/member/product/add', function (req, res) {
        var product_type=req.param('product_type');
        var product_name=req.param('product_name');
        var key_word=req.param('key_word');
        var product_description=req.param('product_description');
        var cycle=req.param('cycle');
        var raise_target=req.param('raise_target');
        var min_invest=req.param('min_invest');
        var year_yield=req.param('year_yield');
        var portrait=req.param('portrait_pic');
        var start_time=req.param('start_time');
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/member/product_info/add",
                params: {product_type:product_type,product_name:product_name,key_word:key_word,product_description:product_description,cycle:cycle,raise_target:raise_target,min_invest:min_invest,year_yield:year_yield,portrait:portrait,start_time:start_time},
                success: function (res, data) {
                    var json = JSON.parse(data);
                    if(json.code == 0 ){
                        res.status(200).send(JSON.stringify(json));
                    }else{
                        res.status(200).send(data);
                    }
                }
            }
        }).handleRequest();
    });

    //我的产品列表

    router.post('/getProductVList',function(req,res){
        var page = req.param("page");
        var rows = req.param("rows");
        var product_name=req.param("product_name");
        var type_id=req.param("type_id");
        var status=req.param("status");
        new DataProxy({
            req:req,
            res:res,
            reqType:"http",
            reqOption:{
                url:"/member/product_info/getProductVList",
                params:{product_name:product_name,type_id:type_id,status:status,page:page,rows:rows},
                success:function(res,data){
                    var json = JSON.parse(data);
                    if(json.code == 0 ){
                        //console.log(json);
                        res.status(200).send(JSON.stringify(json));
                    }else{
                        res.status(200).send(data);
                    }
                }
            }
        }).handleRequest();
    });

    //增加产品信息
    router.post('/member/product/edit', function (req, res) {
        var product_id=req.param('product_id');
        var last_net_value=req.param('last_net_value');
        var all_profit=req.param('all_profit');
        var edit_date=req.param('edit_date');
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/member/product_info/edit",
                params: {product_id:product_id,last_net_value:last_net_value,all_profit:all_profit,edit_date:edit_date},
                success: function (res, data) {
                    var json = JSON.parse(data);
                    if(json.code == 0 ){
                        res.status(200).send(JSON.stringify(json));
                    }else{
                        res.status(200).send(data);
                    }
                }
            }
        }).handleRequest();
    });

    //增加产品信息
    router.post('/getProductVListByIds', function (req, res) {
        var product_ids=req.param('product_ids');
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/member/product_info/getProductVListByIds",
                params: {product_ids:product_ids},
                success: function (res, data) {
                    var json = JSON.parse(data);
                    if(json.code == 0 ){
                        res.status(200).send(JSON.stringify(json));
                    }else{
                        res.status(200).send(data);
                    }
                }
            }
        }).handleRequest();
    });

    //绑定邮箱
    router.post(["/member/bindMail"],function(req,res){
        var mail = req.param("mail");
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/nd/user/bindMail",
                params: {mail:mail},
                success: function (res, data) {
                    var json = JSON.parse(data);
                    if(json.code == 0 ){
                        res.status(200).send(JSON.stringify(json));
                    }else{
                        res.status(200).send(data);
                    }
                }
            }
        }).handleRequest();
    });

    //绑定手机号
    router.post(["/member/bindMobile"],function(req,res){
        var mobile = req.param("mobile");
        var recom_code = req.param("recom_code");
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/nd/user/bindMobile",
                params: {mobile:mobile,recom_code:recom_code},
                success: function (res, data) {
                    var json = JSON.parse(data);
                    if(json.code == 0 ){
                        res.status(200).send(JSON.stringify(json));
                    }else{
                        res.status(200).send(data);
                    }
                }
            }
        }).handleRequest();
    });

    //个人实名认证
    router.post(["/member/authRealname"],function(req,res){
        var idcard_no = req.param("idcard_no");
        var real_name = req.param("real_name");
        var idcard_positive_pic = req.param("positive_file_pic");
        var idcard_negative_pic = req.param("negative_file_pic");

        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/nd/user/authRealname",
                params: {idcard_no:idcard_no,real_name:real_name,idcard_positive_pic:idcard_positive_pic,idcard_negative_pic:idcard_negative_pic},
                success: function (res, data) {
                    var json = JSON.parse(data);
                    if(json.code == 0 ){
                        res.status(200).send(JSON.stringify(json));
                    }else{
                        res.status(200).send(data);
                    }
                }
            }
        }).handleRequest();
    });

    //企业实名认证
    router.post(["/member/authEnterpriseRealname"],function(req,res){
        var idcard_no = req.param("idcard_no");
        var real_name = req.param("real_name");
        var idcard_positive_pic = req.param("positive_file_pic");
        var idcard_negative_pic = req.param("negative_file_pic");
        var cp_name = req.param("cp_name");
        var cp_address = req.param("cp_address");
        var license = req.param("license");
        var proxy_bank = req.param("proxy_bank");
        var proxy_protocol = req.param("proxy_protocol");

        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/nd/user/authEnterpriseRealname",
                params: {idcard_no:idcard_no,real_name:real_name,idcard_positive_pic:idcard_positive_pic,idcard_negative_pic:idcard_negative_pic,
                    cp_name:cp_name,cp_address:cp_address,license:license,proxy_bank:proxy_bank,proxy_protocol:proxy_protocol},
                success: function (res, data) {
                    var json = JSON.parse(data);
                    if(json.code == 0 ){
                        res.status(200).send(JSON.stringify(json));
                    }else{
                        res.status(200).send(data);
                    }
                }
            }
        }).handleRequest();
    });

    //发送短信验证码
    router.post('/sendCaptchaNew',function(req,res){
        var mobile=req.param("mobile");
        var type=req.param("type");
        var voice_flag=req.param("voice_flag");
        if(voice_flag == "")
            voice_flag = 0;
        new DataProxy({
            req:req,
            res:res,
            reqType:"http",
            reqOption:{
                url:"/nd/user/sendCaptchaNew",
                params:{mobile:mobile,type:type,voice_flag:voice_flag},
                success:function(res,data){
                    var json = JSON.parse(data);
                    if(json.code == 0 ){
                        res.status(200).send(JSON.stringify(json));
                    }else{
                        res.status(200).send({code:1,msg:json.msg,data:{field:'mobile'}});
                    }
                }
            }
        }).handleRequest();
    });

    //修改登录密码
    router.post('/member/updatePassword',function(req,res){
        var oldpwd=req.param("oldpwd");
        var newpwd=req.param("newpwd");

        new DataProxy({
            req:req,
            res:res,
            reqType:"http",
            reqOption:{
                url:"/nd/login/updateUserPwd",
                params:{oldpwd:oldpwd,newpwd:newpwd},
                success:function(res,data){
                    var json = JSON.parse(data);
                    if(json.code == 0 ){
                        res.status(200).send(JSON.stringify(json));
                    }else{
                        res.status(200).send(data);
                    }
                }
            }
        }).handleRequest();
    });

    //修改昵称、头像
    router.post('/member/changePortrait',function(req,res){
        var portrait=req.param("portrait");
        var nickname=req.param("nickname");

        new DataProxy({
            req:req,
            res:res,
            reqType:"http",
            reqOption:{
                url:"/nd/user/changePortrait",
                params:{nickname:nickname,portrait:portrait},
                success:function(res,data){
                    var json = JSON.parse(data);
                    if(json.code == 0 ){
                        res.setHeader("Set-Cookie", ["portrait="+portrait+";path=/"]);
                        res.status(200).send(JSON.stringify(json));
                    }else{
                        res.status(200).send(data);
                    }
                }
            }
        }).handleRequest();
    });
}
