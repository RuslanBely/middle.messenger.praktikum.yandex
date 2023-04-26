import { loginTpl } from './loginTpl';
import { Block } from '../../utils/block';
import { Form } from '../../components/forms';
import { Link } from '../../components/links';
import router from '../../utils/router';
import './login.scss';
import { validProcessing } from '../../utils/validProcessing';
import authController from '../../controllers/AuthController';
import { SigninData } from '../../api/AuthAPI';

interface LoginProps {}

export class LoginPage extends Block<LoginProps> {
  constructor(props: LoginProps) {
    super(props, 'div');
  }

  init() {
    this.children.formAuth = new Form({
      className: 'login-signin-form',
      inputs: [
        { name: 'login', type: 'text' },
        { name: 'password', type: 'password' },
      ],
      submButton: {
        label: 'Авторизоваться',
        className: 'login-signin-form__submit-button',
        type: 'submit',
        name: 'enter',
      },
      pageTpl: 'login',
      events: {
        submit: (event:Event) => {
          const data = validProcessing(event);
          if (data) {
            const dataSign = data as SigninData;
            authController.signin(dataSign);
          }
        },
      },
    });

    this.children.signLink = new Link({
      label: 'Нет аккаунта?',
      className: 'login-signin-form__sign-a',
      name: 'Registration',
      href: '/sign-up',
      events: {
        click: (Event:Event) => {
          Event.preventDefault();
          const link = Event.target as HTMLAnchorElement;
          router.go(link.pathname);
        },
      },
    });
  }

  render() {
    return this.compile(loginTpl, this.props);
  }

  componentDidMount() {
    console.log('LoginMount');
    (this.children.formAuth as Block).dispatchComponentDidMoun();
  }
}
