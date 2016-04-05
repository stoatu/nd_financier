var DataProxy = require("data-proxy");
var CommonUse = require("../../common_use");
var Action = require("../../apiaction");

exports.productRouter=function(router){

    router.get('/admin/product', function(req, res, next) {
        res.render('admin/product/index', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res),
            layout: CommonUse.get_main_layout_path(),
            title: '产品管理'
        });
    });

    router.get('/admin/product/verify', function(req, res, next) {
        res.render('admin/product/verify', {
            cookie_info: CommonUse.get_cookie_info(req),
            common_info: CommonUse.get_param_array(req, res)
        });
    });
};
