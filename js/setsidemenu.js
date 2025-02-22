document.addEventListener('DOMContentLoaded', function() {
    var clickableDivs = document.querySelectorAll('div[id^="c"]');
    clickableDivs.forEach(function(div) {
        div.addEventListener('click', function() {
            for (var j = 1; j <= document.querySelectorAll('div[id^="i"]').length; j++) {
                document.getElementById("i" + j).style.display = 'none';
            }
            document.getElementById("i" + div.id.charAt(1)).style.display = 'block';
        });
    });
});