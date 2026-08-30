import type { Technology } from './technology';

export type ProjectId = 'auto-care' | 'diseno' | 'fixit';

export type ProjectPreviewKind = ProjectId;

export type DesignGalleryVariant = 'one' | 'two' | 'three';

export interface DesignGalleryItem {
	id: string;
	eyebrow: string;
	title: string;
	caption: string;
	variant: DesignGalleryVariant;
}

export interface Project {
	id: ProjectId;
	preview: ProjectPreviewKind;
	title: string;
	className: string;
	description: string;
	role: string;
	repositoryUrl: string;
	technologies: readonly Technology[];
	gallery?: readonly DesignGalleryItem[];
}
