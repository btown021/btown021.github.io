// 初始化节奏映射
const rhythmABCMap = {
    "xxxx": "z4",
    "-xxx": "-C,z3",
    "--xx": "-C,2z2",
    "---x": "-C,3z",
    "----": "-C,4",
    "oxxx": "C,z3",
    "o-xx": "C,2z2",
    "o--x": "C,3z",
    "o---": "C,4",
    "xoxx": "zC,z2",
    "xo-x": "zC,2z",
    "xo--": "zC,3",
    "-oxx": "-C,C,z2",
    "-o-x": "-C,C,2z",
    "-o--": "-C,C,3",
    "xxox": "z2C,z",
    "xxo-": "z2C,2",
    "-xox": "-C,zC,z",
    "-xo-": "-C,zC,2",
    "--ox": "-C,2C,z",
    "--o-": "-C,2C,2",
    "xxxo": "z3C,",
    "-xxo": "-C,z2C,",
    "--xo": "-C,2zC,",
    "---o": "-C,3C,",
    "ooxx": "C,C,z2",
    "oo-x": "C,C,2z",
    "oo--": "C,C,3",
    "xoox": "zC,C,z",
    "xoo-": "zC,C,2",
    "-oox": "-C,C,C,z",
    "-oo-": "-C,C,C,2",
    "xxoo": "z2C,C,",
    "-xoo": "-C,zC,C,",
    "--oo": "-C,2C,C,",
    "oxox": "C,zC,z",
    "o-o-": "C,2C,2",
    "oxo-": "C,zC,2",
    "o-ox": "C,2C,z",
    "xoxo": "zC,zC,",
    "xo-o": "zC,2C,",
    "-oxo": "-C,C,zC,",
    "-o-o": "-C,C,2C,",
    "oxxo": "C,z2C,",
    "o-xo": "C,2zC,",
    "o--o": "C,3C,",
    "ooox": "C,C,C,z",
    "ooo-": "C,C,C,2",
    "xooo": "zC,C,C,",
    "-ooo": "-C,C,C,C,",
    "oxoo": "C,zC,C,",
    "o-oo": "C,2C,C,",
    "ooxo": "C,C,zC,",
    "oo-o": "C,C,2C,",
    "oooo": "C,C,C,C,"
};

// 获取随机元素
function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

/**
 * 格式化ABC谱面内容为 4个小节一行
 * @param {string} content - 原始ABC谱面 不包括头和前后 |
 * @returns {string} - 处理后的字符串
 */
function formartABCContent(content) {
    // 1. 按 | 分割字符串
    const splitArray = content.toString().split('|');

    // 2. 将数组分割为每组最多4个元素的子数组

    let chunkedArray = []
    const chunkSize = 2

    for (let i = 0; i < splitArray.length; i += chunkSize) {
        chunkedArray.push(splitArray.slice(i, i + chunkSize));
    }

    // 3. 处理每个子数组并连接结果
    return chunkedArray
        .map(chunk => {
            // 在每个元素前后添加 | 并用 | 连接
            return `|${chunk.join('|')}|`;
        })
        .join('\n'); // 用换行符连接所有结果
}

/**
 * 生成随机节奏 ABC 谱面
 *
 * @param {Object} beatsNumber 小节数
 */
function generateRandomRhythmsABC(beatsNumber) {
    // 计算节拍数
    let subsectionsNum = beatsNumber * 4
    // 总定义节奏数
    let rhythmList = Object.keys(rhythmABCMap)
    let beatContentArr = new Array(subsectionsNum)

    // 循环生成节奏
    for (var i = 0; i < subsectionsNum; i++) {
        var currentTempo = getRandomElement(rhythmList)
        if (i != 0) {
            while (
                currentTempo.startsWith("-") &&
                (beatContentArr[i - 1].endsWith("x") || rhythmABCMap[beatContentArr[i - 1]].endsWith("."))
                ) {
                currentTempo = getRandomElement(rhythmList)
            }
        } else {
            while (currentTempo.startsWith("-")) {
                currentTempo = getRandomElement(rhythmList)
            }
        }


        beatContentArr[i] = currentTempo
    }

    console.log("beatContentArr", beatContentArr)

    let abcContent = rhythmABCMap[beatContentArr[0]]

    for (var i = 1; i < beatContentArr.length; i++) {
        abcContent += " "

        abcContent += rhythmABCMap[beatContentArr[i]]


        if ((i + 1) % 4 == 0 && i != beatContentArr.length - 1) {
            abcContent += "|"
        }

    }

    return "X:1\nT:RandomRhythm\nM:4/4\nL:1/16\nK:C bass\n%%barnumbers 1\n" + this.formartABCContent(abcContent);

}


