export class EventBus {

  private readonly listeners: Record<string, Array<() => void> >={};

    constructor() {
      this.listeners = {};
    }
  
    on(event:string, callback:(args?:any)=>void) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);        
    }
  
    off(event:string, callback:()=>void) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
          }
      
          this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
          );
    }
  
    emit(event:string, ...args:any) {
        if (!this.listeners[event]) {
          return;
    }

    this.listeners[event].forEach(listener => {
        listener(...(args as []));
    });
    }
  }
 
 