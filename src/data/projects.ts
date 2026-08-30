import type { Project } from '../types/portfolio';
import { getPortfolioContent, type Locale } from '../i18n/content';
import { technologyCatalog } from './technologies';

const projectDefinitions = [
	{
		id: 'diseno',
		preview: 'diseno',
		className: 'project-auto',
		repositoryUrl: 'https://github.com/fabricio-portfolio-demo-inexistente/diseno-grafico-demo',
		technologies: [technologyCatalog.photoshop, technologyCatalog.corel, technologyCatalog.canva, technologyCatalog.figma],
	},
	{
		id: 'auto-care',
		preview: 'auto-care',
		className: 'project-design',
		repositoryUrl: 'https://github.com/fabricio-portfolio-demo-inexistente/auto-care-club-demo',
		technologies: [technologyCatalog.astro, technologyCatalog.react, technologyCatalog.typescript, technologyCatalog.tailwind],
	},
	{
		id: 'fixit',
		preview: 'fixit',
		className: 'project-fixit',
		repositoryUrl: 'https://github.com/fabricio-portfolio-demo-inexistente/fixit-api-demo',
		technologies: [technologyCatalog.dotnet, technologyCatalog.csharp, technologyCatalog.postgresql, technologyCatalog.docker],
	},
] as const;

const designGallery = (locale: Locale) => locale === 'es' ? [
	{ id: 'casa-nomada', eyebrow: 'IDENTIDAD / 01', title: 'CASA\nNÓMADA', caption: 'Sistema visual', variant: 'one' },
	{ id: 'fruta-24', eyebrow: 'CAMPAÑA / 02', title: 'FRUTA\n24', caption: 'FRESCO · LOCAL · DIARIO', variant: 'two' },
	{ id: 'ritmo', eyebrow: 'EDITORIAL / 03', title: 'RITMO', caption: 'VOL. 08', variant: 'three' },
] as const : [
	{ id: 'casa-nomada', eyebrow: 'IDENTITY / 01', title: 'CASA\nNÓMADA', caption: 'Visual system', variant: 'one' },
	{ id: 'fruta-24', eyebrow: 'CAMPAIGN / 02', title: 'FRUTA\n24', caption: 'FRESH · LOCAL · DAILY', variant: 'two' },
	{ id: 'ritmo', eyebrow: 'EDITORIAL / 03', title: 'RITMO', caption: 'VOL. 08', variant: 'three' },
] as const;

export const getProjects = (locale: Locale): readonly Project[] => {
	const copy = getPortfolioContent(locale).projects.items;
	return projectDefinitions.map((project) => ({
		...project,
		...copy[project.id],
		gallery: project.id === 'diseno' ? designGallery(locale) : undefined,
	}));
};
