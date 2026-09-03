import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Award, Camera } from 'lucide-react';
import type { Credential } from '../../data/credentials';
import type { LocalizedPortfolioContent } from '../../i18n/content';
import { CredentialFront } from './CredentialCard';

const CredentialChapterDialog = lazy(() => import('./CredentialChapterDialog'));

interface InteractiveCredentialCardProps {
	credential: Credential;
	copy: LocalizedPortfolioContent['experience'];
}

export default function InteractiveCredentialCard({ credential, copy }: InteractiveCredentialCardProps) {
	const [isFlipped, setIsFlipped] = useState(false);
	const [isBackSettled, setIsBackSettled] = useState(false);
	const [isReturning, setIsReturning] = useState(false);
	const [openSection, setOpenSection] = useState<'certificates' | null>(null);
	const flipTimer = useRef<number | null>(null);
	const returnFrame = useRef<number | null>(null);
	const certificatesTrigger = useRef<HTMLButtonElement>(null);
	const frontTrigger = useRef<HTMLButtonElement>(null);
	const returnToFrontTrigger = useRef<HTMLButtonElement>(null);
	const back = credential.back;
	const returnFocusRef = certificatesTrigger;

	useEffect(() => () => {
		if (flipTimer.current !== null) window.clearTimeout(flipTimer.current);
		if (returnFrame.current !== null) window.cancelAnimationFrame(returnFrame.current);
	}, []);

	const clearFlipTimer = () => {
		if (flipTimer.current === null) return;
		window.clearTimeout(flipTimer.current);
		flipTimer.current = null;
	};
	const cancelReturnFrame = () => {
		if (returnFrame.current === null) return;
		window.cancelAnimationFrame(returnFrame.current);
		returnFrame.current = null;
	};

	if (!back) return <CredentialFront credential={credential} isActive copy={copy} />;

	const showBack = () => {
		clearFlipTimer();
		cancelReturnFrame();
		setIsReturning(false);
		setIsBackSettled(false);
		setIsFlipped(true);
		flipTimer.current = window.setTimeout(() => {
			setIsBackSettled(true);
			flipTimer.current = null;
		}, 560);
		requestAnimationFrame(() => {
			const target = back.certificates.length ? certificatesTrigger.current : returnToFrontTrigger.current;
			target?.focus({ preventScroll: true });
		});
	};
	const showFront = () => {
		clearFlipTimer();
		cancelReturnFrame();
		if (isBackSettled) {
			setIsBackSettled(false);
			setIsReturning(true);
			returnFrame.current = window.requestAnimationFrame(() => {
				returnFrame.current = window.requestAnimationFrame(() => {
					setIsReturning(false);
					setIsFlipped(false);
					returnFrame.current = null;
				});
			});
		} else {
			setIsReturning(false);
			setIsFlipped(false);
		}
		requestAnimationFrame(() => frontTrigger.current?.focus({ preventScroll: true }));
	};

	return (
		<>
			<div className={`credential-flipper${isFlipped ? ' is-flipped' : ''}${isBackSettled ? ' is-back-settled' : ''}${isReturning ? ' is-returning' : ''}`}>
				<CredentialFront credential={credential} isActive copy={copy} hidden={isFlipped} inert={isFlipped} onReverse={showBack} reverseButtonRef={frontTrigger} />
				<div className="credential-card-face credential-card-back" aria-hidden={!isFlipped} inert={!isFlipped}>
					<div className="credential-back__content">
						<div className="credential-back__heading"><p className="credential-back__eyebrow">{copy.back.title}</p><button ref={returnToFrontTrigger} className="reverse-button" type="button" onClick={showFront}>{copy.back.returnToFront}</button></div>
						<section><Award aria-hidden="true" /><div><h3>{copy.back.certificates}</h3><p><strong>{back.certificates.length}</strong> {copy.back.certificateCount}</p>{back.certificates[0] && <small>{back.certificates[0].title}</small>}</div><button ref={certificatesTrigger} type="button" disabled={!back.certificates.length} onClick={() => setOpenSection('certificates')} aria-label={copy.back.openCertificates}><ArrowUpRight aria-hidden="true" /></button></section>
						<section><Camera aria-hidden="true" /><div><h3>{copy.back.photography}</h3><p><strong>{back.photos.length}</strong> {copy.back.photoCount}</p></div><div className="credential-back__photos" aria-hidden="true">{back.photos.slice(0, 4).map((photo) => { const preview = photo.thumbnail ?? photo; return <img key={photo.id} src={preview.src} width={preview.width} height={preview.height} alt="" loading="lazy" decoding="async" />; })}</div></section>
					</div>
				</div>
			</div>
			{openSection && <Suspense fallback={null}><CredentialChapterDialog content={back} copy={copy.back} returnFocusRef={returnFocusRef} onAfterClose={() => setOpenSection(null)} /></Suspense>}
		</>
	);
}
