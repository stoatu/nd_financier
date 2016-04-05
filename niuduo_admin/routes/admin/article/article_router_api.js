var DataProxy = require("data-proxy");
/* GET home page. */
exports.articleRouter=function(router){

    //我的文章列表
    router.post('/admin/getArticleVList',function(req,res){
        var page = req.param("page");
        var rows = req.param("rows");
        var info_category_id = req.param("info_category_id");
        var title = req.param("title");
        var passed = req.param("passed");
        new DataProxy({
            req:req,
            res:res,
            reqType:"http",
            reqOption:{
                url:"/nd/infoAdminNews/getArticleListInfos",
                params:{page:page,rows:rows,info_category_id:info_category_id,title:title,passed:passed},
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
    //添加文章信息
    router.post('/member/article/add', function (req, res) {
        var title=req.param('title');
        var content=req.param('content');
        var info_category_id=req.param('info_category_id');

        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url:"/nd/infoAdminNews/releaseArticle",
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

//删除文章信息
    router.post('/member/article/delete', function (req, res) {
        var info_id=req.param('info_id');
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url:"/nd/infoAdminNews/delArticle",
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
    router.post('/member/article/updateArticle', function (req, res) {
        var info_id=req.param('info_id');
        var passed=req.param('passed');
        var createdBy=req.param('createdBy');
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url:"/nd/infoAdminNews/updateArticle",
                params: {createdBy:createdBy,passed:passed,info_id:info_id},
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
