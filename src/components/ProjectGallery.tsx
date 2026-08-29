import { useRef, useState, type MouseEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import type { Project } from '../types/portfolio';
import ProjectModal from './projects/ProjectModal';
import ProjectPreview from './projects/ProjectPreview';
import './ProjectGallery.css';

export default function ProjectGallery() {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const triggerRef = useRef<HTMLElement | null>(null);

	const openProject = (project: Project, event: MouseEvent<HTMLButtonElement>) => {
		triggerRef.current = event.currentTarget;
		setSelectedProject(project);
	};

	return (
		<>
			<div className="projects-gallery pg-gallery" aria-label="Selección de proyectos conceptuales">
				{projects.map((project) => (
					<article key={project.id} className={`project-card pg-card ${project.className}`}>
						<button
							type="button"
							className="pg-card-trigger"
							onClick={(event) => openProject(project, event)}
							aria-haspopup="dialog"
							aria-label={`Abrir caso conceptual: ${project.title}`}
						>
							<span className="pg-visually-hidden">Ver detalles de {project.title}</span>
						</button>
						<div className="pg-card-content" aria-hidden="true">
							<div className="pg-card-header">
								<h3>{project.title}</h3>
								<span className="pg-card-action"><span>Ver caso</span><ArrowUpRight size={20} strokeWidth={1.8} /></span>
							</div>
							<ProjectPreview project={project} />
						</div>
					</article>
				))}
			</div>
			{selectedProject && (
				<ProjectModal
					project={selectedProject}
					returnFocusRef={triggerRef}
					onAfterClose={() => setSelectedProject(null)}
				/>
			)}
		</>
	);
}
