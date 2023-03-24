import Handlebars from  "handlebars";
import { loginTpl } from './loginTpl'
import "./login.scss"

const loginData = { 
  inputs: [
  { labelVal : 'Логин', name : 'login', type : 'text'},
  { labelVal : 'Пароль', name : 'password', type : 'password'}
]
};


export const login = () => {
  return Handlebars.compile(loginTpl)(loginData);
};