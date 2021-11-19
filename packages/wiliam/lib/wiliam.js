'use strict';

/**
 * 等待一定时间后调用提供的函数（单位毫秒）
 * @param {*} fn 
 * @param {*} wait 
 * @param  {...any} args 
 */
 const delay = (fn, wait, ...args) => setTimeout(fn, wait, ...args);

 module.exports = {
    delay
 }