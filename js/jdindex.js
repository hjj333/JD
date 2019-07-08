window.onload = function () {
    // 顶部搜索
    search();
    // 轮播图
    banner();
    // 倒计时
    downTime();
};
var search = function () {
    var searchBox = document.querySelector('.jd_search_box');
    var banner = document.querySelector('.jd_banner');
    var height = banner.offsetHeight;
    var nowOpacity = 0; // 默认固定顶部透明背景
    window.onscroll = function () {  // 监听页面滚动事件  
        var scrollTop = document.documentElement.scrollTop;
        if (scrollTop < height) {  // 当页面滚动的时候---随着页面卷曲的高度变大透明度变大
            nowOpacity = scrollTop / height * 0.85;
        } else {  // 当页面滚动的时候---超过某一个高度（轮播图）的时候透明度不变
            nowOpacity = 0.85;
        }
        searchBox.style.background = 'rgba(201,21,35,' + nowOpacity + ')';
    };
};
var banner = function () {
    var banner = document.querySelector('.jd_banner');
    var width = banner.offsetWidth;
    var imgBox = banner.querySelector('ul:first-child');
    var pointBox = banner.querySelector('ul:last-child');
    var points = pointBox.querySelectorAll('li');
    var addTransition = function () {
        imgBox.style.transition = 'all 0.2s';
        imgBox.style.webkitTransition = 'all 0.2s';
    };
    var setTranslateX = function (translatex) {
        imgBox.style.transform = 'translateX(' + translatex + 'px)';
        imgBox.style.webkitTransform = 'translateX(' + translatex + 'px)';
    };
    var removeTransition = function () {
        imgBox.style.transition = "none";
        imgBox.style.webkitTransition = "none";
    };
    var index = 1;
    var timer = setInterval(function () {
        index++;
        addTransition();
        setTranslateX(-index * width);
    }, 1000);
    imgBox.addEventListener('transitionend', function () {
        if (index >= 9) {
            // 1.当最后一张图片动画完成后，瞬间定位到第一张做无缝衔接
            index = 1;
            // 清除过渡效果
            removeTransition();
            // 根据图片索引做位移
            setTranslateX(-index * width);
        } else if (index <= 0) {
            // 滑动的无缝衔接
            index = 8;
            removeTransition();
            setTranslateX(-index * width);
        }
        // 2.轮播图导航的交互
        for (var i = 0; i < points.length; i++) {
            var obj = points[i];
            obj.classList.remove('now');
            points[index - 1].classList.add('now');
        }
    });
    // 3.绑定移动端屏幕触摸事件
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    imgBox.addEventListener('touchstart', function (e) {
        // 触摸屏幕后清除定时器
        clearInterval(timer);
        // 记录起始位置的X坐标
        startX = e.touches[0].clientX;
    });
    imgBox.addEventListener('touchmove', function (e) {
        // 记录滑动过程中的X坐标
        var moveX = e.touches[0].clientX;
        // 计算滑动距离
        distanceX = moveX - startX;
        // 元素将要进行的定位
        var translateX = -index * width + distanceX;
        removeTransition();
        setTranslateX(translateX);
        isMove = true;
    });
    imgBox.addEventListener('touchend', function (e) {
        if (isMove) {
            //  吸附效果（有动画）： 滑动距离不超过图片的三分之一时，图片回到当前索引
            if (Math.abs(distanceX) < width / 3) {
                addTransition();
                setTranslateX(-index * width);
            } else {
                if (distanceX > 0) {
                    // 左滑动：滑动距离为负
                    index--;
                } else {
                    // 右滑动：滑动距离为正
                    index++;
                }
                addTransition();
                setTranslateX(-index * width);
            }
        }
        // 触摸事件结束进行参数重置
        start = 0;
        distanceX = 0;
        isMove = false;
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            addTransition();
            setTranslateX(-index * width);
        }, 1000);
    });
};
var downTime = function () {
    // 自定义倒计时开始时间2h
    var time = 2 * 60 * 60;
    var timeBox = document.querySelector('.time').querySelectorAll('span');
    var timer = setInterval(function () {
        time--;
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = time % 60;
        timeBox[0].innerHTML = Math.floor(h / 10);
        timeBox[1].innerHTML = Math.floor(h % 10);
        timeBox[3].innerHTML = Math.floor(m / 10);
        timeBox[4].innerHTML = Math.floor(m % 10);
        timeBox[6].innerHTML = Math.floor(s / 10);
        timeBox[7].innerHTML = Math.floor(s % 10);
        if (time < 0) {
            clearInterval(timer);
        }
    }, 1000);
};
