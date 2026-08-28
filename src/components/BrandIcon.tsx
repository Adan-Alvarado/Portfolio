import type { SVGProps } from 'react';
import type { SimpleIcon } from 'simple-icons';

type BrandIconProps = SVGProps<SVGSVGElement> & {
	icon: SimpleIcon;
};

export default function BrandIcon({ icon, ...props }: BrandIconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" focusable="false" {...props}>
			<path d={icon.path} />
		</svg>
	);
}
