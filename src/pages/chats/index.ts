import { Block } from '../../utils/Block';
import { chatsTpl } from './chatsTpl';
import { Link } from '../../components/links';
import router from '../../utils/router';
import './chats.scss';
import { ChatItem } from '../../components/chats';
import { Messenger } from '../../components/messenger';
import chatsController from '../../controllers/ChatsController';
import { withStore } from '../../utils/store';
import { InChatsData } from '../../api/ChatsApi';
import { AddChatModal } from '../../components/addChatModal';
import { SettingChatModal } from '../../components/setChatModal';
import { isEqual } from '../../utils/helpers';
import { UserListChatModal, UserListChatModalBase } from '../../components/modalChatsUsers';

interface ChatProps {
  chats:InChatsData[],
  selectedChatID:number
}

class ChatPageBase extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super(props, 'div');
  }

  init() {
    this.children.chats = this._createChats(this.props);

    this.children.createChatlink = new Link({
      label: 'Создать новый чат',
      className: 'chats__create',
      href: '',
      events: {
        click: (Event:Event) => {
          Event.preventDefault();

          const target = Event?.target as HTMLDivElement;
          if (target && target.classList.contains('chats__create')) {
            const modalEl = this.children.addChatModal as Block;
            modalEl.element.classList.add('modal--active');
          }
        },
      },
    });

    this.children.messenger = new Messenger({
      className: 'chat__messages',
    });

    this.children.profileLink = new Link({
      label: 'Профиль >',
      className: 'chats__profile',
      href: '/settings',
      events: {
        click: (Event:Event) => {
          Event.preventDefault();
          const link = Event.target as HTMLAnchorElement;
          router.go(link.pathname);
        },
      },
    });

    this.children.settingChat = new Link({
      className: 'chat__chat-settings',
      label: '',
      href: '',
      events: {
        click: (event) => {
          event?.preventDefault();
          // @ts-ignore
          const { isOpen } = (this.children.modalSettingChat as SettingChatModal).props;

          (this.children.modalSettingChat as SettingChatModal).setProps({
            isOpen: !isOpen,
          });
        },
      },
    });

    this.children.addChatModal = new AddChatModal({
      className: 'modal',
      events: {
        click: (e) => {
          const target = e?.target as HTMLElement;
          if (target && !target.closest('.modal-chat')) {
            const modalEl = this.children.addChatModal as Block;
            modalEl.element.classList.remove('modal--active');
          }
        },
      },
    });

    this.children.userListChatModal = new UserListChatModal({
      isOpen: false,
      events: {
        click: (e?: Event | undefined) => {
          const target = e?.target as HTMLElement;
          if (target && target.classList.contains('chat-list__modal--active')) {
            target.classList.remove('chat-list__modal--active');

            (this.children.userListChatModal as UserListChatModalBase).setProps(
              {
                isOpen: false,
              },
            );
          }
        },
      },
    });
  }

  private _createChats(props:ChatProps) {
    return props.chats.map((data) => {
      let time = '';

      if (data.last_message) {
        const hour = String(
          new Date(data.last_message.time).getHours(),
        ).padStart(2, '0');
        const minutes = String(
          new Date(data.last_message.time).getMinutes(),
        ).padStart(2, '0');

        time = `${hour}:${minutes}`;
      }

      return new ChatItem({
        ...data,
        time,
        name: data.title,
        isSelected: (this.props.selectedChatID === data.id),
        events: {
          click: async () => {
            await chatsController.selectChat(data.id);
          },
        },
      });
    });
  }

  protected render(): DocumentFragment {
    return this.compile(chatsTpl, { ...this.props });
  }

  protected componentDidMount(): void {
    console.log('ChatsMount');
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    const response = !isEqual(oldProps, newProps);
    if (response) {
      this.children.chats = this._createChats(newProps);
    }

    return response;
  }
}
const WithChats = withStore((state) => (
  {
    chats: [...(state.chats as [])],
    selectedChatID: state.selectedChatID,
  }
));

export const ChatPage = WithChats(ChatPageBase as unknown as typeof Block);
