const numeral = require('numeral');

const wan = 1e4;
const yi  = wan * wan;
const wanyi = wan * yi;

/**
 * 数字添加千分符
 * @param {Number} x
 */
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 保留 2位小数
 * @param {*} num
 * @returns
 */
 function processNumber (num) {
  // Math.round 并不能解决 9.99 被格式化为 10 的问题
  return Number.parseInt(num * 100) / 100
}

/**
 * 将数字转为自动提升单位的对象
 * 输入 20000，输出 { value: 2.00, unit: '万' }
 * 自动选择数据量级：万亿、亿、万
 * @param {*} num
 * @param {*} pattern
 * @returns
 */
function number2object (input, pattern = '0,0.00', invalid = '-') {
  let symbol = ''
  let unit = ''
  let value = invalid

  if (typeof input !== 'number') return { symbol, value, unit }

  if (input < 0) {
    symbol = '-'
  }
  const num = Math.abs(input)
  
  if (num >= wanyi) {
    unit = '万亿'
    // processNumber 来修复 9.99 被格式化为 10 的问题
    value = numeral(processNumber(num / wanyi)).format(pattern)
  } else if (num >= yi) {
    unit = '亿'
    value = numeral(processNumber(num / yi)).format(pattern)
  } else if (num >= wan) {
    unit = '万'
    value = numeral(processNumber(num / wan)).format(pattern)
  } else {
    unit = ''
    value = numeral(num).format(pattern)
  }
  return { symbol, value, unit }
}

/**
 * 将数字转为自动提升单位的字符串
 * @param {*} num
 * @returns
 */
function number2string (num) {
  const numberObject = number2object(num)
  return numberObject.symbol + numberObject.value + numberObject.unit
}

/**
 * 转义HTML标签的方法
 * @param  {String} str 需要转义的HTML字符串
 * @return {String}     转义后的字符串
 */
 var encodeHTML = function (str) {
  if (typeof str == 'string') {
      return str.replace(/<|&|>/g, function (matches) {
          return ({
              '<': '&lt;',
              '>': '&gt;',
              '&': '&amp;'
          })[matches];
      });
  }

  return '';
};

/**
 * 反转义HTML标签的方法
 * @param  {String} str 需要反转义的字符串
 * @return {String}     反转义后的字符串
 */
 var decodeHTML = function (str) {
  if (typeof str == 'string') {
      return str.replace(/&lt;|&gt;|&amp;/g, function (matches) {
          return ({
              '&lt;': '<',
              '&gt;': '>',
              '&amp;': '&'
          })[matches];
      });
  }

  return '';
};

module.exports = {
  numberWithCommas,
  number2object,
  number2string,
  encodeHTML,
  decodeHTML
};
