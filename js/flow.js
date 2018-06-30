/**
 * Created by www.it666.com.
 */
(function (window) {
    // 1. 调用选项卡
    tab();
    // 2. 动态创建元素
    autoCreateImg();
    // 3. 瀑布流的局部
    setTimeout(function () {
        waterFull("dom_pull", "box");
    }, 200);
    // 4. 窗口的滚动
    window.onscroll = function () {
        // 4.1 瀑布流加载新图片的条件
        if(checkWillLoadImage()){
            autoCreateImg();
            waterFull("dom_pull", "box");
        }

        // 4.2 判断是否吸顶
        var scrollTop =scroll().top;
        if(scrollTop >=150){
            $('top_nav').style.display = "block";
            $('elevator').style.display = "block";
        }else{
            $('top_nav').style.display = "none";
            $('elevator').style.display = "none";
        }

        // 4.4. 滚回顶部
        $('elevator').onclick = function () {
            buffer(document.documentElement, {scrollTop: 0}, null);
        }
    };
    // 5. 监听点击按钮
    $("login").onclick = function () {
       $("mask").style.display = "block";
    };
    $("close_btn").onclick = function () {
        $("mask").style.display = "none";
    };
    // 6. 广告轮播
    bannerAutoPlay();
})(window);

/**
 * 自动轮播
 */
function bannerAutoPlay() {
   // 1. 获取所有的li标签
   var lis = $("slider_banner").getElementsByTagName("li");
   var index = 0;
   // 2. 开始定时器
   setInterval(function () {
       // 2.1 改变透明度
       for(var i=0; i<lis.length; i++){
           var singerLi = lis[i];
           buffer(singerLi, {opacity: 0}, null);
       }
       buffer(lis[index], {opacity: 1}, null);

       // 2.2 索引++
       index++;
       if(index === lis.length){
           index = 0;
       }
   }, 2000);
}

/**
 * 自动创建图片
 */
function autoCreateImg() {
    // 1.1 数据
    var json = [
        {txt: '当我们正在为生活疲于奔命的时候，生活已经离我们而去。——约翰·列侬', pic: '../img/hua11.jpg'},
        {txt: '活在世上，不必什么都知道，只知道最好的就够了。——王小波', pic: '../img/untitled.png'},
        {txt: '世界上任何书籍都不能带给你好运，但是它们能让你悄悄变成你自己。——黑塞', pic: '../img/11.jpg'},
        {txt: '当我们正在为生活疲于奔命的时候，生活已经离我们而去。——约翰·列侬', pic: '../img/hua11.jpg'},
        {txt: '活在世上，不必什么都知道，只知道最好的就够了。——王小波', pic: '../img/untitled.png'},
        {txt: '世界上任何书籍都不能带给你好运，但是它们能让你悄悄变成你自己。——黑塞', pic: '../img/11.jpg'}, {txt: '当我们正在为生活疲于奔命的时候，生活已经离我们而去。——约翰·列侬', pic: 'img/hua11.jpg'},
        {txt: '活在世上，不必什么都知道，只知道最好的就够了。——王小波', pic: '../img/untitled.png'},
        {txt: '世界上任何书籍都不能带给你好运，但是它们能让你悄悄变成你自己。——黑塞', pic: '../img/11.jpg'}, {txt: '当我们正在为生活疲于奔命的时候，生活已经离我们而去。——约翰·列侬', pic: 'img/hua11.jpg'},
        {txt: '活在世上，不必什么都知道，只知道最好的就够了。——王小波', pic: '../img/untitled.png'},
        {txt: '世界上任何书籍都不能带给你好运，但是它们能让你悄悄变成你自己。——黑塞', pic: '../img/11.jpg'}, {txt: '当我们正在为生活疲于奔命的时候，生活已经离我们而去。——约翰·列侬', pic: 'img/hua11.jpg'},
        {txt: '活在世上，不必什么都知道，只知道最好的就够了。——王小波', pic: '../img/untitled.png'},
        {txt: '世界上任何书籍都不能带给你好运，但是它们能让你悄悄变成你自己。——黑塞', pic: '../img/11.jpg'}, {txt: '当我们正在为生活疲于奔命的时候，生活已经离我们而去。——约翰·列侬', pic: 'img/hua11.jpg'},
        {txt: '活在世上，不必什么都知道，只知道最好的就够了。——王小波', pic: '../img/untitled.png'},
        {txt: '世界上任何书籍都不能带给你好运，但是它们能让你悄悄变成你自己。——黑塞', pic: '../img/11.jpg'}, {txt: '当我们正在为生活疲于奔命的时候，生活已经离我们而去。——约翰·列侬', pic: 'img/hua11.jpg'},
        {txt: '活在世上，不必什么都知道，只知道最好的就够了。——王小波', pic: '../img/untitled.png'},
        {txt: '世界上任何书籍都不能带给你好运，但是它们能让你悄悄变成你自己。——黑塞', pic: '../img/11.jpg'}, {txt: '当我们正在为生活疲于奔命的时候，生活已经离我们而去。——约翰·列侬', pic: 'img/hua11.jpg'},
        {txt: '活在世上，不必什么都知道，只知道最好的就够了。——王小波', pic: '../img/untitled.png'},
        {txt: '世界上任何书籍都不能带给你好运，但是它们能让你悄悄变成你自己。——黑塞', pic: '../img/11.jpg'}, {txt: '当我们正在为生活疲于奔命的时候，生活已经离我们而去。——约翰·列侬', pic: 'img/hua11.jpg'},
        {txt: '活在世上，不必什么都知道，只知道最好的就够了。——王小波', pic: '../img/untitled.png'},
        {txt: '世界上任何书籍都不能带给你好运，但是它们能让你悄悄变成你自己。——黑塞', pic: '../img/11.jpg'}, {txt: '当我们正在为生活疲于奔命的时候，生活已经离我们而去。——约翰·列侬', pic: 'img/hua11.jpg'},
        {txt: '活在世上，不必什么都知道，只知道最好的就够了。——王小波', pic: '../img/untitled.png'},
        {txt: '世界上任何书籍都不能带给你好运，但是它们能让你悄悄变成你自己。——黑塞', pic: '../img/11.jpg'},
    ], str, txt, pic, htmlStr;

    // 1.2 遍历
    for (var i = 0; i < 30; i++) {
        // 1.2.0 获取父标签的文本
        str = $("dom_pull").innerHTML;

        // 1.2.1 取出图片的地址和文字
        txt = json[i].txt;
        pic = json[i].pic;

        // 1.2.2 创建字标签
        htmlStr = "<div class='box'>" +
            "<div class='pic'>" +
            "<img src=" + pic + " alt=''>" +
            "<div class='cover'></div>" +
            "</div>" +
            "<p>" + txt + "</p>" +
            "<div class='btn-box'>" +
            "<a href='' class='collect'>采集</a>" +
            "<a href='' class='like'>" +
            "<span class='heart'></span>" +
            "</a></div></div>";

        // 1.2.3 拼接
        str += htmlStr;
        $("dom_pull").innerHTML = str;

        // 1.2.4 绑定事件
        var wrapBox = $("dom_pull").getElementsByClassName("box");
        var wrappic = $("dom_pull").getElementsByClassName("pic");
        for (var j = 0; j < wrapBox.length; j++) {
            wrapBox[j].onmouseover = function () {
                 this.childNodes[2].style.display = "block";
            };

            wrapBox[j].onmouseout = function () {
                this.childNodes[2].style.display = "none";
            };

            wrappic[j].onmouseover = function () {
                this.childNodes[1].style.display = "block";
            };

            wrappic[j].onmouseout = function () {
                this.childNodes[1].style.display = "none";
            }
        }
    }
}

/**
 * 选项卡
 */
function tab() {
    // 1. 获取需要的标签
    var allLis = $("tab_header").getElementsByTagName("li");
    var doms = $("tab_content").getElementsByClassName("dom");
    var lastOne = 0;

    // 2. 遍历监听
    for (var i = 0; i < allLis.length; i++) {
        var li = allLis[i];
        (function (i) {
            li.onmousedown = function () {
                // 1. 清除样式
                allLis[lastOne].className = "";
                doms[lastOne].style.display = "none";
                // 2. 设置选中
                this.className = "current";
                doms[i].style.display = "block";
                // 3. 赋值
                lastOne = i;
            }
        })(i);
    }

}

function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}
