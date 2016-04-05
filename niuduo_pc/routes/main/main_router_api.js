var DataProxy = require("data-proxy");
/* GET home page. */
exports.mainRouter=function(router) {

    //登陆
    router.post('/doLogin', function (req, res) {
        var login_name = req.param("login_name");
        var password = req.param("password");
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/nd/login/doLogin",
                params: {login_name:login_name,password:password},
                success: function (res, data) {
                    var json = JSON.parse(data);
                    if (json.code == 0) {
                        res.setHeader("Set-Cookie", ["user_id="+json.data.uid+";path=/","sessionid="+json.data.sessionid+";path=/","mobile="+json.data.mobile+";path=/",
                            "portrait="+json.data.portrait+";path=/", "login_name=" + encodeURIComponent(json.data.uname)+";path=/","account_type=" + json.data.account_type+";path=/"]);
                        //"nickname="+encodeURIComponent(json.data.nick)+";path=/"
                        res.status(200).send(JSON.stringify(json));
                    } else {
                        res.status(200).send(data);
                    }
                }
            }
        }).handleRequest();
    });


    //注册
    router.post('/register', function (req, res) {
        var uname = req.param("uname");
        var password = req.param("password");
        var account_type = req.param("account_type");
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/nd/login/reg",
                params: {uname:uname,password:password,account_type:account_type},
                success: function (res, data) {
                    var json = JSON.parse(data);
                    if (json.code == 0) {
                        //console.log(json);
                        res.status(200).send(JSON.stringify(json));
                    } else {
                        res.status(200).send(data);
                    }
                }
            }
        }).handleRequest();
    });
}