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

    // Contact form. Set data-endpoint on the form (e.g. a Formspree URL) to switch it on.
    // Until then, the form stays hidden and a fallback message shows, so visitors'
    // messages never silently disappear.
    var form = document.getElementById('contactForm');
    var fallback = document.getElementById('contactFallback');
    if (form) {
        var endpoint = (form.getAttribute('data-endpoint') || '').trim();
        if (!endpoint) {
            form.hidden = true;
            if (fallback) fallback.hidden = false;
        } else {
            var status = document.getElementById('formStatus');
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                var btn = form.querySelector('button[type="submit"]');
                btn.disabled = true; btn.textContent = 'Sending…';
                fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
                    .then(function (r) {
                        if (!r.ok) throw new Error('Request failed');
                        status.className = 'form-status ok';
                        status.textContent = 'Thanks! Your message is on its way. A neighbor will get back to you soon.';
                        form.reset();
                    })
                    .catch(function () {
                        status.className = 'form-status err';
                        status.textContent = 'Sorry, something went wrong sending your message. Please try again in a moment.';
                    })
                    .finally(function () {
                        status.hidden = false;
                        btn.disabled = false; btn.textContent = 'Send message';
                    });
            });
        }
    }
})();
