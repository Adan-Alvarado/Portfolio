import { initCanvasScale } from './interactions/canvas';
import { initActiveNavigation } from './interactions/navigation';
import { initReveals } from './interactions/reveal';
import { initTimelineProgress } from './interactions/timeline';
import { initPageVisibility } from './interactions/visibility';

type Cleanup = () => void;

let cleanupCurrent: Cleanup | null = null;

export const initPortfolioInteractions = () => {
	cleanupCurrent?.();
	const cleanups = [
		initCanvasScale(),
		initActiveNavigation(),
		initReveals(),
		initTimelineProgress(),
		initPageVisibility(),
	];

	cleanupCurrent = () => {
		cleanups.forEach((cleanup) => cleanup());
		cleanupCurrent = null;
	};

	return cleanupCurrent;
};
