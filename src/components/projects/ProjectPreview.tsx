import type { Project } from '../../types/portfolio';
import type { LocalizedPortfolioContent } from '../../i18n/content';

interface ProjectPreviewProps {
	project: Project;
	copy: LocalizedPortfolioContent['projects']['preview'];
	expanded?: boolean;
}

export default function ProjectPreview({ project, copy, expanded = false }: ProjectPreviewProps) {
	const media = project.media ?? [];
	const visibleMedia = expanded ? media : project.preview === 'diseno' ? media : media.slice(0, 1);
	const label = project.preview === 'diseno'
		? copy.designSelection
		: project.preview === 'auto-care'
			? copy.productScreenshot
			: copy.apiScreenshot;
	const previewClass = project.preview === 'auto-care' ? 'auto' : project.preview === 'diseno' ? 'design' : 'fixit';

	return (
		<div
			className={`pg-preview pg-preview--${previewClass} pg-preview--real-media${expanded ? ' is-expanded' : ''}`}
			aria-hidden={expanded ? undefined : true}
		>
			<span className="pg-demo-label">{label}</span>
			<div className={`pg-media-grid pg-media-grid--${visibleMedia.length}`}>
				{visibleMedia.map((item) => (
					<figure className="pg-media-frame" key={item.src}>
						<img src={item.src} alt={expanded ? item.alt : ''} width={item.width} height={item.height} loading="lazy" decoding="async" />
					</figure>
				))}
			</div>
		</div>
	);
}
