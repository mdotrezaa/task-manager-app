import "@testing-library/jest-dom"

if (typeof globalThis.PointerEvent === "undefined") {
	class PointerEvent extends MouseEvent {
		constructor(type: string, params: PointerEventInit = {}) {
			super(type, params)
		}
	}
	globalThis.PointerEvent = PointerEvent as typeof globalThis.PointerEvent
}