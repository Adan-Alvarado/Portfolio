import { useReducer, useRef, type KeyboardEvent } from 'react';
import { Send, RotateCcw } from 'lucide-react';
import {
	initialTerminalState,
	isValidEmail,
	terminalReducer,
	type TerminalField,
} from './contact/contactTerminal';
import type { LocalizedPortfolioContent } from '../i18n/content';
import './ContactTerminal.css';

interface ContactTerminalProps {
	copy: LocalizedPortfolioContent['contact']['terminal'];
	formId: string;
}

export default function ContactTerminal({ copy, formId }: ContactTerminalProps) {
	const [state, dispatch] = useReducer(terminalReducer, initialTerminalState);
	const emailInput = useRef<HTMLInputElement>(null);
	const subjectInput = useRef<HTMLInputElement>(null);
	const messageInput = useRef<HTMLTextAreaElement>(null);
	const honeypotInput = useRef<HTMLInputElement>(null);
	const { step, email, subject, message, feedback, feedbackTone, submissionStatus } = state;
	const isConfigured = /^[a-zA-Z0-9_-]+$/.test(formId);
	const isSubmitting = submissionStatus === 'submitting';

	const focusStep = (nextStep: TerminalField) => {
		requestAnimationFrame(() => {
			const target = nextStep === 'email' ? emailInput.current : nextStep === 'subject' ? subjectInput.current : messageInput.current;
			target?.focus({ preventScroll: true });
		});
	};

	const showFieldError = (field: TerminalField, error: string) => {
		dispatch({ type: 'advance', step: field });
		dispatch({ type: 'feedback', message: error, tone: 'error' });
		focusStep(field);
	};

	const advance = (current: Exclude<TerminalField, 'message'>) => {

		if (current === 'email') {
			if (!isValidEmail(email)) {
				showFieldError('email', email.trim() ? copy.errors[0] : copy.errors[1]);
				return;
			}
			dispatch({ type: 'advance', step: 'subject' });
			focusStep('subject');
			return;
		}

		if (current === 'subject') {
			if (!subject.trim()) {
				showFieldError('subject', copy.errors[2]);
				return;
			}
			dispatch({ type: 'advance', step: 'message' });
			focusStep('message');
			return;
		}

	};

	const resetTerminal = () => {
		dispatch({ type: 'reset', feedback: copy.resetFeedback });
		focusStep('email');
	};


	const sendMessage = async () => {
		if (isSubmitting) return;
		if (!isConfigured) {
			dispatch({ type: 'submit-error', message: copy.configurationMissing });
			return;
		}
		if (!isValidEmail(email)) {
			showFieldError('email', copy.errors[0]);
			return;
		}
		if (!subject.trim()) {
			showFieldError('subject', copy.errors[2]);
			return;
		}
		if (!message.trim()) {
			showFieldError('message', copy.errors[3]);
			return;
		}
		dispatch({ type: 'submit-start', message: copy.sending });
		try {
			const response = await fetch(`https://formspree.io/f/${formId}`, {
				method: 'POST',
				headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: email.trim(),
					subject: subject.trim(),
					message: message.trim(),
					_gotcha: honeypotInput.current?.value ?? '',
				}),
			});
			if (!response.ok) throw new Error(`Formspree responded with ${response.status}`);
			dispatch({ type: 'submit-success', message: copy.sent });
			window.dispatchEvent(new CustomEvent('portfolio:contact-ready'));
		} catch {
			dispatch({ type: 'submit-error', message: copy.sendError });
		}
	};

	const handleMessageKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key !== 'Enter' || (!event.ctrlKey && !event.metaKey)) return;
		event.preventDefault();
		void sendMessage();
	};

	const sendLabel = submissionStatus === 'submitting'
		? copy.sending
		: submissionStatus === 'error'
			? copy.retry
			: copy.send;
	const visibleFeedback = feedback || (!isConfigured ? copy.configurationMissing : '');
	const visibleFeedbackTone = feedback ? feedbackTone : !isConfigured ? 'info' : 'idle';

	return (
		<form className="terminal-shell" data-terminal-step={step} data-submission-status={submissionStatus} aria-busy={isSubmitting} onSubmit={(event) => { event.preventDefault(); void sendMessage(); }}>
			<input ref={honeypotInput} className="terminal-honeypot" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" />
			<div className="terminal-card" role="group" aria-labelledby="terminal-title">
				<div className="terminal-head">
					<div className="terminal-dots" aria-hidden="true"><span></span><span></span><span></span></div>
					<strong id="terminal-title">{copy.title}</strong>
					<button type="button" className="terminal-reset" onClick={resetTerminal} disabled={isSubmitting} aria-label={copy.reset} title={copy.reset}><RotateCcw width="20" height="20" aria-hidden="true" /></button>
				</div>

				<div className="terminal-body">
					<p>{copy.intro[0]}<br />{copy.intro[1]}</p>

					<label className={step === 'email' ? 'current-command' : ''}>
						<span className="terminal-prompt">{copy.prompts[0]}</span>
						<span className={`terminal-entry ${email ? 'has-value' : ''}`}>
							<input ref={emailInput} type="email" value={email} onChange={(event) => dispatch({ type: 'change', field: 'email', value: event.target.value })} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); advance('email'); } }} readOnly={isSubmitting} onFocus={() => dispatch({ type: 'focus', field: 'email' })} aria-label={copy.labels[0]} aria-invalid={feedbackTone === 'error' && step === 'email'} aria-describedby="terminal-feedback" autoComplete="email" />
						</span>
					</label>

					<label className={step === 'subject' ? 'current-command' : step === 'email' && !subject && !message ? 'future-command' : ''}>
						<span className="terminal-prompt">{copy.prompts[1]}</span>
						<span className={`terminal-entry ${subject ? 'has-value' : ''}`}>
							<input ref={subjectInput} type="text" value={subject} onChange={(event) => dispatch({ type: 'change', field: 'subject', value: event.target.value })} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); advance('subject'); } }} readOnly={isSubmitting} onFocus={() => dispatch({ type: 'focus', field: 'subject' })} aria-label={copy.labels[1]} aria-invalid={feedbackTone === 'error' && step === 'subject'} aria-describedby="terminal-feedback" />
						</span>
					</label>

					<label className={step === 'message' ? 'current-command' : step === 'ready' || message ? '' : 'future-command'}>
						<span className="terminal-prompt">{copy.prompts[2]}</span>
						<span className={`terminal-entry terminal-entry--message ${message ? 'has-value' : ''}`}>
							<textarea ref={messageInput} value={message} onChange={(event) => dispatch({ type: 'change', field: 'message', value: event.target.value })} onKeyDown={handleMessageKeyDown} readOnly={isSubmitting} onFocus={() => dispatch({ type: 'focus', field: 'message' })} aria-label={copy.labels[2]} aria-invalid={feedbackTone === 'error' && step === 'message'} aria-describedby="terminal-feedback terminal-shortcut" rows={2} />
						</span>
					</label>

					<p id="terminal-feedback" className={`terminal-feedback ${visibleFeedback ? 'is-shown' : ''}`} data-tone={visibleFeedbackTone} role="status" aria-live="polite">{visibleFeedback || '\u00a0'}</p>
					{(step === 'email' || step === 'subject') && <button type="button" className="terminal-continue" disabled={isSubmitting} onClick={() => advance(step)}>{copy.continue}</button>}
					<p id="terminal-shortcut" className="terminal-shortcut">{step === 'message' ? copy.shortcut : '\u00a0'}</p>
				</div>
			</div>

			<button
				type="submit"
				className="terminal-send-button"
				disabled={isSubmitting || !isConfigured}
				aria-label={sendLabel}
				aria-describedby={!isConfigured ? 'terminal-feedback' : undefined}
				title={!isConfigured ? copy.configurationMissing : undefined}
			>
				{sendLabel} <Send width="20" height="20" aria-hidden="true" />
			</button>
		</form>
	);
}
