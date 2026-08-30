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
			const entries = [...timeline.querySelectorAll<HTMLElement>('[data-timeline-entry]')];
			entries.forEach((entry, index) => {
				const threshold = entries.length <= 1 ? 0 : index / (entries.length - 1);
				const nextThreshold = entries.length <= 1 ? 1 : (index + 1) / entries.length;
				entry.classList.toggle('is-complete', progress > nextThreshold);
				entry.classList.toggle('is-current', progress >= threshold * .78 && progress <= nextThreshold + .18);
			});
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
