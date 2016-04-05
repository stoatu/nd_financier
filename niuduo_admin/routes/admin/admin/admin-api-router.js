var DataProxy = require("data-proxy");

exports.adminRouter = function(router) {

    //登录
    router.post('/adminLogin1', function (req, res) {
        var login_name = req.param("loginname");
        var password = req.param("password");
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/userAdmin/adminLogin",
                params: {login_name: login_name, password: password,org_id: '1'},
                success: function (res, data) {
                    var json = JSON.parse(data);
                    if (json.code == 0) {
                        json.data.redirectUrl = "/admin/main";
                        res.setHeader("Set-Cookie", ["adminsessionid=" + json.data.adminSessionid,"adminnickname=" + json.data.login_name,"sessionid=null"]);
                        res.status(200).send(JSON.stringify(json));
                    } else {
                        res.status(200).send(data);
                    }
                }
            }
        }).handleRequest();
    });

    //退出登录
    router.get('/adminlogout', function (req, res) {
        var sessionid = req.cookies.sessionid;
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/session/clear",
                params: {sessionid: sessionid},
                success: function (res, data) {
                    res.setHeader("Set-Cookie", ["adminsessionid=null"]);
                    res.redirect("/admin");

                }
            }
        }).handleRequest();
    });

    //获得用户权限
    router.post('/getAdminUserRole', function (req, res) {;
        //return;
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/userAdmin/getAdminUserRole",
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

}