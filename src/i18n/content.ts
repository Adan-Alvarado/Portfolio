import type { ProjectId } from '../types/portfolio';

export type Locale = 'es' | 'en';

export interface LocalizedProjectCopy {
	title: string;
	description: string;
	role: string;
	challenge: string;
	contribution: string;
	outcome: string;
}

export interface LocalizedPortfolioContent {
	meta: { title: string; description: string };
	skipLink: string;
	navigation: {
		label: string;
		items: readonly { label: string; href: `#${string}`; icon: string }[];
	};
	dock: {
		languageLabel: string;
	};
	hero: {
		kicker: string;
		titleAria: string;
		downloadCv: string;
		cvLanguage: string;
		availability: readonly [string, string];
		characterAlt: string;
		statsLabel: string;
		stats: readonly { value: string; lines: readonly [string, string]; emphasis: 0 | 1 }[];
		technologiesLabel: string;
	};
	experience: {
		kicker: string;
		titleLead: string;
		titleAccent: string;
		student: readonly [string, string];
		entries: readonly {
			role: string;
			year: string;
			description: string;
			className?: string;
		}[];
		carouselLabel: string;
		credentialLabel: string;
		location: string;
		primaryRole: readonly [string, string];
		secondaryRole: readonly [string, string];
		reverse: string;
		socials: string;
		reverseUnavailable: string;
		back: {
			title: string;
			certificates: string;
			certificateCount: string;
			photography: string;
			photoCount: string;
			openCertificates: string;
			openPhotography: string;
			returnToFront: string;
			close: string;
			previous: string;
			next: string;
			verifiedLink: string;
		};
	};
	projects: {
		kicker: string;
		heading: readonly [string, string, string];
		bio: readonly [string, string, string];
		characterAlt: string;
		galleryLabel: string;
		openCase: string;
		seeCase: string;
		modalEyebrow: string;
		close: string;
		role: string;
		challenge: string;
		contribution: string;
		outcome: string;
		repositoryNote: string;
		technologies: string;
		galleryPrevious: string;
		galleryNext: string;
		galleryItem: string;
		items: Record<ProjectId, LocalizedProjectCopy>;
		preview: {
			productScreenshot: string;
			designSelection: string;
			apiScreenshot: string;
		};
		stack: {
			title: string;
			open: string;
			eyebrow: string;
			heading: string;
			close: string;
			groups: readonly [string, string, string];
			environment: string;
		};
	};
	contact: {
		kicker: string;
		heading: readonly [string, string, string];
		body: readonly string[];
		characterAlt: string;
		details: readonly { term: string; value: string }[];
		footer: readonly [string, string];
		terminal: {
			title: string;
			reset: string;
			intro: readonly [string, string];
			prompts: readonly [string, string, string];
			labels: readonly [string, string, string];
			send: string;
			errors: readonly [string, string, string, string];
			ready: string;
			resetFeedback: string;
			sending: string;
			sent: string;
			sendError: string;
			retry: string;
			configurationMissing: string;
			shortcut: string;
		};
	};
}

const sharedNavigation = (labels: readonly [string, string, string, string]) => [
	{ label: labels[0], href: '#inicio', icon: 'lucide:house' },
	{ label: labels[1], href: '#experiencia', icon: 'lucide:user-round' },
	{ label: labels[2], href: '#proyectos', icon: 'lucide:folder' },
	{ label: labels[3], href: '#contacto', icon: 'lucide:smartphone' },
] as const;

export const portfolioContent: Record<Locale, LocalizedPortfolioContent> = {
	es: {
		meta: { title: 'Fabricio — Desarrollo y diseño', description: 'Portfolio de desarrollo full stack y diseño digital.' },
		skipLink: 'Saltar al contenido',
		navigation: { label: 'Navegación principal', items: sharedNavigation(['Inicio', 'Experiencia', 'Proyectos', 'Contacto']) },
		dock: {
			languageLabel: 'Cambiar idioma',
		},
		hero: {
			kicker: '[ “ Trabajemos Juntos ” ]', titleAria: 'Developer más designer', downloadCv: 'Descargar CV',
			cvLanguage: 'Currículum disponible en español',
			availability: ['Disponible para proyectos', 'freelance o ver One Piece'],
			characterAlt: 'Capibara pixelada sosteniendo una taza', statsLabel: 'Resumen de experiencia',
			stats: [
				{ value: '+3', lines: ['años', 'de experiencia'], emphasis: 0 },
				{ value: '+4300', lines: ['piezas gráficas', 'completadas'], emphasis: 1 },
				{ value: '+4', lines: ['proyectos', 'desarrollados'], emphasis: 0 },
			],
			technologiesLabel: 'Tecnologías utilizadas',
		},
		experience: {
			kicker: '[ Experiencia laboral ]', titleLead: 'Mi', titleAccent: 'recorrido', student: ['Estudiante de', 'Ingeniería en Sistemas'],
			entries: [
				{ role: 'Diseñador Gráfico', year: '2024 — Actualidad', description: 'He creado contenido visual para más de 70 marcas, desarrollando piezas gráficas e identidades visuales para fortalecer su comunicación y presencia digital.' },
				{ role: 'TI / Vendedor /\nAsistente de Bodega', year: '2022', description: 'Atención al cliente y cierre de ventas en tienda física con gestión de inventario y logística en bodega y soporte técnico en reparación de equipos informáticos.', className: 'secondary-role' },
			],
			carouselLabel: 'Credencial profesional', credentialLabel: 'Credencial profesional de Fabricio Alvarado', location: 'Honduras',
			primaryRole: ['DISEÑADOR', 'GRAFICO'], secondaryRole: ['DESARROLLADOR', 'JUNIOR'], reverse: 'Ver reverso', socials: 'Redes sociales', reverseUnavailable: 'Reverso no disponible',
			back: {
				title: 'Detrás del perfil', certificates: 'Certificados', certificateCount: 'credenciales verificables',
				photography: 'Fotografía', photoCount: 'fotografías seleccionadas', openCertificates: 'Ver certificados',
				openPhotography: 'Abrir colección', returnToFront: 'Volver al frente', close: 'Cerrar',
				previous: 'Fotografía anterior', next: 'Fotografía siguiente', verifiedLink: 'Ver credencial',
			},
		},
		projects: {
			kicker: '[“¿Tienes algo en mente?”]', heading: ['Vamos a', 'construir', 'algo'],
			bio: ['Soy una persona', 'alegre, propositiva y autodidacta.', 'Siempre busco ir más allá de lo esperado, optimizar procesos y aportar soluciones creativas.'],
			characterAlt: 'Pingüino pixelado sosteniendo una herramienta', galleryLabel: 'Selección de proyectos',
			openCase: 'Abrir caso', seeCase: 'Ver caso', modalEyebrow: 'Caso de proyecto', close: 'Cerrar',
			role: 'Rol', challenge: 'Contexto', contribution: 'Contribución', outcome: 'Resultado',
			repositoryNote: 'Repositorio privado o no disponible', technologies: 'Tecnologías', galleryPrevious: 'Pieza anterior',
			galleryNext: 'Pieza siguiente', galleryItem: 'Pieza',
			items: {
				diseno: { title: 'Diseño Gráfico', description: 'Selección real de piezas de social media creadas para marcas y comunicaciones digitales.', role: 'Dirección de arte y diseño gráfico', challenge: 'Traducir distintos objetivos de comunicación en piezas claras, atractivas y consistentes.', contribution: 'Concepto visual, composición y producción gráfica con Photoshop y Canva.', outcome: 'Colección de trabajos publicada en Google Drive para su revisión.' },
				'auto-care': { title: 'Auto Care Club', description: 'Aplicación full stack para gestionar la atención de un taller automotriz.', role: 'Desarrollo full stack', challenge: 'Unificar clientes, vehículos, servicios, carrito, citas, pagos y operación interna con acceso por roles.', contribution: 'React, TypeScript y Tailwind CSS; ASP.NET Core, PostgreSQL y Docker; Stripe de prueba, JWT y roles.', outcome: 'Flujos diferenciados para clientes, administradores y técnicos, desde la cita hasta la actualización del trabajo.' },
				fixit: { title: 'Fixit API', description: 'API para reportar problemas urbanos y canalizarlos hacia las instituciones responsables.', role: 'Diseño de API y desarrollo backend', challenge: 'Estructurar incidencias como baches, animales muertos y otros problemas de atención municipal o de emergencia.', contribution: 'Backend desarrollado con .NET y SQLite para registrar y dar seguimiento a cada reporte.', outcome: 'Base funcional para centralizar reportes ciudadanos y dirigirlos a municipalidades, emergencias u otras entidades.' },
			},
			preview: { productScreenshot: 'Captura del producto', designSelection: 'Selección visual', apiScreenshot: 'Captura de la API' },
			stack: { title: 'Stack Tecnológico', open: 'Ver detalles', eyebrow: '[ Stack tecnológico ]', heading: 'Mis herramientas', close: 'Cerrar', groups: ['Front-end', 'Back-end', 'Diseño'], environment: 'Herramientas y entornos' },
		},
		contact: {
			kicker: '[ Hablemos ]', heading: ['¿Tienes algo', 'en', 'mente?'],
			body: ['Estoy siempre abierto a nuevos', 'desafíos, colaboraciones y', 'oportunidades creativas.', 'Cuéntame tu idea y veamos', 'cómo podemos construir algo', 'increíble juntos.'],
			characterAlt: 'Paloma pixelada sosteniendo una taza de café',
			details: [{ term: 'Ubicación', value: 'Copán, Honduras' }, { term: 'Email', value: 'alvaradoadan55@gmail.com' }, { term: 'Disponibilidad', value: 'Lunes a Sábado' }],
			footer: ['@2026 --- Fabricio Alvarado | Todos los derechos reservados', '</> Hecho con pasión y un poco de café'],
			terminal: {
				title: 'terminal@contacto', reset: 'Reiniciar terminal', intro: ['> Cuéntame sobre tu proyecto, idea o simplemente', 'salúdame. Estoy aquí para leerte...'],
				prompts: ['Tu@mensaje: ~$ correo:', 'Tu@mensaje: ~$ asunto:', 'Tu@mensaje: ~$ mensaje:'], labels: ['Correo', 'Asunto', 'Mensaje'], send: 'Enviar Mensaje',
				errors: ['El correo no tiene un formato válido.', 'Debes ingresar tu correo.', 'Debes ingresar el asunto.', 'Debes escribir un mensaje.'],
				ready: 'Mensaje listo. Puedes enviarlo.', resetFeedback: 'Terminal reiniciada.',
				sending: 'Enviando mensaje…', sent: 'Mensaje enviado. Te responderé lo antes posible.',
				sendError: 'No se pudo enviar. Revisa tu conexión e inténtalo de nuevo.', retry: 'Reintentar',
				configurationMissing: 'El formulario aún no está configurado. Puedes escribirme al correo visible.',
				shortcut: 'Ctrl o Cmd + Enter para enviar.',
			},
		},
	},
	en: {
		meta: { title: 'Fabricio — Development and design', description: 'Full-stack development and digital design portfolio.' },
		skipLink: 'Skip to content',
		navigation: { label: 'Main navigation', items: sharedNavigation(['Home', 'Experience', 'Projects', 'Contact']) },
		dock: {
			languageLabel: 'Change language',
		},
		hero: {
			kicker: '[ “ Let’s Work Together ” ]', titleAria: 'Developer plus designer', downloadCv: 'Download résumé',
			cvLanguage: 'Résumé currently available in Spanish',
			availability: ['Available for freelance', 'projects or watching One Piece'],
			characterAlt: 'Pixel-art capybara holding a mug', statsLabel: 'Experience summary',
			stats: [
				{ value: '+3', lines: ['years', 'of experience'], emphasis: 0 },
				{ value: '+4300', lines: ['graphic pieces', 'completed'], emphasis: 1 },
				{ value: '+4', lines: ['projects', 'developed'], emphasis: 0 },
			],
			technologiesLabel: 'Technologies used',
		},
		experience: {
			kicker: '[ Professional experience ]', titleLead: 'My', titleAccent: 'journey', student: ['Systems Engineering', 'student'],
			entries: [
				{ role: 'Graphic Designer', year: '2024 — Present', description: 'I have created visual content for more than 70 brands, developing graphic pieces and visual identities that strengthen their communication and digital presence.' },
				{ role: 'IT / Sales /\nWarehouse Assistant', year: '2022', description: 'Customer service and in-store sales, inventory and warehouse logistics management, plus technical support and computer equipment repair.', className: 'secondary-role' },
			],
			carouselLabel: 'Professional credential', credentialLabel: 'Fabricio Alvarado professional credential', location: 'Honduras',
			primaryRole: ['GRAPHIC', 'DESIGNER'], secondaryRole: ['DEVELOPER', 'JUNIOR'], reverse: 'View back', socials: 'Social profiles', reverseUnavailable: 'Back side unavailable',
			back: {
				title: 'Behind the profile', certificates: 'Certificates', certificateCount: 'verifiable credentials',
				photography: 'Photography', photoCount: 'selected photographs', openCertificates: 'View certificates',
				openPhotography: 'Open collection', returnToFront: 'Return to front', close: 'Close',
				previous: 'Previous photograph', next: 'Next photograph', verifiedLink: 'View credential',
			},
		},
		projects: {
			kicker: '[“Have something in mind?”]', heading: ['Let’s', 'build', 'something'],
			bio: ['I am a', 'cheerful, proactive and self-taught person.', 'I always aim beyond expectations, optimize processes and contribute creative solutions.'],
			characterAlt: 'Pixel-art penguin holding a tool', galleryLabel: 'Project selection',
			openCase: 'Open case', seeCase: 'View case', modalEyebrow: 'Project case', close: 'Close',
			role: 'Role', challenge: 'Context', contribution: 'Contribution', outcome: 'Outcome',
			repositoryNote: 'Private or unavailable repository', technologies: 'Technologies', galleryPrevious: 'Previous piece',
			galleryNext: 'Next piece', galleryItem: 'Piece',
			items: {
				diseno: { title: 'Graphic Design', description: 'A real selection of social media pieces created for brands and digital communications.', role: 'Art direction and graphic design', challenge: 'Translate different communication goals into clear, engaging and consistent pieces.', contribution: 'Visual concept, composition and graphic production with Photoshop and Canva.', outcome: 'A published collection of work available for review on Google Drive.' },
				'auto-care': { title: 'Auto Care Club', description: 'A full-stack application for managing an automotive workshop service process.', role: 'Full-stack development', challenge: 'Unify customers, vehicles, services, carts, appointments, payments and internal operations with role-based access.', contribution: 'React, TypeScript and Tailwind CSS; ASP.NET Core, PostgreSQL and Docker; Stripe test payments, JWT and roles.', outcome: 'Dedicated flows for customers, administrators and technicians, from booking to job-status updates.' },
				fixit: { title: 'Fixit API', description: 'An API for reporting urban problems and routing them to the responsible institutions.', role: 'API design and backend development', challenge: 'Structure incidents such as potholes, dead animals and other municipal or emergency issues.', contribution: 'Backend built with .NET and SQLite to register and track each report.', outcome: 'A functional foundation for centralizing citizen reports and routing them to municipalities, emergency services or other entities.' },
			},
			preview: { productScreenshot: 'Product screenshot', designSelection: 'Visual selection', apiScreenshot: 'API screenshot' },
			stack: { title: 'Technology Stack', open: 'View details', eyebrow: '[ Technology stack ]', heading: 'My tools', close: 'Close', groups: ['Front-end', 'Back-end', 'Design'], environment: 'Tools and environments' },
		},
		contact: {
			kicker: '[ Let’s talk ]', heading: ['Have something', 'in', 'mind?'],
			body: ['I am always open to new', 'challenges, collaborations and', 'creative opportunities.', 'Tell me about your idea and let’s see', 'how we can build something', 'remarkable together.'],
			characterAlt: 'Pixel-art pigeon holding a coffee mug',
			details: [{ term: 'Location', value: 'Copán, Honduras' }, { term: 'Email', value: 'alvaradoadan55@gmail.com' }, { term: 'Availability', value: 'Monday to Saturday' }],
			footer: ['@2026 --- Fabricio Alvarado | All rights reserved', '</> Made with passion and a little coffee'],
			terminal: {
				title: 'terminal@contact', reset: 'Reset terminal', intro: ['> Tell me about your project, idea or simply', 'say hello. I’m here to read you...'],
				prompts: ['You@message: ~$ email:', 'You@message: ~$ subject:', 'You@message: ~$ message:'], labels: ['Email', 'Subject', 'Message'], send: 'Send Message',
				errors: ['The email format is not valid.', 'Enter your email address.', 'Enter a subject.', 'Write a message.'],
				ready: 'Your message is ready to send.', resetFeedback: 'Terminal reset.',
				sending: 'Sending message…', sent: 'Message sent. I will get back to you soon.',
				sendError: 'The message could not be sent. Check your connection and try again.', retry: 'Try again',
				configurationMissing: 'The form is not configured yet. You can use the visible email address instead.',
				shortcut: 'Press Ctrl or Cmd + Enter to send.',
			},
		},
	},
};

export const getPortfolioContent = (locale: Locale) => portfolioContent[locale];

export const localePath = (locale: Locale, hash = '') => `${locale === 'es' ? '/' : '/en/'}${hash}`;
