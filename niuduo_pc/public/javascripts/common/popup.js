/**
 * Created by 15224 on 2016/3/20.
 */
'use strict'

/*------
use:

1,创建实例:  var refresh = new Refresh();
2,初始化页面结构: refresh.init();
3,导入内容结构: refresh.create_dom(state,width,height,tit,content,btn1,btn2,fn1,fn2).
  state: 状态 1【内容content为字符串】/ 2【内容content自定义dom结构】;
  tit: 标题(String);
  content: 内容结构(String);
  btn1: 按钮1(String);
  btn2: 按钮2(String);
  fn1: btn1按钮回调(Function);
  fn2: btn2按钮回调(Function);


-----*/



function Popup(){
    this.box_id = 'page_box'; //内容区dom id

    this.callback1;  //btn1 回调
    this.callback2;  //btn2 回调

    //初始化页面
    this.init = function (){
        var page_dom = '<div class="refresh_page" id="refresh_page">' +
                           '<div class="page_bg"></div>' +
                           '<div class="page_box" id="' + this.box_id + '"></div>'
                       '</div>';

        $('body').append(page_dom);
    };

    //导入内容
    this.create_dom = function (state,tit,content,btn1,btn2,fn1,fn2){
        var tit = state === 1 ? '<h4>' + tit + '</h4>' : '<h5>' + tit + '</h5>';
        var content = state === 1 ? '<div class="prompt">' + content + '</div>' : content;
        var btn = state === 1 ?  '<button type="button" id="btn1">' + btn1 + '</button>' :  '<button type="button" id="btn1">' + btn1 + '</button><button type="button" id="btn2">' + btn2 + '</button>';
        var dom = tit + '<div class="box_content">' + content + btn + '</div>';
        var $box = $('#' + this.box_id);

        this.callback1 = fn1;
        this.callback2 = fn2;

        var this_current = this;

        $('#refresh_page').show();
        $box.empty().append(dom).css({
            marginLeft: -parseInt($box.outerWidth()) / 2,
            marginTop: -parseInt($box.outerHeight()) / 2
        });
        document.body.style.overeflow = 'hidden';

        //btn1 click
        $box.on('click','#btn1',function (){
            $('#refresh_page').hide();
            document.body.style.overflow = 'auto';
            this_current.callback1();

        });

        //btn2 click
        $box.on('click','#btn2',function (){
            $('#refresh_page').hide();
            document.body.style.overflow = 'auto';
            this_current.callback2();
        });
    }
}
