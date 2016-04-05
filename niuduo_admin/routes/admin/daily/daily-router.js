var DataProxy = require("data-proxy");
var CommonUse = require("../../common_use");
var FrontCommonUse = require("../../front_common_use");
var Action = require("../../apiaction");

exports.dailyRouter = function(router) {

    //轮播图管理
    router.get(['/admin/daily/shuffling'], function (req, res) {
        res.render('admin/shuffling/index', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout:CommonUse.get_main_layout_path(),
            menu: "index",
            title: "轮播图管理"
        });
    });

    //添加轮播图
    router.get(['/admin/daily/shuffling/addimg'], function (req, res) {
        var upyun_array =   FrontCommonUse.get_upyun_array( "images/"+FrontCommonUse.randompic() ,"resource-chaogu");
        res.render('admin/shuffling/addimg', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            upyun_array:upyun_array
        });
    });

    //修改轮播图
    router.get(['/admin/daily/shuffling/editimg'], function (req, res) {
        res.render('admin/shuffling/editimg', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res)
        });
    });

    //删除轮播图
    router.get(['/admin/daily/shuffling/deleteimg'], function (req, res) {
        res.render('admin/shuffling/deleteimg', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res)
        });
    });

    router.get(['/upyun/getkeyresource'], function(req, res) {
        var upyun_pic_1 = FrontCommonUse.get_upyun_array(FrontCommonUse.randompic() ,"resource-chaogu");
        var  array = "{\"policy\":\""+upyun_pic_1.policy+"\",\"sign\":\""+upyun_pic_1.sign+"\",\"picpath\":\""+upyun_pic_1.picpath+"\"}";
        res.status(200).send(array);
    });

    //公告管理
    router.get(['/admin/announcement'], function (req, res) {
        res.render('admin/announcement/index', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            menu: "index",
            title: "公告管理"
        });
    });

    //发布公告
    router.get(['/admin/daily/announcement/release'], function (req, res) {
        res.render('admin/announcement/release', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res)
        });
    });

    //修改公告
    router.get(['/admin/daily/announcement/edit'], function (req, res) {
        res.render('admin/announcement/edit', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res)
        });
    });

    //删除公告
    router.get(['/admin/daily/announcement/delete'], function (req, res) {
        res.render('admin/announcement/delete', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res)
        });
    });

    //上架
    router.get(['/admin/daily/announcement/setpassed'], function (req, res) {
        res.render('admin/announcement/setpassed', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res)
        });
    });


    //帮助中心
    router.get(['/admin/daily/stasticFile'], function (req, res) {
        var indexid = req.param("indexid");
        var obj="";
        res.render('admin/staticfile/index', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout:CommonUse.get_main_layout_path(),
            datainfo:obj,
            menu: "index",
            title: "公告管理",
            menuleft: "/admin/announcement",
            indexid: indexid
        });
    });

    //发布静态文件
    router.get(['/admin/daily/staticfile/release'], function (req, res) {
        res.render('admin/staticfile/release', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res)
        });
    });

    //修改静态文件
    router.get(['/admin/daily/staticfile/edit'], function (req, res) {
        res.render('admin/staticfile/edit', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res)
        });
    });
    //删除静态文件
    router.get(['/admin/daily/staticfile/delete'], function (req, res) {

        res.render('admin/staticfile/delete', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res)
        });
    });
};