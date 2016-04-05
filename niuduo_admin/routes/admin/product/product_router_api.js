var DataProxy = require("data-proxy");
/* GET home page. */
exports.productRouter=function(router){

    //产品列表
    router.post('/admin/getProductVList',function(req,res){
        var page = req.param("page");
        var rows = req.param("rows");
        var product_name=req.param("product_name");
        var type_id=req.param("type_id");
        var status=req.param("status");
        new DataProxy({
            req:req,
            res:res,
            reqType:"http",
            reqOption:{
                url:"/admin/product_info/getAdminProductVList",
                params:{product_name:product_name,type_id:type_id,status:status,page:page,rows:rows},
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

    //更新审核状态
    router.post('/admin/updateStatus',function(req,res){
        var product_id=req.param("product_id");
        var status=req.param("status");
        var error_msg=req.param("error_msg");
        new DataProxy({
            req:req,
            res:res,
            reqType:"http",
            reqOption:{
                url:"/admin/product_info/updateStatus",
                params:{product_id:product_id,status:status,error_msg:error_msg},
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
}
