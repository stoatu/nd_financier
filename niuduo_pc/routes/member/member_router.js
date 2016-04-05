var express = require('express');
var router = express.Router();
var CommonUse = require("../common_use");
var Action = require("../apiaction");
/* GET home page. */
exports.memberRouter=function(router){
    //基础模板
    router.get('/member/basemodule',function (req,res){
        res.render('member/basemodule',{
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            title: '个人中心'
        })
    });

    //产品发布
    router.get('/member/product/publish', function(req, res, next) {
        var upyun_pic_1 = CommonUse.get_upyun_array(CommonUse.randompicnew("_p"),"avatar-chaogu");
            res.render('member/product/publish', {
                cookie_info: CommonUse.get_cookie_info(req),
                common_info: CommonUse.get_param_array(req, res),
                layout: CommonUse.get_main_layout_path(),
                title_id: 1,
                upyun_pic_1:upyun_pic_1,
                title: '产品发布'
            });

    });

    //产品详情
    router.get('/member/product/detail', function(req, res, next) {
        var product_id=req.param('product_id');
        var param={product_id:product_id};
        Action.send(req,res,'/member/product_info/getProductVListById',param, function (res, data){
            var info=JSON.parse(data);
            res.render('member/product/detail', {
                cookie_info: CommonUse.get_cookie_info(req),
                common_info: CommonUse.get_param_array(req, res),
                title_id: 1,
                info:info.data,
                title: '产品发布'
            });
        });
    });

    //产品管理
    router.get('/member/product', function(req, res, next) {
        res.render('member/product/index', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            title_id: 1,
            title: '产品管理'
        });
    });

    //产品列表
    router.get('/member/product/detail_list', function(req, res, next) {
        var product_ids=req.param("product_ids");
        res.render('member/product/detail_list', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            title_id: 1,
            product_ids:product_ids,
            title: '产品列表'
        });

    });

    //产品管理
    router.get('/member/product/manage', function(req, res, next) {
        res.render('member/product/manage', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            title_id: 1,
            title: '产品管理'
        });
    });

    //账号信息
    router.get('/member/account', function(req, res, next) {
        var url = "/nd/user/getUserInfo";
        //var params = {sessionid: req.cookies.sessionid};
        var params = {uid: req.cookies.user_id};
        Action.send(req,res,url,params,function(res, data){
            var json = JSON.parse(data);
            res.render('member/account/index', {
                cookie_info: CommonUse.get_cookie_info(req),
                common_info: CommonUse.get_param_array(req, res),
                layout: CommonUse.get_main_layout_path(),
                title_id: 0,
                title: '账户信息',
                datainfo: json.data
            });
        });
    });

    //修改登录密码
    router.get('/member/account/password', function(req, res, next) {
        res.render('member/account/password', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            title: '修改登录密码'
        });
    });

    //绑定手机
    router.get('/member/account/mobile', function(req, res, next) {
        res.render('member/account/mobile', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            title: '绑定手机'
        });
    });

    //绑定邮箱
    router.get('/member/account/email', function(req, res, next) {
        res.render('member/account/email', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            title: '绑定邮箱'
        });
    });

    //昵称、头像修改
    router.get('/member/account/nickname', function(req, res, next) {
        res.render('member/account/nickname', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            title: '昵称、头像修改'
        });
    });

    //实名认证
    router.get('/member/account/nameauth', function(req, res, next) {
        var upyun_pic_1 = CommonUse.get_upyun_array(CommonUse.randompicnew("p"),"realname");
        var upyun_pic_2 = CommonUse.get_upyun_array(CommonUse.randompicnew("n"),"realname");
        var upyun_pic_3 = CommonUse.get_upyun_array(CommonUse.randompicnew("l"),"realname");
        var upyun_pic_4 = CommonUse.get_upyun_array(CommonUse.randompicnew("c"),"realname");
        res.render('member/account/nameauth', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            title: '实名认证',
            upyun_pic_1:upyun_pic_1,
            upyun_pic_2:upyun_pic_2,
            upyun_pic_3:upyun_pic_3,
            upyun_pic_4:upyun_pic_4
        });
    });

    //实名认证查看
    router.get('/member/account/checkname', function(req, res, next) {
        res.render('member/account/checkname', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            title: '实名认证查看'
        });
    });

    //产品编辑
    router.get('/member/product/edit', function(req, res, next) {
        var product_id=req.param('product_id');
        res.render('member/product/edit', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            product_id:product_id,
            title: '产品编辑'
        });
    });


    router.get('/member/article/msanage', function(req, res, next) {
        res.render('member/article/manage', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            title: '文章管理'
        });
    });


    //分享管理
    router.get('/member/share', function(req, res, next) {
        res.render('member/share/index', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            title_id: 7,
            title: '分享管理'
        });
    });

    //分享管理-添加素材
    router.get('/member/share/material', function(req, res, next) {
        res.render('member/share/material', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            title_id: 7,
            title: '分享管理'
        });
    });

    router.get(['/upyun/callback'], function(req, res) {
        var url=req.param("url");
        var code=req.param("code");
        if( code == null){
            url = "";
        }else{
            if(code == "200"){
                if(url == null)
                    url = "";
            }else{
                url = "";
            }
        }
        res.render('uploadfile/index',{url:url});
    });

    router.get(['/upyun/getkeyavatar'], function(req, res) {
        var upyun_pic_1 = CommonUse.get_upyun_array(CommonUse.randompicnew("_p"),"avatar-chaogu");
        var  array = "{\"policy\":\""+upyun_pic_1.policy+"\",\"sign\":\""+upyun_pic_1.sign+"\",\"picpath\":\""+upyun_pic_1.picpath+"\"}";
        res.status(200).send(array);
    });

    router.get(['/member/upyun/getkeyrealname'], function(req, res) {
        var upyun_pic_1 = CommonUse.get_upyun_array(CommonUse.randompicnew("p"),"realname");
        var  array = "{\"policy\":\""+upyun_pic_1.policy+"\",\"sign\":\""+upyun_pic_1.sign+"\",\"picpath\":\""+upyun_pic_1.picpath+"\"}";
        res.status(200).send(array);
    });

    //激活邮箱
    router.get(['/activate_mail'], function (req, res) {
        var key = req.param("key");
        var t = req.param("t");

        var msg = "";
        var returncode = -1;
        if (key == "" || t == "" || key == null || t == null) {
            msg = "您访问的地址有误"
            return_code = -1;
            res.render('member/set_up/activate_mail', {
                message: msg,
                return_code: returncode,
                common_info: CommonUse.get_param_array(req, res),
                layout: CommonUse.get_main_layout_path(),
                cookie_info: CommonUse.get_cookie_info(req),
                menu: "member",
                title_id:title_id,
                title: "绑定邮箱"
            });
        }
        else {
            var url = "/newlogin/checkBindMail";
            var params = {key: key, t: t};
            Action.send(req, res, url, params, function (res, data) {
                var json = JSON.parse(data);
                //console.log(data);
                res.render('member/set_up/activate_mail', {
                    message: json.msg,
                    return_code: json.code,
                    common_info: CommonUse.get_param_array(req, res),
                    layout: CommonUse.get_main_layout_path(),
                    cookie_info: CommonUse.get_cookie_info(req),
                    title: "激活邮箱"
                });
            });
        }
    });

    //忘记密码
    router.get(['/forget_pwd'], function (req, res) {
        res.render('main/forget_pwd', {
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            cookie_info: CommonUse.get_cookie_info(req),
            title: "炒股网忘记密码"
        });
    });

    //邮箱重置密码
    router.get(['/reset_mail'], function (req, res) {
        var key = req.param("key");
        var t = req.param("t");

        var msg = "";
        var returncode = -1;
        if (key == "" || t == "" || key == null || t == null) {
            msg = "您访问的地址有误"
            return_code = -1;
            res.render('front/account/activate_mail', {
                message: msg,
                return_code: returncode,
                common_info: CommonUse.get_param_array(req, res),
                layout: CommonUse.get_main_layout_path(),
                cookie_info: CommonUse.get_cookie_info(req),
                menu: "member",
                title: "邮箱重置密码"
            });
            return;
        }
        res.render('front/account/reset_pwd_mail', {
            key: key,
            t: t,
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            cookie_info: CommonUse.get_cookie_info(req),
            menu: "member",
            title: "邮箱重置密码"
        });
    });
}
