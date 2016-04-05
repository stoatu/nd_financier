/**
 * Created by 15224 on 2016/3/9.
 */
'use strict'

var table_slide = function (elem,callback){
    var _elem = $(elem);

    _elem.children('h5').click(function (){
        $(this).addClass('active').siblings('h5').removeClass('active');

        callback();
    });


};