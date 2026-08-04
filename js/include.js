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

    const setActiveGiftTab = (tabId) => {
        const tabs = ['personalizedTab', 'corporateTab', 'artStudioTab'];
        tabs.forEach((id) => {
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

    const showTabContent = (tabId) => {
        const defaultContent = document.getElementById('default-content');
        const artStudioContent = document.getElementById('art-studio-content');

        if (!defaultContent || !artStudioContent) {
            return;
        }

        if (tabId === 'artStudioTab') {
            defaultContent.classList.add('d-none');
            artStudioContent.classList.remove('d-none');
            artStudioContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            artStudioContent.classList.add('d-none');
            defaultContent.classList.remove('d-none');
        }
    };

    const setupGiftTabs = () => {
        const tabs = ['personalizedTab', 'corporateTab', 'artStudioTab'];
        tabs.forEach((id) => {
            const tab = document.getElementById(id);
            if (!tab) {
                return;
            }
            tab.addEventListener('click', (event) => {
                event.preventDefault();
                setActiveGiftTab(id);
                showTabContent(id);
            });
        });
    };

    const initIncludes = async () => {
        await loadIncludes();
        setupGiftTabs();
        document.dispatchEvent(new Event('includesLoaded'));
    };

    initIncludes();
});
