const axios = require("axios");
const CryptoJS = require("crypto-js");

/**
 * 从 Url 中提取出变量
 * @param {String} name 键名
 * @param {String} url
 */
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 * 获取当前 URL 参数的对象
 * @param {*} url
 */
const getURLParameters = (url) =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
    ),
    {}
  );

/**
 * 模拟人工点击下载按钮
 * @param {String} url 文件URl
 * @param {String} filename 下载文件名
 */
function downloadFileSync(url, filename = "") {
  const link = document.createElement("a");
  link.style = "position: fixed; left -10000px;";
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  console.log(link);
  document.body.removeChild(link);
}

/**
 * 下载 URL 文件
 * @param {string} url 下载文件地址
 */
async function downloadFileAsync(url) {
  const filename = decodeURIComponent(url).split("filename=").pop() || "";
  const extension = filename.split(".").pop().toLowerCase();
  if (["jpg", "png", "jpeg"].indexOf(extension) > -1) {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.style.height = 0;
    iframe.src = url;
    document.body.appendChild(iframe);
    setTimeout(() => {
      iframe.remove();
    }, 5 * 60 * 1000);
  } else {
    // 如果文件是图片，则通过 Blob 下载
    const link = document.createElement("a");
    link.style = "position: fixed; left -10000px;";
    link.href = await toDataUrl(url);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

function toDataUrl(url) {
  return axios
    .get(url, { responseType: "blob" })
    .then((response) => {
      return response.data;
    })
    .then((blob) => {
      return URL.createObjectURL(blob);
    });
}

/**
 * 滚动到文档中的某个坐标
 * @param {*} x
 * @param {*} y
 */
function scrollWindow(x = 0, y = 0) {
  window.scrollTo(x, y);
}

/**
 * 将一个字符串复制到剪贴板
 * @param {*} str
 */
const copyToClipboard = (str) => {
  const el = document.createElement(textarea);
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = absolute;
  el.style.left = "-9999px";
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand(copy);
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

/**
 * 确定页面的浏览器选项卡是否处于前台活跃状态
 */
const isBrowserTabFocused = () => !document.hidden;

const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? "Mobile"
    : "Desktop";

function getViewPortWidth() {
  return document.documentElement.clientWidth || document.body.clientWidth;
}

function getViewPortHeight() {
  return document.documentElement.clientHeight || document.body.clientHeight;
}

function getScrollLeft() {
  return document.documentElement.scrollLeft || document.body.scrollLeft;
}

function getScrollTop() {
  return document.documentElement.scrollTop || document.body.scrollTop;
}

function scrollToBottom(element = document) {
  element.scrollTop = element.scrollHeight - element.clientHeight;
}

/**
 * 判定元素是否滚动到底
 * @param {dom} element
 * @returns boolean
 */
function isAtEndOfScroll(element) {
  return element.scrollHeight - element.scrollTop === element.clientHeight;
}

/**
 * 新开 Tab 页
 * @param {*} href
 * 对 url 进行 hash，让相同的 url 只打开一个 tab
 */
function openTab(href) {
  const windowName = CryptoJS.MD5(href).toString();
  window.open(href, windowName);
}

module.exports = {
  getURLParameters,
  getParameterByName,
  downloadFileSync,
  downloadFileAsync,
  toDataUrl,
  scrollWindow,
  copyToClipboard,
  isBrowserTabFocused,
  detectDeviceType,
  getViewPortWidth,
  getViewPortHeight,
  getScrollLeft,
  getScrollTop,
  scrollToBottom,
  isAtEndOfScroll,
  openTab,
};
