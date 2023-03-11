import Handlebars from  "handlebars";
import { p500Tpl } from './500Tpl'
import "./500.scss"

export const p500 = () => {
  return Handlebars.compile(p500Tpl)();
};