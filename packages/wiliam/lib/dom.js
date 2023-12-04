
/**
 * 隐藏所有指定元素
 * hide(document.querySelectorAll("img"));
 * @param  {...any} el 
 */
const hide = (...el) => [...el].forEach(e => (e.style.display = "none"));

/**
 * 确认元素是否具有指定的类
 * hasClass(document.querySelector("p.special"), "special");
 * @param {*} el 
 * @param {*} className 
 */
const hasClass = (el, className) => el.classList.contains(className);

/**
 * 加载 js 脚本
 * const element = injectScript('https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js')
 * element.onload = function() {}
 * @param {*} src
 */
const injectScript = function (src) {
  const s = document.createElement('script')
  s.type = 'text/javascript'
  s.src = src
  return document.body.appendChild(s)
}

function findTextNodes (node) {
  var textNodes = [];

  // 遍历节点的子节点
  for (var i = 0; i < node.childNodes.length; i++) {
    var childNode = node.childNodes[i];

    // 判断节点类型是否为文本节点
    if (childNode.nodeType === Node.TEXT_NODE) {
      textNodes.push(childNode);
    } else if (childNode.nodeType === Node.ELEMENT_NODE) {
      // 如果是元素节点，递归调用 findTextNodes 函数查找子节点的文本节点
      var childTextNodes = findTextNodes(childNode);
      textNodes = textNodes.concat(childTextNodes);
    }
  }

  return textNodes;
}

/**
 * 加载 script 脚本
 * @param {String} src
 * @returns
 */
export function loadJs (src) {
  return new Promise((resolve,reject)=>{
    const script = document.createElement('script');
    script.type = "text/javascript";
    script.src= src;
    document.body.appendChild(script);

    script.onload = () => {
      resolve();
    }
    script.onerror = () => {
      reject(new Error('脚本加载失败'));
    }
  })
}
/**
 * 加载 image
 * @param {String} src 
 * @returns 
 */
function loadImage (src) {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      resolve(img);
    };
    img.onerror = function () {
      reject(new Error('图片加载失败'));
    };
    img.src = src;
  });
}

/**
 * 高亮搜索词
 * @param {HTMLNodeList} elements
 * @param {String} keyword
 * @param {String} color
 */
function heightSearch (elements, keyword, color = '#FF6F64') {
  // var elements = document.getElementsByTagName('*'); // 获取页面上的所有元素

  for (var i = 0; i < elements.length; i++) {
      var element = elements[i];

      // 文本节点
      if (element.nodeType === Node.TEXT_NODE) {
        var text = element.nodeValue;
        var replacedText = text.replace(new RegExp(keyword, 'gi'), '<span style="color: '+ color + '">$&</span>'); // 使用正则表达式替换关键词并添加高亮样式

        if (replacedText !== text) {
          var wrapper = document.createElement('span');
          wrapper.innerHTML = replacedText;
          element.parentNode.replaceChild(wrapper, element);
        }
      } else {
        // 遍历节点的子节点
        if (element.childNodes.length) {
          var textNodes = findTextNodes(element)
          // 递归调用高亮搜索词
          heightSearch(textNodes, keyword, color)
        }
      }
  }
}

module.exports = {
  hide,
  hasClass,
  injectScript,
  heightSearch,
  loadJs,
  loadImage
};