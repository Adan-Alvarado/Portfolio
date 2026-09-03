export const initCursorFollower = () => {
	const dot = document.querySelector<HTMLElement>('[data-cursor-dot]');
	if (!dot) return () => undefined;

	const finePointer = window.matchMedia('(pointer: fine)');
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
	let isVisible = false;

	const canFollow = () => finePointer.matches && !reducedMotion.matches;

	const show = () => {
		if (!isVisible) {
			isVisible = true;
			dot.classList.add('is-visible');
		}
	};

	const hide = () => {
		isVisible = false;
		dot.classList.remove('is-visible');
	};

	const handlePointerMove = (event: PointerEvent) => {
		if (!canFollow() || (event.pointerType && event.pointerType !== 'mouse')) return;
		dot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
		show();
	};

	const handlePointerOver = (event: PointerEvent) => {
		const target = event.target instanceof Element ? event.target.closest('a, button, [tabindex]:not([tabindex="-1"])') : null;
		dot.classList.toggle('is-interactive', Boolean(target));
	};

	const handlePointerOut = (event: PointerEvent) => {
		const related = event.relatedTarget instanceof Element ? event.relatedTarget.closest('a, button, [tabindex]:not([tabindex="-1"])') : null;
		if (!related) dot.classList.remove('is-interactive');
	};

	const syncAvailability = () => {
		dot.hidden = !canFollow();
		if (!canFollow()) hide();
	};

	syncAvailability();
	window.addEventListener('pointermove', handlePointerMove, { passive: true });
	document.addEventListener('pointerover', handlePointerOver, { passive: true });
	document.addEventListener('pointerout', handlePointerOut, { passive: true });
	document.documentElement.addEventListener('pointerleave', hide);
	window.addEventListener('blur', hide);
	finePointer.addEventListener('change', syncAvailability);
	reducedMotion.addEventListener('change', syncAvailability);

	return () => {
		window.removeEventListener('pointermove', handlePointerMove);
		document.removeEventListener('pointerover', handlePointerOver);
		document.removeEventListener('pointerout', handlePointerOut);
		document.documentElement.removeEventListener('pointerleave', hide);
		window.removeEventListener('blur', hide);
		finePointer.removeEventListener('change', syncAvailability);
		reducedMotion.removeEventListener('change', syncAvailability);
		dot.classList.remove('is-visible');
		dot.classList.remove('is-interactive');
		dot.hidden = true;
	};
};
