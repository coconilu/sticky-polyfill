// UMD
let outputName = 'sticky';

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory());
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root[outputName] = factory()[outputName];
  }
}(this, function () {
  /**
  * position: sticky的polyfill
  * 推荐在文档加载完成之后（‘DOMContentLoaded’事件）调用
  * @param {String} selectors 选择器
  * @param {String} top 距离顶部的偏移量
  */
  function sticky(selectors, top = 0) {
    let elements = document.querySelectorAll(selectors);
    for (let i = 0; i < elements.length; ++i) {
      elements[i].dataset['originOffsetTop'] = elements[i].getBoundingClientRect().top + ((window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop)
    }
    window.addEventListener('scroll', onScroll(elements, top));

    function onScroll(elements, top) {
      let shouldRun = true
      return () => {
        if (shouldRun) {
          let scrollY = window.pageYOffset;
          // 节流代码
          shouldRun = false
          for (let i = 0; i < elements.length; ++i) {
            let element = elements[i];
            console.log(element)
            // 判断是relative条件还是fixed条件
            if (element.dataset['originOffsetTop'] - scrollY <= top && !element.$isSticky) {
              // fixed条件
              fixed(element, top)
            }
            if (element.dataset['originOffsetTop'] - scrollY > top && element.$isSticky) {
              // relative条件
              element.$unFixed && element.$unFixed()
            }
          }
          setTimeout(() => {
            shouldRun = true
          }, 100)
        }
      }
    }

    function fixed(element, top) {
      let originCss = element.style.cssText;
      element.style.cssText += ";position: fixed; top: " + top + "px;";
      element.$isSticky = true
      element.$unFixed = () => {
        element.$isSticky = false
        element.style.cssText = originCss;
      }
    }
  }
  return { sticky };
}));