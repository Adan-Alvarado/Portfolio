import { useRef, useState, type CSSProperties } from 'react';
import { Image, LayoutTemplate, MonitorCog, X, type LucideIcon } from 'lucide-react';
import {
	environmentTechnologies,
	technologyGroups,
	type Technology,
} from '../data/technologies';
import BrandIcon from './BrandIcon';
import Dialog from './ui/Dialog';
import './StackDrawer.css';

const fallbackIcons: Record<NonNullable<Technology['fallbackIcon']>, LucideIcon> = {
	image: Image,
	layout: LayoutTemplate,
	monitor: MonitorCog,
};

function TechnologyItem({ technology }: { technology: Technology }) {
	const FallbackIcon = technology.fallbackIcon ? fallbackIcons[technology.fallbackIcon] : null;
	return (
		<li
			className="drawer-technology"
			style={{ '--technology-color': technology.color } as CSSProperties}
			tabIndex={0}
		>
			{technology.simpleIcon ? (
				<BrandIcon icon={technology.simpleIcon} width="15" height="15" aria-hidden="true" />
			) : FallbackIcon ? (
				<FallbackIcon width="15" height="15" aria-hidden="true" />
			) : null}
			{technology.label}
		</li>
	);
}
export default function StackDrawer() {
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);

	return (
		<>
			<button ref={triggerRef} type="button" onClick={() => setOpen(true)} className="stack-open-button">
				Ver detalles
			</button>

			<Dialog
				open={open}
				onAfterClose={() => setOpen(false)}
				returnFocusRef={triggerRef}
				labelledBy="stack-drawer-title"
				layerClassName="drawer-layer"
				backdropClassName="drawer-backdrop"
				panelClassName="stack-drawer"
				closeDuration={280}
			>
				{({ close, closeButtonRef }) => (
					<>
						<header>
							<div>
								<p>[ Stack tecnológico ]</p>
								<h2 id="stack-drawer-title">Mis herramientas</h2>
							</div>
							<button ref={closeButtonRef} type="button" onClick={close} aria-label="Cerrar"><X width="25" height="25" aria-hidden="true" /></button>
						</header>

						<div className="drawer-groups">
							{technologyGroups.map((group, index) => (
								<section key={group.title} className={index === 0 ? 'primary-group' : ''}>
									<h3>{group.title}</h3>
									<ul>{group.items.map((technology) => <TechnologyItem key={technology.label} technology={technology} />)}</ul>
								</section>
							))}
						</div>

						<footer>
							<span>Herramientas y entornos</span>
							<ul>{environmentTechnologies.map((technology) => <TechnologyItem key={technology.label} technology={technology} />)}</ul>
						</footer>
					</>
				)}
			</Dialog>
		</>
	);
}
