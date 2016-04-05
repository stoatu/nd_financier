/**
 * 后台API Action
 * @author wdb
 * @param name
 */

/*var URL         = require("./apiurl");*/
var DataProxy   = require("data-proxy");

function send(req, res, url, params, callback) {
    var path = url;
    console.log(path);
    console.log(params);
    new DataProxy({
        req : req,
        res : res,
        reqType : "http",
        reqOption : {
            url : path,
            params : params,
            success : callback || function(res,data){
                var json = JSON.parse(data);
                if(json.data) {
                    res.status(200).json(json.data);
                }else {
                    res.status(200).json(json);
                }
            }
        }
    }).handleRequest();
}
exports.send = send;