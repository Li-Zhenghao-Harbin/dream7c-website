var homeProductItems = [
    {
        href: "pages/dream7c-WD/index.html",
        logoSrc: "images/dream7c WD logo.png",
        title: "白露",
        description: "完善对于招聘进度和相关流程的管理",
        previewSrc: "images/dream7c WD/dream7c WD ex5.png",
        enabled: true
    },
    {
        href: "pages/dream7c-DV/index.html",
        logoSrc: "images/dream7c DV logo.png",
        title: "麦芒",
        description: "提高对于SQL语句的转换效率",
        previewSrc: "images/dream7c DV/dream7c DV conv ex1.png",
        enabled: true
    },
    {
        href: "pages/dream7c-DU/index.html",
        logoSrc: "images/dream7c DU logo.png",
        title: "扬琴",
        description: "快速填充数据到浏览器文本框",
        previewSrc: "images/dream7c DU/dream7c DU ex1.png",
        enabled: true
    },
    {
        href: "pages/dream7c-CLR/index.html",
        logoSrc: "images/dream7c CLR logo.png",
        title: "方块竞技 重制版",
        description: "全新的界面和游戏模式",
        previewSrc: "images/dream7c CLR/dream7c CLR main menu.png",
        enabled: true
    },
    {
        href: "pages/dream7c-FR/index.html",
        logoSrc: "images/dream7c FR logo.jpg",
        title: "霜降",
        description: "提高对于文本和数据的处理效率",
        previewSrc: "images/dream7c FR/dream7c FR ex2.png",
        enabled: true
    },
    {
        href: "pages/dream7c-DE/index.html",
        logoSrc: "images/dream7c DE logo.jpg",
        title: "寒露",
        description: "提高对于知识的复习效率",
        previewSrc: "images/dream7c DE/dream7c DE ex2.png",
        enabled: true
    },
    {
        href: "pages/dream7c-RA/index.html",
        logoSrc: "images/dream7c RA logo.jpg",
        title: "谷雨",
        description: "提高对于公摊账单的计算效率",
        previewSrc: "images/dream7c RA/dream7c RA ex2.png",
        enabled: true
    },
    {
        href: "pages/dream7c-PC/index.html",
        logoSrc: "images/dream7c PC logo.jpg",
        title: "千纸鹤",
        description: "提高对于网页和图片的制作效率",
        previewSrc: "images/dream7c PC/dream7c PC ex1.png",
        enabled: true
    },
    {
        href: "pages/dream7c-GG/index.html",
        logoSrc: "images/dream7c GG logo.jpg",
        title: "几何精灵",
        description: "提高对于几何图形和函数的计算效率",
        previewSrc: "images/dream7c GG/dream7c GG 2020 n1.png",
        enabled: true
    }
];

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function renderHomeProductGrid(selector) {
    var grid = document.querySelector(selector);
    var html = "";
    var i;
    var item;

    if (!grid) {
        return;
    }

    for (i = 0; i < homeProductItems.length; i++) {
        item = homeProductItems[i];
        if (!item.enabled) {
            continue;
        }

        html +=
            '<a href="' + escapeHtml(item.href) + '" class="home-product-card">' +
                '<img src="' + escapeHtml(item.logoSrc) + '" width="100%" />' +
                '<p class="tx1">' + escapeHtml(item.title) + '<br/></p>' +
                '<p class="tx3 home-product-desc">' + escapeHtml(item.description) + '</p>' +
                '<img class="home-product-preview" src="' + escapeHtml(item.previewSrc) + '" width="100%" />' +
            '</a>';
    }

    grid.innerHTML = html;
}
