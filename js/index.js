//二维码展示函数
var QRshow = function () {
    var QR = document.querySelector(".fixed").querySelector(".QRcode");
    var QRpopup = document.querySelector(".popup").querySelector(".pQRcode");

    QR.onmouseenter = function () {
        QRpopup.style.display = "block";
    };

    QR.onmouseleave = function () {
        QRpopup.style.display = "none";
    };
}; 

//更多资讯栏滚动函数
var scrolling = function () {
    var sideBarLi = document
        .querySelector(".under")
        .querySelector(".more")
        .querySelector(".sideBar")
        .getElementsByTagName("li");

    var  mainContent = document
        .querySelector(".under")
        .querySelector(".more")
        .querySelector(".border")
        .getElementsByClassName("main");
    
    var border = document
    .querySelector(".under")
    .querySelector(".more")
    .querySelector(".border");

    var json = {
        'obj': mainContent[0],
        'curName': 'opacity',
        'iTarget': 1,
        'iSpeed': 0.01,
        'iTimer': 10,
        'pauseKey': 0,//暂停判断，不能乱动
        'counter': 0,//计数器，不能乱动
        'images': 4,
        'jumpKey': 0//用来判断是否跳转，不能乱动
    };

    var start = true;//只是用来解决第一圈不正常counter

    json.outsideTimer = setInterval(function () {
        
        if(start){
            //只是用来解决第一圈不正常counter
            json.counter++;
            start = false;
        }

        
        
        var i = (json.counter == 0) ? (3) : (json.counter - 1);//选择要消失的那个内容的下标
        json.obj = mainContent[i];
        mainContent[i].style.display = 'none';//让上一个内容立刻消失
        mainContent[i].style.opacity= '0';
       
        //让显示内容缓慢出现
        mainContent[json.counter].style.display = 'flex';
        mainContent[json.counter].style.opacity = '0';
        json.obj = mainContent[json.counter];
        move(json);
    }, 3000);


    //以下是悬停设置
    border.onmouseover = function () {
        clearInterval(json.outsideTimer);
        json.pauseKey = 1;//悬停时开启暂停判断
    }

    border.onmouseout = function () {
        if (json.pauseKey == 1) {
            
            json.pauseKey = 0;
            //重启计时器
            json.outsideTimer = setInterval(function () {
                
                json.jumpKey = 0;
                var i = (json.counter == 0) ? (3) : (json.counter - 1);//选择要消失的那个内容的下标
                json.obj = mainContent[i];
                mainContent[i].style.display = 'none';//让上一个内容立刻消失
                mainContent[i].style.opacity= '0';
                //让显示内容缓慢出现
                mainContent[json.counter].style.display = 'flex';
                mainContent[json.counter].style.opacity = '0';
                json.obj = mainContent[json.counter];
                move(json);
                
            }, 7000);
        }
    }
    //悬停结束


    //以下是圆形按钮设置
    for (var i = 0; i < 4; i++) {
        (function (i) {
            sideBarLi[i].onclick = function () {
                json.jumpKey = 1;
                clearInterval(json.outsideTimer);
                if (!/active/.test(sideBarLi[i].className)) {
                    sideBarLi[i].className += " active";
                    for (var j = 0; j < json.images; j++) {
                        if (j != i) {
                            sideBarLi[j].className = sideBarLi[j].className.replace(/ active/, "");
                            mainContent[j].style.display = 'none';
                            mainContent[j].style.opacity = '0';
                        }
                    }
                }

                
                json.counter = i;
                mainContent[i].style.opacity = '0';
                mainContent[i].style.display = 'flex';
                json.obj = mainContent[i];
                move(json);
                

                json.counter = json.counter == 3?(0):(json.counter + 1);
                json.outsideTimer = setInterval(function () {
                    json.jumpKey = 0;
                    var i = (json.counter == 0) ? (3) : (json.counter - 1);//选择要消失的那个内容的下标
                    json.obj = mainContent[i];
                    mainContent[i].style.display = 'none';//让上一个内容立刻消失
                    mainContent[i].style.opacity= '0';
                    //让显示内容缓慢出现
                    mainContent[json.counter].style.display = 'flex';
                    mainContent[json.counter].style.opacity = '0';
                    json.obj = mainContent[json.counter];
                    move(json);
                }, 7000);
            }


        }(i));
    }
    //圆形按钮结束

    //样式获取函数
    function getStyle(elem, prop){
        if(window.getComputedStyle){
            return window.getComputedStyle(elem, null)[prop];//传进来的是字符串 一定要用中括号
        }else{
            return elem.currentStyle[prop];
        }
    }
    

    //运动框架函数
    function move(json, func) {
        clearInterval(json.timer);

        var tempcur =
            json.curName == "opacity"
                ? parseFloat(getStyle(json.obj, json.curName))
                : parseInt(getStyle(json.obj, json.curName));

        if (json.pauseKey == 1 && tempcur == json.iTarget) {
            clearInterval(json.timer);
            return;
        }

            if (!/active/.test(sideBarLi[json.counter].className)) {
                sideBarLi[json.counter].className += " active";
                for (var j = 0; j < json.images; j++) {
                    if (j != json.counter) {
                        sideBarLi[j].className = sideBarLi[j].className.replace(/ active/, "");
                    }
                }
            }

        json.timer = setInterval(function () {
            //如果暂停键开启及时停止
            if (json.pauseKey == 1 && tempcur == json.iTarget) {
                clearInterval(json.timer);
                return;
            }

            //区分透明度和其他
            var cur =
                json.curName == "opacity"
                    ? parseFloat(getStyle(json.obj, json.curName))
                    : parseInt(getStyle(json.obj, json.curName));

            //一次运动是否结束的判断
            if(!json.jumpKey && json.pauseKey == 0){
                if (cur == json.iTarget) {
                    
                    if (json.counter < json.images - 1) {
                        json.counter++;
                    } else {
                        json.counter = 0;
                    }
                    func && func();
                    clearInterval(json.timer);
                    return;
                }
            }

                
            cur = cur > json.iTarget ? (cur -= json.iSpeed) : (cur += json.iSpeed);

            if (json.curName == "opacity") {
                json.obj.style[json.curName] = cur;
            } else {
                json.obj.style[json.curName] = cur + "px";
            }
        }, json.iTimer);
        
        return;
    }
}; 

scrolling();
QRshow();
