import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import {
	environmentTechnologies,
	technologyGroups,
} from '../data/technologies';
import TechnologyPill from './TechnologyPill';
import Dialog from './ui/Dialog';
import './StackDrawer.css';
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
							<button ref={closeButtonRef} type="button" onClick={close} aria-label="Cerrar"><X width="19" height="19" aria-hidden="true" /></button>
						</header>

						<div className="drawer-groups">
							{technologyGroups.map((group, index) => (
								<section key={group.title} className={index === 0 ? 'primary-group' : ''}>
									<h3>{group.title}</h3>
									<ul>{group.items.map((technology) => <TechnologyPill key={technology.label} technology={technology} variant="drawer" interactive />)}</ul>
								</section>
							))}
						</div>

						<footer>
							<span>Herramientas y entornos</span>
							<ul>{environmentTechnologies.map((technology) => <TechnologyPill key={technology.label} technology={technology} variant="drawer" interactive />)}</ul>
						</footer>
					</>
				)}
			</Dialog>
		</>
	);
}
