import { Block } from '../../utils/block';
import { withStore, State } from '../../utils/store';
import { MessengerTpl } from './messengerTpl';
import { Message } from '../message';
import { Form } from '../forms';
import { validProcessing } from '../../utils/validProcessing';
import { UserListChatModal, UserListChatModalBase } from '../modalChatsUsers';
import { Link } from '../links';
import { AddToChatUsersModal, AddToChatUsersModalBase } from '../modalAddChatsUsers';
import { SettingChatModal } from '../setChatModal';

import { isEqual } from '../../utils/helpers';
import './messenger.scss';
import messageController from '../../controllers/MessageController';
import chatsController from '../../controllers/ChatsController';

interface MessagePageProps {
  selectedChatID: number | undefined;
  messages: State['messages'];
  chat: State['chats'] | undefined;
  userId: number;
  className:string

}

class MessengerBase extends Block <MessagePageProps> {
  constructor(props: MessagePageProps) {
    super(props);
  }

  init() {
    this.element.classList.add(this.props.className);
    this.children.settingChat = new Link({
      className: 'chat__chat-settings',
      label: '',
      href: '',
      events: {
        click: (event) => {
          event?.preventDefault();
          // @ts-ignore
          const isOpen = (this.children.modalSettingChat.props).isOpen as boolean;

          (this.children.modalSettingChat as SettingChatModal).setProps({
            isOpen: !isOpen,
          });
        },
      },
    });

    this.children.modalSettingChat = new SettingChatModal({
      isOpen: false,
      onRemoveChat: () => {
        chatsController.deleteChat(this.props.selectedChatID!);
      },
      onOpenListUser: () => {
        (this.children.userListChatModal as UserListChatModalBase).setProps({
          isOpen: true,
        });
      },
      onOpenAddUsersModal: () => {
        (this.children.addToChatUsersModal as UserListChatModalBase).setProps({
          isOpen: true,
        });
      },
    });

    this.children.messages = this._createMessages(this.props);

    this.children.chatForm = new Form({
      className: 'chat-form',
      inputs: [{ name: 'message', type: 'text', placeholder: 'Сообщение' }],
      submButton: {
        label: 'Отправить',
        className: 'chat__submit',
        type: 'submit',
        name: 'sendMassage',
      },
      pageTpl: 'chats',
      events: {
        submit: (event:Event) => {
          messageController.send(this.props.selectedChatID!, validProcessing(event)!.message);
          ((event.target as HTMLElement).children[0].children[0] as HTMLInputElement).value = '';
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

    this.children.addToChatUsersModal = new AddToChatUsersModal({
      isOpen: false,
      events: {
        click: (e?: Event | undefined) => {
          const target = e?.target as HTMLElement;
          if (target && target.classList.contains('chat-add__modal--active')) {
            target.classList.remove('chat-add__modal--active');
            (
              this.children.addToChatUsersModal as AddToChatUsersModalBase
            ).setProps({
              isOpen: false,
            });
          }
        },
      },
    });
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    const response = !isEqual(oldProps, newProps);

    if (response && newProps.messages) {
      this.children.messages = this._createMessages(newProps);
    }

    return response;
  }

  private _createMessages(props: MessagePageProps) {
    return props.messages?.map((data) => new Message({
      ...data,
      className: 'messages',
      isMine: props.userId === Number(data.user_id),
    }));
  }

  render() {
    return this.compile(MessengerTpl, { ...this.props });
  }
}

const withSelectedChatMessages = withStore((state) => {
  const { selectedChatID } = state;

  if (!selectedChatID) {
    return {
      messages: [],
      selectedChat: undefined,
      chat: undefined,
      userId: state.user.id,
    };
  }

  return {
    messages: state.messages,
    selectedChatID: state.selectedChatID,
    chat: state.chats.filter((chat) => chat.id === state.selectedChatID)[0],
    userId: state.user?.id,
  };
});

export const Messenger = withSelectedChatMessages(MessengerBase as typeof Block);
