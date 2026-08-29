import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type ReactNode,
	type RefObject,
} from 'react';
import { createPortal } from 'react-dom';

const focusableSelector = [
	'a[href]',
	'button:not([disabled])',
	'input:not([disabled])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'[tabindex]:not([tabindex="-1"])',
].join(',');

interface DialogControls {
	close: () => void;
	closeButtonRef: RefObject<HTMLButtonElement | null>;
}

interface DialogProps {
	open: boolean;
	onAfterClose: () => void;
	returnFocusRef: RefObject<HTMLElement | null>;
	labelledBy: string;
	describedBy?: string;
	layerClassName: string;
	backdropClassName: string;
	panelClassName: string;
	closeDuration?: number;
	children: (controls: DialogControls) => ReactNode;
}

export default function Dialog({
	open,
	onAfterClose,
	returnFocusRef,
	labelledBy,
	describedBy,
	layerClassName,
	backdropClassName,
	panelClassName,
	closeDuration = 280,
	children,
}: DialogProps) {
	const [isClosing, setIsClosing] = useState(false);
	const panelRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const closeTimerRef = useRef<number | null>(null);
	const isClosingRef = useRef(false);
	const onAfterCloseRef = useRef(onAfterClose);

	useEffect(() => {
		onAfterCloseRef.current = onAfterClose;
	}, [onAfterClose]);

	const close = useCallback(() => {
		if (isClosingRef.current) return;
		isClosingRef.current = true;
		setIsClosing(true);
		closeTimerRef.current = window.setTimeout(() => {
			isClosingRef.current = false;
			setIsClosing(false);
			onAfterCloseRef.current();
		}, closeDuration);
	}, [closeDuration]);

	useEffect(() => () => {
		if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
	}, []);

	useEffect(() => {
		if (!open) return;

		const previousOverflow = document.body.style.overflow;
		const previousPaddingRight = document.body.style.paddingRight;
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

		document.body.style.overflow = 'hidden';
		if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

		const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				event.preventDefault();
				close();
				return;
			}

			if (event.key !== 'Tab' || !panelRef.current) return;
			const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(focusableSelector))
				.filter((element) => element.getAttribute('aria-hidden') !== 'true');

			if (focusable.length === 0) {
				event.preventDefault();
				panelRef.current.focus();
				return;
			}

			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => {
			window.clearTimeout(focusTimer);
			document.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = previousOverflow;
			document.body.style.paddingRight = previousPaddingRight;
			window.setTimeout(() => returnFocusRef.current?.focus({ preventScroll: true }), 0);
		};
	}, [close, open, returnFocusRef]);

	if (!open || typeof document === 'undefined') return null;

	return createPortal(
		<div className={`${layerClassName}${isClosing ? ' is-closing' : ''}`} onMouseDown={close}>
			<div className={backdropClassName} aria-hidden="true" />
			<div
				ref={panelRef}
				className={panelClassName}
				role="dialog"
				aria-modal="true"
				aria-labelledby={labelledBy}
				aria-describedby={describedBy}
				tabIndex={-1}
				onMouseDown={(event) => event.stopPropagation()}
			>
				{children({ close, closeButtonRef })}
			</div>
		</div>,
		document.body,
	);
}
