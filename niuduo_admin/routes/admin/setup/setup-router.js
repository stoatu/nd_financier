var DataProxy = require("data-proxy");
var CommonUse = require("../../common_use");
var Action = require("../../apiaction");

exports.setupRouter = function(router) {

    //个人设置
    router.get(['/admin/setup/role','/admin'], function (req, res) {
         res.render('admin/setup/role/index', {
                cookie_info: CommonUse.get_cookie_info(req),
                common_info: CommonUse.get_param_array(req, res),
                layout: CommonUse.get_main_layout_path(),
                menu: "index",
                title: "个人设置"
         });
    });

    //修改密码
    router.get(['/admin/setup/role/eidt'], function (req, res) {

        res.render('admin/setup/role/eidt', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res)
        });
    });

    //权限管理
    router.get(['/admin/setup/permissions'], function (req, res) {
        res.render('admin/setup/permissions/index', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout:CommonUse.get_main_layout_path(),
            menu: "index",
            title: "权限管理"
        });
    });

    //添加权限
    router.get(['/admin/setup/permissions/add'], function (req, res) {
        res.render('admin/setup/permissions/add', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res)
        });
    });

    //修改权限
    router.get(['/admin/setup/permissions/eidt'], function (req, res) {
        res.render('admin/setup/permissions/eidt', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res)
        });
    });

    //删除权限
    router.get(['/admin/setup/permissions/delete'], function (req, res) {
        res.render('admin/setup/permissions/delete', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res)
        });
    });

    //配置权限组
    router.get(['/admin/setup/permissions/configuration'], function (req, res) {
        res.render('admin/setup/permissions/configuration', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res)
        });
    });

    //角色管理
    router.get(['/admin/setup/personal'], function (req, res) {
        res.render('admin/setup/personal/index', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout:CommonUse.get_main_layout_path(),
            menu: "index",
            title: "角色管理"
        });
    });

    //添加用户
    router.get(['/admin/setup/personal/adduser'], function (req, res) {
        res.render('admin/setup/personal/adduser', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res)
        });

    });

    //修改用户
    router.get(['/admin/setup/personal/edituser'], function (req, res) {
        res.render('admin/setup/personal/edituser', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res)
        });
    });

    //重置密码
    router.get(['/admin/setup/personal/resetpwd'], function (req, res) {
        res.render('admin/setup/personal/resetpwd', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res)
        });
    });

    //权限组配置
    router.get(['/admin/setup/personal/configuration'], function (req, res) {
        res.render('admin/setup/personal/configuration', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res)
        });
    });

    //系统配置
    router.get(['/admin/setup/system'], function (req, res) {
        res.render('admin/setup/system/index', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            menu: "index",
            title: "系统配置"
        });
    });
    //修改-系统配置
    router.get(['/admin/setup/system/eidt'], function (req, res) {
        res.render('admin/setup/system/eidt', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res)
        });
    });
};