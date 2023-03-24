import { app } from "../src/App";
import { tempMenu } from "../src/components/temp-menu";
import '../src/style.css';

const root = document.querySelector('#root');

root.innerHTML = app();

/*Временное меню для навигации*/
root.insertAdjacentHTML("beforebegin",tempMenu())
