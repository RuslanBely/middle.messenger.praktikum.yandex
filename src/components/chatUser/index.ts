import chatsController from '../../controllers/ChatsController';
import { Block } from '../../utils/block';
import { Button } from '../buttons';
import { Image } from '../image';
import admLogo from '../../static/img/admin-icon.png';
import { InChatsUsers } from '../../api/ChatsApi';
import './chatUser.scss';
import { ChatUserTpl } from './ChatUserTpl';

type TChatUserProps = InChatsUsers & {
  role: string;
  selectedChatId: number;
  isAdd: boolean;
  initialAvatar: string;
  onAdded?: () => void;
};

export class ChatUser extends Block {
  constructor(props: TChatUserProps) {
    super(props);
  }

  init() {
    this.props.className
      ? this.element.classList.add(this.props.className)
      : this.element.classList.add('list-user');

    this.children.admin = new Image({
      className: 'list-user__admin',
      src: admLogo,
    });

    this.children.btnAddUser = new Button({
      label: 'Добавить',
      className: 'list-user__btn',
      events: {
        click: async (e:Event) => {
          e?.stopPropagation();

          const addedUser: InChatsUsers & { role: string } = {
            id: this.props.id,
            first_name: this.props.first_name,
            second_name: this.props.second_name,
            display_name: this.props.display_name,
            login: this.props.login,
            email: this.props.email,
            phone: this.props.phone,
            avatar: this.props.initialAvatar,
            role: 'regular',
          };
          await chatsController.addUsersToChat(
            this.props.id,
            this.props.selectedChatId,
            addedUser,
          );

          this.props.onAdded();
        },
      },
    });

    this.children.btnDeleteUser = new Button({
      label: 'Удалить',
      className: 'list-user__btn',
      events: {
        click: (e) => {
          e?.stopPropagation();
          chatsController.removeUsersFromChat(
            this.props.id,
            this.props.selectedChatId,
          );
        },
      },
    });
  }

  render() {
    return this.compile(ChatUserTpl, this.props);
  }
}
