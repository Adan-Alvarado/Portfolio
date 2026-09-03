import type { RefObject } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { siGithub } from 'simple-icons';
import type { Project } from '../../types/portfolio';
import type { LocalizedPortfolioContent } from '../../i18n/content';
import BrandIcon from '../BrandIcon';
import TechnologyPill from '../TechnologyPill';
import Dialog from '../ui/Dialog';
import ProjectPreview from './ProjectPreview';
import DesignGallery from './DesignGallery';

interface ProjectModalProps {
	project: Project;
	copy: LocalizedPortfolioContent['projects'];
	returnFocusRef: RefObject<HTMLElement | null>;
	onAfterClose: () => void;
}

export default function ProjectModal({ project, copy, returnFocusRef, onAfterClose }: ProjectModalProps) {
	const titleId = `pg-modal-title-${project.id}`;

	return (
		<Dialog
			open
			onAfterClose={onAfterClose}
			returnFocusRef={returnFocusRef}
			labelledBy={titleId}
			layerClassName="pg-modal-layer"
			backdropClassName="pg-modal-backdrop"
			panelClassName="pg-modal"
			closeDuration={280}
		>
			{({ close, closeButtonRef }) => (
				<>
					<header className="pg-modal-header">
						<div>
							<p>{copy.modalEyebrow}</p>
							<h2 id={titleId}>{project.title}</h2>
						</div>
						<button ref={closeButtonRef} type="button" onClick={close} aria-label={`${copy.close} ${project.title}`}>
							<span>{copy.close}</span><X aria-hidden="true" size={20} strokeWidth={1.8} />
						</button>
					</header>

					<div className="pg-modal-body">
						<div className="pg-modal-showcase pg-view-transition-target">
							{project.gallery ? <DesignGallery items={project.gallery} copy={copy} /> : <ProjectPreview project={project} copy={copy.preview} expanded />}
						</div>
						<div className="pg-modal-details">
							<p className="pg-modal-summary">{project.description}</p>
							<dl>
								{project.challenge && <div><dt>{copy.challenge}</dt><dd>{project.challenge}</dd></div>}
								{project.contribution && <div><dt>{copy.contribution}</dt><dd>{project.contribution}</dd></div>}
								{project.outcome && <div><dt>{copy.outcome}</dt><dd>{project.outcome}</dd></div>}
								{!project.challenge && !project.contribution && !project.outcome && <div><dt>{copy.role}</dt><dd>{project.role}</dd></div>}
							</dl>
							{project.links && project.links.length > 0 ? (
								<div className="pg-project-links">
									{project.links.map((link) => (
										<a className="pg-repository" href={link.url} target="_blank" rel="noreferrer" key={link.url}>
											{link.kind === 'repository' ? <BrandIcon icon={siGithub} width="19" height="19" aria-hidden="true" /> : <ExternalLink width="19" height="19" aria-hidden="true" />}
											<span><strong>{link.label}</strong>{link.note && <small>{link.note}</small>}</span>
										</a>
									))}
								</div>
							) : project.repositoryVisibility ? <p className="pg-repository-note">{copy.repositoryNote}</p> : null}
							<div className="pg-stack">
								<h3>{copy.technologies}</h3>
								<ul>{project.technologies.map((technology) => <TechnologyPill key={technology.label} technology={technology} />)}</ul>
							</div>
						</div>
					</div>
				</>
			)}
		</Dialog>
	);
}
