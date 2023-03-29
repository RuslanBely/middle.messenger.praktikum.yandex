import { loginTpl} from './loginTpl'
import { Block } from "../../utils/block";
import { Form } from '../../components/forms';
import "./login.scss"

interface LoginProps {}

export class LoginPage extends Block<LoginProps>{
  constructor(props: LoginProps){
    super('div',props)
  }

init() {
  this.children.formAuth = new Form({
    className:'loginSignin-form',
    inputs: [
      { labelVal : 'Логин', name : 'login', type : 'text' },
      { labelVal : 'Пароль', name : 'password', type : 'password'}
    ],
    submButton:{
      label: 'Авторизоваться',
      className: 'loginSignin-form__submit-button',
      type: 'submit',
      name: 'enter'
    }
  })
} 

render()  {
  return this.compile(loginTpl, this.props);
}

protected componentDidMount(): void {
  console.log('LoginMount')
  this.children.formAuth.dispatchComponentDidMoun()
}


}
