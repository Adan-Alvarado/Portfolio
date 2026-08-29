const REVEAL_DELAY_STEP = 55;

export const initReveals = () => {
	const body = document.body;
	const targets = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
	const sections = [...document.querySelectorAll<HTMLElement>('.portfolio-screen')];
	const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
	let revealObserver: IntersectionObserver | null = null;
	let resetObserver: IntersectionObserver | null = null;

	const configure = () => {
		revealObserver?.disconnect();
		resetObserver?.disconnect();
		revealObserver = null;
		resetObserver = null;

		if (motionPreference.matches) {
			body.classList.remove('motion-ready');
			targets.forEach((target) => target.classList.add('is-revealed'));
			return;
		}

		body.classList.add('motion-ready');
		targets.forEach((target) => {
			target.classList.remove('is-revealed');
			const order = Number(target.dataset.revealOrder ?? 0);
			target.style.setProperty('--reveal-delay', `${Math.max(0, order) * REVEAL_DELAY_STEP}ms`);
		});

		revealObserver = new IntersectionObserver(
			(entries) => entries.forEach((entry) => {
				if (entry.isIntersecting && entry.target instanceof HTMLElement) entry.target.classList.add('is-revealed');
			}),
			{ rootMargin: '-18% 0px -18% 0px', threshold: 0.1 },
		);

		resetObserver = new IntersectionObserver(
			(entries) => entries.forEach((entry) => {
				if (entry.intersectionRatio > 0 || !(entry.target instanceof HTMLElement)) return;
				entry.target.querySelectorAll<HTMLElement>('[data-reveal]').forEach((target) => {
					target.classList.remove('is-revealed');
				});
			}),
			{ rootMargin: '-1px 0px -1px 0px', threshold: [0, 0.001] },
		);

		targets.forEach((target) => revealObserver?.observe(target));
		sections.forEach((section) => resetObserver?.observe(section));
	};

	configure();
	motionPreference.addEventListener('change', configure);
	return () => {
		revealObserver?.disconnect();
		resetObserver?.disconnect();
		motionPreference.removeEventListener('change', configure);
		body.classList.remove('motion-ready');
	};
};
