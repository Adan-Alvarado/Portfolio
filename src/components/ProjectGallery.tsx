import { useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { getProjects } from '../data/projects';
import type { Locale, LocalizedPortfolioContent } from '../i18n/content';
import type { Project, ProjectMediaMap } from '../types/portfolio';
import ProjectModal from './projects/ProjectModal';
import ProjectPreview from './projects/ProjectPreview';
import './ProjectGallery.css';

interface ProjectGalleryProps { locale: Locale; copy: LocalizedPortfolioContent['projects']; media: ProjectMediaMap }

export default function ProjectGallery({ locale, copy, media }: ProjectGalleryProps) {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [transitioningProjectId, setTransitioningProjectId] = useState<Project['id'] | null>(null);
	const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
	const triggerRef = useRef<HTMLElement | null>(null);
	const indexRefs = useRef<Array<HTMLButtonElement | null>>([]);
	const projects = getProjects(locale, media);

	const handleIndexKeys = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
		if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
		event.preventDefault();
		const direction = event.key === 'ArrowRight' ? 1 : -1;
		const nextIndex = (index + direction + projects.length) % projects.length;
		setActiveProjectIndex(nextIndex);
		indexRefs.current[nextIndex]?.focus();
	};

	const toggleProject = (index: number) => {
		setActiveProjectIndex((current) => current === index ? null : index);
	};

	const openProject = (project: Project, event: MouseEvent<HTMLButtonElement>) => {
		triggerRef.current = event.currentTarget;
		window.dispatchEvent(new CustomEvent('portfolio:project-open', { detail: { projectId: project.id } }));
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const usesMobileSheet = window.matchMedia('(max-width: 1023px)').matches;
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

	const renderProjectCard = (project: Project, index: number, context: 'desktop' | 'mobile') => (
		<article
			key={`${context}-${project.id}`}
			id={`${context}-project-panel-${project.id}`}
			className={`project-card pg-card ${project.className}`}
			role="region"
			aria-label={`${index + 1} / ${projects.length}: ${project.title}`}
			data-active={activeProjectIndex === index ? 'true' : 'false'}
			data-project-id={project.id}
			style={{ viewTransitionName: context === 'desktop' && transitioningProjectId === project.id && !selectedProject ? 'project-showcase' : undefined } as CSSProperties}
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
	);

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
						onClick={() => toggleProject(index)}
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
				{projects.map((project, index) => renderProjectCard(project, index, 'desktop'))}
			</div>
			<div className="pg-mobile-accordion" aria-label={copy.galleryLabel}>
				{projects.map((project, index) => {
					const expanded = activeProjectIndex === index;
					return (
						<section className="pg-accordion-item" data-active={expanded ? 'true' : 'false'} data-project-id={project.id} key={`accordion-${project.id}`}>
							<button
								type="button"
								id={`mobile-project-trigger-${project.id}`}
								ref={(node) => { indexRefs.current[index] = node; }}
								aria-expanded={expanded}
								aria-controls={`mobile-project-content-${project.id}`}
								onClick={() => toggleProject(index)}
								onKeyDown={(event) => handleIndexKeys(event, index)}
							>
								<img className="pg-accordion-thumbnail" src={project.media?.[0]?.src} alt="" width={64} height={64} loading="lazy" decoding="async" />
								<strong>{project.title}</strong>
								<ChevronDown size={18} strokeWidth={1.7} aria-hidden="true" />
							</button>
							<div className="pg-accordion-panel" id={`mobile-project-content-${project.id}`} role="region" aria-labelledby={`mobile-project-trigger-${project.id}`}>
								<div className="pg-accordion-panel__inner">{renderProjectCard(project, index, 'mobile')}</div>
							</div>
						</section>
					);
				})}
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
