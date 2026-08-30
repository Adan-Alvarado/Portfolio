import { initCanvasScale } from './interactions/canvas';
import { initCursorFollower } from './interactions/cursor';
import { initActiveNavigation } from './interactions/navigation';
import { initReveals } from './interactions/reveal';
import { initTimelineProgress } from './interactions/timeline';
import { initPageVisibility } from './interactions/visibility';
import { initCharacterReactions } from './interactions/reactions';

type Cleanup = () => void;

let cleanupCurrent: Cleanup | null = null;

export const initPortfolioInteractions = () => {
	cleanupCurrent?.();
	const cleanups = [
		initCanvasScale(),
		initCursorFollower(),
		initActiveNavigation(),
		initReveals(),
		initTimelineProgress(),
		initPageVisibility(),
		initCharacterReactions(),
	];

	cleanupCurrent = () => {
		cleanups.forEach((cleanup) => cleanup());
		cleanupCurrent = null;
	};

	return cleanupCurrent;
};
