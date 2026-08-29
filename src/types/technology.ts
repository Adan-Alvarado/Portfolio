import type { SimpleIcon } from 'simple-icons';

export type TechnologyFallbackIcon = 'image' | 'layout' | 'monitor';

export interface Technology {
	label: string;
	iconName: string;
	color: string;
	size: number;
	simpleIcon?: SimpleIcon;
	fallbackIcon?: TechnologyFallbackIcon;
}

export interface TechnologyGroup {
	title: string;
	items: readonly Technology[];
}
