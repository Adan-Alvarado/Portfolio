import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { Send, X } from 'lucide-react';
import './ContactTerminal.css';

type Step = 'email' | 'subject' | 'message' | 'ready';
type FeedbackTone = 'idle' | 'error' | 'success' | 'info';

const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export default function ContactTerminal() {
	const [step, setStep] = useState<Step>('email');
	const [email, setEmail] = useState('');
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');
	const [feedback, setFeedback] = useState('');
	const [feedbackTone, setFeedbackTone] = useState<FeedbackTone>('idle');
	const emailInput = useRef<HTMLInputElement>(null);
	const subjectInput = useRef<HTMLInputElement>(null);
	const messageInput = useRef<HTMLInputElement>(null);

	const showFeedback = (message: string, tone: FeedbackTone) => {
		setFeedback(message);
		setFeedbackTone(tone);
	};

	const clearFeedback = () => {
		setFeedback('');
		setFeedbackTone('idle');
	};

	const focusStep = (nextStep: Exclude<Step, 'ready'>) => {
		requestAnimationFrame(() => {
			const target = nextStep === 'email' ? emailInput.current : nextStep === 'subject' ? subjectInput.current : messageInput.current;
			target?.focus({ preventScroll: true });
		});
	};

	const advance = (event: KeyboardEvent<HTMLInputElement>, current: Exclude<Step, 'ready'>) => {
		if (event.key !== 'Enter') return;
		event.preventDefault();
		clearFeedback();

		if (current === 'email') {
			if (!validEmail(email)) {
				showFeedback(email.trim() ? 'El correo no tiene un formato válido.' : 'Debes ingresar tu correo.', 'error');
				return;
			}
			setStep('subject');
			focusStep('subject');
			return;
		}

		if (current === 'subject') {
			if (!subject.trim()) {
				showFeedback('Debes ingresar el asunto.', 'error');
				return;
			}
			setStep('message');
			focusStep('message');
			return;
		}

		if (!message.trim()) {
			showFeedback('Debes escribir un mensaje.', 'error');
			return;
		}
		setStep('ready');
		showFeedback('Mensaje listo. Puedes enviarlo.', 'success');
	};

	const resetTerminal = () => {
		setEmail('');
		setSubject('');
		setMessage('');
		showFeedback('Terminal reiniciada.', 'info');
		setStep('email');
		focusStep('email');
	};

	const entryWidth = (value: string) => ({ '--entry-length': Math.max(value.length, 0) }) as CSSProperties;

	const sendMessage = () => {
		if (!validEmail(email)) {
			setStep('email');
			showFeedback('Debes ingresar un correo válido.', 'error');
			focusStep('email');
			return;
		}
		if (!subject.trim()) {
			setStep('subject');
			showFeedback('Debes ingresar el asunto.', 'error');
			focusStep('subject');
			return;
		}
		if (!message.trim()) {
			setStep('message');
			showFeedback('Debes escribir un mensaje.', 'error');
			focusStep('message');
			return;
		}

		const body = `${message.trim()}\n\nCorreo de contacto: ${email.trim()}`;
		window.location.href = `mailto:alvaradoadan55@gmail.com?subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(body)}`;
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
							<input ref={emailInput} type="email" value={email} onChange={(event) => { setEmail(event.target.value); clearFeedback(); }} onKeyDown={(event) => advance(event, 'email')} readOnly={step !== 'email'} aria-label="Correo" aria-invalid={feedbackTone === 'error' && step === 'email'} aria-describedby="terminal-feedback" autoComplete="email" />
							{step === 'email' && <span className="terminal-block-cursor" aria-hidden="true"></span>}
						</span>
					</label>

					<label className={step === 'subject' ? 'current-command' : step === 'email' ? 'future-command' : ''}>
						<span className="terminal-prompt">Tu@mensaje: ~$ asunto:</span>
						<span className={`terminal-entry ${subject ? 'has-value' : ''}`} style={entryWidth(subject)}>
							<input ref={subjectInput} type="text" value={subject} onChange={(event) => { setSubject(event.target.value); clearFeedback(); }} onKeyDown={(event) => advance(event, 'subject')} readOnly={step !== 'subject'} aria-label="Asunto" aria-invalid={feedbackTone === 'error' && step === 'subject'} aria-describedby="terminal-feedback" />
							{step === 'subject' && <span className="terminal-block-cursor" aria-hidden="true"></span>}
						</span>
					</label>

					<label className={step === 'message' ? 'current-command' : step === 'ready' ? '' : 'future-command'}>
						<span className="terminal-prompt">Tu@mensaje: ~$ mensaje:</span>
						<span className={`terminal-entry ${message ? 'has-value' : ''}`} style={entryWidth(message)}>
							<input ref={messageInput} type="text" value={message} onChange={(event) => { setMessage(event.target.value); clearFeedback(); }} onKeyDown={(event) => advance(event, 'message')} readOnly={step !== 'message'} aria-label="Mensaje" aria-invalid={feedbackTone === 'error' && step === 'message'} aria-describedby="terminal-feedback" />
							{step === 'message' && <span className="terminal-block-cursor" aria-hidden="true"></span>}
						</span>
					</label>

					<p id="terminal-feedback" className={`terminal-feedback ${feedback ? 'is-shown' : ''}`} data-tone={feedbackTone} role="status" aria-live="polite">{feedback || '\u00a0'}</p>
				</div>
			</div>

			<button type="button" className="terminal-send-button" onClick={sendMessage} aria-label="Enviar DM">
				Enviar DM <Send width="20" height="20" aria-hidden="true" />
			</button>
		</div>
	);
}
