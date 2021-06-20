declare global {
    interface Element {
        _addEventListener: Element['addEventListener'];
        _removeEventListener: Element['removeEventListener'];
    }
    interface Window {
        $$RewriteListenerBinderSuccess$$?: boolean;
    }
};
declare function rewriteListenerBinder(): void;

declare function mockMouseEvent(eventType: string, el?: HTMLElement | DOMRect | null): {
    point: {
        clientX: number;
        clientY: number;
        screenY: number;
        screenX: number;
    };
} | undefined;
declare function mockClick(el?: HTMLElement | DOMRect | null): {
    point: {
        clientX: number;
        clientY: number;
        screenY: number;
        screenX: number;
    };
} | undefined;

export { mockClick, mockMouseEvent, rewriteListenerBinder };
