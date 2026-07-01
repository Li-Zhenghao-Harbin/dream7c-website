var recruitPositions = [
    {
        title: "软件开发工程师",
        location: "线上远程办公",
        department: "软件工程部",
        headcount: "1",
        description: [
            "参与最新的软件和游戏产品的研发；",
            "负责所属模块的代码编写、调试与维护；",
            "协助完成各类技术开发任务。"
        ],
        requirements: [
            "本科及以上学历，计算机相关专业优先；",
            "热爱编程，熟悉C#/Java/Go之一，有Windows/Android相关开发经验；",
            "具有良好的问题判断和解决能力、口头和书面沟通能力、学习能力。"
        ]
    },
    {
        title: "平面设计师",
        location: "线上远程办公",
        department: "数字媒体部",
        headcount: "1",
        description: [
            "参与软件UI、图标以及游戏角色设计；",
            "协助完成各类设计任务。"
        ],
        requirements: [
            "本科及以上学历，不限专业；",
            "热爱设计，熟悉Blender等建模软件的使用；",
            "具有良好的问题判断和解决能力、口头和书面沟通能力、学习能力。"
        ]
    }
];

function escapeRecruitHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function renderRecruitList(items) {
    var html = "";
    var i;

    for (i = 0; i < items.length; i++) {
        html += '<div class="dive" id="c' + (i + 1) + '"><p class="tx3v">' + escapeRecruitHtml(items[i].title) + '</p></div>';
    }

    return html;
}

function renderRecruitItems(items, listTitle) {
    var html = "";
    var i;

    for (i = 0; i < items.length; i++) {
        html += (i + 1) + "、" + escapeRecruitHtml(items[i]) + "<br/>";
    }

    return '<p><b>' + escapeRecruitHtml(listTitle) + '：</b><br/><br/>' + html + '</p>';
}

function renderRecruitDetail(position, index) {
    var style = index === 0 ? "" : ' style="display:none;"';
    var html = '<div class="diva2" id="i' + (index + 1) + '"' + style + '>';

    html += '<p class="tx2v">' + escapeRecruitHtml(position.title) + '</p>';
    html += '<div class="tx3">';
    html += '<p><b>工作地点：</b>' + escapeRecruitHtml(position.location) + '</p>';
    html += '<p><b>隶属部门：</b>' + escapeRecruitHtml(position.department) + '</p>';
    html += '<p><b>招聘人数：</b>' + escapeRecruitHtml(position.headcount) + '</p>';
    html += renderRecruitItems(position.description, "职位描述");
    html += renderRecruitItems(position.requirements, "职位要求");
    html += '</div>';
    html += '<br/>';
    html += '<div class="tx2v">欢迎您通过邮箱联系我们：dream7c@outlook.com</div>';
    html += '</div>';

    return html;
}

function renderRecruitPage(menuSelector, detailSelector) {
    var menuContainer = document.querySelector(menuSelector);
    var detailContainer = document.querySelector(detailSelector);
    var html = "";
    var i;

    if (!menuContainer || !detailContainer) {
        return;
    }

    menuContainer.innerHTML = renderRecruitList(recruitPositions);

    for (i = 0; i < recruitPositions.length; i++) {
        html += renderRecruitDetail(recruitPositions[i], i);
    }

    detailContainer.innerHTML = html;
}
