// Load VexTab module.
// import * as _ from 'lodash';
// import * as vextab from '../src/main';

// 生成并显示Vex节奏
function generateRandomRhythm() {
    const measureCount = parseInt(document.getElementById('measure-count').value);
    console.log("measureCount", measureCount);
    const rhythmContent = generateRandomRhythmsABC(measureCount);
    console.log('rhythmContent', rhythmContent);
    ABCJS.renderAbc("target", rhythmContent);
}

function saveImg() {
    html2canvas(document.querySelector('#target')).then(canvas => {
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