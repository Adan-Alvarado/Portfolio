import { useEffect, useRef, useState, type FocusEvent } from 'react';
import type { Credential } from '../../data/credentials';
import CredentialCard from './CredentialCard';

interface CredentialCarouselProps {
	credentials: Credential[];
}

export default function CredentialCarousel({ credentials }: CredentialCarouselProps) {
	const carouselRef = useRef<HTMLDivElement>(null);
	const [hasFocus, setHasFocus] = useState(false);
	const [isInView, setIsInView] = useState(true);
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
		const updatePageVisibility = () => setPageIsVisible(!document.hidden);
		updatePageVisibility();
		document.addEventListener('visibilitychange', updatePageVisibility);
		return () => document.removeEventListener('visibilitychange', updatePageVisibility);
	}, []);

	const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
		if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHasFocus(false);
	};

	const fallbackCredential = credentials[0];
	if (!fallbackCredential) return null;

	const credentialAt = (index: number) => credentials[index] ?? fallbackCredential;
	const staticTopCredential = credentialAt(0);
	const activeCredential = credentialAt(1);
	const staticBottomCredential = credentialAt(2);
	const movingCredentials = [credentialAt(3), credentialAt(4), credentialAt(5)];
	const motionIsPaused = hasFocus || !isInView || !pageIsVisible || prefersReducedMotion;

	return (
		<div
			ref={carouselRef}
			className="experience-visual focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c55007]"
			role="region"
			aria-label="Credencial profesional"
			tabIndex={0}
			onFocus={() => setHasFocus(true)}
			onBlur={handleBlur}
		>
			<div className="credential-background-layer pointer-events-none absolute z-[1]" aria-hidden="true">
				<div className="credential-background-card credential-static-card credential-static-card--top absolute">
					<div className="credential-background-card__visual h-full w-full">
						<CredentialCard credential={staticTopCredential} isActive={false} />
					</div>
				</div>

				<div className="credential-background-card credential-static-card credential-static-card--bottom absolute">
					<div className="credential-background-card__visual h-full w-full">
						<CredentialCard credential={staticBottomCredential} isActive={false} />
					</div>
				</div>

				<div className={`credential-moving-column absolute${motionIsPaused ? ' is-paused' : ''}`}>
					{movingCredentials.map((credential, index) => (
						<div className="credential-background-card credential-moving-card relative" key={`moving-${index}-${credential.id}`}>
							<div className="credential-background-card__visual h-full w-full">
								<CredentialCard credential={credential} isActive={false} />
							</div>
						</div>
					))}
				</div>
			</div>

			<article
				className="credential-card active-credential absolute z-[3] transition-[transform,opacity,filter] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
				aria-label="Credencial profesional de Fabricio Alvarado"
			>
				<CredentialCard credential={activeCredential} isActive />
			</article>
		</div>
	);
}
