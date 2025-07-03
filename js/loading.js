async function loadButton(elementId, func) {
    const actionButton = document.getElementById(elementId);
    // 保存原始按钮内容
    const originalButtonHTML = actionButton.innerHTML;
    // 如果已经是禁用状态，则不再响应
    if (actionButton.classList.contains('disabled') || actionButton.classList.contains('lock-action')) {
        return;
    }

    // 添加禁用状态
    actionButton.classList.add('disabled');
    // 更新按钮文本
    actionButton.innerHTML = '<span class="spinner"></span> 处理中...';



    try {
        // 使用双重保证：requestAnimationFrame + setTimeout(0)
        // 确保UI更新有机会执行
        await new Promise(resolve => requestAnimationFrame(resolve));
        await new Promise(resolve => setTimeout(resolve, 0));

        // 执行实际功能
        await Promise.resolve(func());
    } finally {
        // 移除禁用状态
        actionButton.classList.remove('disabled');
        // 恢复原始内容
        actionButton.innerHTML = originalButtonHTML;
    }
}