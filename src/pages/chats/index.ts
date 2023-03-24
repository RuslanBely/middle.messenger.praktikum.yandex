import Handlebars from  "handlebars";
import { chatsTpl } from './chatsTpl'
import "./chats.scss"

export const chats = () => {
  return Handlebars.compile(chatsTpl)({});
};
