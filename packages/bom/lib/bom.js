"use strict";

/**
 * @description 打开新页面
 * @param {String} url 地址
 * openTab("https://www.jd.com/");
 */
function openTab(url, target = "_blank") {
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("target", target);
  a.setAttribute("id", "d2admin-link-temp");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(document.getElementById("d2admin-link-temp"));
}

function guid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

module.exports = {
  openTab,
};
