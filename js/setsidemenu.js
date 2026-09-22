document.addEventListener('DOMContentLoaded', function() {
    var tabs = document.querySelectorAll('.dive[id]');
    var panelCount = document.querySelectorAll('div[id^="i"]').length;
    var interacted = false;
    var i;

    function activate(tab) {
        var j;
        var panel;

        for (j = 0; j < tabs.length; j++) {
            tabs[j].classList.remove('dive-active');
        }
        tab.classList.add('dive-active');

        for (j = 1; j <= panelCount; j++) {
            panel = document.getElementById('i' + j);
            if (panel) {
                panel.style.display = 'none';
            }
        }
        panel = document.getElementById('i' + tab.id.charAt(1));
        if (panel) {
            panel.style.display = 'block';
        }
    }

    function highlightInitialTab() {
        var j;
        var panel;

        for (j = 0; j < tabs.length; j++) {
            tabs[j].classList.remove('dive-active');
        }

        for (j = 0; j < tabs.length; j++) {
            panel = document.getElementById('i' + tabs[j].id.charAt(1));
            if (panel && panel.style.display !== 'none') {
                tabs[j].classList.add('dive-active');
                return;
            }
        }
    }

    for (i = 0; i < tabs.length; i++) {
        (function(tab) {
            tab.addEventListener('click', function() {
                interacted = true;
                activate(tab);
            });
        })(tabs[i]);
    }

    highlightInitialTab();

    // 深链（如 about.html 的 ?page=donate）在 load 阶段才切换内容区，届时再校正一次高亮
    window.addEventListener('load', function() {
        if (!interacted) {
            highlightInitialTab();
        }
    });
});
