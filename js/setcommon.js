window.onload = new function() {
    setMainMenu();
    setSubMenu();
    setFooter();
    setPC();
}

function setMainMenu() {
    var html = 
    `
        <div class="menu">
            <ul>
                <li><a href="index.html"><b style="color:#88abda;">柒幻工作室</b></a></li>
                <li><a href="#">项目产品</a>
                    <ul>
                        <li><a href="#" style="color:#88abda;"><img src="images/menu_ico/software.png" width="6%" />&nbsp;软件</a>
                            <ul>
                                <li><a href="dream7c-FR.html">柒幻 霜降&nbsp;<img src="images/menu_ico/windows.png" width="6%" /><img src="images/menu_ico/android.png" width="6%" /></a></li>
                                <li><a href="dream7c-DE.html">柒幻 寒露&nbsp;<img src="images/menu_ico/windows.png" width="6%" /><img src="images/menu_ico/android.png" width="6%" /></a></li>
                                <li><a href="dream7c-RA.html">柒幻 谷雨&nbsp;<img src="images/menu_ico/windows.png" width="6%" /></a></li>
                                <li><a href="dream7c-PC.html">柒幻 千纸鹤&nbsp;<img src="images/menu_ico/windows.png"width="6%" /></a></li>
                                <li><a href="dream7c-GG.html">柒幻 几何精灵&nbsp;<img src="images/menu_ico/windows.png" width="6%" /></a></li>
                            </ul>
                        </li>
                        <li><a href="#" style="color:#88abda;"><img src="images/menu_ico/command.png" width="6%" />&nbsp;命令</a>
                            <ul>
                                <li><a href="CGFC.html">CGFC</a></li>
                                <li><a href="Solstice.html">Solstice</a></li>
                            </ul>
                        </li>
                        <li><a href="#" style="color:#88abda;"><img src="images/menu_ico/game.png" width="6%" />&nbsp;游戏</a>
                            <ul>
                                <li><a href="dream7c-CL3.html">方块竞技3&nbsp;<img src="images/menu_ico/windows.png" width="6%" /></a></li>
                                <li><a href="research/rehabilitation game/index.html" target="_blank">Rehabilitation Game&nbsp;<img src="images/menu_ico/windows.png" width="6%" /></a></li>
                            </ul>
                        </li>
                        <li><a href="#" style="color:#88abda;"><img src="images/menu_ico/music.png" width="6%" />&nbsp;音乐</a>
                            <ul>
                                <li><a href="music.html">游戏原声专辑</a></li>
                                <!-- <li><a href="#"></a></li> -->
                            </ul>
                        </li>
                    </ul>
                </li>
                <li><a href="#">关于柒幻</a>
                    <ul>
                        <li><a href="#" style="color:#88abda;"><img src="images/menu_ico/about.png" width="6%" />&nbsp;关于</a>
                            <ul>
                                <li><a href="about.html">关于柒幻</a></li>
                                <li><a href="about.html?page=donate">捐助柒幻</a></li>
                            </ul>
                        </li>
                        <li><a href="#" style="color:#88abda;"><img src="images/menu_ico/media.png" width="6%" />&nbsp;媒体</a>
                            <ul>
                                <li><a href="news.html">新闻动态</a></li>
                            </ul>
                        </li>
                        <li><a href="#" style="color:#88abda;"><img src="images/menu_ico/work.png" width="6%" />&nbsp;工作</a>
                            <ul>
                                <li><a href="recruit.html">招贤纳士</a></li>
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
    var idx1 = fileName.indexOf('-'); // 获取第一个-的位置
    var idx2 = fileName.indexOf('-', idx1 + 1); // 获取第二个-的位置
    if (idx2 == -1) { // 如果没有-，则找.的位置
        idx2 = fileName.lastIndexOf('.');
    }
    var key = fileName.substring(idx1 + 1, idx2);
    return key;
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
                        <li style="background-color: #88abda;"><a href="dream7c-FR.html"><b style="color:white;">柒幻 霜降</b></a></li>
                        <li><a href="dream7c-FR-download.html">下载</a></li>
                        <li><a href="Solstice.html">Solstice</a></li>
                        <li><a href="dream7c-FR-fast-generate.html">快速生成数据</a></li>
                        <li><a href="dream7c-FR-about.html">关于 霜降</a></li>
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
                        <li style="background-color: #88abda;"><a href="dream7c-RA.html"><b style="color:white;">柒幻 谷雨</b></a></li>
        					<li><a href="dream7c-RA-download.html">下载</a></li>
					        <li><a href="dream7c-RA-about.html">关于 谷雨</a></li>
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
                        <li style="background-color: #88abda;"><a href="dream7c-CL3.html"><b style="color:white;">柒幻 方块竞技3</b></a></li>
                        <li><a href="dream7c-CL3-about.html">关于 方块竞技3</a></li>
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
                        <li style="background-color: #88abda;"><a href="dream7c-PC.html"><b style="color:white;">柒幻 千纸鹤</b></a></li>
                        <li><a href="dream7c-PC-download.html">下载</a></li>
                        <!-- <li><a href="dream7c-PC-help.html">使用帮助</a></li> -->
                        <li><a href="dream7c-PC-about.html">关于 千纸鹤</a></li>
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
                        <li style="background-color: #88abda;"><a href="dream7c-GG.html"><b style="color:white;">柒幻 几何精灵</b></a></li>
                        <li><a href="dream7c-GG-download.html">下载</a></li>
                        <li><a href="CGFC.html">CGFC</a></li>
                        <li><a href="dream7c-GG-about.html">关于 几何精灵</a></li>
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
                        <li style="background-color: #88abda;"><a href="dream7c-DE.html"><b style="color:white;">柒幻 寒露</b></a></li>
                        <li><a href="dream7c-DE-download.html">下载</a></li>
                        <li><a href="dream7c-DE-fast-import.html">快速导入题目</a></li>
                        <li><a href="dream7c-DE-about.html">关于 寒露</a></li>
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
						<a href="dream7c-FR.html">柒幻 霜降</a><br/>
						<a href="dream7c-DE.html">柒幻 寒露</a><br/>
						<a href="dream7c-RA.html">柒幻 谷雨</a><br/>
						<a href="dream7c-PC.html">柒幻 千纸鹤</a><br/>
						<a href="dream7c-GG.html">柒幻 几何精灵</a>
					</div>
					<div style="float:left;width:24%;">
						<p style="color:#88abda;clear:both;font-size:22px;">命令<br/></p>
						<a href="CGFC.html">CGFC</a><br/>
						<a href="Solstice.html">Solstice</a>
					</div>
					<div style="float:left;width:24%;">
						<p style="color:#88abda;clear:both;font-size:22px;">游戏<br/></p>
						<a href="dream7c-CL3.html">方块竞技3</a><br/>
						<a href="research/rehabilitation game/index.html" target="_blank">RG</a><br/>
						<a href="music.html">游戏原声专辑</a><br/>
					</div>
					<div style="float:left;width:24%;">
						<p style="color:#88abda;clear:both;font-size:22px;">工作室<br/></p>
						<a href="about.html">关于柒幻</a><br/>
						<a href="news.html">新闻动态</a><br/>
						<a href="recruit.html">招贤纳士</a><br/>
						<a href="about.html?page=donate">捐助柒幻</a>
					</div>
					<div style="clear:both;">
						<br/>
						<img src="images/dream7c logo.jpg" style="max-width: 80px;max-height: 80px;float:left;">
						<div style="float:left;margin-left: 5%;" class="txn">
							Copyright &copy; 2025 <strong style="color:#88abda;">柒幻工作室 dream7c</strong> 版权所有
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
        <a href="dream7c-PC.html">
            <div class="tx3v" style="clear:both;background-color:#88abda;color:white;width:90%;margin:0 auto;padding:10px;">
                本页面部分内容由 柒幻 千纸鹤 制作，点此了解 柒幻 千纸鹤&nbsp;&gt;&gt;
            </div>
        </a>
    `;
    pc.innerHTML = html;
}