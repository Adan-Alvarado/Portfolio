import { getPortfolioContent, type Locale } from '../i18n/content';

export type ExperienceEntry = {
	role: string;
	year: string;
	description: string;
	className?: string;
};

export const getExperienceEntries = (locale: Locale): ExperienceEntry[] => [
	...getPortfolioContent(locale).experience.entries,
];
