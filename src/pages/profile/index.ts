import { Block } from '../../utils/block';
import { profileTpl } from './profileTpl';
import { Form } from '../../components/forms';
import { Link } from '../../components/links';
import { ProfileAvatar } from '../../components/avatar';
import { ModalAvatar } from '../../components/modalAvatar';
import router from '../../utils/router';
import { validProcessing } from '../../utils/validProcessing';
import arrowImg from '../../static/img/arrov.png';
import avatartImg from '../../static/img/ava.png';
import './profile.scss';
import { withStore } from '../../utils/store';
import userController from '../../controllers/UserController';
import { OutPasswordData, OutProfileData } from '../../api/UsersAPI';
import authController from '../../controllers/AuthController';

interface ProfileProps {}

class ProfilePageBase extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super(props, 'div');
  }

  init() {
    this.props = {
      arrowImg,
      avatartImg,
    };

    this.children.formProfile = new Form({
      ...this.props,
      className: 'profile-form',
      inputs: [
        { name: 'email', type: 'email', value: 'pochta@yandex.ru' },
        { name: 'login', type: 'text', value: 'ivanivanov' },
        { name: 'first_name', type: 'text', value: 'Иван' },
        { name: 'second_name', type: 'text', value: 'Иванов' },
        { name: 'display_name', type: 'text', value: 'Иван' },
        { name: 'phone', type: 'phone', value: '7 (909) 967 30 30' },
      ],
      submButton: {
        label: 'Сохранить',
        className: 'profile-form__submit-button',
        type: 'submit',
        name: 'enter',

      },

      linkChange: {
        label: 'Изменить данные',
        className: 'profile-form__link-change',
        href: '',
        events: {
          click: (event:Event) => {
            event.preventDefault();
            const elemTar = event.target as HTMLElement;
          elemTar.parentElement!.parentElement!.style.display = 'none';
          ((this.children.formProfile as Block).children.submButton as Block).element.style.display = 'block';
          for (const [, value] of Object.entries((this.children.formProfile as Block).children)) {
            const input = (value as Block).element as HTMLInputElement;
            input.readOnly = false;
          }
          },
        },
      },

      linkChangePass: {
        label: 'Изменить пароль',
        className: 'profile-form__link-change',
        href: '',
        events: {
          click: (event:Event) => {
            event.preventDefault();
            const elemTar = event.target as HTMLElement;
          elemTar.parentElement!.parentElement!.style.display = 'none';
          ((this.children.formProfilePass as Block).children.submButtonPass as Block).element.style.display = 'block';
          (this.children.formProfilePass as Block).element.style.display = 'block';
          for (const [, value] of Object.entries((this.children.formProfilePass as Block).children)) {
            const input = (value as Block).element as HTMLInputElement;
            input.readOnly = false;
          }
          },
        },
      },

      linkExit: {
        label: 'Выйти',
        className: 'profile-form__link-change',
        href: '',
        events: {
          click: (event:Event) => {
            event.preventDefault();
            authController.logout();
          },
        },
      },

      pageTpl: 'profile',
      events: {
        submit: (event:Event) => {
          const data = validProcessing(event);
          if (data) {
            const profileData = data as OutProfileData;
            userController.setProfile(profileData);
          }
        },
      },
    });

    this.children.formProfilePass = new Form({
      ...this.props,
      className: 'profile-form',
      display: 'none',
      inputs: [
        { name: 'oldPassword', type: 'password' },
        { name: 'newPassword', type: 'password' },
        { name: 'newPassword2', type: 'password' },
      ],
      submButton: {
        label: 'Сохранить пароль',
        className: 'profile-form__submit-button',
        type: 'submit',
        name: 'enter',

      },
      pageTpl: 'profilePass',
      events: {
        submit: (event:Event) => {
          const data = validProcessing(event);
          if (data) {
            const passData = data as OutPasswordData;
            userController.setPass(passData);
          }
        },
      },

    });

    this.children.chatsleLink = new Link({
      label: '',
      className: '',
      href: '/messenger',
      srcImg: arrowImg as string,
      events: {
        click: (Event:Event) => {
          Event.preventDefault();
          const target = Event.target as HTMLElement;
          if (target.tagName === 'IMG') {
            const link = target.parentElement as HTMLAnchorElement;
            router.go(link.pathname);
          } else {
            const link = Event.target as HTMLAnchorElement;
            router.go(link.pathname);
          }
        },
      },
    });

    this.children.avatar = new ProfileAvatar({
      ...this.props,
      className: 'profile-avatar',
      events: {
        click: (e:Event) => {
          const target = e.target as HTMLDivElement;
          if (target && target.closest('.profile-wrapper__avatar')) {
            (this.children.modalAvatar as ModalAvatar).setProps({
              isOpen: true,
            });
          }
        },
      },
    });

    this.children.modalAvatar = new ModalAvatar({
      title: 'Загрузите файл',
      fileName: 'Выбрать файл на компьютере',
      isOpen: false,
      onSubmit: async (e: Event) => {
        e.preventDefault();
        if (e.target) {
          const target = e.target as HTMLFormElement;
          const formData = new FormData();
          const input = target[0] as HTMLInputElement;

          if (input.files?.length) {
            const file = input.files[0];
            formData.append('avatar', file);

            await userController.changeAvatar(formData);

            (this.children.modalAvatar as ModalAvatar).setProps({
              isOpen: false,
            });

            (this.children.modalAvatar as ModalAvatar).setProps({
              title: 'Загрузите файл',
            });

            (this.children.modalAvatar as ModalAvatar).setFileNamePropsToForm(
              'Выбрать файл на компьютере',
            );
          }
        }
      },
      onChange: (e: Event) => {
        let fileName = 'Выбрать файл на компьютере';
        const target = e.target as HTMLInputElement;
        if (!target) {
          return;
        }
        const { files } = target;

        if (!files || !files.length) {
          return;
        }

        fileName = files[0].name;

        (this.children.modalAvatar as ModalAvatar).setProps({
          title: 'Файл загружен',
        });

        (this.children.modalAvatar as ModalAvatar).setFileNamePropsToForm(
          fileName,
        );
      },
      events: {
        click: (e: Event) => {
          const target = e?.target as HTMLElement;
          if (target && target.classList.contains('modal--active')) {
            (this.children.modalAvatar as ModalAvatar).setProps({
              isOpen: false,
            });
          }
        },
      },
    });
  }

  render() {
    return this.compile(profileTpl, this.props);
  }

  protected componentDidMount(): void {
    console.log('PersMount');
    for (const [, value] of Object.entries(this.children)) {
      (value as Block).dispatchComponentDidMoun();
    }
  }
}

const WithUser = withStore((state) => ({ user: { ...state.user } }));

export const ProfilePage = WithUser(ProfilePageBase as unknown as typeof Block);
