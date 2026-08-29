const REVEAL_DELAY_STEP = 55;

export const initReveals = () => {
	const body = document.body;
	const targets = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
	const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
	let observer: IntersectionObserver | null = null;

	const configure = () => {
		observer?.disconnect();
		observer = null;

		if (motionPreference.matches) {
			body.classList.remove('motion-ready');
			targets.forEach((target) => target.classList.add('is-revealed'));
			return;
		}

		body.classList.add('motion-ready');
		targets.forEach((target) => {
			const order = Number(target.dataset.revealOrder ?? 0);
			target.style.setProperty('--reveal-delay', `${Math.max(0, order) * REVEAL_DELAY_STEP}ms`);
		});

		observer = new IntersectionObserver(
			(entries) => entries.forEach((entry) => {
				if (entry.target instanceof HTMLElement) {
					entry.target.classList.toggle('is-revealed', entry.isIntersecting);
				}
			}),
			{ rootMargin: '-2% 0px -2% 0px', threshold: 0.08 },
		);
		targets.forEach((target) => observer?.observe(target));
	};

	configure();
	motionPreference.addEventListener('change', configure);
	return () => {
		observer?.disconnect();
		motionPreference.removeEventListener('change', configure);
		body.classList.remove('motion-ready');
	};
};
