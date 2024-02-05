import { execSync } from "child_process";
import { EventEmitter } from "events";
import os from "os";
import path from "path";

/**
 * Check running processes on an interval and emit an event when a watched process starts or stops
 *
 * @emits ProcMon#start
 * @emits ProcMon#stop
 */
class ProcMon extends EventEmitter {
  /**
   * @param {string[]} processes - List of processes to watch
   */
  constructor(processes) {
    super();
    this.lastKnownState = 0;
    this.logger = console;
    this.os = os.platform();
    this.process = null;
    this.startupInterval = 3000;
    this.startupProcessEvent = "start";
    this.shutdownProcessEvent = "stop";
    this.shutdownInterval = 15000;
    this.watchedProcessList = processes;
  }

  set watchedProcessList(input) {
    if (Array.isArray(input)) {
      this._watchedProcessList = input;
    } else if (typeof input === "string") {
      this._watchedProcessList = [input];
    } else
      throw new Error("Process list must be a string or an array of strings.");
  }

  get watchedProcessList() {
    return this._watchedProcessList;
  }

  /**
   * Start a short interval to begin monitoring for a given process.
   * Will pass responsibility to `shutdown()` after the process is detected.
   */
  startup() {
    const eventHandler = () => {
      clearInterval(this.__startupInterval);
      this.lastKnownState = 1;
      this.removeListener(this.startupProcessEvent, eventHandler);
      this.shutdown();
    };

    this.on(this.startupProcessEvent, eventHandler);

    this.__startupInterval = setInterval(() => {
      this._doFindProcess().then((ps) => {
        if (!ps.path) return;
        this.process = path.basename(ps.path);
        this.logger.log(`${this.process} started`);
        this.emit(this.startupProcessEvent, ps);
      });
    }, this.startupInterval || 3000);
  }

  /**
   * Start a slightly longer interval [relative to `startup()`] to check if the
   * given process is still running. Will pass responsibility back to `startup()`
   * if the process is not detected.
   */
  shutdown() {
    const eventHandler = () => {
      clearInterval(this.__shutdownInterval);
      this.lastKnownState = 0;
      this.removeListener(this.shutdownProcessEvent, eventHandler);
      this.startup();
    };

    this.on(this.shutdownProcessEvent, eventHandler);

    this.__shutdownInterval = setInterval(() => {
      this._doFindProcess().then((ps) => {
        if (ps.path) return;
        this.logger.log(`${this.process} stopped`);
        this.process = null;
        this.emit(this.shutdownProcessEvent);
      });
    }, this.shutdownInterval || 15000);
  }

  /**
   * Wrapper to find process paths for Windows and Linux and structure them in a common way
   *
   * @returns {Promise<object>}
   */
  _doFindProcess() {
    let ExecutablePath, Name, ProcessId; // wmic output
    let pid, comm, cmd; // ps -eo output
    return new Promise((resolve) => {
      switch (this.os) {
        case "win32":
          ({ ExecutablePath, Name, ProcessId } = this._doConfigWin32());
          resolve({ name: Name, path: ExecutablePath, pid: ProcessId });
          break;
        case "linux":
          ({ pid, comm, cmd } = this._doConfigLinux());
          resolve({ name: comm, path: cmd, pid });
          break;
        default:
          throw new Error("Unsupported platform.");
      }
    });
  }

  /**
   * Get process information for Windows using `wmic process get`.
   *
   * @returns {object}
   */
  _doConfigWin32() {
    const output = execSync(
      "wmic process get ProcessId, Name, ExecutablePath /format:csv"
    ).toString();
    const lines = output.trim().split("\r\n");
    const headers = lines[0].split(",");
    const processData = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",");
      const processInfo = {};

      for (let j = 0; j < headers.length; j++) {
        const header = headers[j].trim();
        const value = values[j].trim();
        processInfo[header] = header === "ProcessId" ? parseInt(value) : value;
      }

      processData.push(processInfo);
    }

    const desiredProcesses = processData.filter((process) =>
      this.watchedProcessList.some((watchedProcess) =>
        process["Name"].includes(watchedProcess)
      )
    );

    return desiredProcesses[0] || desiredProcesses;
  }

  /**
   * Get process information for Linux using `ps -eo`.
   */
  _doConfigLinux() {
    const output = execSync("ps -eo pid,comm,cmd").toString();
    const lines = output.trim().split("\n");
    const headers = lines[0].split(/\s+/);
    const processData = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(/\s+/);
      const processInfo = {};

      for (let j = 0; j < headers.length; j++) {
        const header = headers[j].trim();
        const value = values[j].trim();
        processInfo[header] = header === "pid" ? parseInt(value) : value;
      }

      processData.push(processInfo);
    }

    const desiredProcesses = processData.filter((process) =>
      this.watchedProcessList.some((watchedProcess) =>
        process.comm?.includes(watchedProcess)
      )
    );

    return desiredProcesses[0] || desiredProcesses;
  }
}

export default ProcMon;
