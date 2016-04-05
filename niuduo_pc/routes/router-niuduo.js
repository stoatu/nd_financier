/**
 * Created by 15224 on 2016/3/8.
 */
var express = require('express');
var router = express.Router();

//首页
require('./main/main-router').mainRouter(router);
require('./main/main_router_api').mainRouter(router);

//个人中心
require("./member/member_router").memberRouter(router);
require("./member/member_router_api").memberRouter(router);
//文章
require("./member/article/article_router").articleRouter(router);
require("./member/article/article_router_api").articleRouter(router);
module.exports = router;