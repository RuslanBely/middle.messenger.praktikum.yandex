import { Block } from '../../utils/Block';
import { MessageTpl } from './messgeTpl';
import './message.scss';

interface MessageProps {
  isMine: boolean;
  className: string;
  time: string
}

export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super(props);
  }

  protected init(): void {
    this.element.classList.add(this.props.className);
  }

  render() {
    const hour = String(new Date(this.props.time).getHours()).padStart(2, '0');
    const minutes = String(new Date(this.props.time).getMinutes()).padStart(
      2,
      '0',
    );

    const time = `${hour}:${minutes}`;

    return this.compile(MessageTpl, { ...this.props, time });
  }
}
