# 介绍Stick

`position: sticky`是新增的css属性，粘性定位可以被认为是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位。

但是并不是所有浏览器都支持`position: sticky`。

所以我做了一个sticky-polyfill处理。

## 思路

1. 获取元素初始化时候的offsetTop，并存储在元素的dataset中
2. 监听滚动条事件，并使用节流方式处理滚动事件处理器
3. 在事件处理器里，获取浏览器的纵轴的滚动偏移量——`window.pageYOffset`，然后跟元素的纵轴偏移量作比较，判断是否需要对元素做`position: fixed`处理，或者还原`positon`

> 因为需要把元素设置为 position: fixed;所以元素的width和height需要制定确切的值

## API

该库仅对外提供一个接口：

```JavaScript
/**
* position: sticky的polyfill
* 推荐在文档加载完成之后（‘DOMContentLoaded’事件）调用
* @param {String} selectors 选择器
* @param {String} top 距离顶部的偏移量
*/
function sticky(selectors, top = 0)
```

## 使用NPM安装

```CMD
npm i sticky-polyfill --save
```

## 项目地址

[GitHub地址](https://github.com/coconilu/sticky-polyfill)

## 演示

可以在[CodePen](https://codepen.io/coconilu/pen/LXYKPJ)上看到效果。