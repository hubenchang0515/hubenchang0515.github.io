const setChinese = (isChinese) => {
    if (!isChinese)
        return;

    const translations = {
        "blog": "博客",
        "pieces": "作品",
        "moe-tools": "萌萌工具箱",
        "home": "主页",
        "todo": "待办事项",
        "markdown-editor": "Markdown 编辑器",
        "code-editor": "代码编辑器",
        "qt-theme": "Qt 主题",
        "svg-icon": "SVG 图标",
        "gis-tile-download": "GIS 图块下载",
    };
    
    for (const item in translations) {
        const node = document.getElementById(`i18n-${item}`);
        if (node) {
            node.innerText = translations[item];
        }
    }
}

const setDark = (isDark) => {
    const nodes = document.getElementsByClassName("github-readme-stats");
    for (const node of nodes) {
        const url = new URL(node.src);
        url.searchParams.set("theme", isDark ? "nord" : "default");
        node.src = url.toString();
    }
}

const setLanguage = () => {
    setChinese(navigator.language === 'zh-CN');
}

const setTheme = () => {
    const query = window.matchMedia("(prefers-color-scheme:dark)");
    setDark(query.matches);
    query.addEventListener("change", (ev) => {
        setDark(ev.matches);
    });
}

const collapseAll = () => {
    const nodes = document.getElementsByClassName("expand-content");
    for (const node of nodes) {
        node.style.display = "none";
    }
}

const initExpand = () => {
    const nodes = document.getElementsByClassName("expand");
    for (const node of nodes) {
        const button = node.getElementsByClassName("expand-button")[0]
        const content = node.getElementsByClassName("expand-content")[0]
        button.addEventListener('click', (ev) => {
            collapseAll();
            ev.stopPropagation();
            content.style.display = "flex";
            content.style.top = `${button.getBoundingClientRect().bottom + 5}px`;
            content.style.left = `${button.getBoundingClientRect().left}px`;
        })
    }
}

const globalClick = () => {
    collapseAll();
}