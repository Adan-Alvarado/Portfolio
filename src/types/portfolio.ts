export type ProjectId = 'auto-care' | 'diseno' | 'fixit';

export type ProjectPreviewKind = ProjectId;

export interface Project {
	id: ProjectId;
	preview: ProjectPreviewKind;
	title: string;
	className: string;
	description: string;
	role: string;
	technologies: readonly string[];
}

export type TechnologyFallbackIcon = 'image' | 'layout' | 'monitor';

