/**
 * NodeJS应用服务器启动入口
 *
 * @type {exports|*}
 */
var express = require('express');
var partials = require('express-partials');
var path = require('path');
var favicon = require('serve-favicon');
/*日志*/
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('dmp-webapp');
var router = require('./routes/router_admin'); //后台
var DataProxy = require("data-proxy");
var fs = require('fs');
var app = express();

//端口号
app.set('port', process.env.PORT || 32000);

//设置视图路径
app.set('views', path.join(__dirname, 'views'));

// 设置试图引擎
app.set('view engine', 'ejs');

//视图片段
app.use(partials());

//日志记录器
app.use(logger('dev'));

//解析客户端请求中间件
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended : false
}));

//解析和存储cookie
app.use(cookieParser());

//静态文件支持
app.use(express.static(path.join(__dirname, 'public')));

//check if the user has been login-in，当前url需要判断用户是否已经登录
app.use([ "/admin/","/userFrontAccount/","/userFrontAccount/","/fontuser/","/category/"], function(req, res, next) {
    var sessionid = req.cookies.adminsessionid;
    var auth = req.url;
    var previous_url = encodeURIComponent(req.baseUrl + auth.substring(0)).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
    if (sessionid == null || sessionid == "null") {
        console.log("session NULL ");
        res.redirect("/adminlogin?u_url=" + previous_url);
        return;
    }
    if (sessionid) {
        new DataProxy({
            req : req,
            res : res,
            reqType : "http",
            reqOption : {
                url : "/session/check",
                params : {
                    sessionid : sessionid
                },
                success : function(res, data) {
                    var json = JSON.parse(data);
                    if (json.code == 0) {
                        next();
                    } else {
                        console.log("session expire");
                        res.clearCookie('adminsessionid');
                        res.redirect("/adminlogin");
                    }
                }
            }
        }).handleRequest();
    } else {
        res.redirect("/adminlogin");
    }

});

app.use([ "/admin", "/adminlogin" ], function(req, res, next) {
    var oldip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    var ipAddress;
    var headers = req.headers;
    var ip_real = headers['x-real-ip'];
    var forward_ip = headers['x-forwarded-for'];
    var remote_ip = req.connection.remoteAddress;
    var forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
    forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }
    var map = getLocalIP();
    var access = 0;
    if (map.length > 0) {
        access = map[0].access;
    }
    if (parseInt(access) == 0) {
        // res.status(200).send("无权访问");
        // return;
    }

    if (req.baseUrl.indexOf('adminlogin') != -1) {
        console.log("yes");
        next();
        return;
    }

    var sessionid = req.cookies.adminsessionid;

    if (sessionid == null || sessionid == "null") {
        res.redirect("/adminlogin");
        return;
    }
    if (sessionid) {
        new DataProxy({
            req : req,
            res : res,
            reqType : "http",
            reqOption : {
                url : "/session/check",
                params : {
                    sessionid : sessionid
                },
                success : function(res, data) {
                    var json = JSON.parse(data);
                    if (json.code == 0) {
                        next();
                    } else {
                        res.redirect("/adminlogin");
                    }
                }
            }
        }).handleRequest();
    } else {
        res.redirect("/adminlogin");
    }
});

app.use(router);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if (err.status == 404) {
        res.render('404', {
            title : '你找的页面不存在'
        });
    } else {
        res.render('error', {
            message : err.message,
            error : {}
        });
    }

});

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});

var os = require('os');

function getLocalIP() {
    var map = [];
    var ifaces = os.networkInterfaces();
    console.log(ifaces);
    var access = 0;
    for ( var dev in ifaces) {
        if (dev.indexOf('ppp') != -1) {
            access = 1;
            // map.push({"access" : 1});
        } else {
            //  map.push({"access" : 0});
        }
        if (dev.indexOf('eth0') != -1) {
            var tokens = dev.split(':');
            var dev2 = null;
            if (tokens.length == 2) {
                dev2 = 'eth1:' + tokens[1];
            } else if (tokens.length == 1) {
                dev2 = 'eth1';
            }
            if (null == ifaces[dev2]) {
                continue;
            }
            // 找到eth0和eth1分别的ip
            var ip = null, ip2 = null;
            ifaces[dev].forEach(function(details) {
                if (details.family == 'IPv4') {
                    ip = details.address;
                }
            });
            ifaces[dev2].forEach(function(details) {
                if (details.family == 'IPv4') {
                    ip2 = details.address;
                }
            });
            if (null == ip || null == ip2) {
                continue;
            }
            // 将记录添加到map中去
            if (ip.indexOf('10.') == 0 || ip.indexOf('172.') == 0
                || ip.indexOf('192.') == 0) {
                // map.push({"intranet_ip" : ip, "internet_ip" : ip2});
            } else {
                // map.push({"intranet_ip" : ip2, "internet_ip" : ip});
            }
        }
    }
    map.push({
        "access" : access
    });
    return map;
}
