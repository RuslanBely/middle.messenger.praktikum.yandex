import { LinkTpl } from './LinkTpl';
import { Block } from '../../utils/block';

export interface LinkProps{
  label: string;
  className?:string;
  name?:string;
  href:string;
  srcImg?:string;
  events?: {
    click: (event?:Event)=> void;
  }
}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super(props, 'a');
  }

  init() {
    const link = this.element as HTMLAnchorElement;
    if (this.props.className) {
      link.classList.add(this.props.className);
    }
    if (this.props.name) link.name = this.props.name;
    link.href = this.props.href;
  }

  render() {
    return this.compile(LinkTpl, this.props);
  }
}
