import {
	siAstro,
	siCss,
	siCoreldraw,
	siDocker,
	siDotnet,
	siFigma,
	siGit,
	siHtml5,
	siJavascript,
	siLinux,
	siMysql,
	siNodedotjs,
	siPostgresql,
	siReact,
	siTailwindcss,
	siTypescript,
} from 'simple-icons';
import type { Technology, TechnologyGroup } from '../types/technology';

export type { Technology, TechnologyGroup } from '../types/technology';

export const technologyCatalog = {
	html: { label: 'HTML', iconName: 'simple-icons:html5', color: `#${siHtml5.hex}`, size: 20, simpleIcon: siHtml5 },
	css: { label: 'CSS', iconName: 'simple-icons:css', color: `#${siCss.hex}`, size: 20, simpleIcon: siCss },
	javascript: { label: 'JavaScript', iconName: 'simple-icons:javascript', color: `#${siJavascript.hex}`, size: 18, simpleIcon: siJavascript },
	typescript: { label: 'TypeScript', iconName: 'simple-icons:typescript', color: `#${siTypescript.hex}`, size: 18, simpleIcon: siTypescript },
	react: { label: 'React', iconName: 'simple-icons:react', color: `#${siReact.hex}`, size: 19, simpleIcon: siReact },
	astro: { label: 'Astro', iconName: 'simple-icons:astro', color: `#${siAstro.hex}`, size: 20, simpleIcon: siAstro },
	tailwind: { label: 'Tailwind CSS', iconName: 'simple-icons:tailwindcss', color: `#${siTailwindcss.hex}`, size: 21, simpleIcon: siTailwindcss },
	node: { label: 'Node.js', iconName: 'simple-icons:nodedotjs', color: `#${siNodedotjs.hex}`, size: 19, simpleIcon: siNodedotjs },
	dotnet: { label: '.NET', iconName: 'simple-icons:dotnet', color: `#${siDotnet.hex}`, size: 19, simpleIcon: siDotnet },
	csharp: { label: 'C#', iconName: 'simple-icons:csharp', color: `#${siDotnet.hex}`, size: 19, simpleIcon: siDotnet },
	mysql: { label: 'MySQL', iconName: 'simple-icons:mysql', color: `#${siMysql.hex}`, size: 23, simpleIcon: siMysql },
	postgresql: { label: 'PostgreSQL', iconName: 'simple-icons:postgresql', color: `#${siPostgresql.hex}`, size: 20, simpleIcon: siPostgresql },
	docker: { label: 'Docker', iconName: 'simple-icons:docker', color: `#${siDocker.hex}`, size: 22, simpleIcon: siDocker },
	figma: { label: 'Figma', iconName: 'simple-icons:figma', color: `#${siFigma.hex}`, size: 18, simpleIcon: siFigma },
	git: { label: 'Git', iconName: 'simple-icons:git', color: `#${siGit.hex}`, size: 19, simpleIcon: siGit },
	corel: { label: 'CorelDRAW', iconName: 'simple-icons:coreldraw', color: `#${siCoreldraw.hex}`, size: 18, simpleIcon: siCoreldraw },
	linux: { label: 'Linux', iconName: 'simple-icons:linux', color: `#${siLinux.hex}`, size: 18, simpleIcon: siLinux },
	photoshop: { label: 'Photoshop', iconName: 'lucide:image', color: '#31a8ff', size: 18, fallbackIcon: 'image' },
	canva: { label: 'Canva', iconName: 'lucide:layout-template', color: '#00c4cc', size: 18, fallbackIcon: 'layout' },
	windows: { label: 'Windows', iconName: 'lucide:monitor-cog', color: '#0078d4', size: 18, fallbackIcon: 'monitor' },
} as const satisfies Record<string, Technology>;

export const stripTechnologies: readonly Technology[] = [
	technologyCatalog.html,
	technologyCatalog.css,
	technologyCatalog.javascript,
	technologyCatalog.typescript,
	technologyCatalog.react,
	technologyCatalog.astro,
	technologyCatalog.tailwind,
	technologyCatalog.node,
	technologyCatalog.csharp,
	technologyCatalog.mysql,
	technologyCatalog.postgresql,
	technologyCatalog.docker,
	technologyCatalog.figma,
	technologyCatalog.git,
];

export const technologyGroups: readonly TechnologyGroup[] = [
	{ title: 'Front-end', items: stripTechnologies.slice(0, 7) },
	{ title: 'Back-end', items: [technologyCatalog.node, technologyCatalog.csharp, technologyCatalog.mysql, technologyCatalog.postgresql] },
	{ title: 'Diseño', items: [technologyCatalog.figma, technologyCatalog.photoshop, technologyCatalog.corel, technologyCatalog.canva] },
];

export const environmentTechnologies: readonly Technology[] = [
	technologyCatalog.git,
	technologyCatalog.docker,
	technologyCatalog.linux,
	technologyCatalog.windows,
];
