// 首页精选产品大面板（hero）数据：展示一个产品的名称、logo、介绍与截图轮播
var homeFeaturedProduct = {
    href: "pages/dream7c-WD/index.html",
    logoSrc: "images/dream7c WD logo.png",
    title: "柒幻 白露",
    description: "用于招聘进度和相关流程的管理",
    linkText: "了解 白露",
    // 截图统一宽高比（宽 / 高），用于在图片加载前撑起轮播容器高度
    slideAspectRatio: "2559 / 1527",
    slides: [
        "images/dream7c WD/dream7c WD ex1.png",
        "images/dream7c WD/dream7c WD ex3.png",
        "images/dream7c WD/dream7c WD ex5.png"
    ],
    enabled: true
};

var homeProductItems = [
    // {
    //     href: "pages/dream7c-WD/index.html",
    //     logoSrc: "images/dream7c WD logo.png",
    //     title: "白露",
    //     description: "用于招聘进度和相关流程的管理",
    //     previewSrc: "images/dream7c WD/dream7c WD ex5.png",
    //     enabled: true
    // },
    {
        href: "pages/dream7c-DU/index.html",
        logoSrc: "images/dream7c DU logo.png",
        title: "扬琴",
        description: "快速填充数据到浏览器文本框",
        previewSrc: "images/dream7c DU/dream7c DU ex1.png",
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
        href: "pages/dream7c-GR/index.html",
        logoSrc: "images/dream7c GR logo.png",
        title: "芒种",
        description: "用于家庭成员信息和血缘关系",
        previewSrc: "images/dream7c GR/dream7c GR ex1.png",
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
        href: "pages/dream7c-CLR/index.html",
        logoSrc: "images/dream7c CLR logo.png",
        title: "方块竞技 重制版",
        description: "全新的界面和游戏模式",
        previewSrc: "images/dream7c CLR/dream7c CLR classic.png",
        enabled: true
    },
    {
        href: "pages/dream7c-XYHS/index.html",
        logoSrc: "images/dream7c XYHS logo.png",
        title: "新阳美发沙龙",
        description: "理发店模拟经营游戏",
        previewSrc: "images/dream7c XYHS/dream7c XYHS ex3.png",
        enabled: true
    },
    // {
    //     href: "pages/dream7c-FR/index.html",
    //     logoSrc: "images/dream7c FR logo.jpg",
    //     title: "霜降",
    //     description: "提高对于文本和数据的处理效率",
    //     previewSrc: "images/dream7c FR/dream7c FR ex2.png",
    //     enabled: true
    // },

    // {
    //     href: "pages/dream7c-RA/index.html",
    //     logoSrc: "images/dream7c RA logo.jpg",
    //     title: "谷雨",
    //     description: "提高对于公摊账单的计算效率",
    //     previewSrc: "images/dream7c RA/dream7c RA ex2.png",
    //     enabled: true
    // },
    // {
    //     href: "pages/dream7c-PC/index.html",
    //     logoSrc: "images/dream7c PC logo.jpg",
    //     title: "千纸鹤",
    //     description: "提高对于网页和图片的制作效率",
    //     previewSrc: "images/dream7c PC/dream7c PC ex1.png",
    //     enabled: true
    // },
    // {
    //     href: "pages/dream7c-GG/index.html",
    //     logoSrc: "images/dream7c GG logo.jpg",
    //     title: "几何精灵",
    //     description: "提高对于几何图形和函数的计算效率",
    //     previewSrc: "images/dream7c GG/dream7c GG 2020 n1.png",
    //     enabled: true
    // }
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

function renderHomeFeaturedProduct(selector) {
    var host = document.querySelector(selector);
    if (!host || !homeFeaturedProduct || !homeFeaturedProduct.enabled) {
        return;
    }

    var product = homeFeaturedProduct;
    var ratioAttr = product.slideAspectRatio ?
        ' style="aspect-ratio:' + escapeHtml(product.slideAspectRatio) + ';"' : "";
    var slidesHtml = "";
    var dotsHtml = "";
    var i;

    for (i = 0; i < product.slides.length; i++) {
        slidesHtml +=
            '<li><img src="' + escapeHtml(product.slides[i]) + '" alt="' +
            escapeHtml(product.title) + ' 截图" /></li>';
        dotsHtml += i === 0 ? '<li class="on"></li>' : '<li></li>';
    }

    host.innerHTML =
        '<div class="home-featured">' +
            '<div class="home-featured-inner">' +
                '<div class="home-featured-info">' +
                    '<img class="home-featured-logo" src="' + escapeHtml(product.logoSrc) + '" alt="' +
                        escapeHtml(product.title) + ' logo" />' +
                    '<h1 class="home-featured-title">' + escapeHtml(product.title) + '</h1>' +
                    '<p class="home-featured-desc">' + escapeHtml(product.description) + '</p>' +
                    '<a class="home-featured-link" href="' + escapeHtml(product.href) + '">' +
                        escapeHtml(product.linkText) + '&nbsp;&gt;&gt;</a>' +
                '</div>' +
                '<div class="home-featured-showcase">' +
                    '<div class="home-featured-slide">' +
                        '<div class="bd"' + ratioAttr + '><ul>' + slidesHtml + '</ul></div>' +
                        '<div class="hd"><ul>' + dotsHtml + '</ul></div>' +
                        '<span class="prev"></span>' +
                        '<span class="next"></span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
}

function initHomeFeaturedCarousel() {
    var slide = document.querySelector(".home-featured-slide");
    if (!slide) {
        return;
    }

    var lis = slide.querySelectorAll(".bd li");
    var dots = slide.querySelectorAll(".hd li");
    var prev = slide.querySelector(".prev");
    var next = slide.querySelector(".next");
    if (!lis.length) {
        return;
    }

    var current = 0;
    var timer = null;

    function show(index) {
        current = (index + lis.length) % lis.length;
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = i === current ? "on" : "";
        }
        for (var j = 0; j < dots.length; j++) {
            dots[j].className = j === current ? "on" : "";
        }
    }

    function stop() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    function play() {
        stop();
        timer = setInterval(function() {
            show(current + 1);
        }, 4000);
    }

    for (var k = 0; k < dots.length; k++) {
        (function(idx) {
            dots[idx].addEventListener("click", function() {
                show(idx);
                play();
            });
        })(k);
    }
    if (prev) {
        prev.addEventListener("click", function() {
            show(current - 1);
            play();
        });
    }
    if (next) {
        next.addEventListener("click", function() {
            show(current + 1);
            play();
        });
    }
    slide.addEventListener("mouseenter", stop);
    slide.addEventListener("mouseleave", play);

    show(0);
    play();
}
