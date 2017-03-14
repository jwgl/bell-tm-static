enum ReadyState {
    CONNECTING = 0,
    OPEN = 1,
    CLOSED = 2,
}

interface EventSourceInit {
    withCredentials?: boolean;
}

interface OnMessageEvent {
    data: string;
}

class EventSource {
    url: string;
    withCredentials: boolean;
    CONNECTING: ReadyState;
    OPEN: ReadyState;
    CLOSED: ReadyState;
    readyState: ReadyState;
    onopen: (event: Event) => any;
    onmessage: (event: IOnMessageEvent) => void;
    onerror: (event: Event) => any;
    close: () => void;
    addEventListener: (type: string, h: (event: OnMessageEvent) => void) => void;
    removeEventListener: (type: string, h: (event: OnMessageEvent) => void) => void;

    constructor(url: string, eventSourceInitDict?: EventSourceInit): EventSource;
}
