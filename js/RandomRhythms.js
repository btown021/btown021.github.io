// 初始化节奏映射
const rhythmABCMap = {
    "xxxx": "z4",
    "-xxx": "-C, z3",
    "--xx": "-C,2 z2",
    "---x": "-C,3 z",
    "----": "-C,",
    "oxxx": "C, z3",
    "o-xx": "C,2 z2",
    "o--x": "C,3 z",
    "o---": "C,",
    "xoxx": "z C, z2",
    "xo-x": "z C,2 z",
    "xo--": "z C,3",
    "-oxx": "-C, C, z2",
    "-o-x": "-C, C,2 z",
    "-o--": "-C, C,3",
    "xxox": "z2 C, z",
    "xxo-": "z2 C,2",
    "-xox": "-C, z C, z",
    "-xo-": "-C, z C,2",
    "--ox": "-C,2 C, z",
    "--o-": "-C,2 C,2",
    "xxxo": "z3 C,",
    "-xxo": "-C, z2 C,",
    "--xo": "-C,2 z C,",
    "---o": "-C,3 C,",
    "ooxx": "C, C, z2",
    "oo-x": "C, C,2 z",
    "oo--": "C, C,3",
    "xoox": "z C, C, z",
    "xoo-": "z C, C,2",
    "-oox": "-C, C, C, z",
    "-oo-": "-C, C, C,2",
    "xxoo": "z2 C, C,",
    "-xoo": "-C, z C, C,",
    "--oo": "-C,2 C, C,",
    "oxox": "C, z C, z",
    "o-o-": "C,2 C,2",
    "oxo-": "C, z C,2",
    "o-ox": "C,2 C, z",
    "xoxo": "z C, z C,",
    "xo-o": "z C,2 C,",
    "-oxo": "-C, C, z C,",
    "-o-o": "-C, C,2 C,",
    "oxxo": "C, z2 C,",
    "o-xo": "C,2 z C,",
    "o--o": "C,3 C,",
    "ooox": "C, C, C, z",
    "ooo-": "C, C, C,2",
    "xooo": "z C, C, C,",
    "-ooo": "-C, C, C, C,",
    "oxoo": "C, z C, C,",
    "o-oo": "C,2 C, C,",
    "ooxo": "C, C, z C,",
    "oo-o": "C, C,2 C,",
    "oooo": "C, C, C, C,"
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
    const chunkSize = 3

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
    let allRhythmNum = rhythmList.length


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
        if (!beatContentArr[i].startsWith("-") && !abcContent.endsWith("|")) {
            abcContent += ""
        }

        abcContent += rhythmABCMap[beatContentArr[i]]

        if (i != beatContentArr.length - 1) {
            if ((i + 1) % 4 == 0) {
                if (beatContentArr[i + 1].startsWith("-")) {
                    abcContent += "-|"
                    var s = rhythmABCMap[beatContentArr[i + 1]]
                    abcContent += s.substring(1)
                    i++;
                } else {
                    abcContent += "|"
                }
            }
        }

    }

    return "X:1\nT:RandomRhythm\nM:4/4\nL:1/16\nK:C bass\n%%barnumbers 1\n" + this.formartABCContent(abcContent);

}


