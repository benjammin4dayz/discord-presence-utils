import { EventEmitter } from "events";
import { getPid, uuid } from "./util.js";
import IPCTransport from "./ipc.js";

/**
 * The main hub for interacting with Discord RPC
 * @extends {BaseClient}
 */
class RPCClient extends EventEmitter {
  /**
   * Only supports IPC transport
   */
  constructor() {
    super();

    this.clientId = null;

    this.transport = new IPCTransport(this);
    this.transport.on("message", this._onRpcMessage.bind(this));

    this._expecting = new Map(); // Map of nonces being expected from the transport

    this._connectPromise = undefined;
  }

  /**
   * Search and connect to RPC
   */
  connect(clientId) {
    if (this._connectPromise) return this._connectPromise;

    this._connectPromise = new Promise((resolve, reject) => {
      this.clientId = clientId;

      const timeout = setTimeout(
        () => reject(new Error("RPC_CONNECTION_TIMEOUT")),
        10e3
      );
      timeout.unref();

      this.once("connected", () => {
        clearTimeout(timeout);
        resolve(this);
      });

      this.transport.once("close", () => {
        this._expecting.forEach((e) => {
          e.reject(new Error("connection closed"));
        });
        this.emit("disconnected");
        reject(new Error("connection closed"));
      });

      this.transport.connect().catch(reject);
    });

    return this._connectPromise;
  }

  /**
   * In the full-featured client, this would perform some auth under the hood.
   * Here it just serves as an alias for `connect()`
   * @deprecated use `connect()`
   */
  login({ clientId }) {
    if (!clientId) throw new Error("missing client id");
    return this.connect(clientId);
  }

  setActivity(
    {
      buttons,
      details,
      endTimestamp,
      instance, // what is this?
      joinSecret,
      largeImageKey,
      largeImageText,
      matchSecret,
      partyId,
      partyMax,
      partySize,
      smallImageKey,
      smallImageText,
      spectateSecret,
      startTimestamp,
      state,
    },
    pid = getPid()
  ) {
    let assets, party, secrets, timestamps;

    if (startTimestamp || endTimestamp) {
      timestamps = {
        start: startTimestamp,
        end: endTimestamp,
      };
      if (timestamps.start instanceof Date) {
        timestamps.start = Math.round(timestamps.start.getTime());
      }
      if (timestamps.end instanceof Date) {
        timestamps.end = Math.round(timestamps.end.getTime());
      }
      if (timestamps.start > 2147483647000) {
        throw new RangeError("timestamps.start must fit into a unix timestamp");
      }
      if (timestamps.end > 2147483647000) {
        throw new RangeError("timestamps.end must fit into a unix timestamp");
      }
    }

    if (largeImageKey || largeImageText || smallImageKey || smallImageText) {
      assets = {
        large_image: largeImageKey,
        large_text: largeImageText,
        small_image: smallImageKey,
        small_text: smallImageText,
      };
    }

    if (partySize || partyId || partyMax) {
      party = { id: partyId };
      if (partySize || partyMax) {
        party.size = [partySize, partyMax];
      }
    }

    if (matchSecret || joinSecret || spectateSecret) {
      secrets = {
        match: matchSecret,
        join: joinSecret,
        spectate: spectateSecret,
      };
    }

    return this._request("SET_ACTIVITY", {
      pid,
      activity: {
        state,
        details,
        timestamps,
        assets,
        party,
        secrets,
        buttons,
        instance: !!instance,
      },
    });
  }

  /**
   * Clears the currently set presence, if any. This will hide the "Playing X" message
   * displayed below the user's name.
   * @param {number} [pid] The application's process ID. Defaults to the executing process' PID.
   * @returns {Promise}
   */
  clearActivity(pid = getPid()) {
    return this._request("SET_ACTIVITY", {
      pid,
    });
  }

  /**
   * "Private" method but public interface is still supported for compatibility.
   * @deprecated use `setActivity()`
   */
  request(cmd, args, evt) {
    return this._request(cmd, args, evt);
  }

  /**
   * Request
   * @param {string} cmd Command
   * @param {Object} [args={}] Arguments
   * @param {string} [evt] Event
   * @returns {Promise}
   * @private
   */
  _request(cmd, args, evt) {
    return new Promise((resolve, reject) => {
      const nonce = uuid();
      this.transport.send({ cmd, args, evt, nonce });
      this._expecting.set(nonce, { resolve, reject });
    });
  }

  /**
   * Message handler
   * @param {Object} message message
   * @private
   */
  _onRpcMessage(message) {
    if (message.cmd === "DISPATCH" && message.evt === "READY")
      this.emit("connected");
    else if (this._expecting.has(message.nonce)) {
      const { resolve, reject } = this._expecting.get(message.nonce);
      if (message.evt === "ERROR") {
        const e = new Error(message.data.message);
        e.code = message.data.code;
        e.data = message.data;
        reject(e);
      } else {
        resolve(message.data);
      }
      this._expecting.delete(message.nonce);
    } else {
      this.emit(message.evt, message.data);
    }
  }

  /**
   * Destroy the client
   */
  async destroy() {
    await this.transport.close();
  }
}

export default RPCClient;
export { RPCClient };
