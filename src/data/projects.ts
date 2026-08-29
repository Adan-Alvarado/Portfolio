import type { Project } from '../types/portfolio';
import { technologyCatalog } from './technologies';

export const projects = [
	{
		id: 'diseno',
		preview: 'diseno',
		title: 'Diseño Gráfico',
		className: 'project-auto',
		description: 'Selección conceptual de piezas editoriales y sistemas visuales creada para demostrar dirección de arte, composición y consistencia.',
		role: 'Dirección de arte y diseño gráfico',
		repositoryUrl: 'https://github.com/fabricio-portfolio-demo-inexistente/diseno-grafico-demo',
		technologies: [technologyCatalog.photoshop, technologyCatalog.corel, technologyCatalog.canva, technologyCatalog.figma],
	},
	{
		id: 'auto-care',
		preview: 'auto-care',
		title: 'Auto Care Club',
		className: 'project-design',
		description: 'Concepto de plataforma para organizar mantenimientos, alertas y el historial de un vehículo desde una experiencia clara y directa.',
		role: 'Diseño de producto y desarrollo frontend',
		repositoryUrl: 'https://github.com/fabricio-portfolio-demo-inexistente/auto-care-club-demo',
		technologies: [technologyCatalog.astro, technologyCatalog.react, technologyCatalog.typescript, technologyCatalog.tailwind],
	},
	{
		id: 'fixit',
		preview: 'fixit',
		title: 'Fixit API',
		className: 'project-fixit',
		description: 'API ficticia para registrar incidencias, asignar responsables y consultar el estado de cada solicitud mediante endpoints predecibles.',
		role: 'Diseño de API y desarrollo backend',
		repositoryUrl: 'https://github.com/fabricio-portfolio-demo-inexistente/fixit-api-demo',
		technologies: [technologyCatalog.dotnet, technologyCatalog.csharp, technologyCatalog.postgresql, technologyCatalog.docker],
	},
] as const satisfies readonly Project[];
