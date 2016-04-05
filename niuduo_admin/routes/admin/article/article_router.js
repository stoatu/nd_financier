var express = require('express');
var router = express.Router();
var CommonUse = require("../../common_use");
var Action = require("../../apiaction");
/* GET home page. */
exports.articleRouter=function(router){

    router.get('/admin/article/articleList', function(req, res, next) {
        res.render('admin/article/index', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            title: '文章管理'
        });
    });
    router.get('/admin/article/verify', function(req, res, next) {
        res.render('admin/article/verify', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            //layout: CommonUse.get_main_layout_path(),
            title: '文章审核'
        });
    });
}
