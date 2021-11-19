
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

module.exports = {
    hide,
    hasClass
};