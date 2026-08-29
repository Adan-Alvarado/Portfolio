export const initActiveNavigation = () => {
	const sections = [...document.querySelectorAll<HTMLElement>('.portfolio-screen')];
	const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
	let activeId = '';
	let frame = 0;

	const setActiveSection = (id: string) => {
		if (id === activeId) return;
		activeId = id;
		sections.forEach((section) => section.classList.toggle('is-visible', section.id === id));
		links.forEach((link) => {
			const active = link.dataset.navLink === id;
			link.classList.toggle('active', active);
			if (active) link.setAttribute('aria-current', 'page');
			else link.removeAttribute('aria-current');
		});
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
	update();

	return () => {
		if (frame) cancelAnimationFrame(frame);
		window.removeEventListener('scroll', requestUpdate);
		window.removeEventListener('resize', requestUpdate);
		window.removeEventListener('hashchange', requestUpdate);
	};
};
