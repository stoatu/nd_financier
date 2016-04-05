/**
 * Created by 15224 on 2016/3/8.
 */
var express = require('express');
var router = express.Router();

//后台admin
require("./admin/admin/admin-router").adminRouter(router);
require("./admin/admin/admin-api-router").adminRouter(router);

//设置
require("./admin/setup/setup-router").setupRouter(router);
require("./admin/setup/setup-api-router").setupRouter(router);

//日常公告
require("./admin/daily/daily-router").dailyRouter(router);
require("./admin/daily/daily-api-router").dailyRouter(router);

require('./admin/product/product_router').productRouter(router);
require('./admin/product/product_router_api').productRouter(router);
//文章
require('./admin/article/article_router').articleRouter(router);
require('./admin/article/article_router_api').articleRouter(router);
//日常维护
require('./admin/daily/daily-router').dailyRouter(router);
require('./admin/daily/daily-api-router').dailyRouter(router);



module.exports = router;