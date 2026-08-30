export interface TrackMetadata {
	id: string;
	title: string;
	artist: string;
	src: string;
	sourceUrl: string;
	licenseUrl: string;
	volume: number;
}

export const ambientTrack: TrackMetadata = {
	id: 'sleepy-cat',
	title: 'Sleepy Cat',
	artist: 'Alejandro Magaña (A. M.)',
	src: '/audio/sleepy-cat.mp3',
	sourceUrl: 'https://mixkit.co/free-stock-music/lo-fi-beats/',
	licenseUrl: 'https://mixkit.co/license/#musicFree',
	volume: 0.12,
};
