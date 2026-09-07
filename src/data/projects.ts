import type { Project, ProjectMediaMap } from '../types/portfolio';
import { getPortfolioContent, type Locale } from '../i18n/content';
import { technologyCatalog } from './technologies';

const projectDefinitions = [
	{
		id: 'diseno',
		preview: 'diseno',
		className: 'project-auto',
		links: {
			es: [{ label: 'Colección de diseño', note: 'Piezas publicadas en Google Drive', url: 'https://drive.google.com/drive/u/0/folders/1aswlMHULvw-U8_CIb3BSNPTcdBHbosHF', kind: 'case-study' }],
			en: [{ label: 'Design collection', note: 'Published work on Google Drive', url: 'https://drive.google.com/drive/u/0/folders/1aswlMHULvw-U8_CIb3BSNPTcdBHbosHF', kind: 'case-study' }],
		},
		technologies: [technologyCatalog.photoshop, technologyCatalog.canva],
	},
	{
		id: 'auto-care',
		preview: 'auto-care',
		className: 'project-design',
		links: {
			es: [
				{ label: 'Repositorio frontend', note: 'Aplicación web', url: 'https://github.com/Adan-Alvarado/AutoCare_Club', kind: 'repository' },
				{ label: 'Repositorio backend', note: 'API', url: 'https://github.com/Adan-Alvarado/AutoCare_Club_Api', kind: 'repository' },
			],
			en: [
				{ label: 'Frontend repository', note: 'Web application', url: 'https://github.com/Adan-Alvarado/AutoCare_Club', kind: 'repository' },
				{ label: 'Backend repository', note: 'API', url: 'https://github.com/Adan-Alvarado/AutoCare_Club_Api', kind: 'repository' },
			],
		},
		technologies: [technologyCatalog.react, technologyCatalog.typescript, technologyCatalog.tailwind, technologyCatalog.dotnet, technologyCatalog.postgresql, technologyCatalog.docker],
	},
	{
		id: 'fixit',
		preview: 'fixit',
		className: 'project-fixit',
		links: {
			es: [{ label: 'Repositorio backend', note: 'API en .NET', url: 'https://github.com/Adan-Alvarado/FixIt', kind: 'repository' }],
			en: [{ label: 'Backend repository', note: '.NET API', url: 'https://github.com/Adan-Alvarado/FixIt', kind: 'repository' }],
		},
		technologies: [technologyCatalog.dotnet, technologyCatalog.sqlite],
	},
] as const;

const designGallery = (media: ProjectMediaMap['diseno']) =>
	(media ?? []).map((item, index) => ({
		id: `social-media-${String(index + 1).padStart(2, '0')}`,
		media: item,
	}));

export const getProjects = (locale: Locale, media: ProjectMediaMap = {}): readonly Project[] => {
	const copy = getPortfolioContent(locale).projects.items;
	return projectDefinitions.map((project) => ({
		...project,
		links: project.links[locale],
		...copy[project.id],
		media: media[project.id],
		gallery: project.id === 'diseno' ? designGallery(media.diseno) : undefined,
	}));
};
