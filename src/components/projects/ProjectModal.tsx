import type { RefObject } from 'react';
import { X } from 'lucide-react';
import { siGithub } from 'simple-icons';
import type { Project } from '../../types/portfolio';
import BrandIcon from '../BrandIcon';
import TechnologyPill from '../TechnologyPill';
import Dialog from '../ui/Dialog';
import ProjectPreview from './ProjectPreview';

interface ProjectModalProps {
	project: Project;
	returnFocusRef: RefObject<HTMLElement | null>;
	onAfterClose: () => void;
}

export default function ProjectModal({ project, returnFocusRef, onAfterClose }: ProjectModalProps) {
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
							<p>Proyecto conceptual · Demostración</p>
							<h2 id={titleId}>{project.title}</h2>
						</div>
						<button ref={closeButtonRef} type="button" onClick={close} aria-label={`Cerrar ${project.title}`}>
							<span>Cerrar</span><X aria-hidden="true" size={20} strokeWidth={1.8} />
						</button>
					</header>

					<div className="pg-modal-body">
						<div className="pg-modal-showcase"><ProjectPreview project={project} expanded /></div>
						<div className="pg-modal-details">
							<p id={descriptionId}>{project.description}</p>
							<dl>
								<div><dt>Rol</dt><dd>{project.role}</dd></div>
								<div><dt>Estado</dt><dd>Ejemplo ficticio para el portfolio</dd></div>
							</dl>
							<a className="pg-repository" href={project.repositoryUrl} target="_blank" rel="noreferrer">
								<BrandIcon icon={siGithub} width="19" height="19" aria-hidden="true" />
								<span><strong>Código de ejemplo</strong><small>Repositorio demostrativo no publicado</small></span>
							</a>
							<div className="pg-stack">
								<h3>Tecnologías</h3>
								<ul>{project.technologies.map((technology) => <TechnologyPill key={technology.label} technology={technology} />)}</ul>
							</div>
						</div>
					</div>
				</>
			)}
		</Dialog>
	);
}
