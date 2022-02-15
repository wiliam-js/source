
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

module.exports = {
    hide,
    hasClass,
    injectScript
};