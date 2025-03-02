// 切换文件夹状态
function toggleFolder(folder) {
    folder.classList.toggle('open');
}

// 显示下载提示
function showDownloadPrompt(fileItem) {
    const fileName = fileItem.getAttribute('data-file');
    const code = fileItem.getAttribute('data-code');
    let prompt = fileItem.querySelector('.download-prompt');

    if (!prompt) {
        prompt = document.createElement('div');
        prompt.className = 'download-prompt';
        prompt.innerHTML = `
            <input class="extract-input" placeholder="输入提取码 ${code ? '' : '(无密码)'}">
            <button class="download-btn" onclick="handleDownload('${fileName}', '${code}', this)">下载</button>
            <div class="error-msg"></div>
        `;
        fileItem.appendChild(prompt);

        // 点击外部区域关闭输入框
        const closePrompt = (event) => {
            if (!fileItem.contains(event.target)) {
                prompt.remove();
                document.removeEventListener('click', closePrompt);
            }
        };
        document.addEventListener('click', closePrompt);

        // 按下回车键触发下载
        const input = prompt.querySelector('.extract-input');
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                handleDownload(fileName, code, prompt.querySelector('.download-btn'));
            }
        });
    }
}

// 处理下载
function handleDownload(fileName, code, button) {
    const prompt = button.parentElement;
    const input = prompt.querySelector('.extract-input');
    const errorMsg = prompt.querySelector('.error-msg');
    const userCode = input.value.trim();

    if (code && userCode !== code) {
        errorMsg.textContent = '✗ 提取码错误';
        input.focus();
        return;
    }

    errorMsg.textContent = '';
    const link = document.createElement('a');
    link.href = `/files/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    prompt.remove();
}

// 切换主题
function toggleTheme() {
    document.body.setAttribute('data-theme',
        document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
}

// 初始化事件监听
document.addEventListener('DOMContentLoaded', () => {
    const fileItems = document.querySelectorAll('.file-item');
    fileItems.forEach((fileItem) => {
        fileItem.addEventListener('click', (event) => {
            event.stopPropagation();
            showDownloadPrompt(fileItem);
        });
    });
});
