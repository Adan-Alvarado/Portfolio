import { Image, LayoutTemplate, MonitorCog, type LucideIcon } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Technology } from '../types/technology';
import BrandIcon from './BrandIcon';
import './TechnologyPill.css';

const fallbackIcons: Record<NonNullable<Technology['fallbackIcon']>, LucideIcon> = {
	image: Image,
	layout: LayoutTemplate,
	monitor: MonitorCog,
};

interface TechnologyPillProps {
	technology: Technology;
	variant?: 'drawer' | 'project';
	interactive?: boolean;
}

export default function TechnologyPill({
	technology,
	variant = 'project',
	interactive = false,
}: TechnologyPillProps) {
	const FallbackIcon = technology.fallbackIcon ? fallbackIcons[technology.fallbackIcon] : null;

	return (
		<li
			className={`technology-pill technology-pill--${variant}`}
			style={{ '--technology-color': technology.color } as CSSProperties}
			tabIndex={interactive ? 0 : undefined}
		>
			{technology.simpleIcon ? (
				<BrandIcon icon={technology.simpleIcon} aria-hidden="true" />
			) : FallbackIcon ? (
				<FallbackIcon aria-hidden="true" />
			) : null}
			<span>{technology.label}</span>
		</li>
	);
}
