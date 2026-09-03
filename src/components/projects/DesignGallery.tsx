import { useState, type KeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { LocalizedPortfolioContent } from '../../i18n/content';
import type { DesignGalleryItem } from '../../types/portfolio';

interface DesignGalleryProps {
	items: readonly DesignGalleryItem[];
	copy: LocalizedPortfolioContent['projects'];
}

export default function DesignGallery({ items, copy }: DesignGalleryProps) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [hasChangedItem, setHasChangedItem] = useState(false);
	const activeItem = items[activeIndex] ?? items[0];
	if (!activeItem?.media) return null;

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
				<figure className={`pg-gallery-artwork${hasChangedItem ? ' is-entering' : ''}`} key={activeItem.id}>
					<img src={activeItem.media.src} alt={activeItem.media.alt} width={activeItem.media.width} height={activeItem.media.height} decoding="async" />
				</figure>
				<span className="pg-design-gallery-counter">{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
				<button type="button" className="pg-gallery-control pg-gallery-control--previous" onClick={() => select(activeIndex - 1)} aria-label={copy.galleryPrevious}><ChevronLeft aria-hidden="true" /></button>
				<button type="button" className="pg-gallery-control pg-gallery-control--next" onClick={() => select(activeIndex + 1)} aria-label={copy.galleryNext}><ChevronRight aria-hidden="true" /></button>
			</div>
			<div className="pg-design-gallery-thumbnails" aria-label={copy.galleryItem}>
				{items.map((item, index) => item.media && (
					<button key={item.id} type="button" className={index === activeIndex ? 'is-active' : ''} onClick={() => select(index)} aria-label={`${copy.galleryItem} ${index + 1}`} aria-current={index === activeIndex ? 'true' : undefined}>
						<img src={item.media.src} alt="" width={item.media.width} height={item.media.height} loading="lazy" decoding="async" />
					</button>
				))}
			</div>
		</div>
	);
}
