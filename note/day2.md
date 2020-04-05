今早依旧起的比家里的狗还早，白天十分不容易的敲完搜索栏和logo栏的结构和样式，顺便学了点flex布局，准备做下面的更多资讯

看着居中宽1366px的页面有点丑，而且在布局更多资讯那边的区域的时候发现它占的空间极小，感觉不对劲，于是找师兄问了一波

之后被告知要占满网页宽高，便开始把psd改成1920。结果发现上面的字符大小等跟我浏览器页面对不上号，原因是我的页面并没有1920宽，而且ps中字符像素大小会随着图像缩放改变。。

于是引出了今天的终极难题：

## 难题

**响应式布局**

框架不给用的话，好像能从rem单位下手的样子。



**在网上查了一波，整合到以下信息**

1rem是根据html标签中的font-size确定的

比如html中font-size = 16px

那么1rem = 16px

所以做个简单的响应式的话关键就是**获取用户在当前窗口宽度下1rem应该等于多少px**，通过以下公式可以计算：

设定A：设计稿宽度

​       B：预设rem与px比例

​	   C：用户窗口宽度

​	   D：所求rem与px比例

根据神奇的比例定理得出：A/B = C/D

**所求rem与px比例 = (预设rem与px比例 X 用户窗口宽度) / 设计稿宽度**

```js
//简单自适应加载

        //获取用户宽
        function getViewportOffset(){
                if(document.compatMode === "BackCompat"){
                    return document.body.clientWidth;
                }else{
                    return document.documentElement.clientWidth;
                }
        }

        var autoAdjust = function (doc, win) {
            var docEl = doc.documentElement,
                resizeEvt = 'resize',//存储窗口改变事件
                recalc = function () {
                    //窗口改变后的回调函数
                    var clientWidth = getViewportOffset();
                    //1519为设计稿宽度
                    //确定每个rem的大小，此处为一个单位rem等于相应一个单位px
                    //相应的比例公式可以看day2的笔记
                    docEl.style.fontSize = 100 * (clientWidth / 1519) + 'px';
            };
            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);//改变窗口时重新计算单位rem大小
            doc.addEventListener('DOMContentLoaded', recalc, false);//HTML文档加载完成完成后计算rem大小
        };
        autoAdjust(document, window);
```

其实只是一个根据窗口大小缩放所有元素的一个小函数，应该不算完全的响应式。

具体为什么我要去做这个，可能是想证明一下我学过js吧。。