// 生成指定范围内的随机整数
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成指定范围内的随机浮点数
export function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}