import type { TransitionBeforePreparationEvent, TransitionBeforeSwapEvent } from 'astro:transitions/client';

const MAX_FONT_WAIT = 1200;
const PROGRESS_DURATION = 1200;
const COMPLETE_DELAY = 300;
const LOCALE_COVER_DURATION = 500;

export const initPageTransitionLoader = () => {
	const getRoot = () => document.documentElement;
	const loader = document.querySelector<HTMLElement>('[data-page-loader]');
	if (!loader) return () => {};
	const shouldPlayOnEntry = getRoot().classList.contains('page-loader-enabled');

	let completionTimer = 0;
	let progressFrame = 0;
	let startedAt = performance.now();
	let hasFinished = false;
	let documentReady = !shouldPlayOnEntry;
	let routeTransitionActive = false;
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
		getRoot().classList.remove('page-loader-running');
		window.requestAnimationFrame(() => getRoot().classList.add('page-loader-running'));
		if (reducedMotion) return;
		progressFrame = window.requestAnimationFrame(animateProgress);
	};

	const finish = () => {
		if (hasFinished) return;
		hasFinished = true;
		if (progressFrame) window.cancelAnimationFrame(progressFrame);
		setProgress(100);
		completionTimer = window.setTimeout(() => {
			const root = getRoot();
			root.classList.add('page-loader-ready');
			root.classList.remove('page-loader-entry');
			root.classList.remove('page-loader-locale-transition');
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

	const isLocaleRoute = (url: URL) => url.pathname === '/' || url.pathname === '/en/';

	const beginRouteTransition = () => {
		if (routeTransitionActive) return;
		routeTransitionActive = true;
		documentReady = false;
		const root = getRoot();
		root.classList.add('page-loader-enabled', 'page-loader-locale-transition');
		root.classList.remove('page-loader-ready');
		startProgress();
	};

	const cancelRouteTransition = () => {
		if (!routeTransitionActive) return;
		routeTransitionActive = false;
		documentReady = true;
		finish();
	};

	const onBeforePreparation = (event: Event) => {
		const transition = event as TransitionBeforePreparationEvent;
		if (!isLocaleRoute(transition.from) || !isLocaleRoute(transition.to) || transition.from.pathname === transition.to.pathname) return;
		beginRouteTransition();
		// Fetch immediately, but keep Astro from swapping a fast/cached route
		// before the veil has had time to fully cover the outgoing view.
		const prepareDestination = transition.loader;
		const coverReady = new Promise<void>((resolve) => {
			window.setTimeout(resolve, reducedMotion ? 120 : LOCALE_COVER_DURATION);
		});
		transition.loader = async () => {
			await Promise.all([prepareDestination(), coverReady]);
		};
		transition.signal.addEventListener('abort', cancelRouteTransition, { once: true });
	};

	const onLocaleLinkClick = (event: MouseEvent) => {
		if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
		const target = event.target;
		if (!(target instanceof Element)) return;
		const link = target.closest<HTMLAnchorElement>('[data-locale-path]');
		if (!link || link.target === '_blank') return;
		const destination = new URL(link.href, window.location.href);
		const current = new URL(window.location.href);
		if (!isLocaleRoute(current) || !isLocaleRoute(destination) || current.pathname === destination.pathname) return;
		beginRouteTransition();
	};

	const onBeforeSwap = (event: Event) => {
		if (!routeTransitionActive) return;
		const transition = event as TransitionBeforeSwapEvent;
		transition.newDocument.documentElement.classList.add('page-loader-enabled', 'page-loader-locale-transition', 'page-loader-running');
		transition.newDocument.documentElement.classList.remove('page-loader-ready');
	};

	const onPageLoad = () => {
		if (!routeTransitionActive) return;
		routeTransitionActive = false;
		documentReady = true;
		if (reducedMotion) finish();
	};

	const onPageShow = (event: PageTransitionEvent) => {
		if (!event.persisted) return;
		const root = getRoot();
		root.classList.add('page-loader-ready');
		root.classList.remove('page-loader-entry');
		root.classList.remove('page-loader-locale-transition');
	};

	document.addEventListener('astro:before-preparation', onBeforePreparation);
	document.addEventListener('astro:before-swap', onBeforeSwap);
	document.addEventListener('astro:page-load', onPageLoad);
	document.addEventListener('click', onLocaleLinkClick, true);
	window.addEventListener('pageshow', onPageShow);
	if (shouldPlayOnEntry) {
		startProgress();
		waitForInitialPaint();
	} else {
		getRoot().classList.add('page-loader-ready');
	}

	return () => {
		if (completionTimer) window.clearTimeout(completionTimer);
		if (progressFrame) window.cancelAnimationFrame(progressFrame);
		document.removeEventListener('astro:before-preparation', onBeforePreparation);
		document.removeEventListener('astro:before-swap', onBeforeSwap);
		document.removeEventListener('astro:page-load', onPageLoad);
		document.removeEventListener('click', onLocaleLinkClick, true);
		window.removeEventListener('pageshow', onPageShow);
	};
};
