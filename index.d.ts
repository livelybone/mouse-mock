export * from '@livelybone/scroll-get';

declare global {
    interface HTMLElement {
        ownerWindow: Window;
    }
};
declare function getWindow(el: HTMLElement): Window;

declare function mockMouseEvent(eventType: string, el?: HTMLElement | DOMRect | null): {
    originPoint: {
        clientX: number;
        clientY: number;
        screenY: number;
        screenX: number;
    };
    point: {
        clientX: number;
        clientY: number;
        screenY: number;
        screenX: number;
    };
} | undefined;
declare function mockClick(el?: HTMLElement | DOMRect | null): {
    originPoint: {
        clientX: number;
        clientY: number;
        screenY: number;
        screenX: number;
    };
    point: {
        clientX: number;
        clientY: number;
        screenY: number;
        screenX: number;
    };
} | undefined;

export { getWindow, mockClick, mockMouseEvent };
