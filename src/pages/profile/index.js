import Handlebars from  "handlebars";
import { profileTpl } from './profileTpl';
import arrowImg from "../../static/img/arrov.png";
import avatartImg from "../../static/img/ava.png";
import "./profile.scss";


const profileData = { 
  'arrowImg':arrowImg,
  'avatartImg':avatartImg,
  inputsPers: [
  { labelVal : 'Почта', name : 'email', type : 'email', value : 'pochta@yandex.ru'},
  { labelVal : 'Логин', name : 'login', type : 'text', value : 'ivanivanov'},
  { labelVal : 'Имя', name : 'first_name', type : 'text', value : 'Иван'},
  { labelVal : 'Фамилия', name : 'second_name', type : 'text', value : 'Иванов'},
  { labelVal : 'Имя в Чате', name : 'display_name', type : 'text', value : 'Иван'},
  { labelVal : 'Телефон', name : 'phone', type : 'phone', value : '7 (909) 967 30 30'}
],
inputsPass: [
  { labelVal : 'Старый пароль', name : 'oldPassword', type : 'password', value : ''},
  { labelVal : 'Новый пароль', name : 'newPassword', type : 'password', value : ''},
  { labelVal : 'Повторите новый пароль', name : 'newPassword2', type : 'password', value : ''}
]
};

export const profile = () => {
  return Handlebars.compile(profileTpl)(profileData);
};