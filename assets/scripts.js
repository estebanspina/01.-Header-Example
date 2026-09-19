script_js = """(() => {
  const header = document.querySelector('[data-site-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobilePanel = document.querySelector('[data-mobile-panel]');
  const desktopSubmenuToggle = document.querySelector('.site-header__submenu-toggle');
  const desktopSubmenuItem = document.querySelector('.site-header__has-submenu');
  const mobileSubmenuToggle = document.querySelector('[data-mobile-submenu-toggle]');
  const mobileSubmenu = document.getElementById('mobile-sections-submenu');

  if (!header || !menuToggle || !mobilePanel) return;

  const setMobileMenu = (open) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobilePanel.hidden = !open;
    header.classList.toggle('is-menu-open', open);

    if (!open && mobileSubmenuToggle && mobileSubmenu) {
      mobileSubmenuToggle.setAttribute('aria-expanded', 'false');
      mobileSubmenu.hidden = true;
    }
  };

  menuToggle.addEventListener('click', () => {
    setMobileMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  if (desktopSubmenuToggle && desktopSubmenuItem) {
    desktopSubmenuToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const open = desktopSubmenuToggle.getAttribute('aria-expanded') !== 'true';
      desktopSubmenuToggle.setAttribute('aria-expanded', String(open));
      desktopSubmenuItem.classList.toggle('is-open', open);
    });
  }

  if (mobileSubmenuToggle && mobileSubmenu) {
    mobileSubmenuToggle.addEventListener('click', () => {
      const open = mobileSubmenuToggle.getAttribute('aria-expanded') !== 'true';
      mobileSubmenuToggle.setAttribute('aria-expanded', String(open));
      mobileSubmenu.hidden = !open;
    });
  }

  document.addEventListener('click', (event) => {
    if (
      desktopSubmenuItem &&
      desktopSubmenuToggle &&
      !desktopSubmenuItem.contains(event.target)
    ) {
      desktopSubmenuToggle.setAttribute('aria-expanded', 'false');
      desktopSubmenuItem.classList.remove('is-open');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    if (menuToggle.getAttribute('aria-expanded') === 'true') {
      setMobileMenu(false);
      menuToggle.focus();
    }

    if (desktopSubmenuToggle && desktopSubmenuItem) {
      desktopSubmenuToggle.setAttribute('aria-expanded', 'false');
      desktopSubmenuItem.classList.remove('is-open');
    }
  });

  const desktopMq = window.matchMedia('(min-width: 1025px)');
  desktopMq.addEventListener('change', (event) => {
    if (event.matches) setMobileMenu(false);
  });
})();
