"use strict";

/**
 * 等待一定时间后调用提供的函数（单位毫秒）
 * @param {*} fn
 * @param {*} wait
 * @param  {...any} args
 */
export function delay(fn, wait, ...args) {
  return setTimeout(fn, wait, ...args);
}

/**
 * 节流，常用于接口请求
 * 函数节流是减少函数的触发频率；函数防抖则是延迟函数执行，并且不管触发多少次都只执行最后一次。
 * @param {*} fn
 * @param {*} interval 间隔时间默认300ms
 * @returns
 */
export function throttle(fn, interval = 300) {
  var enterTime = 0; // 触发的时间
  return function () {
    var context = this;
    var backTime = new Date(); // 第一次函数return即触发的时间
    if (backTime - enterTime > interval) {
      fn.call(context, arguments);
      enterTime = backTime; // 赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}

/**
 * 防抖，常用于事件处理，例如 onPageScroll
 * 函数节流是减少函数的触发频率；函数防抖则是延迟函数执行，并且不管触发多少次都只执行最后一次。
 * 其概念其实是从机械开关和继电器的“去弹跳”（debounce）衍生 出来的，基本思路就是把多个信号合并为一个信号。
 * 单反也有相似的概念，在拍照的时候手如果拿不稳晃的时候拍照一般手机是拍不出好照片的，因此智能手机是在你按一下时连续拍许多张， 能过合成手段，生成一张。
 * 
 * 实现思路如下，将目标方法（动作）包装在setTimeout里面，然后这个方法是一个事件的回调函数，如果这个回调一直执行，那么这些动作就一直不执行。
 * 为什么不执行呢，我们搞了一个 clearTimeout，这样setTimeout里的方法就不会执行！ 
 * 为什么要clearTimeout呢，我们就需要将事件内的连续动作删掉嘛！待到用户不触发这事件了。那么setTimeout就自然会执行这个方法。
 * @param {*} fn
 * @param {*} interval 间隔时间默认200ms
 * @returns
 */
export function debounce(fn, interval) {
  var timer;
  return function () {
    clearTimeout(timer);
    var context = this;
    var args = arguments; // 保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    timer = setTimeout(function () {
      fn.call(context, args);
    }, interval);
  };
}
