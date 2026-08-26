document.addEventListener('DOMContentLoaded', function () {
    const headerPlaceholder = document.getElementById('header');
    const footerPlaceholder = document.getElementById('footer');

    if (!headerPlaceholder && !footerPlaceholder) {
        return;
    }

    const loadFragment = async (target, fileName) => {
        if (!target) {
            return;
        }

        const baseUrl = new URL('.', window.location.href);
        const response = await fetch(new URL(fileName, baseUrl));
        if (!response.ok) {
            throw new Error('Failed to load ' + fileName);
        }

        target.innerHTML = await response.text();
    };

    const loadIncludes = async () => {
        try {
            await loadFragment(headerPlaceholder, 'header.html');
            await loadFragment(footerPlaceholder, 'footer.html');

            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = document.querySelectorAll('#header a[href]');
            navLinks.forEach(function (link) {
                const href = link.getAttribute('href');
                if (!href || href === '#') {
                    return;
                }

                const normalizedHref = href.split('?')[0].split('#')[0];
                const normalizedPage = currentPage.split('?')[0].split('#')[0];
                if (normalizedHref === normalizedPage) {
                    link.classList.add('active');
                    if (link.closest('.dropdown-menu')) {
                        link.closest('.dropdown').querySelector('.dropdown-toggle').classList.add('active');
                    }
                }
            });

        } catch (error) {
            console.error(error);
        }
    };

    // ------------------------------------------------------------------
    // Universal gift tabs (Hampers / Bulk Orders / Art Studio)
    //
    // Single source of truth: each tab maps to a host page + a query key.
    // The host page renders that tab's content. When a tab is clicked we
    // first try to toggle the content in place (the existing Home behaviour).
    // If the content isn't present on the current page, we navigate to the
    // host page carrying the query key so the right tab is shown. This makes
    // the three buttons behave identically on every page via the one shared
    // header, with no page-specific hardcoding.
    // ------------------------------------------------------------------
    const GIFT_TABS = {
        hampersTab:   { target: 'index.html', key: 'hampers' },
        bulkTab:      { target: 'index.html', key: 'bulk' },
        artStudioTab: { target: 'index.html', key: 'art' },
    };

    const setActiveGiftTab = (tabId) => {
        Object.keys(GIFT_TABS).forEach((id) => {
            const tab = document.getElementById(id);
            if (!tab) return;
            if (id === tabId) {
                tab.classList.add('active');
                tab.classList.remove('inactive');
            } else {
                tab.classList.remove('active');
                tab.classList.add('inactive');
            }
        });
    };

    // Toggle the tab content on pages that host it (Home). Returns true when
    // the content was handled in place, false when it must be navigated to.
    const showTabContent = (tabId) => {
        const defaultContent = document.getElementById('default-content');
        const artStudioContent = document.getElementById('art-studio-content');

        if (!defaultContent || !artStudioContent) {
            return false;
        }

        if (tabId === 'artStudioTab') {
            defaultContent.classList.add('d-none');
            artStudioContent.classList.remove('d-none');
            artStudioContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            artStudioContent.classList.add('d-none');
            defaultContent.classList.remove('d-none');
        }
        return true;
    };

    const setupGiftTabs = () => {
        Object.entries(GIFT_TABS).forEach(([id, config]) => {
            const tab = document.getElementById(id);
            if (!tab) {
                return;
            }
            tab.addEventListener('click', (event) => {
                event.preventDefault();
                setActiveGiftTab(id);
                const handledInPlace = showTabContent(id);
                if (!handledInPlace) {
                    window.location.href = config.target + '?tab=' + config.key;
                }
            });
        });
    };

    // When arriving at a host page via a gift tab link (?tab=...), restore
    // the active pill and show that page's content.
    const applyQueryTab = () => {
        const params = new URLSearchParams(window.location.search);
        const tabKey = params.get('tab');
        if (!tabKey) {
            return;
        }
        const entry = Object.entries(GIFT_TABS).find(function (pair) {
            return pair[1].key === tabKey;
        });
        if (!entry) {
            return;
        }
        setActiveGiftTab(entry[0]);
        showTabContent(entry[0]);
    };

    const initIncludes = async () => {
        await loadIncludes();
        setupGiftTabs();
        applyQueryTab();
        document.dispatchEvent(new Event('includesLoaded'));
    };

    initIncludes();
});
