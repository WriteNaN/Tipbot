import ReconnectingWebSocket from "reconnecting-websocket";
import EventEmitter from "events";

class Listener extends EventEmitter {
    constructor() {
        super();
        this.init();
    }

    private async init() {
        await this.nanoListener();
        this.emit("ready");
    }

    private async nanoListener() {
        const opts = {
            WebSocket: WebSocket,
            connectionTimeout: 2000,
            maxRetries: 10,
        };
        const nanoWs = new ReconnectingWebSocket(process.env.XNO_SOCKET, [], opts);
        const banWs = new ReconnectingWebSocket(process.env.BAN_SOCKET, [], opts);
        const xdgWs = new ReconnectingWebSocket(process.env.XDG_SOCKET, [], opts);
        const xroWs = new ReconnectingWebSocket(process.env.XRO_SOCKET, [], opts);
    }
}

export default new Listener();