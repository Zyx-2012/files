// 切换深浅色模式
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute("data-theme");

    if (currentTheme === "dark") {
        body.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    } else {
        body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }
}

// 初始化深浅色模式
function initTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.setAttribute("data-theme", savedTheme);
}

// 初始化
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    renderFileExplorer();
});

// 其他函数保持不变
function toggleFolder(folderElement) {
    folderElement.classList.toggle("open");
}

function showDownloadPrompt(fileName, correctCode) {
    const fileElement = event.currentTarget;
    const existingPrompt = fileElement.querySelector(".download-prompt");

    if (existingPrompt) {
        existingPrompt.remove();
    } else {
        const prompt = document.createElement("div");
        prompt.className = "download-prompt";
        prompt.innerHTML = `
            <input type="text" class="extract-code-input" placeholder="输入提取码">
            <button onclick="downloadFile('${fileName}', '${correctCode}', this)">下载</button>
            <p class="error-message"></p>
        `;
        fileElement.appendChild(prompt);
    }
}

function downloadFile(fileName, correctCode, button) {
    const input = button.previousElementSibling;
    const errorMessage = button.nextElementSibling;
    const userCode = input.value;

    if (!correctCode || userCode === correctCode) {
        errorMessage.textContent = "";
        const link = document.createElement("a");
        link.href = `/files/${fileName}`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        errorMessage.textContent = "提取码错误，请重试！";
    }
}