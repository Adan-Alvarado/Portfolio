import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, X } from 'lucide-react';
import './ProjectGallery.css';

type ProjectId = 'auto-care' | 'diseno' | 'fixit';

type Project = {
	id: ProjectId;
	title: string;
	className: string;
	description: string;
	role: string;
	technologies: readonly string[];
};

const projects: readonly Project[] = [
	{
		id: 'auto-care',
		title: 'Auto Care Club',
		className: 'project-auto',
		description: 'Concepto de plataforma para organizar mantenimientos, alertas y el historial de un vehículo desde una experiencia clara y directa.',
		role: 'Diseño de producto y desarrollo frontend',
		technologies: ['Astro', 'React', 'TypeScript', 'Tailwind CSS'],
	},
	{
		id: 'diseno',
		title: 'Diseño Gráfico',
		className: 'project-design',
		description: 'Selección conceptual de piezas editoriales y sistemas visuales creada para demostrar dirección de arte, composición y consistencia.',
		role: 'Dirección de arte y diseño gráfico',
		technologies: ['Photoshop', 'CorelDRAW', 'Canva', 'Figma'],
	},
	{
		id: 'fixit',
		title: 'Fixit API',
		className: 'project-fixit',
		description: 'API ficticia para registrar incidencias, asignar responsables y consultar el estado de cada solicitud mediante endpoints predecibles.',
		role: 'Diseño de API y desarrollo backend',
		technologies: ['.NET', 'C#', 'PostgreSQL', 'Docker'],
	},
];

const focusableSelector = [
	'a[href]',
	'button:not([disabled])',
	'input:not([disabled])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'[tabindex]:not([tabindex="-1"])',
].join(',');

function ProjectPreview({ project, expanded = false }: { project: Project; expanded?: boolean }) {
	if (project.id === 'auto-care') {
		return (
			<div className={`pg-preview pg-preview--auto${expanded ? ' is-expanded' : ''}`} aria-hidden="true">
				<span className="pg-demo-label">Concepto demo</span>
				<div className="pg-auto-window">
					<div className="pg-window-bar"><i></i><i></i><i></i><span>autocare.local</span></div>
					<div className="pg-auto-nav"><b>AUTO CARE</b><span>Resumen&nbsp;&nbsp; Servicios&nbsp;&nbsp; Historial</span></div>
					<div className="pg-auto-layout">
						<div className="pg-auto-copy">
							<small>PRÓXIMO SERVICIO · 18 DÍAS</small>
							<strong>Tu auto,<br />siempre al día.</strong>
							<span>Ver mantenimiento</span>
						</div>
						<div className="pg-car-shape"><i></i><i></i></div>
					</div>
					<div className="pg-auto-stats"><span><b>04</b> Servicios</span><span><b>82%</b> Estado general</span><span><b>12k</b> Kilómetros</span></div>
				</div>
			</div>
		);
	}

	if (project.id === 'diseno') {
		return (
			<div className={`pg-preview pg-preview--design${expanded ? ' is-expanded' : ''}`} aria-hidden="true">
				<span className="pg-demo-label">Muestra conceptual</span>
				<div className="pg-poster pg-poster--one"><small>IDENTIDAD / 01</small><b>CASA<br />NÓMADA</b><i></i></div>
				<div className="pg-poster pg-poster--two"><small>CAMPAÑA / 02</small><b>FRUTA<br />24</b><span>FRESCO · LOCAL · DIARIO</span></div>
				<div className="pg-poster pg-poster--three"><small>EDITORIAL / 03</small><b>RITMO</b><i></i><span>VOL. 08</span></div>
			</div>
		);
	}

	return (
		<div className={`pg-preview pg-preview--fixit${expanded ? ' is-expanded' : ''}`} aria-hidden="true">
			<span className="pg-demo-label">API ficticia</span>
			<div className="pg-api-window">
				<div className="pg-api-sidebar"><b>FIXIT / API</b><span>Overview</span><span className="is-active">Tickets</span><span>Assignments</span><span>Users</span></div>
				<div className="pg-api-main">
					<small>ENDPOINT DE EJEMPLO</small>
					<strong><i>POST</i> /v1/tickets</strong>
					<pre>{`{\n  "status": "open",\n  "priority": "medium"\n}`}</pre>
					<span><i>201</i> Ticket created</span>
				</div>
			</div>
		</div>
	);
}

export default function ProjectGallery() {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const dialogRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const triggerRef = useRef<HTMLElement | null>(null);

	function openProject(project: Project, event: MouseEvent<HTMLButtonElement>) {
		triggerRef.current = event.currentTarget;
		setSelectedProject(project);
	}

	function closeProject() {
		setSelectedProject(null);
	}

	useEffect(() => {
		if (!selectedProject) return;

		const previousOverflow = document.body.style.overflow;
		const previousPaddingRight = document.body.style.paddingRight;
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

		document.body.style.overflow = 'hidden';
		if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

		const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				event.preventDefault();
				closeProject();
				return;
			}

			if (event.key !== 'Tab' || !dialogRef.current) return;

			const focusableElements = Array.from(
				dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
			).filter((element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true');

			if (focusableElements.length === 0) {
				event.preventDefault();
				dialogRef.current.focus();
				return;
			}

			const firstElement = focusableElements[0];
			const lastElement = focusableElements[focusableElements.length - 1];

			if (event.shiftKey && document.activeElement === firstElement) {
				event.preventDefault();
				lastElement.focus();
			} else if (!event.shiftKey && document.activeElement === lastElement) {
				event.preventDefault();
				firstElement.focus();
			}
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			window.clearTimeout(focusTimer);
			document.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = previousOverflow;
			document.body.style.paddingRight = previousPaddingRight;
			window.setTimeout(() => triggerRef.current?.focus(), 0);
		};
	}, [selectedProject]);

	const modal = selectedProject ? (
		<div className="pg-modal-layer" onMouseDown={closeProject}>
			<div className="pg-modal-backdrop" aria-hidden="true"></div>
			<div
				ref={dialogRef}
				id={`pg-modal-${selectedProject.id}`}
				className="pg-modal"
				role="dialog"
				aria-modal="true"
				aria-labelledby={`pg-modal-title-${selectedProject.id}`}
				aria-describedby={`pg-modal-description-${selectedProject.id}`}
				tabIndex={-1}
				onMouseDown={(event) => event.stopPropagation()}
			>
				<header className="pg-modal-header">
					<div>
						<p>Proyecto conceptual · Demostración</p>
						<h2 id={`pg-modal-title-${selectedProject.id}`}>{selectedProject.title}</h2>
					</div>
					<button ref={closeButtonRef} type="button" onClick={closeProject} aria-label={`Cerrar ${selectedProject.title}`}>
						<span>Cerrar</span><X aria-hidden="true" size={20} strokeWidth={1.8} />
					</button>
				</header>

				<div className="pg-modal-body">
					<div className="pg-modal-showcase"><ProjectPreview project={selectedProject} expanded /></div>
					<div className="pg-modal-details">
						<p id={`pg-modal-description-${selectedProject.id}`}>{selectedProject.description}</p>
						<dl>
							<div><dt>Rol</dt><dd>{selectedProject.role}</dd></div>
							<div><dt>Estado</dt><dd>Ejemplo ficticio para el portfolio</dd></div>
						</dl>
						<div className="pg-stack">
							<h3>Tecnologías</h3>
							<ul>{selectedProject.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : null;

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
							aria-controls={`pg-modal-${project.id}`}
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
			{modal && createPortal(modal, document.body)}
		</>
	);
}
