import type { Technology } from './technology';

export type ProjectId = 'auto-care' | 'diseno' | 'fixit';

export type ProjectPreviewKind = ProjectId;

export interface Project {
	id: ProjectId;
	preview: ProjectPreviewKind;
	title: string;
	className: string;
	description: string;
	role: string;
	repositoryUrl: string;
	technologies: readonly Technology[];
}
