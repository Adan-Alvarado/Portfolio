import type { Technology } from './technology';

export type ProjectId = 'auto-care' | 'diseno' | 'fixit';

export type ProjectPreviewKind = ProjectId;

export interface PortfolioMedia {
	src: string;
	alt: string;
	width: number;
	height: number;
}

export type ProjectMediaMap = Partial<Record<ProjectId, readonly PortfolioMedia[]>>;

export interface DesignGalleryItem {
	id: string;
	media?: PortfolioMedia;
}

export interface Certificate {
	id: string;
	title: string;
	issuer: string;
	date: string;
	url: string;
	thumbnail?: PortfolioMedia;
}

export interface PersonalPhoto extends PortfolioMedia {
	id: string;
	caption: string;
	thumbnail?: PortfolioMedia;
}

export interface ProjectLink {
	label: string;
	note?: string;
	url: string;
	kind: 'repository' | 'case-study' | 'demo';
}

export interface CredentialBackContent {
	certificates: readonly Certificate[];
	photos: readonly PersonalPhoto[];
}

export interface Project {
	id: ProjectId;
	preview: ProjectPreviewKind;
	title: string;
	className: string;
	description: string;
	role: string;
	challenge?: string;
	contribution?: string;
	outcome?: string;
	media?: readonly PortfolioMedia[];
	links?: readonly ProjectLink[];
	repositoryVisibility?: 'private' | 'unavailable';
	technologies: readonly Technology[];
	gallery?: readonly DesignGalleryItem[];
}
