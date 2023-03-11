import Handlebars from 'handlebars';
import './style.scss'

const linkList = {
  class: "temp-menu",
  links: [
    {ancor: "Логин", link: "/login"},
    {ancor: "Регистрация", link: "/signin"},
    {ancor: "Чат", link: "/chats"},
    {ancor: "Профиль", link: "/profile"},
    {ancor: "500", link: "/500"},
    {ancor: "404", link: "/404"}
  ],
};
  export const tempMenu = () => {
      return Handlebars.compile('<div class={{class}}>{{#each links}}<a href={{link}}>{{ancor}}</a>{{/each}}</div>')(linkList);
    };