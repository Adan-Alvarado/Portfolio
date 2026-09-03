import type { Credential } from '../../data/credentials';
import type { LocalizedPortfolioContent } from '../../i18n/content';
import CredentialCarouselFrame from './CredentialCarouselFrame';
import InteractiveCredentialCard from './InteractiveCredentialCard';

interface InteractiveCredentialCarouselProps {
	credentials: Credential[];
	copy: LocalizedPortfolioContent['experience'];
}

export default function InteractiveCredentialCarousel({ credentials, copy }: InteractiveCredentialCarouselProps) {
	return <CredentialCarouselFrame credentials={credentials} copy={copy} renderActive={(credential) => <InteractiveCredentialCard credential={credential} copy={copy} />} />;
}
