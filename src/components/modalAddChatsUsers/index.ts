import { Block } from '../../utils/block';
import UserController from '../../controllers/UserController';
import { store, withStore } from '../../utils/store';
import { ChatUser } from '../chatUser';
import { Input } from '../inputs';
import { InChatsUsers } from '../../api/ChatsApi';

import { isEqual } from '../../utils/helpers';
import { ModalAddChatsUsers } from './modalAddChatsUsers';
import './modalAddChatsUsers.scss';
import { Button } from '../buttons';

interface AddToChatUsersModalProps {
  isOpen: boolean;
  users: InChatsUsers[];
  selectedChatId: number | undefined;
}

export class AddToChatUsersModalBase extends Block<AddToChatUsersModalProps> {
  constructor(props: AddToChatUsersModalProps) {
    super(props);
  }

  init() {
    this.children.users = this._createUsers(this.props.users);

    this.children.input = new Input({

      placeholder: 'Логин',
      className: 'chat-add__input',

    });

    this.children.btnSearch = new Button({
      label: 'Поиск',
      className: 'chat-add__search',

      events: {
        click: async () => {
          const inputValue = (
            (this.children.input as Block).element as HTMLInputElement
          ).value;
          if (inputValue === '') {
            return;
          }
          await UserController.searchUser(inputValue);
        },
      },
    });
  }

  protected componentDidUpdate(
    oldProps: AddToChatUsersModalProps,
    newProps: AddToChatUsersModalProps,
  ): boolean {
    const response = !isEqual(oldProps, newProps);
    if (response) {
      this.children.users = this._createUsers(newProps.users!);
    }
    return response;
  }

  private _createUsers(props: InChatsUsers[]) {
    return props.map(
      (user) => new ChatUser({
        ...user,
        avatar: user.avatar
          ? `https://ya-praktikum.tech/api/v2/resources${user.avatar}`
          : '',
        initialAvatar: user.avatar,
        role: 'delete',
        isAdd: true,
        selectedChatId: this.props.selectedChatId!,
        onAdded: () => {
          (
              (this.children.input as Block).getContent() as HTMLInputElement
          ).value = '';
          store.set('searchedUsers', undefined);
          this.setProps({ isOpen: false });
        },
      }),
    );
  }

  render() {
    return this.compile(ModalAddChatsUsers, { ...this.props });
  }
}

const withSearchedUsers = withStore((state) => ({
  selectedChatId: state.selectedChatID,
  users: state.searchedUsers || [],
}));

export const AddToChatUsersModal = withSearchedUsers(
  AddToChatUsersModalBase as unknown as typeof Block,
);
