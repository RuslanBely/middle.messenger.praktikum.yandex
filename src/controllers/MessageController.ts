import { store } from '../utils/store';

class MessageController {
  private socket : WebSocket;

  private socketList: Map<number, WebSocket> = new Map();

  private tm : ReturnType<typeof setTimeout>;

  async connectAndGet(userId:number, chatID:number, token:string) {
    if (!this.socketList.get(chatID) || this.socketList.get(chatID)?.CLOSED) {
      this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatID}/${token}`);
    }
    this.open(chatID);
  }

  open(chatID:number) {
    this.socket.addEventListener('open', () => {
      console.log('Соединение установлено');
      setInterval(() => this.ping(), 20000);
      this.socketList.set(chatID, this.socket);
      this.getOld();
      this.addListeners();
    });
  }

  addListeners() {
    this.socket.addEventListener('message', (event) => {
      console.log('Получены данные', event.data);

      let addMessagesArr = [];
      const eventMessage = JSON.parse(event.data);
      if (eventMessage.type === 'pong') {
        this.pong();
        return;
      } if (Array.isArray(eventMessage)) {
        addMessagesArr = eventMessage.reverse();
      } else {
        addMessagesArr.push(eventMessage);
      }

      const curMessagesArr = store.getState().messages;
      const newMessageArr = [...curMessagesArr, ...addMessagesArr];

      store.set('messages', newMessageArr);
    });

    this.socket.addEventListener('error', (error: Record<string, any>) => {
      console.log('Ошибка', error.message);
    });

    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });
  }

  async getOld(qty = 0) {
    this.socket.send(JSON.stringify({
      content: `${qty}`,
      type: 'get old',
    }));
  }

  async send(chatID:number, text:string) {
      this.socketList.get(chatID)!.send(JSON.stringify({
        content: text,
        type: 'message',
      }));
  }

  ping() {
    this.socket.send(JSON.stringify({ type: 'ping' }));
    this.tm = setTimeout(() => {
      /// ---connection closed ///
    }, 5000);
  }

  pong() {
    clearTimeout(this.tm);
  }
}

const messageController = new MessageController();

export default messageController;
