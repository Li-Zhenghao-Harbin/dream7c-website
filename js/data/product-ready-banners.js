var productReadyBannerData = {
    DE: {
        brand: "柒幻",
        name: "寒露",
        version: "v 1.1.5.1",
        date: "2022.01.25",
        status: "更新发布",
        logoSrc: "../../images/dream7c DE logo.jpg",
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
        ".product-ready-banner{position:relative;overflow:hidden;min-height:330px;background:#fff;color:#222;display:grid;grid-template-columns:minmax(0,1.08fr) minmax(240px,.82fr);gap:28px;align-items:stretch;padding:34px 34px 34px 58px;border:1px solid rgba(136,171,218,.34);box-shadow:0 12px 30px rgba(23,32,51,.08);}" +
        ".product-ready-banner:before{content:\"\";position:absolute;left:0;top:0;bottom:0;width:18px;background:var(--ready-accent);}" +
        ".product-ready-banner__copy{position:relative;z-index:1;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;text-align:left;}" +
        ".product-ready-banner__eyebrow{display:inline-block;padding:6px 14px;background:rgba(136,171,218,.16);color:var(--ready-accent);font-size:16px;font-weight:700;line-height:1;border:1px solid rgba(136,171,218,.28);}" +
        ".product-ready-banner__title{font-size:46px;font-weight:700;line-height:1.08;margin:22px 0 0;color:#222;}" +
        ".product-ready-banner__name{color:var(--ready-accent);}" +
        ".product-ready-banner__version{font-size:20px;font-weight:700;margin-top:12px;color:#535353;}" +
        ".product-ready-banner__meta{display:grid;grid-template-columns:minmax(0,1fr);gap:12px;width:100%;max-width:220px;margin-top:34px;}" +
        ".product-ready-banner__meta-item{padding:14px 16px;background:#e8e8e8;color:#222;}" +
        ".product-ready-banner__meta-label{font-size:14px;color:#535353;margin-bottom:4px;}" +
        ".product-ready-banner__date,.product-ready-banner__status{font-size:20px;font-weight:700;line-height:1.25;}" +
        ".product-ready-banner__visual{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;padding:28px;}" +
        ".product-ready-banner__logo{position:relative;z-index:1;width:78%;max-width:250px;margin:0 auto;display:block;mix-blend-mode:multiply;border-radius:0;}" +
        "@media (max-width:768px){.product-ready-banner{grid-template-columns:1fr;min-height:0;padding:24px;}.product-ready-banner__title{font-size:34px;}.product-ready-banner__meta{grid-template-columns:1fr;margin-top:24px;}.product-ready-banner__visual{display:none;}}";
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
        '</div>';
}
