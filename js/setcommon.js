window.onload = new function() {
    setMainMenu();
    setSubMenu();
    setFooter();
    setPC();
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
                        <li><a href="#" style="color:#88abda;"><img src=\"${toRoot('images/menu_ico/software.png')}\" width="6%" />&nbsp;软件</a>
                            <ul>
                            <li><a href=\"${toRoot('pages/dream7c-WD/index.html')}\">柒幻 白露&nbsp;<img src=\"${toRoot('images/menu_ico/windows.png')}\" width="6%" /></a></li>
                            <li><a href=\"${toRoot('pages/dream7c-DV/index.html')}\">柒幻 麦芒&nbsp;<img src=\"${toRoot('images/menu_ico/windows.png')}\" width="6%" /></a></li>
                            <li><a href=\"${toRoot('pages/dream7c-FR/index.html')}\">柒幻 霜降&nbsp;<img src=\"${toRoot('images/menu_ico/windows.png')}\" width="6%" /><img src=\"${toRoot('images/menu_ico/android.png')}\" width="6%" /></a></li>
                            <li><a href=\"${toRoot('pages/dream7c-DE/index.html')}\">柒幻 寒露&nbsp;<img src=\"${toRoot('images/menu_ico/windows.png')}\" width="6%" /><img src=\"${toRoot('images/menu_ico/android.png')}\" width="6%" /></a></li>
                                <li><a href=\"${toRoot('pages/dream7c-RA/index.html')}\">柒幻 谷雨&nbsp;<img src=\"${toRoot('images/menu_ico/windows.png')}\" width="6%" /></a></li>
                                <li><a href=\"${toRoot('pages/dream7c-PC/index.html')}\">柒幻 千纸鹤&nbsp;<img src=\"${toRoot('images/menu_ico/windows.png')}\"width="6%" /></a></li>
                                <li><a href=\"${toRoot('pages/dream7c-GG/index.html')}\">柒幻 几何精灵&nbsp;<img src=\"${toRoot('images/menu_ico/windows.png')}\" width="6%" /></a></li>
                            </ul>
                        </li>
                        <li><a href="#" style="color:#88abda;"><img src=\"${toRoot('images/menu_ico/command.png')}\" width="6%" />&nbsp;命令</a>
                            <ul>
                                <li><a href=\"${toRoot('pages/Solstice.html')}\">Solstice</a></li>
                                <li><a href=\"${toRoot('pages/CGFC.html')}\">CGFC</a></li>
                            </ul>
                        </li>
                        <li><a href="#" style="color:#88abda;"><img src=\"${toRoot('images/menu_ico/game.png')}\" width="6%" />&nbsp;游戏</a>
                            <ul>
                                <li><a href=\"${toRoot('pages/dream7c-CL3/index.html')}\">方块竞技3&nbsp;<img src=\"${toRoot('images/menu_ico/windows.png')}\" width="6%" /></a></li>
                                <li><a href=\"${toRoot('pages/research/rehabilitation-game/index.html')}\" target="_blank">Rehabilitation Game&nbsp;<img src=\"${toRoot('images/menu_ico/windows.png')}\" width="6%" /></a></li>
                            </ul>
                        </li>
                        <li><a href="#" style="color:#88abda;"><img src=\"${toRoot('images/menu_ico/plugin.png')}\" width="6%" />&nbsp;插件</a>
                            <ul>
                                <li><a href=\"${toRoot('pages/dream7c-DU/index.html')}\">柒幻 扬琴</a></li>
                                <!-- <li><a href="#"></a></li> -->
                            </ul>
                        </li>
                        <li><a href="#" style="color:#88abda;"><img src=\"${toRoot('images/menu_ico/music.png')}\" width="6%" />&nbsp;音乐</a>
                            <ul>
                                <li><a href=\"${toRoot('pages/music.html')}\">游戏原声专辑</a></li>
                                <!-- <li><a href="#"></a></li> -->
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
                <div class="menu" style="margin-top: 15px;">
                    <ul>
                        <li style="background-color: #88abda;"><a href=\"${toRoot('pages/dream7c-FR/index.html')}\"><b style="color:white;">柒幻 霜降</b></a></li>
                        <li><a href=\"${toRoot('pages/dream7c-FR/download.html')}\">下载</a></li>
                        <li><a href=\"${toRoot('pages/Solstice.html')}\">Solstice</a></li>
                        <li><a href=\"${toRoot('pages/dream7c-FR/fast-generate.html')}\">快速生成数据</a></li>
                        <li><a href=\"${toRoot('pages/dream7c-FR/about.html')}\">关于 霜降</a></li>
                    </ul>
                </div>
            </div>
        `;
        
    } else if (key == "RA") {
        html =
        `
            <div class="menu-container">
                <div class="menu" style="margin-top: 15px;">
                    <ul>
                        <li style="background-color: #88abda;"><a href=\"${toRoot('pages/dream7c-RA/index.html')}\"><b style="color:white;">柒幻 谷雨</b></a></li>
        					<li><a href=\"${toRoot('pages/dream7c-RA/download.html')}\">下载</a></li>
					        <li><a href=\"${toRoot('pages/dream7c-RA/about.html')}\">关于 谷雨</a></li>
                    </ul>
                </div>
            </div>
        `;
    } else if (key == "CL3") {
        html =
        `
            <div class="menu-container">
                <div class="menu" style="margin-top: 15px;">
                    <ul>
                        <li style="background-color: #88abda;"><a href=\"${toRoot('pages/dream7c-CL3/index.html')}\"><b style="color:white;">柒幻 方块竞技3</b></a></li>
                        <li><a href=\"${toRoot('pages/dream7c-CL3/about.html')}\">关于 方块竞技3</a></li>
                    </ul>
                </div>
            </div>
        `;
    } else if (key == "PC") {
        html =
        `
            <div class="menu-container">
                <div class="menu" style="margin-top: 15px;">
                    <ul>
                        <li style="background-color: #88abda;"><a href=\"${toRoot('pages/dream7c-PC/index.html')}\"><b style="color:white;">柒幻 千纸鹤</b></a></li>
                        <li><a href=\"${toRoot('pages/dream7c-PC/download.html')}\">下载</a></li>
                        <!-- <li><a href=\"${toRoot('pages/dream7c-PC/help.html')}\">使用帮助</a></li> -->
                        <li><a href=\"${toRoot('pages/dream7c-PC/about.html')}\">关于 千纸鹤</a></li>
                    </ul>
                </div>
            </div>
        `;
    } else if (key == "GG" || fileName == "CGFC.html") {
        html =
        `
            <div class="menu-container">
                <div class="menu" style="margin-top: 15px;">
                    <ul>
                        <li style="background-color: #88abda;"><a href=\"${toRoot('pages/dream7c-GG/index.html')}\"><b style="color:white;">柒幻 几何精灵</b></a></li>
                        <li><a href=\"${toRoot('pages/dream7c-GG/download.html')}\">下载</a></li>
                        <li><a href=\"${toRoot('pages/CGFC.html')}\">CGFC</a></li>
                        <li><a href=\"${toRoot('pages/dream7c-GG/about.html')}\">关于 几何精灵</a></li>
                    </ul>
                </div>
            </div>
        `;
    } else if (key == "DE") {
        html =
        `
            <div class="menu-container">
                <div class="menu" style="margin-top: 15px;">
                    <ul>
                        <li style="background-color: #88abda;"><a href=\"${toRoot('pages/dream7c-DE/index.html')}\"><b style="color:white;">柒幻 寒露</b></a></li>
                        <li><a href=\"${toRoot('pages/dream7c-DE/download.html')}\">下载</a></li>
                        <li><a href=\"${toRoot('pages/dream7c-DE/fast-import.html')}\">快速导入题目</a></li>
                        <li><a href=\"${toRoot('pages/dream7c-DE/about.html')}\">关于 寒露</a></li>
                    </ul>
                </div>
            </div>
        `;
    } else if (key == "DV") {
        html =
        `
            <div class="menu-container">
                <div class="menu" style="margin-top: 15px;">
                    <ul>
                        <li style="background-color: #88abda;"><a href=\"${toRoot('pages/dream7c-DV/index.html')}\"><b style="color:white;">柒幻 麦芒</b></a></li>
                        <li><a href=\"${toRoot('pages/dream7c-DV/download.html')}\">下载</a></li>
                        <li><a href=\"${toRoot('pages/dream7c-DV/about.html')}\">关于 麦芒</a></li>
                    </ul>
                </div>
            </div>
        `;
    } else if (key == "DU") {
        html = 
        `
            <div class="menu-container">
                <div class="menu" style="margin-top: 15px;">
                    <ul>
                        <li style="background-color: #88abda;"><a href=\"${toRoot('pages/dream7c-DU/index.html')}\"><b style="color:white;">柒幻 扬琴</b></a></li>
                        <li><a href=\"${toRoot('pages/dream7c-DU/download.html')}\">下载</a></li>
                        <li><a href=\"${toRoot('pages/dream7c-DU/help.html')}\">使用帮助</a></li>
                        <li><a href=\"${toRoot('pages/dream7c-DU/about.html')}\">关于 扬琴</a></li>
                    </ul>
                </div>
            </div>
        `;
    } else if (key == "WD") {
        html = 
        `
            <div class="menu-container">
                <div class="menu" style="margin-top: 15px;">
                    <ul>
                        <li style="background-color: #88abda;"><a href=\"${toRoot('pages/dream7c-WD/index.html')}\"><b style="color:white;">柒幻 白露</b></a></li>
                        <li><a href=\"${toRoot('pages/dream7c-WD/download.html')}\">下载</a></li>
                        <li><a href=\"${toRoot('pages/dream7c-WD/about.html')}\">关于 白露</a></li>
                    </ul>
                </div>
            </div>
        `;
    }
    menu.innerHTML = html;
}

function setFooter() {
    var html = 
    `
        <div style="background-color:#e9e9e9;font-size:18px;color:#535353;clear:both;overflow:hidden;">			
			<div style="margin:0 auto;width:78%;padding:1% 1% 2% 1%;">
				<div style="clear:both;line-height:225%;">
					<br/>
					<div style="float:left;width:24%;">
						<p style="color:#88abda;clear:both;font-size:22px;">软件<br/></p>
						<a href=\"${toRoot('pages/dream7c-WD/index.html')}\">柒幻 白露</a><br/>
						<a href=\"${toRoot('pages/dream7c-DV/index.html')}\">柒幻 麦芒</a><br/>
						<a href=\"${toRoot('pages/dream7c-FR/index.html')}\">柒幻 霜降</a><br/>
						<a href=\"${toRoot('pages/dream7c-DE/index.html')}\">柒幻 寒露</a><br/>
						<a href=\"${toRoot('pages/dream7c-RA/index.html')}\">柒幻 谷雨</a><br/>
						<a href=\"${toRoot('pages/dream7c-PC/index.html')}\">柒幻 千纸鹤</a><br/>
						<a href=\"${toRoot('pages/dream7c-GG/index.html')}\">柒幻 几何精灵</a>
					</div>
					<div style="float:left;width:24%;">
						<p style="color:#88abda;clear:both;font-size:22px;">命令<br/></p>
						<a href=\"${toRoot('pages/Solstice.html')}\">Solstice</a><br/>
                        <a href=\"${toRoot('pages/CGFC.html')}\">CGFC</a>
                        <p style="color:#88abda;clear:both;font-size:22px;">插件<br/></p>
						<a href=\"${toRoot('pages/dream7c-DU/index.html')}\">柒幻 扬琴</a><br/>
					</div>
					<div style="float:left;width:24%;">
						<p style="color:#88abda;clear:both;font-size:22px;">游戏<br/></p>
						<a href=\"${toRoot('pages/dream7c-CL3/index.html')}\">方块竞技3</a><br/>
						<a href=\"${toRoot('pages/research/rehabilitation-game/index.html')}\" target="_blank">Rehabilitation Game</a><br/>
                        <p style="color:#88abda;clear:both;font-size:22px;">音乐<br/></p>
						<a href=\"${toRoot('pages/music.html')}\">游戏原声专辑</a><br/>
					</div>
					<div style="float:left;width:24%;">
						<p style="color:#88abda;clear:both;font-size:22px;">工作室<br/></p>
						<a href=\"${toRoot('pages/about.html')}\">关于柒幻</a><br/>
						<a href=\"${toRoot('pages/news.html')}\">新闻动态</a><br/>
						<a href=\"${toRoot('pages/recruit.html')}\">招贤纳士</a><br/>
						<a href=\"${toRoot('pages/about.html?page=donate')}\">捐助柒幻</a>
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