export const initActiveNavigation = () => {
	const sections = [...document.querySelectorAll<HTMLElement>('.portfolio-screen')];
	const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
	const navigation = document.querySelector<HTMLElement>('[data-portfolio-nav]');
	const mobileMasthead = document.querySelector<HTMLElement>('[data-mobile-masthead]');
	const mobileCurrent = mobileMasthead?.querySelector<HTMLElement>('[data-mobile-current]') ?? null;
	const mobileToggle = mobileMasthead?.querySelector<HTMLButtonElement>('[data-mobile-nav-toggle]') ?? null;
	const mobilePanel = mobileMasthead?.querySelector<HTMLElement>('[data-mobile-nav-panel]') ?? null;
	const indicator = navigation?.querySelector<HTMLElement>('[data-nav-indicator]') ?? null;
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
	let activeId = '';
	let frame = 0;
	let menuOpen = false;

	const setMenuOpen = (open: boolean, restoreFocus = false) => {
		if (!mobileToggle || !mobilePanel) return;
		menuOpen = open;
		mobileToggle.setAttribute('aria-expanded', String(open));
		mobilePanel.hidden = !open;
		mobileMasthead?.classList.toggle('is-menu-open', open);
		if (restoreFocus) mobileToggle.focus();
	};

	const positionIndicator = (activeLink: HTMLAnchorElement, animate: boolean) => {
		if (!navigation || !indicator) return;

		const navBounds = navigation.getBoundingClientRect();
		const currentBounds = navigation.classList.contains('has-indicator')
			? indicator.getBoundingClientRect()
			: null;
		const linkBounds = activeLink.getBoundingClientRect();
		const navigationScale = navBounds.width / navigation.offsetWidth || 1;
		const targetX = (linkBounds.left - navBounds.left) / navigationScale;
		const targetWidth = linkBounds.width / navigationScale;

		indicator.getAnimations().forEach((animation) => animation.cancel());
		indicator.style.width = `${targetWidth}px`;
		indicator.style.transform = `translate3d(${targetX}px, 0, 0)`;
		navigation.classList.add('has-indicator');

		if (!animate || !currentBounds || reducedMotion.matches) return;

		const startX = (currentBounds.left - navBounds.left) / navigationScale;
		const startScale = currentBounds.width / navigationScale / targetWidth;
		indicator.animate(
			[
				{ transform: `translate3d(${startX}px, 0, 0) scaleX(${startScale})` },
				{ transform: `translate3d(${targetX}px, 0, 0) scaleX(1)` },
			],
			{
				duration: 320,
				easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
			},
		);
	};

	const setActiveSection = (id: string) => {
		const activeLink = navigation?.querySelector<HTMLAnchorElement>(`[data-nav-link="${id}"]`) ?? null;
		if (id === activeId) {
			if (activeLink) positionIndicator(activeLink, false);
			return;
		}
		activeId = id;
		document.body.dataset.activeSection = id;
		sections.forEach((section) => section.classList.toggle('is-visible', section.id === id));
		links.forEach((link) => {
			const active = link.dataset.navLink === id;
			link.classList.toggle('active', active);
			if (active) link.setAttribute('aria-current', 'page');
			else link.removeAttribute('aria-current');
		});
		const currentLabel = links.find((link) => link.dataset.mobileNavLink !== undefined && link.dataset.navLink === id)?.textContent?.trim();
		if (mobileCurrent && currentLabel) mobileCurrent.textContent = currentLabel;
		mobileMasthead?.querySelectorAll<HTMLAnchorElement>('[data-mobile-locale-path]').forEach((link) => {
			link.href = `${link.dataset.mobileLocalePath ?? '/'}#${id}`;
		});
		if (activeLink) positionIndicator(activeLink, true);
	};

	const handleToggle = () => setMenuOpen(!menuOpen);
	const handlePanelClick = (event: Event) => {
		const target = event.target as HTMLElement;
		if (target.closest('[data-mobile-nav-link]')) setMenuOpen(false);
	};
	const handleDocumentPointer = (event: PointerEvent) => {
		if (menuOpen && mobileMasthead && !mobileMasthead.contains(event.target as Node)) setMenuOpen(false);
	};
	const handleDocumentKey = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && menuOpen) setMenuOpen(false, true);
	};

	const update = () => {
		frame = 0;
		const viewportCenter = window.innerHeight / 2;
		const centeredSection = sections.find((section) => {
			const bounds = section.getBoundingClientRect();
			return bounds.top <= viewportCenter && bounds.bottom > viewportCenter;
		});

		if (centeredSection) setActiveSection(centeredSection.id);
	};

	const requestUpdate = () => {
		if (!frame) frame = requestAnimationFrame(update);
	};

	window.addEventListener('scroll', requestUpdate, { passive: true });
	window.addEventListener('resize', requestUpdate, { passive: true });
	window.addEventListener('hashchange', requestUpdate);
	mobileToggle?.addEventListener('click', handleToggle);
	mobilePanel?.addEventListener('click', handlePanelClick);
	document.addEventListener('pointerdown', handleDocumentPointer);
	document.addEventListener('keydown', handleDocumentKey);
	update();

	return () => {
		if (frame) cancelAnimationFrame(frame);
		window.removeEventListener('scroll', requestUpdate);
		window.removeEventListener('resize', requestUpdate);
		window.removeEventListener('hashchange', requestUpdate);
		mobileToggle?.removeEventListener('click', handleToggle);
		mobilePanel?.removeEventListener('click', handlePanelClick);
		document.removeEventListener('pointerdown', handleDocumentPointer);
		document.removeEventListener('keydown', handleDocumentKey);
		indicator?.getAnimations().forEach((animation) => animation.cancel());
		delete document.body.dataset.activeSection;
	};
};
