const LOCALE_TRANSITION_KEY = 'portfolio:locale-transition';
const MAX_FONT_WAIT = 1200;
const PROGRESS_DURATION = 1200;
const COMPLETE_DELAY = 300;
const LOCALE_FADE_DURATION = 380;

export const initPageTransitionLoader = () => {
	const root = document.documentElement;
	const loader = document.querySelector<HTMLElement>('[data-page-loader]');
	if (!loader) return () => {};
	const shouldPlayOnEntry = root.classList.contains('page-loader-enabled');

	let completionTimer = 0;
	let navigationTimer = 0;
	let progressFrame = 0;
	let startedAt = performance.now();
	let hasFinished = false;
	let documentReady = !shouldPlayOnEntry;
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const counter = loader.querySelector<HTMLElement>('[data-page-loader-counter]');

	const setProgress = (value: number) => {
		const progress = Math.max(0, Math.min(100, Math.round(value)));
		loader.style.setProperty('--page-loader-progress', String(progress / 100));
		if (counter) counter.textContent = String(progress).padStart(3, '0');
	};

	const animateProgress = () => {
		const elapsed = performance.now() - startedAt;
		const progress = Math.min(100, (elapsed / PROGRESS_DURATION) * 100);
		setProgress(progress);
		if (progress < 100 || !documentReady) {
			progressFrame = window.requestAnimationFrame(animateProgress);
			return;
		}
		finish();
	};

	const startProgress = () => {
		if (progressFrame) window.cancelAnimationFrame(progressFrame);
		if (completionTimer) window.clearTimeout(completionTimer);
		hasFinished = false;
		startedAt = performance.now();
		setProgress(0);
		root.classList.remove('page-loader-running');
		window.requestAnimationFrame(() => root.classList.add('page-loader-running'));
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
		setProgress(100);
		completionTimer = window.setTimeout(() => {
			root.classList.add('page-loader-ready');
			root.classList.remove('page-loader-leaving');
			clearTransitionMark();
		}, COMPLETE_DELAY);
	};

	const waitForInitialPaint = () => {
		const fontsReady = document.fonts?.ready ?? Promise.resolve();
		const safetyTimeout = new Promise<void>((resolve) => window.setTimeout(resolve, MAX_FONT_WAIT));
		void Promise.race([fontsReady, safetyTimeout]).then(() => {
			documentReady = true;
			if (reducedMotion) finish();
		});
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
		if (destination.pathname === window.location.pathname || navigationTimer) return;
		event.preventDefault();

		try {
			sessionStorage.setItem(LOCALE_TRANSITION_KEY, '1');
		} catch {
			// Storage is optional; the departure overlay does not depend on it.
		}

		root.classList.add('page-loader-enabled');
		root.classList.add('page-loader-leaving');
		window.requestAnimationFrame(() => {
			root.classList.remove('page-loader-ready');
			startProgress();
		});
		navigationTimer = window.setTimeout(() => window.location.assign(destination.href), reducedMotion ? 0 : LOCALE_FADE_DURATION);
	};

	const onPageShow = (event: PageTransitionEvent) => {
		if (!event.persisted) return;
		root.classList.add('page-loader-ready');
		root.classList.remove('page-loader-leaving');
		clearTransitionMark();
	};

	const localeLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-locale-path]')];
	localeLinks.forEach((link) => link.addEventListener('click', onLocaleClick));
	window.addEventListener('pageshow', onPageShow);
	if (shouldPlayOnEntry) {
		startProgress();
		waitForInitialPaint();
	} else {
		root.classList.add('page-loader-ready');
	}

	return () => {
		if (completionTimer) window.clearTimeout(completionTimer);
		if (navigationTimer) window.clearTimeout(navigationTimer);
		if (progressFrame) window.cancelAnimationFrame(progressFrame);
		localeLinks.forEach((link) => link.removeEventListener('click', onLocaleClick));
		window.removeEventListener('pageshow', onPageShow);
	};
};
