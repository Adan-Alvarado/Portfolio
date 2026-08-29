export type TerminalField = 'email' | 'subject' | 'message';
export type TerminalStep = TerminalField | 'ready';
export type FeedbackTone = 'idle' | 'error' | 'success' | 'info';

export interface TerminalState {
	step: TerminalStep;
	email: string;
	subject: string;
	message: string;
	feedback: string;
	feedbackTone: FeedbackTone;
}

export const initialTerminalState: TerminalState = {
	step: 'email',
	email: '',
	subject: '',
	message: '',
	feedback: '',
	feedbackTone: 'idle',
};

export type TerminalAction =
	| { type: 'change'; field: TerminalField; value: string }
	| { type: 'advance'; step: TerminalStep; feedback?: string; tone?: FeedbackTone }
	| { type: 'feedback'; message: string; tone: FeedbackTone }
	| { type: 'reset' };

export const terminalReducer = (state: TerminalState, action: TerminalAction): TerminalState => {
	switch (action.type) {
		case 'change':
			return { ...state, [action.field]: action.value, feedback: '', feedbackTone: 'idle' };
		case 'advance':
			return {
				...state,
				step: action.step,
				feedback: action.feedback ?? '',
				feedbackTone: action.tone ?? 'idle',
			};
		case 'feedback':
			return { ...state, feedback: action.message, feedbackTone: action.tone };
		case 'reset':
			return { ...initialTerminalState, feedback: 'Terminal reiniciada.', feedbackTone: 'info' };
	}
};

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const buildContactMailto = ({ email, subject, message }: Pick<TerminalState, 'email' | 'subject' | 'message'>) => {
	const body = `${message.trim()}\n\nCorreo de contacto: ${email.trim()}`;
	return `mailto:alvaradoadan55@gmail.com?subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(body)}`;
};

