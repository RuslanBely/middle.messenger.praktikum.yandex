import BaseAPI from './BaseAPI';

export interface InChatsData{

    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    last_message: {
      user: {
        first_name: string,
        second_name: string,
        avatar: string,
        email: string,
        login: string,
        phone: string
      },
      time: string,
      content: string
    }

}

export interface InChatsUsers{

      id: number,
      first_name: string,
      second_name: string,
      display_name: string,
      login: string,
      email: string,
      phone: string,
      avatar: string,
      role: string
}

export interface OutCreateChat {
    'title': string
  }

export interface OutAddDelUserChat {
  users: [],
  chatId: number
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  getChats() {
    return this.http.get('/');
  }

  async getToken(chatId:number) {
    return await this.http.post(`/token/${chatId}`);
  }

  createChat(data:OutCreateChat) {
    return this.http.post('/', data);
  }

  deletChat(id:number) {
    return this.http.delete('/', { chatId: id });
  }

  getChatsUsers(id:number) {
    return this.http.get(`/${id}/users`);
  }

  addUsersChat(usersId:number[], chatId:number) {
    return this.http.put('/users', { users: usersId, chatId });
  }

  removeUsersChat(usersId:number[], chatId:number) {
    return this.http.delete('/users', { users: usersId, chatId });
  }

  create = undefined;

  update = undefined;

  read = undefined;

  delete = undefined;
}
