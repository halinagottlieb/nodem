// Small behaviours for the static copy of the repository.
(function () {
  // Tabs inside an object or author page (replaces the original activateTab()).
  window.activateTab = function (n) {
    var heads = document.querySelectorAll('.tabHeader'), i;
    for (i = 0; i < heads.length; i++) heads[i].classList.remove('tabHeaderActive');
    var h = document.getElementById('header_tab_' + n); if (h) h.classList.add('tabHeaderActive');
    var contents = document.querySelectorAll('.tabContent');
    for (i = 0; i < contents.length; i++) contents[i].classList.remove('tabContentActive');
    var c = document.getElementById('tab_' + n); if (c) c.classList.add('tabContentActive');
  };
  // Tabs: only the first is open by default; make the tab headers clickable.
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('.tabHeader');
    if (t && t.id && t.id.indexOf('header_tab_') === 0) window.activateTab(t.id.substring('header_tab_'.length));
  });

  // Search page: ?q=... filters data/search.json (title, people, keywords, conference, year, genre).
  var path = location.pathname;
  if (/search\.html$/.test(path)) {
    var q = new URLSearchParams(location.search).get('q') || '';
    var field = document.getElementById('searchField');
    if (field) field.value = q;
    var root = path.replace(/search\.html$/, '');
    var status = document.getElementById('search-status');
    var box = document.getElementById('search-results');
    fetch(root + 'data/search.json').then(function (r) { return r.json(); }).then(function (items) {
      var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
      var hits = items.filter(function (o) {
        var hay = [o.title, o.authors.join(' '), o.year, o.genre, o.conference, o.keywords.join(' ')].join(' ').toLowerCase();
        return terms.every(function (t) { return hay.indexOf(t) !== -1; });
      });
      if (!terms.length) { status.textContent = 'Type something to search.'; return; }
      status.textContent = hits.length + ' result(s) for "' + q + '"';
      hits.sort(function (a, b) { return (b.year || '').localeCompare(a.year || '') || a.title.localeCompare(b.title); });
      box.innerHTML = '';
      var block = document.createElement('div'); block.className = 'yearBlock';
      hits.forEach(function (o) {
        var el = document.createElement('div'); el.className = 'element';
        el.onclick = function () { location.href = root + 'objects/' + o.id + '.html'; };
        el.innerHTML = '<div class="photo" style="background-image:url(\'' + root + 'photoAuthor/avatar.png\');"></div>' +
          '<div class="desc"><div class="text" style="font-weight:bold"></div><div class="text"></div><div class="text"></div><div class="text"></div><div class="text"></div></div>';
        var t = el.querySelectorAll('.text');
        t[0].textContent = o.title; t[1].textContent = o.authors.join(', '); t[2].textContent = o.year;
        t[3].textContent = o.genre; t[4].textContent = o.conference;
        block.appendChild(el);
      });
      box.appendChild(block);
    });
  }
})();
