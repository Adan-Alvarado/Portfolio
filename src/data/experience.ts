export type ExperienceEntry = {
	role: string;
	year: string;
	description: string;
	className?: string;
};

export const experienceEntries: ExperienceEntry[] = [
	{
		role: 'Diseñador Gráfico',
		year: '2024 — Actualidad',
		description: 'He creado contenido visual para más de 70 marcas, desarrollando piezas gráficas e identidades visuales para fortalecer su comunicación y presencia digital.',
	},
	{
		role: 'TI / Vendedor /\nAsistente de Bodega',
		year: '2022',
		description: 'Atención al cliente y cierre de ventas en tienda física con gestión de inventario y logística en bodega y soporte técnico en reparación de equipos informáticos.',
		className: 'secondary-role',
	},
];
