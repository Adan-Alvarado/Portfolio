import type { RefObject } from 'react';
import { X } from 'lucide-react';
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
	const descriptionId = `pg-modal-description-${project.id}`;

	return (
		<Dialog
			open
			onAfterClose={onAfterClose}
			returnFocusRef={returnFocusRef}
			labelledBy={titleId}
			describedBy={descriptionId}
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
							<p id={descriptionId}>{project.description}</p>
							<dl>
								<div><dt>{copy.role}</dt><dd>{project.role}</dd></div>
								<div><dt>{copy.status}</dt><dd>{copy.statusValue}</dd></div>
							</dl>
							<a className="pg-repository" href={project.repositoryUrl} target="_blank" rel="noreferrer">
								<BrandIcon icon={siGithub} width="19" height="19" aria-hidden="true" />
								<span><strong>{copy.repositoryTitle}</strong><small>{copy.repositoryNote}</small></span>
							</a>
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
