const responsiveViewport = window.matchMedia('(max-width: 1023px)');

export const initTechnologyStripSelection = () => {
	const setSelection = (strip: HTMLElement, technology: string, selected: boolean) => {
		strip.querySelectorAll<HTMLButtonElement>('[data-technology-item]').forEach((item) => {
			if (item.dataset.technology !== technology) return;
			item.classList.toggle('is-selected', selected);
			item.setAttribute('aria-pressed', String(selected));
		});
	};

	const clearSelection = (strip: HTMLElement) => {
		strip.querySelectorAll<HTMLButtonElement>('[data-technology-item]').forEach((item) => {
			item.classList.remove('is-selected');
			item.setAttribute('aria-pressed', 'false');
		});
	};

	const onClick = (event: MouseEvent) => {
		if (!responsiveViewport.matches) return;
		const target = event.target;
		if (!(target instanceof Element)) return;
		const item = target.closest<HTMLButtonElement>('[data-technology-item]');
		if (!item) return;
		const strip = item.closest<HTMLElement>('[data-technology-strip]');
		const technology = item.dataset.technology;
		if (!strip || !technology) return;

		const wasSelected = item.getAttribute('aria-pressed') === 'true';
		clearSelection(strip);
		if (wasSelected) {
			item.blur();
			return;
		}
		setSelection(strip, technology, true);
	};

	const clearSelectionOutsideResponsive = () => {
		if (responsiveViewport.matches) return;
		document.querySelectorAll<HTMLButtonElement>('[data-technology-item].is-selected').forEach((item) => {
			item.classList.remove('is-selected');
			item.setAttribute('aria-pressed', 'false');
		});
	};

	document.addEventListener('click', onClick);
	responsiveViewport.addEventListener('change', clearSelectionOutsideResponsive);

	return () => {
		document.removeEventListener('click', onClick);
		responsiveViewport.removeEventListener('change', clearSelectionOutsideResponsive);
	};
};
