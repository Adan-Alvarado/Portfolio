const restartClass = (element: HTMLElement | null, className: string, duration: number) => {
	if (!element) return 0;
	element.classList.remove(className);
	void element.offsetWidth;
	element.classList.add(className);
	return window.setTimeout(() => element.classList.remove(className), duration);
};

export const initCharacterReactions = () => {
	const steam = document.querySelector<HTMLElement>('[data-capybara-steam]');
	const projectCharacter = document.querySelector<HTMLElement>('[data-project-character]');
	const contactCharacter = document.querySelector<HTMLElement>('[data-contact-character]');
	const timers = new Set<number>();

	const rememberTimer = (timer: number) => {
		if (timer) timers.add(timer);
	};

	const onAudioState = (event: Event) => {
		if ((event as CustomEvent<{ status?: string }>).detail?.status === 'playing') {
			rememberTimer(restartClass(steam, 'is-steaming', 1800));
		}
	};
	const onProjectOpen = () => rememberTimer(restartClass(projectCharacter, 'is-reacting', 520));
	const onContactReady = () => rememberTimer(restartClass(contactCharacter, 'is-reacting', 620));

	window.addEventListener('portfolio:audio-state', onAudioState);
	window.addEventListener('portfolio:project-open', onProjectOpen);
	window.addEventListener('portfolio:contact-ready', onContactReady);

	return () => {
		window.removeEventListener('portfolio:audio-state', onAudioState);
		window.removeEventListener('portfolio:project-open', onProjectOpen);
		window.removeEventListener('portfolio:contact-ready', onContactReady);
		timers.forEach((timer) => window.clearTimeout(timer));
	};
};
