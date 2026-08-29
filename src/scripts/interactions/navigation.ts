export const initActiveNavigation = () => {
	const sections = [...document.querySelectorAll<HTMLElement>('.portfolio-screen')];
	const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];

	const setActiveSection = (id: string) => {
		sections.forEach((section) => section.classList.toggle('is-visible', section.id === id));
		links.forEach((link) => {
			const active = link.dataset.navLink === id;
			link.classList.toggle('active', active);
			if (active) link.setAttribute('aria-current', 'page');
			else link.removeAttribute('aria-current');
		});
	};

	const observer = new IntersectionObserver(
		(entries) => {
			const visible = entries
				.filter((entry) => entry.isIntersecting)
				.sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
			if (visible?.target instanceof HTMLElement) setActiveSection(visible.target.id);
		},
		{ rootMargin: '-44% 0px -44% 0px', threshold: [0, 0.01] },
	);

	sections.forEach((section) => observer.observe(section));
	setActiveSection(sections.find((section) => section.id === location.hash.slice(1))?.id ?? 'inicio');

	const handleHashChange = () => {
		const target = sections.find((section) => section.id === location.hash.slice(1));
		if (target) setActiveSection(target.id);
	};
	window.addEventListener('hashchange', handleHashChange);

	return () => {
		observer.disconnect();
		window.removeEventListener('hashchange', handleHashChange);
	};
};

