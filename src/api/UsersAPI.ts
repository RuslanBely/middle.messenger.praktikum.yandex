import BaseAPI from './BaseAPI';

export interface InSearchData {
    'login': string
  }

export interface InProfileData {
    'id': number,
    'first_name': string,
    'second_name': string,
    'display_name': string,
    'login': string,
    'email': string,
    'phone': string,
    'avatar': string
  }

export interface OutProfileData{
    'first_name': 'string',
    'second_name': 'string',
    'display_name': 'string',
    'login': 'string',
    'email': 'string',
    'phone': 'string'
  }

export interface OutPasswordData{
    'oldPassword': 'string',
    'newPassword': 'string'
  }

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  setProfile(data:OutProfileData) {
    return this.http.put('/profile', data);
  }

  setProfileAvatar(data:FormData) {
    return this.http.put('/profile/avatar', data);
  }

  setPass(data:OutPasswordData) {
    return this.http.put('/password', data);
  }

  getUser(id:number) {
    return this.http.get(`/user/${id}`);
  }

  search(login: string) {
    return this.http.post('/search', { login });
  }

  create = undefined;

  update = undefined;

  read = undefined;

  delete = undefined;
}
