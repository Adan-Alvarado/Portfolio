import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import {
	environmentTechnologies,
	technologyGroups,
} from '../data/technologies';
import TechnologyPill from './TechnologyPill';
import Dialog from './ui/Dialog';
import type { LocalizedPortfolioContent } from '../i18n/content';
import './StackDrawer.css';

interface StackDrawerProps { copy: LocalizedPortfolioContent['projects']['stack'] }

export default function StackDrawer({ copy }: StackDrawerProps) {
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);

	return (
		<>
			<button ref={triggerRef} type="button" onClick={() => setOpen(true)} className="stack-open-button">
				{copy.open}
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
								<p>{copy.eyebrow}</p>
								<h2 id="stack-drawer-title">{copy.heading}</h2>
							</div>
							<button ref={closeButtonRef} type="button" onClick={close} aria-label={copy.close}><X width="19" height="19" aria-hidden="true" /></button>
						</header>

						<div className="drawer-groups">
							{technologyGroups.map((group, index) => (
								<section key={group.title} className={index === 0 ? 'primary-group' : ''}>
									<h3>{copy.groups[index] ?? group.title}</h3>
									<ul>{group.items.map((technology) => <TechnologyPill key={technology.label} technology={technology} variant="drawer" interactive />)}</ul>
								</section>
							))}
						</div>

						<footer>
							<span>{copy.environment}</span>
							<ul>{environmentTechnologies.map((technology) => <TechnologyPill key={technology.label} technology={technology} variant="drawer" interactive />)}</ul>
						</footer>
					</>
				)}
			</Dialog>
		</>
	);
}
