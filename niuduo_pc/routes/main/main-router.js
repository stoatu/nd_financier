/**
 * Created by 15224 on 2016/3/8.
 */

var express = require('express');
var router = express.Router();
var CommonUse = require("../common_use");

exports.mainRouter = function (router){
    //首页
    router.get(['/','/'],function (req,res){
        res.render('main/index',{
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            title: '首页'
        });
    });

    //注册
    router.get(['/regist'],function (req,res){
        res.render('main/regist',{
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            title: '注册'
        });
    });
};