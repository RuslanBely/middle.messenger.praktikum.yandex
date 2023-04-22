import { AuthAPI, SigninData, SignupData } from '../api/AuthAPI';
import { store } from '../utils/store';
import router from '../utils/router';
import ChatsController from './ChatsController';

class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  signup(data:SignupData) {
    this.api.signup(data)
      .then(() => {
        router.go('/messenger');
      })
      .catch(console.log);
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);
      await this.fetchUser();

      router.go('/messenger');
    } catch (err) {
      if (err.reason === 'User already in system') {
        await this.fetchUser();
        router.go('/messenger');
      }
    }
  }

  async logout() {
    try {
      await this.api.logout();
      router.go('/');
      store.set('user', undefined);
    } catch (error) {
      console.log('logout err', error);
    }
  }

  async fetchUser() {
    const user = await this.api.getUser();
    store.set('user', user);

    await ChatsController.getChats();
  }
}
export default new AuthController();
