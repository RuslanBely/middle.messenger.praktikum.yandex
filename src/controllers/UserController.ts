import { UserAPI, OutPasswordData, OutProfileData } from '../api/UsersAPI';
import { store } from '../utils/store';

class UserController {
  private api: UserAPI;

  constructor() {
    this.api = new UserAPI();
  }

  async setPass(data:OutPasswordData) {
    try {
      const resultPassData = await this.api.setPass(data);
      console.log('pass:', resultPassData);
    } catch (e) {
      console.log(e);
    }
  }

  async setProfile(data:OutProfileData) {
    try {
      const userData = await this.api.setProfile(data);
      store.set('user', userData);
      console.log('user:', userData);
    } catch (e) {
      console.log(e);
    }
  }

  async changeAvatar(data: FormData) {
    try {
      const userData = await this.api.setProfileAvatar(data);
      store.set('user', userData);
    } catch (e) {
      console.error(e);
    }
  }

  async searchUser(login:string) {
    try {
      const userData = await this.api.search(login);
      store.set('searchedUsers', userData);
    } catch (e) {
      console.error(e);
    }
  }
}
export default new UserController();
