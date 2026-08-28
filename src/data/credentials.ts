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

const professionalCredential = {
	photo: {
		src: '/images/imagen card.jpeg',
		alt: 'Fabricio Alvarado en Copán, Honduras',
		width: 738,
		height: 1600,
	},
	primaryRole: {
		eyebrow: 'DISEÑADOR',
		title: 'GRAFICO',
	},
	secondaryRole: {
		eyebrow: 'DESARROLLADOR',
		title: 'JUNIOR',
	},
	location: 'Honduras',
} satisfies Omit<Credential, 'id'>;

export const credentials: Credential[] = [
	{ id: 'credential-01', ...professionalCredential },
	{ id: 'credential-02', ...professionalCredential },
	{ id: 'credential-03', ...professionalCredential },
	{ id: 'credential-04', ...professionalCredential },
	{ id: 'credential-05', ...professionalCredential },
	{ id: 'credential-06', ...professionalCredential },
];
