import { Block } from '../../utils/block';
import { profileTpl } from './profileTpl';
import { Form } from '../../components/forms';
import arrowImg from "../../static/img/arrov.png";
import avatartImg from "../../static/img/ava.png";
import "./profile.scss";


interface ProfileProps {}

export class ProfilePage extends Block<ProfileProps>{
  constructor(props: ProfileProps){
    super('div',props)
  }

 init(){
  this.props = {
    'arrowImg':arrowImg,
    'avatartImg':avatartImg,
  };

  this.children.formProfile = new Form({
    className:'profile-form',
    inputsPers: [
      { labelVal : 'Почта', name : 'email', type : 'email', value : 'pochta@yandex.ru'},
        { labelVal : 'Логин', name : 'login', type : 'text', value : 'ivanivanov'},
        { labelVal : 'Имя', name : 'first_name', type : 'text', value : 'Иван'},
        { labelVal : 'Фамилия', name : 'second_name', type : 'text', value : 'Иванов'},
        { labelVal : 'Имя в Чате', name : 'display_name', type : 'text', value : 'Иван'},
        { labelVal : 'Телефон', name : 'phone', type : 'phone', value : '7 (909) 967 30 30'},
         ],
    inputsPass: [
      { labelVal : 'Старый пароль', name : 'oldPassword', type : 'password', value : ''},
        { labelVal : 'Новый пароль', name : 'newPassword', type : 'password', value : ''},
        { labelVal : 'Повторите новый пароль', name : 'newPassword2', type : 'password', value : ''}
   
    ],
    submButton:{
      label: 'Сохранить',
      className: 'profile-form__submit-button',
      type: 'submit',
      name: 'enter'
    }
  }
  )
}

render()  {
  return this.compile(profileTpl, this.props);
}

protected componentDidMount(): void {
  console.log('PersMount')
  this.children.formProfile.dispatchComponentDidMoun()
}

}
