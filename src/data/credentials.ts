export interface Credential {
	id: string;
	photo: {
		src: string;
		alt: string;
		width: number;
		height: number;
	};
	primaryRole: {
		eyebrow: string;
		title: string;
	};
	secondaryRole: {
		eyebrow: string;
		title: string;
	};
	location: string;
}

const professionalCredential = (locale: Locale) => {
	const copy = getPortfolioContent(locale).experience;
	return {
	photo: {
		src: '/images/imagen card.jpeg',
		alt: 'Fabricio Alvarado en Copán, Honduras',
		width: 738,
		height: 1600,
	},
	primaryRole: { eyebrow: copy.primaryRole[0], title: copy.primaryRole[1] },
	secondaryRole: { eyebrow: copy.secondaryRole[0], title: copy.secondaryRole[1] },
	location: copy.location,
	} satisfies Omit<Credential, 'id'>;
};

export const getCredentials = (locale: Locale): Credential[] => {
	const credential = professionalCredential(locale);
	return Array.from({ length: 6 }, (_, index) => ({ id: `credential-0${index + 1}`, ...credential }));
};
import { getPortfolioContent, type Locale } from '../i18n/content';
