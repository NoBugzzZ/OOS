type Func = () => void;
interface EventType {
  [event: string]: Func[];
}

class EventEmitter_Cus {
  queue: EventType;
  constructor() {
    this.queue = {};
  }
  on(event: string, callback: () => void) {
    if (!(event in this.queue)) {
      this.queue[event] = [];
    }
    this.queue[event].push(callback);
  }
  emit(event: string) {
    this.queue[event].forEach((c) => c());
  }
}

const emmiter=new EventEmitter_Cus();

export default emmiter;