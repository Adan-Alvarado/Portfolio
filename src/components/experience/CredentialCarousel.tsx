import { useEffect, useRef, useState, type FocusEvent } from 'react';
import type { Credential } from '../../data/credentials';
import CredentialCard from './CredentialCard';
import './CredentialCarousel.css';

interface CredentialCarouselProps {
	credentials: Credential[];
}

type CardPosition = 'previous' | 'active' | 'next' | 'hidden-before' | 'hidden-after';

const ACTIVE_DURATION_MS = 5000;

function getRelativePosition(index: number, activeIndex: number, length: number) {
	const forwardDistance = (index - activeIndex + length) % length;
	return forwardDistance <= length / 2 ? forwardDistance : forwardDistance - length;
}

function getCardPosition(relativePosition: number): CardPosition {
	if (relativePosition === -1) return 'previous';
	if (relativePosition === 0) return 'active';
	if (relativePosition === 1) return 'next';
	return relativePosition < 0 ? 'hidden-before' : 'hidden-after';
}

export default function CredentialCarousel({ credentials }: CredentialCarouselProps) {
	const carouselRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const [hasFocus, setHasFocus] = useState(false);
	const [isInView, setIsInView] = useState(false);
	const [pageIsVisible, setPageIsVisible] = useState(true);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

		updateMotionPreference();
		mediaQuery.addEventListener('change', updateMotionPreference);
		return () => mediaQuery.removeEventListener('change', updateMotionPreference);
	}, []);

	useEffect(() => {
		const carousel = carouselRef.current;
		if (!carousel) return;

		const observer = new IntersectionObserver(
			([entry]) => setIsInView(entry.isIntersecting),
			{ threshold: 0.2 },
		);
		observer.observe(carousel);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const updatePageVisibility = () => setPageIsVisible(document.visibilityState === 'visible');
		updatePageVisibility();
		document.addEventListener('visibilitychange', updatePageVisibility);
		return () => document.removeEventListener('visibilitychange', updatePageVisibility);
	}, []);

	const motionIsPaused =
		credentials.length < 2 ||
		isHovered ||
		hasFocus ||
		!isInView ||
		!pageIsVisible ||
		prefersReducedMotion;

	useEffect(() => {
		if (motionIsPaused) return;

		const timer = window.setTimeout(() => {
			setActiveIndex((currentIndex) => (currentIndex + 1) % credentials.length);
		}, ACTIVE_DURATION_MS);

		return () => window.clearTimeout(timer);
	}, [activeIndex, credentials.length, motionIsPaused]);

	const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
		if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHasFocus(false);
	};

	if (credentials.length === 0) return null;

	return (
		<div
			ref={carouselRef}
			className="experience-visual credential-depth-carousel focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c55007]"
			role="region"
			aria-label="Carrusel de credenciales profesionales"
			aria-roledescription="carrusel"
			tabIndex={0}
			onPointerEnter={() => setIsHovered(true)}
			onPointerLeave={() => setIsHovered(false)}
			onFocus={() => setHasFocus(true)}
			onBlur={handleBlur}
		>
			<div className="credential-depth-stack">
				{credentials.map((credential, index) => {
					const relativePosition = getRelativePosition(index, activeIndex, credentials.length);
					const position = getCardPosition(relativePosition);
					const isActive = position === 'active';

					return (
						<article
							className={`credential-card credential-depth-card is-${position}`}
							key={credential.id}
							aria-hidden={!isActive}
						>
							<CredentialCard credential={credential} isActive={isActive} />
						</article>
					);
				})}
			</div>
		</div>
	);
}
