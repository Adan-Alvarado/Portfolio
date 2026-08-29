export const initPageVisibility = () => {
	const update = () => document.body.classList.toggle('page-hidden', document.hidden);
	update();
	document.addEventListener('visibilitychange', update);
	return () => document.removeEventListener('visibilitychange', update);
};

