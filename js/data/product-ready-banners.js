var productReadyBannerData = {
    DE: {
        brand: "柒幻",
        name: "寒露",
        version: "v 1.1.5.1",
        date: "2022.01.25",
        status: "更新发布",
        logoSrc: "../../images/dream7c DE logo.jpg",
        downloadHref: "../../pages/dream7c-DE/download.html",
        aboutHref: "../../pages/dream7c-DE/about.html",
        accentColor: "#88abda"
    }
};

function escapeReadyBannerHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function injectProductReadyBannerStyle() {
    var styleId = "product-ready-banner-style";
    var style;

    if (document.getElementById(styleId)) {
        return;
    }

    style = document.createElement("style");
    style.id = styleId;
    style.innerHTML =
        ".product-ready-banner{position:relative;overflow:hidden;min-height:330px;background:#fff;color:#222;padding:34px 42px 34px 66px;border:1px solid rgba(136,171,218,.34);box-shadow:0 12px 30px rgba(23,32,51,.08);}" +
        ".product-ready-banner:before{content:\"\";position:absolute;left:0;top:0;bottom:0;width:18px;background:var(--ready-accent);}" +
        ".product-ready-banner__inner{position:relative;z-index:1;display:grid;grid-template-columns:minmax(220px,.82fr) minmax(210px,1fr) minmax(180px,.62fr);gap:18px;align-items:center;min-height:262px;}" +
        ".product-ready-banner__copy{display:flex;flex-direction:column;align-items:flex-start;text-align:left;}" +
        ".product-ready-banner__eyebrow{display:inline-block;padding:6px 14px;background:rgba(136,171,218,.16);color:var(--ready-accent);font-size:16px;font-weight:700;line-height:1;border:1px solid rgba(136,171,218,.28);}" +
        ".product-ready-banner__title{font-size:42px;font-weight:700;line-height:1.08;margin:16px 0 0;color:#222;}" +
        ".product-ready-banner__name{color:var(--ready-accent);}" +
        ".product-ready-banner__version{font-size:20px;font-weight:700;margin-top:10px;color:#535353;}" +
        ".product-ready-banner__visual{display:flex;align-items:center;justify-content:center;}" +
        ".product-ready-banner__logo{width:86%;max-width:240px;min-width:132px;margin:0 auto;display:block;mix-blend-mode:multiply;border-radius:0;}" +
        ".product-ready-banner__meta{display:grid;grid-template-columns:minmax(0,1fr);gap:12px;width:100%;max-width:220px;margin-top:28px;}" +
        ".product-ready-banner__meta-item{padding:13px 16px;background:transparent;border:1px solid rgba(136,171,218,.52);color:#222;}" +
        ".product-ready-banner__meta-label{font-size:14px;color:#535353;margin-bottom:4px;}" +
        ".product-ready-banner__date,.product-ready-banner__status{font-size:20px;font-weight:700;line-height:1.25;}" +
        ".product-ready-banner__actions{display:grid;grid-template-columns:1fr;gap:14px;}" +
        ".product-ready-banner__action{display:block;padding:15px 18px;background:#88abda;color:#fff;font-size:20px;font-weight:700;text-align:center;}" +
        ".product-ready-banner__action:hover{color:#fff;background:#779dce;}" +
        "@media (max-width:768px){.product-ready-banner{min-height:0;padding:26px 22px 26px 40px;}.product-ready-banner__inner{grid-template-columns:1fr;min-height:0;text-align:center;}.product-ready-banner__copy{align-items:center;text-align:center;}.product-ready-banner__title{font-size:32px;}.product-ready-banner__logo{width:48%;}.product-ready-banner__meta{grid-template-columns:1fr;margin:22px auto 0;}.product-ready-banner__actions{width:100%;max-width:360px;margin:0 auto;}}";
    document.head.appendChild(style);
}

function renderProductReadyBanner(selector, key) {
    var container = document.querySelector(selector);
    var data = productReadyBannerData[key];

    if (!container || !data) {
        return;
    }

    injectProductReadyBannerStyle();
    container.innerHTML =
        '<div class="product-ready-banner" style="--ready-accent:' + escapeReadyBannerHtml(data.accentColor) + ';">' +
            '<div class="product-ready-banner__inner">' +
                '<div class="product-ready-banner__copy">' +
                    '<div class="product-ready-banner__eyebrow">' + escapeReadyBannerHtml(data.status) + '</div>' +
                    '<p class="product-ready-banner__title">' + escapeReadyBannerHtml(data.brand) + ' <span class="product-ready-banner__name">' + escapeReadyBannerHtml(data.name) + '</span></p>' +
                    '<div class="product-ready-banner__version">' + escapeReadyBannerHtml(data.version) + '</div>' +
                    '<div class="product-ready-banner__meta">' +
                        '<div class="product-ready-banner__meta-item">' +
                            '<div class="product-ready-banner__meta-label">发布日期</div>' +
                            '<div class="product-ready-banner__date">' + escapeReadyBannerHtml(data.date) + '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="product-ready-banner__visual">' +
                    '<img class="product-ready-banner__logo" src="' + escapeReadyBannerHtml(data.logoSrc) + '" alt="' + escapeReadyBannerHtml(data.brand + " " + data.name) + '" />' +
                '</div>' +
                '<div class="product-ready-banner__actions">' +
                    '<a class="product-ready-banner__action" href="' + escapeReadyBannerHtml(data.downloadHref) + '">下载</a>' +
                    '<a class="product-ready-banner__action" href="' + escapeReadyBannerHtml(data.aboutHref) + '">关于</a>' +
                '</div>' +
            '</div>' +
        '</div>';
}
