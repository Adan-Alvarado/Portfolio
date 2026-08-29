const FOLLOW_EASING = 0.24;
const SETTLE_DISTANCE = 0.1;

export const initCursorFollower = () => {
	const dot = document.querySelector<HTMLElement>('[data-cursor-dot]');
	if (!dot) return () => undefined;

	const finePointer = window.matchMedia('(pointer: fine)');
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
	let frame = 0;
	let currentX = 0;
	let currentY = 0;
	let targetX = 0;
	let targetY = 0;
	let isVisible = false;

	const canFollow = () => finePointer.matches && !reducedMotion.matches;
	const render = () => {
		currentX += (targetX - currentX) * FOLLOW_EASING;
		currentY += (targetY - currentY) * FOLLOW_EASING;
		dot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

		if (Math.abs(targetX - currentX) > SETTLE_DISTANCE || Math.abs(targetY - currentY) > SETTLE_DISTANCE) {
			frame = requestAnimationFrame(render);
		} else {
			frame = 0;
		}
	};

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
		targetX = event.clientX;
		targetY = event.clientY;

		if (!isVisible) {
			currentX = targetX;
			currentY = targetY;
			show();
		}

		if (!frame) frame = requestAnimationFrame(render);
	};

	const syncAvailability = () => {
		dot.hidden = !canFollow();
		if (!canFollow()) hide();
	};

	syncAvailability();
	window.addEventListener('pointermove', handlePointerMove, { passive: true });
	document.documentElement.addEventListener('pointerleave', hide);
	window.addEventListener('blur', hide);
	finePointer.addEventListener('change', syncAvailability);
	reducedMotion.addEventListener('change', syncAvailability);

	return () => {
		if (frame) cancelAnimationFrame(frame);
		window.removeEventListener('pointermove', handlePointerMove);
		document.documentElement.removeEventListener('pointerleave', hide);
		window.removeEventListener('blur', hide);
		finePointer.removeEventListener('change', syncAvailability);
		reducedMotion.removeEventListener('change', syncAvailability);
		dot.classList.remove('is-visible');
		dot.hidden = true;
	};
};
