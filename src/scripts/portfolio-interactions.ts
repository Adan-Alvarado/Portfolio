const clamp = (value: number, minimum: number, maximum: number) => Math.min(Math.max(value, minimum), maximum);

export const initPortfolioInteractions = () => {
	const root = document.documentElement;
	const sections = [...document.querySelectorAll<HTMLElement>('.portfolio-screen')];
	const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

	const updateCanvasScale = () => {
		const isResponsiveLayout = window.innerWidth <= 1023;
		const scale = isResponsiveLayout ? 1 : Math.min(window.innerWidth / 1366, window.innerHeight / 768);
		const canvasWidth = isResponsiveLayout ? window.innerWidth : window.innerWidth / scale;
		const canvasExtra = Math.max(0, canvasWidth - 1366);
		root.style.setProperty('--canvas-scale', String(scale));
		root.style.setProperty('--canvas-width', `${canvasWidth}px`);
		root.style.setProperty('--canvas-extra', `${canvasExtra}px`);
		root.style.setProperty('--canvas-extra-half', `${canvasExtra / 2}px`);
	};

	const setActiveSection = (id: string) => {
		sections.forEach((section) => section.classList.toggle('is-visible', section.id === id));
		navLinks.forEach((link) => {
			const active = link.dataset.navLink === id;
			link.classList.toggle('active', active);
			if (active) link.setAttribute('aria-current', 'page');
			else link.removeAttribute('aria-current');
		});
	};

	updateCanvasScale();
	window.addEventListener('resize', updateCanvasScale, { passive: true });

	const sectionObserver = new IntersectionObserver(
		(entries) => {
			const current = entries.find((entry) => entry.isIntersecting);
			if (current?.target instanceof HTMLElement) setActiveSection(current.target.id);
		},
		{ rootMargin: '-45% 0px -45% 0px', threshold: 0 },
	);
	sections.forEach((section) => sectionObserver.observe(section));
	setActiveSection(sections.find((section) => section.id === location.hash.slice(1))?.id || 'inicio');
	window.addEventListener('hashchange', () => {
		const target = sections.find((section) => section.id === location.hash.slice(1));
		if (target) setActiveSection(target.id);
	});

	if (!prefersReducedMotion.matches) {
		document.body.classList.add('motion-ready');
		const revealObserver = new IntersectionObserver(
			(entries) => entries.forEach((entry) => {
				if (entry.target instanceof HTMLElement) entry.target.classList.toggle('is-revealed', entry.isIntersecting);
			}),
			{ rootMargin: '0px 0px -2% 0px', threshold: 0.08 },
		);
		document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((target) => revealObserver.observe(target));

		const timelines = [...document.querySelectorAll<HTMLElement>('[data-timeline]')];
		let scrollFrame = 0;
		const updateTimelineProgress = () => {
			scrollFrame = 0;
			const viewportHeight = window.innerHeight;
			timelines.forEach((timeline) => {
				const bounds = timeline.getBoundingClientRect();
				const progress = clamp((viewportHeight * .78 - bounds.top) / (bounds.height + viewportHeight * .28), 0, 1);
				timeline.style.setProperty('--timeline-progress', progress.toFixed(3));
			});
		};
		const requestTimelineUpdate = () => {
			if (!scrollFrame) scrollFrame = requestAnimationFrame(updateTimelineProgress);
		};
		window.addEventListener('scroll', requestTimelineUpdate, { passive: true });
		window.addEventListener('resize', requestTimelineUpdate, { passive: true });
		updateTimelineProgress();
	}

	document.addEventListener('visibilitychange', () => document.body.classList.toggle('page-hidden', document.hidden));
};
