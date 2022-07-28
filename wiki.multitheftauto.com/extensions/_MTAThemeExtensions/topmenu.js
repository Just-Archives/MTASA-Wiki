var topmenu = '<div class="nav_bar"><div class="nav_bar__container">\
	<a class="mta_nav" href="https://multitheftauto.com">Home</a>\
	<a class="mta_nav" href="https://discord.com/invite/mtasa" rel="noopener" target="_blank">Discord</a>\
	<a class="mta_nav" href="https://community.multitheftauto.com">Community</a>\
	<a class="mta_nav" href="https://forum.multitheftauto.com">Forum</a>\
	<a class="mta_nav" href="https://wiki.multitheftauto.com/wiki/Main_Page">Wiki</a>\
	<a class="mta_nav" href="https://github.com/multitheftauto/mtasa-blue/issues" rel="noopener" target="_blank">Bugs</a>\
	<a class="mta_nav" href="https://multitheftauto.com/donate/">Heroes</a>\
	<a class="mta_nav" href="https://multitheftauto.com/hosters/">Hosting</a>\
	<a class="mta_nav" href="https://community.multitheftauto.com/index.php?p=servers">Servers</a>\
	<a class="mta_nav" href="https://multitheftauto.myspreadshop.net/all" rel="noopener" target="_blank">Merch</a>\
        <span id="onlinePlayers"></span>\
</div></div>';

var div = document.createElement('div');
div.innerHTML = topmenu.trim();
document.body.insertBefore(div.firstChild, document.body.firstChild);

var onlinePlayersEl = document.getElementById('onlinePlayers');
var retryTimeout = null;

function updateOnlinePlayers() {
  if (!onlinePlayersEl) return;

  fetch('https://multitheftauto.com/count/')
    .then(function (r) {
      if (!r.ok) throw new Error();
      return r.text();
    })
    .then(function (r) {
      if (!onlinePlayersEl) return;
      if (!r) throw new Error();

      var info = r.split(',', 2);
      if (!info || !info[0] || !info[1]) throw new Error();

      function updateStats() {
        onlinePlayersEl.innerText = new Intl.NumberFormat('en-US').format(info[0]) + ' players online on ' + new Intl.NumberFormat('en-US').format(info[1]) + ' public servers';
        $(onlinePlayersEl).stop(true).fadeIn(500);
      }

      if (!onlinePlayersEl.innerText) {
        $(onlinePlayersEl).hide();
        updateStats();
        return;
      }

      $(onlinePlayersEl).stop(true).fadeOut(500);
      setTimeout(updateStats, 500);
    })
    .catch(function () {
      if (retryTimeout) clearTimeout(retryTimeout);
      retryTimeout = setTimeout(updateOnlinePlayers, 10000);
    });
}
window.addEventListener('load', updateOnlinePlayers);
setInterval(updateOnlinePlayers, 300000);
