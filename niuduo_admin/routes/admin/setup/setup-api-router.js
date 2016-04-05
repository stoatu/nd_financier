var DataProxy = require("data-proxy");
var CommonUse = require("../../common_use");
exports.setupRouter = function(router) {


    //获得用户
    router.post('/getadminInfo', function (req, res) {
        //console.log("123");
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/userAdmin/adminInfo",
                params: {},
                success: function (res, data) {
                    //console.log(data);
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

    //获得用户
    router.post('/getAdminUserRoleAndInfo', function (req, res) {
        //console.log("123");
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/userAdmin/getAdminUserRoleAndInfo",
                params: {},
                success: function (res, data) {
                    //console.log(data);
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

    //修改密码
    router.post('/changePassword', function (req, res) {
        var oldpwd = req.param("oldpassword");
        var newpwd = req.param("password");
        var newPasswordAgain=req.param("password_confirm");

        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/userAdmin/changePassword",
                params: {newPassword:newpwd,oldPassword:oldpwd,newPasswordAgain:newPasswordAgain},
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


    //查看所有后台用户
    router.post('/showAllAdmin', function (req, res) {
        var page = req.param("page");
        var rows = req.param("rows");

        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/userAdmin/showAllAdmin",
                params: {page:page,rows:rows},
                success: function (res, data) {
                   // console.log(data);
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

    //重置密码
    router.post('/resetAdminPassword', function (req, res) {
        var user_id = req.param("user_id");

        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/userAdmin/resetAdminPassword",
                params: {user_id:user_id},
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

    //添加用户
    router.post('/adminCreate', function (req, res) {
        var login_name = CommonUse.urlencode(req.param("login_name"));
        var real_name = CommonUse.urlencode(req.param("real_name"));
        var password = req.param("password");
        var role = req.param("role");
        var mobile = req.param("mobile");
        var nick_name = req.param("nick_name");
        var img_url = req.param("thumbnail");

        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/userAdmin/adminCreate",
                params: {login_name:login_name,real_name:real_name,password:password,role:role,mobile:mobile,nick_name:nick_name,img_url:img_url},
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

    //修改用户
    router.post('/adminEditNameAndRole', function (req, res) {
        var real_name = CommonUse.urlencode(req.param("real_name"));
        var role = req.param("role");
        var user_id = req.param("user_id");
        var mobile = req.param("mobile");
        var nick_name = req.param("nick_name");
        var img_url = req.param("thumbnail");



        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/userAdmin/adminEditNameAndRole",
                params: {real_name:real_name,role:role,user_id:user_id, mobile:mobile,nick_name:nick_name,img_url:img_url},
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

    //修改状态
    router.post('/changeAdminState', function (req, res) {
        var user_id= req.param("user_id");

        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/userAdmin/changeAdminState",
                params: {user_id:user_id},
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

    //根据姓名查询
    router.post('/getAdminByName', function (req, res) {
        var login_name = CommonUse.urlencode(req.param("loginname"));
        var real_name = CommonUse.urlencode(req.param("realname"));

        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/userAdmin/getAdminByLoginAndReal",
                params: {login_name:login_name,real_name:real_name},
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

    //配置权限组
    router.post('/configAdminRole', function (req, res) {
        var role = req.param("role");
        var user_id = req.param("user_id");

        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/userAdmin/configAdminRole",
                params: {role:role,user_id:user_id},
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


    //获得权限组
    router.post('/showAllRole', function (req, res) {

        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/roleAdmin/showAllRole",
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

    //添加权限组
    router.post('/addRole', function (req, res) {
        var role_name= CommonUse.urlencode(req.param("role_name"));

        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/roleAdmin/addRole",
                params: {role_name:role_name},
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

    //修改权限
    router.post('/editRole', function (req, res) {
        var role_name= CommonUse.urlencode(req.param("role_name"));
        var role_id= req.param("role_id");

        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/roleAdmin/editRole",
                params: {role_name:role_name,role_id:role_id},
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

    //删除权限组
    router.post('/deleteRole', function (req, res) {
        var role_id= req.param("role_id");

        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/roleAdmin/deleteRole",
                params: {role_id:role_id},
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

    //获得所有权限
    router.post('/showAllAuth', function (req, res) {
        //var role_id= req.param("role_id");
        //console.log(role_id);

        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/roleAdmin/showAllAuth",
                params: {},
                success: function (res, data) {
                    //console.log(data);
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

    //获得权限组的权限
    router.post('/showRoleAuth', function (req, res) {
        var role_id= req.param("role_id");
        var parent_id= req.param("parent_id");
        //console.log(role_id);
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/roleAdmin/showRoleAuth",
                params: {role_id:role_id,parent_id:parent_id},
                success: function (res, data) {
                    console.log(data);
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

    //修改权限组的权限
    router.post('/configRoleAuthAdmin', function (req, res) {
        var role_id= req.param("role_id");
        var adminRoleAuth= req.param("adminRoleAuth");
        console.log(role_id);
        console.log(adminRoleAuth);
        //return;
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/roleAdmin/configRoleAuthAdmin",
                params: {role_id:role_id,adminRoleAuth:adminRoleAuth},
                success: function (res, data) {
                    //console.log(data);
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



    //获取系统配置
    router.post('/getConfiguration', function (req, res) {

        var page=req.param("page");
        var rows=req.param("rows");

        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/configuration/getConfiguration",
                params: {page:page,rows:rows},
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


    //修改系统配置
    router.post('/editConfiguration', function (req, res) {
        var configKey=req.param("configKey");
        var configValue=req.param("configValue");
        var etc=req.param("etc");


        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/configuration/editConfiguration",
                params: {configKey:configKey,configValue:configValue,etc:etc},
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





}