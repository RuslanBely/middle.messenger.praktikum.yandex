import { signupTpl } from './signupTpl';
import { Block } from '../../utils/Block';
import { Form } from '../../components/forms';
import { Link } from '../../components/links';
import router from '../../utils/router';
import { validProcessing } from '../../utils/validProcessing';
import './signup.scss';
import authController from '../../controllers/AuthController';
import { SignupData } from '../../api/AuthAPI';

interface SigninProps {}

export class SigninPage extends Block<SigninProps> {
  constructor(props: SigninProps) {
    super(props, 'div');
  }

  init() {
    this.children.formSignup = new Form({
      className: 'login-signin-form',
      inputs: [
        { name: 'email', type: 'email' },
        { name: 'login', type: 'text' },
        { name: 'first_name', type: 'text' },
        { name: 'second_name', type: 'text' },
        { name: 'phone', type: 'phone' },
        { name: 'password', type: 'password' },
        { name: 'password2', type: 'password' },
      ],
      submButton: {
        label: 'Зарегистрироваться',
        className: 'login-signin-form__submit-button',
        type: 'submit',
        name: 'Registration',
      },
      pageTpl: 'signup',
      events: {
        submit: (event:Event) => {
          const data = validProcessing(event);
          if (data) {
            const dataSign = data as SignupData;
            authController.signup(dataSign);
          }
        },
      },
    });
    this.children.loginLink = new Link({
      label: 'Войти',
      className: 'login-signin-form__sign-a',
      name: 'Enter',
      href: '/',
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
    return this.compile(signupTpl, this.props);
  }

  protected componentDidMount(): void {
    console.log('SignupMount');
    (this.children.formSignin as Block).dispatchComponentDidMoun();
  }
}
