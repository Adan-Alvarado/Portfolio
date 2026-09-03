import type { RefObject } from 'react';
import { ExternalLink, X } from 'lucide-react';
import type { CredentialBackContent } from '../../types/portfolio';
import type { LocalizedPortfolioContent } from '../../i18n/content';
import Dialog from '../ui/Dialog';
import './CredentialChapterDialog.css';

interface CredentialChapterDialogProps {
	content: CredentialBackContent;
	copy: LocalizedPortfolioContent['experience']['back'];
	returnFocusRef: RefObject<HTMLElement | null>;
	onAfterClose: () => void;
}

export default function CredentialChapterDialog({ content, copy, returnFocusRef, onAfterClose }: CredentialChapterDialogProps) {
	const certificates = content.certificates.slice(0, 3);
	const title = copy.certificates;
	const titleId = 'credential-dialog-certificates-title';

	return (
		<Dialog
			open
			onAfterClose={onAfterClose}
			returnFocusRef={returnFocusRef}
			labelledBy={titleId}
			layerClassName="credential-dialog-layer"
			backdropClassName="credential-dialog-backdrop"
			panelClassName="credential-dialog"
			closeDuration={280}
		>
			{({ close, closeButtonRef }) => (
				<>
					<header className="credential-dialog__header">
						<h2 id={titleId}>{title}</h2>
						<button ref={closeButtonRef} type="button" onClick={close} aria-label={`${copy.close}: ${title}`}>
							<X aria-hidden="true" />
						</button>
					</header>

					<div className="credential-dialog__certificates">
						{certificates.map((certificate) => (
							<article key={certificate.id} className={certificate.thumbnail ? undefined : 'credential-dialog__certificate--text-only'}>
								{certificate.thumbnail && <img src={certificate.thumbnail.src} width={certificate.thumbnail.width} height={certificate.thumbnail.height} alt={certificate.thumbnail.alt} loading="lazy" decoding="async" />}
								<div><p>{certificate.issuer} · {certificate.date}</p><h3>{certificate.title}</h3></div>
								<a href={certificate.url} target="_blank" rel="noreferrer">{copy.verifiedLink}<ExternalLink aria-hidden="true" /></a>
							</article>
						))}
					</div>
				</>
			)}
		</Dialog>
	);
}
