declare function mockClick(el?: HTMLElement | DOMRect | null): {
    originPoint: {
        screenX: number;
        screenY: number;
        clientX: number;
        clientY: number;
    };
    point: {
        screenX: number;
        screenY: number;
        clientX: number;
        clientY: number;
    };
} | undefined;

export { mockClick };
