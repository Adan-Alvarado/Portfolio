import { getPortfolioContent, type Locale } from '../i18n/content';

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

const professionalCredential = (locale: Locale, photo: Credential['photo']) => {
	const copy = getPortfolioContent(locale).experience;
	return {
	photo,
	primaryRole: { eyebrow: copy.primaryRole[0], title: copy.primaryRole[1] },
	secondaryRole: { eyebrow: copy.secondaryRole[0], title: copy.secondaryRole[1] },
	location: copy.location,
	} satisfies Omit<Credential, 'id'>;
};

export const getCredentials = (locale: Locale, photo: Credential['photo']): Credential[] => {
	const credential = professionalCredential(locale, photo);
	return Array.from({ length: 6 }, (_, index) => ({ id: `credential-0${index + 1}`, ...credential }));
};
