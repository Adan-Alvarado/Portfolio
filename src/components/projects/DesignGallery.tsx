import { Fragment, useState, type KeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { LocalizedPortfolioContent } from '../../i18n/content';
import type { DesignGalleryItem } from '../../types/portfolio';

interface DesignGalleryProps {
	items: readonly DesignGalleryItem[];
	copy: LocalizedPortfolioContent['projects'];
}

const Poster = ({ item, compact = false, entering = false }: { item: DesignGalleryItem; compact?: boolean; entering?: boolean }) => (
	<div className={`pg-poster pg-poster--${item.variant}${compact ? ' pg-poster--thumbnail' : ''}${entering ? ' is-entering' : ''}`} aria-hidden="true">
		<small>{item.eyebrow}</small>
		<b>{item.title.split('\n').map((line, index) => <Fragment key={line}>{index > 0 && <br />}{line}</Fragment>)}</b>
		<i></i>
		<span>{item.caption}</span>
	</div>
);

export default function DesignGallery({ items, copy }: DesignGalleryProps) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [hasChangedItem, setHasChangedItem] = useState(false);
	const activeItem = items[activeIndex] ?? items[0];
	if (!activeItem) return null;

	const select = (next: number) => {
		const nextIndex = (next + items.length) % items.length;
		if (nextIndex === activeIndex) return;
		setHasChangedItem(true);
		setActiveIndex(nextIndex);
	};
	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'ArrowLeft') { event.preventDefault(); select(activeIndex - 1); }
		if (event.key === 'ArrowRight') { event.preventDefault(); select(activeIndex + 1); }
	};

	return (
		<div className="pg-design-gallery" tabIndex={0} onKeyDown={handleKeyDown} aria-label={`${copy.galleryItem} ${activeIndex + 1} / ${items.length}`}>
			<div className="pg-design-gallery-stage" aria-live="polite">
				<Poster key={activeItem.id} item={activeItem} entering={hasChangedItem} />
				<span className="pg-design-gallery-counter">{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
				<button type="button" className="pg-gallery-control pg-gallery-control--previous" onClick={() => select(activeIndex - 1)} aria-label={copy.galleryPrevious}><ChevronLeft aria-hidden="true" /></button>
				<button type="button" className="pg-gallery-control pg-gallery-control--next" onClick={() => select(activeIndex + 1)} aria-label={copy.galleryNext}><ChevronRight aria-hidden="true" /></button>
			</div>
			<div className="pg-design-gallery-thumbnails" aria-label={copy.galleryItem}>
				{items.map((item, index) => (
					<button key={item.id} type="button" className={index === activeIndex ? 'is-active' : ''} onClick={() => select(index)} aria-label={`${copy.galleryItem} ${index + 1}`} aria-current={index === activeIndex ? 'true' : undefined}>
						<Poster item={item} compact />
					</button>
				))}
			</div>
		</div>
	);
}
