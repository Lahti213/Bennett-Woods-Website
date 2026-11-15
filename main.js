// Bennett Woods — shared behaviour for index.html and map.html
(function () {
    document.documentElement.classList.add('js');

    // Mobile menu
    var toggle = document.getElementById('menuToggle');
    var menu = document.getElementById('navMenu');
    function setMenu(open) {
        toggle.setAttribute('aria-expanded', String(open));
        menu.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    }
    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            setMenu(toggle.getAttribute('aria-expanded') !== 'true');
        });
        menu.addEventListener('click', function (e) {
            if (e.target.closest('a')) setMenu(false);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') setMenu(false);
        });
        window.matchMedia('(min-width: 901px)').addEventListener('change', function (mq) {
            if (mq.matches) setMenu(false);
        });
    }

    // Nav shadow once the page scrolls
    var nav = document.querySelector('.site-nav');
    function onScroll() { if (nav) nav.classList.toggle('scrolled', window.scrollY > 8); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Reveal on scroll
    var items = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        items.forEach(function (el) { io.observe(el); });
    } else {
        items.forEach(function (el) { el.classList.add('in'); });
    }

    // Footer year
    document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

    // ---------- Content from content.js ----------
    var BW = window.BW || {};
    var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    function el(tag, attrs, children) {
        var node = document.createElement(tag);
        Object.keys(attrs || {}).forEach(function (k) {
            if (k === 'text') node.textContent = attrs[k];
            else if (k === 'class') node.className = attrs[k];
            else node.setAttribute(k, attrs[k]);
        });
        (children || []).forEach(function (c) { if (c) node.appendChild(c); });
        return node;
    }
    function parseDate(s) {
        var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
        return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
    }
    function today() { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
    function show(id) { var s = document.getElementById(id); if (s) s.hidden = false; }
    function dateBadge(d) {
        if (!d) return el('div', { class: 'news-date tba' }, [el('span', { class: 'm', text: 'Date' }), el('span', { class: 'd', text: 'TBA' })]);
        return el('time', { class: 'news-date', datetime: d.toISOString().slice(0, 10) }, [
            el('span', { class: 'm', text: MONTHS[d.getMonth()] }),
            el('span', { class: 'd', text: String(d.getDate()) }),
            el('span', { class: 'y', text: String(d.getFullYear()) })
        ]);
    }

    // News
    var newsList = document.getElementById('newsList');
    if (newsList && BW.news) {
        var cutoff = today(); cutoff.setDate(cutoff.getDate() - (BW.newsMaxAgeDays || 365));
        var news = BW.news.filter(function (n) { var d = parseDate(n.date); return d && d >= cutoff; })
            .sort(function (a, b) { return parseDate(b.date) - parseDate(a.date); });
        news.forEach(function (n) {
            newsList.appendChild(el('article', { class: 'news-item' }, [
                dateBadge(parseDate(n.date)),
                el('div', {}, [el('h3', { text: n.title }), el('p', { text: n.text }),
                    n.link && n.link.url ? el('a', { class: 'cal-link', href: n.link.url, target: '_blank', rel: 'noopener', text: n.link.label || 'Read more' }) : null])
            ]));
        });
        if (news.length) show('newsBlock');
    }

    // Events (+ .ics "Add to calendar")
    function icsFor(ev, d) {
        function pad(n) { return (n < 10 ? '0' : '') + n; }
        function esc(s) { return String(s || '').replace(/[\\;,]/g, function (c) { return '\\' + c; }).replace(/\n/g, '\\n'); }
        var ymd = d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate());
        var start = 'DTSTART;VALUE=DATE:' + ymd, end;
        var t = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec((ev.time || '').trim());
        if (t) {
            var h = (+t[1] % 12) + (/pm/i.test(t[3]) ? 12 : 0);
            start = 'DTSTART;TZID=America/New_York:' + ymd + 'T' + pad(h) + t[2] + '00';
            end = 'DTEND;TZID=America/New_York:' + ymd + 'T' + pad(Math.min(h + 2, 23)) + t[2] + '00';
        } else {
            var n = new Date(d); n.setDate(n.getDate() + 1);
            end = 'DTEND;VALUE=DATE:' + n.getFullYear() + pad(n.getMonth() + 1) + pad(n.getDate());
        }
        return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Bennett Woods//Events//EN', 'BEGIN:VEVENT',
            'UID:' + ymd + '-' + esc(ev.title).replace(/\W+/g, '') + '@bennettwoodssmyrna.com',
            'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z',
            start, end, 'SUMMARY:' + esc(ev.title), 'LOCATION:' + esc(ev.place || 'Bennett Woods, Smyrna GA'),
            'DESCRIPTION:' + esc(ev.text), 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    }
    var eventsList = document.getElementById('eventsList');
    if (eventsList && BW.events) {
        var now = today();
        var events = BW.events.filter(function (e) { var d = parseDate(e.date); return !d || d >= now; })
            .sort(function (a, b) {
                var da = parseDate(a.date), db = parseDate(b.date);
                if (!da) return db ? 1 : 0; if (!db) return -1; return da - db;
            });
        events.forEach(function (ev) {
            var d = parseDate(ev.date);
            var meta = [d ? null : 'Date to be announced', ev.time, ev.place].filter(Boolean).join(' · ');
            var body = el('div', {}, [el('h3', { text: ev.title }), meta ? el('p', { class: 'event-meta', text: meta }) : null, el('p', { text: ev.text })]);
            if (d) {
                var a = el('a', { class: 'cal-link', download: ev.title.replace(/\W+/g, '-') + '.ics', text: 'Add to calendar' });
                a.href = URL.createObjectURL(new Blob([icsFor(ev, d)], { type: 'text/calendar' }));
                body.appendChild(a);
            }
            eventsList.appendChild(el('article', { class: 'news-item' }, [dateBadge(d), body]));
        });
        if (events.length) show('eventsBlock');
    }
    var evBlock = document.getElementById('eventsBlock'), nwBlock = document.getElementById('newsBlock');
    if ((evBlock && !evBlock.hidden) || (nwBlock && !nwBlock.hidden)) show('happenings');

    // Gallery + lightbox
    var grid = document.getElementById('galleryGrid');
    if (grid && BW.photos && BW.photos.length) {
        var dlg = document.getElementById('lightbox');
        var current = 0;
        function open(i) {
            current = (i + BW.photos.length) % BW.photos.length;
            var p = BW.photos[current];
            dlg.querySelector('img').src = p.src;
            dlg.querySelector('img').alt = p.alt || '';
            dlg.querySelector('figcaption').textContent = [p.caption, p.credit ? 'Photo: ' + p.credit : ''].filter(Boolean).join(' · ');
            if (!dlg.open) dlg.showModal();
        }
        BW.photos.forEach(function (p, i) {
            var btn = el('button', { type: 'button', class: 'gallery-item', 'aria-label': 'View larger: ' + (p.caption || p.alt || 'photo') }, [
                el('img', { src: p.src, alt: p.alt || '', loading: 'lazy', decoding: 'async' }),
                p.caption ? el('span', { text: p.caption }) : null
            ]);
            btn.addEventListener('click', function () { open(i); });
            grid.appendChild(btn);
        });
        if (dlg) {
            dlg.querySelector('[data-close]').addEventListener('click', function () { dlg.close(); });
            dlg.querySelector('[data-prev]').addEventListener('click', function () { open(current - 1); });
            dlg.querySelector('[data-next]').addEventListener('click', function () { open(current + 1); });
            dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
            dlg.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowLeft') open(current - 1);
                if (e.key === 'ArrowRight') open(current + 1);
            });
        }
        show('gallery');
    }

    // Neighbor-recommended businesses
    var svc = document.getElementById('servicesList');
    if (svc && BW.services && BW.services.length) {
        var groups = {};
        BW.services.forEach(function (s) { (groups[s.category || 'Other'] = groups[s.category || 'Other'] || []).push(s); });
        Object.keys(groups).sort().forEach(function (cat) {
            var items = groups[cat].map(function (s) {
                var links = [];
                if (s.phone) links.push(el('a', { href: 'tel:' + s.phone.replace(/[^\d+]/g, ''), text: s.phone }));
                if (s.url) links.push(el('a', { href: s.url, target: '_blank', rel: 'noopener', text: 'Website' }));
                return el('li', {}, [el('b', { text: s.name }), s.note ? el('p', { text: s.note }) : null, links.length ? el('div', { class: 'svc-links' }, links) : null]);
            });
            svc.appendChild(el('div', { class: 'svc-group' }, [el('h3', { text: cat }), el('ul', {}, items)]));
        });
        show('services');
    }

    // Social links
    if (BW.social && BW.social.length) {
        document.querySelectorAll('[data-social]').forEach(function (list) {
            BW.social.forEach(function (s) {
                list.appendChild(el('li', {}, [el('a', { href: s.url, target: '_blank', rel: 'noopener', text: s.label })]));
            });
            var wrap = list.closest('[data-social-wrap]'); if (wrap) wrap.hidden = false;
        });
    }

    // Contact form → Formspree (endpoint is the form's action attribute).
    // If action is empty, the form hides and a fallback note shows, so messages never silently disappear.
    var form = document.getElementById('contactForm');
    var fallback = document.getElementById('contactFallback');
    if (form) {
        var endpoint = (form.getAttribute('action') || '').trim();
        if (!endpoint) {
            form.hidden = true;
            if (fallback) fallback.hidden = false;
        } else {
            var status = document.getElementById('formStatus');
            var btn = form.querySelector('button[type="submit"]');
            var subject = form.querySelector('input[name="_subject"]');
            var interest = form.querySelector('#interest');
            function showStatus(kind, text) {
                status.className = 'form-status ' + kind;
                status.textContent = text;
                status.hidden = false;
            }
            form.addEventListener('input', function (e) { e.target.removeAttribute('aria-invalid'); });
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                if (!form.reportValidity()) return;
                if (subject && interest && interest.value) subject.value = 'Bennett Woods website: ' + interest.value;
                status.hidden = true;
                btn.disabled = true; btn.textContent = 'Sending…';
                fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
                    .then(function (r) {
                        return r.json().catch(function () { return {}; }).then(function (data) {
                            if (r.ok) {
                                form.reset();
                                showStatus('ok', "Thanks! Your message is on its way, and a neighbor will get back to you soon.");
                                return;
                            }
                            // Formspree returns { errors: [{ field, message }] } for problems it can explain.
                            var errors = (data && data.errors) || [];
                            errors.forEach(function (err) {
                                var field = err.field && form.querySelector('[name="' + err.field + '"]');
                                if (field) field.setAttribute('aria-invalid', 'true');
                            });
                            var msg = errors.map(function (err) { return err.message; }).filter(Boolean).join(' ');
                            showStatus('err', msg ? 'Please check the form: ' + msg : 'Sorry, your message could not be sent. Please try again in a moment.');
                        });
                    })
                    .catch(function () {
                        showStatus('err', 'Sorry, your message could not be sent. Please check your connection and try again.');
                    })
                    .finally(function () {
                        btn.disabled = false; btn.textContent = 'Send message';
                    });
            });
        }
    }
})();
