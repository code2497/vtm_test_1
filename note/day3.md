赶在今天完成了所有的静态样式（虽然过了十二点）

早上那段时间算是补昨天的坑，中午下午晚上都在写下半部分样式和结构

## 难题

- **浏览器窗口缩小到一定程度会导致布局混乱。**

  **大概是计算精度的原因**。白天一直在处理这个问题，一直不懂什么原因，最后找师兄讨论了一下决定把锅甩给计算精度，因为出问题的都是靠的比较紧的几个元素。

  最后决定用**缩小到一定大小后锁格式同时出现横向滚动条**解决，代码修改如下

  ```js
  if ((clientWidth <= 1070 && e.type != 'DOMContentLoaded') || (clientWidth <= 1070 && e.type == 'DOMContentLoaded')) {
  	docEl.style.fontSize = 1 * (1070 / 1519) + 'px';
  	return;
  }//在计算公式前先判断一波
  ```

  ```css
  body{
      min-width: 1070px;
  }/*重置样式里面给body最小宽度，在1070时锁定比例*/
  ```



目前静态布局方面基本上没啥难题，如果出现问题的话也就是有可能更大屏幕下布局会出现混乱（明天找有屏幕的py们搞一波）。

接下来的时间里我打算再写一篇总结吧，然后再尽力给网页增加一些动态效果

同时也学习一些css3方面的新特性，在js方面也要写更多的有用函数（上次学完个运动框架是真滴爽）。
