var menuScrollMounted = false;

// 逐项容错：任何一项失败都不能中断后续挂载（尤其是滚动行为）
function safeRun(fn) {
    try {
        fn();
    } catch (e) {
        // 静默：单项失败不影响其余菜单与滚动行为的正常呈现
    }
}

function runSetup() {
    safeRun(setMainMenu);
    safeRun(setSubMenu);
    safeRun(setFooter);
    safeRun(setPC);
    safeRun(setupMenuScrollBehavior);
}

function tryMountMenuScroll() {
    if (menuScrollMounted) {
        return;
    }
    menuScrollMounted = setupMenuScrollBehavior();
}

// 保持原有执行时机（脚本所在位置同步执行），
// 并在 DOMContentLoaded / load 各补一次幂等重试，避免时机问题导致漏挂载
runSetup();
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", tryMountMenuScroll);
}
window.addEventListener("load", tryMountMenuScroll);

// 将 main_menu 与 sub_menu（若存在且非空）包进 #menu_wrap，
// 并绑定滚动行为：下滑隐藏、上滑显示。
// 返回是否已挂载，供外层做幂等重试。
function setupMenuScrollBehavior() {
    if (document.getElementById("menu_wrap")) {
        return true;
    }
    var mainMenu = document.getElementById("main_menu");
    if (!mainMenu) {
        return false;
    }
    var subMenu = document.getElementById("sub_menu");
    var hasSubMenu = !!(subMenu && subMenu.innerHTML.replace(/\s/g, "").length > 0);

    var parent = mainMenu.parentNode;
    var wrap = document.createElement("div");
    wrap.id = "menu_wrap";
    var spacer = document.createElement("div");
    spacer.id = "menu_spacer";

    // 菜单用 fixed 脱离文档流后需要占位块顶住原位置，否则正文会整体上移
    parent.insertBefore(spacer, mainMenu);
    parent.insertBefore(wrap, mainMenu);
    wrap.appendChild(mainMenu);
    if (hasSubMenu) {
        wrap.appendChild(subMenu);
        // 供样式判断：有子菜单时取消主菜单底边框，两者连成一块
        wrap.classList.add("has-sub");
    }

    syncMenuSpacer(wrap, spacer);
    window.addEventListener("resize", function () {
        syncMenuSpacer(wrap, spacer);
    });
    window.addEventListener("load", function () {
        syncMenuSpacer(wrap, spacer);
    });

    bindMenuScrollToggle(wrap);
    return true;
}

function syncMenuSpacer(wrap, spacer) {
    if (!wrap || !spacer) {
        return;
    }
    var h = wrap.offsetHeight || 0;
    spacer.style.height = h > 0 ? h + "px" : "";
}

function getScrollTop() {
    return window.pageYOffset ||
        (document.documentElement && document.documentElement.scrollTop) ||
        (document.body && document.body.scrollTop) || 0;
}

function bindMenuScrollToggle(wrap) {
    var HIDE_THRESHOLD = 80; // 距顶部该范围内始终显示，避免刚滚动就消失
    var lastY = getScrollTop();

    function isHidden() {
        return wrap.classList.contains("menu-hidden");
    }

    // 只要方向朝上就立刻显示：不设位移阈值。
    // 平滑滚动/触摸板会把一次滚动拆成多个 1~3px 的小步进事件，
    // 阈值会导致显示分支永远不触发。
    function show() {
        if (isHidden()) {
            wrap.classList.remove("menu-hidden");
        }
    }

    function hide() {
        if (!isHidden() && getScrollTop() > HIDE_THRESHOLD) {
            wrap.classList.add("menu-hidden");
        }
    }

    function onScroll() {
        var y = getScrollTop();
        if (y < lastY) {
            show();
        } else if (y > lastY) {
            hide();
        }
        lastY = y;
    }

    // 1) 窗口滚动（标准场景）
    window.addEventListener("scroll", onScroll, { passive: true });
    // 2) document 上的滚动（少数环境 scroll 事件以 document 为目标）
    document.addEventListener("scroll", onScroll, { passive: true });

    // 3) 祖先滚动容器：页面被包在 overflow:auto/scroll 容器里时，
    //    window 的 scroll 不会触发，必须直接监听该容器
    var el = wrap.parentNode;
    while (el && el.nodeType === 1) {
        try {
            var st = window.getComputedStyle ? window.getComputedStyle(el) : null;
            if (st && (st.overflowY === "auto" || st.overflowY === "scroll") &&
                el.scrollHeight > el.clientHeight + 4) {
                el.addEventListener("scroll", onScroll, { passive: true });
            }
        } catch (e) {
            // 单个节点样式探测失败不影响其余监听
        }
        el = el.parentNode;
    }

    // 4) 滚轮：方向明确即响应，完全不依赖滚动位置差值
    window.addEventListener("wheel", function (e) {
        if (e.deltaY < 0) {
            show();
        } else if (e.deltaY > 0) {
            hide();
        }
    }, { passive: true });

    // 5) 触摸设备
    var touchY = null;
    window.addEventListener("touchstart", function (e) {
        touchY = (e.touches && e.touches.length) ? e.touches[0].clientY : null;
    }, { passive: true });
    window.addEventListener("touchmove", function (e) {
        if (touchY === null || !e.touches || !e.touches.length) {
            return;
        }
        var y = e.touches[0].clientY;
        if (y > touchY) {
            show();
        } else if (y < touchY) {
            hide();
        }
        touchY = y;
    }, { passive: true });

    // 6) 键盘向上
    window.addEventListener("keydown", function (e) {
        if (e.key === "ArrowUp" || e.key === "PageUp" || e.key === "Home") {
            show();
        }
    });
}


function getRootPrefix() {
    var path = window.location.pathname.replace(/\\/g, '/');
    var lower = path.toLowerCase();
    var marker = '/pages/';
    var idx = lower.indexOf(marker);
    if (idx === -1) {
        return '';
    }
    var after = path.substring(idx + marker.length);
    var slashCount = (after.match(/\//g) || []).length;
    var depth = slashCount + 1;
    var prefix = '';
    for (var i = 0; i < depth; i++) {
        prefix += '../';
    }
    return prefix;
}

function toRoot(path) {
    return getRootPrefix() + path;
}

function setMainMenu() {
    var html = 
    `
        <div class="menu">
            <ul>
                <li><a href=\"${toRoot('index.html')}\"><b style="color:#88abda;">柒幻工作室</b></a></li>
                <li><a href="#">项目产品</a>
                    <ul>
                        <li class="menu-mega-col"><a href="#" style="color:#88abda;"><img src=\"${toRoot('images/menu_ico/software.png')}\" width="6%" />&nbsp;软件</a>
                            <ul>
                                <li><a href=\"${toRoot('pages/dream7c-WD/index.html')}\">柒幻 白露&nbsp;<img src=\"${toRoot('images/menu_ico/windows.png')}\" width="6%" /></a></li>
                                <li><a href=\"${toRoot('pages/dream7c-DV/index.html')}\">柒幻 麦芒&nbsp;<img src=\"${toRoot('images/menu_ico/windows.png')}\" width="6%" /></a></li>
                                <li><a href=\"${toRoot('pages/dream7c-GR/index.html')}\">柒幻 芒种&nbsp;<img src=\"${toRoot('images/menu_ico/windows.png')}\" width="6%" /></a></li>
                                <li><a href=\"${toRoot('pages/dream7c-FR/index.html')}\">柒幻 霜降&nbsp;<img src=\"${toRoot('images/menu_ico/windows.png')}\" width="6%" /><img src=\"${toRoot('images/menu_ico/android.png')}\" width="6%" /></a></li>
                                <li><a href=\"${toRoot('pages/dream7c-DE/index.html')}\">柒幻 寒露&nbsp;<img src=\"${toRoot('images/menu_ico/windows.png')}\" width="6%" /><img src=\"${toRoot('images/menu_ico/android.png')}\" width="6%" /></a></li>
                                <li><a href=\"${toRoot('pages/dream7c-RA/index.html')}\">柒幻 谷雨&nbsp;<img src=\"${toRoot('images/menu_ico/windows.png')}\" width="6%" /></a></li>
                                <li><a href=\"${toRoot('pages/dream7c-PC/index.html')}\">柒幻 千纸鹤&nbsp;<img src=\"${toRoot('images/menu_ico/windows.png')}\"width="6%" /></a></li>
                                <li><a href=\"${toRoot('pages/dream7c-GG/index.html')}\">柒幻 几何精灵&nbsp;<img src=\"${toRoot('images/menu_ico/windows.png')}\" width="6%" /></a></li>
                            </ul>
                        </li>
                        <li class="menu-mega-col"><a href="#" style="color:#88abda;"><img src=\"${toRoot('images/menu_ico/game.png')}\" width="6%" />&nbsp;游戏</a>
                            <ul>
                                <li><a href=\"${toRoot('pages/dream7c-CLR/index.html')}\">方块竞技 重制版&nbsp;<img src=\"${toRoot('images/menu_ico/windows.png')}\" width="6%" /></a></li>
                                <li><a href=\"${toRoot('pages/dream7c-XYHS/index.html')}\">新阳美发沙龙&nbsp;<img src=\"${toRoot('images/menu_ico/windows.png')}\" width="6%" /></a></li>
                                <li><a href=\"${toRoot('pages/dream7c-CL3/index.html')}\">方块竞技3&nbsp;<img src=\"${toRoot('images/menu_ico/windows.png')}\" width="6%" /></a></li>
                                <li><a href=\"${toRoot('pages/research/rehabilitation-game/index.html')}\" target="_blank">Rehabilitation Game&nbsp;<img src=\"${toRoot('images/menu_ico/windows.png')}\" width="6%" /></a></li>
                            </ul>
                        </li>
                        <li class="menu-mega-col"><a href="#" style="color:#88abda;"><img src=\"${toRoot('images/menu_ico/plugin.png')}\" width="6%" />&nbsp;插件</a>
                            <ul>
                                <li><a href=\"${toRoot('pages/dream7c-DU/index.html')}\">柒幻 扬琴</a></li>
                            </ul>
                            <a href="#" class="menu-mega-section-title" style="color:#88abda;"><img src=\"${toRoot('images/menu_ico/command.png')}\" width="6%" />&nbsp;命令</a>
                            <ul>
                                <li><a href=\"${toRoot('pages/Solstice.html')}\">Solstice</a></li>
                                <li><a href=\"${toRoot('pages/CGFC.html')}\">CGFC</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li><a href="#">关于柒幻</a>
                    <ul>
                        <li><a href="#" style="color:#88abda;"><img src=\"${toRoot('images/menu_ico/about.png')}\" width="6%" />&nbsp;关于</a>
                            <ul>
                                <li><a href=\"${toRoot('pages/about.html')}\">关于柒幻</a></li>
                                <li><a href=\"${toRoot('pages/about.html?page=donate')}\">捐助柒幻</a></li>
                            </ul>
                        </li>
                        <li><a href="#" style="color:#88abda;"><img src=\"${toRoot('images/menu_ico/media.png')}\" width="6%" />&nbsp;媒体</a>
                            <ul>
                                <li><a href=\"${toRoot('pages/news.html')}\">新闻动态</a></li>
                            </ul>
                        </li>
                        <li><a href="#" style="color:#88abda;"><img src=\"${toRoot('images/menu_ico/work.png')}\" width="6%" />&nbsp;工作</a>
                            <ul>
                                <li><a href=\"${toRoot('pages/recruit.html')}\">招贤纳士</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    `;
    document.getElementById("main_menu").innerHTML = html;
}

function getFileKeyName() {
    var fileName = getFileName();
    var match = fileName.match(/^dream7c-([A-Za-z0-9]+)(?:-|\.html$)/i);
    if (match) {
        return match[1].toUpperCase();
    }

    // 共享产品页（/pages/product/about.html?product=XX）通过 query 参数指定产品
    var paramMatch = window.location.search.match(/[?&]product=([A-Za-z0-9]+)/i);
    if (paramMatch) {
        return paramMatch[1].toUpperCase();
    }

    // 新结构下页面名可能是 index/about/download 等，
    // 通过目录名 /pages/dream7c-XX/ 提取产品 key。
    var path = window.location.pathname.replace(/\\/g, '/');
    var dirMatch = path.match(/\/pages\/dream7c-([A-Za-z0-9]+)\//i);
    if (dirMatch) {
        return dirMatch[1].toUpperCase();
    }

    return "";
}

function getFileName() {
    var currentUrl = window.location.href;
    var lastIndex = currentUrl.lastIndexOf("/");
    var fileName = currentUrl.substring(lastIndex + 1);
    return fileName;
}

function setSubMenu() {
    var menu = document.getElementById("sub_menu");
    if (!menu) {
        return;
    }
    var key = getFileKeyName();
    var fileName = getFileName();
    var html = "";
    if (key == "FR" || fileName == "Solstice.html") {
        html = 
        `
            <div class="menu-container">
                <div class="menu">
                    <ul>
                        <li style="background-color: #88abda;"><a href=\"${toRoot('pages/dream7c-FR/index.html')}\"><b style="color:white;">柒幻 霜降</b></a></li>
                        <li><a href=\"${toRoot('pages/product/download.html?product=FR')}\">下载</a></li>
                        <li><a href=\"${toRoot('pages/Solstice.html')}\">Solstice</a></li>
                        <li><a href=\"${toRoot('pages/dream7c-FR/fast-generate.html')}\">快速生成数据</a></li>
                        <li><a href=\"${toRoot('pages/product/about.html?product=FR')}\">关于 霜降</a></li>
                    </ul>
                </div>
            </div>
        `;
        
    } else if (key == "RA") {
        html =
        `
            <div class="menu-container">
                <div class="menu">
                    <ul>
                        <li style="background-color: #88abda;"><a href=\"${toRoot('pages/dream7c-RA/index.html')}\"><b style="color:white;">柒幻 谷雨</b></a></li>
        					<li><a href=\"${toRoot('pages/product/download.html?product=RA')}\">下载</a></li>
					        <li><a href=\"${toRoot('pages/product/about.html?product=RA')}\">关于 谷雨</a></li>
                    </ul>
                </div>
            </div>
        `;
    } else if (key == "GR") {
        html =
        `
            <div class="menu-container">
                <div class="menu">
                    <ul>
                        <li style="background-color: #88abda;"><a href=\"${toRoot('pages/dream7c-GR/index.html')}\"><b style="color:white;">柒幻 芒种</b></a></li>
        					<li><a href=\"${toRoot('pages/product/download.html?product=GR')}\">下载</a></li>
					        <li><a href=\"${toRoot('pages/product/about.html?product=GR')}\">关于 芒种</a></li>
                    </ul>
                </div>
            </div>
        `;
    } else if (key == "CL3") {
        html =
        `
            <div class="menu-container">
                <div class="menu">
                    <ul>
                        <li style="background-color: #88abda;"><a href=\"${toRoot('pages/dream7c-CL3/index.html')}\"><b style="color:white;">方块竞技3</b></a></li>
                        <li><a href=\"${toRoot('pages/product/download.html?product=CL3')}\">下载</a></li>
                        <li><a href=\"${toRoot('pages/product/about.html?product=CL3')}\">关于 方块竞技3</a></li>
                    </ul>
                </div>
            </div>
        `;
    } else if (key == "XYHS") {
        html =
        `
            <div class="menu-container">
                <div class="menu">
                    <ul>
                        <li style="background-color: #88abda;"><a href=\"${toRoot('pages/dream7c-XYHS/index.html')}\"><b style="color:white;">新阳美发沙龙</b></a></li>
                        <li><a href=\"${toRoot('pages/product/download.html?product=XYHS')}\">下载</a></li>
                        <li><a href=\"${toRoot('pages/product/about.html?product=XYHS')}\">关于 新阳美发沙龙</a></li>
                    </ul>
                </div>
            </div>
        `;
    } else if (key == "CLR") {
        html =
        `
            <div class="menu-container">
                <div class="menu">
                    <ul>
                        <li style="background-color: #88abda;"><a href=\"${toRoot('pages/dream7c-CLR/index.html')}\"><b style="color:white;">方块竞技 重制版</b></a></li>
                        <li><a href=\"${toRoot('pages/product/download.html?product=CLR')}\">下载</a></li>
                        <li><a href=\"${toRoot('pages/product/about.html?product=CLR')}\">关于 方块竞技 重制版</a></li>
                    </ul>
                </div>
            </div>
        `;
    } else if (key == "PC") {
        html =
        `
            <div class="menu-container">
                <div class="menu">
                    <ul>
                        <li style="background-color: #88abda;"><a href=\"${toRoot('pages/dream7c-PC/index.html')}\"><b style="color:white;">柒幻 千纸鹤</b></a></li>
                        <li><a href=\"${toRoot('pages/product/download.html?product=PC')}\">下载</a></li>
                        <!-- <li><a href=\"${toRoot('pages/dream7c-PC/help.html')}\">使用帮助</a></li> -->
                        <li><a href=\"${toRoot('pages/product/about.html?product=PC')}\">关于 千纸鹤</a></li>
                    </ul>
                </div>
            </div>
        `;
    } else if (key == "GG" || fileName == "CGFC.html") {
        html =
        `
            <div class="menu-container">
                <div class="menu">
                    <ul>
                        <li style="background-color: #88abda;"><a href=\"${toRoot('pages/dream7c-GG/index.html')}\"><b style="color:white;">柒幻 几何精灵</b></a></li>
                        <li><a href=\"${toRoot('pages/product/download.html?product=GG')}\">下载</a></li>
                        <li><a href=\"${toRoot('pages/CGFC.html')}\">CGFC</a></li>
                        <li><a href=\"${toRoot('pages/product/about.html?product=GG')}\">关于 几何精灵</a></li>
                    </ul>
                </div>
            </div>
        `;
    } else if (key == "DE") {
        html =
        `
            <div class="menu-container">
                <div class="menu">
                    <ul>
                        <li style="background-color: #88abda;"><a href=\"${toRoot('pages/dream7c-DE/index.html')}\"><b style="color:white;">柒幻 寒露</b></a></li>
                        <li><a href=\"${toRoot('pages/product/download.html?product=DE')}\">下载</a></li>
                        <li><a href=\"${toRoot('pages/dream7c-DE/fast-import.html')}\">快速导入题目</a></li>
                        <li><a href=\"${toRoot('pages/product/about.html?product=DE')}\">关于 寒露</a></li>
                    </ul>
                </div>
            </div>
        `;
    } else if (key == "DV") {
        html =
        `
            <div class="menu-container">
                <div class="menu">
                    <ul>
                        <li style="background-color: #88abda;"><a href=\"${toRoot('pages/dream7c-DV/index.html')}\"><b style="color:white;">柒幻 麦芒</b></a></li>
                        <li><a href=\"${toRoot('pages/product/download.html?product=DV')}\">下载</a></li>
                        <li><a href=\"${toRoot('pages/product/about.html?product=DV')}\">关于 麦芒</a></li>
                    </ul>
                </div>
            </div>
        `;
    } else if (key == "DU") {
        html = 
        `
            <div class="menu-container">
                <div class="menu">
                    <ul>
                        <li style="background-color: #88abda;"><a href=\"${toRoot('pages/dream7c-DU/index.html')}\"><b style="color:white;">柒幻 扬琴</b></a></li>
                        <li><a href=\"${toRoot('pages/product/download.html?product=DU')}\">下载</a></li>
                        <li><a href=\"${toRoot('pages/dream7c-DU/help.html')}\">使用帮助</a></li>
                        <li><a href=\"${toRoot('pages/product/about.html?product=DU')}\">关于 扬琴</a></li>
                    </ul>
                </div>
            </div>
        `;
    } else if (key == "WD") {
        html = 
        `
            <div class="menu-container">
                <div class="menu">
                    <ul>
                        <li style="background-color: #88abda;"><a href=\"${toRoot('pages/dream7c-WD/index.html')}\"><b style="color:white;">柒幻 白露</b></a></li>
                        <li><a href=\"${toRoot('pages/product/download.html?product=WD')}\">下载</a></li>
                        <li><a href=\"${toRoot('pages/product/about.html?product=WD')}\">关于 白露</a></li>
                    </ul>
                </div>
            </div>
        `;
    }
    menu.innerHTML = html;
    applySubMenuHighlight(menu);
}

function getCurrentPageFile() {
    var fileName = getFileName().split('?')[0];
    // 目录 URL（无扩展名）视为 index.html
    if (fileName.indexOf('.') === -1) {
        fileName = 'index.html';
    }
    return fileName.toLowerCase();
}

// 将 sub_menu 的蓝色高亮从固定的第一项移动到当前页面对应的按钮上
function applySubMenuHighlight(menu) {
    var current = getCurrentPageFile();
    var lis = menu.querySelectorAll('.menu > ul > li');
    if (!lis.length) {
        return;
    }
    var activeLi = null;
    for (var i = 0; i < lis.length; i++) {
        var link = lis[i].querySelector('a');
        if (!link || !link.getAttribute('href')) {
            continue;
        }
        var file = link.getAttribute('href').split('?')[0];
        file = file.substring(file.lastIndexOf('/') + 1).toLowerCase();
        if (file === current) {
            activeLi = lis[i];
            break;
        }
    }
    // 当前页不在子菜单中（如已注释的菜单项）时保持原有高亮不变
    if (!activeLi) {
        return;
    }
    for (var j = 0; j < lis.length; j++) {
        lis[j].removeAttribute('style');
        var b = lis[j].querySelector('a b');
        if (b) {
            b.removeAttribute('style');
        }
    }
    activeLi.setAttribute('style', 'background-color: #88abda;');
}

function setFooter() {
    var html = 
    `
        <div style="background-color:#e9e9e9;font-size:18px;color:#535353;clear:both;overflow:hidden;">			
			<div style="margin:0 auto;width:78%;padding:1% 1% 2% 1%;">
				<div style="clear:both;line-height:225%;">
					<br/>
					<div style="clear:both;display:flex;align-items:flex-start;gap:1.33%;">
						<div style="width:24%;">
							<p style="color:#88abda;clear:both;font-size:22px;margin:0;margin-bottom:18px;">软件<br/></p>
							<a href=\"${toRoot('pages/dream7c-WD/index.html')}\">柒幻 白露</a><br/>
							<a href=\"${toRoot('pages/dream7c-DV/index.html')}\">柒幻 麦芒</a><br/>
							<a href=\"${toRoot('pages/dream7c-GR/index.html')}\">柒幻 芒种</a><br/>
							<a href=\"${toRoot('pages/dream7c-FR/index.html')}\">柒幻 霜降</a><br/>
							<a href=\"${toRoot('pages/dream7c-DE/index.html')}\">柒幻 寒露</a><br/>
							<a href=\"${toRoot('pages/dream7c-RA/index.html')}\">柒幻 谷雨</a><br/>
							<a href=\"${toRoot('pages/dream7c-PC/index.html')}\">柒幻 千纸鹤</a><br/>
							<a href=\"${toRoot('pages/dream7c-GG/index.html')}\">柒幻 几何精灵</a>
						</div>
						<div style="width:24%;">
	                        <p style="color:#88abda;clear:both;font-size:22px;margin:0;margin-bottom:18px;">游戏<br/></p>
							<a href=\"${toRoot('pages/dream7c-CLR/index.html')}\">方块竞技 重制版</a><br/>
							<a href=\"${toRoot('pages/dream7c-XYHS/index.html')}\">新阳美发沙龙</a><br/>
							<a href=\"${toRoot('pages/dream7c-CL3/index.html')}\">方块竞技3</a><br/>
							<a href=\"${toRoot('pages/research/rehabilitation-game/index.html')}\" target="_blank">Rehabilitation Game</a>
						</div>
						<div style="width:24%;">
	                        <p style="color:#88abda;clear:both;font-size:22px;margin:0;margin-bottom:18px;">插件<br/></p>
							<a href=\"${toRoot('pages/dream7c-DU/index.html')}\">柒幻 扬琴</a><br/>
	                        <p style="color:#88abda;clear:both;font-size:22px;margin:18px 0 0;margin-bottom:18px;">命令<br/></p>
							<a href=\"${toRoot('pages/Solstice.html')}\">Solstice</a><br/>
	                        <a href=\"${toRoot('pages/CGFC.html')}\">CGFC</a>
						</div>
						<div style="width:24%;">
							<p style="color:#88abda;clear:both;font-size:22px;margin:0;margin-bottom:15px;">工作室<br/></p>
							<a href=\"${toRoot('pages/about.html')}\">关于柒幻</a><br/>
							<a href=\"${toRoot('pages/news.html')}\">新闻动态</a><br/>
							<a href=\"${toRoot('pages/recruit.html')}\">招贤纳士</a><br/>
							<a href=\"${toRoot('pages/about.html?page=donate')}\">捐助柒幻</a>
						</div>
					</div>
					<div style="clear:both;">
						<br/>
						<img src=\"${toRoot('images/dream7c logo.jpg')}\" style="max-width: 80px;max-height: 80px;float:left;">
						<div style="float:left;margin-left: 5%;" class="txn">
							Copyright &copy; 2026 <strong style="color:#88abda;">柒幻工作室 dream7c</strong> 版权所有
						</div>
						<br style="clear:both;"/><br/>
					</div>
				</div>
			</div>
		</div>
    `;
    document.getElementById("footer").innerHTML = html;
}

function setPC() {
    var pc = document.getElementById("pc-navi");
    if (!pc) {
        return;
    }
    var html = 
    `
        <a href=\"${toRoot('pages/dream7c-PC/index.html')}\">
            <div class="tx3v" style="clear:both;background-color:#88abda;color:white;width:90%;margin:0 auto;padding:10px;">
                本页面部分内容由 柒幻 千纸鹤 制作，点此了解 柒幻 千纸鹤&nbsp;&gt;&gt;
            </div>
        </a>
    `;
    pc.innerHTML = html;
}
