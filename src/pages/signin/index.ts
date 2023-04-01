import { signinTpl } from './signinTpl'
import { Block } from "../../utils/block";
import { Form } from '../../components/forms';
import { validProcessing } from '../../utils/validProcessing';
import "./signin.scss"

interface SigninProps {}

export class SigninPage extends Block<SigninProps>{
  constructor(props: SigninProps){
    super('div',props)
  }
  
init() {
  this.children.formSignin = new Form({
  className:'login-signin-form',
  inputs: [
      { name : 'email', type : 'email'},
      { name : 'login', type : 'text'},
      { name : 'first_name', type : 'text'},
      { name : 'second_name', type : 'text'},
      { name : 'phone', type : 'phone'},
      { name : 'password', type : 'password'},
      { name : 'password2', type : 'password'}
        ],
  submButton:{
    label: 'Зарегистрироваться',
    className: 'login-signin-form__submit-button',
    type: 'submit',
    name: 'Registration'
    },
    pageTpl:'signin',
    events:{
      'submit':(event:Event)=>{validProcessing(event)}
    }
  })
}
render()  {
  return this.compile(signinTpl, this.props);
}

protected componentDidMount(): void {
  console.log('SigninMount')
  this.children.formSignin.dispatchComponentDidMoun()
}

}
