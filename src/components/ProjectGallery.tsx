import { useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { ArrowUpRight } from 'lucide-react';
import { getProjects } from '../data/projects';
import type { Locale, LocalizedPortfolioContent } from '../i18n/content';
import type { Project } from '../types/portfolio';
import ProjectModal from './projects/ProjectModal';
import ProjectPreview from './projects/ProjectPreview';
import './ProjectGallery.css';

interface ProjectGalleryProps { locale: Locale; copy: LocalizedPortfolioContent['projects'] }

export default function ProjectGallery({ locale, copy }: ProjectGalleryProps) {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [transitioningProjectId, setTransitioningProjectId] = useState<Project['id'] | null>(null);
	const [activeProjectIndex, setActiveProjectIndex] = useState(0);
	const triggerRef = useRef<HTMLElement | null>(null);
	const indexRefs = useRef<Array<HTMLButtonElement | null>>([]);
	const projects = getProjects(locale);

	const handleIndexKeys = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
		if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
		event.preventDefault();
		const direction = event.key === 'ArrowRight' ? 1 : -1;
		const nextIndex = (index + direction + projects.length) % projects.length;
		setActiveProjectIndex(nextIndex);
		indexRefs.current[nextIndex]?.focus();
	};

	const openProject = (project: Project, event: MouseEvent<HTMLButtonElement>) => {
		triggerRef.current = event.currentTarget;
		window.dispatchEvent(new CustomEvent('portfolio:project-open', { detail: { projectId: project.id } }));
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const usesMobileSheet = window.matchMedia('(max-width: 640px)').matches;
		const hasMatchingShowcase = !project.gallery;
		if (!document.startViewTransition || reduceMotion || usesMobileSheet || !hasMatchingShowcase) {
			setSelectedProject(project);
			return;
		}

		try {
			flushSync(() => setTransitioningProjectId(project.id));
			const transition = document.startViewTransition(() => {
				flushSync(() => setSelectedProject(project));
			});
			void transition.ready.catch(() => undefined);
			void transition.finished.then(
				() => setTransitioningProjectId(null),
				() => setTransitioningProjectId(null),
			);
		} catch {
			setTransitioningProjectId(null);
			setSelectedProject(project);
		}
	};

	return (
		<>
			<div className="pg-project-index" role="group" aria-label={copy.galleryLabel}>
				{projects.map((project, index) => (
					<button
						type="button"
						key={`project-index-${project.id}`}
						id={`project-index-${project.id}`}
						ref={(node) => { indexRefs.current[index] = node; }}
						aria-pressed={activeProjectIndex === index}
						data-active={activeProjectIndex === index ? 'true' : 'false'}
						onClick={() => setActiveProjectIndex(index)}
						onKeyDown={(event) => handleIndexKeys(event, index)}
					>
						<span>{String(index + 1).padStart(2, '0')}</span>
						<strong>{project.title}</strong>
						<ArrowUpRight size={18} strokeWidth={1.7} aria-hidden="true" />
					</button>
				))}
			</div>
			<div
				className="projects-gallery pg-gallery"
				role="region"
				aria-label={copy.galleryLabel}
			>
				{projects.map((project, index) => (
					<article
						key={project.id}
						id={`project-panel-${project.id}`}
						className={`project-card pg-card ${project.className}`}
						role="group"
						aria-label={`${index + 1} / ${projects.length}: ${project.title}`}
						data-active={activeProjectIndex === index ? 'true' : 'false'}
						style={{ viewTransitionName: transitioningProjectId === project.id && !selectedProject ? 'project-showcase' : undefined } as CSSProperties}
					>
						<button
							type="button"
							className="pg-card-trigger"
							onClick={(event) => openProject(project, event)}
							aria-haspopup="dialog"
							aria-label={`${copy.openCase}: ${project.title}`}
						>
							<span className="pg-visually-hidden">{copy.openCase}: {project.title}</span>
						</button>
						<div className="pg-card-content" aria-hidden="true">
							<div className="pg-card-header">
								<h3>{project.title}</h3>
								<span className="pg-card-action"><span>{copy.seeCase}</span><ArrowUpRight size={20} strokeWidth={1.8} /></span>
							</div>
							<ProjectPreview project={project} copy={copy.preview} />
						</div>
					</article>
				))}
			</div>
			{selectedProject && (
				<ProjectModal
					project={selectedProject}
					copy={copy}
					returnFocusRef={triggerRef}
					onAfterClose={() => setSelectedProject(null)}
				/>
			)}
		</>
	);
}
