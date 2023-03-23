import Handlebars from "handlebars";
import { signinTpl } from './signinTpl'
import "./signin.scss"

const signinData = { 
  inputs: [
  { labelVal : 'Почта', name : 'email', type : 'email'},
  { labelVal : 'Логин', name : 'login', type : 'text'},
  { labelVal : 'Имя', name : 'first_name', type : 'text'},
  { labelVal : 'Фамилия', name : 'second_name', type : 'text'},
  { labelVal : 'Телефон', name : 'phone', type : 'phone'},
  { labelVal : 'Пароль', name : 'password', type : 'password'},
  { labelVal : 'Пароль (ещё раз)', name : 'password2', type : 'password'}
]
};

export const signin = () => {
    return Handlebars.compile(signinTpl)(signinData);
};
