import { ButtonTpl } from './ButtonTpl';
import { Block } from '../../utils/block';
import './button.scss';
import { Image } from '../image';

interface ButtonProps{
  label?: string
  className?:string;
  type?:string;
  name?:string;
  value?:Image
  events?: {
    click: (e?:Event)=> void;
  }
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props, 'button');
  }

  init() {
    if (this.props.className) { this.element.classList.add(this.props.className); }
  }

  render() {
    return this.compile(ButtonTpl, this.props);
  }
}
