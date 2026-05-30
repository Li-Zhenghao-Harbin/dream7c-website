var newsYearItems = [
    {
        id: 1,
        year: "2013",
        entries: [
            {
                title: "柒幻工作室 正式成立",
                date: "2013.08.31",
                imageSrc: "../images/web_icon.jpg",
                imageWidth: "20%"
            }
        ]
    },
    {
        id: 2,
        year: "2017",
        entries: [
            {
                href: "../pages/dream7c-GG/index.html",
                title: "柒幻 几何精灵 正式发布",
                date: "2017.05.21",
                imageSrc: "../images/dream7c GG logo.jpg",
                imageWidth: "20%"
            }
        ]
    },
    {
        id: 3,
        year: "2018",
        entries: [
            {
                href: "../pages/dream7c-PC/index.html",
                title: "柒幻 千纸鹤 正式发布",
                date: "2018.02.11",
                imageSrc: "../images/dream7c PC logo.jpg",
                imageWidth: "40%",
                halfWidth: true
            },
            {
                href: "../pages/dream7c-CL3/index.html",
                title: "柒幻 方块竞技3 正式发布",
                date: "2018.05.27",
                imageSrc: "../images/dream7c CL3 logo.jpg",
                imageWidth: "40%",
                halfWidth: true
            }
        ]
    },
    {
        id: 4,
        year: "2021",
        entries: [
            {
                href: "../pages/dream7c-FR/index.html",
                title: "柒幻 霜降 正式发布",
                date: "2021.01.30",
                imageSrc: "../images/dream7c FR logo.jpg",
                imageWidth: "40%",
                halfWidth: true
            },
            {
                href: "../pages/dream7c-DE/index.html",
                title: "柒幻 寒露 正式发布",
                date: "2021.10.16",
                imageSrc: "../images/dream7c DE logo.jpg",
                imageWidth: "40%",
                halfWidth: true
            }
        ]
    },
    {
        id: 6,
        year: "2023",
        entries: [
            {
                href: "../pages/dream7c-RA/index.html",
                title: "柒幻 谷雨 正式发布",
                date: "2023.01.31",
                imageSrc: "../images/dream7c RA logo.jpg",
                imageWidth: "20%"
            }
        ]
    },
    {
        id: 7,
        year: "2025",
        entries: [
            {
                href: "../pages/dream7c-DV/index.html",
                title: "柒幻 麦芒 正式发布",
                date: "2025.07.19",
                imageSrc: "../images/dream7c DV logo.png",
                imageWidth: "20%"
            }
        ]
    },
    {
        id: 8,
        year: "2026",
        layout: "three-up",
        entries: [
            {
                href: "../pages/dream7c-DU/index.html",
                title: "柒幻 扬琴 正式发布",
                date: "2026.01.20",
                imageSrc: "../images/dream7c DU logo.png",
                imageWidth: "60%"
            },
            {
                href: "../pages/dream7c-WD/index.html",
                title: "柒幻 白露 正式发布",
                date: "2026.01.20",
                imageSrc: "../images/dream7c WD logo.png",
                imageWidth: "60%"
            },
            {
                href: "../pages/dream7c-CLR/index.html",
                title: "柒幻 方块竞技 重制版 正式发布",
                date: "2026.06.02",
                imageSrc: "../images/dream7c CL3 logo.jpg",
                imageWidth: "60%"
            }
        ]
    }
];

function escapeNewsHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function renderNewsYearTabs(selector) {
    var container = document.querySelector(selector);
    var html = "";
    var i;
    var item;

    if (!container) {
        return;
    }

    for (i = 0; i < newsYearItems.length; i++) {
        item = newsYearItems[i];
        html += '<div class="tx3v div_year" id="year' + item.id + '">' + escapeNewsHtml(item.year) + '</div>';
    }

    container.innerHTML = html;
}

function renderNewsSections(selector) {
    var container = document.querySelector(selector);
    var html = "";
    var i;
    var j;
    var item;
    var entry;
    var entryHtml;
    var useThreeUp;
    var entryWrapperStyle;

    if (!container) {
        return;
    }

    for (i = 0; i < newsYearItems.length; i++) {
        item = newsYearItems[i];
        useThreeUp = item.layout === "three-up";
        html += '<div' + (i > 0 ? ' style="display:none;"' : '') + ' id="news' + item.id + '">';
        html += '<hr/><p class="tx2v">' + escapeNewsHtml(item.year) + '</p><hr/>';
        if (useThreeUp) {
            html += '<div style="display:flex;flex-wrap:nowrap;align-items:flex-start;justify-content:space-between;gap:18px;">';
        }

        for (j = 0; j < item.entries.length; j++) {
            entry = item.entries[j];
            entryWrapperStyle = useThreeUp ? ' style="flex:1 1 0;min-width:0;display:block;"' : '';
            entryHtml = '';
            entryHtml += '<div' + (
                useThreeUp
                    ? ' style="flex:1 1 0;min-width:0;"'
                    : (entry.halfWidth ? ' class="div_ev2"' : '')
            ) + '>';
            entryHtml += '<div style="text-align: center;">';
            entryHtml += '<img src="' + escapeNewsHtml(entry.imageSrc) + '" width="' + escapeNewsHtml(entry.imageWidth) + '" />';
            entryHtml += '</div>';
            entryHtml += '<p class="tx3v">' + escapeNewsHtml(entry.title) + '<br/>' + escapeNewsHtml(entry.date) + '</p>';
            entryHtml += '</div>';

            if (entry.href) {
                html += '<a href="' + escapeNewsHtml(entry.href) + '"' + entryWrapperStyle + '>' + entryHtml + '</a>';
            } else {
                if (useThreeUp) {
                    html += '<div' + entryWrapperStyle + '>' + entryHtml + '</div>';
                } else {
                    html += entryHtml;
                }
            }
        }

        if (useThreeUp) {
            html += '</div>';
        }
        html += '</div>';
    }

    container.innerHTML = html;
}

function setupNewsPage(yearTabsSelector, sectionsSelector) {
    var yearContainer = document.querySelector(yearTabsSelector);
    var sectionsContainer = document.querySelector(sectionsSelector);
    var buttons;
    var i;
    var activeId;

    renderNewsYearTabs(yearTabsSelector);
    renderNewsSections(sectionsSelector);

    if (!yearContainer || !sectionsContainer) {
        return;
    }

    buttons = yearContainer.querySelectorAll(".div_year");

    function display(id) {
        var k;
        var button;
        var section;

        for (k = 0; k < newsYearItems.length; k++) {
            button = document.getElementById("year" + newsYearItems[k].id);
            section = document.getElementById("news" + newsYearItems[k].id);

            if (button) {
                button.style.backgroundColor = "white";
                button.style.color = "#535353";
            }

            if (section) {
                section.style.display = "none";
            }
        }

        button = document.getElementById("year" + id);
        section = document.getElementById("news" + id);

        if (button) {
            button.style.backgroundColor = "#88abda";
            button.style.color = "#f5f5f5";
        }

        if (section) {
            section.style.display = "block";
        }
    }

    for (i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            activeId = this.id.replace("year", "");
            display(activeId);
        };
    }

    if (newsYearItems.length > 0) {
        display(newsYearItems[0].id);
    }
}
