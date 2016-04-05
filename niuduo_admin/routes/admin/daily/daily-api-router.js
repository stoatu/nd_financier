var DataProxy = require("data-proxy");

var CommonUse = require("../../common_use");

exports.dailyRouter = function(router) {

    //获得所有轮播图
    router.post('/showAllAdminDiagram', function (req, res) {
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/adminDiagram/showAllAdminDiagram",
                params: {},
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

    //添加轮播图
    router.post('/addAdminDiagram', function (req, res) {
        var diagram_url=req.param("diagram_url");
        var height=req.param("imgheight");
        var width=req.param("imgwidth");
        var linkurl=req.param("linkurl");
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/adminDiagram/addAdminDiagram",
                params: {diagram_url:diagram_url,height:height,width:width,linkurl:linkurl},
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

    //修改轮播图
    router.post('/editAdminDiagram', function (req, res) {
        var diagram_id=req.param("diagram_id");
        var diagram_url=req.param("diagram_url");
        var height=req.param("imgheight");
        var width=req.param("imgwidth");
        var linkurl=req.param("linkurl");
        if(linkurl == "")
            linkurl = " ";
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/adminDiagram/editAdminDiagram",
                params: {diagram_url:diagram_url,height:height,width:width,diagram_id:diagram_id,linkurl:linkurl},
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

    //删除轮播图
    router.post('/deleteAdminDiagram', function (req, res) {
        var diagram_id=req.param("diagram_id");
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/adminDiagram/deleteAdminDiagram",
                params: {diagram_id:diagram_id},
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

    //上移轮播图
    router.post('/upAdminDiagram', function (req, res) {
        var diagram_sort=req.param("diagram_sort");
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/adminDiagram/upAdminDiagram",
                params: {diagram_sort:diagram_sort},
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

    //下移轮播图
    router.post('/downAdminDiagram', function (req, res) {
        var diagram_sort=req.param("diagram_sort");
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/adminDiagram/downAdminDiagram",
                params: {diagram_sort:diagram_sort},
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

    //获得所有公告
    router.post('/showAllAnnouncementAdmin', function (req, res) {
        var page=req.param("page");
        var rows=req.param("rows");
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/infoAnnouncement/getlist",
                params: {page:page,rows:rows},
                success: function (res, data) {
                    var json = JSON.parse(data);
                    console.log(json.code);
                    if(json.code == 0 ){
                        res.status(200).send(JSON.stringify(json));
                    }else{
                        res.status(200).send(data);
                    }
                }
            }
        }).handleRequest();
    });

    //添加公告
    router.post('/releaseAnnouncement', function (req, res) {
        var infoAnnouncementId = req.param("infoAnnouncementId");//编辑时用
        var title = req.param("title");
        var passed=req.param("passed");
        var content = req.param("content");
        var introduction = req.param("introduction");
        var thumbnail = req.param("thumbnail");
        var top_flag= req.param("top_flag");
        //默认为添加
        var query_url = "/infoAnnouncement/addAnnouncement";
        if(/^\d+$/.test(infoAnnouncementId) && parseInt(infoAnnouncementId) > 0){
            query_url = "/infoAnnouncement/updateAnnouncement";
        }
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: query_url,
                params: {title:title,content:content,top_flag:top_flag,passed:passed,thumbnail:thumbnail,infoAnnouncementId:infoAnnouncementId,introduction:introduction},
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

    //修改公告
    router.post('/editAnnouncement', function (req, res) {
        var title= req.param("title");
        var content= req.param("content");
        var announcement_id= req.param("infoAnnouncementId");
        var top_flag= req.param("top_flag");
        var passed=req.param("passed");
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/infoAnnouncement/updateAnnouncement",
                params: {title:title,content:content,infoAnnouncementId:announcement_id,top_flag:top_flag,passed:passed},
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

    //删除公告
    router.post('/deleteAnnouncement', function (req, res) {
        var announcement_id= req.param("infoAnnouncementId");
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/infoAnnouncement/deleteAnnouncement",
                params: {id:announcement_id},
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

    //置顶公告
    router.post('/topCurrentAnnouncement', function (req, res) {
        var info_announcement_id= req.param("infoAnnouncementId");
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/infoAnnouncement/topCurrentAnnouncement",
                params: {info_announcement_id:info_announcement_id},
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

    //帮助中心
    router.post('/showStaticFileAdmin', function (req, res) {
        var page=req.param("page");
        var rows=req.param("rows");
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/staticFile/getlist",
                params: {page:page,rows:rows},
                success: function (res, data) {
                    var json = JSON.parse(data);
                    console.log(json.code);
                    if(json.code == 0 ){
                        res.status(200).send(JSON.stringify(json));
                    }else{
                        res.status(200).send(data);
                    }
                }
            }
        }).handleRequest();
    });

    //添加静态文件信息
    router.post('/releasestaticfile', function (req, res) {
        var staticfileid = req.param("staticfileid");//编辑时用
        var title = req.param("title");
        var content = req.param("content");
        var catname = req.param("catname");
        console.log(title);
        console.log(content);
        //默认为添加
        var query_url = "/staticFile/addStaticfile";
        if(/^\d+$/.test(staticfileid) && parseInt(staticfileid) >= 0){
            query_url = "/staticFile/updateStaticfile";
        }
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: query_url,
                params: {title:title,content:content,staticfileid:staticfileid,catname:catname},
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
    //删除静态文件信息
    router.post('/deleteStaticfile', function (req, res) {
        var staticfileid= req.param("staticfileid");
        new DataProxy({
            req: req,
            res: res,
            reqType: "http",
            reqOption: {
                url: "/staticFile/deleteStaticfile",
                params: {staticfileid:staticfileid},
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
};