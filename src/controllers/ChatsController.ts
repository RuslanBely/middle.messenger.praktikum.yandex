import { ChatsAPI, InChatsUsers } from '../api/ChatsApi';
import { store } from '../utils/store';
import messageController from './MessageController';

class ChatsController {
  private api: ChatsAPI;

  constructor() {
    this.api = new ChatsAPI();
  }

  async getChats() {
    try {
      const resultChatsData = await this.api.getChats();
      store.set('chats', resultChatsData);
    } catch (e) {
      console.log(e);
    }
  }

  async getToken(chatId:number) {
    try {
      const tokenResp = await this.api.getToken(chatId);
      store.set('token', ((tokenResp as any as Record<string, any>).token));
    } catch (e) {
      console.log(e);
    }
  }

  async createChat(title :string) {
    const OutData = { title };
    try {
      await this.api.createChat(OutData);
      this.getChats();
    } catch (e) {
      console.log(e);
    }
  }

  async deleteChat(id: number) {
    await this.api.deletChat(id);
    store.set(
      'chats',
      store.getState().chats.filter((chat) => chat.id !== id),
    );
    store.set('selectedChat', undefined);
  }

  async getUsers(id: number) {
    const chatUsers = await this.api.getChatsUsers(id);
    store.set('chatUsers', chatUsers);
  }

  async selectChat(id: number) {
    this.getUsers(id);
    store.set('selectedChatID', id);
    await this.getToken(id);

    const state = await store.getState();
    messageController.connectAndGet(state.user.id, id, state.token);
  }

  async addUsersToChat(userID:number, chatID:number, user:InChatsUsers) {
    this.api.addUsersChat([userID], chatID);

    const { chatUsers } = store.getState();
    chatUsers?.push(user);

    store.set('chatUsers', chatUsers);
  }

  async removeUsersFromChat(userID:number, chatID:number) {
    this.api.removeUsersChat([userID], chatID);

    store.set(
      'chatUsers',
      store.getState().chatUsers?.filter((user) => user.id !== userID),
    );
  }
}
export default new ChatsController();
