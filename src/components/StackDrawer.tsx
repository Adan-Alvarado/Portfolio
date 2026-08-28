import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Image, LayoutTemplate, MonitorCog, X } from 'lucide-react';
import {
	siAstro,
	siCss,
	siCoreldraw,
	siDocker,
	siDotnet,
	siFigma,
	siGit,
	siHtml5,
	siJavascript,
	siLinux,
	siMysql,
	siNodedotjs,
	siPostgresql,
	siReact,
	siTailwindcss,
	siTypescript,
} from 'simple-icons';
import BrandIcon from './BrandIcon';

const groups = [
	{
		title: 'Front-end',
		items: [
			{ label: 'HTML', icon: siHtml5, motion: 'motion-rise' },
			{ label: 'CSS', icon: siCss, motion: 'motion-tilt' },
			{ label: 'JavaScript', icon: siJavascript, motion: 'motion-pulse' },
			{ label: 'TypeScript', icon: siTypescript, motion: 'motion-rise' },
			{ label: 'React', icon: siReact, motion: 'motion-spin' },
			{ label: 'Astro', icon: siAstro, motion: 'motion-orbit' },
			{ label: 'Tailwind CSS', icon: siTailwindcss, motion: 'motion-wave' },
		],
	},
	{
		title: 'Back-end',
		items: [
			{ label: 'Node.js', icon: siNodedotjs, motion: 'motion-tilt' },
			{ label: 'C#', icon: siDotnet, motion: 'motion-pulse' },
			{ label: 'MySQL', icon: siMysql, motion: 'motion-wave' },
			{ label: 'PostgreSQL', icon: siPostgresql, motion: 'motion-tilt' },
		],
	},
	{
		title: 'Diseño',
		items: [
			{ label: 'Figma', icon: siFigma, motion: 'motion-rise' },
			{ label: 'Photoshop', LucideIcon: Image, motion: 'motion-pulse' },
			{ label: 'CorelDRAW', icon: siCoreldraw, motion: 'motion-tilt' },
			{ label: 'Canva', LucideIcon: LayoutTemplate, motion: 'motion-wave' },
		],
	},
];

const environments = [
	{ label: 'Git', icon: siGit, motion: 'motion-orbit' },
	{ label: 'Docker', icon: siDocker, motion: 'motion-float' },
	{ label: 'Linux', icon: siLinux, motion: 'motion-tilt' },
	{ label: 'Windows', LucideIcon: MonitorCog, motion: 'motion-pulse' },
];

export default function StackDrawer() {
	const [open, setOpen] = useState(false);
	const [closing, setClosing] = useState(false);
	const closeButton = useRef<HTMLButtonElement>(null);
	const drawer = useRef<HTMLElement>(null);
	const trigger = useRef<HTMLButtonElement>(null);
	const closeTimer = useRef<number | null>(null);

	const closeDrawer = () => {
		if (closing) return;
		setClosing(true);
		closeTimer.current = window.setTimeout(() => {
			setOpen(false);
			setClosing(false);
			requestAnimationFrame(() => trigger.current?.focus());
		}, 280);
	};

	useEffect(() => () => {
		if (closeTimer.current) window.clearTimeout(closeTimer.current);
	}, []);

	useEffect(() => {
		if (!open) return;

		const handleKeyboard = (event: KeyboardEvent) => {
			if (event.key === 'Escape') closeDrawer();
			if (event.key === 'Tab') {
				const focusable = drawer.current?.querySelectorAll<HTMLElement>('button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])');
				if (!focusable?.length) return;
				const first = focusable[0];
				const last = focusable[focusable.length - 1];
				if (event.shiftKey && document.activeElement === first) {
					event.preventDefault();
					last.focus();
				} else if (!event.shiftKey && document.activeElement === last) {
					event.preventDefault();
					first.focus();
				}
			}
		};

		window.addEventListener('keydown', handleKeyboard);
		document.body.style.overflow = 'hidden';
		closeButton.current?.focus();

		return () => {
			window.removeEventListener('keydown', handleKeyboard);
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<>
			<button ref={trigger} type="button" onClick={() => { setClosing(false); setOpen(true); }} className="stack-open-button">
				Ver detalles
			</button>

			{open && typeof document !== 'undefined' && createPortal(
				<div className={`drawer-layer ${closing ? 'is-closing' : ''}`}>
					<button type="button" aria-label="Cerrar detalle del stack" onClick={closeDrawer} className="drawer-backdrop" />
					<aside ref={drawer} role="dialog" aria-modal="true" aria-labelledby="stack-drawer-title" className="stack-drawer">
						<header>
							<div>
								<p>[ Stack tecnológico ]</p>
								<h2 id="stack-drawer-title">Mis herramientas</h2>
							</div>
							<button ref={closeButton} type="button" onClick={closeDrawer} aria-label="Cerrar"><X width="25" height="25" aria-hidden="true" /></button>
						</header>

						<div className="drawer-groups">
							{groups.map((group, index) => (
								<section key={group.title} className={index === 0 ? 'primary-group' : ''}>
									<h3>{group.title}</h3>
									<ul>
										{group.items.map((item) => <li key={item.label} className={`drawer-technology ${item.motion}`} tabIndex={0}>{'icon' in item ? <BrandIcon icon={item.icon} width="15" height="15" aria-hidden="true" /> : <item.LucideIcon width="15" height="15" aria-hidden="true" />}{item.label}</li>)}
									</ul>
								</section>
							))}
						</div>

						<footer>
							<span>Herramientas y entornos</span>
							<ul>{environments.map((item) => <li key={item.label} className={`drawer-technology ${item.motion}`} tabIndex={0}>{'icon' in item ? <BrandIcon icon={item.icon} width="15" height="15" aria-hidden="true" /> : <item.LucideIcon width="15" height="15" aria-hidden="true" />}{item.label}</li>)}</ul>
						</footer>
					</aside>
				</div>,
				document.body,
			)}
		</>
	);
}
