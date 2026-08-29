import type { RefObject } from 'react';
import { X } from 'lucide-react';
import type { Project } from '../../types/portfolio';
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
							<div className="pg-stack">
								<h3>Tecnologías</h3>
								<ul>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
							</div>
						</div>
					</div>
				</>
			)}
		</Dialog>
	);
}

