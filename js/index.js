// 生成并显示Vex节奏
async function generateRandomRhythm() {
    const measureCount = parseInt(document.getElementById('measure-count').value);
    const rhythmContent = generateRandomRhythmsABC(measureCount);
    console.log("measureCount", measureCount);
    console.log('rhythmContent', rhythmContent);
    window.localStorage.setItem("rhythmContent", rhythmContent);
    window.localStorage.setItem("measureCount", measureCount.toString());
    renderAbsTab(rhythmContent)
}

async function initPage() {
    const rhythmContent = window.localStorage.getItem("rhythmContent");
    const measureCount = Number.parseInt(window.localStorage.getItem("measureCount"));

    console.log("localStorage measureCount\n", measureCount);
    console.log('localStorage rhythmContent\n', rhythmContent);

    if (measureCount && rhythmContent) {
        renderAbsTab(rhythmContent)
        document.getElementById('measure-count').value = measureCount
    } else {
        generateRandomRhythm()
    }
}

async function renderAbsTab(absTab) {
    ABCJS.renderAbc("target", absTab,  {scrollHorizontal: true});
}

async function saveImg() {
    await html2canvas(document.querySelector('#target')).then(canvas => {
        const imgUrl = canvas.toDataURL('image/png')
        const image = document.createElement('img')
        image.src = imgUrl
        // 将生成的图片放到 类名为 content 的元素中
        document.querySelector('.img-container').appendChild(image)
        const a = document.createElement('a')
        a.href = imgUrl
        // a.download 后面的内容为自定义图片的名称
        a.download = 'RandomRhythm'
        a.click()
    })
}


async function lockOrUnlockGenerated () {
    const lockIcon = document.getElementById("lock-icon");

    const classList = lockIcon.classList;

    if (classList.contains('unlock')) {
        lockGenerateActions()
    } else {
        unlockGenerateActions()
    }
}

