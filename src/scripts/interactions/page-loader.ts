const LOCALE_TRANSITION_KEY = 'portfolio:locale-transition';

export const initPageTransitionLoader = () => {
	const root = document.documentElement;
	const loader = document.querySelector<HTMLElement>('[data-page-loader]');
	if (!loader) return () => {};

	let fallbackTimer = 0;

	const clearTransitionMark = () => {
		try {
			sessionStorage.removeItem(LOCALE_TRANSITION_KEY);
		} catch {
			// Private browsing can deny storage; the visual transition still works.
		}
	};

	const finish = () => {
		if (fallbackTimer) {
			window.clearTimeout(fallbackTimer);
			fallbackTimer = 0;
		}
		root.classList.add('page-loader-ready');
		root.classList.remove('page-loader-leaving');
		clearTransitionMark();
	};

	const waitForInitialPaint = () => {
		const fontsReady = document.fonts?.ready ?? Promise.resolve();
		const safetyTimeout = new Promise<void>((resolve) => window.setTimeout(resolve, 1200));
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
		fallbackTimer = window.setTimeout(finish, 1600);
	};

	const onPageShow = (event: PageTransitionEvent) => {
		if (event.persisted) finish();
	};

	const localeLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-locale-path]')];
	localeLinks.forEach((link) => link.addEventListener('click', onLocaleClick));
	window.addEventListener('pageshow', onPageShow);
	waitForInitialPaint();

	return () => {
		if (fallbackTimer) window.clearTimeout(fallbackTimer);
		localeLinks.forEach((link) => link.removeEventListener('click', onLocaleClick));
		window.removeEventListener('pageshow', onPageShow);
	};
};
