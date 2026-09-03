export const initActiveNavigation = () => {
	const sections = [...document.querySelectorAll<HTMLElement>('.portfolio-screen')];
	const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
	const navigation = document.querySelector<HTMLElement>('[data-portfolio-nav]');
	const indicator = navigation?.querySelector<HTMLElement>('[data-nav-indicator]') ?? null;
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
	let activeId = '';
	let scrollFrame = 0;
	let resizeFrame = 0;

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
		if (id === activeId) return;

		const activeLink = navigation?.querySelector<HTMLAnchorElement>(`[data-nav-link="${id}"]`) ?? null;
		activeId = id;
		document.body.dataset.activeSection = id;
		sections.forEach((section) => section.classList.toggle('is-visible', section.id === id));
		links.forEach((link) => {
			const active = link.dataset.navLink === id;
			link.classList.toggle('active', active);
			if (active) link.setAttribute('aria-current', 'page');
			else link.removeAttribute('aria-current');
		});
		document.querySelectorAll<HTMLAnchorElement>('[data-locale-path]').forEach((link) => {
			link.href = `${link.dataset.localePath ?? '/'}#${id}`;
		});
		if (activeLink) positionIndicator(activeLink, true);
	};

	const update = () => {
		if (window.scrollY <= 8) {
			setActiveSection(sections[0]?.id ?? 'inicio');
			return;
		}

		const documentBottom = document.documentElement.scrollHeight - window.innerHeight;
		if (window.scrollY >= documentBottom - 8) {
			setActiveSection(sections.at(-1)?.id ?? 'contacto');
			return;
		}

		const activationLine = window.innerHeight * 0.38;
		let nearestSection: HTMLElement | null = null;
		let nearestDistance = Number.POSITIVE_INFINITY;
		for (const section of sections) {
			const bounds = section.getBoundingClientRect();
			if (bounds.top <= activationLine && bounds.bottom > activationLine) {
				setActiveSection(section.id);
				return;
			}

			const distance = Math.abs(bounds.top - activationLine);
			if (distance < nearestDistance) {
				nearestDistance = distance;
				nearestSection = section;
			}
		}

		if (nearestSection) setActiveSection(nearestSection.id);
	};

	const requestScrollUpdate = () => {
		if (!scrollFrame) {
			scrollFrame = requestAnimationFrame(() => {
				scrollFrame = 0;
				update();
			});
		}
	};

	const syncLayout = () => {
		resizeFrame = 0;
		if (scrollFrame) {
			cancelAnimationFrame(scrollFrame);
			scrollFrame = 0;
		}
		update();
		const activeLink = navigation?.querySelector<HTMLAnchorElement>(`[data-nav-link="${activeId}"]`) ?? null;
		if (activeLink) positionIndicator(activeLink, false);
	};

	const requestLayoutSync = () => {
		if (!resizeFrame) resizeFrame = requestAnimationFrame(syncLayout);
	};

	window.addEventListener('scroll', requestScrollUpdate, { passive: true });
	window.addEventListener('resize', requestLayoutSync, { passive: true });
	window.addEventListener('hashchange', requestScrollUpdate);
	update();

	return () => {
		if (scrollFrame) cancelAnimationFrame(scrollFrame);
		if (resizeFrame) cancelAnimationFrame(resizeFrame);
		window.removeEventListener('scroll', requestScrollUpdate);
		window.removeEventListener('resize', requestLayoutSync);
		window.removeEventListener('hashchange', requestScrollUpdate);
		indicator?.getAnimations().forEach((animation) => animation.cancel());
		delete document.body.dataset.activeSection;
	};
};
