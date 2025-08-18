// utils/eventEmitter.ts
import { EventEmitter } from "events";

const emitter = new EventEmitter();

// Optional: set max listeners (default is 10)
emitter.setMaxListeners(100000);

export default emitter;
