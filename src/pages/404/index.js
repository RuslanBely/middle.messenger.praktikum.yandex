import Handlebars from  "handlebars";
import { p404Tpl } from './404Tpl'
import "./404.scss"

export const p404 = () => {
  return Handlebars.compile(p404Tpl)();
};
