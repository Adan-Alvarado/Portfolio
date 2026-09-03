// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-iconset';

// https://astro.build/config
export default defineConfig({
	integrations: [react(), icon()],
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Inter',
			cssVariable: '--font-inter',
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/inter-latin-variable.woff2'],
						weight: '100 900',
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/inter-latin-600-italic.woff2'],
						weight: '600',
						style: 'italic',
						display: 'swap',
					},
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'Inspiration',
			cssVariable: '--font-inspiration',
			options: {
				variants: [{
					src: ['./src/assets/fonts/inspiration-latin-400.woff2'],
					weight: '400',
					style: 'normal',
					display: 'swap',
				}],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'Kite One',
			cssVariable: '--font-kite-one',
			options: {
				variants: [{
					src: ['./src/assets/fonts/kite-one-latin-400.woff2'],
					weight: '400',
					style: 'normal',
					display: 'swap',
				}],
			},
		},
	],
	i18n: {
		locales: ['es', 'en'],
		defaultLocale: 'es',
		routing: { prefixDefaultLocale: false },
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
