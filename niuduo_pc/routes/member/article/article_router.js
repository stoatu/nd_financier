var express = require('express');
var router = express.Router();
var CommonUse = require("../../common_use");
var FrontCommonUse = require("../../front_common_use.js");
var Action = require("../../apiaction");
/* GET home page. */
exports.articleRouter=function(router){

    //文章相关
    router.get('/member/article/manage', function(req, res, next) {
        res.render('member/article/manage', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            title_id: 2,
            title: '文章管理'
        });
    });
    //文章相关
    router.get('/member/article/index', function(req, res, next) {
        res.render('member/article/index', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            title: '文章管理'
        });
    });
    //添加文章
    router.get('/member/article/addArticle', function(req, res, next) {
        var upyun_pic_1 = CommonUse.get_upyun_array(CommonUse.randompicnew("_p"),"avatar-chaogu");
        var info_id = req.param("info_id");
        var upyun_array =   FrontCommonUse.get_upyun_array( "images/news_info/"+FrontCommonUse.randompic() ,"resource-chaogu");
        res.render('member/article/addArticle', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            title_id: 2,
            title: '文章管理',
            upyun_array:upyun_array,
            upyun_pic_1:upyun_pic_1,
            info_id:info_id
        });
    });

   /* //产品详情
    router.get('/member/article/detail', function(req, res, next) {
        var info_id=req.param('info_id');
        var param={info_id:info_id};
        Action.send(req,res,'/nd/infoNews/getArticleInfo',param, function (res, data){
            var info=JSON.parse(data);
            res.render('member/article/detail', {
                cookie_info: CommonUse.get_cookie_info(req),
                common_info: CommonUse.get_param_array(req, res),
                title_id: 1,
                msg_info:info.data,
                title: '产品发布'
            });
        });
    });*/

    //文章详情页
    router.get('/member/article/detail', function(req, res) {
        var info_id=req.param('info_id');

        Action.send(req, res,"/nd/infoNews/getArticleInfo",{info_id:info_id},function(res,data) {
            var json=JSON.parse(data);
            res.render('member/article/detail', {
                cookie_info: CommonUse.get_cookie_info(req),
                common_info: CommonUse.get_param_array(req, res),
                layout: CommonUse.get_main_layout_path(),
                menu: "index",
                msg_info: json.data,
                title: '文章详情页'
            });
        });
    });
    //产品列表
    router.get('/member/article/detail_list', function(req, res, next) {
        var info_ids=req.param("info_ids");
        res.render('member/article/detail_list', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            title_id: 1,
            info_ids:info_ids,
            title: '产品列表'
        });

    });
}
