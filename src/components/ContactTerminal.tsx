import { useReducer, useRef, type CSSProperties, type KeyboardEvent } from 'react';
import { Send, X } from 'lucide-react';
import {
	buildContactMailto,
	initialTerminalState,
	isValidEmail,
	terminalReducer,
	type TerminalField,
} from './contact/contactTerminal';
import './ContactTerminal.css';

export default function ContactTerminal() {
	const [state, dispatch] = useReducer(terminalReducer, initialTerminalState);
	const emailInput = useRef<HTMLInputElement>(null);
	const subjectInput = useRef<HTMLInputElement>(null);
	const messageInput = useRef<HTMLInputElement>(null);
	const { step, email, subject, message, feedback, feedbackTone } = state;

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

	const advance = (event: KeyboardEvent<HTMLInputElement>, current: TerminalField) => {
		if (event.key !== 'Enter') return;
		event.preventDefault();

		if (current === 'email') {
			if (!isValidEmail(email)) {
				showFieldError('email', email.trim() ? 'El correo no tiene un formato válido.' : 'Debes ingresar tu correo.');
				return;
			}
			dispatch({ type: 'advance', step: 'subject' });
			focusStep('subject');
			return;
		}

		if (current === 'subject') {
			if (!subject.trim()) {
				showFieldError('subject', 'Debes ingresar el asunto.');
				return;
			}
			dispatch({ type: 'advance', step: 'message' });
			focusStep('message');
			return;
		}

		if (!message.trim()) {
			showFieldError('message', 'Debes escribir un mensaje.');
			return;
		}
		dispatch({ type: 'advance', step: 'ready', feedback: 'Mensaje listo. Puedes enviarlo.', tone: 'success' });
	};

	const resetTerminal = () => {
		dispatch({ type: 'reset' });
		focusStep('email');
	};

	const entryWidth = (value: string) => ({ '--entry-length': Math.max(value.length, 0) }) as CSSProperties;

	const sendMessage = () => {
		if (!isValidEmail(email)) {
			showFieldError('email', 'Debes ingresar un correo válido.');
			return;
		}
		if (!subject.trim()) {
			showFieldError('subject', 'Debes ingresar el asunto.');
			return;
		}
		if (!message.trim()) {
			showFieldError('message', 'Debes escribir un mensaje.');
			return;
		}
		window.location.href = buildContactMailto(state);
	};

	return (
		<div className="terminal-shell">
			<div className="terminal-card" role="group" aria-labelledby="terminal-title">
				<div className="terminal-head">
					<div className="terminal-dots" aria-hidden="true"><span></span><span></span><span></span></div>
					<strong id="terminal-title">terminal@contacto</strong>
					<button type="button" className="terminal-reset" onClick={resetTerminal} aria-label="Reiniciar terminal" title="Reiniciar terminal"><X width="25" height="25" aria-hidden="true" /></button>
				</div>

				<div className="terminal-body" onClick={() => {
					if (step === 'email') emailInput.current?.focus();
					if (step === 'subject') subjectInput.current?.focus();
					if (step === 'message') messageInput.current?.focus();
				}}>
					<p>&gt; Cuéntame sobre tu proyecto, idea o simplemente<br />salúdame. Estoy aquí para leerte...</p>

					<label className={step === 'email' ? 'current-command' : ''}>
						<span className="terminal-prompt">Tu@mensaje: ~$ correo:</span>
						<span className={`terminal-entry ${email ? 'has-value' : ''}`} style={entryWidth(email)}>
							<input ref={emailInput} type="email" value={email} onChange={(event) => dispatch({ type: 'change', field: 'email', value: event.target.value })} onKeyDown={(event) => advance(event, 'email')} readOnly={step !== 'email'} aria-label="Correo" aria-invalid={feedbackTone === 'error' && step === 'email'} aria-describedby="terminal-feedback" autoComplete="email" />
							{step === 'email' && <span className="terminal-block-cursor" aria-hidden="true"></span>}
						</span>
					</label>

					<label className={step === 'subject' ? 'current-command' : step === 'email' ? 'future-command' : ''}>
						<span className="terminal-prompt">Tu@mensaje: ~$ asunto:</span>
						<span className={`terminal-entry ${subject ? 'has-value' : ''}`} style={entryWidth(subject)}>
							<input ref={subjectInput} type="text" value={subject} onChange={(event) => dispatch({ type: 'change', field: 'subject', value: event.target.value })} onKeyDown={(event) => advance(event, 'subject')} readOnly={step !== 'subject'} aria-label="Asunto" aria-invalid={feedbackTone === 'error' && step === 'subject'} aria-describedby="terminal-feedback" />
							{step === 'subject' && <span className="terminal-block-cursor" aria-hidden="true"></span>}
						</span>
					</label>

					<label className={step === 'message' ? 'current-command' : step === 'ready' ? '' : 'future-command'}>
						<span className="terminal-prompt">Tu@mensaje: ~$ mensaje:</span>
						<span className={`terminal-entry ${message ? 'has-value' : ''}`} style={entryWidth(message)}>
							<input ref={messageInput} type="text" value={message} onChange={(event) => dispatch({ type: 'change', field: 'message', value: event.target.value })} onKeyDown={(event) => advance(event, 'message')} readOnly={step !== 'message'} aria-label="Mensaje" aria-invalid={feedbackTone === 'error' && step === 'message'} aria-describedby="terminal-feedback" />
							{step === 'message' && <span className="terminal-block-cursor" aria-hidden="true"></span>}
						</span>
					</label>

					<p id="terminal-feedback" className={`terminal-feedback ${feedback ? 'is-shown' : ''}`} data-tone={feedbackTone} role="status" aria-live="polite">{feedback || '\u00a0'}</p>
				</div>
			</div>

			<button type="button" className="terminal-send-button" onClick={sendMessage} aria-label="Enviar DM">
				Enviar Mensaje <Send width="20" height="20" aria-hidden="true" />
			</button>
		</div>
	);
}
