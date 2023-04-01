import { loginTpl} from './loginTpl'
import { Block } from "../../utils/block";
import { Form } from '../../components/forms';
import "./login.scss"
import { validProcessing } from '../../utils/validProcessing';

interface LoginProps {}

export class LoginPage extends Block<LoginProps>{
  constructor(props: LoginProps){
    super('div',props)
  }

init() {
  this.children.formAuth = new Form({
    className:'login-signin-form',
    inputs: [
      { name : 'login', type : 'text' },
      { name : 'password', type : 'password'}
    ],    submButton:{
      label: 'Авторизоваться',
      className: 'login-signin-form__submit-button',
      type: 'submit',
      name: 'enter'
    },
    pageTpl:'login',
    events:{
      'submit':(event:Event)=>{validProcessing(event)}
    }
  })
} 

render()  {
  return this.compile(loginTpl, this.props);
}

componentDidMount(){
  console.log('LoginMount')
  this.children.formAuth.dispatchComponentDidMoun()
}


}
