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
function number2object (num, pattern = '0,0.00') {
  if (typeof num !== 'number') return { value: '-', unit: '' }

  let unit = ''
  let value = '-'
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
  return { value, unit }
}

/**
 * 将数字转为自动提升单位的字符串
 * @param {*} num
 * @returns
 */
function number2string (num) {
  const numberObject = number2object(num)
  return numberObject.value + numberObject.unit
}

module.exports = {
  numberWithCommas,
  number2object,
  number2string
};
