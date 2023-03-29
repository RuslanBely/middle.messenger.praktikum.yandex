import { ButtonTpl } from './ButtonTpl';
import { Block } from "../../utils/block";
import "./button.scss";

interface ButtonProps{
  label: string;
  className?:string;
  type?:string;
  name:string;
  events?: {
    click: ()=> void;
  }
}

export class Button extends Block<ButtonProps>{
  constructor(props: ButtonProps){
    super('button', props)
  }

  init() {
    if(this.props.className) 
      this.element.classList.add(this.props.className);
  }


  render()  {
    return this.compile(ButtonTpl, this.props);
  }
};