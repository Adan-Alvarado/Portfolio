const clamp = (value: number, minimum: number, maximum: number) => Math.min(Math.max(value, minimum), maximum);

export const initTimelineProgress = () => {
	const timelines = [...document.querySelectorAll<HTMLElement>('[data-timeline]')].map((element) => ({
		element,
		entries: [...element.querySelectorAll<HTMLElement>('[data-timeline-entry]')],
		lastProgress: '',
		entryStates: [] as string[],
	}));
	const visibleTimelines = new Set<HTMLElement>();
	let frame = 0;

	const update = () => {
		frame = 0;
		const viewportHeight = window.innerHeight;
		timelines.forEach((timeline) => {
			if (!visibleTimelines.has(timeline.element)) return;

			const bounds = timeline.element.getBoundingClientRect();
			const progress = clamp((viewportHeight * .78 - bounds.top) / (bounds.height + viewportHeight * .28), 0, 1);
			const serializedProgress = progress.toFixed(3);
			if (serializedProgress !== timeline.lastProgress) {
				timeline.element.style.setProperty('--timeline-progress', serializedProgress);
				timeline.lastProgress = serializedProgress;
			}

			timeline.entries.forEach((entry, index) => {
				const threshold = timeline.entries.length <= 1 ? 0 : index / (timeline.entries.length - 1);
				const nextThreshold = timeline.entries.length <= 1 ? 1 : (index + 1) / timeline.entries.length;
				const complete = progress > nextThreshold;
				const current = progress >= threshold * .78 && progress <= nextThreshold + .18;
				const state = `${Number(complete)}${Number(current)}`;
				if (timeline.entryStates[index] === state) return;
				timeline.entryStates[index] = state;
				entry.classList.toggle('is-complete', complete);
				entry.classList.toggle('is-current', current);
			});
		});
	};

	const requestUpdate = () => {
		if (!frame) frame = requestAnimationFrame(update);
	};

	window.addEventListener('scroll', requestUpdate, { passive: true });
	window.addEventListener('resize', requestUpdate, { passive: true });

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (!(entry.target instanceof HTMLElement)) return;
			if (entry.isIntersecting) visibleTimelines.add(entry.target);
			else visibleTimelines.delete(entry.target);
		});
		requestUpdate();
	});
	timelines.forEach(({ element }) => observer.observe(element));

	return () => {
		if (frame) cancelAnimationFrame(frame);
		observer.disconnect();
		window.removeEventListener('scroll', requestUpdate);
		window.removeEventListener('resize', requestUpdate);
	};
};
