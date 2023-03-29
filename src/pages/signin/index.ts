import { signinTpl } from './signinTpl'
import { Block } from "../../utils/block";
import { Form } from '../../components/forms';
import "./signin.scss"

interface SigninProps {}

export class SigninPage extends Block<SigninProps>{
  constructor(props: SigninProps){
    super('div',props)
  }
  
init() {
  this.children.formSignin = new Form({
  className:'loginSignin-form',
  inputs: [
      { labelVal : 'Почта', name : 'email', type : 'email'},
      { labelVal : 'Логин', name : 'login', type : 'text'},
      { labelVal : 'Имя', name : 'first_name', type : 'text'},
      { labelVal : 'Фамилия', name : 'second_name', type : 'text'},
      { labelVal : 'Телефон', name : 'phone', type : 'phone'},
      { labelVal : 'Пароль', name : 'password', type : 'password'},
      { labelVal : 'Пароль (ещё раз)', name : 'password2', type : 'password'}
        ],
  submButton:{
    label: 'Зарегистрироваться',
    className: 'loginSignin-form__submit-button',
    type: 'submit',
    name: 'Registration'
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
