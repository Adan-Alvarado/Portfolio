import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import type { TrackMetadata } from '../data/audio';
import type { Locale, LocalizedPortfolioContent } from '../i18n/content';
import './AmbientDock.css';

export type AudioStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

interface AmbientDockProps {
	locale: Locale;
	copy: LocalizedPortfolioContent['dock'];
	track: TrackMetadata;
}

const FADE_DURATION = 500;
const ROUTE_AUDIO_SNAPSHOT = 'portfolio-route-audio';

export default function AmbientDock({ locale, copy, track }: AmbientDockProps) {
	const dockRef = useRef<HTMLElement>(null);
	const fadeFrameRef = useRef<number | null>(null);
	const wantsPlaybackRef = useRef(false);
	const [status, setStatus] = useState<AudioStatus>('paused');
	const [languageExpanded, setLanguageExpanded] = useState(false);
	const getAudio = () => document.querySelector<HTMLAudioElement>('#portfolio-ambient-audio');

	const announce = useCallback((nextStatus: AudioStatus) => {
		setStatus(nextStatus);
		window.dispatchEvent(new CustomEvent('portfolio:audio-state', { detail: { status: nextStatus } }));
	}, []);

	const cancelFade = useCallback(() => {
		if (fadeFrameRef.current !== null) cancelAnimationFrame(fadeFrameRef.current);
		fadeFrameRef.current = null;
	}, []);

	const fadeVolume = useCallback((target: number, duration: number, onComplete?: () => void) => {
		const audio = getAudio();
		if (!audio) return;
		cancelFade();
		const initial = audio.volume;
		const startedAt = performance.now();
		const tick = (time: number) => {
			const progress = Math.min(Math.max((time - startedAt) / duration, 0), 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			audio.volume = Math.min(Math.max(initial + (target - initial) * eased, 0), 1);
			if (progress < 1) fadeFrameRef.current = requestAnimationFrame(tick);
			else {
				fadeFrameRef.current = null;
				onComplete?.();
			}
		};
		fadeFrameRef.current = requestAnimationFrame(tick);
	}, [cancelFade]);

	const startPlayback = useCallback(async () => {
		const audio = getAudio();
		if (!audio) return;
		announce('loading');
		audio.volume = 0;
		try {
			await audio.play();
			announce('playing');
			fadeVolume(track.volume, FADE_DURATION);
		} catch {
			wantsPlaybackRef.current = false;
			audio.pause();
			announce('error');
		}
	}, [announce, fadeVolume, track.volume]);

	const pausePlayback = useCallback((keepIntent = false) => {
		const audio = getAudio();
		if (!audio) return;
		if (!keepIntent) wantsPlaybackRef.current = false;
		fadeVolume(0, FADE_DURATION, () => {
			audio.pause();
			announce('paused');
		});
	}, [announce, fadeVolume]);

	const togglePlayback = () => {
		if (status === 'playing' || status === 'loading') pausePlayback();
		else {
			wantsPlaybackRef.current = true;
			void startPlayback();
		}
	};

	useEffect(() => {
		const handleVisibility = () => {
			const audio = getAudio();
			if (!audio) return;
			if (document.hidden) {
				if (!audio.paused) {
					cancelFade();
					audio.pause();
					audio.volume = 0;
					announce('paused');
				}
			} else if (wantsPlaybackRef.current) {
				void startPlayback();
			}
		};
		document.addEventListener('visibilitychange', handleVisibility);
		return () => document.removeEventListener('visibilitychange', handleVisibility);
	}, [announce, cancelFade, startPlayback]);

	useEffect(() => {
		const saveRouteSnapshot = () => {
			const audio = getAudio();
			if (!audio) return;
			sessionStorage.setItem(ROUTE_AUDIO_SNAPSHOT, JSON.stringify({
				time: audio.currentTime,
				playing: wantsPlaybackRef.current,
			}));
		};
		const restoreRouteSnapshot = () => {
			const audio = getAudio();
			const snapshot = sessionStorage.getItem(ROUTE_AUDIO_SNAPSHOT);
			if (!audio || !snapshot) return;
			sessionStorage.removeItem(ROUTE_AUDIO_SNAPSHOT);
			try {
				const parsed = JSON.parse(snapshot) as { time?: number; playing?: boolean };
				if (Number.isFinite(parsed.time) && audio.currentTime < .05) audio.currentTime = Math.max(0, parsed.time ?? 0);
				wantsPlaybackRef.current = Boolean(parsed.playing);
				if (parsed.playing && audio.paused) void startPlayback();
				else if (parsed.playing) announce('playing');
			} catch {
				sessionStorage.removeItem(ROUTE_AUDIO_SNAPSHOT);
			}
		};
		document.addEventListener('astro:before-swap', saveRouteSnapshot);
		document.addEventListener('astro:page-load', restoreRouteSnapshot);
		return () => {
			document.removeEventListener('astro:before-swap', saveRouteSnapshot);
			document.removeEventListener('astro:page-load', restoreRouteSnapshot);
		};
	}, [announce, startPlayback]);

	useEffect(() => () => cancelFade(), [cancelFade]);

	useEffect(() => {
		if (!languageExpanded) return;

		const closeOnOutsidePress = (event: PointerEvent) => {
			if (!dockRef.current?.contains(event.target as Node)) setLanguageExpanded(false);
		};
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setLanguageExpanded(false);
		};

		document.addEventListener('pointerdown', closeOnOutsidePress);
		document.addEventListener('keydown', closeOnEscape);
		return () => {
			document.removeEventListener('pointerdown', closeOnOutsidePress);
			document.removeEventListener('keydown', closeOnEscape);
		};
	}, [languageExpanded]);

	const handleLanguageClick = (event: MouseEvent<HTMLAnchorElement>, targetLocale: Locale) => {
		setLanguageExpanded(false);
		const hash = window.location.hash;
		const path = targetLocale === 'es' ? '/' : '/en/';
		event.currentTarget.href = `${window.location.origin}${path}${hash}`;
	};

	const isPlaying = status === 'playing';
	const musicLabel = status === 'loading' ? copy.musicLoading : isPlaying ? copy.musicPause : copy.musicPlay;

	return (
		<aside ref={dockRef} className={`ambient-dock${languageExpanded ? ' is-language-expanded' : ''}`} aria-label={`${track.title} — ${track.artist}`}>
			<button
				type="button"
				className="ambient-music-control"
				onClick={togglePlayback}
				aria-label={musicLabel}
				aria-pressed={isPlaying}
				data-status={status}
				title={musicLabel}
			>
				{isPlaying ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
				<span className="ambient-equalizer" aria-hidden="true"><i /><i /><i /></span>
			</button>

			<div className="ambient-language-cluster">
				<span className="ambient-divider" aria-hidden="true" />
				<button
					type="button"
					className="ambient-language-toggle"
					aria-label={copy.languageLabel}
					aria-expanded={languageExpanded}
					aria-controls="ambient-language-options"
					onClick={() => setLanguageExpanded((expanded) => !expanded)}
				>
					{locale.toUpperCase()}
				</button>
				<nav id="ambient-language-options" className="ambient-language" aria-label={copy.languageLabel}>
					{(['es', 'en'] as const).map((language) => (
						<a
							key={language}
							href={language === 'es' ? '/' : '/en/'}
							lang={language}
							hrefLang={language}
							aria-current={locale === language ? 'page' : undefined}
							onClick={(event) => handleLanguageClick(event, language)}
						>
							{language.toUpperCase()}
						</a>
					))}
				</nav>
			</div>
			<span className="ambient-status" role="status" aria-live="polite">
				{status === 'error' ? copy.musicError : ''}
			</span>
		</aside>
	);
}
