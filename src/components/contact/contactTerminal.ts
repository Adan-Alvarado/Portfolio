export type TerminalField = 'email' | 'subject' | 'message';
export type TerminalStep = TerminalField | 'ready';
export type FeedbackTone = 'idle' | 'error' | 'success' | 'info';
export type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface TerminalState {
	step: TerminalStep;
	email: string;
	subject: string;
	message: string;
	feedback: string;
	feedbackTone: FeedbackTone;
	submissionStatus: SubmissionStatus;
}

export const initialTerminalState: TerminalState = {
	step: 'email',
	email: '',
	subject: '',
	message: '',
	feedback: '',
	feedbackTone: 'idle',
	submissionStatus: 'idle',
};

export type TerminalAction =
	| { type: 'change'; field: TerminalField; value: string }
	| { type: 'advance'; step: TerminalStep; feedback?: string; tone?: FeedbackTone }
	| { type: 'feedback'; message: string; tone: FeedbackTone }
	| { type: 'submit-start'; message: string }
	| { type: 'submit-success'; message: string }
	| { type: 'submit-error'; message: string }
	| { type: 'reset'; feedback?: string };

export const terminalReducer = (state: TerminalState, action: TerminalAction): TerminalState => {
	switch (action.type) {
		case 'change':
			return { ...state, [action.field]: action.value, feedback: '', feedbackTone: 'idle', submissionStatus: 'idle' };
		case 'advance':
			return {
				...state,
				step: action.step,
				feedback: action.feedback ?? '',
				feedbackTone: action.tone ?? 'idle',
			};
		case 'feedback':
			return { ...state, feedback: action.message, feedbackTone: action.tone };
		case 'submit-start':
			return { ...state, step: 'ready', feedback: action.message, feedbackTone: 'info', submissionStatus: 'submitting' };
		case 'submit-success':
			return { ...state, step: 'ready', feedback: action.message, feedbackTone: 'success', submissionStatus: 'success' };
		case 'submit-error':
			return { ...state, step: 'ready', feedback: action.message, feedbackTone: 'error', submissionStatus: 'error' };
		case 'reset':
			return { ...initialTerminalState, feedback: action.feedback ?? '', feedbackTone: action.feedback ? 'info' : 'idle' };
	}
};

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
