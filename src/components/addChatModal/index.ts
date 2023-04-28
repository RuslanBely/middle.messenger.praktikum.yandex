import ChatsController from '../../controllers/ChatsController';
import { Block } from '../../utils/Block';
import { Button } from '../buttons';
import { AddChatModalTpl } from './addChatModalTpl';
import { Input } from '../inputs';

import './addChatModal.scss';

interface ChatModalProps{
  className: string;
  events:{
    click: (event:Event) => void
  }
}

export class AddChatModal extends Block<ChatModalProps> {
  constructor(props: ChatModalProps) {
    super(props);
  }

  init() {
    this.element.classList.add(this.props.className);
    this.children.input = new Input({
      className: 'modal-input',
      placeholder: 'Название',

    });

    this.children.button = new Button({
      label: 'Создать',
      className: 'main-btn',

      events: {
        click: async () => {
          const text = (
            (this.children.input as Block).element as HTMLInputElement
          )?.value;

          if (!text.length) {
            return;
          }

          await ChatsController.createChat(text);
        },
      },
    });
  }

  render() {
    return this.compile(AddChatModalTpl, {});
  }
}
