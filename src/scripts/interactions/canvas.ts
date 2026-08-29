export const initCanvasScale = () => {
	const root = document.documentElement;
	const update = () => {
		const responsive = window.innerWidth <= 1023;
		const scale = responsive ? 1 : Math.min(window.innerWidth / 1366, window.innerHeight / 768);
		root.style.setProperty('--canvas-scale', String(scale));
	};

	update();
	window.addEventListener('resize', update, { passive: true });
	return () => window.removeEventListener('resize', update);
};

