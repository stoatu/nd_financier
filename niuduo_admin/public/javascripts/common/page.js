var page=1; //当前页数
var rows=2; //每页最大行
var all_page=1;//总页数
var all_num=1;//总记录
 var init;

function renderPage(pageId,current_page,all_pages,total_num,max_rows,init){
    rows=max_rows;
    all_page=all_pages;
    page=current_page;
    all_num=total_num;
    this.init=init;
    var pageContent= 
        "<dd id='first'  class='onFource_cls paddtop' onclick='goFirst()'>首页</dd>"+

        "<dd id='pre' class='onFource_cls paddtop'  onclick='goPre()'>上一页</dd>"+

        "<dd id='next' class='onFource_cls paddtop'  onclick='goNext()'>下一页</dd>"+

        "<dd id='last' class='onFource_cls paddtop' onclick='goLast()'>尾页</dd>"+

        "<dd class='paddtop'>第<span>"+page+"</span>页</dd>"+

        "<dd class='paddtop'>共<span>"+all_page+"</span>页</dd>"+

        "<dd class='paddtop'>共<span>"+all_num+"</span>条记录</dd>"+

        "<dd><input id='go_text'type='text' value='"+page+"'></dd>"+

        "<dd class='last_dd'><button id='go_btn' onclick='go()'>Go</button></dd>";
        
    $("#"+pageId+">dd").remove();
    $("#"+pageId).append(pageContent);
    if (page == 1) {
        $('#first').css('color','#ccc').attr('onclick','return;');
        $('#pre').css('color','#ccc').attr('onclick','return;');
    }
    if (page == all_page) {
        $('#last').css('color','#ccc').attr('onclick','return;');
        $('#next').css('color','#ccc').attr('onclick','return;');
    }

}



function goFirst(){
    page=1;
    pageMove();

};

function goLast(){
    page=all_page;
    pageMove();
};

function goPre(){
    if(page>1){
        page--;
    }
    pageMove();
};

function goNext(){
    if(page<all_page){
        page++;
    }
    pageMove();
};

function go(){
    page=$('#go_text').val();
    if(page>all_page){
        return ;
    }
    pageMove();
};

function pageMove(){
    init();
}
 