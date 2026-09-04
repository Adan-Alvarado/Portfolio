const LOCALE_TRANSITION_KEY = 'portfolio:locale-transition';
const MAX_FONT_WAIT = 1200;
const MIN_VISIBLE_TIME = 900;
const COMPLETE_DELAY = 180;

export const initPageTransitionLoader = () => {
	const root = document.documentElement;
	const loader = document.querySelector<HTMLElement>('[data-page-loader]');
	if (!loader) return () => {};

	let fallbackTimer = 0;
	let completionTimer = 0;
	let progressFrame = 0;
	let startedAt = performance.now();
	let hasFinished = false;
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const counter = loader.querySelector<HTMLElement>('[data-page-loader-counter]');

	const setProgress = (value: number) => {
		const progress = Math.max(0, Math.min(100, Math.round(value)));
		loader.style.setProperty('--page-loader-progress', String(progress / 100));
		if (counter) counter.textContent = String(progress).padStart(3, '0');
	};

	const animateProgress = () => {
		const elapsed = performance.now() - startedAt;
		setProgress(Math.min(88, elapsed * 0.11));
		if (!hasFinished) progressFrame = window.requestAnimationFrame(animateProgress);
	};

	const startProgress = () => {
		if (progressFrame) window.cancelAnimationFrame(progressFrame);
		if (completionTimer) window.clearTimeout(completionTimer);
		hasFinished = false;
		startedAt = performance.now();
		setProgress(0);
		if (reducedMotion) return;
		progressFrame = window.requestAnimationFrame(animateProgress);
	};

	const clearTransitionMark = () => {
		try {
			sessionStorage.removeItem(LOCALE_TRANSITION_KEY);
		} catch {
			// Private browsing can deny storage; the visual transition still works.
		}
	};

	const finish = () => {
		if (hasFinished) return;
		hasFinished = true;
		if (progressFrame) window.cancelAnimationFrame(progressFrame);
		if (fallbackTimer) {
			window.clearTimeout(fallbackTimer);
			fallbackTimer = 0;
		}
		const remaining = reducedMotion ? 0 : Math.max(0, MIN_VISIBLE_TIME - (performance.now() - startedAt));
		completionTimer = window.setTimeout(() => {
			setProgress(100);
			completionTimer = window.setTimeout(() => {
				root.classList.add('page-loader-ready');
				root.classList.remove('page-loader-leaving');
				clearTransitionMark();
			}, COMPLETE_DELAY);
		}, remaining);
	};

	const waitForInitialPaint = () => {
		const fontsReady = document.fonts?.ready ?? Promise.resolve();
		const safetyTimeout = new Promise<void>((resolve) => window.setTimeout(resolve, MAX_FONT_WAIT));
		void Promise.race([fontsReady, safetyTimeout]).then(() => window.requestAnimationFrame(finish));
	};

	const onLocaleClick = (event: MouseEvent) => {
		const link = event.currentTarget as HTMLAnchorElement;
		if (
			event.defaultPrevented ||
			event.button !== 0 ||
			event.metaKey ||
			event.ctrlKey ||
			event.shiftKey ||
			event.altKey ||
			link.getAttribute('aria-current') === 'page'
		) return;

		const destination = new URL(link.href, window.location.href);
		if (destination.pathname === window.location.pathname) return;

		try {
			sessionStorage.setItem(LOCALE_TRANSITION_KEY, '1');
		} catch {
			// Storage is optional; the departure overlay does not depend on it.
		}

		root.classList.remove('page-loader-ready');
		root.classList.add('page-loader-leaving');
		startProgress();
		fallbackTimer = window.setTimeout(finish, 1600);
	};

	const onPageShow = (event: PageTransitionEvent) => {
		if (event.persisted) finish();
	};

	const localeLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-locale-path]')];
	localeLinks.forEach((link) => link.addEventListener('click', onLocaleClick));
	window.addEventListener('pageshow', onPageShow);
	startProgress();
	waitForInitialPaint();

	return () => {
		if (fallbackTimer) window.clearTimeout(fallbackTimer);
		if (completionTimer) window.clearTimeout(completionTimer);
		if (progressFrame) window.cancelAnimationFrame(progressFrame);
		localeLinks.forEach((link) => link.removeEventListener('click', onLocaleClick));
		window.removeEventListener('pageshow', onPageShow);
	};
};
