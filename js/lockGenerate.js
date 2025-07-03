function unlockGenerateActions() {
    const lockIcon = document.getElementById("lock-icon");
    const actionButton = document.getElementById("generatedButton")
    lockIcon.classList.remove('lock');
    lockIcon.classList.add('unlock');
    lockIcon.src = './image/unlock.png';
    // 移除禁用状态
    actionButton.classList.remove('lock-action');
    // 更新按钮文本
    actionButton.innerHTML = '<span class="spinner"></span> 生成节奏';
    window.localStorage.setItem("generateActionLock", false.toString())
}

function lockGenerateActions() {
    const lockIcon = document.getElementById("lock-icon");
    const actionButton = document.getElementById("generatedButton")
    lockIcon.classList.remove('unlock');
    lockIcon.classList.add('lock');
    lockIcon.src = './image/lock.png';
    // 添加禁用状态
    actionButton.classList.add('lock-action');
    // 更新按钮文本
    actionButton.innerHTML = '<span class="spinner"></span> 已锁定';
    window.localStorage.setItem("generateActionLock", true.toString())
}


function initGenerateActionsLockStatus() {
    if (window.localStorage.getItem("generateActionLock")) {
        lockGenerateActions()
    }
}