var DataProxy = require("data-proxy");
/* GET home page. */
exports.articleRouter=function(router){

    //我的文章列表
    router.post('/getArticleVList',function(req,res){
        var page = req.param("page");
        var rows = req.param("rows");
        var categoryID = req.param("categoryID");
        var title = req.param("title");
        var passed = req.param("passed");
        new DataProxy({
            req:req,
            res:res,
            reqType:"http",
            reqOption:{
                url:"/nd/infoNews/getArticleListInfos",
                params:{page:page,rows:rows,categoryID:categoryID,title:title,passed:passed},
                success:function(res,data){
                    var json = JSON.parse(data);
                    if(json.code == 0 ){
                        //console.log(json);
                        res.status(200).send(JSON.stringify(json));
                    }else{
                        res.status(200).send(data);
                    }
                }
            }
        }).handleRequest();
    });

    //添加文章
    router.post('/member/commitArticle', function (req, res) {
        var info_id = req.param("info_id");//编辑时用
        var title = req.param("title");
        var info_category_id = req.param("info_category_id");
        var ishost = req.param("ishost");
        var home_display = req.param("home_display");
        var passed = req.param("passed");
        var key_word = req.param("key_word");
        var source = req.param("source");
        var source_url = req.param("source_url");
        var introduction = req.param("introduction");
        var content = req.param("content");
        var thumbnail = req.param("thumbnail");
        var orderid = req.param("orderid");
        var file = req.param("file");

        //默认为添加
        var query_url = "/nd/infoNews/releaseArticle";
        //console.log("123");
        if(/^\d+$/.test(info_id) && parseInt(info_id) > 0){
            query_url = "/nd/infoNews/updateArticle";
        }
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: query_url,
                params: {info_id:info_id,
                    title:title,info_category_id:info_category_id,
                    ishost:ishost,home_display:home_display,
                    passed:passed,key_word:key_word,
                    source:source,source_url:source_url,
                    introduction:introduction,content:content,
                    thumbnail:thumbnail,orderid:orderid,file:file},
                success: function (res, data) {
                    //console.log(data);
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
    /*//添加文章信息
    router.post('/member/article/add', function (req, res) {
        var title=req.param('title');
        var content=req.param('content');
        var info_category_id=req.param('info_category_id');

        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url:"/nd/infoNews/releaseArticle",
                params: {title:title,content:content,info_category_id:info_category_id},
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
    });*/

//删除文章信息
    router.post('/member/article/delete', function (req, res) {
        var info_id=req.param('info_id');
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url:"/nd/infoNews/delArticle",
                params: {info_id:info_id},
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
    //编辑文章信息
    router.post('/member/article/delete', function (req, res) {
        var title=req.param('title');
        var content=req.param('content');
        var info_category_id=req.param('info_category_id');
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url:"/nd/infoNews/updateArticle",
                params: {title:title,content:content,info_category_id:info_category_id},
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
    //获取文章信息
    router.post('/member/article/getArticleInfo', function (req, res) {
        var title=req.param('title');
        var content=req.param('content');
        var info_id=req.param('info_id');
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url:"/nd/infoNews/getArticleInfo",
                params: {title:title,content:content,info_id:info_id},
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

    //增加产品信息
    router.post('/getArticleVListByIds', function (req, res) {
        var info_ids=req.param('info_ids');
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url:"/nd/infoNews/getArticleVListByIds",
                params: {info_ids:info_ids},
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
