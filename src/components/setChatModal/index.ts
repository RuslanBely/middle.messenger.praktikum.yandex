import { Block } from '../../utils/block';
import { Link } from '../links';
import './setChatModal.scss';
import { SetChatModalTpl } from './setChatModalTpl';

export interface SetChatModalProps {
  isOpen: boolean;
  onRemoveChat: () => void;
  onOpenListUser: () => void;
  onOpenAddUsersModal: () => void;
}

export class SettingChatModal extends Block {
  constructor(props: SetChatModalProps) {
    super(props);
  }

  init() {
    if (!this.props.isopen) this.element.classList.add('chat-modal');

    this.children.listUsers = new Link({
      label: 'Список пользователей',
      className: 'chat-modal__a',
      href: '',
      events: {
        click: (e) => {
          e?.preventDefault();
          this.setProps({ isOpen: false });
          this.props.onOpenListUser();
        },
      },
    });

    this.children.addUsers = new Link({
      label: 'Добавить пользователя',
      className: 'chat-modal__a',
      href: '',
      events: {
        click: (e) => {
          e?.preventDefault();
          this.setProps({ isOpen: false });
          this.props.onOpenAddUsersModal();
        },
      },
    });

    this.children.removeChatBtn = new Link({
      label: 'Удалить текущий чат',
      className: 'chat-modal__a--red',
      href: '',
      events: {
        click: (e) => {
          e?.preventDefault();
          this.props.onRemoveChat();
          this.setProps({ isOpen: false });
        },
      },
    });
  }

  render() {
    if (this.props.isOpen) {
      this.element.classList.add('chat-modal--open');
    } else this.element.classList.remove('chat-modal--open');

    return this.compile(SetChatModalTpl, { ...this.props });
  }
}
