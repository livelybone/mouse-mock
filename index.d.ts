declare global {
    interface HTMLElement {
        getWindow(): Window;
    }
};
declare function getWindow(el: HTMLElement): Window;

declare function mockClick(el?: HTMLElement | DOMRect | null): {
    originPoint: {
        window: Window;
        screenX: number;
        screenY: number;
        clientX: number;
        clientY: number;
    };
    point: {
        window: Window;
        screenX: number;
        screenY: number;
        clientX: number;
        clientY: number;
    };
} | undefined;

export { getWindow, mockClick };
