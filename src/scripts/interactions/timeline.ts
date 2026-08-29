const clamp = (value: number, minimum: number, maximum: number) => Math.min(Math.max(value, minimum), maximum);

export const initTimelineProgress = () => {
	const timelines = [...document.querySelectorAll<HTMLElement>('[data-timeline]')];
	let frame = 0;

	const update = () => {
		frame = 0;
		const viewportHeight = window.innerHeight;
		timelines.forEach((timeline) => {
			const bounds = timeline.getBoundingClientRect();
			const progress = clamp((viewportHeight * .78 - bounds.top) / (bounds.height + viewportHeight * .28), 0, 1);
			timeline.style.setProperty('--timeline-progress', progress.toFixed(3));
		});
	};

	const requestUpdate = () => {
		if (!frame) frame = requestAnimationFrame(update);
	};

	window.addEventListener('scroll', requestUpdate, { passive: true });
	window.addEventListener('resize', requestUpdate, { passive: true });
	update();

	return () => {
		if (frame) cancelAnimationFrame(frame);
		window.removeEventListener('scroll', requestUpdate);
		window.removeEventListener('resize', requestUpdate);
	};
};

