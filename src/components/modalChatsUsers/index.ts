import { Block } from '../../utils/Block';
import { withStore } from '../../utils/store';
import { ChatUser } from '../chatUser';
import { InChatsUsers } from '../../api/ChatsApi';

import { isEqual } from '../../utils/helpers';
import { ModalChatsUsersTpl } from './modalChatsUsersTpl';
import './modalChatsUsers.scss';

type TUserListChatModalProps = {
  chatUsers: Array<InChatsUsers & { role: string }> | undefined;
  isOpen: boolean;
  selectedChatId: number | undefined;
  events?: Record<string, (e: Event) => void>;
};

export class UserListChatModalBase extends Block<TUserListChatModalProps> {
  constructor(props: TUserListChatModalProps) {
    super(props);
  }

  init() {
    if (this.props.chatUsers) {
      this.children.users = this._createUsers(this.props.chatUsers);
    }
  }

  protected componentDidUpdate(
    oldProps: TUserListChatModalProps,
    newProps: TUserListChatModalProps,
  ): boolean {
    const response = !isEqual(oldProps, newProps);
    if (response && this.props.chatUsers) {
      this.children.users = this._createUsers(newProps.chatUsers!);
    }

    return response;
  }

  private _createUsers(props: Array<InChatsUsers & { role: string }>) {
    return props?.map(
      (user) => new ChatUser({
        ...user,
        avatar: user.avatar
          ? `https://ya-praktikum.tech/api/v2/resources/${user.avatar}`
          : '',
        initialAvatar: user.avatar,
        role: user.role === 'admin' ? user.role : '',
        isAdd: false,
        selectedChatId: this.props.selectedChatId!,
      }),
    );
  }

  render() {
    return this.compile(ModalChatsUsersTpl, { ...this.props });
  }
}

const withSelectedChatUsers = withStore((state) => ({
  selectedChatId: state.selectedChatID,
  chatUsers: state.chatUsers,
}));

export const UserListChatModal = withSelectedChatUsers(
  UserListChatModalBase as unknown as typeof Block,
);
