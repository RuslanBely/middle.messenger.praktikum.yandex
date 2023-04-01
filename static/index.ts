import { app } from "../src/App";
import { tempMenu } from "../src/components/temp-menu";
import '../src/style.scss';
const root = document.querySelector('#root');

const page = app()!;

root!.append(page.element);
page.dispatchComponentDidMoun();

/*Временное меню для навигации*/
root!.insertAdjacentHTML("beforebegin",tempMenu())
