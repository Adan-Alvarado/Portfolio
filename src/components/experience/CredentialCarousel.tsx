import type { Credential } from '../../data/credentials';
import type { LocalizedPortfolioContent } from '../../i18n/content';
import CredentialCard from './CredentialCard';
import CredentialCarouselFrame from './CredentialCarouselFrame';

interface CredentialCarouselProps {
	credentials: Credential[];
	copy: LocalizedPortfolioContent['experience'];
}

export default function CredentialCarousel({ credentials, copy }: CredentialCarouselProps) {
	return <CredentialCarouselFrame credentials={credentials} copy={copy} renderActive={(credential) => <CredentialCard credential={credential} isActive copy={copy} />} />;
}
