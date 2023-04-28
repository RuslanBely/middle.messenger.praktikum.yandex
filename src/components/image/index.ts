import { Block } from '../../utils/Block';
import { ImageTpl } from './ImageTpl';

interface ImageProps{
  className?:string,
  src?: unknown,
}

export class Image extends Block<ImageProps> {
  constructor(props: ImageProps) {
    super(props, 'img');
  }

  protected init(): void {
    const img = this.element as HTMLImageElement;
    if (this.props.className) img.classList.add(this.props.className);
    img.src = this.props.src as string;
  }

  protected render(): DocumentFragment {
    return this.compile(ImageTpl, this.props);
  }
}
