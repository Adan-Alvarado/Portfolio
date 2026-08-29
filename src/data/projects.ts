import type { Project } from '../types/portfolio';

export const projects = [
	{
		id: 'auto-care',
		preview: 'auto-care',
		title: 'Auto Care Club',
		className: 'project-auto',
		description: 'Concepto de plataforma para organizar mantenimientos, alertas y el historial de un vehículo desde una experiencia clara y directa.',
		role: 'Diseño de producto y desarrollo frontend',
		technologies: ['Astro', 'React', 'TypeScript', 'Tailwind CSS'],
	},
	{
		id: 'diseno',
		preview: 'diseno',
		title: 'Diseño Gráfico',
		className: 'project-design',
		description: 'Selección conceptual de piezas editoriales y sistemas visuales creada para demostrar dirección de arte, composición y consistencia.',
		role: 'Dirección de arte y diseño gráfico',
		technologies: ['Photoshop', 'CorelDRAW', 'Canva', 'Figma'],
	},
	{
		id: 'fixit',
		preview: 'fixit',
		title: 'Fixit API',
		className: 'project-fixit',
		description: 'API ficticia para registrar incidencias, asignar responsables y consultar el estado de cada solicitud mediante endpoints predecibles.',
		role: 'Diseño de API y desarrollo backend',
		technologies: ['.NET', 'C#', 'PostgreSQL', 'Docker'],
	},
] as const satisfies readonly Project[];

