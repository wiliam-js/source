'use strict';

/**
 * @description 打开新页面
 * @param {String} url 地址
 * openTab("https://www.jd.com/");
 */
function openTab (url, target = '_blank') {
    const a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('target', target)
    a.setAttribute('id', 'd2admin-link-temp')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(document.getElementById('d2admin-link-temp'))
  }

module.exports = {
    openTab
};