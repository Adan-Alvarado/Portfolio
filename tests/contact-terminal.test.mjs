import test from 'node:test';
import assert from 'node:assert/strict';
import { initialTerminalState, terminalReducer, isValidEmail } from '../src/components/contact/contactTerminal.ts';

const draft = { ...initialTerminalState, step: 'message', email: 'qa@example.com', subject: 'Consulta', message: 'Mensaje de prueba' };

test('volver al correo conserva asunto y mensaje', () => {
	const focused = terminalReducer(draft, { type: 'focus', field: 'email' });
	const edited = terminalReducer(focused, { type: 'change', field: 'email', value: 'editado@example.com' });
	assert.equal(edited.step, 'email');
	assert.equal(edited.email, 'editado@example.com');
	assert.equal(edited.subject, draft.subject);
	assert.equal(edited.message, draft.message);
});

test('un error conserva el borrador y permite corregir antes del reintento', () => {
	const pending = terminalReducer(draft, { type: 'submit-start', message: 'Enviando' });
	assert.equal(terminalReducer(pending, { type: 'focus', field: 'email' }), pending);
	const failed = terminalReducer(pending, { type: 'submit-error', message: 'Reintentar' });
	const focused = terminalReducer(failed, { type: 'focus', field: 'subject' });
	const edited = terminalReducer(focused, { type: 'change', field: 'subject', value: 'Consulta corregida' });
	assert.equal(edited.email, draft.email);
	assert.equal(edited.message, draft.message);
	assert.equal(edited.submissionStatus, 'idle');
	assert.equal(edited.feedback, '');
	assert.equal(terminalReducer(edited, { type: 'submit-start', message: 'Enviando' }).submissionStatus, 'submitting');
});

test('reiniciar borra solo al solicitarlo y valida correo', () => {
	assert.deepEqual(terminalReducer(draft, { type: 'reset' }), initialTerminalState);
	assert.equal(isValidEmail(' qa@example.com '), true);
	assert.equal(isValidEmail('incorrecto'), false);
});
