var DataProxy = require("data-proxy");
var CommonUse = require("../../common_use");

exports.adminRouter = function(router) {

    //炒股网后台登录
    router.get(['/','/adminlogin'], function (req, res) {

        res.render('admin/admin/index', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            menu: "index",
            title: "炒股网后台"
        });
    });

    //退出登录
    router.get('/adminlogout',function(req,res) {
        var sessionid = req.cookies.adminsessionid;
        res.setHeader("Set-Cookie", ["adminsessionid=null"]);
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/session/clear",
                params: {sessionid: sessionid},
                success: function (res, data) {
                    res.setHeader("Set-Cookie", ["adminsessionid=null"]);
                    res.redirect("/adminlogin");

                }
            }
        }).handleRequest();
    });


    router.get(['/admin/main'], function (req, res) {
        res.render('admin/main/main', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            menu: "index",
            title: "炒股网后台"
        });
    });

    router.get(['/admin/main/top'], function (req, res) {
        res.render('admin/main/top', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            menu: "index",
            title: "炒股网后台"
        });
    });

    router.get(['/admin/main/left'], function (req, res) {
        var auth_id = req.param("auth_id");
        var auth_name = req.param("auth_name");
        res.render('admin/main/left', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            menu: "index",
            auth_id:auth_id,
            auth_name:auth_name,
            title: "炒股网后台"
        });
    });

    router.get(['/admin/main/index'], function (req, res) {
        res.render('admin/main/index', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            menu: "index",
            title: "炒股网后台"
        });
    });
    router.get(['/admin/main/footer'], function (req, res) {
        res.render('admin/main/footer', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            menu: "index",
            title: "炒股网后台"
        });
    });

}