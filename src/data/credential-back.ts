import type { Certificate, CredentialBackContent, PersonalPhoto } from '../types/portfolio';

export const createCredentialBackContent = (
	certificates: readonly Certificate[],
	photos: readonly PersonalPhoto[],
): CredentialBackContent => ({ certificates, photos });
