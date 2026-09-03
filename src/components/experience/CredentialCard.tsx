import { MapPin } from 'lucide-react';
import type { Ref } from 'react';
import type { Credential } from '../../data/credentials';
import type { LocalizedPortfolioContent } from '../../i18n/content';

interface CredentialFrontProps {
	credential: Credential;
	isActive: boolean;
	copy: LocalizedPortfolioContent['experience'];
	hidden?: boolean;
	inert?: boolean;
	onReverse?: () => void;
	reverseButtonRef?: Ref<HTMLButtonElement>;
}

const InstagramMark = () => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
		<rect width="16" height="16" x="4" y="4" rx="4" />
		<circle cx="12" cy="12" r="3.25" />
		<path d="M17.5 6.5h.01" />
	</svg>
);

export function CredentialFront({ credential, isActive, copy, hidden = false, inert = false, onReverse, reverseButtonRef }: CredentialFrontProps) {
	return (
		<div className="credential-card-face credential-card-front" aria-hidden={hidden} inert={inert}>
			<div className="experience-card">
				<span className="experience-card__accent experience-card__accent--right" aria-hidden="true" />
				<img className="experience-card__shell" src="/assets/card-shell.svg" width="398" height="479" alt="" aria-hidden="true" />
				<span className="experience-card__accent experience-card__accent--diagonal" aria-hidden="true" />
				<div className="experience-card__photo"><img src={credential.photo.src} width={credential.photo.width} height={credential.photo.height} alt={isActive ? credential.photo.alt : ''} loading="lazy" decoding="async" fetchPriority="low" /></div>
				<div className="experience-card__content">
					<div className="experience-card__copy">
						<p className="experience-card__eyebrow">{credential.primaryRole.eyebrow}</p><h3>{credential.primaryRole.title}</h3>
						<p className="experience-card__eyebrow experience-card__eyebrow--second">{credential.secondaryRole.eyebrow}</p><h4>{credential.secondaryRole.title}</h4>
						<p className="experience-card__location"><MapPin aria-hidden="true" /> {credential.location}</p>
					</div>
					<div className="experience-card__social" aria-label={isActive ? copy.socials : undefined}><span>In</span><span>@</span><span><InstagramMark /></span></div>
				</div>
			</div>
			{isActive && <button ref={reverseButtonRef} className="reverse-button" type="button" disabled={!onReverse} aria-disabled={!onReverse} title={!onReverse ? copy.reverseUnavailable : undefined} onClick={onReverse}>{copy.reverse}</button>}
		</div>
	);
}

export default function CredentialCard(props: Omit<CredentialFrontProps, 'hidden' | 'inert' | 'onReverse' | 'reverseButtonRef'>) {
	return <CredentialFront {...props} />;
}
